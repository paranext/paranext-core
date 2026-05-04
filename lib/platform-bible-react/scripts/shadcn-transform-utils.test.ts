import {
  mkdtempSync,
  readFileSync as fsReadFileSync,
  rmSync,
  writeFileSync as fsWriteFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import {
  applyTransformationsToFiles,
  parseComponentDeclaredVars,
  parseProtectedVarsFromIndexCss,
  removeAtThemeBlocks,
  rewriteCssVarReferences,
} from './shadcn-transform-utils';

// ---- Moved from apply-shadcn-preset.test.ts ----

describe('removeAtThemeBlocks', () => {
  it('blanks out a single @theme block while preserving total length', () => {
    const input = `:root { --a: 1; }\n@theme inline {\n  --tw-foo: 1;\n}\n.dark { --b: 2; }\n`;
    const result = removeAtThemeBlocks(input);
    expect(result.length).toBe(input.length);
    expect(result).not.toContain('@theme');
    expect(result).not.toContain('--tw-foo');
    expect(result).toContain(':root { --a: 1; }');
    expect(result).toContain('.dark { --b: 2; }');
  });

  it('handles nested braces inside @theme blocks', () => {
    const input = `@theme {\n  --x: { nested: 1 };\n}\nafter`;
    const result = removeAtThemeBlocks(input);
    expect(result.length).toBe(input.length);
    expect(result).not.toContain('@theme');
    expect(result.endsWith('after')).toBe(true);
  });

  it('handles multiple @theme blocks', () => {
    const input = `@theme { --a: 1; }\nbetween\n@theme inline { --b: 2; }\nend`;
    const result = removeAtThemeBlocks(input);
    expect(result.length).toBe(input.length);
    expect(result).not.toContain('--a:');
    expect(result).not.toContain('--b:');
    expect(result).toContain('between');
    expect(result).toContain('end');
  });

  it('returns input unchanged when there are no @theme blocks', () => {
    const input = `:root { --a: 1; }\n.dark { --b: 2; }\n`;
    expect(removeAtThemeBlocks(input)).toBe(input);
  });
});

describe('parseProtectedVarsFromIndexCss', () => {
  it('collects vars declared in :root and skips vars inside @theme', () => {
    const input = `:root {\n  --background: oklch(1 0 0);\n  --foreground: oklch(0 0 0);\n}\n@theme inline {\n  --tw-radius-md: 0.5rem;\n}\n`;
    const result = parseProtectedVarsFromIndexCss(input);
    expect(result.has('--background')).toBe(true);
    expect(result.has('--foreground')).toBe(true);
    expect(result.has('--tw-radius-md')).toBe(false);
  });

  it('collects vars from multiple selectors (`:root`, `.dark`, custom theme classes)', () => {
    const input = `:root { --a: 1; }\n.dark { --b: 2; }\n.paratext-light { --c: 3; }\n`;
    const result = parseProtectedVarsFromIndexCss(input);
    expect(result.has('--a')).toBe(true);
    expect(result.has('--b')).toBe(true);
    expect(result.has('--c')).toBe(true);
  });

  it('returns an empty set for CSS without any var declarations outside @theme', () => {
    const input = `@theme { --tw-x: 1; }\n.bar { color: red; }\n`;
    expect(parseProtectedVarsFromIndexCss(input).size).toBe(0);
  });
});

describe('parseComponentDeclaredVars', () => {
  it('collects vars declared as inline-style object keys', () => {
    const input = `<div style={{ '--foo': '1', '--bar-baz': '2' }} />`;
    const result = parseComponentDeclaredVars(input);
    expect(result.has('--foo')).toBe(true);
    expect(result.has('--bar-baz')).toBe(true);
  });

  it('collects vars declared via element.style.setProperty', () => {
    const input = `el.style.setProperty('--qux', '5'); ref.current.style.setProperty("--zoo", '6');`;
    const result = parseComponentDeclaredVars(input);
    expect(result.has('--qux')).toBe(true);
    expect(result.has('--zoo')).toBe(true);
  });

  it('returns an empty set when no component vars are declared', () => {
    expect(parseComponentDeclaredVars(`const x = 1; var(--unrelated)`).size).toBe(0);
  });
});

describe('rewriteCssVarReferences', () => {
  it('rewrites bare var(--xxx) to var(--tw-xxx)', () => {
    const input = `color: var(--background); border: 1px solid var(--ring);`;
    expect(rewriteCssVarReferences(input, new Set())).toBe(
      `color: var(--tw-background); border: 1px solid var(--tw-ring);`,
    );
  });

  it('does not rewrite already-prefixed --tw- vars', () => {
    const input = `color: var(--tw-foo);`;
    expect(rewriteCssVarReferences(input, new Set())).toBe(input);
  });

  it('does not rewrite vars in the protected set', () => {
    const input = `color: var(--background); border: var(--ring);`;
    expect(rewriteCssVarReferences(input, new Set(['--background']))).toBe(
      `color: var(--background); border: var(--tw-ring);`,
    );
  });

  it('handles hyphenated var names', () => {
    const input = `color: var(--my-custom-var);`;
    expect(rewriteCssVarReferences(input, new Set())).toBe(`color: var(--tw-my-custom-var);`);
  });
});

// ---- New tests for applyTransformationsToFiles ----

describe('applyTransformationsToFiles', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = mkdtempSync(join(tmpdir(), 'shadcn-test-'));
  });

  afterEach(() => {
    rmSync(tmpDir, { recursive: true, force: true });
  });

  it('converts React namespace import to default import', () => {
    const file = join(tmpDir, 'test.tsx');
    fsWriteFileSync(file, "import * as React from 'react';\nconst x = 1;\n");
    const result = applyTransformationsToFiles([file], new Set());
    expect(result.errors).toHaveLength(0);
    expect(result.modifiedCount).toBe(1);
    expect(fsReadFileSync(file, 'utf8')).toBe("import React from 'react';\nconst x = 1;\n");
  });

  it('converts double-quoted React namespace import to default import', () => {
    const file = join(tmpDir, 'test.tsx');
    fsWriteFileSync(file, 'import * as React from "react";\nconst x = 1;\n');
    const result = applyTransformationsToFiles([file], new Set());
    expect(result.errors).toHaveLength(0);
    expect(result.modifiedCount).toBe(1);
    expect(fsReadFileSync(file, 'utf8')).toBe("import React from 'react';\nconst x = 1;\n");
  });

  it('converts rtl:tw: to tw:rtl:', () => {
    const file = join(tmpDir, 'test.tsx');
    fsWriteFileSync(file, `className="rtl:tw:flex tw:p-4"\n`);
    const result = applyTransformationsToFiles([file], new Set());
    expect(result.errors).toHaveLength(0);
    expect(result.modifiedCount).toBe(1);
    expect(fsReadFileSync(file, 'utf8')).toBe(`className="tw:rtl:flex tw:p-4"\n`);
  });

  it('rewrites var(--xxx) to var(--tw-xxx) for unprotected vars', () => {
    const file = join(tmpDir, 'test.tsx');
    fsWriteFileSync(
      file,
      `const s = { color: 'var(--ring)', background: 'var(--background)' };\n`,
    );
    const result = applyTransformationsToFiles([file], new Set(['--background']));
    expect(result.errors).toHaveLength(0);
    expect(result.modifiedCount).toBe(1);
    expect(fsReadFileSync(file, 'utf8')).toBe(
      `const s = { color: 'var(--tw-ring)', background: 'var(--background)' };\n`,
    );
  });

  it('applies all three transforms in a single pass', () => {
    const file = join(tmpDir, 'test.tsx');
    fsWriteFileSync(
      file,
      'import * as React from "react";\nconst s = "rtl:tw:flex var(--ring)";\n',
    );
    const result = applyTransformationsToFiles([file], new Set());
    expect(result.errors).toHaveLength(0);
    expect(result.modifiedCount).toBe(1);
    expect(fsReadFileSync(file, 'utf8')).toBe(
      'import React from \'react\';\nconst s = "tw:rtl:flex var(--tw-ring)";\n',
    );
  });

  it('returns modifiedCount=0 and no errors when no changes are needed', () => {
    const file = join(tmpDir, 'test.tsx');
    fsWriteFileSync(file, "import React from 'react';\nconst x = 1;\n");
    const result = applyTransformationsToFiles([file], new Set());
    expect(result.errors).toHaveLength(0);
    expect(result.modifiedCount).toBe(0);
    expect(fsReadFileSync(file, 'utf8')).toBe("import React from 'react';\nconst x = 1;\n");
  });

  it('returns modifiedCount=0 for an empty file list', () => {
    const result = applyTransformationsToFiles([], new Set());
    expect(result.errors).toHaveLength(0);
    expect(result.modifiedCount).toBe(0);
  });

  it('records an error for a non-existent file and continues processing other files', () => {
    const goodFile = join(tmpDir, 'good.tsx');
    const badFile = join(tmpDir, 'nonexistent.tsx');
    fsWriteFileSync(goodFile, "import * as React from 'react';\n");
    const result = applyTransformationsToFiles([badFile, goodFile], new Set());
    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain('nonexistent.tsx');
    expect(result.modifiedCount).toBe(1);
  });

  it('protects component-declared vars from being rewritten', () => {
    const file = join(tmpDir, 'test.tsx');
    // Component declares '--local-color' via inline style; it must not get the --tw- prefix
    fsWriteFileSync(
      file,
      `<div style={{ '--local-color': 'red' }}>\n  <span style={{ color: 'var(--local-color)' }} />\n</div>\n`,
    );
    const result = applyTransformationsToFiles([file], new Set());
    expect(result.errors).toHaveLength(0);
    const content = fsReadFileSync(file, 'utf8');
    // var(--local-color) should NOT be rewritten because the component declares it
    expect(content).toContain('var(--local-color)');
    expect(content).not.toContain('var(--tw-local-color)');
  });
});
