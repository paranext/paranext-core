import { existsSync } from 'fs';
import path from 'path';
import { DatabaseSync, SQLInputValue } from 'node:sqlite';
import { describe, expect, it, vi } from 'vitest';

const databases = new Map<string, DatabaseSync>();

// Runs the manager's queries against a real in-memory SQLite database, so the order the rows come
// back in is SQLite's, as it is in the app
vi.mock('@papi/backend', () => ({
  default: {
    database: {
      openDatabase: vi.fn(async (fileUri: string) => fileUri),
      select: vi.fn(
        async (databaseNonce: string, sql: string, parameters: Record<string, unknown> = {}) => {
          const database = databases.get(databaseNonce);
          if (!database) throw new Error(`No test database ${databaseNonce}`);
          const boundParameters: Record<string, SQLInputValue> = {};
          Object.entries(parameters).forEach(([name, value]) => {
            // SQLite needs NULL for the selector fields that are not set
            // eslint-disable-next-line no-null/no-null
            boundParameters[name] = value === undefined ? null : (value as SQLInputValue); // eslint-disable-line no-type-assertion/no-type-assertion -- the manager only binds strings and numbers
          });
          return database.prepare(sql).all(boundParameters);
        },
      ),
    },
  },
}));

// vi.mock declarations above are hoisted, so the imports below must come after to ensure the
// mock is applied to the module under test.
/* eslint-disable import/first */
import { LexicalReferenceTextManager } from './lexical-reference-text-manager.model';
/* eslint-enable import/first */

/**
 * The schema of the lexical.db that ships, which `npm install` downloads. Copying it, rather than
 * keeping a copy of it here, means a change to the schema in marble-tools fails these tests instead
 * of drifting from them.
 */
function readShippedSchema(): string {
  const shippedDatabasePath = path.join(__dirname, '..', 'assets', 'lexical-db', 'lexical.db');
  if (!existsSync(shippedDatabasePath))
    throw new Error(
      `${shippedDatabasePath} is missing. Run \`npm install\`, whose postinstall step downloads it.`,
    );
  const shippedDatabase = new DatabaseSync(shippedDatabasePath, { readOnly: true });
  try {
    return (
      shippedDatabase
        // SQLite's own tables, such as `ANALYZE`'s sqlite_stat1, cannot be created by name
        .prepare(
          "SELECT sql FROM sqlite_master WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite\\_%' ESCAPE '\\' ORDER BY rowid",
        )
        .all()
        .map(({ sql }) => `${sql};`)
        .join('\n')
    );
  } finally {
    shippedDatabase.close();
  }
}

const SCHEMA = readShippedSchema();

/**
 * Builds an entry whose senses were imported (SenseKey order) in a different order than their IDs
 * sort, as MARBLE's אִם is: its meanings are 1, 2, 3, 4, 8, 7, 5, 6, 9 in the XML.
 */
async function createManagerWithOneEntry() {
  const database = new DatabaseSync(':memory:');
  database.exec(SCHEMA);
  database.exec(`
    INSERT INTO LexicalReferenceTexts VALUES (1, 'SDBH', '1');
    INSERT INTO Languages VALUES (1, 'en');
    INSERT INTO Corpora VALUES (1, 'WLC');
    INSERT INTO Entries VALUES (1, 1, '000479', 'אִם');
    INSERT INTO Senses VALUES (10, 1, 1, '000479001002000', 'imported first');
    INSERT INTO Senses VALUES (11, 1, 1, '000479001001000', 'imported second');
    INSERT INTO SenseOccurrences VALUES (10, 1, 1, 3, 1, 2), (10, 1, 1, 1, 5, 2);
    INSERT INTO SenseOccurrences VALUES (11, 1, 1, 2, 4, 2);
  `);
  databases.set('test.db', database);

  const manager = new LexicalReferenceTextManager();
  await manager.registerLexicalReferenceText('test.db');
  return manager;
}

describe('LexicalReferenceTextManager.getEntriesById', () => {
  it('lists senses in the order they were imported', async () => {
    const manager = await createManagerWithOneEntry();
    const entry = (await manager.getEntriesById({ lemma: 'אִם' }))['000479']?.[0];
    expect(Object.values(entry?.senses ?? {}).map((sense) => sense?.definition)).toEqual([
      'imported first',
      'imported second',
    ]);
  });

  it("lists each sense's occurrences in Bible order", async () => {
    const manager = await createManagerWithOneEntry();
    const entry = (await manager.getEntriesById({ lemma: 'אִם' }))['000479']?.[0];
    const sense = entry?.senses['000479001002000'];
    expect(sense?.occurrences.WLC?.map((occurrence) => occurrence.verseRef)).toEqual([
      { book: 'GEN', chapterNum: 1, verseNum: 5 },
      { book: 'GEN', chapterNum: 3, verseNum: 1 },
    ]);
  });
});
