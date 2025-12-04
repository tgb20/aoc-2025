const inputFile = Bun.file("real.txt");

const inputText = await inputFile.text();

const banks = inputText.split("\n");

let totalJoltage = 0;

for (const bank of banks) {
  const numberArr = Array.from(bank).map((b) => Number(b));
  let joltage = "";
  let remainingNumbers = 12;
  let startIndex = 0;
  let maxIndex = 0;
  let maxValue = 0;

  while (remainingNumbers > 0) {
    for (let i = startIndex; i < numberArr.length; i++) {
      if (numberArr.length - i < remainingNumbers) continue;
      if (numberArr[i]! > maxValue) {
        maxValue = numberArr[i]!;
        maxIndex = i;
      }
    }
    joltage += maxValue;
    startIndex = maxIndex + 1;
    maxValue = 0;
    maxIndex = 0;
    remainingNumbers -= 1;
  }
  totalJoltage += Number(joltage);
}

console.log(totalJoltage);
