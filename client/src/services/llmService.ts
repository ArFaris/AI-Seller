import { generateDescriptionPrompt, suggestPricePrompt } from 'utils/llmPrompts';
import type { ProductFormData } from 'types/formData';
import { parsePriceSuggestion } from 'utils/priceParser';

const OLLAMA_URL = 'http://localhost:11434/api/generate';
const MODEL = 'mistral';
const TIMEOUT = 90000;

type OllamaResponse = {
  response: string;
  done: boolean;
};

async function callOllama(prompt: string): Promise<string> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: MODEL,
        prompt: prompt,
        stream: false,
        options: { temperature: 0.7 }
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data: OllamaResponse = await response.json();
    return data.response.trim();
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Превышено время ожидания ответа от AI');
    }
    throw error;
  }
}

export async function generateDescription(product: ProductFormData): Promise<string> {
    console.log('generate begin')
    const prompt = generateDescriptionPrompt(product);
    return callOllama(prompt);
}

export async function suggestPrice(product: ProductFormData): Promise<{
  price: number;
  analysis: string;
}> {
  const prompt = suggestPricePrompt(product);
  const response = await callOllama(prompt);
  
  const parsed = parsePriceSuggestion(response);
  
  return {
    price: parsed.suggestedPrice,
    analysis: parsed.formattedResponse
  };
}
