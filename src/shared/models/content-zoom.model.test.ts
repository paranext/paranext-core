import { describe, expect, it } from 'vitest';
import { SCRIPTURE_EDITOR_WEBVIEW_TYPE } from '@shared/models/web-view.model';
import {
  CONTENT_ZOOM_COMMANDS,
  CONTENT_ZOOM_CSS_VARIABLE_PREFIX,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_LEVELS_STATE_KEY,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  CONTENT_ZOOM_STYLE_ELEMENT_ID,
  getContentZoomCssVariable,
  getContentZoomKind,
} from './content-zoom.model';

describe('content-zoom.model', () => {
  it('maps first-party web view types to kinds', () => {
    expect(getContentZoomKind(SCRIPTURE_EDITOR_WEBVIEW_TYPE)).toBe('editor');
    expect(getContentZoomKind('platformEnhancedResources.enhancedResource')).toBe('resource');
    expect(getContentZoomKind('platformScriptureEditor.scriptureTextGrid')).toBe('resource');
    expect(getContentZoomKind('platformScriptureEditor.modelText')).toBe('resource');
    expect(getContentZoomKind('platformScriptureEditor.bibleTexts')).toBe('resource');
    expect(getContentZoomKind('platformScriptureEditor.commentaries')).toBe('resource');
    expect(getContentZoomKind('legacyCommentManager.commentList')).toBe('notes');
    expect(getContentZoomKind('legacyCommentManager.commentListPanel')).toBe('notes');
    expect(getContentZoomKind('platformGetResources.home')).toBeUndefined();
  });

  it('exposes stable names used by the bootstrap and the views', () => {
    expect(CONTENT_ZOOM_LEVELS_STATE_KEY).toBe('platform.contentZoomLevels');
    expect(CONTENT_ZOOM_CSS_VARIABLE_PREFIX).toBe('--platform-content-zoom-');
    expect(CONTENT_ZOOM_DEFAULT_CSS_VARIABLE).toBe('--platform-content-zoom-default');
    expect(getContentZoomCssVariable('footnotes')).toBe('--platform-content-zoom-footnotes');
    expect(CONTENT_ZOOM_ROOT_ATTRIBUTE).toBe('data-platform-content-zoom-root');
    expect(CONTENT_ZOOM_STYLE_ELEMENT_ID).toBe('platform-content-zoom-styles');
    expect(CONTENT_ZOOM_COMMANDS.in).toBe('platform.webViewContentZoomIn');
    expect(CONTENT_ZOOM_COMMANDS.out).toBe('platform.webViewContentZoomOut');
    expect(CONTENT_ZOOM_COMMANDS.reset).toBe('platform.webViewContentZoomReset');
  });
});
