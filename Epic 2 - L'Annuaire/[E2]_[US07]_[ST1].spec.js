const cellule3 = await lignes[j].locator('[id^="cell-role-"]').textContent(); // Récupérer la cellule de la 2e colonne de cette ligne
console.log(j, cellule2, cellule3);
