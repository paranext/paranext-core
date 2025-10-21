import { UsfmLocation, UsjNodeAndDocumentLocation } from '../usj-reader-writer.model';

/** Location expressed in USFM and USJ for testing purposes */
export type LocationUsfmAndUsj = {
  usfmLocation: UsfmLocation;
  /** Do not include `content` in the nodes */
  usjContent: UsjNodeAndDocumentLocation;
};
