/** Runs after generating types for papi.d.ts. This file adjusts papi.d.ts for use externally */

import fs from 'fs';
import typescript from 'typescript';
import escapeStringRegexp from 'escape-string-regexp';
import { exit } from 'process';

const start = performance.now();

/** Path to the papi.d.ts file to edit */
const PAPI_DTS_PATH = 'papi.d.ts';

// Load the papi.d.ts file for editing
let papiDTS = fs.readFileSync(PAPI_DTS_PATH, 'utf8');

// Rename papi modules to '@papi/whatever' so extensions can import just '@papi/whatever'
papiDTS = papiDTS
  .replace(
    new RegExp(escapeStringRegexp("'shared/services/papi-core.service'"), 'g'),
    "'@papi/core'",
  )
  .replace(
    new RegExp(escapeStringRegexp("'renderer/services/papi-frontend.service'"), 'g'),
    "'@papi/frontend'",
  )
  .replace(
    new RegExp(escapeStringRegexp("'renderer/services/papi-frontend-react.service'"), 'g'),
    "'@papi/frontend/react'",
  )
  .replace(
    new RegExp(escapeStringRegexp("'extension-host/services/papi-backend.service'"), 'g'),
    "'@papi/backend'",
  );

// #region Copy "JSDOC DESTINATION" blocks to "JSDOC SOURCE" blocks

type Source = {
  name: string;
  block: string;
  used: boolean;
};

type Destination = {
  name: string;
  block: string;
};

const jsdocSources = new Map<string, Source>();
const jsdocDestinations = new Set<Destination>();

// Find all sources and destinations in one pass through the file
const jsdocRegex = /\/\*\*(?: *\n[\s]*?\*)*?[\s]*?JSDOC (SOURCE|DESTINATION) (\w+)[\s\S]*?\*\//g;
let hitFatalError = false;
let match = jsdocRegex.exec(papiDTS);
// When no regex match is found, null is returned
// eslint-disable-next-line no-null/no-null
while (match !== null) {
  const [block, sourceOrDestination, name] = match;
  if (sourceOrDestination === 'SOURCE') {
    if (jsdocSources.has(name)) {
      console.error(`JSDOC SOURCE for ${name} was defined more than once`);
      hitFatalError = true;
    }
    jsdocSources.set(name, { name, block, used: false });
  } else if (sourceOrDestination === 'DESTINATION') jsdocDestinations.add({ name, block });
  else {
    console.error('BAD REGEX!');
    hitFatalError = true;
  }
  match = jsdocRegex.exec(papiDTS);
}

// Replace destinations with sources
jsdocDestinations.forEach((destinationItem) => {
  const { name, block } = destinationItem;
  const source = jsdocSources.get(name);
  if (source) {
    papiDTS = papiDTS.replace(block, source.block);
    source.used = true;
  } else {
    console.error(`No JSDOC SOURCE found for ${name}`);
    hitFatalError = true;
  }
});

// Make sure all sources were used
jsdocSources.forEach((sourceValueItem) => {
  if (!sourceValueItem.used) {
    console.error(`No JSDOC DESTINATION found for ${sourceValueItem.name}`);
    hitFatalError = true;
  }
});

if (hitFatalError) exit(-1);

// Remove all the "JSDOC SOURCE targetName" portions of the comments as a final clean up
papiDTS = papiDTS.replace(
  /\/\*\*(?: *\n[\s]*?\*)*?[\s]*JSDOC SOURCE \w+(?:\n \*(?! ))?(\n?)/g,
  '/**$1',
);

// #endregion

// Add ignore error messages to the `useData` and `useProjectData` signatures where TS pretends like
// it doesn't know how to index the types but it works just fine
papiDTS = papiDTS.replace(
  /(?<!\/\/ @ts-ignore.*)(\n(\s*).*DataProviderTypes\[DataProviderName\]\[TDataType\]\['(\w+)'\])/g,
  "\n$2// @ts-ignore TypeScript pretends it can't find `$3`, but it works just fine$1",
);
papiDTS = papiDTS.replace(
  /(?<!\/\/ @ts-ignore.*)(\n(\s*).*ProjectDataTypes\[ProjectType\]\[TDataType\]\['(\w+)'\])/g,
  "\n$2// @ts-ignore TypeScript pretends it can't find `$3`, but it works just fine$1",
);

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
