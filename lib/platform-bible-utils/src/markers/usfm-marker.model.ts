/**
 * Generated types using `nx generate markers-data` with
 * 'https://raw.githubusercontent.com/ubsicap/usfm/refs/heads/master/sty/usfm.sty'
 */

/** Enumerator containing the marker category types possible for a given marker */
export enum MarkerCategoryType {
  FileIdentification = 'FileIdentification',
  Headers = 'Headers',
  Remarks = 'Remarks',
  Introduction = 'Introduction',
  DivisionMarks = 'DivisionMarks',
  Paragraphs = 'Paragraphs',
  Poetry = 'Poetry',
  TitlesHeadings = 'TitlesHeadings',
  Tables = 'Tables',
  CenterTables = 'CenterTables',
  RightTables = 'RightTables',
  Lists = 'Lists',
  Footnotes = 'Footnotes',
  CrossReferences = 'CrossReferences',
  SpecialText = 'SpecialText',
  CharacterStyling = 'CharacterStyling',
  Breaks = 'Breaks',
  SpecialFeatures = 'SpecialFeatures',
  PeripheralReferences = 'PeripheralReferences',
  PeripheralMaterials = 'PeripheralMaterials',
  Uncategorized = 'Uncategorized',
}

/** Enumerator containing the marker types possible for a given marker */
export enum MarkerType {
  Paragraph = 'Paragraph',
  Character = 'Character',
  Note = 'Note',
  Unknown = 'Unknown',
}

/** Interface describing the form of a given marker */
export interface Marker {
  category: MarkerCategoryType;
  type: MarkerType;
  description: `%${string}%`;
  hasEndMarker: boolean;
  children?: Partial<{ [K in MarkerCategoryType]: string[] }>;
}
