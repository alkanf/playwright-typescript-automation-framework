import dotenv from 'dotenv';
import path from 'path';

// Load .env file from project root
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export interface AppConfig {
  apiBaseUrl: string;
  uiBaseUrl: string;
  defaultTimeout: number;
}

export const config: AppConfig = {
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.realworld.show/api/',
  uiBaseUrl: process.env.UI_BASE_URL || 'https://demo.realworld.show/',
  defaultTimeout: Number(process.env.DEFAULT_TIMEOUT) || 30000,
};
