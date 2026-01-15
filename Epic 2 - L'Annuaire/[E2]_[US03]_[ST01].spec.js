import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://bugcorp.vercel.app/");
  await page.getByTestId("nav-directory").click();
  await page.getByTestId("checkbox-1001").check();
  await page.getByText("Virer", { exact: true }).click();
  await page.getByTestId("fire-step1-confirm").click();
  await page.getByTestId("fire-step2-confirm").click();
  await page.getByTestId("fire-confirm-input").fill("");
  await page.getByTestId("fire-confirm-input").press("CapsLock");
  await page.getByTestId("fire-confirm-input").fill("DELETE");
  await page.getByTestId("fire-step3-confirm").click();
  await page.getByTestId("select-all-checkbox").check();
  await page.getByText("Rétrograder", { exact: true }).click();
  await page.getByRole("columnheader").filter({ hasText: /^$/ }).click();
  await page.getByText("Virer", { exact: true }).click();
  await page.getByTestId("fire-step1-confirm").click();
  await page.getByTestId("fire-step2-confirm").click();
  await page.getByTestId("fire-confirm-input").click();
  await page.getByTestId("fire-confirm-input").fill("DELETE");
  await page.getByTestId("fire-step3-confirm").click();
});
