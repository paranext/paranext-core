import { describe, it, expect } from 'vitest';
import Ajv2019 from 'ajv/dist/2019';
import {
  menuDocumentSchema,
  type ColumnsWithHeaders,
  type WebViewMenu,
  type OrderedExtensibleContainer,
} from '../menus.model';

describe('menus.model — isExperimental field', () => {
  it('OrderedExtensibleContainer permits isExperimental', () => {
    const c: OrderedExtensibleContainer = { order: 1, isExtensible: true, isExperimental: true };
    expect(c.isExperimental).toBe(true);
  });

  it('ColumnsWithHeaders permits isExperimental at the columns-collection level', () => {
    const c: ColumnsWithHeaders = { isExtensible: true, isExperimental: true };
    expect(c.isExperimental).toBe(true);
  });

  it('WebViewMenu permits isExperimental', () => {
    const m: WebViewMenu = {
      includeDefaults: undefined,
      topMenu: undefined,
      contextMenu: undefined,
      isExperimental: true,
    };
    expect(m.isExperimental).toBe(true);
  });

  // Builds a minimal valid menu document, optionally overriding the `mainMenu`.
  const makeDoc = (mainMenu: object) => ({
    mainMenu,
    defaultWebViewTopMenu: { columns: {}, groups: {}, items: [] },
    defaultWebViewContextMenu: { groups: {}, items: [] },
    webViewMenus: {},
  });

  const compileValidator = () => new Ajv2019({ allErrors: true }).compile(menuDocumentSchema);

  it('JSON schema accepts isExperimental on column entries', () => {
    const validate = compileValidator();
    const doc = makeDoc({
      columns: { 'a.b': { label: '%x%', order: 1, isExtensible: true, isExperimental: true } },
      groups: {},
      items: [],
    });
    expect(validate(doc)).toBe(true);
  });

  it('JSON schema accepts isExperimental at the columns-collection level', () => {
    const validate = compileValidator();
    const doc = makeDoc({ columns: { isExperimental: true }, groups: {}, items: [] });
    expect(validate(doc)).toBe(true);
  });

  it('JSON schema rejects a non-boolean isExperimental', () => {
    const validate = compileValidator();
    const doc = makeDoc({
      columns: { 'a.b': { label: '%x%', order: 1, isExperimental: 'true' } },
      groups: {},
      items: [],
    });
    expect(validate(doc)).toBe(false);
  });

  it('JSON schema rejects a typo at the columns-collection level (additionalProperties: false)', () => {
    const validate = compileValidator();
    // `isExperimentl` is neither a column key (no dot) nor a known property.
    const doc = makeDoc({ columns: { isExperimentl: true }, groups: {}, items: [] });
    expect(validate(doc)).toBe(false);
  });

  it('JSON schema rejects a typo on a webViewMenus entry (additionalProperties: false)', () => {
    const validate = compileValidator();
    const doc = {
      mainMenu: { columns: {}, groups: {}, items: [] },
      defaultWebViewTopMenu: { columns: {}, groups: {}, items: [] },
      defaultWebViewContextMenu: { groups: {}, items: [] },
      webViewMenus: { 'a.b': { isExperimentl: true } },
    };
    expect(validate(doc)).toBe(false);
  });
});
