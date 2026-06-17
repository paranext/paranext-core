import { ProjectInterfaces } from 'papi-shared-types';

/**
 * Low-level information describing a project that Platform.Bible directly manages and uses to load
 * project data
 *
 * Returned from Project Data Provider Factories in order to inform others about what projects they
 * support in what form. Layered over to create {@link ProjectMetadata}
 */
export type ProjectMetadataWithoutFactoryInfo = {
  /** ID of the project (must be unique and case insensitive) */
  id: string;
  /**
   * All `projectInterface`s (aka standardized sets of methods on a PDP) that Project Data Providers
   * for this project support. Indicates what sort of project data should be available on this
   * project.
   */
  projectInterfaces: ProjectInterfaces[];
  /**
   * Opt-in batch of project setting values, populated only when project metadata is requested with
   * {@link ProjectMetadataFilterOptions.includeSettings}. Lets consumers read common settings (e.g.
   * `platform.name`, `platform.fullName`, `platform.language`, `platform.isPublished`) directly off
   * the project list in a single cross-process request rather than fanning out a per-project
   * `getSetting` call per setting (which scales linearly with project count).
   *
   * Keyed by setting name. This is **best-effort**: a Project Data Provider Factory that does not
   * support the hint returns no snapshot, and a requested setting key may be absent — in both cases
   * consumers should fall back to `getSetting` for that setting. Values match what the
   * corresponding `getSetting` returns for a set value; unset values may come back empty, so apply
   * the same missing-value fallback you would for `getSetting`.
   *
   * @experimental This field is experimental and may change or be removed.
   */
  settingsSnapshot?: { [settingName: string]: unknown };
};

export type ProjectDataProviderFactoryMetadataInfo = {
  /**
   * Which `projectInterface`s (aka standardized sets of methods on a PDP) the Project Data Provider
   * for this project created by this Project Data Provider Factory supports. Indicates what sort of
   * project data should be available on this project from this PDP Factory.
   */
  projectInterfaces: ProjectInterfaces[];
};

/**
 * Low-level information describing a project that Platform.Bible directly manages and uses to load
 * project data
 *
 * `papi.projectLookup` retrieves, aggregates, and augments
 * {@link ProjectMetadataWithoutFactoryInfo}s from Project Data Provider Factories to create these in
 * order to inform others about what projects are available and in what forms. This metadata may be
 * merged from metadata provided by multiple PDPFs.
 */
export type ProjectMetadata = ProjectMetadataWithoutFactoryInfo & {
  /**
   * Specifics regarding which Project Data Provider Factories provide which `projectInterface`s.
   * This is additional metadata in addition to the `projectInterfaces` property that may be useful
   * in a few specific situations. All `projectInterfaces` contained in this data are already listed
   * in `projectInterfaces`, so you can use that unless you have a specific need to use this extra
   * information.
   *
   * The keys of this object are ids of the PDP Factories that provide the metadata, namely the
   * `projectInterface`s for this project (meaning this PDPF can provide a Project Data Provider for
   * this project with these `projectInterfaces`)
   */
  pdpFactoryInfo: { [pdpFactoryId: string]: ProjectDataProviderFactoryMetadataInfo | undefined };
};
