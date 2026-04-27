/**
 * AI Service Module
 * Handles all API calls to the AI model for recommendations
 * Supports Google Gemini, Anthropic Claude API, and OpenAI API
 */

import { GoogleGenerativeAI } from '@google/generative-ai';

const API_PROVIDER = import.meta.env.VITE_AI_PROVIDER || 'gemini';
const API_KEY = import.meta.env.VITE_AI_API_KEY;

/**
 * Validate that API key is configured
 */
function validateAPIKey() {
  if (!API_KEY) {
    throw new Error(
      'API key not configured. Please set VITE_AI_API_KEY in your .env file. ' +
      'Visit https://aistudio.google.com for Google Gemini, https://console.anthropic.com for Anthropic, or https://platform.openai.com for OpenAI.'
    );
  }
}

/**
 * Format phone catalog for AI context
 */
function formatCatalog(phones) {
  return phones
    .map(
      (p) =>
        `ID:${p.id} | ${p.name} (${p.brand}) | $${p.price} | Battery:${p.battery}mAh | Camera:${p.camera}MP | Tags:${p.tags.join(',')} | ${p.description}`
    )
    .join('\n');
}

/**
 * Create system prompt for AI recommendations
 */
function createSystemPrompt(catalog) {
  return `You are a helpful mobile phone recommendation expert. You have access to a catalog of phones and must recommend the BEST matches based on the user's query.

PHONE CATALOG:
${catalog}

Your response MUST follow this exact JSON format:
{
  "summary": "A friendly 2-3 sentence explanation of your recommendations",
  "recommended_ids": [list of phone IDs as numbers, best match first, max 4],
  "highlights": "One sentence about what makes these phones stand out for this query"
}

Be precise — only recommend phones that genuinely match the user's requirements. If they ask for under $X, only include phones under that price. Always respond with ONLY valid JSON, no other text.`;
}

/**
 * Call Anthropic Claude API
 */
async function callAnthropicAPI(userInput, catalog) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      system: createSystemPrompt(catalog),
      messages: [
        {
          role: 'user',
          content: userInput,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Anthropic API Error: ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  const textContent = data.content.find((c) => c.type === 'text');
  if (!textContent) {
    throw new Error('No text content in API response');
  }

  const rawText = textContent.text;
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from API response');
  }

  return JSON.parse(jsonMatch[0]);
}

/**
 * Call Google Gemini API
 */
async function callGeminiAPI(userInput, catalog) {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    const systemPrompt = createSystemPrompt(catalog);
    const fullPrompt = `${systemPrompt}\n\nUser Query: ${userInput}`;

    const response = await model.generateContent(fullPrompt);
    const content = response.response.text();

    if (!content) {
      throw new Error('No content in API response');
    }

    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not parse JSON from API response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    throw new Error(`Gemini API Error: ${error.message}`);
  }
}

/**
 * Call OpenAI API
 */
async function callOpenAIAPI(userInput, catalog) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      temperature: 0.7,
      max_tokens: 1000,
      messages: [
        {
          role: 'system',
          content: createSystemPrompt(catalog),
        },
        {
          role: 'user',
          content: userInput,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `OpenAI API Error: ${errorData.error?.message || response.statusText}`
    );
  }

  const data = await response.json();
  const content = data.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No content in API response');
  }

  const jsonMatch = content.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('Could not parse JSON from API response');
  }

  return JSON.parse(jsonMatch[0]);
}

/**
 * Main function to get AI recommendations
 * @param {string} userInput - User's preference query
 * @param {array} phonesData - Available phones catalog
 * @returns {object} Recommendations object with ids and explanation
 */
export async function getAIRecommendations(userInput, phonesData) {
  try {
    validateAPIKey();

    const catalog = formatCatalog(phonesData);

    let result;
    if (API_PROVIDER === 'gemini') {
      result = await callGeminiAPI(userInput, catalog);
    } else if (API_PROVIDER === 'openai') {
      result = await callOpenAIAPI(userInput, catalog);
    } else {
      result = await callAnthropicAPI(userInput, catalog);
    }

    // Validate response structure
    if (!result.recommended_ids || !Array.isArray(result.recommended_ids)) {
      throw new Error('Invalid response format: missing recommended_ids array');
    }

    // Validate all IDs are numbers and exist in catalog
    const validIds = phonesData.map((p) => p.id);
    const invalidIds = result.recommended_ids.filter((id) => !validIds.includes(id));
    if (invalidIds.length > 0) {
      console.warn(`Invalid phone IDs in recommendation: ${invalidIds.join(',')}`);
      result.recommended_ids = result.recommended_ids.filter((id) => validIds.includes(id));
    }

    return result;
  } catch (error) {
    console.error('AI Service Error:', error);
    throw error;
  }
}
