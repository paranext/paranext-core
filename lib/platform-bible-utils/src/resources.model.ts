export type ResourceType =
  | 'ScriptureResource'
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
