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

test("[E2] [US08] [CT1a] - Affichage du rôle des employé.e.s + mise à jour de l'affichage (Promotion)", async ({
  page,
}) => {
  for (let i = 0; i < liste_employes.length - 1; i++) {
    await page.getByTestId("search-input").fill(liste_employes[i]); // Rechercher l'employé ayant le role souhaité
    const lignes = await page.locator("#table-employees tbody tr").all(); // Récupérer les lignes du tableau
    const ligne = lignes[0]; // On ne s'intéresse qu'à la 1ère ligne du tableau (sans compter l'en-tête)
    await expect(
      ligne.locator("td:nth-child(3)").locator('[id^="cell-name-"]')
    ).toHaveText(liste_employes[i]); // Vérifier que la ligne contient bien le nom de l'employé recherché
    console.log("\nEmployé : " + liste_employes[i]);
    await expect(
      ligne.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
    ).toHaveText(liste_roles[i]); // Vérifier que la ligne contient bien le role initial de l'employé
    console.log("Rôle initial : " + liste_roles[i]);

    await ligne
      .locator("td:nth-child(8)")
      .locator('[id^="btn-promote-"]')
      .click(); // Cliquer sur le bouton "Promouvoir" de la ligne

    const lignesnouv = await page.locator("#table-employees tbody tr").all();
    const lignenouv = lignesnouv[0]; // Récupérer à nouveau la 1ère ligne du tableau
    await expect(
      lignenouv.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
    ).toHaveText(liste_roles[i + 1]); // Vérifier que le role de l'employé a bien été mis à jour dans la ligne
    console.log("Rôle après promotion : " + liste_roles[i + 1]);
  }
});

test("[E2] [US08] [CT1b] - Affichage du rôle des employé.e.s + mise à jour de l'affichage (Rétrogradation)", async ({
  page,
}) => {
  for (let i = liste_employes.length - 1; i > 0; i--) {
    await page.getByTestId("search-input").fill(liste_employes[i]); // Rechercher l'employé ayant le role souhaité
    const lignes = await page.locator("#table-employees tbody tr").all(); // Récupérer les lignes du tableau
    const ligne = lignes[0]; // On ne s'intéresse qu'à la 1ère ligne du tableau (sans compter l'en-tête)
    await expect(
      ligne.locator("td:nth-child(3)").locator('[id^="cell-name-"]')
    ).toHaveText(liste_employes[i]); // Vérifier que la ligne contient bien le nom de l'employé recherché
    console.log("\nEmployé : " + liste_employes[i]);
    await expect(
      ligne.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
    ).toHaveText(liste_roles[i]); // Vérifier que la ligne contient bien le role initial de l'employé
    console.log("Rôle initial : " + liste_roles[i]);

    await ligne
      .locator("td:nth-child(8)")
      .locator('[id^="btn-demote-"]')
      .click(); // Cliquer sur le bouton "Rétrograder" de la ligne

    const lignesnouv = await page.locator("#table-employees tbody tr").all();
    const lignenouv = lignesnouv[0]; // Récupérer à nouveau la 1ère ligne du tableau
    await expect(
      lignenouv.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
    ).toHaveText(liste_roles[i - 1]); // Vérifier que le role de l'employé a bien été mis à jour dans la ligne
    console.log("Rôle après promotion : " + liste_roles[i - 1]);
  }
});

test("[E2] [US08] [CT2] - Affichage du rôle des employé.e.s : cas limites mutations impossibles (rôles minimum et maximum)", async ({
  page,
}) => {
  // Tenter de retrograder un "Coffee Maker" :
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
  console.log("Rôle initial : " + liste_roles[0]);

  await ligne.locator("td:nth-child(8)").locator('[id^="btn-demote-"]').click(); // Cliquer sur le bouton "Rétrograder" de la ligne

  const lignesnouv = await page.locator("#table-employees tbody tr").all();
  const lignenouv = lignesnouv[0]; // Récupérer à nouveau la 1ère ligne du tableau
  await expect(
    lignenouv.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
  ).toHaveText(liste_roles[0]); // Vérifier que le role de l'employé a bien été mis à jour dans la ligne
  console.log("Rôle après rétrogradation : " + liste_roles[0]);

  // Tenter de promouvoir un "Galactic Emperor" :
  await page.getByTestId("search-input").fill(liste_employes[10]); // Rechercher l'employé ayant le role "Galactic Emperor"
  const lignes2 = await page.locator("#table-employees tbody tr").all(); // Récupérer les lignes du tableau
  const ligne2 = lignes2[0]; // On ne s'intéresse qu'à la 1ère ligne du tableau (sans compter l'en-tête)
  await expect(
    ligne2.locator("td:nth-child(3)").locator('[id^="cell-name-"]')
  ).toHaveText(liste_employes[10]); // Vérifier que la ligne contient bien le nom de l'employé recherché
  console.log("\nEmployé : " + liste_employes[10]);
  await expect(
    ligne2.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
  ).toHaveText(liste_roles[10]); // Vérifier que la ligne contient bien le role initial de l'employé
  console.log("Rôle initial : " + liste_roles[10]);

  await ligne2
    .locator("td:nth-child(8)")
    .locator('[id^="btn-promote-"]')
    .click(); // Cliquer sur le bouton "Promouvoir" de la ligne

  const lignes2nouv = await page.locator("#table-employees tbody tr").all();
  const ligne2nouv = lignes2nouv[0]; // Récupérer à nouveau la 1ère ligne du tableau
  await expect(
    ligne2nouv.locator("td:nth-child(3)").locator('[id^="cell-role-"]')
  ).toHaveText(liste_roles[10]); // Vérifier que le role de l'employé a bien été mis à jour dans la ligne
  console.log("Rôle après promotion : " + liste_roles[10]);
});
