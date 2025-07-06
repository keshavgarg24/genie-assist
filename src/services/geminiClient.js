
import { GoogleGenerativeAI } from '@google/generative-ai';
import chalk from 'chalk';

export class GeminiClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  }

  async validateApiKey() {
    try {
      const result = await this.model.generateContent('Hello! This is a test.');
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        throw new Error('Invalid API response');
      }
      
      return true;
    } catch (error) {
      throw new Error(`API key validation failed: ${error.message}`);
    }
  }

  async generateContent(prompt, options = {}) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error(chalk.red('🚨 Gemini API Error:'), error.message);
      throw error;
    }
  }

  async generateContentStream(prompt) {
    try {
      const result = await this.model.generateContentStream(prompt);
      return result.stream;
    } catch (error) {
      console.error(chalk.red('🚨 Gemini API Error:'), error.message);
      throw error;
    }
  }

  async startChat(history = []) {
    try {
      const chat = this.model.startChat({
        history: history,
        generationConfig: {
          maxOutputTokens: 1000,
          temperature: 0.7,
        },
      });
      
      return chat;
    } catch (error) {
      console.error(chalk.red('🚨 Chat initialization error:'), error.message);
      throw error;
    }
  }
}
