# 🏗️ Architecture & Design Document

## System Overview

The AI Phone Recommender is a React-based product recommendation system that integrates with AI APIs to provide intelligent product suggestions based on user preferences.

```
User Input
    ↓
Search Bar Component
    ↓
AI Service (Claude/GPT)
    ↓
Product Filtering & Display
    ↓
Product Grid with Highlighting
```

## Component Architecture

### High-Level Component Hierarchy

```
App (Main Container)
├── SearchBar
│   └── Handles user input & submission
├── QuickChips
│   └── Preset recommendation queries
├── AIResponse
│   └── Displays AI recommendations
├── FilterButtons
│   └── Category filtering
└── ProductGrid
    └── ProductCard (repeated)
        └── Individual product display
```

### Component Responsibilities

#### App.jsx
- **Purpose**: Main orchestrator component
- **State**: Recommendations, filters, loading states
- **Responsibilities**:
  - Manages user interactions
  - Handles AI API calls
  - Distributes data to child components
  - Manages filter logic

#### SearchBar.jsx
- **Purpose**: User input interface
- **Props**: `onSearch(input)`, `isLoading`
- **Responsibilities**:
  - Captures user queries
  - Validates input
  - Calls parent's search handler

#### QuickChips.jsx
- **Purpose**: Quick-select preset queries
- **Props**: `onChipClick(text)`
- **Responsibilities**:
  - Displays preset options
  - Triggers searches with predefined text

#### AIResponse.jsx
- **Purpose**: Display AI recommendations
- **Props**: `response`, `isLoading`
- **Responsibilities**:
  - Shows AI summary and highlights
  - Displays loading animation
  - Handles empty states

#### FilterButtons.jsx
- **Purpose**: Product filtering interface
- **Props**: `activeFilter`, `onFilterChange`, `recommendedCount`
- **Responsibilities**:
  - Manages filter buttons
  - Triggers filter changes

#### ProductGrid.jsx
- **Purpose**: Display filtered products
- **Props**: `phones`, `recommendedIds`, `activeFilter`
- **Responsibilities**:
  - Filters products based on active filter
  - Renders ProductCard components
  - Handles empty states

#### ProductCard.jsx
- **Purpose**: Individual product display
- **Props**: `phone`, `isRecommended`
- **Responsibilities**:
  - Displays product information
  - Shows recommendation badge if selected
  - Displays match score for recommendations

## Service Layer

### aiService.js

**Purpose**: Centralized AI API integration

**Key Functions**:

1. **getAIRecommendations(userInput, phonesData)**
   - Main entry point for AI requests
   - Handles both Anthropic and OpenAI APIs
   - Returns validated recommendation object

2. **validateAPIKey()**
   - Ensures API key is configured
   - Provides helpful error messages

3. **formatCatalog(phones)**
   - Converts product array to AI-readable format
   - Includes all relevant product attributes

4. **createSystemPrompt(catalog)**
   - Generates context for AI model
   - Defines expected JSON response format

5. **callAnthropicAPI(userInput, catalog)**
   - Handles Anthropic Claude API calls
   - Includes error handling and response parsing

6. **callOpenAIAPI(userInput, catalog)**
   - Handles OpenAI GPT API calls
   - Includes error handling and response parsing

## Data Layer

### phonesCatalog.js

Contains static product database with structure:
```javascript
{
  id: number,           // Unique identifier
  name: string,         // Product name
  brand: string,        // Manufacturer
  price: number,        // USD price
  emoji: string,        // Visual identifier
  tags: array,          // Feature tags
  rating: number,       // 0-5 rating
  battery: number,      // mAh capacity
  camera: number,       // MP count
  perf: number,         // Performance score 0-100
  category: string,     // 'premium' or 'budget'
  description: string   // Product summary
}
```

## State Management Flow

### App Component State

```javascript
const [recommendedIds, setRecommendedIds] = useState([])    // [1, 3, 5, 7]
const [activeFilter, setActiveFilter] = useState('all')     // 'all' | 'recommended' | 'budget' | 'premium'
const [aiResponse, setAiResponse] = useState(null)         // AI response object
const [loading, setLoading] = useState(false)              // Loading state
const [error, setError] = useState(null)                   // Error messages
```

### Data Flow Sequence

1. User enters query and clicks "Ask AI"
2. SearchBar triggers `onSearch(input)`
3. App calls `aiService.getAIRecommendations()`
4. Loading state set to true
5. API call made (Anthropic or OpenAI)
6. Response parsed and validated
7. `recommendedIds` updated
8. ProductGrid re-renders with highlighting
9. Filter automatically switches to 'recommended' if results found

## API Integration

### Supported Providers

**Anthropic Claude**
- Model: Claude 3.5 Sonnet
- Endpoint: `https://api.anthropic.com/v1/messages`
- Format: JSON request with system prompt
- Response: Structured JSON with recommendations

**OpenAI GPT**
- Model: GPT-4o Mini
- Endpoint: `https://api.openai.com/v1/chat/completions`
- Format: Chat completion format
- Response: Structured JSON with recommendations

### AI Prompt Strategy

**System Prompt includes:**
- Role definition (phone expert)
- Complete product catalog
- Expected JSON output format
- Constraints (max 4 recommendations)
- Precision requirements

**User Query Processing:**
- Sent as-is to AI
- AI analyzes against catalog
- AI returns JSON with phone IDs

**Response Validation:**
- Check for valid JSON
- Verify all IDs exist in catalog
- Validate array structure
- Sanitize any invalid IDs

## Filtering Logic

### Filter Categories

```
'all'          → All 12 phones
'recommended'  → Only recommended phone IDs
'budget'       → price < 400
'premium'      → price >= 400
```

### Implementation in ProductGrid

```javascript
const filteredPhones = useMemo(() => {
  let result = phones;
  
  if (activeFilter === 'recommended') {
    result = result.filter(p => recommendedIds.includes(p.id));
  } else if (activeFilter === 'budget') {
    result = result.filter(p => p.price < 400);
  } else if (activeFilter === 'premium') {
    result = result.filter(p => p.price >= 400);
  }
  
  return result;
}, [phones, recommendedIds, activeFilter]);
```

## Error Handling Strategy

### Error Levels

1. **Configuration Errors**
   - Missing API key
   - Invalid provider
   - User-friendly message with setup link

2. **API Errors**
   - Network failures
   - Invalid response format
   - Timeout errors
   - Displayed as error banner

3. **Validation Errors**
   - Invalid phone IDs
   - Missing required fields
   - Logged and filtered silently

### Error Recovery

```javascript
try {
  const response = await getAIRecommendations(input, PHONES_DATA);
  // Process response
} catch (err) {
  console.error('Error:', err);
  setError(err.message || 'Failed to get recommendations');
}
```

## Performance Optimizations

### Memoization

**useMemo for ProductGrid:**
- Prevents unnecessary filtering on every render
- Only recalculates when dependencies change

**useCallback for Handlers:**
- Memoizes event handlers
- Prevents child component re-renders

### Rendering Optimization

- Components only re-render when props change
- Efficient grid layout with CSS
- Minimal DOM updates

### API Call Optimization

- Single request per search
- No polling or continuous requests
- Debounce input if needed (not currently implemented)

## Styling Approach

### CSS Architecture

1. **CSS Variables** - Theming and dark mode support
2. **BEM Naming** - Block Element Modifier for clarity
3. **Responsive Design** - Mobile-first approach
4. **Accessibility** - Focus states, semantic HTML

### Theme Variables

```css
--color-text-primary        /* Main text */
--color-text-secondary      /* Secondary text */
--color-background-primary  /* Main background */
--color-border-primary      /* Borders */
--border-radius-md          /* Button radius */
/* ... etc */
```

### Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Security Considerations

### API Key Management

- Stored in `.env` file (not committed)
- Read from environment variables at runtime
- Never logged or exposed in console
- Error messages don't reveal key

### Data Handling

- User input sanitized by framework
- No user data stored locally
- No tracking or analytics
- Queries sent only to AI API

### Cross-Origin

- Handled by Vite dev server
- Production deployment handles CORS
- API calls made from client (standard for frontend)

## Extensibility

### Adding New Products

```javascript
// Edit phonesCatalog.js
{
  id: 13,
  name: 'New Phone',
  // ... other fields
}
```

### Adding New Filters

```javascript
// ProductGrid.jsx - add filter case
if (activeFilter === 'custom') {
  result = result.filter(p => customCondition(p));
}

// FilterButtons.jsx - add button
{ key: 'custom', label: 'Custom Filter' }
```

### Switching AI Providers

Just change `.env`:
```env
VITE_AI_PROVIDER=openai  # or 'anthropic'
VITE_AI_API_KEY=sk-...
```

## Testing Recommendations

### Unit Tests
- Individual component rendering
- Filter logic accuracy
- Data transformation functions

### Integration Tests
- API response handling
- End-to-end recommendation flow
- Filter + recommendation combinations

### Manual Testing
- Try various query types
- Test all filters
- Test error scenarios
- Mobile responsiveness

## Future Enhancements

1. **User Preferences Storage**
   - Save favorite phones
   - Search history
   - Preference profiles

2. **Advanced Filtering**
   - Price range slider
   - Multi-select features
   - Comparison mode

3. **Product Details**
   - Expandable product pages
   - Specification details
   - Similar product recommendations

4. **Analytics**
   - Track popular queries
   - Recommendation accuracy metrics
   - User behavior analysis

5. **Caching**
   - Cache API responses
   - Reduce redundant calls
   - Offline functionality

---

**This architecture prioritizes:**
- ✅ Maintainability through clear separation of concerns
- ✅ Scalability through modular components
- ✅ Performance through optimizations
- ✅ User experience through error handling
- ✅ Developer experience through documentation
