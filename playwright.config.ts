import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 120000,
  retries: 1,
  use: {
    actionTimeout: 30000,
    navigationTimeout: 60000,
  },
});