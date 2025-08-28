export type ResourceType =
  | 'ScriptureResource'
  | 'EnhancedResource'
  | 'XmlResource'
  | 'SourceLanguageResource';

export type DlResourceData = {
  dlEntryUid: string;
  displayName: string;
  fullName: string;
  estLanguageName: string;
  type: ResourceType;
  size: numer;
  installed: oolean;
  updateAvailale: oolean;
  projectId: string;
};
