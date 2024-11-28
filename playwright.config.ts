import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'on-failure' }],
     ['json', { outputFile: 'reports.json'}],
     ['junit', { outputFile: 'results.xml'}],
    ['list', {printSteps:true}],
    //['line']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
     baseURL: 'https://app.asana.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot:'only-on-failure'
  },

  /* Configure projects for major browsers */
  projects: [
///////////////////////////////////////////////CHROME///////////////////////////////////////////////////
    {
      name: 'chromeSetup',
      testMatch: /global\.setup\.ts/,
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080},
      },
      teardown: 'chromeTeardown'
    },
 
    {
      name: 'chromeTeardown',
      testMatch: /global\.teardown\.ts/,
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080},
        storageState: './saved-auths/chromeSetup.json'
      },
    },
 
    {
      name: 'chromium',
      testMatch: '**/tests/ui/*.spec.ts',
      dependencies: ['chromeSetup'],
      use: { 
        ...devices['Desktop Chrome'],
        storageState: './saved-auths/chromeSetup.json',
        viewport: { width: 1920, height: 1080},
        //no viewport - Defaults to an 1280x720 viewport.
      },
      testIgnore: ['tests/ui/validateLogin.spec.ts']     
    },

    {
      name: 'chromium',
      testMatch: '**/tests/ui/validateLogin.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },

    ///////////////////////////////////////////////firefox///////////////////////////////////////////////////

    {
      name: 'firefoxSetup',
      testMatch: /global\.setup\.ts/,
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080},
      },
      teardown: 'firefoxTeardown'
    },
 
    {
      name: 'firefoxTeardown',
      testMatch: /global\.teardown\.ts/,
      use: { 
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080},
        storageState: './saved-auths/firefoxSetup.json'
      },
    },
 
    {
      name: 'firefox',
      testMatch: '**/tests/ui/*.spec.ts',
      dependencies: ['firefoxSetup'],
      use: { 
        ...devices['Desktop Firefox'],
        storageState: './saved-auths/firefoxSetup.json',
        viewport: { width: 1920, height: 1080},
        //no viewport - Defaults to an 1280x720 viewport.
      },
      testIgnore: ['tests/ui/validateLogin.spec.ts']     
    },

    {
      name: 'firefox',
      testMatch: '**/tests/ui/validateLogin.spec.ts',
      use: { ...devices['Desktop Firefox'] },
    },

    ///////////////////////////////////////////////webkit///////////////////////////////////////////////////

    {
      name: 'webkitSetup',
      testMatch: /global\.setup\.ts/,
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080},
      },
      teardown: 'webkitTeardown'
    },
 
    {
      name: 'webkitTeardown',
      testMatch: /global\.teardown\.ts/,
      use: { 
        ...devices['Desktop Safari'],
        viewport: { width: 1920, height: 1080},
        storageState: './saved-auths/webkitSetup.json'
      },
    },
 
    {
      name: 'webkit',
      testMatch: '**/tests/ui/*.spec.ts',
      dependencies: ['webkitSetup'],
      use: { 
        ...devices['Desktop Safari'],
        storageState: './saved-auths/webkitSetup.json',
        viewport: { width: 1920, height: 1080},
        //no viewport - Defaults to an 1280x720 viewport.
      },
      testIgnore: ['tests/ui/validateLogin.spec.ts']     
    },

    {
      name: 'webkit',
      testMatch: '**/tests/ui/validateLogin.spec.ts',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
