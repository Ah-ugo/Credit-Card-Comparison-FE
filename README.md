# Credit Card Comparison App

A comprehensive credit card comparison web application with GenAI integration for Indian banks. Built with Next.js, FastAPI, MongoDB, and Google Gemini AI.

## 🚀 Features

- **AI-Powered Search**: Natural language queries using Google Gemini API
- **Smart Card Comparison**: Side-by-side comparison with AI-generated summaries
- **Comprehensive Database**: Credit cards from major Indian banks with detailed information
- **Advanced Filtering**: Filter by rewards, travel benefits, annual fees, card types, etc.
- **Price History Visualization**: Interactive charts showing fee trends over time
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Analytics**: Track user queries and popular searches

## 🛠 Tech Stack

### Frontend

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Recharts** - Data visualization library

### Backend

- **FastAPI** - Modern Python web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Google Gemini AI** - Advanced language model for natural language processing
- **Pydantic** - Data validation and serialization

## 📋 Prerequisites

- Node.js 18+
- Python 3.8+
- MongoDB
- Google Gemini API key

The application is be available at:

- Frontend: http://localhost:3000
- Backend API: https://credit-card-comparison-be.onrender.com/
- API Documentation: https://credit-card-comparison-be.onrender.com/docs

## 🎯 Usage

### 1. Browse Credit Cards

- View all available credit cards with filtering and sorting options
- Filter by bank, card type, annual fee, rewards rate, etc.
- Sort by recommended, fees, rewards, or ratings

### 2. AI-Powered Search

- Use natural language queries like:
  - "Show me cards with airport lounge access and no annual fee"
  - "Best cashback cards for online shopping"
  - "Premium travel cards under ₹5000 annual fee"

### 3. Compare Cards

- Select any two cards for detailed side-by-side comparison
- View AI-generated comparison summaries
- Compare features, fees, benefits, and eligibility criteria

### 4. Detailed Card Information

- Click on any card to view comprehensive details
- See benefits, fees, eligibility requirements, and price history
- View AI-generated summaries highlighting key features

## 🔌 API Endpoints

### Cards Management

- \`GET /cards\` - Get all credit cards
- \`GET /cards/{card_id}\` - Get specific card details
- \`POST /cards\` - Create new card (admin)
- \`PUT /cards/{card_id}\` - Update card (admin)
- \`DELETE /cards/{card_id}\` - Delete card (admin)

### AI Features

- \`POST /search\` - Search cards using natural language
- \`POST /compare\` - Compare two cards with AI summary
- \`POST /cards/{card_id}/generate-summary\` - Generate AI summary

### Analytics

- \`GET /analytics/queries\` - Get search analytics
- \`GET /health\` - Health check endpoint

## 🚀 Deployment

### Frontend (Vercel)

\`\`\`bash
npm run build

# Deploy to Vercel or your preferred platform

\`\`\`

### Backend (Render)

\`\`\`bash

# Set environment variables in your deployment platform

# Deploy the FastAPI application

\`\`\`

### Database (MongoDB Atlas)

- Create a MongoDB Atlas cluster
- Update \`MONGODB_URI\` in environment variables
- Ensure network access is configured
