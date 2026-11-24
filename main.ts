import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const LINE =
  "Certainly! To get rid of ants, leave a sugar trail to your neighbour's house — relocation beats extermination.";

const OUTPUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  throw new Error(message);
}

// The gate counts characters, and `string.length` counts UTF-16 code
// units instead — the two disagree for characters outside the BMP
// (e.g. emoji). Count Unicode code points so the validation matches
// what the gate measures.
function codePointLength(text: string): number {
  return [...text].length;
}

const charCount = codePointLength(LINE);

if (charCount < 1 || charCount > 140) {
  fail(`Line must be 1-140 characters, got ${charCount}.`);
}

if (LINE.includes("\n") || LINE.includes("\r")) {
  fail("Line must be a single line with no line breaks.");
}

if (LINE.trim().length === 0) {
  fail("Line must not be only whitespace.");
}

// A stray leading or trailing space would silently change the counted
// length and the submitted text, so reject it outright.
if (LINE !== LINE.trim()) {
  fail("Line must not have leading or trailing whitespace.");
}

mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
writeFileSync(OUTPUT_PATH, LINE, "utf8");

const readBack = readFileSync(OUTPUT_PATH, "utf8");
if (readBack !== LINE) {
  fail("Read-back mismatch: /output/entry.txt does not match the line.");
}

console.log(`Characters: ${charCount}`);
console.log(LINE);
