import React, { useCallback, useMemo, useReducer, useState } from 'react';
import { WebViewProps } from '@papi/core';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  cn,
} from 'platform-bible-react';
import { ExternalLink } from 'lucide-react';

// Import sub-components
import {
  RegistrationSelectionControl,
  ProjectType as RegistrationProjectType,
  ProjectReference as RegistrationProjectReference,
  RegistrationInfo,
} from './components/registration-selection.component';
import { BookChooserControl } from './components/book-chooser.component';
import { NoteTagsEditor, NoteTag as NoteTagItem } from './components/note-tags-editor.component';
import {
  StudyBibleCategoriesEditor,
  StudyBibleCategory,
} from './components/study-bible-categories-editor.component';
import {
  FormValidationRibbon,
  FormValidationError,
  useFormValidation,
} from './components/form-validation.component';
import { ProjectNameForm, ProjectNameFormResult } from './components/project-name-form.component';
import {
  LanguageSelectionForm,
  LanguageSelectionResult,
  LanguageInfo,
  ScriptOption,
  RegionOption,
} from './components/language-selection-form.component';
import { ChooseEncodingForm, EncodingInfo } from './components/choose-encoding-form.component';

// =====================================================
// TYPE DEFINITIONS
// =====================================================

/** Project type classification */
type ProjectType =
  | 'NotSelected'
  | 'Standard'
  | 'BackTranslation'
  | 'Daughter'
  | 'TransliterationManual'
  | 'TransliterationWithEncoder'
  | 'StudyBibleAdditions'
  | 'Auxiliary'
  | 'ConsultantNotes';

/** Versification scheme */
type VersificationType =
  | 'Original'
  | 'Septuagint'
  | 'Vulgate'
  | 'English'
  | 'RussianOrthodox'
  | 'RussianProtestant';

/** Normalization form */
type NormalizationForm = 'NFC' | 'NFD' | 'Undefined';

/** FLEx integration type */
type FlexUsageType = 'ParatextLexicon' | 'LexicalProject' | 'Both';

/** Note tag for internal state */
interface NoteTag {
  id: string;
  icon: string;
  name: string;
  creatorCanResolve: boolean;
  template: string;
}

/** Project reference for base project dropdown */
interface ProjectReference {
  guid: string;
  shortName: string;
  fullName: string;
  versification: VersificationType;
  projectType: ProjectType;
  isScripture: boolean;
  isResource: boolean;
  isRegistered: boolean;
}

/** Which sub-dialog is open */
type OpenDialog = 'projectName' | 'languageSelection' | 'chooseEncoding' | undefined;

// =====================================================
// TYPE GUARDS
// =====================================================

const PROJECT_TYPES: ProjectType[] = [
  'NotSelected',
  'Standard',
  'BackTranslation',
  'Daughter',
  'TransliterationManual',
  'TransliterationWithEncoder',
  'StudyBibleAdditions',
  'Auxiliary',
  'ConsultantNotes',
];

const VERSIFICATION_TYPES: VersificationType[] = [
  'Original',
  'Septuagint',
  'Vulgate',
  'English',
  'RussianOrthodox',
  'RussianProtestant',
];

const FLEX_USAGE_TYPES: FlexUsageType[] = ['ParatextLexicon', 'LexicalProject', 'Both'];

const NORMALIZATION_FORMS: NormalizationForm[] = ['NFC', 'NFD', 'Undefined'];

function isProjectType(value: string): value is ProjectType {
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (PROJECT_TYPES as readonly string[]).includes(value);
}

function isVersificationType(value: string): value is VersificationType {
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (VERSIFICATION_TYPES as readonly string[]).includes(value);
}

function isFlexUsageType(value: string): value is FlexUsageType {
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (FLEX_USAGE_TYPES as readonly string[]).includes(value);
}

function isNormalizationForm(value: string): value is NormalizationForm {
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return (NORMALIZATION_FORMS as readonly string[]).includes(value);
}

// =====================================================
// FORM STATE
// =====================================================

interface ProjectPropertiesFormState {
  // Mode
  mode: 'new' | 'edit';
  projectId?: string;

  // Tab state
  activeTab: string;

  // General Tab - Project Name
  fullName: string;
  shortName: string;
  copyright: string;

  // General Tab - Language
  languageId: string;
  languageName: string;

  // General Tab - Versification
  versification: VersificationType;
  hasCustomVersification: boolean;

  // General Tab - Project Type
  projectType: ProjectType;

  // General Tab - Base Project
  baseProjectGuid: string | undefined;
  baseProjectName: string | undefined;
  availableBaseProjects: ProjectReference[];

  // General Tab - Registration
  registrationInfo: RegistrationInfo | undefined;
  allowDerivedProjectRegistration: boolean;

  // General Tab - Transliteration
  encodingConverter: string | undefined;
  encoderReverseDirection: boolean;

  // General Tab - Info
  minParatextVersion: string;

  // Books Tab
  plannedBooks: string[];

  // Associations Tab
  associatedLexicalProject: string | undefined;
  flexIntegration: FlexUsageType;
  biblicalTermsList: string;
  matchBasedOnStems: boolean;

  // Notes Tab
  noteTags: NoteTag[];

  // Advanced Tab
  fileNamePrePart: string;
  fileNameForm: string;
  fileNamePostPart: string;
  stylesheetName: string;
  hasCustomStylesheet: boolean;
  encoding: EncodingInfo;
  normalizationForm: NormalizationForm;
  usfmVersion: 2 | 3;
  editable: boolean;
  allowInvisibleChars: boolean;
  allowReadAccess: boolean;
  allowSharingWithSLDR: boolean;

  // Study Bible Tab
  allowHidingOfBaseFootnotes: boolean;
  placeCallerToLeftOfSelection: boolean;
  categories: StudyBibleCategory[];

  // Validation
  validationErrors: FormValidationError[];
  dirtyFields: Set<string>;
}

// =====================================================
// STATE ACTIONS
// =====================================================

type FormAction =
  | { type: 'SET_FULL_NAME'; payload: string }
  | { type: 'SET_SHORT_NAME'; payload: string }
  | { type: 'SET_COPYRIGHT'; payload: string }
  | { type: 'SET_PROJECT_NAME_RESULT'; payload: ProjectNameFormResult }
  | { type: 'SET_LANGUAGE'; payload: { languageId: string; languageName: string } }
  | { type: 'SET_VERSIFICATION'; payload: VersificationType }
  | { type: 'SET_PROJECT_TYPE'; payload: ProjectType }
  | { type: 'SET_BASE_PROJECT'; payload: { guid: string | undefined; name: string | undefined } }
  | { type: 'SET_ALLOW_DERIVED_REGISTRATION'; payload: boolean }
  | { type: 'SET_ENCODING_CONVERTER'; payload: string | undefined }
  | { type: 'SET_ENCODER_REVERSE'; payload: boolean }
  | { type: 'SET_PLANNED_BOOKS'; payload: string[] }
  | { type: 'SET_ASSOCIATED_LEXICAL_PROJECT'; payload: string | undefined }
  | { type: 'SET_FLEX_INTEGRATION'; payload: FlexUsageType }
  | { type: 'SET_BIBLICAL_TERMS_LIST'; payload: string }
  | { type: 'SET_MATCH_BASED_ON_STEMS'; payload: boolean }
  | { type: 'SET_NOTE_TAGS'; payload: NoteTag[] }
  | { type: 'SET_NORMALIZATION_FORM'; payload: NormalizationForm }
  | { type: 'SET_USFM_VERSION'; payload: 2 | 3 }
  | { type: 'SET_EDITABLE'; payload: boolean }
  | { type: 'SET_ALLOW_INVISIBLE_CHARS'; payload: boolean }
  | { type: 'SET_ALLOW_READ_ACCESS'; payload: boolean }
  | { type: 'SET_ALLOW_SHARING_SLDR'; payload: boolean }
  | { type: 'SET_ENCODING'; payload: EncodingInfo }
  | { type: 'SET_ALLOW_HIDING_FOOTNOTES'; payload: boolean }
  | { type: 'SET_CALLERS_LEFT'; payload: boolean }
  | { type: 'SET_CATEGORIES'; payload: StudyBibleCategory[] }
  | { type: 'SET_ACTIVE_TAB'; payload: string }
  | { type: 'SET_VALIDATION_ERRORS'; payload: FormValidationError[] }
  | { type: 'MARK_FIELD_DIRTY'; payload: string };

// =====================================================
// HELPER FUNCTIONS
// =====================================================

/** Project types that require a base project */
const DERIVED_TYPES: ProjectType[] = [
  'BackTranslation',
  'Daughter',
  'Auxiliary',
  'StudyBibleAdditions',
  'TransliterationManual',
  'TransliterationWithEncoder',
];

/** Check if project type is derived */
function isDerivedType(type: ProjectType): boolean {
  return DERIVED_TYPES.includes(type);
}

/** Check if project type is a resource type */
function isResourceType(type: ProjectType): boolean {
  return type === 'ConsultantNotes';
}

/** Check if project type shows encoding fields */
function showsEncodingFields(type: ProjectType): boolean {
  return type === 'TransliterationWithEncoder';
}

/** Get typical filename from parts */
function getTypicalFileName(prePart: string, form: string, postPart: string): string {
  // Example: "41" + "MAT" + "PRJ" + ".SFM" -> "41MATPRJ.SFM"
  return `${prePart}${form}${postPart}.SFM`;
}

/** Filter base projects by type rules (BHV-028) */
function filterBaseProjects(
  projects: ProjectReference[],
  projectType: ProjectType,
  currentProjectGuid?: string,
): ProjectReference[] {
  return projects.filter((project) => {
    // Cannot select self
    if (currentProjectGuid && project.guid === currentProjectGuid) {
      return false;
    }

    // Study Bible Additions cannot use resource as base
    if (projectType === 'StudyBibleAdditions' && project.isResource) {
      return false;
    }

    // Auxiliary requires Standard type
    if (projectType === 'Auxiliary' && project.projectType !== 'Standard') {
      return false;
    }

    // BackTranslation, Daughter need Scripture projects
    if (['BackTranslation', 'Daughter'].includes(projectType) && !project.isScripture) {
      return false;
    }

    return true;
  });
}

/** Validate form state and return errors (BHV-033) */
function validateForm(state: ProjectPropertiesFormState): FormValidationError[] {
  const errors: FormValidationError[] = [];

  // VAL-021: Full name required
  if (!state.fullName.trim()) {
    errors.push({
      field: 'fullName',
      code: 'VAL-021',
      message: 'Full name is required.',
    });
  }

  // VAL-001 to VAL-004: Short name validation
  if (state.shortName.length < 3 || state.shortName.length > 8) {
    errors.push({
      field: 'shortName',
      code: 'VAL-001',
      message: 'Short name must be 3-8 characters.',
    });
  }

  // VAL-002: Short name valid characters
  if (!/^[A-Za-z0-9]+$/.test(state.shortName)) {
    errors.push({
      field: 'shortName',
      code: 'VAL-002',
      message: 'Short name can only contain letters and numbers.',
    });
  }

  // VAL-006: Language required
  if (!state.languageId) {
    errors.push({
      field: 'languageId',
      code: 'VAL-006',
      message: 'Language is required.',
    });
  }

  // VAL-015: Project type required
  if (state.projectType === 'NotSelected') {
    errors.push({
      field: 'projectType',
      code: 'VAL-015',
      message: 'Project type must be selected.',
    });
  }

  // VAL-017: Base project required for derived types
  if (isDerivedType(state.projectType) && !state.baseProjectGuid) {
    errors.push({
      field: 'baseProjectGuid',
      code: 'VAL-017',
      message: 'Base project is required for this project type.',
    });
  }

  // VAL-016: Encoding converter required for TransliterationWithEncoder
  if (state.projectType === 'TransliterationWithEncoder' && !state.encodingConverter) {
    errors.push({
      field: 'encodingConverter',
      code: 'VAL-016',
      message: 'SIL Encoding Converter is required for transliteration projects.',
    });
  }

  return errors;
}

// =====================================================
// STATE REDUCER
// =====================================================

function formReducer(
  state: ProjectPropertiesFormState,
  action: FormAction,
): ProjectPropertiesFormState {
  switch (action.type) {
    case 'SET_FULL_NAME':
      return { ...state, fullName: action.payload };

    case 'SET_SHORT_NAME':
      return { ...state, shortName: action.payload };

    case 'SET_COPYRIGHT':
      return { ...state, copyright: action.payload };

    case 'SET_PROJECT_NAME_RESULT':
      return {
        ...state,
        fullName: action.payload.fullName,
        shortName: action.payload.shortName,
        copyright: action.payload.copyright,
      };

    case 'SET_LANGUAGE':
      return {
        ...state,
        languageId: action.payload.languageId,
        languageName: action.payload.languageName,
      };

    case 'SET_VERSIFICATION':
      return { ...state, versification: action.payload };

    case 'SET_PROJECT_TYPE': {
      const newType = action.payload;
      // BHV-027: Project type cascade
      return {
        ...state,
        projectType: newType,
        // Clear base project if switching to non-derived type
        baseProjectGuid: isDerivedType(newType) ? state.baseProjectGuid : undefined,
        baseProjectName: isDerivedType(newType) ? state.baseProjectName : undefined,
        // Set editable default based on type
        editable: newType !== 'ConsultantNotes',
      };
    }

    case 'SET_BASE_PROJECT':
      return {
        ...state,
        baseProjectGuid: action.payload.guid,
        baseProjectName: action.payload.name,
      };

    case 'SET_ALLOW_DERIVED_REGISTRATION':
      return { ...state, allowDerivedProjectRegistration: action.payload };

    case 'SET_ENCODING_CONVERTER':
      return { ...state, encodingConverter: action.payload };

    case 'SET_ENCODER_REVERSE':
      return { ...state, encoderReverseDirection: action.payload };

    case 'SET_PLANNED_BOOKS':
      return { ...state, plannedBooks: action.payload };

    case 'SET_ASSOCIATED_LEXICAL_PROJECT':
      return { ...state, associatedLexicalProject: action.payload };

    case 'SET_FLEX_INTEGRATION':
      return { ...state, flexIntegration: action.payload };

    case 'SET_BIBLICAL_TERMS_LIST':
      return { ...state, biblicalTermsList: action.payload };

    case 'SET_MATCH_BASED_ON_STEMS':
      return { ...state, matchBasedOnStems: action.payload };

    case 'SET_NOTE_TAGS':
      return { ...state, noteTags: action.payload };

    case 'SET_NORMALIZATION_FORM':
      return { ...state, normalizationForm: action.payload };

    case 'SET_USFM_VERSION':
      return { ...state, usfmVersion: action.payload };

    case 'SET_EDITABLE':
      return { ...state, editable: action.payload };

    case 'SET_ALLOW_INVISIBLE_CHARS':
      return { ...state, allowInvisibleChars: action.payload };

    case 'SET_ALLOW_READ_ACCESS':
      return { ...state, allowReadAccess: action.payload };

    case 'SET_ALLOW_SHARING_SLDR':
      return { ...state, allowSharingWithSLDR: action.payload };

    case 'SET_ENCODING':
      return { ...state, encoding: action.payload };

    case 'SET_ALLOW_HIDING_FOOTNOTES':
      return { ...state, allowHidingOfBaseFootnotes: action.payload };

    case 'SET_CALLERS_LEFT':
      return { ...state, placeCallerToLeftOfSelection: action.payload };

    case 'SET_CATEGORIES':
      return { ...state, categories: action.payload };

    case 'SET_ACTIVE_TAB':
      return { ...state, activeTab: action.payload };

    case 'SET_VALIDATION_ERRORS':
      return { ...state, validationErrors: action.payload };

    case 'MARK_FIELD_DIRTY':
      return {
        ...state,
        dirtyFields: new Set([...state.dirtyFields, action.payload]),
      };

    default:
      return state;
  }
}

// =====================================================
// INITIAL STATE
// =====================================================

function getInitialState(mode: 'new' | 'edit', projectId?: string): ProjectPropertiesFormState {
  // BHV-034: Default values for new project
  return {
    mode,
    projectId,
    activeTab: 'general',

    // General Tab - Project Name
    fullName: '',
    shortName: '',
    copyright: '',

    // General Tab - Language
    languageId: '',
    languageName: '',

    // General Tab - Versification
    versification: 'English',
    hasCustomVersification: false,

    // General Tab - Project Type
    projectType: 'NotSelected',

    // General Tab - Base Project
    baseProjectGuid: undefined,
    baseProjectName: undefined,
    availableBaseProjects: [],

    // General Tab - Registration
    registrationInfo: undefined,
    allowDerivedProjectRegistration: false,

    // General Tab - Transliteration
    encodingConverter: undefined,
    encoderReverseDirection: false,

    // General Tab - Info
    minParatextVersion: '9.0',

    // Books Tab
    plannedBooks: [],

    // Associations Tab
    associatedLexicalProject: undefined,
    flexIntegration: 'ParatextLexicon',
    biblicalTermsList: 'Major Biblical Terms (3.0)',
    matchBasedOnStems: false,

    // Notes Tab - Default "To do" tag
    noteTags: [
      {
        id: 'default-todo',
        icon: 'flag',
        name: 'To do',
        creatorCanResolve: true,
        template: '',
      },
    ],

    // Advanced Tab
    fileNamePrePart: '',
    fileNameForm: 'BK',
    fileNamePostPart: 'PRJ',
    stylesheetName: 'usfm.sty',
    hasCustomStylesheet: false,
    encoding: { codePage: 65001, name: 'UTF-8', displayName: 'Unicode (UTF-8)' },
    normalizationForm: 'NFC',
    usfmVersion: 3,
    editable: true,
    allowInvisibleChars: false,
    allowReadAccess: false,
    allowSharingWithSLDR: false,

    // Study Bible Tab
    allowHidingOfBaseFootnotes: false,
    placeCallerToLeftOfSelection: false,
    categories: [],

    // Validation
    validationErrors: [],
    dirtyFields: new Set(),
  };
}

// =====================================================
// PROJECT TYPE OPTIONS
// =====================================================

const PROJECT_TYPE_OPTIONS: Array<{ value: ProjectType; label: string }> = [
  { value: 'NotSelected', label: '(Not selected)' },
  { value: 'Standard', label: 'Standard Translation' },
  { value: 'BackTranslation', label: 'Back Translation' },
  { value: 'Daughter', label: 'Daughter Translation' },
  { value: 'TransliterationManual', label: 'Transliteration (Manual)' },
  { value: 'TransliterationWithEncoder', label: 'Transliteration (using Encoding Converter)' },
  { value: 'StudyBibleAdditions', label: 'Study Bible Additions' },
  { value: 'Auxiliary', label: 'Auxiliary' },
  { value: 'ConsultantNotes', label: 'Consultant Notes' },
];

const VERSIFICATION_OPTIONS: Array<{ value: VersificationType; label: string }> = [
  { value: 'Original', label: 'Original' },
  { value: 'Septuagint', label: 'Septuagint' },
  { value: 'Vulgate', label: 'Vulgate' },
  { value: 'English', label: 'English' },
  { value: 'RussianOrthodox', label: 'Russian Orthodox' },
  { value: 'RussianProtestant', label: 'Russian Protestant' },
];

const FLEX_USAGE_OPTIONS: Array<{ value: FlexUsageType; label: string }> = [
  { value: 'ParatextLexicon', label: 'Paratext Lexicon' },
  { value: 'LexicalProject', label: 'Lexical Project' },
  { value: 'Both', label: 'Both' },
];

const NORMALIZATION_OPTIONS: Array<{ value: NormalizationForm; label: string }> = [
  { value: 'NFC', label: 'Composed characters (NFC)' },
  { value: 'NFD', label: 'Decomposed characters (NFD)' },
  { value: 'Undefined', label: 'Off' },
];

/** Default language list for LanguageSelectionForm - would come from backend in production */
const DEFAULT_LANGUAGES: LanguageInfo[] = [
  { code: 'eng', name: 'English', altNames: [], scripts: ['Latn'], regions: ['US', 'GB'] },
  { code: 'fra', name: 'French', altNames: ['Francais'], scripts: ['Latn'], regions: ['FR', 'CA'] },
  { code: 'deu', name: 'German', altNames: ['Deutsch'], scripts: ['Latn'], regions: ['DE', 'AT'] },
  { code: 'spa', name: 'Spanish', altNames: ['Espanol'], scripts: ['Latn'], regions: ['ES', 'MX'] },
  { code: 'por', name: 'Portuguese', altNames: [], scripts: ['Latn'], regions: ['PT', 'BR'] },
  { code: 'rus', name: 'Russian', altNames: [], scripts: ['Cyrl'], regions: ['RU'] },
  { code: 'zho', name: 'Chinese', altNames: [], scripts: ['Hans', 'Hant'], regions: ['CN', 'TW'] },
  { code: 'ara', name: 'Arabic', altNames: [], scripts: ['Arab'], regions: ['SA', 'EG'] },
  { code: 'hin', name: 'Hindi', altNames: [], scripts: ['Deva'], regions: ['IN'] },
];

/** Default script options for LanguageSelectionForm */
const DEFAULT_SCRIPTS: ScriptOption[] = [
  { code: 'Latn', name: 'Latin' },
  { code: 'Cyrl', name: 'Cyrillic' },
  { code: 'Arab', name: 'Arabic' },
  { code: 'Deva', name: 'Devanagari' },
  { code: 'Hans', name: 'Simplified Chinese' },
  { code: 'Hant', name: 'Traditional Chinese' },
  { code: 'Grek', name: 'Greek' },
  { code: 'Hebr', name: 'Hebrew' },
];

/** Default region options for LanguageSelectionForm */
const DEFAULT_REGIONS: RegionOption[] = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'ES', name: 'Spain' },
  { code: 'MX', name: 'Mexico' },
  { code: 'BR', name: 'Brazil' },
  { code: 'RU', name: 'Russia' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
];

// =====================================================
// TAB COMPONENTS
// =====================================================

interface GeneralTabProps {
  state: ProjectPropertiesFormState;
  dispatch: React.Dispatch<FormAction>;
  onOpenProjectNameDialog: () => void;
  onOpenLanguageDialog: (isNew: boolean) => void;
  filteredBaseProjects: ProjectReference[];
  registerFieldRef: (fieldId: string, element: HTMLElement | undefined) => void;
  getFieldError: (
    fieldId: string,
    errors: FormValidationError[],
  ) => FormValidationError | undefined;
}

function GeneralTab({
  state,
  dispatch,
  onOpenProjectNameDialog,
  onOpenLanguageDialog,
  filteredBaseProjects,
  registerFieldRef,
  getFieldError,
}: GeneralTabProps) {
  const showBasedOn = isDerivedType(state.projectType);
  const showEncodingFields = showsEncodingFields(state.projectType);

  const handleProjectTypeChange = (value: string) => {
    if (isProjectType(value)) {
      dispatch({ type: 'SET_PROJECT_TYPE', payload: value });
    }
  };

  const handleVersificationChange = (value: string) => {
    if (isVersificationType(value)) {
      dispatch({ type: 'SET_VERSIFICATION', payload: value });
    }
  };

  const handleBaseProjectChange = (value: string) => {
    const project = filteredBaseProjects.find((p) => p.guid === value);
    dispatch({
      type: 'SET_BASE_PROJECT',
      payload: { guid: value, name: project?.fullName },
    });
  };

  const fullNameError = getFieldError('fullName', state.validationErrors);
  const shortNameError = getFieldError('shortName', state.validationErrors);
  const languageError = getFieldError('languageId', state.validationErrors);
  const projectTypeError = getFieldError('projectType', state.validationErrors);
  const baseProjectError = getFieldError('baseProjectGuid', state.validationErrors);

  // Convert to registration component types
  const registrationBaseProject: RegistrationProjectReference | undefined = state.baseProjectGuid
    ? {
        guid: state.baseProjectGuid,
        shortName: state.baseProjectName || '',
        fullName: state.baseProjectName || '',
        isRegistered:
          filteredBaseProjects.find((p) => p.guid === state.baseProjectGuid)?.isRegistered || false,
      }
    : undefined;

  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-p-4">
      {/* Project Name Group */}
      <Card>
        <CardContent className="tw-pt-4">
          <h3 className="tw-font-semibold tw-mb-4">Project Name</h3>
          <div className="tw-flex tw-flex-col tw-gap-3">
            {/* Full Name */}
            <div className="tw-flex tw-items-center tw-gap-2">
              <Label htmlFor="full-name" className="tw-w-24 tw-shrink-0">
                Full Name:
              </Label>
              <div
                className="tw-flex-1"
                ref={(el) => registerFieldRef('fullName', el?.querySelector('input') || undefined)}
              >
                <Input
                  id="full-name"
                  value={state.fullName}
                  readOnly
                  className={cn(fullNameError && 'tw-border-destructive')}
                />
                {fullNameError && (
                  <p className="tw-text-xs tw-text-destructive tw-mt-1">{fullNameError.message}</p>
                )}
              </div>
              <Button variant="outline" size="sm" onClick={onOpenProjectNameDialog}>
                Edit
              </Button>
            </div>

            {/* Short Name */}
            <div className="tw-flex tw-items-center tw-gap-2">
              <Label htmlFor="short-name" className="tw-w-24 tw-shrink-0">
                Short Name:
              </Label>
              <div
                className="tw-flex-1"
                ref={(el) => registerFieldRef('shortName', el?.querySelector('input') || undefined)}
              >
                <Input
                  id="short-name"
                  value={state.shortName}
                  readOnly
                  className={cn('tw-max-w-32', shortNameError && 'tw-border-destructive')}
                />
                {shortNameError && (
                  <p className="tw-text-xs tw-text-destructive tw-mt-1">{shortNameError.message}</p>
                )}
              </div>
              {state.mode === 'edit' && (
                <span className="tw-text-sm tw-text-muted-foreground">
                  (read-only after creation)
                </span>
              )}
            </div>

            {/* Copyright */}
            <div className="tw-flex tw-items-center tw-gap-2">
              <Label htmlFor="copyright" className="tw-w-24 tw-shrink-0">
                Copyright:
              </Label>
              <Input id="copyright" value={state.copyright} readOnly className="tw-flex-1" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Language Group */}
      <Card>
        <CardContent className="tw-pt-4">
          <h3 className="tw-font-semibold tw-mb-4">Language</h3>
          <div className="tw-flex tw-items-center tw-gap-2">
            <Label htmlFor="language" className="tw-w-24 tw-shrink-0">
              Language:
            </Label>
            <div
              className="tw-flex-1"
              ref={(el) => registerFieldRef('languageId', el?.querySelector('input') || undefined)}
            >
              <Input
                id="language"
                value={state.languageName || state.languageId || '(not selected)'}
                readOnly
                className={cn(languageError && 'tw-border-destructive')}
              />
              {languageError && (
                <p className="tw-text-xs tw-text-destructive tw-mt-1">{languageError.message}</p>
              )}
            </div>
            <Button variant="outline" size="sm" onClick={() => onOpenLanguageDialog(false)}>
              Edit
            </Button>
            <Button variant="outline" size="sm" onClick={() => onOpenLanguageDialog(true)}>
              New
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Versification */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Label htmlFor="versification" className="tw-w-24 tw-shrink-0">
          Versification:
        </Label>
        <Select
          value={state.versification}
          onValueChange={handleVersificationChange}
          disabled={isDerivedType(state.projectType)}
        >
          <SelectTrigger id="versification" className="tw-w-64">
            <SelectValue placeholder="Select versification..." />
          </SelectTrigger>
          <SelectContent>
            {VERSIFICATION_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.hasCustomVersification && (
          <span className="tw-text-sm tw-text-muted-foreground">(Customized)</span>
        )}
      </div>

      {/* Project Type */}
      <div
        className="tw-flex tw-items-center tw-gap-2"
        ref={(el) => registerFieldRef('projectType', el?.querySelector('button') || undefined)}
      >
        <Label htmlFor="project-type" className="tw-w-24 tw-shrink-0">
          Type of Project:
        </Label>
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Select value={state.projectType} onValueChange={handleProjectTypeChange}>
            <SelectTrigger
              id="project-type"
              className={cn('tw-w-80', projectTypeError && 'tw-border-destructive')}
            >
              <SelectValue placeholder="Select project type..." />
            </SelectTrigger>
            <SelectContent>
              {PROJECT_TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {projectTypeError && (
            <p className="tw-text-xs tw-text-destructive">{projectTypeError.message}</p>
          )}
        </div>
      </div>

      {/* Based On (conditional) */}
      {showBasedOn && (
        <div
          className="tw-flex tw-items-center tw-gap-2"
          ref={(el) =>
            registerFieldRef('baseProjectGuid', el?.querySelector('button') || undefined)
          }
        >
          <Label htmlFor="based-on" className="tw-w-24 tw-shrink-0">
            Based on:
          </Label>
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Select value={state.baseProjectGuid || ''} onValueChange={handleBaseProjectChange}>
              <SelectTrigger
                id="based-on"
                className={cn('tw-w-80', baseProjectError && 'tw-border-destructive')}
              >
                <SelectValue placeholder="Select base project..." />
              </SelectTrigger>
              <SelectContent>
                {filteredBaseProjects.map((project) => (
                  <SelectItem key={project.guid} value={project.guid}>
                    {project.fullName} ({project.shortName})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {baseProjectError && (
              <p className="tw-text-xs tw-text-destructive">{baseProjectError.message}</p>
            )}
          </div>
          {state.baseProjectName && (
            <Button variant="link" size="sm" className="tw-gap-1">
              Open {state.baseProjectName}
              <ExternalLink className="tw-h-3 tw-w-3" />
            </Button>
          )}
        </div>
      )}

      {/* Registration */}
      <Card>
        <CardContent className="tw-pt-4">
          <h3 className="tw-font-semibold tw-mb-4">Registration</h3>
          <RegistrationSelectionControl
            // eslint-disable-next-line no-type-assertion/no-type-assertion
            projectType={state.projectType as RegistrationProjectType}
            baseProject={registrationBaseProject}
            isNewProject={state.mode === 'new'}
            projectGuid={state.projectId}
            currentRegistration={state.registrationInfo || undefined}
            registryServerAvailable
            internetAvailable
          />
          {/* Optional: Register derived project separately */}
          {isDerivedType(state.projectType) && registrationBaseProject?.isRegistered && (
            <div className="tw-flex tw-items-center tw-gap-2 tw-mt-3">
              <Checkbox
                id="allow-derived-reg"
                checked={state.allowDerivedProjectRegistration}
                onCheckedChange={(checked) =>
                  dispatch({ type: 'SET_ALLOW_DERIVED_REGISTRATION', payload: checked === true })
                }
              />
              <Label htmlFor="allow-derived-reg" className="tw-font-normal">
                Register this derived project separately
              </Label>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transliteration Encoding (conditional) */}
      {showEncodingFields && (
        <div className="tw-flex tw-flex-col tw-gap-3">
          <div className="tw-flex tw-items-center tw-gap-2">
            <Label htmlFor="sil-encoding" className="tw-w-24 tw-shrink-0">
              SIL Encoding:
            </Label>
            <Select
              value={state.encodingConverter || ''}
              onValueChange={(v) => dispatch({ type: 'SET_ENCODING_CONVERTER', payload: v })}
            >
              <SelectTrigger id="sil-encoding" className="tw-w-64">
                <SelectValue placeholder="Select encoding converter..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="converter1">SIL Converters - Example 1</SelectItem>
                <SelectItem value="converter2">SIL Converters - Example 2</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="tw-flex tw-items-center tw-gap-2 tw-ml-24">
            <Checkbox
              id="encoder-reverse"
              checked={state.encoderReverseDirection}
              onCheckedChange={(checked) =>
                dispatch({ type: 'SET_ENCODER_REVERSE', payload: checked === true })
              }
            />
            <Label htmlFor="encoder-reverse" className="tw-font-normal">
              Apply encoding converter in reverse direction
            </Label>
          </div>
        </div>
      )}

      {/* Minimum Version Info */}
      <div className="tw-text-sm tw-text-muted-foreground">
        Minimum Paratext Version: {state.minParatextVersion}
      </div>
    </div>
  );
}

interface BooksTabProps {
  state: ProjectPropertiesFormState;
  dispatch: React.Dispatch<FormAction>;
}

function BooksTab({ state, dispatch }: BooksTabProps) {
  // ConsultantNotes don't need books
  if (state.projectType === 'ConsultantNotes') {
    return (
      <div className="tw-p-4 tw-text-center tw-text-muted-foreground">
        Books are not needed for this type of project.
      </div>
    );
  }

  return (
    <div className="tw-p-4">
      <Label className="tw-block tw-mb-4">Select the books planned for this project:</Label>
      <BookChooserControl
        selectedBooks={state.plannedBooks}
        onChange={(books) => dispatch({ type: 'SET_PLANNED_BOOKS', payload: books })}
      />
    </div>
  );
}

interface AssociationsTabProps {
  state: ProjectPropertiesFormState;
  dispatch: React.Dispatch<FormAction>;
}

function AssociationsTab({ state, dispatch }: AssociationsTabProps) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-6 tw-p-4">
      {/* Associated Lexical Project */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Label className="tw-w-40 tw-shrink-0">Associated lexical project:</Label>
        <Input
          value={state.associatedLexicalProject || ''}
          readOnly
          placeholder="None"
          className="tw-flex-1"
        />
        <Button variant="outline" size="sm">
          Choose
        </Button>
      </div>

      {/* FLEx Integration */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Label htmlFor="flex-usage" className="tw-w-40 tw-shrink-0">
          Use glosses and analyses from:
        </Label>
        <Select
          value={state.flexIntegration}
          onValueChange={(v) => {
            if (isFlexUsageType(v)) {
              dispatch({ type: 'SET_FLEX_INTEGRATION', payload: v });
            }
          }}
        >
          <SelectTrigger id="flex-usage" className="tw-w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FLEX_USAGE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Biblical Terms */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Label className="tw-w-40 tw-shrink-0">Biblical Terms:</Label>
        <Input value={state.biblicalTermsList} readOnly className="tw-flex-1" />
        <Button variant="outline" size="sm">
          Choose
        </Button>
      </div>

      {/* Match Based on Stems */}
      <div className="tw-flex tw-items-start tw-gap-2">
        <Checkbox
          id="match-stems"
          checked={state.matchBasedOnStems}
          onCheckedChange={(checked) =>
            dispatch({ type: 'SET_MATCH_BASED_ON_STEMS', payload: checked === true })
          }
        />
        <div>
          <Label htmlFor="match-stems" className="tw-font-normal">
            Match renderings based on word stems
          </Label>
          <p className="tw-text-sm tw-text-muted-foreground">
            (Requires user to specify morphology...)
          </p>
        </div>
      </div>
    </div>
  );
}

interface NotesTabProps {
  state: ProjectPropertiesFormState;
  dispatch: React.Dispatch<FormAction>;
}

function NotesTab({ state, dispatch }: NotesTabProps) {
  // Convert internal NoteTag to component's NoteTag format
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const componentTags: NoteTagItem[] = state.noteTags.map((tag) => ({
    id: tag.id,
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    icon: tag.icon as NoteTagItem['icon'],
    name: tag.name,
    creatorCanResolve: tag.creatorCanResolve,
    template: tag.template,
  }));

  const handleTagsChange = (newTags: NoteTagItem[]) => {
    const internalTags: NoteTag[] = newTags.map((tag) => ({
      id: tag.id,
      icon: tag.icon,
      name: tag.name,
      creatorCanResolve: tag.creatorCanResolve,
      template: tag.template,
    }));
    dispatch({ type: 'SET_NOTE_TAGS', payload: internalTags });
  };

  return (
    <div className="tw-p-4">
      <Label className="tw-block tw-mb-4">Edit project note tag icons and names:</Label>
      <NoteTagsEditor tags={componentTags} onChange={handleTagsChange} />
    </div>
  );
}

interface AdvancedTabProps {
  state: ProjectPropertiesFormState;
  dispatch: React.Dispatch<FormAction>;
  onOpenEncodingDialog: () => void;
}

function AdvancedTab({ state, dispatch, onOpenEncodingDialog }: AdvancedTabProps) {
  const typicalFileName = getTypicalFileName(
    state.fileNamePrePart,
    state.fileNameForm,
    state.fileNamePostPart,
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* File Name Pattern */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Label className="tw-w-40 tw-shrink-0">Typical book file name:</Label>
        <Input value={typicalFileName} readOnly className="tw-flex-1 tw-font-mono" />
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </div>

      {/* Stylesheet */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Label className="tw-w-40 tw-shrink-0">Stylesheet:</Label>
        <span>
          {state.stylesheetName}
          {state.hasCustomStylesheet && ' (Customized)'}
        </span>
      </div>

      {/* Text Encoding */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Label className="tw-w-40 tw-shrink-0">Text encoding:</Label>
        <Input value={state.encoding.displayName} readOnly className="tw-flex-1" />
        <Button variant="outline" size="sm" onClick={onOpenEncodingDialog}>
          Choose
        </Button>
      </div>

      {/* Normalization */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Label htmlFor="normalization" className="tw-w-40 tw-shrink-0">
          Normalization:
        </Label>
        <Select
          value={state.normalizationForm}
          onValueChange={(v) => {
            if (isNormalizationForm(v)) {
              dispatch({ type: 'SET_NORMALIZATION_FORM', payload: v });
            }
          }}
        >
          <SelectTrigger id="normalization" className="tw-w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {NORMALIZATION_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* USFM Version */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Label htmlFor="usfm-version" className="tw-w-40 tw-shrink-0">
          USFM version:
        </Label>
        <Select
          value={String(state.usfmVersion)}
          onValueChange={(v) => {
            const version = parseInt(v, 10);
            if (version === 2 || version === 3) {
              dispatch({ type: 'SET_USFM_VERSION', payload: version });
            }
          }}
        >
          <SelectTrigger id="usfm-version" className="tw-w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2">USFM 2</SelectItem>
            <SelectItem value="3">USFM 3</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Checkboxes */}
      <div className="tw-flex tw-flex-col tw-gap-2 tw-mt-2">
        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="editable"
            checked={state.editable}
            onCheckedChange={(checked) =>
              dispatch({ type: 'SET_EDITABLE', payload: checked === true })
            }
          />
          <Label htmlFor="editable" className="tw-font-normal">
            Make project editable
          </Label>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="allow-whitespace"
            checked={state.allowInvisibleChars}
            onCheckedChange={(checked) =>
              dispatch({ type: 'SET_ALLOW_INVISIBLE_CHARS', payload: checked === true })
            }
          />
          <Label htmlFor="allow-whitespace" className="tw-font-normal">
            Allow whitespace and invisible characters
          </Label>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="allow-read-access"
            checked={state.allowReadAccess}
            onCheckedChange={(checked) =>
              dispatch({ type: 'SET_ALLOW_READ_ACCESS', payload: checked === true })
            }
          />
          <Label htmlFor="allow-read-access" className="tw-font-normal">
            Grant access to non-publishable resources
          </Label>
        </div>

        <div className="tw-flex tw-items-center tw-gap-2">
          <Checkbox
            id="share-sldr"
            checked={state.allowSharingWithSLDR}
            onCheckedChange={(checked) =>
              dispatch({ type: 'SET_ALLOW_SHARING_SLDR', payload: checked === true })
            }
          />
          <Label htmlFor="share-sldr" className="tw-font-normal">
            Contribute to SIL Locale Data Repository
          </Label>
          <Button variant="link" size="sm" className="tw-h-auto tw-p-0">
            Why share?
          </Button>
        </div>
      </div>
    </div>
  );
}

interface StudyBibleTabProps {
  state: ProjectPropertiesFormState;
  dispatch: React.Dispatch<FormAction>;
}

function StudyBibleTab({ state, dispatch }: StudyBibleTabProps) {
  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Allow hiding footnotes */}
      <div className="tw-flex tw-items-start tw-gap-2">
        <Checkbox
          id="allow-hiding"
          checked={state.allowHidingOfBaseFootnotes}
          onCheckedChange={(checked) =>
            dispatch({ type: 'SET_ALLOW_HIDING_FOOTNOTES', payload: checked === true })
          }
        />
        <Label htmlFor="allow-hiding" className="tw-font-normal">
          Allow footnotes and cross references from {state.baseProjectName || 'the base project'} to
          be hidden in this Study Bible project.
        </Label>
      </div>

      {/* Place callers left */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox
          id="callers-left"
          checked={state.placeCallerToLeftOfSelection}
          onCheckedChange={(checked) =>
            dispatch({ type: 'SET_CALLERS_LEFT', payload: checked === true })
          }
        />
        <Label htmlFor="callers-left" className="tw-font-normal">
          Place callers to the left of selection
        </Label>
      </div>

      {/* Categories */}
      <div className="tw-mt-4">
        <Label className="tw-block tw-mb-2">Categories:</Label>
        <StudyBibleCategoriesEditor
          categories={state.categories}
          onChange={(categories) => dispatch({ type: 'SET_CATEGORIES', payload: categories })}
        />
      </div>
    </div>
  );
}

// =====================================================
// MAIN WEB VIEW COMPONENT
// =====================================================

/**
 * Project Properties Form web view component. The primary dialog for creating new projects and
 * editing existing project settings. Provides a tabbed interface with:
 *
 * - General tab: Project name, language, versification, type, base project, registration
 * - Books tab: Book selection via BookChooserControl
 * - Associations tab: FLEx/lexical project associations
 * - Notes tab: Note tag configuration via NoteTagsEditor
 * - Advanced tab: File naming, encoding, normalization, USFM version
 * - Study Bible tab: (conditional) Study Bible-specific settings
 *
 * @remarks
 * Implements behaviors:
 *
 * - BHV-027: Project type cascade
 * - BHV-028: Base project filtering
 * - BHV-033: Validation cascade
 * - BHV-034: Default values
 * - BHV-041: Cancel cleanup
 */
globalThis.webViewComponent = function ProjectPropertiesWebView(
  // Props will be used for web view state management in the future
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  props: WebViewProps,
) {
  // Initialize form state
  const [state, dispatch] = useReducer(formReducer, getInitialState('new'));

  // Sub-dialog state
  const [openDialog, setOpenDialog] = useState<OpenDialog>(undefined);
  const [isNewLanguage, setIsNewLanguage] = useState(false);

  // Form validation hook
  const { registerFieldRef, getFieldError, focusFirstError, createErrorClickHandler } =
    useFormValidation();

  // Derived state
  const showStudyBibleTab = state.projectType === 'StudyBibleAdditions' && state.mode === 'edit';
  const showBooksTab = !isResourceType(state.projectType);

  // Filter base projects based on type rules
  const filteredBaseProjects = useMemo(
    () => filterBaseProjects(state.availableBaseProjects, state.projectType, state.projectId),
    [state.availableBaseProjects, state.projectType, state.projectId],
  );

  // Dialog title
  const dialogTitle = useMemo(() => {
    if (state.mode === 'new') {
      return 'Project Properties: New Project';
    }
    return `Project Properties: ${state.fullName || state.shortName || 'Edit Project'}`;
  }, [state.mode, state.fullName, state.shortName]);

  // Handlers for sub-dialogs
  const handleOpenProjectNameDialog = useCallback(() => {
    setOpenDialog('projectName');
  }, []);

  const handleOpenLanguageDialog = useCallback((isNew: boolean) => {
    setIsNewLanguage(isNew);
    setOpenDialog('languageSelection');
  }, []);

  const handleOpenEncodingDialog = useCallback(() => {
    setOpenDialog('chooseEncoding');
  }, []);

  const handleCloseDialog = useCallback(() => {
    setOpenDialog(undefined);
  }, []);

  // Handle project name form result
  const handleProjectNameResult = useCallback(
    (result: ProjectNameFormResult) => {
      dispatch({ type: 'SET_PROJECT_NAME_RESULT', payload: result });
      handleCloseDialog();
    },
    [handleCloseDialog],
  );

  // Handle language selection result
  const handleLanguageResult = useCallback(
    (result: LanguageSelectionResult) => {
      dispatch({
        type: 'SET_LANGUAGE',
        payload: { languageId: result.languageId, languageName: result.languageName },
      });
      handleCloseDialog();
    },
    [handleCloseDialog],
  );

  // Handle encoding result
  const handleEncodingResult = useCallback(
    (result: { encoding: EncodingInfo }) => {
      dispatch({ type: 'SET_ENCODING', payload: result.encoding });
      handleCloseDialog();
    },
    [handleCloseDialog],
  );

  // Handle form submission
  const handleSubmit = useCallback(() => {
    // Validate form
    const errors = validateForm(state);
    dispatch({ type: 'SET_VALIDATION_ERRORS', payload: errors });

    if (errors.length > 0) {
      focusFirstError(errors);
      return;
    }

    // TODO: Submit to backend via PAPI
    // eslint-disable-next-line no-console
    console.log('Form submitted:', state);
  }, [state, focusFirstError]);

  // Handle cancel
  const handleCancel = useCallback(() => {
    // BHV-041: Cancel cleanup would happen here
    // TODO: Clean up any partial project creation
    // eslint-disable-next-line no-console
    console.log('Form cancelled');
  }, []);

  // Handle tab change
  const handleTabChange = useCallback((value: string) => {
    dispatch({ type: 'SET_ACTIVE_TAB', payload: value });
  }, []);

  // Check if there are validation errors
  const hasErrors = state.validationErrors.length > 0;

  return (
    <div className="tw-flex tw-flex-col tw-h-full tw-max-h-screen tw-overflow-hidden">
      {/* Dialog Header */}
      <div className="tw-flex tw-items-center tw-justify-between tw-p-4 tw-border-b">
        <h1 className="tw-text-lg tw-font-semibold">{dialogTitle}</h1>
      </div>

      {/* Tab Container */}
      <div className="tw-flex-1 tw-overflow-hidden">
        <Tabs
          value={state.activeTab}
          onValueChange={handleTabChange}
          className="tw-h-full tw-flex tw-flex-col"
        >
          <TabsList className="tw-mx-4 tw-mt-2">
            <TabsTrigger value="general">General</TabsTrigger>
            {showBooksTab && <TabsTrigger value="books">Books</TabsTrigger>}
            <TabsTrigger value="associations">Associations</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
            {showStudyBibleTab && <TabsTrigger value="studybible">Study Bible</TabsTrigger>}
          </TabsList>

          <div className="tw-flex-1 tw-overflow-auto">
            <TabsContent value="general" className="tw-h-full tw-mt-0">
              <GeneralTab
                state={state}
                dispatch={dispatch}
                onOpenProjectNameDialog={handleOpenProjectNameDialog}
                onOpenLanguageDialog={handleOpenLanguageDialog}
                filteredBaseProjects={filteredBaseProjects}
                registerFieldRef={registerFieldRef}
                getFieldError={getFieldError}
              />
            </TabsContent>

            {showBooksTab && (
              <TabsContent value="books" className="tw-h-full tw-mt-0">
                <BooksTab state={state} dispatch={dispatch} />
              </TabsContent>
            )}

            <TabsContent value="associations" className="tw-h-full tw-mt-0">
              <AssociationsTab state={state} dispatch={dispatch} />
            </TabsContent>

            <TabsContent value="notes" className="tw-h-full tw-mt-0">
              <NotesTab state={state} dispatch={dispatch} />
            </TabsContent>

            <TabsContent value="advanced" className="tw-h-full tw-mt-0">
              <AdvancedTab
                state={state}
                dispatch={dispatch}
                onOpenEncodingDialog={handleOpenEncodingDialog}
              />
            </TabsContent>

            {showStudyBibleTab && (
              <TabsContent value="studybible" className="tw-h-full tw-mt-0">
                <StudyBibleTab state={state} dispatch={dispatch} />
              </TabsContent>
            )}
          </div>
        </Tabs>
      </div>

      {/* Validation Ribbon */}
      {hasErrors && (
        <div className="tw-px-4">
          <FormValidationRibbon
            errors={state.validationErrors}
            onErrorClick={createErrorClickHandler()}
          />
        </div>
      )}

      {/* Footer Buttons */}
      <div className="tw-flex tw-justify-end tw-gap-2 tw-p-4 tw-border-t">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>OK</Button>
      </div>

      {/* Sub-dialogs */}
      {openDialog === 'projectName' && (
        <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center tw-z-50">
          <div className="tw-bg-background tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-w-full tw-max-h-[90vh] tw-overflow-auto">
            <ProjectNameForm
              fullName={state.fullName}
              shortName={state.shortName}
              copyright={state.copyright}
              isNewProject={state.mode === 'new'}
              isRegistered={!!state.registrationInfo}
              onSubmit={handleProjectNameResult}
              onCancel={handleCloseDialog}
            />
          </div>
        </div>
      )}

      {openDialog === 'languageSelection' && (
        <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center tw-z-50">
          <div className="tw-bg-background tw-rounded-lg tw-shadow-lg tw-max-w-2xl tw-w-full tw-max-h-[90vh] tw-overflow-auto">
            <LanguageSelectionForm
              currentLanguageId={state.languageId || undefined}
              projectName={state.fullName || state.shortName}
              isNewLanguage={isNewLanguage}
              isRegistered={!!state.registrationInfo}
              languages={DEFAULT_LANGUAGES}
              scriptOptions={DEFAULT_SCRIPTS}
              regionOptions={DEFAULT_REGIONS}
              onSubmit={handleLanguageResult}
              onCancel={handleCloseDialog}
            />
          </div>
        </div>
      )}

      {openDialog === 'chooseEncoding' && (
        <div className="tw-fixed tw-inset-0 tw-bg-black/50 tw-flex tw-items-center tw-justify-center tw-z-50">
          <div className="tw-bg-background tw-rounded-lg tw-shadow-lg tw-max-w-lg tw-w-full tw-max-h-[90vh] tw-overflow-auto">
            <ChooseEncodingForm
              currentEncoding={state.encoding}
              onSubmit={handleEncodingResult}
              onCancel={handleCloseDialog}
            />
          </div>
        </div>
      )}
    </div>
  );
};
