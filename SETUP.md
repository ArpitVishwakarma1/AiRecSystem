# 🚀 Setup Guide - AI Phone Recommender

Complete step-by-step instructions to get the application running in minutes.

## Step 1: Get an API Key (2 minutes)

### Option A: Anthropic Claude (Recommended - Free tier available)
1. Go to https://console.anthropic.com
2. Click "Sign Up" (free account)
3. Navigate to "API Keys" section
4. Click "Create Key" and copy it
5. Your key will look like: `sk-ant-...`

### Option B: OpenAI GPT (Alternative)
1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the key (looks like: `sk-...`)
5. Note: OpenAI requires a credit card

## Step 2: Configure Environment (1 minute)

1. Open `.env` file in the project root
2. Paste your API key after `VITE_AI_API_KEY=`

### For Anthropic (default setup):
```env
VITE_AI_PROVIDER=anthropic
VITE_AI_API_KEY=sk-ant-xxxxxxxxxxxxx
```

### For OpenAI (alternative setup):
```env
VITE_AI_PROVIDER=openai
VITE_AI_API_KEY=sk-xxxxxxxxxxxxx
```

3. Save the file (Ctrl+S or Cmd+S)

## Step 3: Install & Run (3 minutes)

Open your terminal in the project folder:

```bash
# Install dependencies (one-time, ~2 minutes)
npm install

# Start the development server
npm run dev
```

The app will automatically open at `http://localhost:3000`

## Step 4: Test It Out!

1. **Try a Quick Chip:**
   - Click "Under $300" to test AI recommendations

2. **Custom Query:**
   - Type: "Best camera phone under $600"
   - Click "Ask AI ↗"
   - See AI-recommended phones highlighted

3. **Filter Results:**
   - Click "AI Picks" to see only recommendations
   - Click "Under $400" for budget phones
   - Click "All phones" to reset

## 🎯 Example Queries

Try these to explore the system:

✅ "Best phone under $300"
✅ "Phone with the best camera"
✅ "Long battery life phone"
✅ "Best performance flagship"
✅ "Budget Android under $200"
✅ "Good iPhone alternative"

## 📊 What's Happening Under the Hood

1. **You type a query** → Sent to AI
2. **AI analyzes** → Reads product catalog
3. **AI recommends** → Returns product IDs
4. **App highlights** → Shows recommended phones in blue
5. **You explore** → Filter and compare

## ✅ Troubleshooting

### Problem: "Vite not found"
```bash
npm install
npm run dev
```

### Problem: "API key error"
1. Double-check your `.env` file has `VITE_AI_API_KEY=`
2. Verify key is copied completely (no extra spaces)
3. Make sure you're using the right provider

### Problem: "Blank page"
1. Hard refresh browser: Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. Clear cache: Settings → Privacy → Clear browsing data
3. Check browser console for errors (F12 → Console tab)

### Problem: Can't get API key
**Anthropic** - Free tier, easy signup: https://console.anthropic.com
**OpenAI** - Requires credit card: https://platform.openai.com

## 🚀 Going Live (Production Build)

When ready to deploy:

```bash
# Create optimized build
npm run build

# Preview build locally
npm run preview

# Deploy the 'dist' folder to any hosting service
# Examples: Vercel, Netlify, GitHub Pages, etc.
```

## 📁 Project Structure Quick Reference

```
ai-phone-recommender/
├── src/
│   ├── components/      ← React UI components
│   ├── services/        ← AI API integration
│   ├── data/           ← Phone catalog
│   ├── styles/         ← CSS styling
│   └── App.jsx         ← Main component
├── .env                ← Your API key (confidential)
├── package.json        ← Dependencies
└── README.md          ← Full documentation
```

## 🎓 Learning Resources

### React Hooks Used
- `useState` - State management
- `useCallback` - Memoized functions
- `useMemo` - Memoized values

### Key Concepts
- Component composition
- API integration
- State management
- Conditional rendering
- Array filtering

## 🔒 Security Notes

⚠️ **Important:**
- `.env` is in `.gitignore` - your API key won't be committed
- Never share your API key publicly
- If key is exposed, regenerate it on the provider's website
- The app only sends queries to the AI API, no data storage

## ✨ Next Steps (Optional Enhancements)

After getting the basic version running:

1. **Add more products** → Edit `phonesCatalog.js`
2. **Change styling** → Update `index.css`
3. **Add product details** → Expand `ProductCard.jsx`
4. **Store preferences** → Add localStorage
5. **Deploy online** → Push to Vercel/Netlify

## 🎯 For Assessment/Interview

This project demonstrates:
- ✅ React skills (components, hooks, state)
- ✅ API integration (error handling, async)
- ✅ Clean code (structure, comments, style)
- ✅ Problem-solving (filtering, data flow)
- ✅ UI/UX design (responsive, accessible)
- ✅ Documentation (README, code comments)

## 💡 Tips

- **Fast iteration:** Save files, browser auto-refreshes
- **Check console:** F12 → Console for error messages
- **Dark mode:** Works automatically based on OS settings
- **Mobile ready:** Fully responsive design

---

**Ready? Run `npm run dev` and start exploring!** 🚀

Got stuck? Check the README.md for more detailed information.
