/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
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
        baseURL: process.env.API_BASE_URL ?? 'https://api.realworld.show/api/',
      },
    },

    {
      name: 'chromium',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.UI_BASE_URL ?? 'https://demo.realworld.show/',
      },
    },

    {
      name: 'firefox',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: process.env.UI_BASE_URL ?? 'https://demo.realworld.show/',
      },
    },

    {
      name: 'webkit',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Safari'],
        baseURL: process.env.UI_BASE_URL ?? 'https://demo.realworld.show/',
      },
    },
  ],
});