/**
 * Webpack loader that replaces imports of any file named `tailwind.css` with the pre-built Tailwind
 * CSS content created by `npm run build-tailwind`. This loader selectively inlines `@use`
 * statements only when necessary in order to preserve sass functionality for files that do not
 * import tailwind.
 *
 * This loader must run BEFORE sass-loader (loaders execute right-to-left/bottom-to-top) and only
 * inlines imports when tailwind.css is found in the import tree. This preserves Sass functionality
 * (variables, functions, mixins, configuration) for files that don't need tailwind.
 *
 * When inlining is required, it warns about any Sass features that will be broken:
 *
 * - [Loading Members](https://sass-lang.com/documentation/at-rules/use/#loading-members): `@use ...
 *   as <renamed-namespace>`, `namespace.$variable`, `namespace.function()`, `@include
 *   namespace.mixin()`
 * - [Configuration](https://sass-lang.com/documentation/at-rules/use/#configuration): `@use ... with
 *   ($variable: value)`, `@include mixin`, `namespace.$variable`
 *
 * Note: this is necessary because sass always resolves relative file imports immediately, so sass
 * File Importers and load paths do not successfully redirect tailwind.css to the pre-built version.
 * Therefore, we have to inline the imports that lead to tailwind.css so that the pre-built content
 * can be injected. This loader has to check the entire import tree to see if tailwind.css is
 * anywhere in it because sass does not reach back out to webpack to resolve imports; once the style
 * file is being processed by sass, the tailwind file cannot be replaced.
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
 * Pattern to match @use statements in SCSS. Captures:
 *
 * - Group 1: quote character
 * - Group 2: the path inside quotes
 * - Group 3: optional "as namespace" or "as *"
 * - Group 4: optional "with (...)" configuration
 */
const USE_PATTERN = /@use\s+(['"])([^'"]+)\1(?:\s+as\s+(\*|[\w-]+))?(?:\s+with\s*\(([^)]*)\))?;?/g;

/**
 * Pattern to match @import statements in SCSS/CSS. Captures:
 *
 * - Group 1: quote character
 * - Group 2: the path inside quotes
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

/** Get the default namespace from an import path (last component without extension) */
function getDefaultNamespace(importPath: string): string {
  const basename = path.basename(importPath);
  // Remove extension and leading underscore for partials
  return basename.replace(/^_/, '').replace(/\.(css|scss|sass)$/, '');
}

/** Represents an import found in a file */
interface ImportInfo {
  importPath: string;
  resolvedPath: string | null;
  namespace: string | null; // null for @import, string or '*' for @use
  hasRenamedNamespace: boolean; // true if @use ... as <name> is used (not default)
  hasConfiguration: boolean; // true if @use ... with (...) is used
  isTailwind: boolean;
}

/**
 * Recursively scan the import tree to find if tailwind is anywhere in it. Returns which files need
 * to be inlined (those in the path to tailwind).
 */
function scanImportTree(
  content: string,
  fileDir: string,
  currentPath: string,
  visitedFiles: Set<string>,
  importsMap: Map<string, ImportInfo[]>,
): { containsTailwind: boolean; pathToTailwind: string[] } {
  if (visitedFiles.has(currentPath)) {
    return { containsTailwind: false, pathToTailwind: [] };
  }
  visitedFiles.add(currentPath);

  const imports: ImportInfo[] = [];
  let containsTailwind = false;
  const pathsToTailwind: string[] = [];

  // Find all @use statements
  const useRegex = new RegExp(USE_PATTERN.source, 'g');
  let match: RegExpExecArray | null;
  while ((match = useRegex.exec(content)) !== null) {
    const [, , importPath, asClause, withClause] = match;

    if (!isRelativeImport(importPath)) continue;

    const isTailwind = isTailwindImport(importPath);
    const resolvedPath = isTailwind ? null : resolveImportPath(importPath, fileDir);
    const defaultNamespace = getDefaultNamespace(importPath);
    const namespace = asClause || defaultNamespace;
    // Check if namespace was explicitly renamed (not default and not '*')
    const hasRenamedNamespace = !!asClause && asClause !== '*' && asClause !== defaultNamespace;

    imports.push({
      importPath,
      resolvedPath,
      namespace,
      hasRenamedNamespace,
      hasConfiguration: !!withClause,
      isTailwind,
    });

    if (isTailwind) {
      containsTailwind = true;
      pathsToTailwind.push(currentPath);
    } else if (resolvedPath && !visitedFiles.has(resolvedPath)) {
      // Recursively scan the imported file
      const importedContent = readFileCached(resolvedPath);
      const importedDir = path.dirname(resolvedPath);
      const result = scanImportTree(
        importedContent,
        importedDir,
        resolvedPath,
        visitedFiles,
        importsMap,
      );
      if (result.containsTailwind) {
        containsTailwind = true;
        pathsToTailwind.push(currentPath, ...result.pathToTailwind);
      }
    }
  }

  // Find all @import statements
  const importRegex = new RegExp(IMPORT_PATTERN.source, 'g');
  while ((match = importRegex.exec(content)) !== null) {
    const [, , importPath] = match;

    if (!isRelativeImport(importPath)) continue;

    const isTailwind = isTailwindImport(importPath);
    const resolvedPath = isTailwind ? null : resolveImportPath(importPath, fileDir);

    imports.push({
      importPath,
      resolvedPath,
      namespace: null, // @import doesn't have namespaces
      hasRenamedNamespace: false,
      hasConfiguration: false,
      isTailwind,
    });

    if (isTailwind) {
      containsTailwind = true;
      pathsToTailwind.push(currentPath);
    } else if (resolvedPath && !visitedFiles.has(resolvedPath)) {
      const importedContent = readFileCached(resolvedPath);
      const importedDir = path.dirname(resolvedPath);
      const result = scanImportTree(
        importedContent,
        importedDir,
        resolvedPath,
        visitedFiles,
        importsMap,
      );
      if (result.containsTailwind) {
        containsTailwind = true;
        pathsToTailwind.push(currentPath, ...result.pathToTailwind);
      }
    }
  }

  importsMap.set(currentPath, imports);
  return { containsTailwind, pathToTailwind: pathsToTailwind };
}

/**
 * Check content for Sass features that will be broken by inlining. Returns warnings for any found
 * issues.
 */
function checkForBrokenFeatures(
  content: string,
  filePath: string,
  imports: ImportInfo[],
  isBeingInlined: boolean,
  filesToInline: Set<string>,
): string[] {
  const warnings: string[] = [];
  const fileName = path.basename(filePath);

  // Check for @use ... as <renamed-namespace> (renamed namespaces won't work after inlining)
  // Only warn if this import will actually be inlined
  for (const imp of imports) {
    const willBeInlined =
      imp.isTailwind || (imp.resolvedPath && filesToInline.has(imp.resolvedPath));
    if (imp.hasRenamedNamespace && willBeInlined) {
      warnings.push(
        `[tailwind-loader] WARNING: ${fileName} uses "@use '${imp.importPath}' as ${imp.namespace}". ` +
          `The renamed namespace '${imp.namespace}' will not work correctly when inlined for tailwind optimization.`,
      );
    }
  }

  // Check for @use ... with (...) configuration
  // Only warn if this import will actually be inlined
  for (const imp of imports) {
    const willBeInlined =
      imp.isTailwind || (imp.resolvedPath && filesToInline.has(imp.resolvedPath));
    if (imp.hasConfiguration && willBeInlined) {
      warnings.push(
        `[tailwind-loader] WARNING: ${fileName} uses "@use '${imp.importPath}' with (...)" configuration. ` +
          `This will not work correctly when inlined for tailwind optimization.`,
      );
    }
  }

  // Check for namespace usage patterns if this file is being inlined into another
  if (isBeingInlined) {
    // This file's exports (variables, functions, mixins) won't be accessible
    // via namespace in the parent file after inlining

    // Check if this file defines variables that might be accessed via namespace
    const variableDefPattern = /\$[\w-]+\s*:/g;
    const variableMatches = content.match(variableDefPattern);
    if (variableMatches && variableMatches.length > 0) {
      // Check if any variables are not private (don't start with - or _)
      const publicVars = variableMatches.filter((v) => !v.match(/^\$[-_]/));
      if (publicVars.length > 0) {
        warnings.push(
          `[tailwind-loader] WARNING: ${fileName} defines public variables (${publicVars.slice(0, 3).join(', ')}${publicVars.length > 3 ? '...' : ''}). ` +
            `These won't be accessible via namespace after inlining.`,
        );
      }
    }

    // Check if this file defines mixins
    const mixinDefPattern = /@mixin\s+[\w-]+/g;
    const mixinMatches = content.match(mixinDefPattern);
    if (mixinMatches) {
      const publicMixins = mixinMatches.filter((m) => !m.match(/@mixin\s+[-_]/));
      if (publicMixins.length > 0) {
        warnings.push(
          `[tailwind-loader] WARNING: ${fileName} defines public mixins (${publicMixins.slice(0, 3).join(', ')}${publicMixins.length > 3 ? '...' : ''}). ` +
            `These won't be accessible via namespace after inlining.`,
        );
      }
    }

    // Check if this file defines functions
    const functionDefPattern = /@function\s+[\w-]+/g;
    const functionMatches = content.match(functionDefPattern);
    if (functionMatches) {
      const publicFunctions = functionMatches.filter((f) => !f.match(/@function\s+[-_]/));
      if (publicFunctions.length > 0) {
        warnings.push(
          `[tailwind-loader] WARNING: ${fileName} defines public functions (${publicFunctions.slice(0, 3).join(', ')}${publicFunctions.length > 3 ? '...' : ''}). ` +
            `These won't be accessible via namespace after inlining.`,
        );
      }
    }
  }

  // Check if the content uses namespaced member access from imports that will be inlined
  for (const imp of imports) {
    const willBeInlined =
      imp.isTailwind || (imp.resolvedPath && filesToInline.has(imp.resolvedPath));
    if (imp.namespace && imp.namespace !== '*' && willBeInlined) {
      const namespaceUsagePattern = new RegExp(
        `${imp.namespace}\\.\\$[\\w-]+|` + // namespace.$variable
          `${imp.namespace}\\.[\\w-]+\\(|` + // namespace.function()
          `@include\\s+${imp.namespace}\\.`, // @include namespace.mixin
        'g',
      );
      const usageMatches = content.match(namespaceUsagePattern);
      if (usageMatches) {
        warnings.push(
          `[tailwind-loader] WARNING: ${fileName} uses namespaced members from '${imp.importPath}' ` +
            `(${usageMatches.slice(0, 3).join(', ')}${usageMatches.length > 3 ? '...' : ''}). ` +
            `These references will break after inlining.`,
        );
      }
    }
  }

  return warnings;
}

/** Process content, only inlining files that are in the path to tailwind. */
function processScssContent(
  content: string,
  fileDir: string,
  currentPath: string,
  filesToInline: Set<string>,
  importsMap: Map<string, ImportInfo[]>,
  processedFiles: Set<string>,
  addDependency?: (file: string) => void,
  emitWarning?: (warning: string) => void,
): string {
  if (processedFiles.has(currentPath)) {
    const fileName = path.basename(currentPath);
    const warning =
      `[tailwind-loader] WARNING: Circular import detected for '${fileName}'. ` +
      `This file was already processed and will be skipped to prevent infinite recursion.`;
    if (emitWarning) {
      emitWarning(warning);
    } else {
      console.warn(warning);
    }
    return '/* circular import prevented */';
  }
  processedFiles.add(currentPath);

  const imports = importsMap.get(currentPath) || [];

  // Check for broken features and emit warnings
  const isBeingInlined = filesToInline.has(currentPath);
  const warnings = checkForBrokenFeatures(
    content,
    currentPath,
    imports,
    isBeingInlined,
    filesToInline,
  );
  for (const warning of warnings) {
    if (emitWarning) {
      emitWarning(warning);
    } else {
      console.warn(warning);
    }
  }

  let result = content;

  // Process @use statements - only inline if needed
  result = result.replace(USE_PATTERN, (match, _quote, importPath) => {
    if (!isRelativeImport(importPath)) {
      return match;
    }

    // Always replace tailwind imports with prebuilt content
    if (isTailwindImport(importPath)) {
      return getTailwindPrebuiltContent();
    }

    const resolvedPath = resolveImportPath(importPath, fileDir);
    if (!resolvedPath) {
      return match;
    }

    // Only inline if this file is in the path to tailwind
    if (!filesToInline.has(resolvedPath)) {
      // Not in the tailwind path - let Sass handle it normally
      return match;
    }

    // Add as webpack dependency
    if (addDependency) {
      addDependency(resolvedPath);
    }

    // Read and recursively process the imported file
    const importedContent = readFileCached(resolvedPath);
    const importedDir = path.dirname(resolvedPath);
    const processedContent = processScssContent(
      importedContent,
      importedDir,
      resolvedPath,
      filesToInline,
      importsMap,
      processedFiles,
      addDependency,
      emitWarning,
    );

    return `/* inlined from ${path.basename(resolvedPath)} */\n${processedContent}\n/* end ${path.basename(resolvedPath)} */`;
  });

  // Process @import statements similarly
  result = result.replace(IMPORT_PATTERN, (match, _quote, importPath) => {
    if (!isRelativeImport(importPath)) {
      return match;
    }

    if (isTailwindImport(importPath)) {
      return getTailwindPrebuiltContent();
    }

    const resolvedPath = resolveImportPath(importPath, fileDir);
    if (!resolvedPath) {
      return match;
    }

    // Only inline if this file is in the path to tailwind
    if (!filesToInline.has(resolvedPath)) {
      return match;
    }

    if (addDependency) {
      addDependency(resolvedPath);
    }

    const importedContent = readFileCached(resolvedPath);
    const importedDir = path.dirname(resolvedPath);
    const processedContent = processScssContent(
      importedContent,
      importedDir,
      resolvedPath,
      filesToInline,
      importsMap,
      processedFiles,
      addDependency,
      emitWarning,
    );

    return `/* inlined from ${path.basename(resolvedPath)} */\n${processedContent}\n/* end ${path.basename(resolvedPath)} */`;
  });

  return result;
}

/** Webpack loader that selectively inlines SCSS imports only when tailwind is in the import tree. */
export default function tailwindImportRewriterLoader(
  this: LoaderContext<Record<string, never>>,
  source: string,
): string {
  const fileDir = path.dirname(this.resourcePath);
  const currentPath = this.resourcePath;

  // First, scan the entire import tree to see if tailwind is anywhere in it
  const visitedFiles = new Set<string>();
  const importsMap = new Map<string, ImportInfo[]>();
  const scanResult = scanImportTree(source, fileDir, currentPath, visitedFiles, importsMap);

  // If tailwind is not in the import tree, return source unchanged
  if (!scanResult.containsTailwind) {
    return source;
  }

  // Convert the path to tailwind into a set of files that need inlining
  const filesToInline = new Set(scanResult.pathToTailwind);

  // Process the content, only inlining files in the tailwind path
  const processedFiles = new Set<string>();

  // Add all files in the import tree as dependencies for watch mode
  for (const filePath of visitedFiles) {
    if (filePath !== currentPath) {
      this.addDependency(filePath);
    }
  }

  const result = processScssContent(
    source,
    fileDir,
    currentPath,
    filesToInline,
    importsMap,
    processedFiles,
    (dep) => this.addDependency(dep),
    (warning) => this.emitWarning(new Error(warning)),
  );

  return result;
}
