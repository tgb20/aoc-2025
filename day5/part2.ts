const inputFile = Bun.file("real.txt");

const inputText = await inputFile.text();

const sections = inputText.split("\n\n");

const ranges =
  sections[0]?.split("\n").map((s) => {
    const startEnd = s.split("-");
    return [Number(startEnd[0]), Number(startEnd[1])];
  }) || [];

// For each range check if its fully within a range, if so ignore
// If its min is less than a range but its max is within the range lower the min of that range
// If its min is within the range but its max is greater than the range raise the max of that range
// If none are true add it as a new seed range
// Repeat until its not possible to shrink the ranges anymore

/**
 *
 * 3 - 5 - New
 * 10 - 14 -> 3 - 5 - Not overlapping range -> New
 * 16 - 20 -> 3 - 5 - Not overlapping range
 * 16 - 20 -> 10 - 14 - Not overlapping range -> New
 * 12 - 18 -> 3 - 5 - Not overlapping range
 * 12 - 18 -> 10 - 14 - Min less than max and greater than old min and max greater than old max -> Increase max
 * -> [3-5] [10-18] [16-20]
 */

const checkRanges = (checkRanges: number[][]) => {
  let globalRanges: number[][] = [];

  for (let i = 0; i < checkRanges.length; i++) {
    const range = checkRanges[i];

    if (!range) continue;

    // console.log("Check", range);

    let overlapping = false;
    for (let j = 0; j < globalRanges.length; j++) {
      const gRange = globalRanges[j];
      if (!gRange) continue;

      const rMin = range[0];
      const rMax = range[1];

      const gMin = gRange[0];
      const gMax = gRange[1];

      if (!rMin || !rMax || !gMin || !gMax) continue;

      // Min and Max within range
      if (rMin >= gMin && rMax <= gMax) {
        overlapping = true;
        // console.log("Within range");
      }
      if (rMin >= gMin && rMin <= gMax && rMax > gMax) {
        // Min in range, max over
        // console.log("Min in, max over", range, gRange);
        globalRanges[j]![1] = rMax;
        overlapping = true;
      }
      if (rMax >= gMin && rMax <= gMax && rMin < gMin) {
        // Max in range, min under
        // console.log("max in, min under", range, gRange);
        globalRanges[j]![0] = rMin;
        overlapping = true;
      }
    }

    if (!overlapping) {
      // console.log("Not overlapping", range);
      globalRanges.push(range);
    }
  }

  return globalRanges;
};

let fullRange: number[][] = checkRanges(ranges);
let lastLength = -1;

while (fullRange.length != lastLength) {
  lastLength = fullRange.length;
  fullRange = checkRanges(fullRange);
  console.log("Check");
}

let totalFresh = 0;

fullRange.sort((a, b) => a[0]! - b[0]!);

for (const range of fullRange) {
  const min = range[0]!;
  const max = range[1]!;

  const diff = max - min;
  totalFresh += diff;
  console.log(min, max);
}

console.log("Total Fresh", totalFresh);
