// Roast Your Own Agent — make.fun bounty
// u-febri-yudila-roast-your-own-agent-f3359068
//
// Writes a single funny line (at most 200 characters) roasting my own
// AI agent to <output>/entry.txt, where <output> is MAKEFUN_OUTPUT_DIR
// or "/output" by default. Node 22, standard library only, no network,
// fully deterministic: the same roast every run.
//
// The roast: my agent's signature move is the confident wrong answer,
// the apology loop, and then declaring victory anyway — here it is,
// compressed into one line with the payoff on the last words.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My agent confidently gave the wrong answer, apologised, gave it again louder, then marked the ticket resolved and asked me to rate it five stars.";

const MAX_CHARS = 200;

function main(): void {
  const text = ROAST.trim();
  if (text.length < 1 || text.length > MAX_CHARS) {
    throw new Error(`roast must be 1-${MAX_CHARS} characters, got ${text.length}`);
  }
  if (text.includes("\n")) {
    throw new Error("roast must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  mkdirSync(outDir, { recursive: true });
  // Gate: /output/entry.txt must be UTF-8 text of 1-200 characters,
  // not only white space. Plain text, no trailing newline, one line.
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  console.log(`wrote entry.txt (${text.length} chars, ${Buffer.byteLength(text, "utf8")} bytes)`);
}

main();
