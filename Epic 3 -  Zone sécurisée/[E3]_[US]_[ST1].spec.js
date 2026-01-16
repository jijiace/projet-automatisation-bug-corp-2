import { test, expect } from "@playwright/test";

test("e²e", async ({ page }) => {
  await page.goto("https://bugcorp.vercel.app/");
  await page.getByTestId("nav-secure").click();
  await page.getByRole("textbox", { name: "Identifiant" }).click();
  await page.getByRole("textbox", { name: "Identifiant" }).fill("admin");
  await page.getByText("password123").click();
  await page.getByText("password123").click();
  await page.getByText("password123").click();
  await page.locator("body").press("ControlOrMeta+c");
  await page.getByRole("textbox", { name: "Mot de passe" }).click();
  await page.getByRole("textbox", { name: "Mot de passe" }).fill("password123");
  await page.getByRole("button", { name: "Déverrouiller" }).click();
  await page.getByRole("button", { name: "SW-1" }).click();
  await page.getByRole("button", { name: "SW-2" }).click();
  await page.getByRole("button", { name: "SW-3" }).click();
  await page.getByRole("button", { name: "SW-4" }).click();
  await page.getByRole("slider", { name: "Puissance 0%" }).fill("100");
  await page.getByRole("button", { name: "Détruire" }).click();
  await page.getByRole("button", { name: "Hard Reboot" }).click();
});
