import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "tests",
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
  webServer: {
    command: "npx serve . -l 3123",
    port: 3123,
    reuseExistingServer: true,
  },
});
