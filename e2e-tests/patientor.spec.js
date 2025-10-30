const { test, describe, expect } = require("@playwright/test");

describe("Patientor", () => {
  test("front page with patient list can be opened", async ({ page }) => {
    await page.goto("");
    await expect(page.getByText("Hans Gruber")).toBeVisible();
    await expect(page.getByText("Patient list")).toBeVisible();
  });

  test("patient page can be navigated to", async ({ page }) => {
    await page.goto("");
    const locator = page.getByText("Hans Gruber");
    await expect(locator).toBeVisible();
    await locator.click();
    await expect(page.getByText("1970-04-25")).toBeVisible();
  });
});
