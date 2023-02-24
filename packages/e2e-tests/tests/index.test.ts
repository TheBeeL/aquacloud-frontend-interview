import { test, expect } from "@playwright/test";

test("has search component", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByRole("form")).toBeVisible();
  const button = page.getByRole("button", { name: /search/i });
  await expect(button).toBeVisible();
  await expect(button).toBeDisabled();
  await expect(page.getByRole("textbox")).toBeVisible();
});

test("has ThemeSelector component", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByLabel(/theme/i)).toBeVisible();
});

test("doesn't have list component at start", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByRole("list")).not.toBeVisible();
});

test("succsefful search", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("textbox").fill("money");
  await page.getByRole("button").click();
  while ((await page.getByText(/loading/i).count()) > 0) {}
  await expect(page.getByRole("list")).toBeVisible();
  await expect(page.locator("li")).toHaveCount(15);
});

test("min 3 length", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const textInput = page.getByRole("textbox");
  const button = page.getByRole("button");

  await textInput.fill("no");
  await expect(button).toBeDisabled();

  await textInput.fill("yes");
  await expect(button).not.toBeDisabled();
});

test("infinite scroll", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("textbox").fill("money");
  await page.getByRole("button").click();
  while ((await page.getByText(/loading/i).count()) > 0) {}
  page.keyboard.down("End");
  while ((await page.getByText(/loading/i).count()) > 0) {}
  await expect(page.locator("li")).toHaveCount(30);
  await expect(page.getByText("No more jokes")).toBeVisible();
});

test("system color scheme", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await expect(page.getByLabel(/theme/i)).toHaveValue("system");

  const body = page.locator("body");
  await expect(body).not.toHaveClass("dark");

  await page.emulateMedia({ colorScheme: "dark" });
  await expect(body).toHaveClass("dark");
});

test("force dark mode", async ({ page }) => {
  await page.goto("http://localhost:3000");

  const body = page.locator("body");
  await page.getByLabel(/theme/i).selectOption("dark");
  await expect(body).toHaveClass("dark");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(body).toHaveClass("dark");
});

test("force light mode", async ({ page }) => {
  await page.goto("http://localhost:3000");
  const body = page.locator("body");
  await page.getByLabel(/theme/i).selectOption("light");
  await expect(body).not.toHaveClass("dark");
  await page.emulateMedia({ colorScheme: "dark" });
  await expect(body).not.toHaveClass("dark");
});
