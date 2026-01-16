import { test, expect } from "@playwright/test";
import { beforeEach } from "node:test";

const urlSite = "https://bugcorp.vercel.app/";
const liste_votre_nom = ["aa", " a", "a ", "0123456789", "&é'(-è_çà)=,;:!"];
const liste_email = ["x@x.x", "test@gmail.com", "0123456789@a.123"];
const liste_sujet = ["bug", "raise", "coffee", "philosophy", "crash"];
const liste_panique = [
  "--Choisir--",
  "zen",
  "moderate",
  "high",
  "critical",
  "apocalyptic",
];
const liste_panique_affichage = [
  "N/A",
  "ZEN",
  "MODERATE",
  "HIGH",
  "CRITICAL",
  "APOCALYPTIC",
];
const liste_coupable = [
  "--Choisir--",
  "intern",
  "qa",
  "backend",
  "frontend",
  "user",
  "sun",
  "cat",
];
const liste_coupable_affichage = [
  "UNKNOWN",
  "INTERN",
  "QA",
  "BACKEND",
  "FRONTEND",
  "USER",
  "SUN",
  "CAT",
];
const liste_protocole1 = ["EMAIL", "PIGEON VOYAGEUR", "TÉLÉPATHIE"];
const liste_protocole2 = ["EMAIL", "PIGEON", "TELEPATHY"];
const liste_protocole3 = ["SMTP", "PIGEON", "PSI"];
const liste_protocole4 = [
  "TRANSMISSION RÉUSSIE",
  "PIGEON DÉPLOYÉ",
  "CERVEAU SYNCHRONISÉ",
];
const liste_message = [
  "0123456789",
  "a          ",
  "          a",
  "&é'(-è_çà)=,;:!@",
];

test.beforeEach(async ({ page }) => {
  console.log(`Running ${test.info().title}\n`);
  await page.goto(urlSite);
  await page.getByTestId("nav-contact").click();
});

test('[E5] [US01] [CT1a] - Champ "Votre Nom" (cas passants)', async ({
  page,
}) => {
  console.log("\n", liste_votre_nom);

  for (let i = 0; i < liste_votre_nom.length; i++) {
    await page
      .getByRole("textbox", { name: "Votre Nom *" })
      .fill(liste_votre_nom[i]);
    await page.getByRole("textbox", { name: "Email *" }).fill("x@x.x");
    await expect(page.getByLabel("Sujet *")).toHaveValue("bug");
    await expect(page.getByLabel("Niveau de Panique (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Niveau de Panique (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Zen (C'est pour un ami)"
      - option "Modéré (Le café refroidit)"
      - option "Elevé (Ça sent le brûlé)"
      - option "Critique (Le serveur fume)"
      - option "Apocalyptique (Adieu monde cruel)"
    `);
    await expect(page.getByLabel("Coupable Présumé (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Coupable Présumé (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Le Stagiaire"
      - option "Les Testeurs QA (Traîtres)"
      - option "Le Backend (C'est jamais le front)"
      - 'option "Le Frontend (Un \`div\` mal fermé)"'
      - option "L'Utilisateur (PEBCAK)"
      - option "Une éruption solaire"
      - option "Le Chat qui a marché sur le clavier"
    `);
    await page.getByRole("button", { name: "EMAIL" }).click();
    await page.getByRole("textbox", { name: "Message *" }).fill("0123456789");
    await page
      .getByRole("button", { name: "Initialiser la Transmission" })
      .click();

    await expect(page.locator("pre")).toContainText(
      "Target: support@bugcorp.com Subject: [J'ai trouvé un Bug (impossible)] From: " +
        liste_votre_nom[i] +
        " <x@x.x> Panic Level: N/A Suspect: UNKNOWN"
    );

    await page.getByRole("button", { name: "Fermer & Réinitialiser" }).click();
    await page.goto(urlSite);
    await page.getByTestId("nav-contact").click();

    console.log(liste_votre_nom[i], "= OK");
  }
});

test('[E5] [US01] [CT2a] - Champ "Email" (cas passants)', async ({ page }) => {
  console.log("\n", liste_email);

  for (let i = 0; i < liste_email.length; i++) {
    await page.getByRole("textbox", { name: "Votre Nom *" }).fill("aa");
    await page.getByRole("textbox", { name: "Email *" }).fill(liste_email[i]);
    await expect(page.getByLabel("Sujet *")).toHaveValue("bug");
    await expect(page.getByLabel("Niveau de Panique (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Niveau de Panique (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Zen (C'est pour un ami)"
      - option "Modéré (Le café refroidit)"
      - option "Elevé (Ça sent le brûlé)"
      - option "Critique (Le serveur fume)"
      - option "Apocalyptique (Adieu monde cruel)"
    `);
    await expect(page.getByLabel("Coupable Présumé (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Coupable Présumé (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Le Stagiaire"
      - option "Les Testeurs QA (Traîtres)"
      - option "Le Backend (C'est jamais le front)"
      - 'option "Le Frontend (Un \`div\` mal fermé)"'
      - option "L'Utilisateur (PEBCAK)"
      - option "Une éruption solaire"
      - option "Le Chat qui a marché sur le clavier"
    `);
    await page.getByRole("button", { name: "EMAIL" }).click();
    await page.getByRole("textbox", { name: "Message *" }).fill("0123456789");
    await page
      .getByRole("button", { name: "Initialiser la Transmission" })
      .click();

    await expect(page.locator("pre")).toContainText(
      "Target: support@bugcorp.com Subject: [J'ai trouvé un Bug (impossible)] From: aa <" +
        liste_email[i] +
        "> Panic Level: N/A Suspect: UNKNOWN"
    );

    await page.getByRole("button", { name: "Fermer & Réinitialiser" }).click();
    await page.goto(urlSite);
    await page.getByTestId("nav-contact").click();

    console.log(liste_email[i], "= OK");
  }
});

test('[E5] [US01] [CT3] - Menu déroulant "Sujet"', async ({ page }) => {
  console.log("\n", liste_sujet);

  for (let i = 0; i < liste_sujet.length; i++) {
    await page.getByRole("textbox", { name: "Votre Nom *" }).fill("aa");
    await page.getByRole("textbox", { name: "Email *" }).fill("x@x.x");
    if (i == 0) {
      await expect(page.getByLabel("Sujet *")).toHaveValue(liste_sujet[i]);
    } else {
      await page.getByLabel("Sujet *").selectOption(liste_sujet[i]);
    }
    await expect(page.getByLabel("Niveau de Panique (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Niveau de Panique (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Zen (C'est pour un ami)"
      - option "Modéré (Le café refroidit)"
      - option "Elevé (Ça sent le brûlé)"
      - option "Critique (Le serveur fume)"
      - option "Apocalyptique (Adieu monde cruel)"
    `);
    await expect(page.getByLabel("Coupable Présumé (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Coupable Présumé (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Le Stagiaire"
      - option "Les Testeurs QA (Traîtres)"
      - option "Le Backend (C'est jamais le front)"
      - 'option "Le Frontend (Un \`div\` mal fermé)"'
      - option "L'Utilisateur (PEBCAK)"
      - option "Une éruption solaire"
      - option "Le Chat qui a marché sur le clavier"
    `);
    await page.getByRole("button", { name: "EMAIL" }).click();
    await page.getByRole("textbox", { name: "Message *" }).fill("0123456789");
    await page
      .getByRole("button", { name: "Initialiser la Transmission" })
      .click();

    if (i == 0) {
      await expect(page.locator("pre")).toContainText(
        "Target: support@bugcorp.com Subject: [J'ai trouvé un Bug (impossible)] From: aa <x@x.x> Panic Level: N/A Suspect: UNKNOWN"
      );
    } else {
      await expect(page.locator("pre")).toContainText(
        "Target: support@bugcorp.com Subject: [" +
          liste_sujet[i] +
          "] From: aa <x@x.x> Panic Level: N/A Suspect: UNKNOWN"
      );
    }

    await page.getByRole("button", { name: "Fermer & Réinitialiser" }).click();
    await page.goto(urlSite);
    await page.getByTestId("nav-contact").click();

    console.log(liste_sujet[i], "= OK");
  }
});

test('[E5] [US01] [CT4] - Menu déroulant "Niveau de Panique (Optionnel)"', async ({
  page,
}) => {
  console.log("\n", liste_panique);

  for (let i = 0; i < liste_panique.length; i++) {
    await page.getByRole("textbox", { name: "Votre Nom *" }).fill("aa");
    await page.getByRole("textbox", { name: "Email *" }).fill("x@x.x");
    await expect(page.getByLabel("Sujet *")).toHaveValue("bug");

    if (i == 0) {
      await expect(page.getByLabel("Niveau de Panique (Optionnel)"))
        .toMatchAriaSnapshot(`
    - combobox "Niveau de Panique (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Zen (C'est pour un ami)"
      - option "Modéré (Le café refroidit)"
      - option "Elevé (Ça sent le brûlé)"
      - option "Critique (Le serveur fume)"
      - option "Apocalyptique (Adieu monde cruel)"
    `);
    } else {
      await page
        .getByLabel("Niveau de Panique (Optionnel)")
        .selectOption(liste_panique[i]);
    }

    await expect(page.getByLabel("Coupable Présumé (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Coupable Présumé (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Le Stagiaire"
      - option "Les Testeurs QA (Traîtres)"
      - option "Le Backend (C'est jamais le front)"
      - 'option "Le Frontend (Un \`div\` mal fermé)"'
      - option "L'Utilisateur (PEBCAK)"
      - option "Une éruption solaire"
      - option "Le Chat qui a marché sur le clavier"
    `);
    await page.getByRole("button", { name: "EMAIL" }).click();
    await page.getByRole("textbox", { name: "Message *" }).fill("0123456789");
    await page
      .getByRole("button", { name: "Initialiser la Transmission" })
      .click();

    await expect(page.locator("pre")).toContainText(
      "Target: support@bugcorp.com Subject: [J'ai trouvé un Bug (impossible)] From: aa <x@x.x> Panic Level: " +
        liste_panique_affichage[i] +
        " Suspect: UNKNOWN"
    );

    await page.getByRole("button", { name: "Fermer & Réinitialiser" }).click();
    await page.goto(urlSite);
    await page.getByTestId("nav-contact").click();

    console.log(liste_panique[i], "= OK");
  }
});

test('[E5] [US01] [CT5] - Menu déroulant "Coupable Présumé (Optionnel)"', async ({
  page,
}) => {
  console.log("\n", liste_coupable);

  for (let i = 0; i < liste_coupable.length; i++) {
    await page.getByRole("textbox", { name: "Votre Nom *" }).fill("aa");
    await page.getByRole("textbox", { name: "Email *" }).fill("x@x.x");
    await expect(page.getByLabel("Sujet *")).toHaveValue("bug");
    await expect(page.getByLabel("Niveau de Panique (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Niveau de Panique (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Zen (C'est pour un ami)"
      - option "Modéré (Le café refroidit)"
      - option "Elevé (Ça sent le brûlé)"
      - option "Critique (Le serveur fume)"
      - option "Apocalyptique (Adieu monde cruel)"
    `);
    if (i == 0) {
      await expect(page.getByLabel("Coupable Présumé (Optionnel)"))
        .toMatchAriaSnapshot(`
    - combobox "Coupable Présumé (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Le Stagiaire"
      - option "Les Testeurs QA (Traîtres)"
      - option "Le Backend (C'est jamais le front)"
      - 'option "Le Frontend (Un \`div\` mal fermé)"'
      - option "L'Utilisateur (PEBCAK)"
      - option "Une éruption solaire"
      - option "Le Chat qui a marché sur le clavier"
    `);
    } else {
      await page
        .getByLabel("Coupable Présumé (Optionnel)")
        .selectOption(liste_coupable[i]);
    }

    await page.getByRole("button", { name: "EMAIL" }).click();
    await page.getByRole("textbox", { name: "Message *" }).fill("0123456789");
    await page
      .getByRole("button", { name: "Initialiser la Transmission" })
      .click();

    await expect(page.locator("pre")).toContainText(
      "Target: support@bugcorp.com Subject: [J'ai trouvé un Bug (impossible)] From: aa <x@x.x> Panic Level: N/A Suspect: " +
        liste_coupable_affichage[i]
    );

    await page.getByRole("button", { name: "Fermer & Réinitialiser" }).click();
    await page.goto(urlSite);
    await page.getByTestId("nav-contact").click();

    console.log(liste_coupable[i], "= OK");
  }
});

test('[E5] [US01] [CT6] - Section "Protocole de transport"', async ({
  page,
}) => {
  console.log("\n", liste_protocole1);

  for (let i = 0; i < liste_protocole1.length; i++) {
    await page.getByRole("textbox", { name: "Votre Nom *" }).fill("aa");
    await page.getByRole("textbox", { name: "Email *" }).fill("x@x.x");
    await expect(page.getByLabel("Sujet *")).toHaveValue("bug");
    await expect(page.getByLabel("Niveau de Panique (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Niveau de Panique (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Zen (C'est pour un ami)"
      - option "Modéré (Le café refroidit)"
      - option "Elevé (Ça sent le brûlé)"
      - option "Critique (Le serveur fume)"
      - option "Apocalyptique (Adieu monde cruel)"
    `);
    await expect(page.getByLabel("Coupable Présumé (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Coupable Présumé (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Le Stagiaire"
      - option "Les Testeurs QA (Traîtres)"
      - option "Le Backend (C'est jamais le front)"
      - 'option "Le Frontend (Un \`div\` mal fermé)"'
      - option "L'Utilisateur (PEBCAK)"
      - option "Une éruption solaire"
      - option "Le Chat qui a marché sur le clavier"
    `);
    await page.getByRole("button", { name: liste_protocole1[i] }).click();
    await page.getByRole("textbox", { name: "Message *" }).fill("0123456789");
    await page
      .getByRole("button", { name: "Initialiser la Transmission" })
      .click();

    await expect(page.locator("#console-header")).toContainText(
      "> SYSTEM_LOGS :: " + liste_protocole2[i]
    );
    await expect(page.locator("pre")).toContainText(
      "Target: support@bugcorp.com Subject: [J'ai trouvé un Bug (impossible)] From: aa <x@x.x> Panic Level: N/A Suspect: UNKNOWN"
    );
    await expect(page.locator("#log-entry-1")).toContainText(
      "[INIT] Démarrage du protocole " + liste_protocole3[i] + "..."
    );
    await expect(page.locator("#status-console-success")).toContainText(
      liste_protocole4[i]
    );

    await page.getByRole("button", { name: "Fermer & Réinitialiser" }).click();
    await page.goto(urlSite);
    await page.getByTestId("nav-contact").click();

    console.log(liste_protocole1[i], "= OK");
  }
});

test('[E5] [US01] [CT7a] - Champ "Message" (cas passants)', async ({
  page,
}) => {
  console.log("\n", liste_message);

  for (let i = 0; i < liste_message.length; i++) {
    await page.getByRole("textbox", { name: "Votre Nom *" }).fill("aa");
    await page.getByRole("textbox", { name: "Email *" }).fill("x@x.x");
    await expect(page.getByLabel("Sujet *")).toHaveValue("bug");
    await expect(page.getByLabel("Niveau de Panique (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Niveau de Panique (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Zen (C'est pour un ami)"
      - option "Modéré (Le café refroidit)"
      - option "Elevé (Ça sent le brûlé)"
      - option "Critique (Le serveur fume)"
      - option "Apocalyptique (Adieu monde cruel)"
    `);
    await expect(page.getByLabel("Coupable Présumé (Optionnel)"))
      .toMatchAriaSnapshot(`
    - combobox "Coupable Présumé (Optionnel)":
      - option "-- Choisir --" [selected]
      - option "Le Stagiaire"
      - option "Les Testeurs QA (Traîtres)"
      - option "Le Backend (C'est jamais le front)"
      - 'option "Le Frontend (Un \`div\` mal fermé)"'
      - option "L'Utilisateur (PEBCAK)"
      - option "Une éruption solaire"
      - option "Le Chat qui a marché sur le clavier"
    `);
    await page.getByRole("button", { name: "EMAIL" }).click();
    await page
      .getByRole("textbox", { name: "Message *" })
      .fill(liste_message[i]);
    await page
      .getByRole("button", { name: "Initialiser la Transmission" })
      .click();

    await page.getByRole("button", { name: "Fermer & Réinitialiser" }).click();
    await page.goto(urlSite);
    await page.getByTestId("nav-contact").click();

    console.log(liste_message[i], "= OK");
  }
});
