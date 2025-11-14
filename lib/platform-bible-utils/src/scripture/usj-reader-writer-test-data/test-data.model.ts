import { UsfmVerseLocation, UsjNodeAndDocumentLocation } from '../usj-reader-writer.model';

/** Location expressed in USFM and USJ for testing purposes */
export type LocationUsfmAndUsj = {
  usfmVerseLocation: UsfmVerseLocation;
  /** Do not include `content` in the nodes */
  usjContent: UsjNodeAndDocumentLocation;
};
