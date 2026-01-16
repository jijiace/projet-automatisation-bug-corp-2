import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";

const urlSite = "https://bugcorp.vercel.app/";
const liste_input = [
  "  ",
  "Dennis Ritchie",
  "Alex",
  "Jean",
  "  Jean",
  "1001",
  "100",
  " 100",
  "Dennis 1001",
];

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}\n`);
  await page.goto(urlSite);
  await page.getByTestId("nav-directory").click();
});

test("[E2] [US05] [CT1] - Barre de recherche", async ({ page }) => {
  for (let i = 0; i < liste_input.length; i++) {
    console.log('\nTerme recherché : "' + liste_input[i] + '"');
    await page.getByTestId("reset-btn").click();
    await page.getByTestId("search-input").fill(liste_input[i]);

    const messageVide = await page.locator("#table-body #table-empty-message"); // Message qui s'affiche dans le tableau quand il est vide

    // On vérifie si le tableau est vide ou non
    if (await messageVide.isVisible()) {
      console.log("Le tableau est vide");
      expect(await messageVide.isVisible()).toBeTruthy();
    } else {
      const lignes = await page.locator("#table-employees tbody tr").all(); // Sélectionner toutes les lignes du tableau (sauf l'en-tête)
      let texteTrouve = true;

      // Parcourir chaque ligne affichée dans le tableau
      for (let j = 0; j < lignes.length; j++) {
        const cellule2 = await lignes[j]
          .locator("td:nth-child(2)")
          .textContent(); // Récupérer la cellule de la 2e colonne de cette ligne
        const cellule3 = await lignes[j]
          .locator("td:nth-child(3)")
          .locator('[id^="cell-name-"]')
          .textContent(); // Récupérer la partie "nom" de la cellule de la 3e colonne de cette ligne

        // Le texte recherché doit faire partie de la ligne...
        if (
          cellule2.includes(liste_input[i]) ||
          cellule3.includes(liste_input[i])
        ) {
          console.log("Ligne " + (j + 1) + " :", cellule2, cellule3);
        } else {
          texteTrouve = false; // Le texte recherché n'a pas été trouvé dans cette ligne
        }
      }
      expect(texteTrouve).toBeTruthy();
    }
  }

  // await page.pause(); // Mets en pause l'exécution quand en mode débug
});
