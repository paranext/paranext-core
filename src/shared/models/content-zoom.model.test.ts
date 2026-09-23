import { describe, expect, it } from 'vitest';
import { CONTENT_ZOOM_ROOT_ATTRIBUTE as LIBRARY_CONTENT_ZOOM_ROOT_ATTRIBUTE } from 'platform-bible-react';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import { isValidContentZoomAreaId } from '@shared/utils/content-zoom.util';
import {
  CONTENT_ZOOM_COMMANDS,
  CONTENT_ZOOM_CSS_VARIABLE_PREFIX,
  CONTENT_ZOOM_DECLARATION_BY_WEB_VIEW_TYPE,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_IDENTITY_STATE_KEY,
  CONTENT_ZOOM_LEVELS_STATE_KEY,
  CONTENT_ZOOM_MAIN_AREA_ATTRIBUTE_VALUES,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  CONTENT_ZOOM_STYLE_ELEMENT_ID,
  getContentZoomCssVariable,
  getContentZoomDeclaration,
  getContentZoomKind,
} from './content-zoom.model';

describe('content-zoom.model', () => {
  it('declares every first-party zoomable web view type with its kind and default area', () => {
    const declared = Object.fromEntries(CONTENT_ZOOM_DECLARATION_BY_WEB_VIEW_TYPE);
    expect(declared).toEqual({
      [SCRIPTURE_EDITOR_WEBVIEW_TYPE]: { kind: 'editor', defaultArea: 'main' },
      'platformEnhancedResources.enhancedResource': { kind: 'resource', defaultArea: 'main' },
      'platformScriptureEditor.scriptureTextGrid': {
        kind: 'resource',
        defaultArea: 'text-collection',
      },
      'platformScriptureEditor.modelText': { kind: 'resource', defaultArea: 'model-text' },
      'platformScriptureEditor.bibleTexts': { kind: 'resource', defaultArea: 'bible-texts' },
      'platformScriptureEditor.commentaries': { kind: 'resource', defaultArea: 'commentaries' },
      'legacyCommentManager.commentList': { kind: 'notes', defaultArea: 'main' },
      'legacyCommentManager.commentListPanel': { kind: 'notes', defaultArea: 'main' },
      'platformScripture.find': { kind: 'find', defaultArea: 'main' },
      'platformScripture.characterInventory': { kind: 'inventory', defaultArea: 'main' },
      'platformScripture.repeatedWordsInventory': { kind: 'inventory', defaultArea: 'main' },
      'platformScripture.markersInventory': { kind: 'inventory', defaultArea: 'main' },
      'platformScripture.punctuationInventory': { kind: 'inventory', defaultArea: 'main' },
      'platformScripture.checksSidePanel': { kind: 'checks', defaultArea: 'main' },
      'platformScripture.markersChecklist': { kind: 'checklist', defaultArea: 'main' },
      'paratextBibleWordList.react': { kind: 'word-list', defaultArea: 'main' },
      'paratextBibleSendReceive.compareVersions': { kind: 'compare-versions', defaultArea: 'main' },
      'platformLexicalTools.dictionary': { kind: 'dictionary', defaultArea: 'main' },
    });
  });

  it('gives every declaration a default area the platform accepts', () => {
    CONTENT_ZOOM_DECLARATION_BY_WEB_VIEW_TYPE.forEach(({ defaultArea }) => {
      expect(isValidContentZoomAreaId(defaultArea)).toBe(true);
    });
  });

  it('reads a declaration and its kind by web view type, and nothing for an undeclared type', () => {
    expect(getContentZoomDeclaration('platformScripture.find')).toEqual({
      kind: 'find',
      defaultArea: 'main',
    });
    expect(getContentZoomKind('platformScriptureEditor.modelText')).toBe('resource');
    expect(getContentZoomDeclaration('platformGetResources.home')).toBeUndefined();
    expect(getContentZoomKind('platformGetResources.home')).toBeUndefined();
  });

  it('exposes stable names used by the bootstrap and the views', () => {
    expect(CONTENT_ZOOM_LEVELS_STATE_KEY).toBe('platform.contentZoomLevels');
    expect(CONTENT_ZOOM_IDENTITY_STATE_KEY).toBe('platform.contentZoomIdentity');
    expect(CONTENT_ZOOM_CSS_VARIABLE_PREFIX).toBe('--platform-content-zoom-');
    expect(CONTENT_ZOOM_DEFAULT_CSS_VARIABLE).toBe('--platform-content-zoom-default');
    expect(getContentZoomCssVariable('footnotes')).toBe('--platform-content-zoom-footnotes');
    expect(CONTENT_ZOOM_ROOT_ATTRIBUTE).toBe('data-platform-content-zoom-root');
    expect(CONTENT_ZOOM_STYLE_ELEMENT_ID).toBe('platform-content-zoom-styles');
    expect(CONTENT_ZOOM_COMMANDS.in).toBe('platform.webViewContentZoomIn');
    expect(CONTENT_ZOOM_COMMANDS.out).toBe('platform.webViewContentZoomOut');
    expect(CONTENT_ZOOM_COMMANDS.reset).toBe('platform.webViewContentZoomReset');
  });

  it('names the main area with the empty value, its id, and the "true" React writes for a bare JSX prop', () => {
    expect(CONTENT_ZOOM_MAIN_AREA_ATTRIBUTE_VALUES).toEqual(['', 'main', 'true']);
  });

  it('keeps the library marker attribute equal to the platform constant', () => {
    expect(LIBRARY_CONTENT_ZOOM_ROOT_ATTRIBUTE).toBe(CONTENT_ZOOM_ROOT_ATTRIBUTE);
  });
});
