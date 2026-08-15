/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,

  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'api',
      testMatch: '**/api/**/*.spec.ts',
      use: {
        baseURL: 'https://api.realworld.show/api/',
      },
    },

    {
      name: 'chromium',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://demo.realworld.show/',
      },
    },

    {
      name: 'firefox',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Firefox'],
        baseURL: 'https://demo.realworld.show/',
      },
    },

    {
      name: 'webkit',
      testMatch: '**/ui/**/*.spec.ts',
      use: {
        ...devices['Desktop Safari'],
        baseURL: 'https://demo.realworld.show/',
      },
    },
  ],
});