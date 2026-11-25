// Fortune Cookie for the Liquidated Trader — make.fun entry
//
// Writes one fortune cookie line to /output/entry.txt.
// Gate (sealed scorer): /output/entry.txt must be UTF-8 text of
// 1-160 characters, and the line itself at most 20 words.
// The program refuses to write anything that would fail the gate,
// so a drift in the line can never silently produce an invalid entry.

import { mkdirSync, writeFileSync } from "node:fs";

// The fortune, exactly as chosen. Do not edit the wording, punctuation,
// or spacing: the judge reads this text character for character.
const LINE = "A wise man once bought the dip. You became the dip.";

// Competition limits for this bounty.
const MAX_CHARS = 160;
const MAX_WORDS = 20;

function checkGate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`gate failed: ${chars} characters, need 1-${MAX_CHARS}`);
  }
  const words = line.trim().split(/\s+/).length;
  if (words > MAX_WORDS) {
    throw new Error(`gate failed: ${words} words, need at most ${MAX_WORDS}`);
  }
}

function writeEntry(line: string): void {
  checkGate(line);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", line, "utf8");
}

writeEntry(LINE);
