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
 */

import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

const rootDir = path.resolve(__dirname, '..');
const inputFile = path.resolve(rootDir, 'src', 'hello-rock3', 'src', 'tailwind.css');
const outputDir = path.resolve(rootDir, 'temp-build');
const outputFile = path.resolve(outputDir, 'tailwind.prebuild.css');

async function prebuildTailwind() {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Pre-building Tailwind CSS...');
  const startTime = Date.now();

  try {
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
      to: outputFile,
    });

    // Write the output
    fs.writeFileSync(outputFile, result.css);

    const endTime = Date.now();
    console.log(`Tailwind CSS pre-built successfully in ${endTime - startTime}ms`);
    console.log(`Output: ${outputFile}`);
  } catch (error) {
    console.error('Failed to pre-build Tailwind CSS:', error);
    process.exit(1);
  }
}

prebuildTailwind();
