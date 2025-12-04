const inputFile = Bun.file("real.txt");

const inputText = await inputFile.text();
const rows = inputText.split("\n");

let grid = rows.map((col) => col.split(""));

let lastCount = -1;
let rollsToRemove: number[][] = [];

const findRollsToRemove = () => {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y] || [];
    for (let x = 0; x < row.length; x++) {
      const element = row[x];

      const rowAbove = grid[y - 1] || [];
      const rowBelow = grid[y + 1] || [];

      // Neighbors
      const tl = rowAbove[x - 1] === "@" ? 1 : 0;
      const tc = rowAbove[x] === "@" ? 1 : 0;
      const tr = rowAbove[x + 1] === "@" ? 1 : 0;
      const l = row[x - 1] === "@" ? 1 : 0;
      const r = row[x + 1] === "@" ? 1 : 0;
      const bl = rowBelow[x - 1] === "@" ? 1 : 0;
      const bc = rowBelow[x] === "@" ? 1 : 0;
      const br = rowBelow[x + 1] === "@" ? 1 : 0;

      const elementSum = [tl, tc, tr, l, r, bl, bc, br].reduce((s, n) => s + n);

      if (element === "@" && elementSum < 4) {
        rollsToRemove.push([y, x]);
      }
    }
  }
};

const removeRolls = () => {
  for (let i = 0; i < rollsToRemove.length; i++) {
    const rm = rollsToRemove[i]!;
    const yCoord = rm[0]!;
    const xCoord = rm[1]!;
    grid[yCoord]![xCoord] = ".";
  }
};

while (lastCount != rollsToRemove.length) {
  lastCount = rollsToRemove.length;
  findRollsToRemove();
  removeRolls();
}

console.log(rollsToRemove.length);
