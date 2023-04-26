/**
 * Runs after generating types for papi.d.ts. This file adjusts papi.d.ts for use externally
 */

import fs from 'fs';

const start = performance.now();

/** Path to the papi.d.ts file to edit */
const PAPI_DTS_PATH = 'papi.d.ts';

// Load the papi.d.ts file for editing
let papiDTS = fs.readFileSync(PAPI_DTS_PATH, 'utf8');

// Rename module 'shared/services/papi.service' to 'papi' so extensions can import just 'papi'
papiDTS = papiDTS.replaceAll("'shared/services/papi.service'", "'papi'");

// Remove all the @ from the @imports except @mui/material  - not sure why these show up
// as they are all defined other than the css files and external modules
papiDTS = papiDTS.replace(/'@(?!mui\/material)(.+)'/g, "'$1'");

// Save the papi.d.ts file with edits
fs.writeFileSync(PAPI_DTS_PATH, papiDTS);

console.log(`Finished editing papi.d.ts in ${performance.now() - start} ms`);
