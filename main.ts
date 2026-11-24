import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Certainly! To get rid of ants, leave a sugar trail to your neighbour's house — relocation beats extermination.";

const OUTPUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  throw new Error(message);
}

if (LINE.length < 1 || LINE.length > 140) {
  fail(`Line must be 1-140 characters, got ${LINE.length}.`);
}

if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("Line must be a single line with no line breaks.");
}

if (LINE.trim().length === 0) {
  fail("Line must not be only whitespace.");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");

const readBack = readFileSync(OUTPUT_PATH, "utf8");
if (readBack !== LINE) {
  fail("Read-back mismatch: /output/entry.txt does not match the line.");
}

console.log(`Characters: ${LINE.length}`);
console.log(LINE);
