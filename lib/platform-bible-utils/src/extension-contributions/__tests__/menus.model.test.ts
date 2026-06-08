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

  it('JSON schema accepts isExperimental on column entries', () => {
    const ajv = new Ajv2019({ allErrors: true });
    const validate = ajv.compile(menuDocumentSchema);
    const doc = {
      mainMenu: {
        columns: { 'a.b': { label: '%x%', order: 1, isExtensible: true, isExperimental: true } },
        groups: {},
        items: [],
      },
      defaultWebViewTopMenu: { columns: {}, groups: {}, items: [] },
      defaultWebViewContextMenu: { groups: {}, items: [] },
      webViewMenus: {},
    };
    expect(validate(doc)).toBe(true);
  });
});
