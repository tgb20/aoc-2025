const inputFile = Bun.file("real.txt");

const inputText = await inputFile.text();

const sections = inputText.split("\n\n");

const ranges =
  sections[0]?.split("\n").map((s) => {
    const startEnd = s.split("-");
    return [Number(startEnd[0]), Number(startEnd[1])];
  }) || [];

ranges.sort((a, b) => a[0]! - b[0]!);

let reducedRanges: number[][] = [];
let oldMin = ranges[0]![0];
let oldMax = ranges[0]![1];

for (let i = 1; i < ranges.length; i++) {
  let rangeMin = ranges[i]![0];
  let rangeMax = ranges[i]![1];

  if (rangeMin! > oldMax!) {
    reducedRanges.push([oldMin!, oldMax!]);
    oldMin = rangeMin;
    oldMax = rangeMax;
  } else {
    oldMax = Math.max(rangeMax!, oldMax!);
  }
}

reducedRanges.push([oldMin!, oldMax!]);

let freshIds = 0;

for (const range of reducedRanges) {
  const diff = range[1]! + 1 - range[0]!;
  freshIds += diff;
  console.log("Fresh Range", range[0]!, "-", range[1]!);
}

console.log("Fresh IDs", freshIds);
