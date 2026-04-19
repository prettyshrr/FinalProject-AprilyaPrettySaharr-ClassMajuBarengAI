import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

// ESM __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Gemini AI setup
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const GEMINI_MODEL = 'gemini-2.5-flash';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// POST /api/chat — multi-turn conversation endpoint
app.post('/api/chat', async (req, res) => {
  const { conversation } = req.body;

  try {
    if (!Array.isArray(conversation)) {
      throw new Error('Messages must be an array!');
    }

    // Map conversation to Gemini format
    const contents = conversation.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));

    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      contents,
      config: {
        temperature: 0.7,
        topK: 40,
        topP: 0.9,
        systemInstruction: `You are EduBot, a friendly and knowledgeable AI tutor. 
Your role is to help students learn and understand any topic clearly and engagingly.
Guidelines:
- Explain concepts in simple, easy-to-understand language
- Use examples and analogies to clarify difficult ideas
- Encourage curiosity and ask follow-up questions when helpful
- Keep answers concise but thorough
- If a student seems confused, offer to explain differently
- Always be patient, supportive, and positive
- Answer in the same language the student uses (Indonesian or English)`,
      },
    });

    res.status(200).json({ result: response.text });
  } catch (e) {
    console.error('Error:', e.message);
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`EduBot server running on http://localhost:${PORT}`);
});
