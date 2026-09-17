import {
  CONTENT_ZOOM_AREA_ID_PATTERN,
  CONTENT_ZOOM_AREA_ID_PLACEHOLDER,
  CONTENT_ZOOM_CHORDS,
  CONTENT_ZOOM_COMMANDS,
  CONTENT_ZOOM_DEFAULT_CSS_VARIABLE,
  CONTENT_ZOOM_MAIN_AREA_ATTRIBUTE_VALUES,
  CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE,
  CONTENT_ZOOM_ROOT_ATTRIBUTE,
  CONTENT_ZOOM_STYLE_ELEMENT_ID,
  CONTENT_ZOOM_UNNESTED_CLAUSE,
  DEFAULT_ZOOM_FACTOR,
  getContentZoomCssVariable,
  MAX_ZOOM_FACTOR,
  MIN_ZOOM_FACTOR,
  RESERVED_CONTENT_ZOOM_AREA_ID,
  ZOOM_STEP,
} from '@shared/models/content-zoom.model';
import { MAIN_CONTENT_ZOOM_AREA } from '@shared/models/web-view.model';
import { isValidContentZoomAreaId, isValidZoomFactor } from '@shared/utils/content-zoom.util';

const INDICATOR_ID = 'platform-content-zoom-indicator';
/** Id of the live region the indicator announces through, separate from the visible badge. */
const INDICATOR_STATUS_ID = 'platform-content-zoom-indicator-status';
const INDICATOR_VISIBLE_MS = 1100;
/**
 * Quiet time before the indicator's settled level reaches the live region: long enough that one
 * wheel gesture announces once, short enough to land well inside {@link INDICATOR_VISIBLE_MS}.
 */
const INDICATOR_ANNOUNCE_QUIET_MS = 500;
/**
 * How long a focus change may still count as the one a click itself caused (the view putting the
 * caret somewhere else in response to the click) rather than an unrelated focus move. See the
 * pointerdown/focusin listeners below for the gesture this bounds.
 */
const GESTURE_FOCUS_MS = 200;

/**
 * The rule that scales one zoom area: its own variable, else the default. The `main` area's rule
 * names every spelling of its marker — {@link CONTENT_ZOOM_MAIN_AREA_ATTRIBUTE_VALUES}: the empty
 * value a view writes when it names no area, the id itself, and the `"true"` React serializes a
 * bare JSX prop to — so that a marker carrying an id no rule was generated for (an invalid id, or
 * one this pane has neither a remembered level for nor the bootstrap accepted at runtime) is left
 * unscaled instead of quietly following `main`. The list is shared with the bootstrap's `idOf`, so
 * a spelling the report calls `main` is always a spelling this rule scales. Every clause also
 * carries {@link CONTENT_ZOOM_UNNESTED_CLAUSE}, so a marker nested inside another marker matches no
 * rule at all — the same marker the runtime `collectAreas` refuses to report, keeping the CSS and
 * the report in agreement about which markers are areas. Without that clause a nested marker would
 * match whenever its id also has a rule (always true for `main`/the empty value, and true for any
 * named id that is also a legitimate area elsewhere in the view), and CSS `zoom` compounds, so it
 * would scale by the product of its own area's factor and its ancestor area's while the report
 * never reflected that level. A named (non-`main`) area's rule comes from
 * {@link CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE}, the same template the bootstrap's own runtime
 * `ensureRule` substitutes into, so the two never spell a named area's rule differently.
 */
function areaRule(areaId: string): string {
  if (areaId === MAIN_CONTENT_ZOOM_AREA) {
    const selector = CONTENT_ZOOM_MAIN_AREA_ATTRIBUTE_VALUES.map(
      (value) => `[${CONTENT_ZOOM_ROOT_ATTRIBUTE}="${value}"]${CONTENT_ZOOM_UNNESTED_CLAUSE}`,
    ).join(',');
    return `${selector}{zoom:var(${getContentZoomCssVariable(areaId)},var(${CONTENT_ZOOM_DEFAULT_CSS_VARIABLE},1))}`;
  }
  return CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE.split(CONTENT_ZOOM_AREA_ID_PLACEHOLDER).join(areaId);
}

/**
 * The `<style>` element baked into a web view's head: the default and the pane's known levels (so
 * there is no 100 % → level flash), the base rule for the `main` area and a rule per known named
 * area. The bootstrap adds rules for named areas it discovers later. Levels arrive from stored
 * state and from the memory setting, so an id or a factor that no longer passes validation is
 * dropped here rather than written into the markup.
 */
export function getContentZoomStyleElement(
  nonce: string,
  defaultZoom: number,
  levels: { [areaId: string]: number },
): string {
  const areaIds = Object.keys(levels).filter(
    (areaId) => isValidContentZoomAreaId(areaId) && isValidZoomFactor(levels[areaId]),
  );
  const variables = [
    `${CONTENT_ZOOM_DEFAULT_CSS_VARIABLE}:${isValidZoomFactor(defaultZoom) ? defaultZoom : DEFAULT_ZOOM_FACTOR}`,
    ...areaIds.map((areaId) => `${getContentZoomCssVariable(areaId)}:${levels[areaId]}`),
  ].join(';');
  const rules = [
    areaRule(MAIN_CONTENT_ZOOM_AREA),
    ...areaIds
      .filter((areaId) => areaId !== MAIN_CONTENT_ZOOM_AREA)
      .map((areaId) => areaRule(areaId)),
  ].join(' ');
  return `<style nonce="${nonce}" id="${CONTENT_ZOOM_STYLE_ELEMENT_ID}">:root{${variables}} ${rules}</style>`;
}

/**
 * Escapes a `</` sequence so a value interpolated into {@link getContentZoomBootstrapScript}'s
 * source cannot close the `<script>` tag that source is injected into. The web view id is the only
 * free-form value interpolated there; every other interpolation in that script is a constant, a
 * validated area id, or a number.
 */
function escapeClosingTags(jsSourceLiteral: string): string {
  return jsSourceLiteral.replace(/<\//g, '<\\/');
}

/**
 * JavaScript run inside every non-URL web view (appended to the platform's import script). It
 * discovers the view's zoom areas, tracks the active one, turns Ctrl/⌘+`+`/`-`/`0` and Ctrl/⌘+wheel
 * into content-zoom actions for THIS web view and one of its areas, and provides the on-area
 * indicator. Bubble phase on purpose: a view that owns Ctrl+wheel for a sub-region (the Text
 * Collection grid's per-resource zoom) stops propagation in capture phase and this listener never
 * sees the event. A view without areas ignores the input.
 */
export function getContentZoomBootstrapScript(webViewId: string): string {
  const id = escapeClosingTags(JSON.stringify(webViewId));
  const attr = CONTENT_ZOOM_ROOT_ATTRIBUTE;
  const chords = JSON.stringify(
    CONTENT_ZOOM_CHORDS.map(({ action, command, keys, codes }) => ({
      action,
      command,
      keys,
      codes,
    })),
  );
  return `
  (() => {
    const webViewId = ${id};
    const ATTR = '${attr}';
    const MAIN = '${MAIN_CONTENT_ZOOM_AREA}';
    const AREA_ID = new RegExp(${JSON.stringify(CONTENT_ZOOM_AREA_ID_PATTERN.source)});
    const RESERVED_ID = ${JSON.stringify(RESERVED_CONTENT_ZOOM_AREA_ID)};
    // The reserved id is well-formed but names the pane-wide default variable, so an area of that
    // name would set the default for every other area instead of scaling itself.
    const isAreaId = (value) => AREA_ID.test(value) && value !== RESERVED_ID;
    const NAMED_AREA_RULE_TEMPLATE = ${JSON.stringify(CONTENT_ZOOM_NAMED_AREA_RULE_TEMPLATE)};
    const AREA_ID_PLACEHOLDER = ${JSON.stringify(CONTENT_ZOOM_AREA_ID_PLACEHOLDER)};
    const bind = (name) => (typeof window[name] === 'function' ? window[name] : undefined);
    // Hot path: the shard binds in-process functions for this web view (like the state helpers) so a
    // wheel burst does not make a network round trip per tick; the commands remain for the tab menu,
    // macOS and extensions. Fall back to the command when the bound function is absent.
    const boundAdjust = bind('adjustContentZoomById');
    const boundReset = bind('resetContentZoomById');
    const boundReportAreas = bind('reportContentZoomAreasById');
    const boundReportActive = bind('reportContentZoomActiveAreaById');

    // window.papi may not exist yet (or ever, for a view loaded before PAPI's import script runs) -
    // every access goes through these so a missing papi never throws out of an event handler.
    const getPapi = () => (window.papi && typeof window.papi === 'object' ? window.papi : undefined);
    const warnPapi = (message) => {
      const papi = getPapi();
      if (papi && papi.logger && typeof papi.logger.warn === 'function') papi.logger.warn(message);
    };
    const warned = new Set();
    const warnOnce = (message) => {
      if (warned.has(message)) return;
      warned.add(message);
      warnPapi('Content zoom: ' + message);
    };

    // Every spelling that names the main area. React serialises a bare \`data-*\` JSX prop as the
    // string "true", so a view that marks its main area the documented way arrives here spelled
    // that way rather than with an empty value; the same list builds the main area's CSS rule, so
    // the report and the stylesheet always agree. An area genuinely called "true" is not available.
    const MAIN_AREA_VALUES = ${JSON.stringify(CONTENT_ZOOM_MAIN_AREA_ATTRIBUTE_VALUES)};
    const idOf = (element) => {
      const value = element.getAttribute(ATTR);
      return value === null || MAIN_AREA_VALUES.indexOf(value) !== -1 ? MAIN : value;
    };
    // The area an element belongs to: its closest marked ancestor (itself included).
    const areaOf = (node) => {
      const element = node && node.nodeType === 1 ? node : node && node.parentElement;
      const marked = element && element.closest ? element.closest('[' + ATTR + ']') : undefined;
      return marked ? idOf(marked) : undefined;
    };

    let areas = [];
    let activeArea;
    const styleElement = () => document.getElementById('${CONTENT_ZOOM_STYLE_ELEMENT_ID}');
    // The main area's rule is always the style element's base rule; a named area's rule may already
    // be baked into the markup too (a pane reopening with a persisted per-area zoom level) - seed
    // those from the sheet before the first refresh so ensureRule below never inserts a second,
    // functionally-identical rule for one it did not itself insert. Only well-formed ids are
    // seeded, matching the rule that only an accepted area ever gets a rule of its own.
    const ruled = new Set([MAIN]);
    const seedRuled = () => {
      const element = styleElement();
      const sheet = element && element.sheet;
      if (!sheet) return;
      const prefix = '[' + ATTR + '="';
      Array.from(sheet.cssRules).forEach((rule) => {
        const text = rule.cssText || '';
        const start = text.indexOf(prefix);
        if (start === -1) return;
        const end = text.indexOf('"]', start);
        if (end === -1) return;
        const areaId = text.slice(start + prefix.length, end);
        if (isAreaId(areaId)) ruled.add(areaId);
      });
    };
    const ensureRule = (areaId) => {
      if (ruled.has(areaId)) return;
      const element = styleElement();
      const sheet = element && element.sheet;
      if (!sheet) return;
      sheet.insertRule(NAMED_AREA_RULE_TEMPLATE.split(AREA_ID_PLACEHOLDER).join(areaId), sheet.cssRules.length);
      ruled.add(areaId);
    };
    const collectAreas = () => {
      const found = [];
      document.querySelectorAll('[' + ATTR + ']').forEach((element) => {
        const areaId = idOf(element);
        if (!isAreaId(areaId)) { warnOnce('ignoring zoom area with invalid id "' + areaId + '"'); return; }
        if (element.parentElement && element.parentElement.closest('[' + ATTR + ']')) { warnOnce('ignoring nested zoom area "' + areaId + '"'); return; }
        if (found.indexOf(areaId) === -1) found.push(areaId);
      });
      return found;
    };
    const setActive = (areaId) => {
      // Only an area this pane reported can become active: a click or focus inside a marker
      // collectAreas rejected (nested, or an ill-formed id) still resolves to that marker's id, and
      // an active area the parent has no record of is a silent no-op for every later action.
      if (!areaId || areaId === activeArea || areas.indexOf(areaId) === -1) return;
      if (!callBound(boundReportActive, 'reporting the active zoom area', areaId)) return;
      activeArea = areaId;
    };
    // A MutationObserver callback already runs as a microtask after its batch of synchronous DOM
    // changes, well before the next paint - refreshing straight from it (no rAF hop) is what lets the
    // parent clear a hidden whole-iframe fallback zoom before the view is ever shown at the wrong scale.
    let reported = false;
    const refresh = () => {
      const next = collectAreas();
      // Rules are ensured before the report: a rule for an area the parent has no record of reads
      // the pane-wide default variable, so it scales nothing on its own.
      next.forEach(ensureRule);
      if (!reported || next.join('\\n') !== areas.join('\\n')) {
        // The list counts as reported only once the parent has taken it, so a report that throws is
        // retried on the next mutation instead of leaving the pane unzoomable for its whole life.
        if (callBound(boundReportAreas, 'reporting the zoom areas', next.slice())) {
          areas = next;
          reported = true;
          syncWheelListener();
        }
      }
      if (!activeArea || areas.indexOf(activeArea) === -1) setActive(areas[0]);
    };
    // The badge and live region live in this document, so writing their text is itself a
    // childList mutation; a zoom step would otherwise pay for a second full-document scan.
    const isIndicatorRecord = (record) =>
      (badge && badge.contains(record.target)) || (liveRegion && liveRegion.contains(record.target));
    const carriesMarker = (node) =>
      node.nodeType === 1 && (node.matches('[' + ATTR + ']') || !!node.querySelector('[' + ATTR + ']'));
    const someCarriesMarker = (nodes) => Array.prototype.some.call(nodes, carriesMarker);
    // Only a record that carries a marker can change the area list: an added or removed node that is
    // one or contains one, or a change to the marker attribute itself, which is the only attribute
    // this observer is given. Typing in a view moves text nodes and unmarked elements, so without
    // this the editor would pay for a whole-document scan per keystroke. A removed node's subtree is
    // intact and queryable while the record holds it, so a marker removed inside a larger subtree is
    // seen too; nesting needs no case of its own, because any change to a marker's marked ancestry
    // is itself the addition, removal or retitling of a marker. A marker inside a shadow root is
    // still invisible here, as it was before, since the observer does not traverse shadow trees.
    const isAreaRecord = (record) => {
      if (isIndicatorRecord(record)) return false;
      // Until the parent has taken a report, every mutation is worth another try: that retry is the
      // only thing between a report that threw and a pane left unzoomable for its whole life, and
      // the DOM change that carries it across need not touch a marker.
      if (!reported) return true;
      if (record.type !== 'childList') return true;
      return someCarriesMarker(record.addedNodes) || someCarriesMarker(record.removedNodes);
    };
    let observer;
    const start = () => {
      // Ahead of the observer, so the two nodes it appends are not themselves a mutation to scan.
      ensureIndicatorElements();
      seedRuled();
      // Observing before the first scan is what makes the retry above reachable: a throw out of that
      // scan then still leaves the view watching for the DOM change that tries again.
      observer = new MutationObserver((records) => {
        if (records.some(isAreaRecord)) refresh();
      });
      observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: [ATTR] });
      refresh();
    };

    // Capture phase: the active area must update even when a descendant stops propagation before
    // the bubble phase (the same rule the wheel listener below is deliberately the exception to).
    // Every listener here is a named function so destroy() can take it off again.
    // A click and the focus change it causes are one gesture, and the pointer is what says which
    // area the user means: clicking a row in the Scripture editor's footnotes list makes the view
    // put the caret back in the editor text, so focus lands in another area milliseconds after the
    // pointer went down in this one. A focus change with no pointer gesture behind it - the caret
    // reaching a footnote by keyboard, or a view focusing a pane by itself - still names the active
    // area, which is why the gesture's reach is bounded rather than the focus listener simply
    // deferring to the pointer one. One click may suppress at most one focus change into a
    // DIFFERENT area: the recorded area is cleared only when such a change is actually suppressed,
    // so a later, unrelated focus move within the same window is never mistaken for the click's
    // own. A focus change that settles inside the clicked area itself (the footnote row taking
    // focus a few milliseconds after the pointer went down on its caller, before the view moves
    // focus again) is neither suppressed nor spends the gesture - it is not the click's own move
    // into another area, and the click's protection stays live for the one that follows. A focus
    // change that lands outside every area works the same way: there is no area to protect, so it
    // is not suppressed, but nothing was spent either, and the gesture still protects the next
    // change into a different area. A Tab ends the gesture outright: the focus move that follows it
    // is one the user asked for, not the view's answer to the click, and a user who clicks a
    // footnote row and immediately Tabs toward the text means the text. Only Tab, not any key - a
    // zoom chord pressed inside the window is exactly what the protection is for.
    let pointerArea;
    let pointerTime = 0;
    const onPointerDown = (e) => {
      const areaId = areaOf(e.target);
      // Recorded only when the id is one setActive would actually accept, and only for the primary
      // button - a click the pane never reported an area for (nested, ill-formed, or outside every
      // marker), and a right- or middle-click, which opens a menu and moves no caret, have no focus
      // change of their own to protect, so they must not arm a suppression window either. Both
      // still say which area the user is pointing at, so both still set it active.
      const arms = e.button === 0 && areaId !== undefined && areas.indexOf(areaId) !== -1;
      pointerArea = arms ? areaId : undefined;
      // The monotonic clock, so a backward system-clock step cannot make a gesture look fresh
      // forever.
      pointerTime = performance.now();
      setActive(areaId);
    };
    const onFocusIn = (e) => {
      const areaId = areaOf(e.target);
      const suppress =
        pointerArea !== undefined &&
        areaId !== undefined &&
        areaId !== pointerArea &&
        performance.now() - pointerTime < ${GESTURE_FOCUS_MS};
      if (suppress) {
        pointerArea = undefined;
        return;
      }
      setActive(areaId);
    };
    const onGestureKeyDown = (e) => {
      if (e.key === 'Tab') pointerArea = undefined;
    };
    window.addEventListener('pointerdown', onPointerDown, true);
    window.addEventListener('focusin', onFocusIn, true);
    window.addEventListener('keydown', onGestureKeyDown, true);

    const targetFor = (node) => {
      if (areas.length === 0) return undefined;
      const hit = areaOf(node);
      return hit && areas.indexOf(hit) !== -1 ? hit : (activeArea || areas[0]);
    };
    // One bound helper is one call into the parent's realm, and it can throw (the parent reaches the
    // dock layout and a non-isolated emitter from there). The return value is what lets a caller
    // hold back its own bookkeeping until the parent has really taken the value.
    const callBound = (fn, what, value) => {
      if (!fn) return true;
      try {
        fn(webViewId, value);
        return true;
      } catch (e) {
        warnOnce(what + ' failed: ' + (e && e.message ? e.message : e));
        return false;
      }
    };
    const act = (command, areaId) => {
      try {
        if (command === '${CONTENT_ZOOM_COMMANDS.reset}' && boundReset) { boundReset(webViewId, areaId); return; }
        if (command === '${CONTENT_ZOOM_COMMANDS.in}' && boundAdjust) { boundAdjust(webViewId, 1, areaId); return; }
        if (command === '${CONTENT_ZOOM_COMMANDS.out}' && boundAdjust) { boundAdjust(webViewId, -1, areaId); return; }
        const papi = getPapi();
        if (!papi || !papi.commands || typeof papi.commands.sendCommand !== 'function') {
          warnPapi('Content zoom command ' + command + ' could not run: papi is unavailable');
          return;
        }
        papi.commands.sendCommand(command, webViewId, areaId).catch((e) => {
          warnPapi('Content zoom command ' + command + ' failed: ' + (e && e.message ? e.message : e));
        });
      } catch (e) {
        warnPapi('Content zoom command ' + command + ' threw: ' + (e && e.message ? e.message : e));
      }
    };
    // The zoom chords, baked in from CONTENT_ZOOM_CHORDS in content-zoom.model.ts. This script runs
    // as injected text inside the web view, so it cannot import that module - it gets the table
    // serialized into the script text as the script is generated, the same way the injected
    // stylesheet's rule template travels here. The macOS menu half is dropped: a web view has no
    // menu. The modifier rule is the one chord rule stated in both places, because it is two
    // booleans; Shift is accepted for every action, since on AZERTY and Czech layouts the top-row 0
    // and - are shifted keys.
    const CHORDS = ${chords};
    const hasModifier = (e) => (e.ctrlKey || e.metaKey) && !e.altKey;
    const chordFor = (e) => {
      for (let i = 0; i < CHORDS.length; i += 1) {
        const chord = CHORDS[i];
        if (chord.keys.indexOf(e.key) !== -1) return chord;
        for (let j = 0; j < chord.codes.length; j += 1) {
          const entry = chord.codes[j];
          if (entry.code === e.code && (!entry.requiredKey || entry.requiredKey === e.key)) return chord;
        }
      }
      return undefined;
    };

    const onKeyDown = (e) => {
      if (!hasModifier(e)) return;
      const chord = chordFor(e);
      if (!chord) return;
      const areaId = targetFor(document.activeElement);
      if (!areaId) return;
      e.preventDefault();
      act(chord.command, areaId);
    };
    window.addEventListener('keydown', onKeyDown);

    // A wheel is counted in TICKS, the way Chromium's own page zoom counts them
    // (\`WebContentsImpl::HandleWheelEvent\` adds each event's \`wheel_ticks_y\` to
    // \`zoom_scroll_remainder_\`, rounds the whole ticks off it and carries the rest, with no timer
    // anywhere). One mouse notch is 120 units of the non-standard \`wheelDeltaY\` on every platform,
    // while the PIXELS a notch carries are a system setting - about 100 on Windows at its default
    // of three lines, 33 with that setting at one line, 120 on Linux, and as few as 4 on macOS - so
    // a pixel threshold zooms at a different speed on each of them and stops responding altogether
    // on the smallest. \`wheelDeltaY\` is Chromium's own and absent elsewhere; there the pixel delta
    // stands in at the 100 px per tick that \`deltaMode\` 0 is defined around.
    const WHEEL_TICK_DELTA = 120;
    const WHEEL_FALLBACK_TICK_PIXELS = 100;
    // The zoom range measured in steps: however large one delta is, a single event can never ask
    // for more steps than would take an area from one end of its range to the other.
    const WHEEL_MAX_STEPS = ${Math.ceil((MAX_ZOOM_FACTOR - MIN_ZOOM_FACTOR) / ZOOM_STEP)};
    const ticksOf = (e) => {
      const wheelDelta = e.wheelDeltaY;
      return typeof wheelDelta === 'number' && Number.isFinite(wheelDelta)
        ? -wheelDelta / WHEEL_TICK_DELTA
        : e.deltaY / WHEEL_FALLBACK_TICK_PIXELS;
    };
    // Chromium takes the whole ticks with \`std::lround\`, which rounds a half AWAY from zero;
    // JavaScript's \`Math.round\` rounds it toward positive infinity, which would zoom out on half a
    // tick while zooming in still wanted a whole one.
    const wholeTicks = (value) => (value < 0 ? -Math.round(-value) : Math.round(value));
    let wheelRemainder = 0;
    let wheelArea;
    let wheelDirection = 0;

    const stepArea = (steps, areaId) => {
      const command = steps < 0 ? '${CONTENT_ZOOM_COMMANDS.in}' : '${CONTENT_ZOOM_COMMANDS.out}';
      const count = Math.min(Math.abs(steps), WHEEL_MAX_STEPS);
      // Sequential calls compound as intended: each one writes the pane's pending level before the
      // next reads it, so n steps of travel move the area n steps.
      for (let step = 0; step < count; step += 1) act(command, areaId);
    };

    // A trackpad pinch never reaches a document as a gesture of its own: Chromium's touchpad pinch
    // event queue (\`touchpad_pinch_event_queue.cc\`) synthesizes one as ctrl+wheel with
    // \`deltaMode\` 0, no horizontal component, a tick of exactly ±1 and
    // \`deltaY = -100·ln(scale)\`. Counted as ticks that would be a full zoom step per frame, so a
    // pinch is recognised BEFORE the tick path and measured as travel through the zoom scale
    // instead, the way pdf.js separates the two (\`isPinchToZoom\` in its \`web/app.js\`).
    //
    // Nothing in the event marks it as synthetic, and no single frame is decisive either, because
    // two different things are being told apart at once. A frame is read as a pinch when it is
    // SMALL enough to be a fraction of a scale change rather than a whole notch - which is what
    // opens a gesture - or when the gesture it belongs to is still RUNNING. The second half is not
    // a refinement: \`deltaY\` is unclamped, so a pinch that doubles in a fifth of a second carries
    // about 6 px a frame, well past any size window narrow enough to keep a macOS mouse notch
    // (≈4 px) out of it. Judged frame by frame, the brisk middle of every pinch would fall to the
    // tick path at a full step each, so the faster the gesture the coarser it would respond.
    //
    // Misreading a gesture changes its speed, never silences it: notches read as a pinch need two
    // or three of them per step, pinch frames read as notches zoom a step per frame, and both
    // paths stay inside the range cap.
    const PINCH_SCALE_PIXELS = 100;
    // How far \`exp(-deltaY / 100)\` may sit from 1 and still OPEN a pinch rather than be a wheel
    // notch. A notch clears it on every platform but macOS, where the physical-modifier test is
    // what tells the two apart.
    const PINCH_MAX_SCALE_DEVIATION = 0.05;
    // How long a pinch's classification survives its last frame. A pinch is a stream at the
    // display's refresh rate, so anything arriving within this window is the same gesture; a
    // deliberate second mouse notch never lands inside it.
    const PINCH_LATCH_MS = 100;
    // The travel one zoom step is worth, as an approximation calibrated at 100 %: there a step of
    // {@link ZOOM_STEP} is 10 % of scale, and scale is exponential in the travel, so it is
    // ln(1.1)·100 ≈ 9.53 px of pinch. A step is ADDITIVE (\`adjustZoomFactor\` adds the step to the
    // factor), so it is a smaller share of scale the further in the area is zoomed and a larger one
    // the further out; deriving the travel per level would need the area's current level, which
    // lives in the parent and never reaches this script. So the content tracks the fingers exactly
    // at 100 %, outruns them below it and lags them above it - a pinch that is slightly off pace,
    // never one that stops or runs away.
    const PINCH_STEP_PIXELS = Math.log(1 + ${ZOOM_STEP}) * PINCH_SCALE_PIXELS;
    let pinchTravel = 0;
    let pinchArea;
    let pinchDirection = 0;
    // When the last frame of a pinch arrived. Starts out of reach of every clock reading, so the
    // first frame of a pane's life is judged on its size alone.
    let pinchLatchTime = -Infinity;

    // Which modifier keys are PHYSICALLY down - the thing a synthesized pinch's \`ctrlKey\` is not.
    // Two sources feed it, because neither sees the whole picture on its own:
    //
    // - Key events, in capture phase so a view that stops them from propagating cannot strand a
    //   flag. This bootstrap runs inside the web view's iframe, so these only arrive while that
    //   iframe has focus.
    // - Pointer events, which arrive by hit test rather than by focus, and whose own \`ctrlKey\` and
    //   \`metaKey\` report the real physical state. Chromium synthesizes no pointer event for a
    //   pinch - a pinch moves no cursor - so the last one seen is always from before the gesture.
    //   Without them, Ctrl held while another pane has the focus and the wheel turned over THIS one
    //   arrives with nothing seen, and a macOS notch is small enough to be read as a pinch.
    //
    // The two are kept apart because they expire differently. A key event stands until its own
    // keyup, which is the event that ends it. A pointer reading is only ever evidence of the moment
    // it was taken: the key can be released with no keyup this iframe sees and the cursor never
    // moving again, and then nothing can correct it - so a pointer reading is trusted for a bounded
    // time and the pane falls back to what the key events know. A modifier held while the window
    // loses focus or visibility has its keyup delivered to somebody else, so both are cleared there
    // too. Every flag left standing sends later pinches down the notch path at a step a frame.
    const PHYSICAL_MODIFIER_KEYS = ['Control', 'Meta'];
    // Long enough for the gesture a pointer reading was taken for - a user who moves the mouse with
    // Ctrl held is about to turn the wheel - and short next to the life of a pane.
    const POINTER_MODIFIER_TRUST_MS = 2000;
    const physicalModifiers = new Set();
    const pointerModifiers = new Set();
    let pointerModifiersTime = -Infinity;
    const anyPhysicalModifier = (now) =>
      physicalModifiers.size > 0 ||
      (pointerModifiers.size > 0 && now - pointerModifiersTime < POINTER_MODIFIER_TRUST_MS);
    const onModifierKeyDown = (e) => {
      if (PHYSICAL_MODIFIER_KEYS.indexOf(e.key) !== -1) physicalModifiers.add(e.key);
    };
    // A keyup is the event that ends a key, so it overrules a pointer reading taken while the key
    // was still down rather than waiting for that to go stale - a pinch moves no cursor, so nothing
    // else would correct it inside the trust window.
    const onModifierKeyUp = (e) => {
      if (PHYSICAL_MODIFIER_KEYS.indexOf(e.key) === -1) return;
      physicalModifiers.delete(e.key);
      pointerModifiers.delete(e.key);
    };
    // A pointer event states both flags outright, so it REPLACES what is held rather than adding to
    // it: it is as much evidence that a key is up as that one is down, and it is the fresher
    // evidence, so a flag it reports as up clears what the key events recorded as well.
    const onPointerModifiers = (e) => {
      PHYSICAL_MODIFIER_KEYS.forEach((physicalKey) => {
        const down = physicalKey === 'Control' ? e.ctrlKey : e.metaKey;
        if (down) pointerModifiers.add(physicalKey);
        else {
          pointerModifiers.delete(physicalKey);
          physicalModifiers.delete(physicalKey);
        }
      });
      pointerModifiersTime = performance.now();
    };
    const onModifierLost = () => { physicalModifiers.clear(); pointerModifiers.clear(); };
    const onVisibilityChange = () => { if (document.hidden) onModifierLost(); };
    window.addEventListener('keydown', onModifierKeyDown, true);
    window.addEventListener('keyup', onModifierKeyUp, true);
    window.addEventListener('pointerdown', onPointerModifiers, true);
    window.addEventListener('pointermove', onPointerModifiers, true);
    window.addEventListener('blur', onModifierLost);
    document.addEventListener('visibilitychange', onVisibilityChange);

    const isPinchWheel = (e, areaId, now) =>
      // Chromium's synthesized pinch is ctrl+wheel on every platform, never meta+wheel, so ⌘+wheel
      // on a Mac is a mouse gesture however small its delta - the same test pdf.js makes.
      e.ctrlKey &&
      !anyPhysicalModifier(now) &&
      e.deltaMode === 0 &&
      e.deltaX === 0 &&
      (Math.abs(Math.exp(-e.deltaY / PINCH_SCALE_PIXELS) - 1) < PINCH_MAX_SCALE_DEVIATION ||
        // The running gesture belongs to the area it is running in: a gesture that lands somewhere
        // else is a new one, and starts on its own evidence however close behind it arrives.
        (areaId === pinchArea && now - pinchLatchTime < PINCH_LATCH_MS));

    const stepPinch = (e, areaId, now) => {
      // Travel only accumulates over one area and in one direction, so reversing a pinch does not
      // have to unwind what the other direction banked.
      const direction = e.deltaY < 0 ? -1 : 1;
      if (areaId !== pinchArea || direction !== pinchDirection) pinchTravel = 0;
      pinchArea = areaId;
      pinchDirection = direction;
      pinchTravel += e.deltaY;
      // Every frame renews the gesture, whether or not it crossed a step boundary: what the next
      // frame is asking is whether this pinch is still under way, not whether it has stepped.
      pinchLatchTime = now;
      const steps = Math.trunc(pinchTravel / PINCH_STEP_PIXELS);
      if (steps === 0) return;
      // Only the step boundaries actually crossed are consumed; the rest of the travel stays put,
      // which is what makes a slow pinch step steadily instead of losing part of every frame.
      pinchTravel -= steps * PINCH_STEP_PIXELS;
      stepArea(steps, areaId);
    };

    // Ctrl or the meta key, and neither Shift nor Alt: a shifted wheel is horizontal scroll on many
    // platforms, and Chromium and the OS give Ctrl+Alt+wheel its own meaning, so both pass through.
    const onWheel = (e) => {
      if (!hasModifier(e) || e.shiftKey) return;
      const areaId = targetFor(e.target);
      if (!areaId) return;
      // Cancelled for every modified wheel over an area, sub-threshold ones included: the events an
      // accumulator swallows would otherwise reach Chromium's own page zoom, and Chromium stops
      // honouring preventDefault for the remainder of a gesture whose first event went uncancelled
      // - which for a pinch is the smallest event of all.
      e.preventDefault();
      if (e.deltaY === 0) return;
      // Line and page delta modes carry small counts of lines or pages, which neither a tick count
      // nor a scale describes; such an event is one step in its direction and leaves the
      // accumulator alone.
      if (e.deltaMode !== 0) {
        act(e.deltaY < 0 ? '${CONTENT_ZOOM_COMMANDS.in}' : '${CONTENT_ZOOM_COMMANDS.out}', areaId);
        return;
      }
      const now = performance.now();
      if (isPinchWheel(e, areaId, now)) {
        stepPinch(e, areaId, now);
        return;
      }
      const ticks = ticksOf(e);
      if (ticks === 0) return;
      // Ticks only accumulate over one area and in one direction. The direction is the last event's,
      // not the remainder's: rounding leaves a remainder whose sign is regularly opposite to the
      // gesture it came from, and reading that as a reversal would throw the carry away every
      // second event.
      const direction = ticks < 0 ? -1 : 1;
      if (areaId !== wheelArea || direction !== wheelDirection) wheelRemainder = 0;
      wheelArea = areaId;
      wheelDirection = direction;
      wheelRemainder += ticks;
      const steps = wholeTicks(wheelRemainder);
      if (steps === 0) return;
      // Only the whole ticks are consumed; carrying the fraction is what lets a wheel whose notch
      // reports less than a full tick, or an engine that reports none, still step steadily.
      wheelRemainder -= steps;
      stepArea(steps, areaId);
    };
    // A non-passive listener is what lets this cancel the gesture, but it also means the compositor
    // consults the main thread for the first event of every scrolling sequence - a cost a pane with
    // no zoom area can never repay, since every gesture there ends in targetFor returning undefined.
    // So it is registered and removed on the 0 <-> n transition of the area list. It stays on the
    // window rather than moving to the marked roots, so a gesture outside every area still reaches
    // the fallback in targetFor.
    const WHEEL_OPTIONS = { passive: false };
    let wheelListening = false;
    const syncWheelListener = () => {
      const wanted = areas.length > 0;
      if (wanted === wheelListening) return;
      wheelListening = wanted;
      if (wanted) window.addEventListener('wheel', onWheel, WHEEL_OPTIONS);
      else window.removeEventListener('wheel', onWheel, WHEEL_OPTIONS);
    };

    // An area's own text direction, read off one of its marked elements (falling back to the
    // document's when the area currently has no elements) so a marker inside an otherwise-LTR
    // document (or vice versa) still anchors on its own inline-end, not the document's.
    const directionOf = (element) => {
      const style = window.getComputedStyle ? window.getComputedStyle(element) : undefined;
      return style && style.direction === 'rtl' ? 'rtl' : 'ltr';
    };
    // Top inline-end corner of the union of one area's elements, in viewport pixels: top-right for
    // an LTR area, top-left for an RTL one.
    const cornerOf = (areaId) => {
      let top = Infinity; let left = Infinity; let right = -Infinity; let anchor;
      document.querySelectorAll('[' + ATTR + ']').forEach((element) => {
        if (idOf(element) !== areaId) return;
        if (!anchor) anchor = element;
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) return;
        top = Math.min(top, rect.top); left = Math.min(left, rect.left); right = Math.max(right, rect.right);
      });
      const rtl = directionOf(anchor || document.documentElement) === 'rtl';
      if (top === Infinity) return rtl ? { top: 12, left: 16, rtl } : { top: 12, right: 16, rtl };
      const topOffset = Math.max(0, top) + 12;
      return rtl
        ? { top: topOffset, left: Math.max(0, left) + 16, rtl }
        : { top: topOffset, right: Math.max(0, window.innerWidth - right) + 16, rtl };
    };
    let hideTimer;
    let announceTimer;
    let placementFrame;
    let placementArea;
    let badge;
    let liveRegion;
    // Both nodes exist, and the live region is empty, from the moment the view's DOM is ready: a
    // live region that arrives in the same task as its first text is not announced at all by
    // Chromium with NVDA or JAWS, so the region has to be in the accessibility tree before any zoom
    // writes into it. Idempotent, and called from showIndicator as well as from start(), so a view
    // that replaces the body's children gets the nodes back.
    const ensureIndicatorElements = () => {
      if (!document.body) return;
      if (!badge || !document.body.contains(badge)) {
        badge = document.createElement('div');
        badge.id = '${INDICATOR_ID}';
        // The visible badge is not the live region: its text is rewritten on every wheel notch.
        // It starts transparent at the fallback corner, so the first show places it rather than it
        // appearing at the flow position.
        badge.setAttribute('aria-hidden', 'true');
        badge.style.cssText = 'position:fixed;top:12px;right:16px;z-index:2147483647;pointer-events:none;' +
          'padding:4px 10px;border-radius:6px;font:600 13px/1.4 system-ui,sans-serif;' +
          'background:var(--popover,#1c2321);color:var(--popover-foreground,#fff);' +
          'box-shadow:0 2px 8px rgba(0,0,0,.25);opacity:0';
        document.body.appendChild(badge);
      }
      if (!liveRegion || !document.body.contains(liveRegion)) {
        liveRegion = document.createElement('div');
        liveRegion.id = '${INDICATOR_STATUS_ID}';
        liveRegion.setAttribute('role', 'status');
        liveRegion.setAttribute('aria-live', 'polite');
        // Visually hidden rather than display:none or visibility:hidden, either of which would take
        // the region out of the accessibility tree along with its announcement.
        liveRegion.style.cssText = 'position:absolute;width:1px;height:1px;overflow:hidden;' +
          'clip:rect(0,0,0,0);white-space:nowrap';
        document.body.appendChild(liveRegion);
      }
    };
    // Placing the badge is the only part of a show that reads layout: cornerOf's rects and
    // directionOf's computed style, both of which force style and layout on the spot because the
    // zoom write that preceded them has just invalidated both. A wheel gesture delivers 50-120
    // notches a second and only the last one in a frame is ever painted, so a notch asks for a
    // placement instead of performing one: the request collapses into a single callback that runs
    // after the frame's own style and layout, with whichever area the burst settled on.
    const placeBadge = () => {
      placementFrame = undefined;
      const areaId = placementArea;
      placementArea = undefined;
      if (!badge || areaId === undefined) return;
      const corner = cornerOf(areaId);
      badge.style.top = corner.top + 'px';
      if (corner.rtl) {
        badge.style.left = corner.left + 'px';
        badge.style.right = '';
      } else {
        badge.style.right = corner.right + 'px';
        badge.style.left = '';
      }
    };
    const requestPlacement = (areaId) => {
      placementArea = areaId;
      // A realm without rAF (an unusual host, or a document that never animates) still gets a
      // placed badge; it just pays for it in the handler, as it did before.
      if (typeof window.requestAnimationFrame !== 'function') { placeBadge(); return; }
      if (placementFrame !== undefined) return;
      placementFrame = window.requestAnimationFrame(placeBadge);
    };
    const showIndicator = (areaId, text) => {
      ensureIndicatorElements();
      if (!badge) return;
      requestPlacement(areaId);
      badge.dataset.area = areaId;
      badge.textContent = text;
      // Reduced motion still hides the badge on schedule, as a hard cut instead of a fade (an
      // opacity-0 pointer-events:none box left in place would otherwise sit at the corner forever).
      // Computed fresh on every call so a badge element reused across shows picks up a live
      // preference change rather than the transition it was first created with.
      const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      badge.style.transition = reduce ? 'none' : 'opacity .25s ease';
      badge.style.opacity = '1';
      // The badge shows every step of a gesture; the live region only the value it settles on, so
      // one wheel sweep is one announcement rather than one per notch.
      if (announceTimer) clearTimeout(announceTimer);
      announceTimer = setTimeout(() => {
        announceTimer = undefined;
        if (liveRegion) liveRegion.textContent = text;
      }, ${INDICATOR_ANNOUNCE_QUIET_MS});
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(() => {
        hideTimer = undefined;
        if (badge) badge.style.opacity = '0';
        // A faded badge is still reachable by a screen reader's browse cursor, so the level leaves
        // the accessibility tree with the fade while the region keeps its place in it.
        if (liveRegion) liveRegion.textContent = '';
      }, ${INDICATOR_VISIBLE_MS});
    };
    // Unwinds everything this bootstrap put outside its own closure, so a host that replaces the
    // pane's content (or a test that installs a second bootstrap) leaves no observer, listener or
    // node of the old one behind.
    const destroy = () => {
      document.removeEventListener('DOMContentLoaded', start);
      window.removeEventListener('pointerdown', onPointerDown, true);
      window.removeEventListener('focusin', onFocusIn, true);
      window.removeEventListener('keydown', onGestureKeyDown, true);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keydown', onModifierKeyDown, true);
      window.removeEventListener('keyup', onModifierKeyUp, true);
      window.removeEventListener('pointerdown', onPointerModifiers, true);
      window.removeEventListener('pointermove', onPointerModifiers, true);
      window.removeEventListener('blur', onModifierLost);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (wheelListening) { window.removeEventListener('wheel', onWheel, WHEEL_OPTIONS); wheelListening = false; }
      if (observer) { observer.disconnect(); observer = undefined; }
      if (hideTimer) { clearTimeout(hideTimer); hideTimer = undefined; }
      if (announceTimer) { clearTimeout(announceTimer); announceTimer = undefined; }
      if (placementFrame !== undefined) {
        if (typeof window.cancelAnimationFrame === 'function') window.cancelAnimationFrame(placementFrame);
        placementFrame = undefined;
      }
      placementArea = undefined;
      if (badge && badge.parentNode) badge.parentNode.removeChild(badge);
      if (liveRegion && liveRegion.parentNode) liveRegion.parentNode.removeChild(liveRegion);
      badge = undefined;
      liveRegion = undefined;
      if (window.__platformContentZoom === api) window.__platformContentZoom = undefined;
    };
    const api = { showIndicator, destroy, get activeArea() { return activeArea; } };
    window.__platformContentZoom = api;

    // Last in the IIFE on purpose: the scan start() runs reaches the parent, and a throw there must
    // not cost the view its listeners or its api. Everything start() touches is initialised by now.
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
    else start();
  })();
  `;
}
