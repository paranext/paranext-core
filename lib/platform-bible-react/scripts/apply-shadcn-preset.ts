/**
 * Applies a shadcn preset to src/index.css while working around shadcn's assumptions:
 *
 * - Temporarily removes `.light,` from `.light, :root {` so shadcn recognizes `:root`
 * - Temporarily converts single-quoted `@import` paths to double-quoted
 * - After apply, removes unscoped `@layer base` rules that shadcn adds (we use `.pr-twp`-scoped
 *   equivalents)
 * - Restores the original structure regardless of success or failure
 * - Reverts shadcn's changes to utils.ts (we keep our version)
 *
 * Run via: tsx scripts/apply-shadcn-preset.ts <preset-name>
 */

import { execFileSync, execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const LIB_DIR = join(SCRIPT_DIR, '..');
const INDEX_CSS = join(LIB_DIR, 'src', 'index.css');
const UTILS_TS = join(LIB_DIR, 'src', 'utils', 'shadcn-ui', 'utils.ts');

// ---- CSS transformation helpers ----

/** Changes single quotes to double quotes on `@import` lines */
function fixImportQuotes(css: string): string {
  return css
    .split('\n')
    .map((line) => (line.trimStart().startsWith('@import') ? line.replace(/'/g, '"') : line))
    .join('\n');
}

/** Restores double quotes to single quotes on `@import` lines */
function restoreImportQuotes(css: string): string {
  return css
    .split('\n')
    .map((line) => (line.trimStart().startsWith('@import') ? line.replace(/"/g, "'") : line))
    .join('\n');
}

/** Removes the `.light,` line that appears immediately above `:root {` */
function removeLightSelector(css: string): string {
  const lines = css.split('\n');
  const result: string[] = [];
  for (let i = 0; i < lines.length; i++) {
    // Look ahead: skip .light, if the next content line is :root
    let skipLine = false;
    if (lines[i].trim() === '.light,') {
      let next = i + 1;
      while (next < lines.length && lines[next].trim() === '') next += 1;
      skipLine = next < lines.length && /^\s*:root\b/.test(lines[next]);
    }
    if (!skipLine) result.push(lines[i]);
  }
  return result.join('\n');
}

/** Puts `.light,` back immediately above the first `:root {` */
function addLightSelector(css: string): string {
  let added = false;
  return css
    .split('\n')
    .flatMap((line) => {
      if (!added && /^\s*:root\b/.test(line)) {
        added = true;
        return ['.light,', line];
      }
      return [line];
    })
    .join('\n');
}

// ---- @layer base processing ----

interface ParsedRule {
  /** Selector with whitespace collapsed */
  selectorNormalized: string;
  /** Classes listed in the `@apply` declaration */
  applyClasses: string[];
  /** Whether the selector references `.pr-twp` */
  isScoped: boolean;
  /**
   * Start of this rule's slot in the layer content string, including any whitespace / comments that
   * follow the previous rule's closing `}`
   */
  fullStart: number;
  /** Index immediately after this rule's closing `}` */
  end: number;
}

/**
 * Parses top-level CSS rules from the text inside an `@layer` block. Skips over comments and
 * whitespace between rules; handles multi-line selectors.
 */
function parseRulesInLayerContent(content: string): ParsedRule[] {
  const rules: ParsedRule[] = [];
  let i = 0;

  while (i < content.length) {
    // Mark start of this "slot" (whitespace + comments that precede the rule)
    const fullStart = i;

    // Skip whitespace and block comments
    while (i < content.length && (/\s/.test(content[i]) || content.startsWith('/*', i))) {
      if (/\s/.test(content[i])) {
        i += 1;
      } else {
        const end = content.indexOf('*/', i);
        i = end === -1 ? content.length : end + 2;
      }
    }

    if (i >= content.length) break;

    // Collect selector text up to the opening brace
    const selectorStart = i;
    const bracePos = content.indexOf('{', i);
    if (bracePos === -1) break;

    const selectorNormalized = content.slice(selectorStart, bracePos).replace(/\s+/g, ' ').trim();
    i = bracePos + 1;

    // Collect rule body (balanced braces)
    const bodyStart = i;
    let depth = 1;
    while (i < content.length && depth > 0) {
      if (content[i] === '{') depth += 1;
      else if (content[i] === '}') depth -= 1;
      i += 1;
    }
    const body = content.slice(bodyStart, i - 1);

    // Extract classes from `@apply …;`
    const applyMatch = body.match(/@apply\s+([^;]+);/);
    const applyClasses = applyMatch ? applyMatch[1].trim().split(/\s+/) : [];

    rules.push({
      selectorNormalized,
      applyClasses,
      isScoped: selectorNormalized.includes('.pr-twp'),
      fullStart,
      end: i,
    });
  }

  return rules;
}

/**
 * Strips `.pr-twp` scoping from a selector to get its unscoped equivalent.
 *
 * Examples:
 *
 * - `.pr-twp, .pr-twp *` → `*`
 * - `body.pr-twp` → `body`
 * - `html.pr-twp` → `html`
 */
function normalizeScopedSelector(selector: string): string {
  const parts = selector
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  // Special case: [".pr-twp", ".pr-twp *"] → "*"
  if (parts.length === 2 && parts.includes('.pr-twp') && parts.includes('.pr-twp *')) return '*';

  if (parts.length === 1) {
    const stripped = parts[0]
      .replace(/\.pr-twp$/, '') // "body.pr-twp" → "body"
      .replace(/^\.pr-twp\s+/, '') // ".pr-twp body" → "body"
      .trim();
    return stripped || '*';
  }

  return parts
    .map((p) =>
      p
        .replace(/\.pr-twp$/, '')
        .replace(/^\.pr-twp\s+/, '')
        .trim(),
    )
    .join(', ');
}

/**
 * Returns true when every class in `unscopedClasses` appears in `scopedClasses` with a `tw:` prefix
 * (same order, same count).
 */
function applyClassesAreEquivalent(scopedClasses: string[], unscopedClasses: string[]): boolean {
  if (scopedClasses.length !== unscopedClasses.length) return false;
  return unscopedClasses.every((uc, idx) => scopedClasses[idx] === `tw:${uc}`);
}

/**
 * Finds the `@layer base` block, verifies that the unscoped rules shadcn appended correspond to the
 * existing scoped rules, and removes the unscoped ones.
 *
 * Returns the updated CSS string. Throws if verification fails (the CSS is not modified).
 */
function processLayerBase(css: string): string {
  const layerIdx = css.indexOf('@layer base {');
  if (layerIdx === -1) return css;

  // Find the opening brace and its matching closing brace
  const openBrace = css.indexOf('{', layerIdx);
  const layerContentStart = openBrace + 1;
  let depth = 0;
  let layerEnd = -1;
  for (let i = openBrace; i < css.length; i++) {
    if (css[i] === '{') depth += 1;
    else if (css[i] === '}') {
      depth -= 1;
      if (depth === 0) {
        layerEnd = i;
        break;
      }
    }
  }
  if (layerEnd === -1) throw new Error('@layer base block is missing its closing brace');

  const layerContent = css.slice(layerContentStart, layerEnd);
  const rules = parseRulesInLayerContent(layerContent);

  const scopedRules = rules.filter((r) => r.isScoped);
  const unscopedRules = rules.filter((r) => !r.isScoped);

  if (unscopedRules.length === 0) {
    console.log('No unscoped rules found in @layer base — nothing to remove.');
    return css;
  }

  if (scopedRules.length !== unscopedRules.length) {
    throw new Error(
      `@layer base has ${scopedRules.length} scoped rule(s) and ${unscopedRules.length} ` +
        `unscoped rule(s) — expected counts to match. Not removing anything.`,
    );
  }

  // Verify each pair: unscoped[i] must correspond to scoped[i]
  for (let i = 0; i < unscopedRules.length; i++) {
    const scoped = scopedRules[i];
    const unscoped = unscopedRules[i];

    const normalizedScoped = normalizeScopedSelector(scoped.selectorNormalized);
    if (normalizedScoped !== unscoped.selectorNormalized) {
      throw new Error(
        `Scoped rule "${scoped.selectorNormalized}" (normalized: "${normalizedScoped}") ` +
          `does not correspond to unscoped rule "${unscoped.selectorNormalized}". ` +
          `Not removing anything.`,
      );
    }

    if (!applyClassesAreEquivalent(scoped.applyClasses, unscoped.applyClasses)) {
      throw new Error(
        `Scoped rule "${scoped.selectorNormalized}" has @apply [${scoped.applyClasses.join(' ')}] ` +
          `but unscoped rule "${unscoped.selectorNormalized}" has @apply [${unscoped.applyClasses.join(' ')}] — ` +
          `expected scoped classes to be the tw:-prefixed versions. Not removing anything.`,
      );
    }
  }

  // Remove unscoped rules: keep everything up to (but not including) the whitespace before the
  // first unscoped rule, then trim trailing whitespace and add a newline before the closing `}`
  const trimmedLayerContent = layerContent
    .slice(0, unscopedRules[0].fullStart)
    .replace(/\s+$/, '\n');

  const newCss = css.slice(0, layerContentStart) + trimmedLayerContent + css.slice(layerEnd);

  console.log(`Removed ${unscopedRules.length} unscoped @layer base rule(s) added by shadcn.`);
  return newCss;
}

// ---- Main ----

function main(): void {
  // Step 1: Abort if there are uncommitted working changes
  const gitStatus = execSync('git status --porcelain', {
    encoding: 'utf8',
    stdio: ['pipe', 'pipe', 'inherit'],
  });
  if (gitStatus.trim()) {
    process.stderr.write('Aborting: there are uncommitted working changes:\n');
    process.stderr.write(gitStatus);
    process.exit(1);
  }

  // Step 2: Get the preset name from the first CLI argument
  const preset = process.argv[2];
  if (!preset) {
    process.stderr.write('Usage: npm run apply-shadcn-preset-destructive -- <preset-name>\n');
    process.exit(1);
  }

  console.log(`Applying shadcn preset "${preset}"…`);

  const problems: string[] = [];
  let css: string;

  // Steps 3–6: Read and prepare index.css
  css = readFileSync(INDEX_CSS, 'utf8');
  css = fixImportQuotes(css);
  css = removeLightSelector(css);
  writeFileSync(INDEX_CSS, css, 'utf8');
  console.log('Prepared index.css (converted @import quotes, removed .light selector).');

  // Step 7: Run `npx shadcn apply --preset <preset> -y`
  console.log('\n--- Running shadcn apply ---');
  try {
    execFileSync('npx', ['shadcn', 'apply', '--preset', preset, '-y'], {
      cwd: LIB_DIR,
      stdio: 'inherit',
    });
    console.log('--- shadcn apply finished ---\n');
  } catch (e) {
    problems.push(`shadcn apply failed: ${e instanceof Error ? e.message : String(e)}`);
    console.log('--- shadcn apply failed ---\n');
  }

  // Step 8: Re-read the (possibly updated) index.css
  try {
    css = readFileSync(INDEX_CSS, 'utf8');
  } catch (e) {
    problems.push(`Failed to re-read index.css: ${e instanceof Error ? e.message : String(e)}`);
    // css stays as the pre-apply version so restoration can still run
  }

  // Step 9: Verify and clean up @layer base
  try {
    css = processLayerBase(css);
  } catch (e) {
    problems.push(`@layer base processing error: ${e instanceof Error ? e.message : String(e)}`);
  }

  // Steps 10–11: Restore index.css (always runs, even on earlier failure)
  console.log('Restoring index.css (@import quotes and .light selector)…');
  try {
    css = restoreImportQuotes(css);
    css = addLightSelector(css);
    writeFileSync(INDEX_CSS, css, 'utf8');
    console.log('index.css restored.');
  } catch (e) {
    problems.push(`Failed to restore index.css: ${e instanceof Error ? e.message : String(e)}`);
  }

  // Step 12: Revert shadcn's changes to utils.ts (always runs)
  console.log('Reverting utils.ts…');
  try {
    execFileSync('git', ['checkout', '--', UTILS_TS], { stdio: 'inherit' });
    console.log('utils.ts reverted.');
  } catch (e) {
    problems.push(`Failed to revert utils.ts: ${e instanceof Error ? e.message : String(e)}`);
  }

  // Step 13: Format and lint-fix (always runs)
  const formatLintRetryNote =
    'Run both "npm run format" and "npm run lint-fix" from lib/platform-bible-react and make sure both succeed before committing.';

  console.log('Running npm run format…');
  try {
    execFileSync('npm', ['run', 'format'], { cwd: LIB_DIR, stdio: 'inherit' });
    console.log('Formatting done.');
  } catch (e) {
    problems.push(
      `npm run format failed: ${e instanceof Error ? e.message : String(e)}. ${formatLintRetryNote}`,
    );
  }

  console.log('Running npm run lint-fix…');
  try {
    execFileSync('npm', ['run', 'lint-fix'], { cwd: LIB_DIR, stdio: 'inherit' });
    console.log('Lint-fix done.');
  } catch (e) {
    problems.push(
      `npm run lint-fix failed: ${e instanceof Error ? e.message : String(e)}. ${formatLintRetryNote}`,
    );
  }

  // Commit message used in both paths so the user can reproduce it manually if needed
  const commitMessage = `Apply shadcn preset via \`npx shadcn apply --preset ${preset}\` to re-add shadcn components from latest version as a new baseline`;

  const upgradeReminder =
    'This script is meant to be run during /upgrade-shadcn.\n' +
    'If this was not run during /upgrade-shadcn, make sure to follow /upgrade-shadcn carefully!';

  // Report problems and bail, giving the user the commit command to run after fixing
  if (problems.length > 0) {
    process.stderr.write('\n--- Problems encountered ---\n');
    problems.forEach((p) => process.stderr.write(`  • ${p}\n`));
    process.stderr.write('\nFix the problems above, then commit with:\n');
    process.stderr.write(
      `  git add lib/platform-bible-react && git commit -m '${commitMessage}'\n`,
    );
    console.log(`\n${upgradeReminder}`);
    process.exit(1);
  }

  // Stage everything under lib/platform-bible-react and commit
  try {
    execFileSync('git', ['add', LIB_DIR], { stdio: 'inherit' });
    execFileSync('git', ['commit', '-m', commitMessage], { stdio: 'inherit' });
  } catch (e) {
    process.stderr.write(
      `\nCommit failed: ${e instanceof Error ? e.message : String(e)}\n` +
        'Manually commit with:\n' +
        `  git add lib/platform-bible-react && git commit -m '${commitMessage}'\n`,
    );
    console.log(`\n${upgradeReminder}`);
    process.exit(1);
  }

  console.log(`\nDone! Preset applied and committed successfully.\n${upgradeReminder}`);
}

main();
