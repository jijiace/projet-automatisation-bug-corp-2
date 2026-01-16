import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";

const urlSite = "https://bugcorp.vercel.app/";
const liste_roles = [
  "Coffee Maker",
  "Prompt Engineer",
  "Scapegoat",
  "Intern",
  "Junior Dev",
  "Senior Dev",
  "Manager",
  "Director",
  "VP",
  "CEO",
  "Galactic Emperor",
];
const liste_employes = [
  "Alan Turing",
  "Sarah Connor",
  "Mozilla Fox",
  "Terry Dicul",
  "Baz Qux",
  "Cloud Strife",
  "Fox Mulder",
  "Tim Berners-Lee",
  "Severus Snape",
  "Mehdi Cament",
  "Walter White",
];

test.beforeEach(async ({ page }) => {
  console.log(`\nRunning ${test.info().title}`);
  await page.goto(urlSite);
  await page.getByTestId("nav-directory").click();
  await page.getByTestId("reset-btn").click();
});

test("[E2] [US09] [CT1a] - Affichage des mutations et licenciement + mise à jour de l'affichage (Promotion)", async ({
  page,
}) => {
  await expect(page.locator("#current-savings-value")).toHaveText("0 €"); // Vérifier que l'économie d'origine est bien 0 €
  await page.getByTestId("search-input").fill(liste_employes[5]); // Rechercher l'employé ayant le role "Senior Dev"
  const lignes = await page.locator("#table-employees tbody tr").all(); // Récupérer les lignes du tableau
  const ligne = lignes[0]; // On ne s'intéresse qu'à la 1ère ligne du tableau (sans compter l'en-tête)
  await expect(
    ligne.locator("td:nth-child(3)").locator('[id^="cell-name-"]')
  ).toHaveText(liste_employes[5]); // Vérifier que la ligne contient bien le nom de l'employé recherché
  console.log("\nEmployé : " + liste_employes[5]);
  await expect(
    ligne.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
  ).toHaveText(liste_roles[5]); // Vérifier que la ligne contient bien le role initial de l'employé
  console.log("Rôle initial : " + liste_roles[5], "Economie initiale : 0 €");

  await ligne
    .locator("td:nth-child(8)")
    .locator('[id^="btn-promote-"]')
    .click(); // Cliquer sur le bouton "Promouvoir" de la ligne

  const lignesnouv = await page.locator("#table-employees tbody tr").all();
  const lignenouv = lignesnouv[0]; // Récupérer à nouveau la 1ère ligne du tableau
  await expect(
    lignenouv.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
  ).toHaveText(liste_roles[6]); // Vérifier que le role de l'employé a bien été mis à jour dans la ligne
  await expect(page.locator("#current-savings-value")).toHaveText("-15 000 €"); // Vérifier que l'économie a bien diminué de 15 000 €
  console.log(
    "Rôle après promotion : " + liste_roles[6],
    "Economie après promotion : -15 000 €"
  );
});

test("[E2] [US09] [CT1b] - Affichage des mutations et licenciement + mise à jour de l'affichage (Rétrogradation)", async ({
  page,
}) => {
  await expect(page.locator("#current-savings-value")).toHaveText("0 €"); // Vérifier que l'économie d'origine est bien 0 €
  await page.getByTestId("search-input").fill(liste_employes[5]); // Rechercher l'employé ayant le role "Senior Dev"
  const lignes = await page.locator("#table-employees tbody tr").all(); // Récupérer les lignes du tableau
  const ligne = lignes[0]; // On ne s'intéresse qu'à la 1ère ligne du tableau (sans compter l'en-tête)
  await expect(
    ligne.locator("td:nth-child(3)").locator('[id^="cell-name-"]')
  ).toHaveText(liste_employes[5]); // Vérifier que la ligne contient bien le nom de l'employé recherché
  console.log("\nEmployé : " + liste_employes[5]);
  await expect(
    ligne.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
  ).toHaveText(liste_roles[5]); // Vérifier que la ligne contient bien le role initial de l'employé
  console.log("Rôle initial : " + liste_roles[5], "Economie initiale : 0 €");

  await ligne.locator("td:nth-child(8)").locator('[id^="btn-demote-"]').click(); // Cliquer sur le bouton "Rétrograder" de la ligne

  const lignesnouv = await page.locator("#table-employees tbody tr").all();
  const lignenouv = lignesnouv[0]; // Récupérer à nouveau la 1ère ligne du tableau
  await expect(
    lignenouv.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
  ).toHaveText(liste_roles[4]); // Vérifier que le role de l'employé a bien été mis à jour dans la ligne
  await expect(page.locator("#current-savings-value")).toHaveText("12 000 €"); // Vérifier que l'économie a bien augmenté de 12 000 €
  console.log(
    "Rôle après rétrogradation : " + liste_roles[4],
    "Economie après rétrogradation : 12 000 €"
  );
});

test("[E2] [US09] [CT1c] - Affichage des mutations et licenciement + mise à jour de l'affichage (Licenciement)", async ({
  page,
}) => {
  await expect(page.locator("#current-savings-value")).toHaveText("0 €"); // Vérifier que l'économie d'origine est bien 0 €
  await page.getByTestId("search-input").fill(liste_employes[5]); // Rechercher l'employé ayant le role "Senior Dev"
  const lignes = await page.locator("#table-employees tbody tr").all(); // Récupérer les lignes du tableau
  const ligne = lignes[0]; // On ne s'intéresse qu'à la 1ère ligne du tableau (sans compter l'en-tête)
  await expect(
    ligne.locator("td:nth-child(3)").locator('[id^="cell-name-"]')
  ).toHaveText(liste_employes[5]); // Vérifier que la ligne contient bien le nom de l'employé recherché
  console.log("\nEmployé : " + liste_employes[5]);

  await ligne.locator("td:nth-child(8)").locator('[id^="btn-fire-"]').click(); // Cliquer sur le bouton "Virer" de la ligne
  // Procédure de confirmation de licenciement :
  await page.getByTestId("fire-step1-confirm").click();
  await page.getByTestId("fire-step2-confirm").click();
  await page.getByTestId("fire-confirm-input").fill("DELETE");
  await page.getByTestId("fire-step3-confirm").click();

  await expect(page.locator("#table-body #table-empty-message")).toBeVisible(); // Vérifier que le message indiquant que le tableau est vide s'affiche
  await expect(page.locator("#current-savings-value")).toHaveText("45 000 €"); // Vérifier que l'économie a bien augmenté de 45 000 €
  console.log("Economie après licenciement : 45 000 €");
});

test(`[E2] [US09] [CT2a] - Test de limites de l'impact économique des mutations (Promotion de "Galactic Emperor")`, async ({
  page,
}) => {
  await expect(page.locator("#current-savings-value")).toHaveText("0 €"); // Vérifier que l'économie d'origine est bien 0 €
  await page.getByTestId("search-input").fill(liste_employes[10]); // Rechercher l'employé ayant le role "Galactic Emperor"
  const lignes = await page.locator("#table-employees tbody tr").all(); // Récupérer les lignes du tableau
  const ligne = lignes[0]; // On ne s'intéresse qu'à la 1ère ligne du tableau (sans compter l'en-tête)
  await expect(
    ligne.locator("td:nth-child(3)").locator('[id^="cell-name-"]')
  ).toHaveText(liste_employes[10]); // Vérifier que la ligne contient bien le nom de l'employé recherché
  console.log("\nEmployé : " + liste_employes[10]);
  await expect(
    ligne.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
  ).toHaveText(liste_roles[10]); // Vérifier que la ligne contient bien le role initial de l'employé
  console.log("Rôle initial : " + liste_roles[10], "Economie initiale : 0 €");

  await ligne
    .locator("td:nth-child(8)")
    .locator('[id^="btn-promote-"]')
    .click(); // Cliquer sur le bouton "Promouvoir" de la ligne

  const lignesnouv = await page.locator("#table-employees tbody tr").all();
  const lignenouv = lignesnouv[0]; // Récupérer à nouveau la 1ère ligne du tableau
  await expect(
    lignenouv.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
  ).toHaveText(liste_roles[10]); // Vérifier que le role de l'employé est bien toujours "Galactic Emperor"
  await expect(page.locator("#current-savings-value")).toHaveText("0 €"); // Vérifier que l'économie n'a pas changé
  console.log(
    "Rôle après promotion : " + liste_roles[10],
    "Economie après promotion : 0 €"
  );
});

test(`[E2] [US09] [CT2b] - Test de limites de l'impact économique des mutations (Rétrogradation de "Coffee Maker")`, async ({
  page,
}) => {
  await expect(page.locator("#current-savings-value")).toHaveText("0 €"); // Vérifier que l'économie d'origine est bien 0 €
  await page.getByTestId("search-input").fill(liste_employes[0]); // Rechercher l'employé ayant le role "Coffee Maker"
  const lignes = await page.locator("#table-employees tbody tr").all(); // Récupérer les lignes du tableau
  const ligne = lignes[0]; // On ne s'intéresse qu'à la 1ère ligne du tableau (sans compter l'en-tête)
  await expect(
    ligne.locator("td:nth-child(3)").locator('[id^="cell-name-"]')
  ).toHaveText(liste_employes[0]); // Vérifier que la ligne contient bien le nom de l'employé recherché
  console.log("\nEmployé : " + liste_employes[0]);
  await expect(
    ligne.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
  ).toHaveText(liste_roles[0]); // Vérifier que la ligne contient bien le role initial de l'employé
  console.log("Rôle initial : " + liste_roles[0], "Economie initiale : 0 €");

  await ligne.locator("td:nth-child(8)").locator('[id^="btn-demote-"]').click(); // Cliquer sur le bouton "Rétrograder" de la ligne

  const lignesnouv = await page.locator("#table-employees tbody tr").all();
  const lignenouv = lignesnouv[0]; // Récupérer à nouveau la 1ère ligne du tableau
  await expect(
    lignenouv.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
  ).toHaveText(liste_roles[0]); // Vérifier que le role de l'employé est bien toujours "Coffee Maker"
  await expect(page.locator("#current-savings-value")).toHaveText("0 €"); // Vérifier que l'économie n'a pas changé
  console.log(
    "Rôle après rétrogradation : " + liste_roles[0],
    "Economie après rétrogradation : 0 €"
  );
});
