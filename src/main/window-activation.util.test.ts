import { describe, expect, test } from 'vitest';
import {
  forgetWindowWithholding,
  noteWindowWithheldFromActivation,
  planWindowActivation,
  shouldContentAvoidDocumentFocus,
  shouldRevealAfterLoadFailure,
  shouldRevealAfterRendererGone,
} from '@main/window-activation.util';

describe('planWindowActivation', () => {
  test('a window a person asked for shows itself and takes the foreground', () => {
    const plan = planWindowActivation(true);

    expect(plan.showOnCreate).toBe(true);
    expect(plan.revealWhenReady).toBe('activate');
  });

  test('a window nobody asked for appears without taking the foreground', () => {
    // The case this exists for: an extension opening a window, or a web view moving into a new
    // one, while the user is working somewhere else. It must appear — it is real, and its content
    // is on its way — but it must not pull the user out of what they are doing.
    const plan = planWindowActivation(false);

    expect(plan.showOnCreate).toBe(false);
    expect(plan.revealWhenReady).toBe('inactive');
  });

  test('withholding the constructor’s show always carries a fallback for a load that fails', () => {
    // The hazard that makes this a plan rather than a boolean. A window created with `show: false`
    // is revealed by `ready-to-show`, and a page that fails to load never gets there — the failure
    // handler only logs. Without a fallback that window would exist, tracked and routable, and
    // never appear at all: worse than the badly-timed foreground this whole feature avoids.
    //
    // Asserted over every plan rather than the one that happens to withhold today, so a later plan
    // cannot withhold `show` without answering the question.
    const withheldPlans = [true, false]
      .map(planWindowActivation)
      .filter((plan) => !plan.showOnCreate);

    // The rule governs something: without this, a future where nothing withholds would satisfy the
    // assertion below by having nothing to assert against.
    expect(withheldPlans.length).toBeGreaterThan(0);
    withheldPlans.forEach((plan) => expect(plan.revealAfterLoadFailure).toBe('inactive'));
  });

  test('a window that shows itself needs no failure fallback', () => {
    // The positive control for the rule above: it must not pass by every plan withholding nothing.
    expect(planWindowActivation(true).showOnCreate).toBe(true);
    expect(planWindowActivation(true).revealAfterLoadFailure).toBeUndefined();
  });
});

describe('whether content must avoid taking document focus', () => {
  // Ids are per-test so nothing leaks between them, since the set is module state.
  let nextWindowId = 1000;
  function freshWindowId(): number {
    nextWindowId += 1;
    return nextWindowId;
  }

  test('a window nobody asked for keeps content from taking focus', () => {
    const windowId = freshWindowId();
    noteWindowWithheldFromActivation(windowId);

    expect(shouldContentAvoidDocumentFocus(windowId)).toBe(true);
  });

  test('a window the user asked for lets content take focus', () => {
    // The positive control: without this, the rule would be satisfied by always answering true.
    expect(shouldContentAvoidDocumentFocus(freshWindowId())).toBe(false);
  });

  test('activation ends the withholding, so later content lands focused', () => {
    const windowId = freshWindowId();
    noteWindowWithheldFromActivation(windowId);
    forgetWindowWithholding(windowId);

    expect(shouldContentAvoidDocumentFocus(windowId)).toBe(false);
  });

  test('one window being withheld says nothing about another', () => {
    const withheld = freshWindowId();
    const ordinary = freshWindowId();
    noteWindowWithheldFromActivation(withheld);

    expect(shouldContentAvoidDocumentFocus(withheld)).toBe(true);
    expect(shouldContentAvoidDocumentFocus(ordinary)).toBe(false);
  });
});

describe('revealing a window that failed before it could paint', () => {
  const withheld = planWindowActivation(false);
  const asked = planWindowActivation(true);

  test('reveals a withheld window whose page genuinely failed to load', () => {
    expect(shouldRevealAfterLoadFailure(withheld, { isMainFrame: true, errorCode: -105 })).toBe(
      true,
    );
  });

  test('leaves a sub-frame failure alone, since the window itself is still on its way', () => {
    // Every web view is an in-page iframe of this window's page, so one web view failing to load
    // says nothing about whether the window will reach `ready-to-show`. Revealing then would show
    // it before it can paint, which is what withholding `show` exists to prevent.
    expect(shouldRevealAfterLoadFailure(withheld, { isMainFrame: false, errorCode: -105 })).toBe(
      false,
    );
  });

  test('leaves an aborted navigation alone, since the page is still coming', () => {
    // A main-frame navigation that was superseded or cancelled reports ERR_ABORTED. Nothing failed
    // to arrive, so revealing would be the same premature reveal by another route.
    expect(shouldRevealAfterLoadFailure(withheld, { isMainFrame: true, errorCode: -3 })).toBe(
      false,
    );
  });

  test('does nothing for a window that showed itself', () => {
    // The positive control for all three above: a window the constructor already showed has
    // nothing to reveal, so the rule must not be answering `true` for everything.
    expect(shouldRevealAfterLoadFailure(asked, { isMainFrame: true, errorCode: -105 })).toBe(false);
  });

  test('reveals a withheld window whose renderer died before it could paint', () => {
    // A renderer that dies before `ready-to-show` emits `render-process-gone` rather than
    // `did-fail-load`, and nothing else would ever reveal the window — it would stay tracked,
    // routable and invisible, which is the failure the reveal exists to prevent.
    expect(shouldRevealAfterRendererGone(withheld)).toBe(true);
  });

  test('does nothing when a window that showed itself loses its renderer', () => {
    expect(shouldRevealAfterRendererGone(asked)).toBe(false);
  });
});
