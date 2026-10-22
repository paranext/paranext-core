import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

/*
 * Helpers for source-reading contract tests over `platform-scripture-editor.web-view.tsx`. The web
 * view cannot be mounted in jsdom (see `content-zoom-markers.contract.test.ts`), so those tests
 * check its wiring by walking its syntax tree instead.
 */

const WEB_VIEW_FILE = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  'platform-scripture-editor.web-view.tsx',
);

/** `platform-scripture-editor.web-view.tsx`, parsed. */
export function parseWebViewSource(): ts.SourceFile {
  return ts.createSourceFile(
    WEB_VIEW_FILE,
    readFileSync(WEB_VIEW_FILE, 'utf-8'),
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
}

/** Every node in `root`'s subtree, `root` included, in source order. */
export function descendants(root: ts.Node): ts.Node[] {
  const found: ts.Node[] = [];
  const visit = (node: ts.Node) => {
    found.push(node);
    ts.forEachChild(node, visit);
  };
  visit(root);
  return found;
}

/** The source text of the `propName` expression on every `<tagName>` element in the file. */
export function propExpressions(
  sourceFile: ts.SourceFile,
  tagName: string,
  propName: string,
): string[] {
  return descendants(sourceFile).flatMap((node) => {
    if (
      !(ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) ||
      node.tagName.getText(sourceFile) !== tagName
    )
      return [];
    return node.attributes.properties.flatMap((attribute) =>
      ts.isJsxAttribute(attribute) &&
      attribute.name.getText(sourceFile) === propName &&
      attribute.initializer &&
      ts.isJsxExpression(attribute.initializer) &&
      attribute.initializer.expression
        ? [attribute.initializer.expression.getText(sourceFile)]
        : [],
    );
  });
}

/** The initializer of the one variable named `name` in the file; throws unless there is exactly one. */
export function variableInitializer(sourceFile: ts.SourceFile, name: string): ts.Expression {
  const initializers = descendants(sourceFile).flatMap((node) =>
    ts.isVariableDeclaration(node) && node.name.getText(sourceFile) === name && node.initializer
      ? [node.initializer]
      : [],
  );
  if (initializers.length !== 1)
    throw new Error(`Expected one variable named ${name}, found ${initializers.length}`);
  return initializers[0];
}

/**
 * The first object literal in `root`'s subtree (such as the one a `useMemo` factory returns), as
 * the source text of each spread and of each named property's value. Order-insensitive, so a
 * reordered literal still compares equal.
 */
export function objectLiteralShape(
  sourceFile: ts.SourceFile,
  root: ts.Node,
): { spreads: string[]; properties: Record<string, string> } {
  const literal = descendants(root).find(ts.isObjectLiteralExpression);
  if (!literal) throw new Error('No object literal found');
  const spreads: string[] = [];
  const properties: Record<string, string> = {};
  literal.properties.forEach((property) => {
    if (ts.isSpreadAssignment(property)) spreads.push(property.expression.getText(sourceFile));
    else if (ts.isPropertyAssignment(property))
      properties[property.name.getText(sourceFile)] = property.initializer.getText(sourceFile);
    else if (ts.isShorthandPropertyAssignment(property))
      properties[property.name.getText(sourceFile)] = property.name.getText(sourceFile);
  });
  return { spreads, properties };
}

/**
 * The dependency list of every `useEffect` in the file whose callback calls `calleeName`, as the
 * source text of each dependency.
 */
export function effectDependenciesCalling(
  sourceFile: ts.SourceFile,
  calleeName: string,
): string[][] {
  return descendants(sourceFile).flatMap((node) => {
    if (
      !ts.isCallExpression(node) ||
      node.expression.getText(sourceFile) !== 'useEffect' ||
      node.arguments.length < 2
    )
      return [];
    const [callback, dependencies] = node.arguments;
    const callsCallee = descendants(callback).some(
      (inner) => ts.isCallExpression(inner) && inner.expression.getText(sourceFile) === calleeName,
    );
    if (!callsCallee || !ts.isArrayLiteralExpression(dependencies)) return [];
    return [dependencies.elements.map((element) => element.getText(sourceFile))];
  });
}
