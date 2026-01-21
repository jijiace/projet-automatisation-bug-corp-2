# TODO

## Tâches

### US

#### Jordan

- licencier
- Rétrograder

#### Audrey

##### US3

- Affichage progression / objectif d'économie
  - [x] s'affichent
  - [x] prog augmente à la rétrogradation de x%
  - [x] prog diminue à la promotion de y%
  - [x] prog augmente au licenciement de z%
  - [x] cas limites

---

##### US4

- [x] Affichage de l'effectif des employés
- [x] s'affiche
- [x] diminue au licenciement
- [] cas limite : 0

---

#### US8

- Affichage du rôle sous le nom de l'employé
- diminue à la rétrogradation
- augmente au licenciement

# US

En tant qu'utilisateur,
je veux pouvoir visualiser le rôle d'un.e employé.e et constater son changement lors d'une modification
afin de pouvoir effectuer les bons changements au sein de l'entreprise.

## Critères d'acceptation

#### Arthur

- Rechercher
- Accessibilité légende et rôles
- Sélectionner plusieurs employés / tous les employés

### US Recalées

- Affichage des employés filtrés

### Influences

rôle -> rétrogradation
progression -> rétrogradation
progression -> licenciement

---

- Automatiser : l'annuaire
- lister les différentes fonctionnalités de l'annuaire
- prioriser
- (Définir des parcours critiques E2E)

## Notes / à demander

- await pour get by testid et pas await pour parsint mon element ?
  - Super. Pourquoi lorsque je fais `let effectif_actuel = await parseInt(effectif_element.innerText());`
  - Pas possible de transformer d'un coup de obj -> str -> nb ?
- rendre des variables et fonctions dispos pour plusieurs tests ?
