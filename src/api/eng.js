import translate from '@iamtraction/google-translate';
import { Router } from 'express';
import { config } from 'dotenv'
import Gemini from 'gemini-ai'
import fetch from 'node-fetch'; // Only import if needed for external API calls

config()
const eng = Router();

const gemini = new Gemini(process.env.APIKEY)
const chat = gemini.createChat();

eng.post('/', (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.json({ ans: 'Enter message' });
  }

  try {
    const response = await askGemini(text);
    
    res.status(200).json({ "ans": response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ "error": 'Internal Server Error' });
  }

})

const askGemini = async (question) => {
  const response = await chat.ask(question);
  return response;
}

export default eng