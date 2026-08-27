/**
 * The shapes this pipeline passes between its modules.
 *
 * Declared once here rather than inline per function, so a field renamed on one side of a module
 * boundary is a type error on the other rather than a wrong document.
 *
 * Only the shapes that CROSS a module boundary belong here. A shape one module builds and consumes
 * alone stays in that module, where it is read beside the code that maintains it.
 */

/** One license file licensee read from a package directory, as `detect.rb` reports it. */
export type DetectedFile = {
  filename: string;
  /** An SPDX id, or licensee's `NOASSERTION`/`NONE` sentinel when it could not identify the text. */
  spdxId: string;
  matcher: string;
  confidence: number;
  sha256: string;
  text: string;
};

/** Everything licensee found in one package directory. */
export type Detection = {
  dir: string;
  files: DetectedFile[];
};

/** How a package's license was resolved, and on what evidence. */
export type Verdict = {
  verdict: 'allowed' | 'elected' | 'excepted' | 'overridden' | 'blocked';
  spdxId: string | undefined;
  reason: string;
  declared: string | undefined;
  detected: string | undefined;
  matchedFile: string | undefined;
  textSha256: string | undefined;
};

/** A curated determination about a package whose own metadata establishes nothing. */
export type Override = {
  license: string;
  note?: string;
  reason?: string;
  /** Lists the package even where no restore on this machine resolves it. */
  alwaysList?: boolean;
  /** Records that `license` is deliberately free text rather than an SPDX expression. */
  nonSpdx?: boolean;
  /** The version the determination was made against; a different one comes back for review. */
  version?: string;
  /**
   * Records that the determination holds at any version, so no `version` is pinned. Required where
   * `version` is absent: an override is keyed by NAME alone, and silence about which version a
   * reviewer read is indistinguishable from a determination that was never re-checked.
   */
  versionIndependent?: boolean;
  /** A question this entry does NOT settle - reported on every run, never blocking. */
  openQuestion?: string;
};

/**
 * A license text this repository holds on behalf of a package that bundles none of its own.
 *
 * Pinned to the version it was read from AND to its own hash - it is reproduced verbatim as that
 * package's license, so neither a version change nor an edit may pass unreviewed.
 */
export type VendoredLicenseText = {
  /** Filename under `vendored-texts/`. */
  file: string;
  sha256: string;
  /** Where the text was read from, so the determination is re-checkable. */
  source: string;
  /** The package version whose terms these are. */
  version: string;
  reason: string;
};

/** A reviewed determination that clears one blocked package, pinned to a version and a text hash. */
export type Exception = {
  package: string;
  spdx: string;
  reason: string;
  reviewer: string;
  date: string;
  textSha256: string;
};

/** The choice this project takes among a declared disjunction's operands. */
export type Election = {
  elected: string;
  of: string;
  reason: string;
};

/**
 * A third-party notice file shipped inside an extension's copied static assets.
 *
 * See `static-assets.ts`: these trees reach none of the three sources the npm half is derived from,
 * so what is redistributed there is recorded here or the build refuses.
 */
export type StaticAssetNotice = {
  /** What this file states, and for which asset. */
  reason: string;
  /** Pins a tracked file whose text the document reproduces verbatim. */
  sha256?: string;
  /** Records that the file is fetched at install time, so there is nothing stable to pin. */
  notTracked?: boolean;
};

/** Why a package this repository declares as a runtime dependency reaches no bundle. */
export type UnbundledDependency = {
  /** Why nothing this repository ships contains it - one sentence. */
  reason: string;
};

/** What the notices document says about one Ubuntu library staged inside the Linux snap. */
export type SnapStagePackage = {
  classification: 'copyleft' | 'permissive' | 'not-established';
  /** As coarse as the terms are known - "LGPL", not necessarily an SPDX identifier. */
  terms?: string;
  /**
   * The library's own Ubuntu `copyright` file, checked in and hash-pinned.
   *
   * Required: the snap redistributes the library, so its notice has to travel, and nothing in the
   * `.snap` itself carries one - see `snapCopyrightText`.
   */
  copyright: VendoredCopyright;
};

/** A checked-in copy of a staged library's Ubuntu `copyright` file. */
export type VendoredCopyright = {
  /** Filename under `vendored-texts/snap/`. */
  file: string;
  sha256: string;
  /** Where it was read from, including the Ubuntu release, since the terms are release-specific. */
  source: string;
};

/**
 * Every repository-specific licensing decision, as `notices-policy.json` records them.
 *
 * The `*Note` fields are read by nothing here. JSON has no comments, so each one documents the
 * table it precedes for a reader of the policy file alone; the fuller guide to which instrument
 * answers which situation is `.erb/scripts/third-party-notices/README.md`.
 */
export type Policy = {
  allowed: string[];
  copyleft: string[];
  elections: Record<string, Election>;
  exceptionsNote?: string;
  exceptions: Exception[];
  copyrightNoticesNote?: string;
  copyrightNotices?: Record<string, string>;
  licenseTextsNote?: string;
  licenseTexts?: Record<string, VendoredLicenseText>;
  overrides?: Record<string, Override>;
  platformOnlyPackagesNote?: string;
  /** Packages npm installs only where their `os`/`cpu` constraints match. */
  platformOnlyPackages?: string[];
  unbundledDependenciesNote?: string;
  /** Keyed by package name - see `missingDirectDependencies` in `shipping-set.ts`. */
  unbundledDependencies?: Record<string, UnbundledDependency>;
  snapStagePackagesNote?: string;
  snapStagePackages?: Record<string, SnapStagePackage>;
  staticAssetNoticesNote?: string;
  /** Keyed by repo-relative path - see `static-assets.ts`. */
  staticAssetNotices?: Record<string, StaticAssetNotice>;
};

/** One npm package the build establishes as shipping, and how it was reached. */
export type ShippedPackage = {
  ecosystem: 'npm';
  name: string;
  version: string;
  dir: string;
  reachedVia: string[];
  /** Described from `package-lock.json` rather than from its directory. */
  fromLock?: boolean;
  /** Replaced on this machine by a `yalc` dev link. */
  devLinked?: true;
  /** Npm never installed it here; it ships on another platform. */
  platformOnly?: boolean;
  /** False when the directory was deliberately not read. */
  inspected?: boolean;
  declaredField?: string;
  /** Where this package's own dependencies resolve from in the lockfile. */
  lockKey?: string;
};

/** A `package-lock.json` entry. */
export type LockfileEntry = {
  version: string;
  license?: unknown;
  os?: string[];
  cpu?: string[];
  resolved?: string;
  link?: boolean;
  dependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
};

/** `package-lock.json` itself. */
export type Lockfile = {
  packages?: Record<string, LockfileEntry>;
};

/** The lockfile indexed the three ways this pipeline reads it. */
export type LockIndex = {
  lock: Lockfile;
  byPath: Map<string, LockfileEntry>;
  byName: Map<string, LockfileEntry>;
  keyByName: Map<string, string>;
};

/** One row of the committed notices lock sidecar. */
export type LockPackage = {
  ecosystem: string;
  name: string;
  version: string;
  spdxId: string | undefined;
  confidence: number;
  matchedFile: string | undefined;
  textSha256: string | undefined;
};

/** The committed notices lock sidecar. */
export type Lock = {
  licenseeVersion: string;
  corpusVersion: string;
  /**
   * Sha256 of the rendered `THIRD-PARTY-NOTICES.md` this lock was written beside.
   *
   * The lock records metadata and hashes and never the document's bytes, so nothing in it could see
   * a hand-edited document: delete a copyleft row, or swap one license text for another, and every
   * other field stays identical. Only the full `--verify` re-rendered the document to catch that,
   * and that path needs Ruby and four `dotnet restore` passes - so it runs on one CI leg, while the
   * check the RELEASE workflows run (`--verify-shipping-set`) could not answer the question at all.
   * A hash is the part of that answer that costs nothing to carry.
   *
   * Optional so a lock written before this field can still be read; the checks report its absence
   * rather than treating it as agreement.
   */
  documentSha256?: string;
  packages: LockPackage[];
};

/** A named text reproduced in the document - a package's own license file, or a NOTICE. */
export type NamedText = {
  name: string;
  text: string;
};

/** One package as the renderer receives it: its verdict, plus what was read from its directory. */
export type ReportRow = Verdict & {
  ecosystem: string;
  name: string;
  version: string;
  confidence?: number;
  text?: string;
  notices?: NamedText[];
  copyright?: string;
  fromLock?: boolean;
  devLinked?: boolean;
  platformOnly?: boolean;
  inspected?: boolean;
  rids?: string[];
  /** An override's recorded note, reproduced in the document's Notes column. */
  note?: string;
  /** The recorded election this row resolved through, where one applied. */
  election?: Election;
  /** Assemblies a NuGet package contributes to the publish output. */
  assemblies?: string[];
};

/** Everything `render` needs to write the document. */
export type Report = {
  verdicts: ReportRow[];
  policy?: Policy;
  unresolvedStylesheetSpecifiers?: string[];
  stalePolicyEntries?: string[];
  /** Curated overrides recording a question that has not been answered - see `openPolicyQuestions`. */
  openPolicyQuestions?: string[];
  corpusVersion: string;
  licenseeVersion: string;
  snapStagePackages?: string[];
  snapStagePackageLicenses?: Record<string, SnapStagePackage>;
  /** Each staged library's own `copyright` file, reproduced verbatim - see `snapCopyrightText`. */
  snapCopyrightTexts?: NamedText[];
  /** Texts reproduced on behalf of files copied into `extensions/dist` - see `static-assets.ts`. */
  staticAssetNotices?: NamedText[];
};

/**
 * One library entry inside a `project.assets.json` target.
 *
 * Each map is keyed by the path of a file the package contributes; the VALUES are empty objects, so
 * only the presence of a key carries information. A package with none of these ships nothing.
 */
export type DotnetTargetLibrary = {
  runtime?: Record<string, unknown>;
  runtimeTargets?: Record<string, unknown>;
  native?: Record<string, unknown>;
  resource?: Record<string, unknown>;
  compile?: Record<string, unknown>;
};

/** What MSBuild's restore writes, and `nuget-license` then reads. */
export type DotnetAssets = {
  /** Keyed by target framework, then by `Name/Version`. */
  targets?: Record<string, Record<string, DotnetTargetLibrary>>;
  packageFolders?: Record<string, unknown>;
};

/**
 * One package as the `nuget-license` CLI reports it.
 *
 * PascalCase because that is the tool's own output shape, not this pipeline's convention.
 */
export type NugetLicenseEntry = {
  PackageId: string;
  PackageVersion: string;
  License?: string;
  /** 2 is "Unknown" - the tool could not establish a license. See `mergeRidResults`. */
  LicenseInformationOrigin?: number;
  Copyright?: string;
  ValidationErrors?: unknown;
  Assemblies?: string[];
};

/** A NuGet package after the per-RID results have been merged. */
export type MergedNugetPackage = {
  ecosystem: 'nuget';
  name: string;
  version: string;
  declaredField: string | undefined;
  copyright: string | undefined;
  validationErrors: string[];
  assemblies: string[];
  rids: string[];
  /**
   * False where nothing of this package was read from disk - an `alwaysList` entry no restore on
   * this machine resolves. Not the same as having read the folder and found no copyright notice,
   * which is the distinction `render.ts` draws in the document.
   */
  inspected?: boolean;
  /** The package's own license files, read from the restored package folder. */
  licenseFiles?: NamedText[];
  /** Any NOTICE files beside them - what the document's NOTICE section is written from. */
  notices?: NamedText[];
};
