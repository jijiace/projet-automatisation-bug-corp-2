import { test, expect } from "@playwright/test";
// on verifie qu'on peut bien supprimer un salarié
test("test", async ({ page }) => {
  await page.goto("https://bugcorp.vercel.app/");
  await page.getByTestId("nav-directory").click();
  await page.getByTestId("checkbox-1001").check();
  await page.getByText("Virer", { exact: true }).click();
  await page.getByTestId("fire-step1-confirm").click();
  await page.getByTestId("fire-step2-confirm").click();
  await page.getByTestId("fire-confirm-input").click();
  await page.getByTestId("fire-confirm-input").press("CapsLock");
  await page.getByTestId("fire-confirm-input").fill("D");
  await page.getByTestId("fire-confirm-input").press("CapsLock");
  await page.getByTestId("fire-confirm-input").fill("Delete");
  await page.getByTestId("fire-confirm-input").press("CapsLock");
  await page.getByTestId("fire-confirm-input").fill("DELETE");
  await page.getByTestId("fire-step3-confirm").click();
});
//on verifie qu'on peut bien supprimer un salarié via l icone
test("icone", async ({ page }) => {
  await page.goto("https://bugcorp.vercel.app/");
  await page.getByTestId("nav-directory").click();
  await page.getByTestId("nav-directory").press("ArrowRight");
  await page.getByTestId("row-1001").getByRole("cell", { name: "+" }).click({
    button: "middle",
  });
  await page
    .getByTestId("row-1007")
    .getByRole("cell", { name: "Crise Existentielle" })
    .click({
      button: "middle",
    });
  await page.getByTestId("fire-btn-1007").click();
  await page.getByTestId("fire-step1-confirm").click();
  await page.getByTestId("fire-step2-confirm").click();
  await page.getByTestId("fire-confirm-input").click();
  await page.getByTestId("fire-confirm-input").fill("");
  await page.getByTestId("fire-confirm-input").press("CapsLock");
  await page.getByTestId("fire-confirm-input").fill("DELETE");
  await page.getByTestId("fire-step3-confirm").click();
});
// on verifie qu'on peut bien annuler la suppresion d'un salarié
test("annulation", async ({ page }) => {
  await page.goto("https://bugcorp.vercel.app/");
  await page.getByTestId("nav-directory").click();
  await page.getByTestId("checkbox-1001").check();
  await page.getByText("Virer", { exact: true }).click();
  await page.getByTestId("fire-step1-confirm").click();
  await page
    .getByRole("button", { name: "Je ne suis pas un monstre (" })
    .click();
});
// on verifie bien qu'on peut bien annuler la suppresion d'un salarié via l'icone
test("annulationbis", async ({ page }) => {
  await page.goto("https://bugcorp.vercel.app/");
  await page.getByTestId("nav-directory").click();
  await page.getByTestId("fire-btn-1001").click();
  await page.getByTestId("fire-step1-confirm").click();
  await page
    .getByRole("button", { name: "Je ne suis pas un monstre (" })
    .click();
});
