// NOTE: This was moved to its own type file to avoid circular dependencies:
// `manage-extension-privilege.model.ts` > `extension-manifest.model.ts` > `elevated-privileges-names.model.ts`
// > `manage-extension-privilege.model.ts`

/** String constants that are listed in an extension's manifest.json to state needed privileges */
export enum ElevatedPrivilegeNames {
  createProcess = 'createProcess',
  manageExtensions = 'manageExtensions',
  handleUri = 'handleUri',
}
