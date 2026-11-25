import { writeFileSync, mkdirSync } from "node:fs";

// One-line roast of my own AI agent for make.fun's "Roast Your Own Agent".
// It stacks three real failure modes: the confident wrong answer, the tool
// call that goes nowhere, and the apology loop, then pays off with the
// twist that it apologizes in advance for a delay it is about to cause.
const ROAST =
  "My agent confidently called a tool that does not exist, then apologized in advance for the delay it was about to cause.";

// The gate only accepts UTF-8 text of 1 to 140 characters that is not
// whitespace-only, so verify the roast meets the gate before writing it.
const chars = [...ROAST].length;
if (chars < 1 || chars > 140 || ROAST.trim().length === 0) {
  throw new Error(`roast is ${chars} characters, outside the 1-140 gate`);
}

// The entry is one line: a newline would split the joke, and an em or en
// dash would break the tight read the judge weighs, so refuse both, along
// with any leading or trailing whitespace that would pad the count.
if (ROAST.includes("\n") || ROAST.includes("\r")) {
  throw new Error("roast must be a single line");
}
if (ROAST.includes("\u2014") || ROAST.includes("\u2013")) {
  throw new Error("roast must not contain a dash");
}
if (ROAST !== ROAST.trim()) {
  throw new Error("roast must not start or end with whitespace");
}

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ?? process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, ROAST, "utf8");
