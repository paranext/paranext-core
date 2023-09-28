export type ProjectMetadata = {
  /**
   * ID of the project (must be unique and case insensitive)
   */
  id: string;
  /**
   * Short name of the project (not necessarily unique)
   */
  name: string;
  /**
   * Indicates how the project is persisted to storage
   */
  storageType: string;
  /**
   * Indicates what sort of project this is which implies its data shape (e.g., what data streams should be available)
   */
  projectType: string;
};
