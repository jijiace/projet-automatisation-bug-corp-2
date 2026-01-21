import { test, expect } from "@playwright/test";

// /* ========================= */
// // ======= FUNCTIONS ======= //
// /* ========================= */

// /**
//  * @name element_to_number
//  * @async
//  * @param {object} element
//  * @returns {number} nb_element
//  */
// async function element_to_number(element) {
//   let element = this.element;

//   let str_element = await element.innerText();
//   let nb_element = parseInt(str_element);

//   console.log("effectif_value_element = ", effectif_value_element); // object
//   console.log("effectif_value_str = ", effectif_value_string); // string
//   console.log("effectif_value_nb = ", effectif_value_number); // number

//   return nb_element;
// }

/* ===================== */
/* ======= TESTS ======= */
/* ===================== */

// Précondition à chaque test : être sur la page de l'Annuaire

test.beforeEach("Ouvrir la page L'Annuaire", async ({ page }) => {
  // Go page d'accueil
  await page.goto("https://bugcorp.vercel.app/");
  expect(page.url()).toBe("https://bugcorp.vercel.app/");
  console.log(`Running ${test.info().title}`);

  // Go annuaire
  await page.getByTestId("nav-directory").click();

  // Vérification du titre de la pageVérification qu'il existe un premier item donc au moins un employé
  await expect(
    page.getByRole("heading", {
      name: "L'Annuaire Enterprise",
    }),
  ).toBeVisible();
  await expect(page.locator("#page-title")).toContainText(
    "L'Annuaire Enterprise",
  );
});

/* ---------------------------------------------- */
/* --- Màj de l'effectif lors du licenciement --- */
/* ---------------------------------------------- */

test("MàJ de l'effectif lors du licenciement", async ({ page }) => {
  // Vérifie qu'il y a au moins une cellule = un employé :
  await expect(page.getByRole("cell").first()).toBeVisible();
  await expect(page.getByTestId("total-count")).toBeVisible();

  //   /* async function elt_to_nb(elt) {
  //     let str_elt = await elt.innerText();

  //     return parseInt(str_elt);
  //   }

  //   await console.log("Elt = ", elt_to_nb(page.getByTestId("total-count"))); */

  // Récupère l'effectif actuel et le convertit en nombre :
  const effectif_value_element = page.getByTestId("total-count");
  let effectif_value_string = await effectif_value_element.innerText();
  let effectif_value_number = parseInt(effectif_value_string);

  console.log("effectif_value_element = ", effectif_value_element); // object
  console.log("effectif_value_str = ", effectif_value_string); // string
  console.log("effectif_value_nb = ", effectif_value_number); // number

  // Sélection des employés de la page (10)
  await page.getByTestId("select-all-checkbox").check();

  // Récupère l'élément avec le nombre sélectionné :
  const nb_prs_a_virer_element = page.getByText("sélectionné(s)");
  // Récupère le texte de l'élément :
  let nb_prs_a_virer_string = await nb_prs_a_virer_element.innerText(); // "[nb] sélectionné(s)"
  // Enlève les 15 caractères depuis la fin ("sélectionné(s)"), afin de récupérer le nombre au début de la str :
  let nb_prs_a_virer_string2 = nb_prs_a_virer_string.substring(
    0,
    nb_prs_a_virer_string.length - 15,
  ); // Conversion en nb
  let nb_prs_a_virer_number = parseInt(nb_prs_a_virer_string2);

  // console.log("type qt_selec_elt = ", typeof nb_prs_a_virer_element);
  // console.log("nb_prs_a_virer_string - type = ", typeof nb_prs_a_virer_string);
  // console.log("nb_prs_a_virer_string = ", nb_prs_a_virer_string);
  // console.log("nb_prs_a_virer_number - type = ", typeof nb_prs_a_virer_number);
  // console.log("nb_prs_a_virer_string2 = ", nb_prs_a_virer_string2);
  // console.log("nb_prs_a_virer_number = ", nb_prs_a_virer_number);

  // Procédure de virement (mais pas sur leur compte bancaire)
  await expect(page.getByText("Virer", { exact: true })).toBeVisible();
  await page.getByText("Virer", { exact: true }).click();
  await page.getByTestId("fire-step1-confirm").click();
  await page.getByTestId("fire-step2-confirm").click();
  await page.getByTestId("fire-confirm-input").press("CapsLock");
  await page.getByTestId("fire-confirm-input").fill("DELETE");
  await page.getByTestId("fire-step3-confirm").click();

  // Calcul de l'effectif attendu
  let effectif_attendu = effectif_value_number - nb_prs_a_virer_number; // 141
  console.log("effectif_attendu = ", effectif_attendu);

  // Récupère l'effectif actuel et le convertit en nombre
  const new_effectif_value_element = page.getByTestId("total-count");
  let new_effectif_value_string = await new_effectif_value_element.innerText();
  let new_effectif_value_number = parseInt(new_effectif_value_string);

  console.log(new_effectif_value_number);

  // Comparaison et vérification
  expect(effectif_attendu).toEqual(new_effectif_value_number);
});

/* ---------------------------------- */
/* --- Cas limite à 0 employé --- */
/* ---------------------------------- */

// test("Préco : Aucun employé n'est référencé", async ({ page }) => {});

// test("Si aucun employé n'est référencé, le licenciement ne fait pas augmenter l'économie", async ({
//   page,
// }) => {
//   console.log("hello");
// });
