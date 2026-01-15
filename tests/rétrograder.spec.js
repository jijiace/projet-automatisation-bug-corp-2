import { test, expect } from "@playwright/test";

test("rétrograder(case)", async ({ page }) => {
  await page.goto("https://bugcorp.vercel.app/");
  await page.getByTestId("nav-directory").click();
  await page.getByTestId("checkbox-1001").check();
  await page.getByText("Rétrograder", { exact: true }).click();
});

test("rétrograder(icone)", async ({ page }) => {
  await page.goto("https://bugcorp.vercel.app/");
  await page.getByTestId("nav-directory").click();
  await page.getByRole("cell", { name: "DR Dennis Ritchie dennis." }).click({
    button: "middle",
  });
  await page.getByRole("cell", { name: "DR Dennis Ritchie dennis." }).click({
    button: "middle",
  });
  await page
    .getByTestId("row-1001")
    .getByRole("cell", { name: "Juridique" })
    .click({
      button: "middle",
    });
  await page.getByTestId("demote-btn-1001").click();
});
