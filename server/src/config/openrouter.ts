import axios from 'axios';

const apiKey = process.env.OPENROUTER_API_KEY;

if (!apiKey) {
  console.error(
    'OpenRouter configuration error: OPENROUTER_API_KEY is not defined in .env'
  );
  process.exit(1);
}

const siteUrl = process.env.SITE_URL || 'http://localhost:5173';

export const openRouter = axios.create({
  baseURL: 'https://openrouter.ai/api/v1',
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'HTTP-Referer': siteUrl,
    'Content-Type': 'application/json',
  },
});

export const MODEL = 'openai/gpt-oss-120b:free';
