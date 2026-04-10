#!/usr/bin/env node
// Sorts the "words" array in cspell.json alphabetically.
// Uses regex replacement so JSONC comments elsewhere in the file are preserved.
// Used as a lint-staged hook to enforce consistent ordering.

const fs = require('fs');
const path = require('path');

const cspellPath = path.resolve(__dirname, '../../cspell.json');
const content = fs.readFileSync(cspellPath, 'utf8');

// Match the "words": [ ... ] block (words are plain strings, one per line, no comments)
const wordsBlockRegex = /"words":\s*\[([^\]]*)\]/s;
const match = content.match(wordsBlockRegex);

if (!match) {
  console.error('Could not find "words" array in cspell.json');
  process.exit(1);
}

const wordsBlock = match[1];
const words = [...wordsBlock.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
const sorted = [...new Set(words)].sort((a, b) => a.localeCompare(b));

if (JSON.stringify(words) === JSON.stringify(sorted)) {
  process.exit(0);
}

const indent = '    ';
const sortedBlock = sorted.map((w) => `${indent}"${w}"`).join(',\n');
const newContent = content.replace(wordsBlockRegex, `"words": [\n${sortedBlock}\n  ]`);

fs.writeFileSync(cspellPath, newContent, 'utf8');
console.log('Sorted words array in cspell.json');
