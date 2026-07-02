export type ResourceType =
  | 'ScriptureResource'
  | 'CommentaryResource'
  | 'EnhancedResource'
  | 'XmlResource'
  | 'SourceLanguageResource';

export type DblResourceData = {
  dblEntryUid: string;
  displayName: string;
  fullName: string;
  bestLanguageName: string;
  type: ResourceType;
  size: number;
  installed: boolean;
  updateAvailable: boolean;
  projectId: string;
};

// #region Resource Reference Types
// The persisted shapes for project/resource references (e.g. the text-connection settings managed
// by the platform-scripture extension). They live here — the lowest layer that both extensions and
// platform-bible-react can depend on — so that shared code such as the experimental
// `useEffectiveResourceReferenceList` hook can reference them without depending on an extension's
// type declarations. The platform-scripture extension re-exports them from its own module.

/** A reference to a Paratext project, identified by its 20-byte (40-char) hex ID */
export type ProjectReference = {
  /** Discriminant identifying this as a reference to a Paratext project */
  type: 'project';
  /**
   * Human-readable display name; serves as a sanity-check and aids forensic examination of the
   * settings file
   */
  name: string;
  /** 20-byte (40-char) hex ID that uniquely identifies the project */
  id: string;
  /**
   * When set by a project admin, indicates this resource should be shown by default when the shared
   * layout is applied. When `undefined`, no admin preference has been set.
   */
  isResourceShownByDefault?: boolean;
};

/** A reference to a DBL resource, identified by its 24-byte (48-char) hex ID */
export type DblResourceReference = {
  /** Discriminant identifying this as a reference to a DBL resource */
  type: 'dblResource';
  /**
   * Human-readable display name; serves as a sanity-check and aids forensic examination of the
   * settings file
   */
  name: string;
  /** 24-byte (48-char) hex ID that uniquely identifies the resource */
  id: string;
  /**
   * When set by a project admin, indicates this resource should be shown by default when the shared
   * layout is applied. When `undefined`, no admin preference has been set.
   */
  isResourceShownByDefault?: boolean;
};

/** A reference to an Enhanced resource, identified by name */
export type EnhancedResourceReference = {
  /** Discriminant identifying this as a reference to an Enhanced resource */
  type: 'enhancedResource';
  /** Name that uniquely identifies the resource */
  name: string;
  /**
   * When set by a project admin, indicates this resource should be shown by default when the shared
   * layout is applied. When `undefined`, no admin preference has been set.
   */
  isResourceShownByDefault?: boolean;
};

/** A reference to an XML resource, identified by name */
export type XmlResourceReference = {
  /** Discriminant identifying this as a reference to an XML resource */
  type: 'xmlResource';
  /** Name that uniquely identifies the resource */
  name: string;
  /**
   * When set by a project admin, indicates this resource should be shown by default when the shared
   * layout is applied. When `undefined`, no admin preference has been set.
   */
  isResourceShownByDefault?: boolean;
};

/** A reference to a Source Language resource, identified by name */
export type SourceLanguageResourceReference = {
  /** Discriminant identifying this as a reference to a Source Language resource */
  type: 'sourceLanguageResource';
  /** Name that uniquely identifies the resource */
  name: string;
  /**
   * When set by a project admin, indicates this resource should be shown by default when the shared
   * layout is applied. When `undefined`, no admin preference has been set.
   */
  isResourceShownByDefault?: boolean;
};

/**
 * A resource reference with a type discriminant not recognized by this version of the software.
 * Exists solely for storage round-trip compatibility — the software never acts on unknown items
 * meaningfully and they are excluded from merged/derived collections such as the effective resource
 * reference list. Treat them as opaque and pass them through unchanged.
 */
export type UnknownResourceReference = {
  /** Additional properties preserved from the stored JSON */
  [key: string]: unknown;
  /** Unrecognized type discriminant */
  type: string;
};

/** Discriminated union of all project/resource reference types */
export type ResourceReference =
  | ProjectReference
  | DblResourceReference
  | EnhancedResourceReference
  | XmlResourceReference
  | SourceLanguageResourceReference
  | UnknownResourceReference;

/** Ordered list of project and resource references */
export type ResourceReferenceList = {
  /**
   * Data schema version in Major.Minor.Patch format. Distinct from the storage-format version
   * prefix — this version describes the semantics of the `items` content.
   *
   * The project setting validator rejects any write that would downgrade the major or minor version
   * of the currently stored value. **The patch digit is not protected:** it may be downgraded
   * freely, so only use a patch bump for changes that are entirely optional and can be silently
   * lost with no harmful consequences (e.g., cosmetic ordering, non-critical display hints). Use
   * minor bumps for additive, backwards-compatible changes. Use major bumps for breaking changes.
   */
  dataVersion: string;
  /** Ordered list of project and resource references */
  items: ResourceReference[];
};

/**
 * A {@link ResourceReference} augmented with a runtime-only `source` tag indicating which settings
 * file the item came from. This tag is **not stored on disk** — it is computed by
 * platform-bible-react's experimental `useEffectiveResourceReferenceList` hook when merging
 * project-level and user-level lists.
 *
 * - `'admin'` — the item came from the project-level (shared) settings file.
 * - `'user'` — the item exists only in the current user's personal settings file.
 *
 * When an item appears in both files, it is tagged `'admin'` and the user copy is dropped.
 */
export type EffectiveResourceReference = ResourceReference & {
  source: 'admin' | 'user';
};

/**
 * The merged, read-only view produced by platform-bible-react's experimental
 * `useEffectiveResourceReferenceList` hook. Admin-sourced items are listed before user-sourced
 * items.
 */
export type EffectiveResourceReferenceList = {
  dataVersion: string;
  items: EffectiveResourceReference[];
};

// #endregion Resource Reference Types
