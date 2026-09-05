/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';
import { config } from './src/config/environment';

export default defineConfig({
  testDir: './tests',
  timeout: config.defaultTimeout,
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : 2,

  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        baseURL: config.apiBaseUrl,
      },
    },

    {
      name: 'chromium',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: config.uiBaseUrl,
      },
    },

    {
      name: 'firefox',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: config.uiBaseUrl,
      },
    },

    {
      name: 'webkit',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Safari'],
        baseURL: config.uiBaseUrl,
      },
    },
  ],
});