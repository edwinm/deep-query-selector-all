import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/demo/test.html");
  await page.waitForFunction(() => customElements.get("panel-component"));
});

test("finds all 5 code elements across DOM, shadow DOM, and slots", async ({
  page,
}) => {
  const texts = await page.evaluate(async () => {
    const { deepQuerySelectorAll } = await import("/dist/dqsa.js");
    return deepQuerySelectorAll("code").map(
      (el: Element) => el.textContent,
    );
  });
  expect(texts).toHaveLength(5);
  expect(texts).toContain("[A]");
  expect(texts).toContain("[B]");
  expect(texts).toContain("[C]");
  expect(texts.filter((t: string) => t === "[D]")).toHaveLength(2);
});

test("finds element in regular DOM", async ({ page }) => {
  const texts = await page.evaluate(async () => {
    const { deepQuerySelectorAll } = await import("/dist/dqsa.js");
    const main = document.querySelector("main")!;
    return deepQuerySelectorAll("code", main).map(
      (el: Element) => el.textContent,
    );
  });
  expect(texts).toContain("[A]");
});

test("finds elements in slots inside web components", async ({ page }) => {
  const texts = await page.evaluate(async () => {
    const { deepQuerySelectorAll } = await import("/dist/dqsa.js");
    return deepQuerySelectorAll("code").map(
      (el: Element) => el.textContent,
    );
  });
  expect(texts).toContain("[B]");
  expect(texts).toContain("[C]");
});

test("finds elements inside shadow DOM", async ({ page }) => {
  const texts = await page.evaluate(async () => {
    const { deepQuerySelectorAll } = await import("/dist/dqsa.js");
    return deepQuerySelectorAll("code").map(
      (el: Element) => el.textContent,
    );
  });
  expect(texts.filter((t: string) => t === "[D]")).toHaveLength(2);
});

test("returns empty array for non-matching selector", async ({ page }) => {
  const count = await page.evaluate(async () => {
    const { deepQuerySelectorAll } = await import("/dist/dqsa.js");
    return deepQuerySelectorAll(".nonexistent").length;
  });
  expect(count).toBe(0);
});

test("works with a custom root element", async ({ page }) => {
  const texts = await page.evaluate(async () => {
    const { deepQuerySelectorAll } = await import("/dist/dqsa.js");
    const panel = document.querySelector("panel-component")!;
    return deepQuerySelectorAll("code", panel).map(
      (el: Element) => el.textContent,
    );
  });
  // First panel-component contains [B], [C] (nested), and two [D]s
  expect(texts).toContain("[B]");
  expect(texts).toContain("[D]");
  expect(texts).not.toContain("[A]");
});
