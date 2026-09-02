import { describe, expect, test } from 'vitest';
import {
  forgetWindowWithholding,
  noteWindowWithheldFromActivation,
  forgetWindowBounce,
  hasWindowBouncedFocusBack,
  noteWindowBouncedFocusBack,
  planWindowActivation,
  shouldBounceFocusBack,
  shouldContentAvoidDocumentFocus,
  shouldFlashOnReveal,
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
    expect(
      shouldRevealAfterLoadFailure(withheld, {
        isMainFrame: true,
        errorCode: -105,
        isAwaitingFirstActivation: true,
      }),
    ).toBe(true);
  });

  test('leaves a sub-frame failure alone, since the window itself is still on its way', () => {
    // Every web view is an in-page iframe of this window's page, so one web view failing to load
    // says nothing about whether the window will reach `ready-to-show`. Revealing then would show
    // it before it can paint, which is what withholding `show` exists to prevent.
    expect(
      shouldRevealAfterLoadFailure(withheld, {
        isMainFrame: false,
        errorCode: -105,
        isAwaitingFirstActivation: true,
      }),
    ).toBe(false);
  });

  test('leaves an aborted navigation alone, since the page is still coming', () => {
    // A main-frame navigation that was superseded or cancelled reports ERR_ABORTED. Nothing failed
    // to arrive, so revealing would be the same premature reveal by another route.
    expect(
      shouldRevealAfterLoadFailure(withheld, {
        isMainFrame: true,
        errorCode: -3,
        isAwaitingFirstActivation: true,
      }),
    ).toBe(false);
  });

  test('does nothing for a window that showed itself', () => {
    // The positive control for all three above: a window the constructor already showed has
    // nothing to reveal, so the rule must not be answering `true` for everything.
    expect(
      shouldRevealAfterLoadFailure(asked, {
        isMainFrame: true,
        errorCode: -105,
        isAwaitingFirstActivation: true,
      }),
    ).toBe(false);
  });

  test('reveals a withheld window whose renderer died before it could paint', () => {
    // A renderer that dies before `ready-to-show` emits `render-process-gone` rather than
    // `did-fail-load`, and nothing else would ever reveal the window — it would stay tracked,
    // routable and invisible, which is the failure the reveal exists to prevent.
    expect(shouldRevealAfterRendererGone(withheld, true)).toBe(true);
  });

  test('leaves a window the user has already seen where they put it', () => {
    // The window was created in the background, but the user has since activated it and put it
    // away. Bringing it back because its renderer died would undo that — the reveal is for a
    // window that has never been seen, not for every window that was once withheld.
    expect(
      shouldRevealAfterLoadFailure(withheld, {
        isMainFrame: true,
        errorCode: -105,
        isAwaitingFirstActivation: false,
      }),
    ).toBe(false);
    expect(shouldRevealAfterRendererGone(withheld, false)).toBe(false);
  });

  test('does nothing when a window that showed itself loses its renderer', () => {
    // Only the plan gate is turned off here: with `true` for the activation gate, this fails if the
    // plan check is dropped. Turning both off at once would pass without it.
    expect(shouldRevealAfterRendererGone(asked, true)).toBe(false);
  });
});

describe('flashing a withheld window’s frame to signal it exists', () => {
  test('flashes a window revealed without taking the foreground', () => {
    // `showInactive()` puts the window on screen without pulling focus, so the flash is the only
    // visible signal it exists at all.
    expect(shouldFlashOnReveal(planWindowActivation(false))).toBe(true);
  });

  test('does not flash a window that already has the foreground', () => {
    // The positive control: without this, the rule would be satisfied by flashing every window.
    expect(shouldFlashOnReveal(planWindowActivation(true))).toBe(false);
  });
});

describe('handing focus back when a withheld window takes it on its own', () => {
  // `showInactive()` does not keep this window in the background: the page takes focus itself when
  // it first paints, with no call from either process. Since the window cannot be stopped from
  // taking focus, focus is handed straight back to where the user was.
  test('hands focus back the first time a withheld window takes it unbidden', () => {
    expect(
      shouldBounceFocusBack({
        isAwaitingFirstActivation: true,
        hasAlreadyBouncedFocusBack: false,
        canReturnFocusElsewhere: true,
        isWithinSelfFocusWindow: true,
        wasApplicationFocusedBeforeReveal: true,
      }),
    ).toBe(true);
  });

  test('does nothing when there is no other window to hand focus back to', () => {
    // The first window in the process can be a withheld one — an extension opening a web view
    // before any window has been restored. Routing then answers with this window itself, and
    // handing focus back to the window that has it would be a flash for no reason.
    expect(
      shouldBounceFocusBack({
        isAwaitingFirstActivation: true,
        hasAlreadyBouncedFocusBack: false,
        canReturnFocusElsewhere: false,
        isWithinSelfFocusWindow: true,
        wasApplicationFocusedBeforeReveal: true,
      }),
    ).toBe(false);
  });

  test('leaves a window the user has activated alone', () => {
    // The gesture already ended the withholding, so this focus is the user's own doing.
    expect(
      shouldBounceFocusBack({
        isAwaitingFirstActivation: false,
        hasAlreadyBouncedFocusBack: false,
        canReturnFocusElsewhere: true,
        isWithinSelfFocusWindow: true,
        wasApplicationFocusedBeforeReveal: true,
      }),
    ).toBe(false);
  });

  test('leaves a focus that arrives after the page could have taken it', () => {
    // Outside the window in which the page takes focus for itself, a focus event is a person
    // clicking the window. Handing it back would undo their click and read as a window that
    // refuses to be entered — the failure this bound exists to prevent.
    expect(
      shouldBounceFocusBack({
        isAwaitingFirstActivation: true,
        hasAlreadyBouncedFocusBack: false,
        canReturnFocusElsewhere: true,
        isWithinSelfFocusWindow: false,
        wasApplicationFocusedBeforeReveal: true,
      }),
    ).toBe(false);
  });

  test('hands focus back at most once, so a user who returns to the window keeps it', () => {
    // Bouncing twice would be a window the user cannot get into: every attempt would throw them
    // out again.
    expect(
      shouldBounceFocusBack({
        isAwaitingFirstActivation: true,
        hasAlreadyBouncedFocusBack: true,
        canReturnFocusElsewhere: true,
        isWithinSelfFocusWindow: true,
        wasApplicationFocusedBeforeReveal: true,
      }),
    ).toBe(false);
  });

  test('does not raise one of our own windows over a foreign application', () => {
    // If nothing of ours held focus when this window was created, the user was elsewhere -- a
    // different application, or nothing of ours at all. Handing focus to the window that last
    // had it would raise one of our own windows over whatever the user is actually working in,
    // which is the same harm the withholding exists to prevent, aimed the other way.
    expect(
      shouldBounceFocusBack({
        isAwaitingFirstActivation: true,
        hasAlreadyBouncedFocusBack: false,
        canReturnFocusElsewhere: true,
        isWithinSelfFocusWindow: true,
        wasApplicationFocusedBeforeReveal: false,
      }),
    ).toBe(false);
  });
});

describe('remembering which windows have had their focus handed back', () => {
  // Untested, this latch fails in the worst direction: if recording a bounce did nothing, every
  // focus attempt on a withheld window would be handed back forever — "a window nobody can get
  // into", which is the hazard `shouldBounceFocusBack` exists to bound.
  let nextWindowId = 5000;
  function freshWindowId(): number {
    nextWindowId += 1;
    return nextWindowId;
  }

  test('a window that has not been handed back reports so', () => {
    expect(hasWindowBouncedFocusBack(freshWindowId())).toBe(false);
  });

  test('recording a hand-back is remembered', () => {
    const windowId = freshWindowId();
    noteWindowBouncedFocusBack(windowId);

    expect(hasWindowBouncedFocusBack(windowId)).toBe(true);
  });

  test('one window having been handed back says nothing about another', () => {
    const bounced = freshWindowId();
    const untouched = freshWindowId();
    noteWindowBouncedFocusBack(bounced);

    expect(hasWindowBouncedFocusBack(bounced)).toBe(true);
    expect(hasWindowBouncedFocusBack(untouched)).toBe(false);
  });

  test('a window that has gone away is forgotten', () => {
    const windowId = freshWindowId();
    noteWindowBouncedFocusBack(windowId);
    forgetWindowBounce(windowId);

    expect(hasWindowBouncedFocusBack(windowId)).toBe(false);
  });
});
