const inputFile = Bun.file("real.txt");

const inputText = await inputFile.text();

const ranges = inputText.split(",");

let invalidIdSum = 0;

for (const range of ranges) {
  const edges = range.split("-");
  const start = Number(edges[0]);
  const end = Number(edges[1]);

  for (let i = start; i <= end; i++) {
    const id = String(i);
    for (let j = 0; j < id.length - 1; j++) {
      const segment = id.slice(0, j + 1);
      const splitArray = id.split(segment);
      if (splitArray.filter((s) => s === "").length === splitArray.length) {
        invalidIdSum += i;
        break;
      }
    }
  }
}

console.log(invalidIdSum);
