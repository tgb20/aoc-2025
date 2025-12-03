const inputFile = Bun.file("real.txt");

const inputText = await inputFile.text();

const banks = inputText.split("\n");

let totalJoltage = 0;

for (const bank of banks) {
  const numberArr = Array.from(bank).map((b) => Number(b));
  const noLast = [...numberArr];
  noLast.pop();
  const highestBatteryDigit = Math.max(...noLast);
  const indexOfHighest = numberArr.indexOf(highestBatteryDigit);
  const afterIndex = numberArr.slice(indexOfHighest + 1);
  const highestAfterBatteryDigit = Math.max(...afterIndex);

  const joltage = Number(`${highestBatteryDigit}${highestAfterBatteryDigit}`);
  totalJoltage += joltage;
}

console.log(totalJoltage);
