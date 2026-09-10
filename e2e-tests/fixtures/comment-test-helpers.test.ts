/**
 * Unit tests for {@link setReferencedProjectsAndResources}.
 *
 * These run under vitest (`npm test`), not Playwright: the file-writing logic is pure I/O against a
 * `Settings.xml` on disk and needs no Electron or app. Each test gets its own temp directory (never
 * a real project folder), removed again in `afterEach`.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { afterEach, describe, expect, it } from 'vitest';
import { setReferencedProjectsAndResources, type CommentTestProject } from './comment-test-helpers';

/**
 * Mirrors `REFERENCED_PROJECTS_AND_RESOURCES_DATA_VERSION` in `comment-test-helpers.ts` — that
 * constant is not exported, so the version this suite expects on disk is pinned here
 * independently.
 */
const DATA_VERSION = '1.1.0';

let tempDir: string;

afterEach(() => {
  // The one recursive removal this suite allows itself: a temp directory it created above, never a
  // real path.
  fs.rmSync(tempDir, { recursive: true, force: true });
});

/**
 * Writes a minimal `Settings.xml` into a fresh temp directory and returns the project pointing at
 * it.
 */
function projectWithSettingsXml(
  overrides: Partial<CommentTestProject> = {},
  { includeClosingTag = true } = {},
): CommentTestProject {
  tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'comment-test-helpers-'));
  const body = '<ScriptureText>\n  <Name>testProj</Name>\n';
  fs.writeFileSync(
    path.join(tempDir, 'Settings.xml'),
    includeClosingTag ? `${body}</ScriptureText>\n` : body,
    'utf8',
  );
  return {
    shortName: 'testProj',
    projectDir: tempDir,
    projectId: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    users: [],
    ...overrides,
  };
}

/** Reads the project's `Settings.xml` back off disk. */
function readSettingsXml(project: CommentTestProject): string {
  return fs.readFileSync(path.join(project.projectDir, 'Settings.xml'), 'utf8');
}

/**
 * Reverses the XML text-node escaping `setReferencedProjectsAndResources` applies, in the order
 * that undoes it correctly (`&amp;` last — see the identical pattern in
 * `readCurrentParatextUserName`, which un-escapes the same five entities for the same reason).
 */
function unescapeXml(value: string): string {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

/**
 * Extracts the raw (still XML-escaped) text of the `<ReferencedProjectsAndResources>` element, and
 * asserts along the way that it sits with nothing between its closing tag and `</ScriptureText>` —
 * i.e. it was written immediately before that tag, not merely somewhere in the file.
 */
function extractElementTextImmediatelyBeforeClosingTag(xml: string): string {
  const match =
    /<ReferencedProjectsAndResources>([\s\S]*?)<\/ReferencedProjectsAndResources>\n<\/ScriptureText>/.exec(
      xml,
    );
  if (!match) throw new Error(`Element not found immediately before </ScriptureText> in: ${xml}`);
  return match[1];
}

/**
 * Splits off the leading `"<dataVersion> "` token and parses the JSON remainder — which itself
 * carries its own `dataVersion` field, the shape `GetProjectSetting` reads.
 */
function parseElementText(unescapedText: string) {
  // JSON.parse returns `any`; this test only ever feeds it text this same file just wrote.
  return JSON.parse(unescapedText.slice(unescapedText.indexOf(' ') + 1));
}

describe('setReferencedProjectsAndResources', () => {
  it('writes the element immediately before </ScriptureText>, parsing to dataVersion + items', () => {
    const project = projectWithSettingsXml();

    setReferencedProjectsAndResources(project, ['otherProjectId']);

    const rawText = extractElementTextImmediatelyBeforeClosingTag(readSettingsXml(project));
    const parsed = parseElementText(unescapeXml(rawText));

    expect(parsed).toEqual({
      dataVersion: DATA_VERSION,
      items: [{ type: 'project', name: 'otherProjectId', id: 'otherProjectId' }],
    });
  });

  it('escapes the whole text node, not just a name, so a literal "&" round-trips', () => {
    // A self-reference so the written item's `name` is `project.shortName` — the free-text field a
    // person could have typed, unlike a referenced id.
    const project = projectWithSettingsXml({ shortName: 'AT&T Sample' });

    setReferencedProjectsAndResources(project, [project.projectId]);

    const rawText = extractElementTextImmediatelyBeforeClosingTag(readSettingsXml(project));

    // Pins "the whole text node", not "just `name`": the JSON body's own structural quotes sit
    // right next to the escaped name, so if only `name` were escaped before JSON.stringify, those
    // quotes would still be literal `"` characters in this raw (pre-unescape) text.
    expect(rawText).not.toContain('"');
    expect(rawText).toContain('&quot;');
    expect(rawText).toContain('AT&amp;T Sample');
    expect(rawText).not.toContain('AT&T Sample');

    const parsed = parseElementText(unescapeXml(rawText));
    expect(parsed).toEqual({
      dataVersion: DATA_VERSION,
      items: [{ type: 'project', name: 'AT&T Sample', id: project.projectId }],
    });
  });

  it("maps the project's own id to its shortName, and any other id to itself", () => {
    const project = projectWithSettingsXml({ shortName: 'MyProj', projectId: 'selfId' });

    setReferencedProjectsAndResources(project, [project.projectId, 'otherId']);

    const rawText = extractElementTextImmediatelyBeforeClosingTag(readSettingsXml(project));
    const parsed = parseElementText(unescapeXml(rawText));

    expect(parsed).toEqual({
      dataVersion: DATA_VERSION,
      items: [
        { type: 'project', name: 'MyProj', id: 'selfId' },
        { type: 'project', name: 'otherId', id: 'otherId' },
      ],
    });
  });

  it('throws, and does not touch the file, when the element already exists', () => {
    const project = projectWithSettingsXml();
    const settingsPath = path.join(project.projectDir, 'Settings.xml');
    fs.writeFileSync(
      settingsPath,
      '<ScriptureText>\n  <ReferencedProjectsAndResources>1.1.0 {}</ReferencedProjectsAndResources>\n</ScriptureText>\n',
      'utf8',
    );
    const before = readSettingsXml(project);

    expect(() => setReferencedProjectsAndResources(project, ['id'])).toThrow(
      /already has a <ReferencedProjectsAndResources> element/,
    );
    expect(readSettingsXml(project)).toBe(before);
  });

  it('throws when </ScriptureText> is missing', () => {
    const project = projectWithSettingsXml({}, { includeClosingTag: false });

    expect(() => setReferencedProjectsAndResources(project, ['id'])).toThrow(
      /Expected <\/ScriptureText> closing tag/,
    );
  });

  it('writes a name containing "$&" verbatim instead of expanding it as a replace() pattern', () => {
    // `$&` is String.prototype.replace's own syntax for "the whole match" when the replacement is a
    // STRING — pins that the write goes through a replacer function instead, so this literal text
    // lands as-is rather than splicing in a second </ScriptureText>.
    const project = projectWithSettingsXml({ shortName: 'Weird $& Name' });

    setReferencedProjectsAndResources(project, [project.projectId]);

    const xml = readSettingsXml(project);
    expect(xml.split('</ScriptureText>').length - 1).toBe(1);

    const rawText = extractElementTextImmediatelyBeforeClosingTag(xml);
    const parsed = parseElementText(unescapeXml(rawText));
    expect(parsed).toEqual({
      dataVersion: DATA_VERSION,
      items: [{ type: 'project', name: 'Weird $& Name', id: project.projectId }],
    });
  });
});
