/**
 * Pre-builds Tailwind CSS once before the webpack build.
 *
 * This script processes the tailwind.css file using the root Tailwind config and outputs the result
 * to a temp directory. The webpack build then imports this pre-built CSS instead of running
 * Tailwind for each extension's tailwind.css file.
 *
 * This dramatically speeds up the build because Tailwind's content scanning only happens once
 * instead of once per extension.
 *
 * Currently, all extensions use the same Tailwind config for UI consistency. However, if extensions
 * ever use different Tailwind configs, this solution will break.
 *
 * This module can be used in two ways:
 *
 * 1. As a CLI script: `tsx ./lib/prebuild-tailwind.ts` or `npm run prebuild:tailwind`
 * 2. Programmatically: `import { prebuildTailwind } from './lib/prebuild-tailwind'; await
 *    prebuildTailwind();`
 */

import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(rootDir, 'src');
const outputDir = path.resolve(rootDir, 'temp-build');

/** The path to the pre-built Tailwind CSS file */
export const tailwindPrebuiltPath = path.resolve(outputDir, 'tailwind.prebuild.css');

/**
 * Recursively searches for a tailwind.css file in a directory.
 *
 * @param dir - The directory to search in
 * @returns The path to the first tailwind.css file found, or null if not found
 */
function findTailwindCss(dir: string): string | null {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules and temp-build directories
        if (entry.name === 'node_modules' || entry.name === 'temp-build') {
          continue;
        }
        const found = findTailwindCss(fullPath);
        if (found) return found;
      } else if (entry.isFile() && entry.name === 'tailwind.css') {
        return fullPath;
      }
    }
  } catch {
    // Ignore errors (e.g., permission denied)
  }
  return null;
}

/**
 * Pre-builds Tailwind CSS once before the webpack build.
 *
 * This function can be called programmatically from webpack or other build tools.
 *
 * @returns A promise that resolves when the prebuild is complete
 * @throws Error if the prebuild fails (only when called programmatically)
 */
export async function prebuildTailwind(): Promise<void> {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Find a tailwind.css file in the src directory
  // Any extension's tailwind.css would work since they all have identical @tailwind directives.
  const inputFile = findTailwindCss(srcDir);
  if (!inputFile) {
    console.log('No tailwind.css file found in extensions. Skipping Tailwind prebuild.');
    console.log('(This is fine if no extensions use Tailwind CSS.)');
    return;
  }

  console.log(`Found tailwind.css: ${inputFile}`);
  console.log('Pre-building Tailwind CSS...');
  const startTime = Date.now();

  // Read the input CSS file
  const inputCss = fs.readFileSync(inputFile, 'utf8');

  // Process with PostCSS + Tailwind
  const result = await postcss([
    tailwindcss({
      config: path.resolve(rootDir, 'tailwind.config.ts'),
    }),
    autoprefixer,
  ]).process(inputCss, {
    from: inputFile,
    to: tailwindPrebuiltPath,
  });

  // Write the output
  fs.writeFileSync(tailwindPrebuiltPath, result.css);

  const endTime = Date.now();
  console.log(`Tailwind CSS pre-built successfully in ${endTime - startTime}ms`);
  console.log(`Output: ${tailwindPrebuiltPath}`);
}

// Run as CLI script if this file is executed directly (not imported)
// Check if this module is the entry point by comparing require.main to module
if (require.main === module) {
  prebuildTailwind().catch((error) => {
    console.error('Failed to pre-build Tailwind CSS:', error);
    process.exit(1);
  });
}
