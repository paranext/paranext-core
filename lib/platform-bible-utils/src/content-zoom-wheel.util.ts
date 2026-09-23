import { MAX_ZOOM_FACTOR, MIN_ZOOM_FACTOR, ZOOM_STEP } from './content-zoom.util';

/**
 * Reads a `WheelEvent` and answers how many content-zoom steps it means, telling a mouse notch from
 * a trackpad pinch. Both the platform's per-pane zoom and the Text Collection grid's per-resource
 * zoom read a wheel this way; the platform's copy is inlined in its injected bootstrap script,
 * which imports nothing, and a parity test keeps the two in step.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type ContentZoomWheelReader = {
  /**
   * How many zoom steps `event` means: positive zooms IN, negative zooms OUT, 0 means the event's
   * travel has not yet crossed a step boundary. `scopeId` is whatever opaque string the caller uses
   * to key its own zoomable region — a pane's zoom area for the platform, a resource id for the
   * Text Collection grid — and the reader resets its accumulated travel whenever it changes.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  read(event: WheelEvent, scopeId: string): number;

  /**
   * Removes every listener the reader installed to track physically-held modifier keys. A reader
   * with no window to listen on (see {@link ContentZoomWheelReaderOptions.window}) has nothing to
   * remove.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  dispose(): void;
};

/**
 * Options for {@link createContentZoomWheelReader}.
 *
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export type ContentZoomWheelReaderOptions = {
  /**
   * Largest number of steps one event may ask for. Default: the platform's 0.5–3.0 zoom range
   * expressed in units of the effective {@link ContentZoomWheelReaderOptions.zoomStep} (25 at the
   * default step of 0.1) — so overriding `zoomStep` scales this default with it.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  maxSteps?: number;

  /**
   * Zoom step the pinch calibration is derived from. Default 0.1. Must be a positive, finite
   * number; the reader does not validate it, and a zero or negative step yields a meaningless
   * calibration.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  zoomStep?: number;

  /**
   * Window the modifier listeners attach to. Default `globalThis.window`; tests pass jsdom's. When
   * neither exists (a reader created outside a DOM, such as under Node) the reader still reads
   * notch and pinch counts from the events it is handed — it just cannot tell a synthesized pinch
   * from a real one held down by a physically-pressed Ctrl or Cmd key.
   *
   * @experimental This property is unstable and may change shape or disappear without notice
   */
  window?: Window;
};

/**
 * A `WheelEvent` carrying Chromium's own non-standard `wheelDeltaY` — present on every wheel event
 * a real browser fires, but not declared on the DOM lib's `WheelEvent` type, and genuinely absent
 * on an engine that never sets it, which is exactly the case the fallback path below is for.
 */
type LegacyWheelEvent = WheelEvent & { wheelDeltaY?: number };

/**
 * Width of the platform's zoom range in factor units, sourced from {@link MIN_ZOOM_FACTOR} and
 * {@link MAX_ZOOM_FACTOR} — the one definition the platform's own content-zoom model re-exports. The
 * bootstrap script that scales a whole pane cannot reach this import, since it runs as injected
 * source text inside the web view rather than as a module, so it restates the same values there
 * instead.
 */
const ZOOM_RANGE_WIDTH = MAX_ZOOM_FACTOR - MIN_ZOOM_FACTOR;

/** Matches the platform's own default content-zoom step, {@link ZOOM_STEP}. */
const DEFAULT_ZOOM_STEP = ZOOM_STEP;

/**
 * Reads a `WheelEvent` and answers how many content-zoom steps it means, telling a mouse notch from
 * a trackpad pinch — see {@link ContentZoomWheelReader} for the full contract.
 *
 * Constructing a reader is itself a side effect: it immediately installs six listeners that track
 * physically-held modifier keys — `keydown`, `keyup`, `pointerdown`, `pointermove` and `blur` on
 * the window, and `visibilitychange` on its document — and they stay installed until
 * {@link ContentZoomWheelReader.dispose} is called. So construct the reader inside an effect and
 * call `dispose()` in that effect's cleanup, never during render or in `useMemo`, which have no
 * cleanup to call it from and run twice under React's StrictMode. A reader with no window to listen
 * on (see {@link ContentZoomWheelReaderOptions.window}) installs nothing.
 *
 * @param options Optional overrides for the step cap, the zoom step the pinch calibration is
 *   derived from, and the window the modifier listeners attach to
 * @returns A reader whose `read` turns wheel events into zoom steps and whose `dispose` removes the
 *   listeners construction installed
 * @experimental This export is unstable and may change shape or disappear without notice
 */
export function createContentZoomWheelReader(
  options: ContentZoomWheelReaderOptions = {},
): ContentZoomWheelReader {
  const zoomStep = options.zoomStep ?? DEFAULT_ZOOM_STEP;
  // However large one delta is, and however many notches one frame of a burst carries, a scope can
  // never be asked for more steps than would take it from one end of the platform's zoom range to
  // the other, expressed in units of the EFFECTIVE zoom step so overriding `zoomStep` scales this
  // default with it.
  const maxSteps = options.maxSteps ?? Math.ceil(ZOOM_RANGE_WIDTH / zoomStep);
  const win: Window | undefined = options.window ?? globalThis.window;

  // A wheel is counted in TICKS, the way Chromium's own page zoom counts them
  // (`WebContentsImpl::HandleWheelEvent` adds each event's `wheel_ticks_y` to
  // `zoom_scroll_remainder_`, rounds the whole ticks off it and carries the rest, with no timer
  // anywhere). One mouse notch is 120 units of the non-standard `wheelDeltaY` on every platform,
  // while the PIXELS a notch carries are a system setting - about 100 on Windows at its default
  // of three lines, 33 with that setting at one line, 120 on Linux, and as few as 4 on macOS - so
  // a pixel threshold zooms at a different speed on each of them and stops responding altogether
  // on the smallest. `wheelDeltaY` is Chromium's own and absent elsewhere; there the pixel delta
  // stands in at the 100 px per tick that `deltaMode` 0 is defined around. It stands in too when
  // `wheelDeltaY` is 0: that property is an integer rounded from the pixel delta, so a slow
  // two-finger scroll's sub-pixel frames all report 0 while their travel is real, and reading
  // them as 0 ticks would leave the gesture inert however long it runs.
  const WHEEL_TICK_DELTA = 120;
  const WHEEL_FALLBACK_TICK_PIXELS = 100;
  const ticksOf = (event: LegacyWheelEvent): number => {
    const { wheelDeltaY } = event;
    return typeof wheelDeltaY === 'number' && Number.isFinite(wheelDeltaY) && wheelDeltaY !== 0
      ? -wheelDeltaY / WHEEL_TICK_DELTA
      : event.deltaY / WHEEL_FALLBACK_TICK_PIXELS;
  };
  // Chromium takes the whole ticks with `std::lround`, which rounds a half AWAY from zero;
  // JavaScript's `Math.round` rounds it toward positive infinity, which would zoom out on half a
  // tick while zooming in still wanted a whole one.
  const wholeTicks = (value: number): number =>
    value < 0 ? -Math.round(-value) : Math.round(value);
  let wheelRemainder = 0;
  let wheelScope: string | undefined;
  let wheelDirection = 0;

  // A trackpad pinch never reaches a document as a gesture of its own: Chromium's touchpad pinch
  // event queue (`touchpad_pinch_event_queue.cc`) synthesizes one as ctrl+wheel with `deltaMode` 0,
  // no horizontal component, a tick of exactly ±1 and `deltaY = -100·ln(scale)`. Counted as ticks
  // that would be a full zoom step per frame, so a pinch is recognized BEFORE the tick path and
  // measured as travel through the zoom scale instead, the way pdf.js separates the two
  // (`isPinchToZoom` in its `web/app.js`).
  //
  // Nothing in the event marks it as synthetic, and no single frame is decisive either, because two
  // different things are being told apart at once. A frame is read as a pinch when it is SMALL
  // enough to be a fraction of a scale change rather than a whole notch - which is what opens a
  // gesture - or when the gesture it belongs to is still RUNNING. The second half is not a
  // refinement: `deltaY` is unclamped, so a pinch that doubles in a fifth of a second carries about
  // 6 px a frame, well past any size window narrow enough to keep a macOS mouse notch (≈4 px) out
  // of it. Judged frame by frame, the brisk middle of every pinch would fall to the tick path at a
  // full step each, so the faster the gesture the coarser it would respond.
  //
  // Misreading a gesture changes its speed, never silences it: notches read as a pinch need two or
  // three of them per step, pinch frames read as notches zoom a step per frame, and both paths stay
  // inside the range cap.
  const PINCH_SCALE_PIXELS = 100;
  // How far `exp(-deltaY / 100)` may sit from 1 and still OPEN a pinch rather than be a wheel
  // notch. A notch clears it on every platform but macOS, where the physical-modifier test is what
  // tells the two apart.
  const PINCH_MAX_SCALE_DEVIATION = 0.05;
  // How long a pinch's classification survives its last frame. A pinch is a stream at the display's
  // refresh rate, so anything arriving within this window is the same gesture; a deliberate second
  // mouse notch never lands inside it.
  const PINCH_LATCH_MS = 100;
  // The travel one zoom step is worth, as an approximation calibrated at 100 %: there a step of
  // `zoomStep` is 10 % of scale by default, and scale is exponential in the travel, so it is
  // ln(1.1)·100 ≈ 9.53 px of pinch. A step is ADDITIVE (the platform's `adjustZoomFactor` adds the
  // step to the factor), so it is a smaller share of scale the further in the scope is zoomed and a
  // larger one the further out; deriving the travel per level would need the scope's current level,
  // which this reader is never given. So the content tracks the fingers exactly at 100 %, outruns
  // them below it and lags them above it - a pinch that is slightly off pace, never one that stops
  // or runs away.
  const PINCH_STEP_PIXELS = Math.log(1 + zoomStep) * PINCH_SCALE_PIXELS;
  let pinchTravel = 0;
  let pinchScope: string | undefined;
  let pinchDirection = 0;
  // When the last frame of a pinch arrived. Starts out of reach of every clock reading, so the
  // first frame of a scope's life is judged on its size alone.
  let pinchLatchTime = -Infinity;

  // Which modifier keys are PHYSICALLY down - the thing a synthesized pinch's `ctrlKey` is not.
  // Two sources feed it, because neither sees the whole picture on its own:
  //
  // - Key events, in capture phase so a view that stops them from propagating cannot strand a flag.
  //   This runs inside a web view's iframe, so these only arrive while that iframe has focus.
  // - Pointer events, which arrive by hit test rather than by focus, and whose own `ctrlKey` and
  //   `metaKey` report the real physical state. Chromium synthesizes no pointer event for a pinch -
  //   a pinch moves no cursor - so the last one seen is always from before the gesture. Without
  //   them, Ctrl held while another pane has the focus and the wheel turned over THIS one arrives
  //   with nothing seen, and a macOS notch is small enough to be read as a pinch.
  //
  // The two are kept apart because they expire differently. A key event stands until its own keyup,
  // which is the event that ends it. A pointer reading is only ever evidence of the moment it was
  // taken: the key can be released with no keyup this iframe sees and the cursor never moving
  // again, and then nothing can correct it - so a pointer reading is trusted for a bounded time and
  // the reader falls back to what the key events know. A modifier held while the window loses focus
  // or visibility has its keyup delivered to somebody else, so both are cleared there too. Every
  // flag left standing sends later pinches down the notch path at a step a frame.
  const PHYSICAL_MODIFIER_KEYS: readonly string[] = ['Control', 'Meta'];
  // Long enough for the gesture a pointer reading was taken for - a user who moves the mouse with
  // Ctrl held is about to turn the wheel - and short next to the life of a reader.
  const POINTER_MODIFIER_TRUST_MS = 2000;
  const physicalModifiers = new Set<string>();
  const pointerModifiers = new Set<string>();
  let pointerModifiersTime = -Infinity;
  const anyPhysicalModifier = (now: number): boolean =>
    physicalModifiers.size > 0 ||
    (pointerModifiers.size > 0 && now - pointerModifiersTime < POINTER_MODIFIER_TRUST_MS);
  const onModifierKeyDown = (event: KeyboardEvent): void => {
    if (PHYSICAL_MODIFIER_KEYS.includes(event.key)) physicalModifiers.add(event.key);
  };
  // A keyup is the event that ends a key, so it overrules a pointer reading taken while the key was
  // still down rather than waiting for that to go stale - a pinch moves no cursor, so nothing else
  // would correct it inside the trust window.
  const onModifierKeyUp = (event: KeyboardEvent): void => {
    if (!PHYSICAL_MODIFIER_KEYS.includes(event.key)) return;
    physicalModifiers.delete(event.key);
    pointerModifiers.delete(event.key);
  };
  // A pointer event states both flags outright, so it REPLACES what is held rather than adding to
  // it: it is as much evidence that a key is up as that one is down, and it is the fresher evidence,
  // so a flag it reports as up clears what the key events recorded as well.
  const onPointerModifiers = (event: PointerEvent): void => {
    PHYSICAL_MODIFIER_KEYS.forEach((physicalKey) => {
      const down = physicalKey === 'Control' ? event.ctrlKey : event.metaKey;
      if (down) pointerModifiers.add(physicalKey);
      else {
        pointerModifiers.delete(physicalKey);
        physicalModifiers.delete(physicalKey);
      }
    });
    pointerModifiersTime = performance.now();
  };
  const onModifierLost = (): void => {
    physicalModifiers.clear();
    pointerModifiers.clear();
  };
  const onVisibilityChange = (): void => {
    if (win?.document.hidden) onModifierLost();
  };

  if (win) {
    win.addEventListener('keydown', onModifierKeyDown, true);
    win.addEventListener('keyup', onModifierKeyUp, true);
    win.addEventListener('pointerdown', onPointerModifiers, true);
    win.addEventListener('pointermove', onPointerModifiers, true);
    win.addEventListener('blur', onModifierLost);
    win.document.addEventListener('visibilitychange', onVisibilityChange);
  }

  const isPinchWheel = (event: WheelEvent, scopeId: string, now: number): boolean =>
    // Chromium's synthesized pinch is ctrl+wheel on every platform, never meta+wheel, so ⌘+wheel on
    // a Mac is a mouse gesture however small its delta - the same test pdf.js makes.
    event.ctrlKey &&
    !anyPhysicalModifier(now) &&
    event.deltaMode === 0 &&
    event.deltaX === 0 &&
    (Math.abs(Math.exp(-event.deltaY / PINCH_SCALE_PIXELS) - 1) < PINCH_MAX_SCALE_DEVIATION ||
      // The running gesture belongs to the scope it is running in: a gesture that lands somewhere
      // else is a new one, and starts on its own evidence however close behind it arrives.
      (scopeId === pinchScope && now - pinchLatchTime < PINCH_LATCH_MS));

  // however large the accumulated travel, the step count handed back never exceeds `maxSteps` -
  // matching the platform's own clamp on the number of times it repeats its zoom command.
  const clampSteps = (steps: number): number =>
    steps < 0 ? -Math.min(-steps, maxSteps) : Math.min(steps, maxSteps);

  const stepPinch = (event: WheelEvent, scopeId: string, now: number): number => {
    // Travel only accumulates over one scope and in one direction, so reversing a pinch does not
    // have to unwind what the other direction banked.
    const direction = event.deltaY < 0 ? -1 : 1;
    if (scopeId !== pinchScope || direction !== pinchDirection) pinchTravel = 0;
    pinchScope = scopeId;
    pinchDirection = direction;
    pinchTravel += event.deltaY;
    // Every frame renews the gesture, whether or not it crossed a step boundary: what the next
    // frame is asking is whether this pinch is still under way, not whether it has stepped.
    pinchLatchTime = now;
    const steps = Math.trunc(pinchTravel / PINCH_STEP_PIXELS);
    if (steps === 0) return 0;
    // Only the step boundaries actually crossed are consumed; the rest of the travel stays put,
    // which is what makes a slow pinch step steadily instead of losing part of every frame.
    pinchTravel -= steps * PINCH_STEP_PIXELS;
    // `steps` is signed the way the platform's own tick arithmetic is (negative zooms in); this
    // reader's contract is the opposite, so the sign flips at the very last moment.
    return -clampSteps(steps);
  };

  const stepWheel = (event: WheelEvent, scopeId: string): number => {
    const ticks = ticksOf(event);
    if (ticks === 0) return 0;
    // Ticks only accumulate over one scope and in one direction. The direction is the last event's,
    // not the remainder's: rounding leaves a remainder whose sign is regularly opposite to the
    // gesture it came from, and reading that as a reversal would throw the carry away every second
    // event.
    const direction = ticks < 0 ? -1 : 1;
    if (scopeId !== wheelScope || direction !== wheelDirection) wheelRemainder = 0;
    wheelScope = scopeId;
    wheelDirection = direction;
    wheelRemainder += ticks;
    const steps = wholeTicks(wheelRemainder);
    if (steps === 0) return 0;
    // Only the whole ticks are consumed; carrying the fraction is what lets a wheel whose notch
    // reports less than a full tick, or an engine that reports none, still step steadily.
    wheelRemainder -= steps;
    // See the sign note in `stepPinch`: the internal tick arithmetic is negative-in, positive-out;
    // this reader's contract is the reverse.
    return -clampSteps(steps);
  };

  return {
    read(event: WheelEvent, scopeId: string): number {
      // A zero-delta event carries no travel of any kind, but reading it as an ordinary one is not
      // harmless: it still passes `isPinchWheel`'s size test at zero deviation, so it would flip
      // `stepPinch`'s direction to positive and silently reset whatever a running pinch had already
      // banked. Returned before either accumulator is touched.
      if (event.deltaY === 0) return 0;
      // Line- and page-mode deltas carry small counts of lines or pages, which neither a tick count
      // nor a scale describes; such an event is one step in its direction and leaves both
      // accumulators untouched.
      if (event.deltaMode !== 0) return -clampSteps(event.deltaY < 0 ? -1 : 1);
      const now = performance.now();
      if (isPinchWheel(event, scopeId, now)) return stepPinch(event, scopeId, now);
      return stepWheel(event, scopeId);
    },
    dispose(): void {
      if (!win) return;
      win.removeEventListener('keydown', onModifierKeyDown, true);
      win.removeEventListener('keyup', onModifierKeyUp, true);
      win.removeEventListener('pointerdown', onPointerModifiers, true);
      win.removeEventListener('pointermove', onPointerModifiers, true);
      win.removeEventListener('blur', onModifierLost);
      win.document.removeEventListener('visibilitychange', onVisibilityChange);
    },
  };
}
