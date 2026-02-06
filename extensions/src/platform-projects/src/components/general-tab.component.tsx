import {
  Button,
  Checkbox,
  ComboBox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'platform-bible-react';
import { useCallback } from 'react';
import { LanguageStrings } from 'platform-bible-utils';
import {
  ProjectType,
  ProjectPropertiesFormState,
  FormAction,
  LanguageOption,
  ProjectReference,
  EncoderOption,
  VERSIFICATION_OPTIONS,
  validateShortName,
} from '../project-properties.utils';
import ProjectTypeSelector from './project-type-selector.component';

export interface GeneralTabProps {
  state: ProjectPropertiesFormState;
  dispatch: React.Dispatch<FormAction>;
  languages: LanguageOption[];
  baseProjects: ProjectReference[];
  encoders: EncoderOption[];
  localizedStrings: LanguageStrings;
}

export default function GeneralTab({
  state,
  dispatch,
  languages,
  baseProjects,
  encoders,
  localizedStrings,
}: GeneralTabProps) {
  const handleFullNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'SET_FIELD', field: 'fullName', value: e.target.value });
    },
    [dispatch],
  );

  const handleShortNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      dispatch({ type: 'SET_FIELD', field: 'shortName', value: val });
      const shortNameError = validateShortName(val);
      if (shortNameError) {
        dispatch({
          type: 'SET_VALIDATION_ERRORS',
          errors: { ...state.validationErrors, shortName: shortNameError },
          tabsWithErrors: state.tabsWithErrors,
        });
      } else {
        const { shortName: _removed, ...rest } = state.validationErrors;
        dispatch({
          type: 'SET_VALIDATION_ERRORS',
          errors: rest,
          tabsWithErrors: state.tabsWithErrors,
        });
      }
    },
    [dispatch, state.validationErrors, state.tabsWithErrors],
  );

  const handleProjectTypeChange = useCallback(
    (projectType: ProjectType) => {
      dispatch({ type: 'SET_PROJECT_TYPE', projectType });
    },
    [dispatch],
  );

  const handleVersificationChange = useCallback(
    (value: string) => {
      dispatch({ type: 'SET_FIELD', field: 'versification', value });
    },
    [dispatch],
  );

  const handleEditableChange = useCallback(
    (checked: boolean) => {
      dispatch({ type: 'SET_FIELD', field: 'editable', value: checked });
    },
    [dispatch],
  );

  const handleEncoderChange = useCallback(
    (value: string) => {
      dispatch({ type: 'SET_FIELD', field: 'encoderName', value });
    },
    [dispatch],
  );

  const handleReverseDirectionChange = useCallback(
    (checked: boolean) => {
      dispatch({ type: 'SET_FIELD', field: 'encoderReverseDirection', value: checked });
    },
    [dispatch],
  );

  const languageItems = languages.map((lang: LanguageOption) => lang.name);

  const baseProjectItems = baseProjects.map(
    (proj: ProjectReference) => `${proj.shortName} - ${proj.fullName}`,
  );

  return (
    <div className="tw-flex tw-flex-col tw-gap-4 tw-p-4">
      {/* Full Name */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="fullName">
          {localizedStrings['%webView_projectProperties_field_fullName%']}
          <span className="tw-text-destructive" aria-hidden="true">
            {' '}
            *
          </span>
        </Label>
        <Input
          id="fullName"
          value={state.fullName}
          onChange={handleFullNameChange}
          aria-invalid={!!state.validationErrors.fullName}
          aria-describedby={state.validationErrors.fullName ? 'fullName-error' : undefined}
        />
        {state.validationErrors.fullName ? (
          <Label id="fullName-error" className="tw-text-sm tw-text-destructive" role="alert">
            {state.validationErrors.fullName}
          </Label>
        ) : undefined}
      </div>

      {/* Short Name */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="shortName">
          {localizedStrings['%webView_projectProperties_field_shortName%']}
          <span className="tw-text-destructive" aria-hidden="true">
            {' '}
            *
          </span>
        </Label>
        <div className="tw-flex tw-gap-2">
          <Input
            id="shortName"
            value={state.shortName}
            onChange={handleShortNameChange}
            className="tw-flex-1"
            aria-invalid={!!state.validationErrors.shortName}
            aria-describedby={state.validationErrors.shortName ? 'shortName-error' : undefined}
          />
          <Button type="button" variant="outline" size="sm">
            {localizedStrings['%webView_projectProperties_button_editName%']}
          </Button>
        </div>
        {state.validationErrors.shortName ? (
          <Label id="shortName-error" className="tw-text-sm tw-text-destructive" role="alert">
            {state.validationErrors.shortName}
          </Label>
        ) : undefined}
      </div>

      {/* Project Type */}
      <ProjectTypeSelector
        value={state.projectType}
        onChange={handleProjectTypeChange}
        label={localizedStrings['%webView_projectProperties_field_projectType%'] ?? 'Project Type'}
        error={state.validationErrors.projectType}
      />

      {/* Language */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="language">
          {localizedStrings['%webView_projectProperties_field_language%']}
          {state.languageRequired ? (
            <span className="tw-text-destructive" aria-hidden="true">
              {' '}
              *
            </span>
          ) : undefined}
        </Label>
        <div className="tw-flex tw-gap-2">
          <div className="tw-flex-1">
            <ComboBox
              options={languageItems}
              value={
                state.languageId
                  ? (languages.find((l) => l.id === state.languageId)?.name ?? '')
                  : ''
              }
              onChange={(value: string) => {
                const lang = languages.find((l) => l.name === value);
                dispatch({
                  type: 'SET_FIELD',
                  field: 'languageId',
                  value: lang?.id ?? undefined,
                });
              }}
              textPlaceholder={
                localizedStrings['%webView_projectProperties_placeholder_selectLanguage%'] ??
                'Select language...'
              }
            />
          </div>
          <Button type="button" variant="outline" size="sm">
            {localizedStrings['%webView_projectProperties_button_languageSettings%']}
          </Button>
        </div>
        {state.validationErrors.languageId ? (
          <Label className="tw-text-sm tw-text-destructive" role="alert">
            {state.validationErrors.languageId}
          </Label>
        ) : undefined}
      </div>

      {/* Versification */}
      <div className="tw-flex tw-flex-col tw-gap-1">
        <Label htmlFor="versification">
          {localizedStrings['%webView_projectProperties_field_versification%']}
          <span className="tw-text-destructive" aria-hidden="true">
            {' '}
            *
          </span>
        </Label>
        <Select
          value={state.versification}
          onValueChange={handleVersificationChange}
          disabled={state.showBaseProject && !!state.baseProjectGuid}
        >
          <SelectTrigger
            id="versification"
            className={state.validationErrors.versification ? 'tw-border-destructive' : undefined}
            aria-invalid={!!state.validationErrors.versification}
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {VERSIFICATION_OPTIONS.map((opt) => (
              <SelectItem key={opt.type} value={opt.type}>
                {opt.displayName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {state.validationErrors.versification ? (
          <Label className="tw-text-sm tw-text-destructive" role="alert">
            {state.validationErrors.versification}
          </Label>
        ) : undefined}
      </div>

      {/* Base Project (conditional) */}
      {state.showBaseProject ? (
        <div className="tw-flex tw-flex-col tw-gap-1">
          <Label htmlFor="baseProject">
            {localizedStrings['%webView_projectProperties_field_baseProject%']}
            {state.baseProjectRequired ? (
              <span className="tw-text-destructive" aria-hidden="true">
                {' '}
                *
              </span>
            ) : undefined}
          </Label>
          <ComboBox
            options={baseProjectItems}
            value={
              state.baseProjectGuid
                ? baseProjects.find((p) => p.guid === state.baseProjectGuid)
                  ? `${baseProjects.find((p) => p.guid === state.baseProjectGuid)?.shortName} - ${baseProjects.find((p) => p.guid === state.baseProjectGuid)?.fullName}`
                  : ''
                : ''
            }
            onChange={(value: string) => {
              const proj = baseProjects.find((p) => `${p.shortName} - ${p.fullName}` === value);
              dispatch({
                type: 'SET_BASE_PROJECT',
                baseProjectGuid: proj?.guid ?? undefined,
              });
            }}
            textPlaceholder={
              localizedStrings['%webView_projectProperties_placeholder_selectBaseProject%'] ??
              'Select base project...'
            }
          />
          {state.validationErrors.baseProjectGuid ? (
            <Label className="tw-text-sm tw-text-destructive" role="alert">
              {state.validationErrors.baseProjectGuid}
            </Label>
          ) : undefined}
        </div>
      ) : undefined}

      {/* Editable */}
      <div className="tw-flex tw-items-center tw-gap-2">
        <Checkbox id="editable" checked={state.editable} onCheckedChange={handleEditableChange} />
        <Label htmlFor="editable">
          {localizedStrings['%webView_projectProperties_field_editable%']}
        </Label>
      </div>

      {/* Encoder Fields (conditional) */}
      {state.showEncoderFields ? (
        <>
          <div className="tw-flex tw-flex-col tw-gap-1">
            <Label htmlFor="encoder">
              {localizedStrings['%webView_projectProperties_field_encoder%']}
              <span className="tw-text-destructive" aria-hidden="true">
                {' '}
                *
              </span>
            </Label>
            <Select value={state.encoderName} onValueChange={handleEncoderChange}>
              <SelectTrigger
                id="encoder"
                className={state.validationErrors.encoderName ? 'tw-border-destructive' : undefined}
                aria-invalid={!!state.validationErrors.encoderName}
              >
                <SelectValue
                  placeholder={
                    localizedStrings['%webView_projectProperties_placeholder_selectEncoder%'] ??
                    'Select encoder...'
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {encoders.map((enc: EncoderOption) => (
                  <SelectItem key={enc.name} value={enc.name}>
                    {enc.displayName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {state.validationErrors.encoderName ? (
              <Label className="tw-text-sm tw-text-destructive" role="alert">
                {state.validationErrors.encoderName}
              </Label>
            ) : undefined}
          </div>

          <div className="tw-flex tw-items-center tw-gap-2">
            <Checkbox
              id="reverseDirection"
              checked={state.encoderReverseDirection}
              onCheckedChange={handleReverseDirectionChange}
            />
            <Label htmlFor="reverseDirection">
              {localizedStrings['%webView_projectProperties_field_reverseDirection%']}
            </Label>
          </div>
        </>
      ) : undefined}
    </div>
  );
}
