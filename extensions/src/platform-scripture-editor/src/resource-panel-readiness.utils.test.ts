import { describe, it, expect } from 'vitest';
import { getResourcePanelReadiness } from './resource-panel-readiness.utils';

describe('getResourcePanelReadiness', () => {
  it('reports loading while the configured list is still resolving', () => {
    expect(getResourcePanelReadiness('loading', true, 0, 0)).toBe('loading');
  });

  it('reports error when the configured list could not be read', () => {
    expect(getResourcePanelReadiness('error', true, 0, 0)).toBe('error');
  });

  it('reports loading while the catalog has not arrived and something is configured', () => {
    // The regression this guards: a configured DBL resource matches nothing until the catalog
    // lands, so deciding "empty" here showed a premature empty state for the whole fetch.
    expect(getResourcePanelReadiness('ready', false, 1, 0)).toBe('loading');
  });

  it('reports empty without waiting for the catalog when nothing is configured at all', () => {
    // Whether anything is configured does not depend on the catalog — only whether a configured
    // item matches this panel does. Spinning here would delay the pick prompt for no reason.
    expect(getResourcePanelReadiness('ready', false, 0, 0)).toBe('empty');
  });

  it('reports empty when the catalog has arrived and nothing matches this panel', () => {
    expect(getResourcePanelReadiness('ready', true, 1, 0)).toBe('empty');
  });

  it('reports configured when the resolved list has matching items', () => {
    expect(getResourcePanelReadiness('ready', true, 2, 2)).toBe('configured');
  });

  it('prefers the error over the pending catalog, so a read failure is never hidden by a spinner', () => {
    expect(getResourcePanelReadiness('error', false, 1, 0)).toBe('error');
  });
});
