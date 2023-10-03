import { graphql, buildSchema } from 'graphql';
import { VerseRef, ScrVers } from '@sillsdev/scripture';
import projectLookupService from '@shared/services/project-lookup.service';
import { ProjectMetadata } from '@shared/models/project-metadata.model';
import { ProjectDataProvider } from '@shared/models/project-data-provider-engine.model';
import { getProjectDataProvider } from '@shared/services/project-data-provider.service';

// TODO: figure out what to do with the schema. It's a baked in string just to get things rolling, not because it's optimal.
const usfmSchema = buildSchema(`
  input VerseRef {
    book: String!
    chapter: String!
    verse: String!
    versification: String
  }

  type Project {
    id: String!
    name: String!
    storageType: String!
    projectType: String!
  }

  type Query {
    projects: [Project]
    getBook(projectId: String, verseRef: VerseRef): String
    getChapter(projectId: String, verseRef: VerseRef): String
    getVerse(projectId: String, verseRef: VerseRef): String
  }
`);

// There are probably frameworks that can  be used to automatically convert between GraphQL and TS/JS types
// We should figure out how we want to use GraphQL in more detail before deciding which ones (if any) to use
function extractVerseRef(verseRef: Object): VerseRef {
  // eslint-disable-next-line no-undef-init
  let versification: ScrVers | undefined = undefined;
  if ('versification' in verseRef) versification = new ScrVers(verseRef.versification as string);
  if ('book' in verseRef) {
    const book = verseRef.book as string;
    const chapter = 'chapter' in verseRef ? (verseRef.chapter as string) : '1';
    const verse = 'verse' in verseRef ? (verseRef.verse as string) : '1';
    return new VerseRef(book, chapter, verse, versification);
  }
  throw new Error(`Invalid verseRef: ${verseRef}`);
}

// Caching some objects do we don't have to keep making network calls for every GraphQL query
const projectMap = new Map<string, ProjectMetadata>();
const paratextProjectMap = new Map<string, ProjectDataProvider['ParatextStandard']>();

/** Transform the GraphQL inputs into objects we can work with */
async function preparePdpCall(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inputs: any,
): Promise<{ pdp: ProjectDataProvider['ParatextStandard']; verseRef: VerseRef }> {
  const { projectId, verseRef }: { projectId: string; verseRef: Object } = inputs;
  const parsedVerseRef = extractVerseRef(verseRef);
  const existingPdp = paratextProjectMap.get(projectId);
  if (existingPdp) return { pdp: existingPdp, verseRef: parsedVerseRef };
  const pdp = await getProjectDataProvider<'ParatextStandard'>(projectId);
  paratextProjectMap.set(projectId, pdp);
  return { pdp, verseRef: parsedVerseRef };
}

// This object hosts all of the resolvers. Each resolver is effectively a function call
const root = {
  projects: async (): Promise<ProjectMetadata[]> => {
    if (projectMap.size === 0) {
      const allProjects = await projectLookupService.getMetadataForAllProjects();
      allProjects.forEach((proj) => projectMap.set(proj.id, proj));
    }
    return [...projectMap.values()];
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getBook: async (inputs: any): Promise<string | undefined> => {
    const { pdp, verseRef } = await preparePdpCall(inputs);
    return pdp.getBook(verseRef);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getChapter: async (inputs: any): Promise<string | undefined> => {
    const { pdp, verseRef } = await preparePdpCall(inputs);
    return pdp.getChapter(verseRef);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getVerse: async (inputs: any): Promise<string | undefined> => {
    const { pdp, verseRef } = await preparePdpCall(inputs);
    return pdp.getVerse(verseRef);
  },
};

// It is unclear how to tell what sort of return type we'll have, so just give callers an easy
// type assert on our end.
/**
 * Run a query
 * @param query Text of a GraphQL query
 * @returns Promise to whatever GraphQL resolves for the query
 * @example
 * runQuery('{ projects { id name } }');
 * runQuery('{ getBook(projectId: "b4c501ad2538989d6fb723518e92408406e232d3", verseRef: {book: "JUD", chapter: "1", verse: "1"}) }');
 */
async function runQuery<ReturnType = unknown>(query: string): Promise<ReturnType> {
  const results = await graphql({
    schema: usfmSchema,
    rootValue: root,
    source: query,
  });

  if (results.errors) throw new Error(JSON.stringify(results.errors));
  // If there is only 1 result, just give it to the caller instead of making the use a map to get it
  if (results.data && Object.keys(results.data).length === 1)
    return Object.values(results.data).at(0) as ReturnType;
  return results.data as ReturnType;
}

/** This is just a prototype service for running GraphQL queries. It's not ready for production as-is. */
const graphqlService = {
  runQuery,
};

export default graphqlService;
