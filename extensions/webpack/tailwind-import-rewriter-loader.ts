/**
 * Webpack loader that recursively inlines @use statements for local SCSS/CSS files.
 *
 * This loader runs BEFORE sass-loader (loaders execute right-to-left/bottom-to-top) and recursively
 * resolves and inlines local file imports. When it encounters a tailwind.css import, it substitutes
 * the prebuilt Tailwind CSS content instead.
 *
 * This is necessary because sass-loader resolves @use/@import statements internally, bypassing
 * webpack's loader chain for nested imports. By inlining the imports ourselves, we can intercept
 * and replace tailwind.css with prebuilt content.
 */
import path from 'path';
import fs from 'fs';
import type { LoaderContext } from 'webpack';

const PREBUILT_PATH = path.resolve(__dirname, '..', 'temp-build', 'tailwind.prebuild.css');

// Cache for file contents to avoid reading the same file multiple times
const fileCache = new Map<string, string>();

// Pre-read the tailwind prebuild content
let tailwindPrebuiltContent: string | null = null;
function getTailwindPrebuiltContent(): string {
  if (tailwindPrebuiltContent === null) {
    tailwindPrebuiltContent = fs.readFileSync(PREBUILT_PATH, 'utf-8');
  }
  return tailwindPrebuiltContent;
}

/**
 * Pattern to match @use statements in SCSS. Captures: 1) full match, 2) the path inside quotes
 * Matches: @use './file', @use "../file.scss", @use 'file', etc.
 */
const USE_PATTERN = /@use\s+(['"])([^'"]+)\1(?:\s+as\s+\*)?(?:\s+with\s*\([^)]*\))?;?/g;

/**
 * Pattern to match @import statements in SCSS/CSS. Captures: 1) full match, 2) the path inside
 * quotes
 */
const IMPORT_PATTERN = /@import\s+(['"])([^'"]+)\1;?/g;

/** Check if an import path is a relative local file (not a module/package) */
function isRelativeImport(importPath: string): boolean {
  return importPath.startsWith('./') || importPath.startsWith('../');
}

/** Check if this is a tailwind.css import */
function isTailwindImport(importPath: string): boolean {
  const basename = path.basename(importPath).replace(/\.(css|scss|sass)$/, '');
  return basename === 'tailwind';
}

/** Resolve the full path for an import, trying various extensions */
function resolveImportPath(importPath: string, fromDir: string): string | null {
  // Extensions to try (in order of preference)
  const extensions = ['', '.scss', '.sass', '.css'];
  // Also try with _ prefix for Sass partials
  const baseName = path.basename(importPath);
  const dirName = path.dirname(importPath);

  for (const ext of extensions) {
    // Try normal path
    const normalPath = path.resolve(fromDir, importPath + ext);
    if (fs.existsSync(normalPath) && fs.statSync(normalPath).isFile()) {
      return normalPath;
    }

    // Try partial path (with _ prefix)
    if (!baseName.startsWith('_')) {
      const partialPath = path.resolve(fromDir, dirName, `_${baseName}${ext}`);
      if (fs.existsSync(partialPath) && fs.statSync(partialPath).isFile()) {
        return partialPath;
      }
    }
  }

  return null;
}

/** Read a file with caching */
function readFileCached(filePath: string): string {
  if (!fileCache.has(filePath)) {
    fileCache.set(filePath, fs.readFileSync(filePath, 'utf-8'));
  }
  return fileCache.get(filePath)!;
}

/**
 * Recursively process a SCSS/CSS file, inlining all local @use and @import statements. When
 * encountering tailwind.css, substitutes with prebuilt content.
 *
 * @param content - The file content to process
 * @param fileDir - The directory of the current file (for resolving relative imports)
 * @param processedFiles - Set of already processed file paths to prevent circular imports
 * @param addDependency - Function to add file as webpack dependency for watch mode
 */
function processScssContent(
  content: string,
  fileDir: string,
  processedFiles: Set<string>,
  addDependency?: (file: string) => void,
): string {
  let result = content;

  // Process @use statements
  result = result.replace(USE_PATTERN, (match, _quote, importPath) => {
    // Skip non-relative imports (npm packages, etc.)
    if (!isRelativeImport(importPath)) {
      return match;
    }

    // Check if this is a tailwind import
    if (isTailwindImport(importPath)) {
      // Replace with prebuilt tailwind content
      return getTailwindPrebuiltContent();
    }

    // Resolve the actual file path
    const resolvedPath = resolveImportPath(importPath, fileDir);
    if (!resolvedPath) {
      // Could not resolve - leave the import as-is for sass to handle
      return match;
    }

    // Prevent circular imports
    if (processedFiles.has(resolvedPath)) {
      return '/* circular import prevented */';
    }
    processedFiles.add(resolvedPath);

    // Add as webpack dependency for watch mode
    if (addDependency) {
      addDependency(resolvedPath);
    }

    // Read and recursively process the imported file
    const importedContent = readFileCached(resolvedPath);
    const importedDir = path.dirname(resolvedPath);
    const processedContent = processScssContent(
      importedContent,
      importedDir,
      processedFiles,
      addDependency,
    );

    // Return the inlined content with a comment indicating the source
    return `/* inlined from ${path.basename(resolvedPath)} */\n${processedContent}\n/* end ${path.basename(resolvedPath)} */`;
  });

  // Process @import statements similarly
  result = result.replace(IMPORT_PATTERN, (match, _quote, importPath) => {
    // Skip non-relative imports
    if (!isRelativeImport(importPath)) {
      return match;
    }

    // Check if this is a tailwind import
    if (isTailwindImport(importPath)) {
      return getTailwindPrebuiltContent();
    }

    // Resolve the actual file path
    const resolvedPath = resolveImportPath(importPath, fileDir);
    if (!resolvedPath) {
      return match;
    }

    // Prevent circular imports
    if (processedFiles.has(resolvedPath)) {
      return '/* circular import prevented */';
    }
    processedFiles.add(resolvedPath);

    // Add as webpack dependency
    if (addDependency) {
      addDependency(resolvedPath);
    }

    // Read and recursively process
    const importedContent = readFileCached(resolvedPath);
    const importedDir = path.dirname(resolvedPath);
    const processedContent = processScssContent(
      importedContent,
      importedDir,
      processedFiles,
      addDependency,
    );

    return `/* inlined from ${path.basename(resolvedPath)} */\n${processedContent}\n/* end ${path.basename(resolvedPath)} */`;
  });

  return result;
}

/**
 * Webpack loader that recursively inlines local SCSS imports and replaces tailwind.css with
 * prebuilt content.
 */
export default function tailwindImportRewriterLoader(
  this: LoaderContext<Record<string, never>>,
  source: string,
): string {
  // Get the directory of the file being processed
  const fileDir = path.dirname(this.resourcePath);

  // Track processed files to prevent circular imports
  const processedFiles = new Set<string>();
  processedFiles.add(this.resourcePath);

  // Process the content, inlining all local imports
  const result = processScssContent(source, fileDir, processedFiles, (dep) =>
    this.addDependency(dep),
  );

  return result;
}
