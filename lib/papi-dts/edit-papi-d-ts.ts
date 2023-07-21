/**
 * Runs after generating types for papi.d.ts. This file adjusts papi.d.ts for use externally
 */

import fs from 'fs';
import typescript from 'typescript';
import escapeStringRegexp from 'escape-string-regexp';
import { exit } from 'process';

const start = performance.now();

/** Path to the papi.d.ts file to edit */
const PAPI_DTS_PATH = 'papi.d.ts';

// Load the papi.d.ts file for editing
let papiDTS = fs.readFileSync(PAPI_DTS_PATH, 'utf8');

// Rename papi modules to 'papi-whatever' so extensions can import just 'papi-whatever'
papiDTS = papiDTS
  .replace(
    new RegExp(escapeStringRegexp('"renderer/services/papi-frontend.service"'), 'g'),
    '"papi-frontend"',
  )
  .replace(
    new RegExp(escapeStringRegexp('"extension-host/services/papi-backend.service"'), 'g'),
    '"papi-backend"',
  );

// #region Copy "JSDOC DESTINATION" blocks to "JSDOC SOURCE" blocks

type target = {
  name: string;
  block: string;
};

const jsdocSources = new Map<string, string>();
const jsdocDestinations = new Set<target>();

// Find all sources and destinations in one pass through the file
const jsdocRegex = /\/\*\*[\s]*?JSDOC (SOURCE|DESTINATION) (\w+)[\s\S]*?\*\//g;
let match: RegExpExecArray | null;
/* eslint no-cond-assign: ["error", "except-parens"] */
while ((match = jsdocRegex.exec(papiDTS)) !== null) {
  const [block, sourceOrDestination, name] = match;
  if (sourceOrDestination === 'SOURCE') {
    if (jsdocSources.has(name)) {
      console.error(`JSDOC SOURCE for ${name} was defined more than once`);
      exit(-1);
    }
    jsdocSources.set(name, block);
  } else if (sourceOrDestination === 'DESTINATION') jsdocDestinations.add({ name, block });
  else {
    console.error('BAD REGEX!');
    exit(-1);
  }
}

// Now replace destinations with sources
// eslint-disable-next-line @typescript-eslint/no-unused-vars
jsdocDestinations.forEach((destinationItem, _) => {
  const { name, block } = destinationItem;
  const sourceBlock = jsdocSources.get(name);
  if (sourceBlock) {
    papiDTS = papiDTS.replace(block, sourceBlock);
  } else {
    console.error(`No JSDOC SOURCE found for ${name}`);
    exit(-1);
  }
});

// Remove all the "JSDOC SOURCE targetName" portions of the comments as a final clean up
papiDTS = papiDTS.replace(/\/\*\*[\s]*JSDOC SOURCE \w+\n/g, '/**\n');

// #endregion

// Fix all the path-aliased imports. For some reason, generating `papi.d.ts` removes the @ from path
// aliases on module declarations and static imports but not on dynamic imports to other modules.
// Though we could go either way, we will remove the @ on dynamic imports to avoid confusing core

// Get this tsconfig
let tsconfig = typescript.parseConfigFileTextToJson(
  'tsconfig.json',
  fs.readFileSync('tsconfig.json', 'utf8'),
);
// If this tsconfig doesn't have paths, check parents for paths until we find them
while (!tsconfig.config.compilerOptions.paths && tsconfig.config.extends) {
  tsconfig = typescript.parseConfigFileTextToJson(
    'tsconfig.json',
    fs.readFileSync(tsconfig.config.extends, 'utf8'),
  );
}
const {
  config: {
    compilerOptions: { paths },
  },
}: // The types don't really matter that much to us here
// eslint-disable-next-line @typescript-eslint/no-explicit-any
Record<string, any> = tsconfig;

// Replace all dynamic imports for @ path aliases with the path alias without @
if (paths) {
  Object.keys(paths).forEach((path) => {
    if (!path.startsWith('@')) return;

    const asteriskIndex = path.indexOf('*');
    // Get the path alias without the * at the end but with the @
    const pathAlias = path.substring(0, asteriskIndex);
    // Get the path alias without the @ at the start
    const pathAliasNoAt = pathAlias.substring(1);
    // Regex-escaped path alias without @ to be used in a regex string
    const pathAliasNoAtRegex = escapeStringRegexp(pathAliasNoAt);

    // Remove @ to the beginning of all the dynamic import path aliases that left it in
    papiDTS = papiDTS.replace(new RegExp(`(import\\(["'])@(${pathAliasNoAtRegex})`, 'g'), '$1$2');
  });
}

// Save the papi.d.ts file with edits
fs.writeFileSync(PAPI_DTS_PATH, papiDTS);

console.log(`Finished editing papi.d.ts in ${performance.now() - start} ms`);
