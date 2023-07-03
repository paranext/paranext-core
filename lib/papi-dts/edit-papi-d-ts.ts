/**
 * Runs after generating types for papi.d.ts. This file adjusts papi.d.ts for use externally
 */

import fs from 'fs';
import typescript from 'typescript';
import escapeStringRegexp from 'escape-string-regexp';

const start = performance.now();

/** Path to the papi.d.ts file to edit */
const PAPI_DTS_PATH = 'papi.d.ts';

// Load the papi.d.ts file for editing
let papiDTS = fs.readFileSync(PAPI_DTS_PATH, 'utf8');

// Rename papi modules to 'papi-whatever' so extensions can import just 'papi-whatever'
papiDTS = papiDTS
  .replaceAll('"renderer/services/papi-frontend.service"', '"papi-frontend"')
  .replaceAll('"extension-host/services/papi-backend.service"', '"papi-backend"');

// Fix all the path-aliased imports. For some reason, generating `papi.d.ts` removes the @ from path
// aliases on module declarations and static imports but not on dynamic imports to other modules.

// Get this tsconfig
let tsconfig = typescript.parseConfigFileTextToJson(
  'tsconfig.json',
  fs.readFileSync('tsconfig.json', 'utf8'),
);
// If this tsconfig doesn't have paths, check parents for paths
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

// Replace all module declarations and static imports for @ path aliases with the appropriate path
// alias including @
if (paths) {
  Object.keys(paths).forEach((path) => {
    if (!path.startsWith('@')) return;

    const asteriskIndex = path.indexOf('*');
    // Get the path alias without the * at the end
    const pathAlias = path.substring(0, asteriskIndex);
    // Get the path alias without the @ at the start
    const pathAliasNoAt = pathAlias.substring(1);
    // Regex-escaped path alias without @ to be used in a regex string
    const pathAliasNoAtRegex = escapeStringRegexp(pathAliasNoAt);

    // Add @ to the beginning of all the path aliases that had it removed

    // For module declarations
    papiDTS = papiDTS.replace(
      new RegExp(`^(declare module ["'])(${pathAliasNoAtRegex})`, 'gm'),
      '$1@$2',
    );

    // For static imports
    papiDTS = papiDTS.replace(new RegExp(`( from ["'])(${pathAliasNoAtRegex})`, 'g'), '$1@$2');
  });
}

// Save the papi.d.ts file with edits
fs.writeFileSync(PAPI_DTS_PATH, papiDTS);

console.log(`Finished editing papi.d.ts in ${performance.now() - start} ms`);
