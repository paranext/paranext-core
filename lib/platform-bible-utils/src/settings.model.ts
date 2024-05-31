//----------------------------------------------------------------------------------------------
// NOTE: If you change any of the types, make sure the JSON schema at the end of this file gets
// changed so they align.
//----------------------------------------------------------------------------------------------

import { LocalizeKey, ReferencedItem } from 'menus.model';

/** The data an extension provides to inform Platform.Bible of the settings it provides */
export type SettingsContribution = SettingsGroup | SettingsGroup[];
/** A description of an extension's setting entry */
export type Setting = ExtensionControlledSetting;
/** Setting definition that is validated by the extension. */
export type ExtensionControlledSetting = SettingBase & ModifierExtensionControlled;
/** Base information needed to describe a setting entry */
export type SettingBase = StateBase & {
  [k: string]: unknown;
  /** LocalizeKey that displays in the settings dialog as the setting name */
  label: LocalizeKey;
  /** LocalizeKey that displays in the settings dialog to describe the setting */
  description?: LocalizeKey;
};
/** The data an extension provides to inform Platform.Bible of the project settings it provides */
export type ProjectSettingsContribution = ProjectSettingsGroup | ProjectSettingsGroup[];
/** A description of an extension's setting entry */
export type ProjectSetting = ExtensionControlledProjectSetting;
/** Setting definition that is validated by the extension. */
export type ExtensionControlledProjectSetting = ProjectSettingBase & ModifierExtensionControlled;
/** Base information needed to describe a project setting entry */
export type ProjectSettingBase = SettingBase & ModifierProject;
/** A description of an extension's user state entry */
export type UserState = ExtensionControlledState;
/** State definition that is validated by the extension. */
export type ExtensionControlledState = StateBase & ModifierExtensionControlled;
/** Group of related settings definitions */
export interface SettingsGroup {
  [k: string]: unknown;
  /** LocalizeKey that displays in the settings dialog as the group name */
  label: LocalizeKey;
  /** LocalizeKey that displays in the settings dialog to describe the group */
  description?: LocalizeKey;
  properties: SettingProperties;
}
/** Object whose keys are setting IDs and whose values are settings objects */
export interface SettingProperties {
  [k: ReferencedItem]: Setting;
}
/** Base information needed to describe a state entry */
export interface StateBase {
  [k: string]: unknown;
  /** Default value for the state/setting */
  default: unknown;
  /**
   * A state/setting ID whose value to set to this state/setting's starting value the first time
   * this state/setting is loaded
   */
  derivesFrom?: ReferencedItem;
}
/**
 * Modifies state/setting type to be extension-controlled. "Extension-controlled" means the
 * extension provides the component and the validator for the state/setting, so the state/setting is
 * controlled by the extension.
 */
export interface ModifierExtensionControlled {
  [k: string]: unknown;
  platformType?: undefined;
  type?: undefined;
}
/** Group of related settings definitions */
export interface ProjectSettingsGroup {
  [k: string]: unknown;
  /** LocalizeKey that displays in the project settings dialog as the group name */
  label: LocalizeKey;
  /** LocalizeKey that displays in the project settings dialog to describe the group */
  description?: LocalizeKey;
  properties: ProjectSettingProperties;
}
/** Object whose keys are setting IDs and whose values are settings objects */
export interface ProjectSettingProperties {
  [k: ReferencedItem]: ProjectSetting;
}

// Note: we removed the index signature on ModifierProject to avoid having it on
// `ProjectMetadataFilterOptions`. Unfortunately adding "additionalProperties": false on the json
// schema messes up validation. Please remove the index signature again in the future if you
// regenerate types
export interface ModifierProject {
  /**
   * String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s
   * (using the
   * [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
   * function) to determine if they should be included.
   *
   * If this is one string, it will be matched against `projectInterface`s. If this is an array,
   * each entry is handled based on its type (at least one entry must match for this filter
   * condition to pass):
   *
   * - If the entry is a string, it will be matched against each `projectInterface`. If any match, the
   *   project will pass this filter condition
   * - If the entry is an array of strings, each will be matched against each `projectInterface`. If
   *   every string matches against at least one `projectInterface`, the project will pass this
   *   filter condition
   *
   * In other words, each entry in the first-level array is `OR`'ed together. Each entry in
   * second-level arrays (arrays within the first-level array) are `AND`'ed together.
   *
   * Defaults to all {@link ProjectInterfaces}, so all projects that do not match
   * `excludeProjectInterfaces` will be included
   *
   * @example
   *
   * ```typescript
   * includeProjectInterfaces: ['one', ['two', 'three']];
   * ```
   *
   * This filter condition will succeed on projects whose `projectInterface`s fulfill at least one
   * of the following conditions (At least one entry in the array must match):
   *
   * - Include `one`
   * - Include both `two` and `three`.
   */
  includeProjectInterfaces?: undefined | string | (string | string[])[];
  /**
   * String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s
   * (using the
   * [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
   * function) to determine if they should absolutely not be included even if they match with
   * `includeProjectInterfaces`.
   *
   * If this is one string, it will be matched against `projectInterface`s. If this is an array,
   * each entry is handled based on its type (at least one entry must match for this filter
   * condition to exclude the project):
   *
   * - If the entry is a string, it will be matched against each `projectInterface`. If any match, the
   *   project will pass this filter condition and exclude the project
   * - If the entry is an array of strings, each will be matched against each `projectInterface`. If
   *   every string matches against at least one `projectInterface`, the project will pass this
   *   filter condition and exclude the project
   *
   * In other words, each entry in the first-level array is `OR`'ed together. Each entry in
   * second-level arrays (arrays within the first-level array) are `AND`'ed together.
   *
   * Defaults to no {@link ProjectInterfaces}, so all projects that match `includeProjectInterfaces`
   * will be included
   *
   * @example
   *
   * ```typescript
   * excludeProjectInterfaces: ['one', ['two', 'three']];
   * ```
   *
   * This filter condition will succeed and exclude projects whose `projectInterface`s fulfill at
   * least one of the following conditions (At least one entry in the array must match):
   *
   * - Include `one`
   * - Include both `two` and `three`.
   */
  excludeProjectInterfaces?: undefined | string | (string | string[])[];
  /**
   * String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory
   * Ids that provided each project's metadata (using the
   * [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
   * function) to determine if the projects should be included.
   *
   * Defaults to all Project Data Provider Factory Ids, so all projects that do not match
   * `excludePdpFactoryIds` will be included
   */
  includePdpFactoryIds?: undefined | string | string[];
  /**
   * String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory
   * Ids that provided each project's metadata (using the
   * [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test)
   * function) to determine if the projects should absolutely not be included even if they match
   * with `includeProjectInterfaces`.
   *
   * Defaults to none, so all projects that match `includePdpFactoryIds` will be included
   */
  excludePdpFactoryIds?: undefined | string | string[];
}

/** The data an extension provides to inform Platform.Bible of the user state it provides */
export interface UserStateContribution {
  [k: ReferencedItem]: UserState;
}
/** The data an extension provides to inform Platform.Bible of the project state it provides */
export interface ProjectStateContribution {
  [k: ReferencedItem]: UserState;
}

//----------------------------------------------------------------------------------------------
// NOTE: If you change the schema below, make sure the TS types above get changed so they align.
//----------------------------------------------------------------------------------------------
const settingsDefs = {
  projectSettingsContribution: {
    description:
      'The data an extension provides to inform Platform.Bible of the project settings it provides',
    anyOf: [
      {
        $ref: '#/$defs/projectSettingsGroup',
      },
      {
        type: 'array',
        items: {
          $ref: '#/$defs/projectSettingsGroup',
        },
      },
    ],
  },
  projectSettingsGroup: {
    description: 'Group of related settings definitions',
    type: 'object',
    properties: {
      label: {
        description: 'localizeKey that displays in the project settings dialog as the group name',
        $ref: '#/$defs/localizeKey',
      },
      description: {
        description:
          'localizeKey that displays in the project settings dialog to describe the group',
        $ref: '#/$defs/localizeKey',
      },
      properties: {
        $ref: '#/$defs/projectSettingProperties',
      },
    },
    required: ['label', 'properties'],
  },
  projectSettingProperties: {
    description: 'Object whose keys are setting IDs and whose values are settings objects',
    type: 'object',
    patternProperties: {
      '^[\\w\\-]+\\.[\\w\\-]+$': {
        $ref: '#/$defs/projectSetting',
      },
    },
    additionalProperties: false,
  },
  projectSetting: {
    description: "A description of an extension's setting entry",
    anyOf: [
      {
        $ref: '#/$defs/extensionControlledProjectSetting',
      },
    ],
  },
  extensionControlledProjectSetting: {
    description: 'Setting definition that is validated by the extension.',
    allOf: [
      {
        $ref: '#/$defs/projectSettingBase',
      },
      {
        $ref: '#/$defs/modifierExtensionControlled',
      },
    ],
  },
  projectSettingBase: {
    description: 'Base information needed to describe a project setting entry',
    allOf: [
      {
        $ref: '#/$defs/settingBase',
      },
      {
        $ref: '#/$defs/modifierProject',
      },
    ],
  },
  modifierProject: {
    description: 'Modifies setting type to be project setting',
    type: 'object',
    properties: {
      includeProjectInterfaces: {
        description:
          "String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if they should be included.\n\nIf this is one string, it will be matched against `projectInterface`s. If this is an array, each entry is handled based on its type (at least one entry must match for this filter condition to pass):\n\n- If the entry is a string, it will be matched against each `projectInterface`. If any match, the project will pass this filter condition\n- If the entry is an array of strings, each will be matched against each `projectInterface`. If every string matches against at least one `projectInterface`, the project will pass this filter condition\n\nIn other words, each entry in the first-level array is `OR`'ed together. Each entry in second-level arrays (arrays within the first-level array) are `AND`'ed together.\n\nDefaults to all {@link ProjectInterfaces}, so all projects that do not match `excludeProjectInterfaces` will be included\n\n@example\n\n```typescript\nincludeProjectInterfaces: ['one', ['two', 'three']];\n```\n\nThis filter condition will succeed on projects whose `projectInterface`s fulfill at least one of the following conditions (At least one entry in the array must match):\n\n- Include `one`\n- Include both `two` and `three`.",
        anyOf: [
          {
            type: 'null',
          },
          {
            type: 'string',
          },
          {
            type: 'array',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'array',
                  items: { type: 'string' },
                },
              ],
            },
          },
        ],
      },
      excludeProjectInterfaces: {
        description:
          "String representation of `RegExp` pattern(s) to match against projects' `projectInterface`s (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if they should absolutely not be included even if they match with `includeProjectInterfaces`.\n\nIf this is one string, it will be matched against `projectInterface`s. If this is an array, each entry is handled based on its type (at least one entry must match for this filter condition to exclude the project):\n\n- If the entry is a string, it will be matched against each `projectInterface`. If any match, the project will pass this filter condition and exclude the project\n- If the entry is an array of strings, each will be matched against each `projectInterface`. If every string matches against at least one `projectInterface`, the project will pass this filter condition and exclude the project\n\nIn other words, each entry in the first-level array is `OR`'ed together. Each entry in second-level arrays (arrays within the first-level array) are `AND`'ed together.\n\nDefaults to no {@link ProjectInterfaces}, so all projects that match `includeProjectInterfaces` will be included\n\n@example\n\n```typescript\nexcludeProjectInterfaces: ['one', ['two', 'three']];\n```\n\nThis filter condition will succeed and exclude projects whose `projectInterface`s fulfill at least one of the following conditions (At least one entry in the array must match):\n\n- Include `one`\n- Include both `two` and `three`.",
        anyOf: [
          {
            type: 'null',
          },
          {
            type: 'string',
          },
          {
            type: 'array',
            items: {
              anyOf: [
                {
                  type: 'string',
                },
                {
                  type: 'array',
                  items: { type: 'string' },
                },
              ],
            },
          },
        ],
      },
      includePdpFactoryIds: {
        description:
          "String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory Ids that provided each project's metadata (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if the projects should be included.\n\nDefaults to all Project Data Provider Factory Ids, so all projects that do not match `excludePdpFactoryIds` will be included",
        anyOf: [
          {
            type: 'null',
          },
          {
            type: 'string',
          },
          {
            type: 'array',
            items: { type: 'string' },
          },
        ],
      },
      excludePdpFactoryIds: {
        description:
          "String representation of `RegExp` pattern(s) to match against the Project Data Provider Factory Ids that provided each project's metadata (using the [`test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) function) to determine if the projects should absolutely not be included even if they match with `includeProjectInterfaces`.\n\nDefaults to none, so all projects that match `includePdpFactoryIds` will be included",
        anyOf: [
          {
            type: 'null',
          },
          {
            type: 'string',
          },
          {
            type: 'array',
            items: { type: 'string' },
          },
        ],
      },
    },
  },
  settingsContribution: {
    description:
      'The data an extension provides to inform Platform.Bible of the settings it provides',
    anyOf: [
      {
        $ref: '#/$defs/settingsGroup',
      },
      {
        type: 'array',
        items: {
          $ref: '#/$defs/settingsGroup',
        },
      },
    ],
  },
  settingsGroup: {
    description: 'Group of related settings definitions',
    type: 'object',
    properties: {
      label: {
        description: 'localizeKey that displays in the settings dialog as the group name',
        $ref: '#/$defs/localizeKey',
      },
      description: {
        description: 'localizeKey that displays in the settings dialog to describe the group',
        $ref: '#/$defs/localizeKey',
      },
      properties: {
        $ref: '#/$defs/settingProperties',
      },
    },
    required: ['label', 'properties'],
  },
  settingProperties: {
    description: 'Object whose keys are setting IDs and whose values are settings objects',
    type: 'object',
    patternProperties: {
      '^[\\w-]+\\.[\\w-]+$': {
        $ref: '#/$defs/setting',
      },
    },
    additionalProperties: false,
  },
  setting: {
    description: "A description of an extension's setting entry",
    anyOf: [
      {
        $ref: '#/$defs/extensionControlledSetting',
      },
    ],
  },
  extensionControlledSetting: {
    description: 'Setting definition that is validated by the extension.',
    allOf: [
      {
        $ref: '#/$defs/settingBase',
      },
      {
        $ref: '#/$defs/modifierExtensionControlled',
      },
    ],
  },
  settingBase: {
    description: 'Base information needed to describe a setting entry',
    allOf: [
      {
        $ref: '#/$defs/stateBase',
      },
      {
        type: 'object',
        properties: {
          label: {
            description: 'localizeKey that displays in the settings dialog as the setting name',
            $ref: '#/$defs/localizeKey',
          },
          description: {
            description: 'localizeKey that displays in the settings dialog to describe the setting',
            $ref: '#/$defs/localizeKey',
          },
        },
        required: ['label'],
      },
    ],
  },
  projectStateContribution: {
    description:
      'The data an extension provides to inform Platform.Bible of the project state it provides',
    $ref: '#/$defs/userStateProperties',
  },
  userStateContribution: {
    description:
      'The data an extension provides to inform Platform.Bible of the user state it provides',
    $ref: '#/$defs/userStateProperties',
  },
  userStateProperties: {
    description: 'Object whose keys are state IDs and whose values are state objects',
    type: 'object',
    patternProperties: {
      '^[\\w\\-]+\\.[\\w\\-]+$': {
        $ref: '#/$defs/userState',
      },
    },
    additionalProperties: false,
  },
  userState: {
    description: "A description of an extension's user state entry",
    anyOf: [
      {
        $ref: '#/$defs/extensionControlledState',
      },
    ],
  },
  extensionControlledState: {
    description: 'State definition that is validated by the extension.',
    allOf: [
      {
        $ref: '#/$defs/stateBase',
      },
      {
        $ref: '#/$defs/modifierExtensionControlled',
      },
    ],
  },
  modifierExtensionControlled: {
    description:
      'Modifies state/setting type to be extension-controlled. "Extension-controlled" means the extension provides the component and the validator for the state/setting, so the state/setting is controlled by the extension.',
    not: {
      anyOf: [
        {
          type: 'object',
          required: ['platformType'],
        },
        {
          type: 'object',
          required: ['type'],
        },
      ],
    },
  },
  stateBase: {
    description: 'Base information needed to describe a state entry',
    type: 'object',
    properties: {
      default: {
        description: 'default value for the state/setting',
        type: 'any',
      },
      derivesFrom: {
        description:
          "a state/setting ID whose value to set to this state/setting's starting value the first time this state/setting is loaded",
        $ref: '#/$defs/id',
      },
    },
    required: ['default'],
  },
  localizeKey: {
    description: "Identifier for a string that will be localized based on the user's UI language",
    type: 'string',
    pattern: '^%[\\w\\-\\.]+%$',
    tsType: 'LocalizeKey',
  },
  id: {
    description: '',
    type: 'string',
    pattern: '^[\\w\\-]+\\.[\\w\\-]+$',
    tsType: 'Id',
  },
};

/**
 * Json-schema-to-typescript has some added stuff that isn't actually compatible with JSON schema,
 * so we remove them here
 *
 * @param defs The `$defs` property of a JSON schema (will be modified in place)
 */
// JSON schema types are weird, so we'll just be careful
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeJsonToTypeScriptTypesStuff(defs: any) {
  if (!defs) return;

  // JSON schema types are weird, so we'll just be careful
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Object.values(defs).forEach((def: any) => {
    if (!def.type) return;

    if ('tsType' in def) delete def.tsType;

    if (def.type === 'any') {
      delete def.type;
      return;
    }

    if (def.type === 'object') {
      removeJsonToTypeScriptTypesStuff(def.properties);
    }
  });
}

removeJsonToTypeScriptTypesStuff(settingsDefs);

/** JSON schema object that aligns with the ProjectSettingsContribution type */
export const projectSettingsDocumentSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'Project Settings Contribution',
  description:
    'The data an extension provides to inform Platform.Bible of the project settings it provides',
  anyOf: [
    {
      $ref: '#/$defs/projectSettingsGroup',
    },
    {
      type: 'array',
      items: {
        $ref: '#/$defs/projectSettingsGroup',
      },
    },
  ],

  $defs: settingsDefs,
};

Object.freeze(projectSettingsDocumentSchema);

/** JSON schema object that aligns with the {@link SettingsContribution} type */
export const settingsDocumentSchema = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  title: 'Settings Contribution',
  description:
    'The data an extension provides to inform Platform.Bible of the settings it provides',
  anyOf: [
    {
      $ref: '#/$defs/settingsGroup',
    },
    {
      type: 'array',
      items: {
        $ref: '#/$defs/settingsGroup',
      },
    },
  ],

  $defs: settingsDefs,
};

Object.freeze(settingsDocumentSchema);
