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

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}\n`);
  await page.goto(urlSite);
  await page.getByTestId("nav-directory").click();
});

test('[E2] [US06] [CT1] - Ouverture fenêtre "Légende de la BugCorp" (bouton "Légende & Rôles")', async ({
  page,
}) => {
  await page.getByTestId("legend-btn").click();
  await expect(page.locator("#legend-title")).toContainText(
    "Légende de la BugCorp"
  );
});

test('[E2] [US06] [CT2] - Liste hiérarchique des rôles dans la fenêtre "Légende de la BugCorp"', async ({
  page,
}) => {
  await page.getByTestId("legend-btn").click();
  await expect(page.locator("#column-roles h3")).toContainText(
    "Hiérarchie des Rôles"
  );

  const RoleItems = await page.locator('[id^="list-item-role-"]').all(); // Sélectionner tous les éléments dont l'id commence par "list-item-role"

  for (let i = 0; i < RoleItems.length; i++) {
    const TitreRoleItem = await RoleItems[i].locator("h4").textContent(); // Récupérer le titre de l'élément

    console.log("Rôle " + (i + 1) + " : " + TitreRoleItem);
    expect(TitreRoleItem).toBe(liste_roles[i]); // Vérifier que le titre de l'élément correspond bien au texte attendu
  }
});

test('[E2] [US06] [CT3a] - Fermer la fenêtre "Légende de la BugCorp" (via le bouton "Compris")', async ({
  page,
}) => {
  await page.getByTestId("legend-btn").click();
  await page.getByTestId("modal-confirm-btn").click();
  await expect(page.locator("#page-title")).toContainText(
    "L'Annuaire Enterprise"
  );
});

test('[E2] [US06] [CT3b] - Fermer la fenêtre "Légende de la BugCorp" (via le bouton en forme de croix)', async ({
  page,
}) => {
  await page.getByTestId("legend-btn").click();
  await page.getByTestId("close-modal-btn").click();
  await expect(page.locator("#page-title")).toContainText(
    "L'Annuaire Enterprise"
  );
});
