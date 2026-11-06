import { ProjectMetadata } from '@papi/core';
import { normalizeFullName } from 'platform-bible-utils';

/** The display fields a project picker needs, read straight off a project's metadata. */
export type ProjectNamesFromMetadata = {
  /** Short name — the identifying field, so it always resolves to something. */
  shortName: string;
  /** Full name, absent when the project has none of its own. */
  fullName?: string;
  /** Human-readable language name, absent when the project does not define one. */
  language?: string;
};

/**
 * Reads the names and language a project picker needs off a project's metadata.
 *
 * Metadata, not `pdp.getSetting`: `platform.fullName` has a contribution default — a localized
 * `*Name Missing*` placeholder — so an unset full name reads back as that placeholder and would
 * render as a real second name. Metadata omits the field, and costs no data provider per project.
 *
 * `name` is optional on the metadata contract, and the id is its documented fallback. A
 * present-but-blank `name` also falls back: the short name is the one field that survives every
 * truncation step, so a blank one leaves a row the user cannot identify at all.
 *
 * `language` feeds a picker's Language grouping; a project without one degrades to the unknown
 * language bucket and stays perfectly searchable.
 *
 * @param metadata The project's metadata.
 * @returns The project's short name, optional full name, and optional language.
 */
export function projectNamesFromMetadata(metadata: ProjectMetadata): ProjectNamesFromMetadata {
  return {
    shortName: metadata.name?.trim() ? metadata.name : metadata.id,
    fullName: normalizeFullName(metadata.fullName),
    language: metadata.language,
  };
}
