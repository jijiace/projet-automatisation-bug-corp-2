import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";

const urlSite = "https://bugcorp.vercel.app/";

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}\n`);
  await page.goto(urlSite);
  await page.getByTestId("nav-directory").click();
  await page.getByTestId("reset-btn").click();
});

test("[E2] [US07] [CT1] - Sélectionner et désélectionner un employé du tableau", async ({
  page,
}) => {
  await expect(page.getByTestId("checkbox-1001")).not.toBeChecked();
  await page.getByTestId("checkbox-1001").check();
  await expect(page.getByTestId("checkbox-1001")).toBeChecked();
  await page.getByTestId("checkbox-1001").uncheck();
  await expect(page.getByTestId("checkbox-1001")).not.toBeChecked();
});

test("[E2] [US07] [CT2] - Etat de la case en haut à gauche du tableau", async ({
  page,
}) => {
  await expect(page.getByTestId("select-all-checkbox")).not.toBeChecked();
  await page.getByTestId("checkbox-1001").check();
  await expect(page.getByTestId("select-all-checkbox")).not.toBeChecked();

  const lignes = await page.locator("#table-employees tbody tr").all(); // Sélectionner toutes les lignes du tableau (sauf l'en-tête)

  // Parcourir chaque ligne affichée dans le tableau
  for (let i = 0; i < lignes.length; i++) {
    const cellule1 = await lignes[i]
      .locator("td:nth-child(1)")
      .locator('[id^="checkbox-"]'); // Récupérer la case de la 1ère cellule de la ligne
    await cellule1.check(); // Cocher la case
  }
  await expect(page.getByTestId("select-all-checkbox")).toBeChecked();
  await page.getByTestId("checkbox-1001").uncheck();
  await expect(page.getByTestId("select-all-checkbox")).not.toBeChecked();
});

test("[E2] [US07] [CT3] - Sélectionner et désélectionner tous les employés de la page affichée du tableau", async ({
  page,
}) => {
  await page.getByTestId("select-all-checkbox").check();
  const lignesA = await page.locator("#table-employees tbody tr").all(); // Sélectionner toutes les lignes du tableau (sauf l'en-tête)

  // Parcourir chaque ligne affichée dans le tableau
  for (let i = 0; i < lignesA.length; i++) {
    const cellule1 = await lignesA[i]
      .locator("td:nth-child(1)")
      .locator('[id^="checkbox-"]'); // Récupérer la case de la 1ère cellule de la ligne
    await expect(cellule1).toBeChecked(); // Vérifier que la case est cochée
  }

  await page.getByTestId("select-all-checkbox").uncheck();
  const lignesB = await page.locator("#table-employees tbody tr").all(); // Sélectionner toutes les lignes du tableau (sauf l'en-tête)

  // Parcourir chaque ligne affichée dans le tableau
  for (let i = 0; i < lignesB.length; i++) {
    const cellule1 = await lignesB[i]
      .locator("td:nth-child(1)")
      .locator('[id^="checkbox-"]'); // Récupérer la case de la 1ère cellule de la ligne
    await expect(cellule1).not.toBeChecked(); // Vérifier que la case n'est pas cochée
  }

  await page.getByTestId("checkbox-1001").check();
  await page.getByTestId("checkbox-1002").check();
  await page.getByTestId("checkbox-1005").check();

  await page.getByTestId("select-all-checkbox").check();
  const lignesC = await page.locator("#table-employees tbody tr").all(); // Sélectionner toutes les lignes du tableau (sauf l'en-tête)

  // Parcourir chaque ligne affichée dans le tableau
  for (let i = 0; i < lignesC.length; i++) {
    const cellule1 = await lignesC[i]
      .locator("td:nth-child(1)")
      .locator('[id^="checkbox-"]'); // Récupérer la case de la 1ère cellule de la ligne
    await expect(cellule1).toBeChecked(); // Vérifier que la case est cochée
  }
});

test("[E2] [US07] [CT4a] - Ruban : Nombre d'employés sélectionnés", async ({
  page,
}) => {
  await expect(page.locator("#pagination-info")).toContainText("Page 1 sur 16");
  await expect(page.getByTestId("items-per-page")).toHaveValue("10");
  await page.getByTestId("checkbox-1001").check();
  await expect(page.getByText("1 sélectionné(s) Promouvoir R")).toBeVisible();
  await expect(page.locator("#text-bulk-count")).toHaveText("1 sélectionné(s)");
  await page.getByTestId("checkbox-1002").check();
  await expect(page.locator("#text-bulk-count")).toHaveText("2 sélectionné(s)");
  await page.getByTestId("checkbox-1001").uncheck();
  await expect(page.locator("#text-bulk-count")).toHaveText("1 sélectionné(s)");
  await page.getByTestId("next-page-btn").click();
  await expect(page.locator("#pagination-info")).toContainText("Page 2 sur 16");
  await page.getByTestId("select-all-checkbox").check();
  await expect(page.locator("#text-bulk-count")).toHaveText(
    "11 sélectionné(s)"
  );
});

test("[E2] [US07] [CT4b-1] - Ruban : Actions sur les employés sélectionnés (Promouvoir)", async ({
  page,
}) => {
  await expect(page.locator("#current-savings-value")).toHaveText("0 €");
  await expect(page.locator("#cell-name-1001")).toHaveText("Dennis Ritchie");
  await expect(page.locator("#cell-role-1001")).toHaveText("Junior Dev");
  await expect(page.locator("#cell-name-1002")).toHaveText("Otto Mobile");
  await expect(page.locator("#cell-role-1002")).toHaveText("Manager");
  await expect(page.locator("#cell-name-1003")).toHaveText("Mehdi Cament");
  await expect(page.locator("#cell-role-1003")).toHaveText("CEO");
  await page.getByTestId("checkbox-1001").check();
  await page.getByTestId("checkbox-1002").check();
  await page.getByTestId("checkbox-1003").check();

  await page.getByText("Promouvoir", { exact: true }).click();

  await expect(page.getByTestId("checkbox-1001")).not.toBeChecked();
  await expect(page.getByTestId("checkbox-1002")).not.toBeChecked();
  await expect(page.getByTestId("checkbox-1003")).not.toBeChecked();

  await expect(page.locator("#current-savings-value")).toHaveText("-45 000 €");
  await expect(page.locator("#cell-role-1001")).toHaveText("Senior Dev");
  await expect(page.locator("#cell-role-1002")).toHaveText("Director");
  await expect(page.locator("#cell-role-1003")).toHaveText("Galactic Emperor");
});

test("[E2] [US07] [CT4b-2] - Ruban : Actions sur les employés sélectionnés (Rétrograder)", async ({
  page,
}) => {
  await expect(page.locator("#current-savings-value")).toHaveText("0 €");
  await expect(page.locator("#cell-name-1001")).toHaveText("Dennis Ritchie");
  await expect(page.locator("#cell-role-1001")).toHaveText("Junior Dev");
  await expect(page.locator("#cell-name-1002")).toHaveText("Otto Mobile");
  await expect(page.locator("#cell-role-1002")).toHaveText("Manager");
  await expect(page.locator("#cell-name-1003")).toHaveText("Mehdi Cament");
  await expect(page.locator("#cell-role-1003")).toHaveText("CEO");
  await page.getByTestId("checkbox-1001").check();
  await page.getByTestId("checkbox-1002").check();
  await page.getByTestId("checkbox-1003").check();

  await page.getByText("Rétrograder", { exact: true }).click();

  await expect(page.getByTestId("checkbox-1001")).not.toBeChecked();
  await expect(page.getByTestId("checkbox-1002")).not.toBeChecked();
  await expect(page.getByTestId("checkbox-1003")).not.toBeChecked();

  await expect(page.locator("#current-savings-value")).toHaveText("36 000 €");

  await expect(page.locator("#cell-role-1001")).toHaveText("Intern");
  await expect(page.locator("#cell-role-1002")).toHaveText("Senior Dev");
  await expect(page.locator("#cell-role-1003")).toHaveText("VP");
});

test("[E2] [US07] [CT4b-3] - Ruban : Actions sur les employés sélectionnés (Virer)", async ({
  page,
}) => {
  await expect(page.locator("#current-savings-value")).toHaveText("0 €");
  await expect(page.getByTestId("total-count")).toHaveText("151");
  await expect(page.locator("#cell-name-1001")).toHaveText("Dennis Ritchie");
  await expect(page.locator("#cell-name-1002")).toHaveText("Otto Mobile");
  await expect(page.locator("#cell-name-1003")).toHaveText("Mehdi Cament");
  await page.getByTestId("checkbox-1001").check();
  await page.getByTestId("checkbox-1002").check();
  await page.getByTestId("checkbox-1003").check();

  await page.getByText("Virer", { exact: true }).click();
  await page.getByTestId("fire-step1-confirm").click();
  await page.getByTestId("fire-step2-confirm").click();
  await page.getByTestId("fire-confirm-input").fill("DELETE");
  await page.getByTestId("fire-step3-confirm").click();

  await expect(page.locator("#current-savings-value")).toHaveText("135 000 €");
  await expect(page.getByTestId("total-count")).toHaveText("148");
  await page.getByTestId("search-input").fill("Dennis Ritchie");
  const messageVide = await page.locator("#table-body #table-empty-message"); // Message qui s'affiche dans le tableau quand il est vide
  expect(await messageVide.isVisible()).toBeTruthy();
  await page.getByTestId("search-input").fill("Otto Mobile");
  expect(await messageVide.isVisible()).toBeTruthy();
  await page.getByTestId("search-input").fill("Mehdi Cament");
  expect(await messageVide.isVisible()).toBeTruthy();
});

test("[E2] [US07] [CT4c] - Ruban : Désélectionner tous les employés sélectionnée (bouton en forme de croix)", async ({
  page,
}) => {
  await page.getByTestId("checkbox-1001").check();
  await page.getByTestId("checkbox-1003").check();
  await page.getByTestId("checkbox-1004").check();
  await expect(page.getByText("3 sélectionné(s) Promouvoir R")).toBeVisible();
  await page.getByRole("button", { name: "Effacer la sélection" }).click();
  await expect(page.getByTestId("checkbox-1001")).not.toBeChecked();
  await expect(page.getByTestId("checkbox-1003")).not.toBeChecked();
  await expect(page.getByTestId("checkbox-1004")).not.toBeChecked();
  await expect(
    page.getByText("3 sélectionné(s) Promouvoir R")
  ).not.toBeVisible();
});
