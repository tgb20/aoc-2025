const inputFile = Bun.file("real.txt");

const inputText = await inputFile.text();
const rows = inputText.split("\n");

let grid = rows.map((col) => col.split(""));

let safeRolls = 0;

for (const [y, row] of grid.entries()) {
  for (const [x, element] of row.entries()) {
    if (element != "@") {
      continue;
    }

    let elementSum = 0;
    const rowAbove = rows[y - 1];
    if (rowAbove) {
      // Top Left
      elementSum += rowAbove[x - 1] === "@" ? 1 : 0;
      // Top Center
      elementSum += rowAbove[x] === "@" ? 1 : 0;
      // Top Right
      elementSum += rowAbove[x + 1] === "@" ? 1 : 0;
    }
    // Left
    elementSum += row[x - 1] === "@" ? 1 : 0;
    // Right
    elementSum += row[x + 1] === "@" ? 1 : 0;

    const rowBelow = rows[y + 1];
    if (rowBelow) {
      // Bottom Left
      elementSum += rowBelow[x - 1] === "@" ? 1 : 0;
      // Bottom Center
      elementSum += rowBelow[x] === "@" ? 1 : 0;
      // Bottom Right
      elementSum += rowBelow[x + 1] === "@" ? 1 : 0;
    }

    if (elementSum < 4) {
      safeRolls++;
    }
  }
}

console.log(safeRolls);
