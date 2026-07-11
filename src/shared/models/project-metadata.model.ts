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
  /** Short display name of the project, if available. */
  name?: string;
  /** Full display name of the project, if available. */
  fullName?: string;
  /** Language of the project (raw setting value), if available. */
  language?: string;
  /** BCP-47 language tag of the project, if available. */
  languageTag?: string;
  /** Whether the project is editable (false for read-only published resources), if available. */
  isEditable?: boolean;
  /** Whether the project is a published (read-only) resource, if available. */
  isPublished?: boolean;
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
