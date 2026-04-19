# EduBot — AI Education Chatbot

A simple AI-powered education chatbot built with **Node.js + Express** (backend) and **Vanilla JavaScript** (frontend), powered by **Google Gemini 2.5 Flash**.

## Use Case
EduBot acts as a friendly AI tutor that helps students learn any topic. It maintains conversation history for multi-turn context and responds in the same language as the user (Indonesian or English).

## Tech Stack
- **Backend**: Node.js, Express
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **AI Model**: Google Gemini 2.5 Flash (`@google/genai`)

## Gemini Configuration
| Parameter | Value | Purpose |
|-----------|-------|---------|
| `temperature` | 0.7 | Balanced creativity and accuracy |
| `topK` | 40 | Limits token candidates |
| `topP` | 0.9 | Nucleus sampling for natural responses |
| `systemInstruction` | EduBot persona | Sets tutor behavior and tone |

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```
   Then add your Gemini API key to `.env`:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run the server**
   ```bash
   node index.js
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## Project Structure
```
gemini-education-chatbot/
├── public/
│   ├── index.html    # Chat UI
│   ├── script.js     # Frontend logic (fetch + DOM)
│   └── style.css     # Styling
├── .env              # API key (not committed)
├── .env.example      # Template
├── .gitignore
├── index.js          # Express server + Gemini integration
├── package.json
└── README.md
```

## API Endpoint

**POST** `/api/chat`

Request body:
```json
{
  "conversation": [
    { "role": "user", "text": "What is photosynthesis?" }
  ]
}
```

Response:
```json
{
  "result": "Photosynthesis is the process by which plants..."
}
```
