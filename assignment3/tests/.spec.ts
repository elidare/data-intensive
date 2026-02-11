import { test, expect } from "@playwright/test";

const base_url = "http://localhost:8000/";

// Todo: test databases with test data

test("has title", async ({ page }) => {
  await page.goto(base_url);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/frontend/);
});

test("has correct data in Teams table", async ({ page }) => {
  await page.goto(base_url);

  const table_container = page.locator(".table-container").first(); // First container

  const team_name = table_container.locator("table td:nth-child(2)").first();

  await expect(team_name).toHaveText("Scuderia Ferrari HP");
});
