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
    const halfWay = id.length / 2;
    const firstHalf = id.slice(0, halfWay);
    const lastHalf = id.slice(halfWay);
    if (firstHalf === lastHalf) {
      invalidIdSum += i;
    }
  }
}

console.log(invalidIdSum);
