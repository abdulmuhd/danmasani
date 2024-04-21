import translate from '@iamtraction/google-translate';
import { Router } from 'express';
import { config } from 'dotenv'
import Gemini from 'gemini-ai'
import fetch from 'node-fetch'; // Only import if needed for external API calls

config()
const ask = Router();
const key = process.env.APIKEY
const gemini = new Gemini('AIzaSyBMCYspiseDy-M4hEMvznJGjLgLtxBD4jA')
const chat = gemini.createChat();

ask.post('/', async (req, res) => {
  const text = req.body.text;

  if (!text) {
    return res.send('Enter message');
  }

  try {
    const translatedText = await translateText(text, 'ha', 'en');
    const response = await askGemini(translatedText);
    const translatedAns = await translateText(response, 'en', 'ha');

    res.status(200).send(translatedAns);

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

const translateText = async (text, fr, to) => {
  const translation = await translate(text, { from: fr, to: to });
  return translation.text;
}

const askGemini = async (question) => {
  const response = await chat.ask(question);
  return response;
}

export default ask;