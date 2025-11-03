# Real or AI? 🎃 — MERN Stack Game

A visually futuristic, Halloween-themed interactive game where users guess whether shown media files (images or videos) are AI-generated or real.

## 🚀 Tech Stack

- **Frontend:** React + TailwindCSS
- **Backend:** Node.js + Express

## 📋 Features

- 40 questions total (20 images + 20 videos)
- Dynamic score tracking (+200 for correct, -100 for incorrect)
- 10-second timer for images only (videos have no timer)
- Session-based caching to prevent duplicate questions
- Futuristic Halloween-themed UI with glassmorphism effects
- Animated transitions and glitch effects
- Skip button for failed media loads

## 🛠️ Setup Instructions

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
ai_or_irl/
├── assets/
│   ├── ai/          # AI-generated media files
│   └── real/        # Real media files
├── backend/
│   ├── server.js    # Express server
│   └── package.json
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── StartScreen.js
    │   │   ├── GameScreen.js
    │   │   └── ResultsScreen.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## 🎮 Game Rules

- Each game consists of 40 questions (20 images, 20 videos)
- Images have a 10-second timer (auto-skip if time expires)
- Videos have no timer — watch the full clip
- Correct answer: +200 points
- Incorrect answer: -100 points
- Skip button: No score change

## 🎨 Customization

### Adding Ambient Sound

To add background ambient sound, place an `ambient.mp3` file in the `frontend/public/` directory. The game will automatically attempt to play it in the background.

## 🔧 API Endpoints

- `GET /api/random-media` - Get a random media file with label
- `POST /api/reset-session` - Reset the current game session
- `GET /api/health` - Health check endpoint

## 📝 Notes

- Ensure you have Node.js installed (v14 or higher recommended)
- The backend serves static files from the `assets` directory
- Session ID is managed automatically by the frontend
- Each game session tracks used files to prevent duplicates


