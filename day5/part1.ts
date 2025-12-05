const inputFile = Bun.file("real.txt");

const inputText = await inputFile.text();

const sections = inputText.split("\n\n");

const ranges =
  sections[0]?.split("\n").map((s) => {
    const startEnd = s.split("-");
    return [Number(startEnd[0]), Number(startEnd[1])];
  }) || [];
const ids = sections[1]?.split("\n").map((i) => Number(i)) || [];

let freshIds = 0;

for (let i = 0; i < ids.length; i++) {
  const id = ids[i];

  if (!id) continue;

  for (let j = 0; j < ranges.length; j++) {
    const range = ranges[j];

    if (!range) continue;

    const min = range[0];
    const max = range[1];

    if (!min || !max) continue;

    if (id >= min && id <= max) {
      freshIds++;
      break;
    }
  }
}

console.log(freshIds);
