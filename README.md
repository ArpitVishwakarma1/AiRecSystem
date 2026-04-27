# 📱 AI Phone Recommender - Product Recommendation System

A modern React application that leverages AI to recommend smartphones based on user preferences. Built with React, Vite, and integrated with Claude AI (with OpenAI support).

## ✨ Features

- **AI-Powered Recommendations**: Uses Claude AI to analyze user preferences and recommend from a curated phone catalog
- **Smart Filtering**: Filter products by:
  - All phones
  - AI-recommended picks
  - Budget phones (under $400)
  - Premium phones ($400+)
- **Quick Presets**: One-click queries for common requests
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant filtering and recommendation highlighting
- **Clean Architecture**: Well-organized, maintainable React components
- **Error Handling**: Comprehensive error messages and validation

## 🛠️ Tech Stack

- **Frontend**: React 18.2
- **Build Tool**: Vite 5
- **Styling**: CSS3 (with CSS variables for theming)
- **AI API**: Anthropic Claude or OpenAI (configurable)
- **Node.js**: v16+ recommended

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- API key from either:
  - **Anthropic**: https://console.anthropic.com
  - **OpenAI**: https://platform.openai.com

## 🚀 Quick Start

### 1. Clone and Navigate
```bash
cd "ai rec"
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env with your API key and provider
# For Anthropic (default):
# VITE_AI_PROVIDER=anthropic
# VITE_AI_API_KEY=sk-ant-...

# For OpenAI (optional):
# VITE_AI_PROVIDER=openai
# VITE_AI_API_KEY=sk-...
```

### 4. Start Development Server
```bash
npm run dev
```

The application will open at `http://localhost:3000`

### 5. Build for Production
```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
ai-phone-recommender/
├── src/
│   ├── components/           # React components
│   │   ├── SearchBar.jsx      # User input form
│   │   ├── QuickChips.jsx     # Quick preset queries
│   │   ├── AIResponse.jsx     # AI recommendation display
│   │   ├── FilterButtons.jsx  # Product filters
│   │   ├── ProductGrid.jsx    # Product listing
│   │   └── ProductCard.jsx    # Individual product card
│   ├── services/
│   │   └── aiService.js       # AI API integration
│   ├── data/
│   │   └── phonesCatalog.js   # Product database
│   ├── styles/
│   │   └── index.css          # Global styling
│   ├── App.jsx                # Main app component
│   └── index.jsx              # Entry point
├── index.html                 # HTML template
├── vite.config.js            # Vite configuration
├── package.json              # Dependencies
├── .env.example              # Environment template
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Options |
|----------|-------------|---------|---------|
| `VITE_AI_PROVIDER` | AI provider to use | `anthropic` | `anthropic`, `openai` |
| `VITE_AI_API_KEY` | API key for the provider | (required) | See respective services |

### Adding More Products

Edit `src/data/phonesCatalog.js` to add new phones:

```javascript
{
  id: 13,
  name: 'New Phone Model',
  brand: 'Brand',
  price: 599,
  emoji: '📱',
  tags: ['Feature1', 'Feature2'],
  rating: 4.5,
  battery: 5000,
  camera: 108,
  perf: 90,
  category: 'budget',
  description: 'Phone description...'
}
```

## 🤖 AI Integration

### Supported Providers

#### Anthropic Claude (Default)
- Model: Claude 3.5 Sonnet
- Setup: Get API key from https://console.anthropic.com
- Environment: `VITE_AI_PROVIDER=anthropic`

#### OpenAI
- Model: GPT-4o Mini
- Setup: Get API key from https://platform.openai.com
- Environment: `VITE_AI_PROVIDER=openai`

### How It Works

1. User submits a preference query (e.g., "best camera phone under $600")
2. AI analyzes the query and available products
3. AI returns JSON with:
   - Recommended product IDs (max 4)
   - Summary explanation
   - Highlight of why these products match
4. Frontend highlights recommended products in the grid

## 🎯 Usage Examples

### Quick Queries
Click any preset chip:
- "Best phone under $300"
- "Best camera phone under $800"
- "Phone with longest battery life"
- "Flagship phone with best performance"

### Custom Queries
Enter any preference:
- "I need a phone for gaming under $500"
- "Best phone for photography"
- "Long battery life, affordable"
- "High-performance flagship"

### Filtering
After getting recommendations:
- **AI Picks**: View only recommended phones
- **Under $400**: Budget-friendly options
- **$400+**: Premium devices

## 🧪 Testing

The application includes built-in validation:
- ✅ API key configuration check
- ✅ Response format validation
- ✅ Product ID verification
- ✅ User input sanitization

## 📊 Code Quality

### Key Features
- **Component Isolation**: Each component handles a single responsibility
- **Error Handling**: Comprehensive try-catch blocks and user feedback
- **Performance**: Memoization and efficient re-renders with `useMemo`
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Responsive**: Mobile-first design with breakpoints
- **Dark Mode**: CSS variable support for theme switching

### Best Practices
- Clean separation of concerns (components, services, data)
- Reusable components with clear prop interfaces
- Proper state management with React hooks
- Environment variable configuration
- Meaningful variable and function names
- Comprehensive comments and docstrings

## 🐛 Troubleshooting

### "API key not configured"
- Create `.env` file in root directory
- Copy contents from `.env.example`
- Add your API key

### "Invalid response format"
- Check API key validity
- Verify API provider is correct
- Check internet connection
- Review browser console for errors

### "Blank page after running"
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console for errors
- Verify Node.js version: `node --version`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## 🚦 Performance Optimization

- Lazy component rendering
- Memoized computations
- Optimized API calls (single request per query)
- CSS animations for smooth UX
- Efficient re-render prevention

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 Evaluation Criteria Met

✅ **Basic Frontend Development**
- React components with hooks
- State management
- Event handling
- Conditional rendering

✅ **AI API Integration**
- Dual API support (Anthropic & OpenAI)
- Error handling
- API key configuration
- Proper request/response formatting

✅ **User Input Processing**
- Form submission handling
- Input validation
- Product filtering based on AI output
- Dynamic UI updates

✅ **Clean & Maintainable Code**
- Well-organized file structure
- Reusable components
- Clear naming conventions
- Comprehensive documentation
- Environment configuration
- Error handling throughout

## 📝 License

MIT License - Feel free to use this project for learning and development.

## 🤝 Contributing

Feel free to extend this project:
- Add more products
- Support additional AI providers
- Implement user preferences storage
- Add product detail views
- Create advanced filtering options

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the code comments
3. Check browser console for error messages
4. Verify environment configuration

---

**Built with ❤️ as a Product Recommendation System Assessment Project**
