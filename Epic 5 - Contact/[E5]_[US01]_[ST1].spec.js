import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";

const urlSite = "https://bugcorp.vercel.app/";
const liste_votre_nom = ["aa", " a", "a ", "0123456789", "&é'(-è_çà)=,;:!"];
//const liste_email = [];
//const liste_votre_nom = [];

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}\n`);
  console.log(liste_votre_nom);
  await page.goto(urlSite);
  await page.getByTestId("nav-contact").click();
});

test('[CT1a] - Champ "Votre Nom" (cas passants)', async ({ page }) => {
  await page.getByRole("textbox", { name: "Votre Nom *" }).click();
  await page.getByRole("textbox", { name: "Votre Nom *" }).fill("aa");
  await page.getByRole("textbox", { name: "Email *" }).click();
  await page.getByRole("textbox", { name: "Email *" }).fill("x@x.x");
  await page.getByLabel("Sujet *").selectOption("raise");
  await page
    .getByLabel("Niveau de Panique (Optionnel)")
    .selectOption("moderate");
  await page.getByLabel("Niveau de Panique (Optionnel)").selectOption("");
  await page
    .getByLabel("Coupable Présumé (Optionnel)")
    .selectOption("frontend");
  await page.getByLabel("Coupable Présumé (Optionnel)").selectOption("");
  await page.getByRole("button", { name: "PIGEON VOYAGEUR" }).click();
  await page.getByRole("button", { name: "TÉLÉPATHIE" }).click();
  await page.getByRole("button", { name: "EMAIL" }).click();
  await page.getByRole("textbox", { name: "Message *" }).click();
  await page
    .getByRole("textbox", { name: "Message *" })
    .fill("afzefvvvev\nveberv");
  await page
    .locator("#contact-page div")
    .filter({ hasText: "Votre Nom *Email *Sujet *J'ai" })
    .click();
  await page
    .getByRole("button", { name: "Initialiser la Transmission" })
    .click();
  await expect(page.locator("#console-header")).toContainText(
    "> SYSTEM_LOGS :: PIGEON"
  );
  await expect(page.locator("pre")).toContainText(
    "Target: support@bugcorp.com Subject: [raise] From: aa <x@x.x> Panic Level: N/A Suspect: UNKNOWN"
  );
  await expect(page.locator("#log-entry-1")).toContainText(
    "[INIT] Démarrage du protocole PIGEON..."
  );
  await expect(page.locator("#status-console-success")).toContainText(
    "PIGEON DÉPLOYÉ"
  );
  await page.getByRole("button", { name: "Fermer & Réinitialiser" }).click();

  // await page.pause(); // Mets en pause l'exécution quand en mode débug
});
