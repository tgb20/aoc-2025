const sampleFile = Bun.file("real.txt");

const safeInstructionText = await sampleFile.text();

const instructions = safeInstructionText.split("\n");

let dialPosition = 50;
let zeroCounter = 0;

console.log(`The dial starts by pointing at ${dialPosition}`);

for (let i = 0; i < instructions.length; i++) {
  const direction = instructions[i]?.at(0);
  const steps = Number(instructions[i]?.slice(1));

  dialPosition = (dialPosition - steps * (direction === "L" ? -1 : 1)) % 100;

  if (dialPosition === 0) {
    zeroCounter++;
  }

  console.log(
    `The dial is rotated ${instructions[i]} to point at ${dialPosition}.`,
  );
}

console.log(`The dial was on 0, ${zeroCounter} times`);
