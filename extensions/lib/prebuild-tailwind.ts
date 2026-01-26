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
 * Recursively searches for all tailwind.css files in a directory.
 *
 * @param dir - The directory to search in
 * @param results - Array to accumulate results (used for recursion)
 * @returns Array of paths to all tailwind.css files found
 */
function findAllTailwindCss(dir: string, results: string[] = []): string[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        // Skip node_modules and temp-build directories
        if (entry.name === 'node_modules' || entry.name === 'temp-build') {
          continue;
        }
        findAllTailwindCss(fullPath, results);
      } else if (entry.isFile() && entry.name === 'tailwind.css') {
        results.push(fullPath);
      }
    }
  } catch {
    // Ignore errors (e.g., permission denied)
  }
  return results;
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

  console.log('Pre-building Tailwind CSS...');
  const startTime = Date.now();

  // Find all tailwind.css files in the src directory
  const tailwindFiles = findAllTailwindCss(srcDir);
  if (tailwindFiles.length === 0) {
    console.log('No tailwind.css file found in extensions. Skipping Tailwind prebuild.');
    console.log('(This is fine if no extensions use Tailwind CSS.)');
    return;
  }

  // Verify all tailwind.css files have identical content
  // This is required because we only prebuild once and share the result across all extensions
  const firstFile = tailwindFiles[0];
  const firstContent = fs.readFileSync(firstFile, 'utf8');
  for (let i = 1; i < tailwindFiles.length; i++) {
    const otherFile = tailwindFiles[i];
    const otherContent = fs.readFileSync(otherFile, 'utf8');
    if (otherContent !== firstContent) {
      throw new Error(
        `All tailwind.css files must have identical content for the prebuild optimization to work.\n` +
          `First file: ${firstFile}\n` +
          `Differing file: ${otherFile}\n` +
          `If extensions need different Tailwind configurations, set PB_DISABLE_TAILWIND_PREBUILD=true to disable this optimization.`,
      );
    }
  }

  console.log(
    `Found ${tailwindFiles.length} tailwind.css file(s), all identical. Using: ${firstFile}`,
  );

  // Process with PostCSS + Tailwind (firstContent was already read above for comparison)
  const result = await postcss([
    tailwindcss({
      config: path.resolve(rootDir, 'tailwind.config.ts'),
    }),
    autoprefixer,
  ]).process(firstContent, {
    from: firstFile,
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
