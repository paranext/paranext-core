/**
 * The IPC channel main uses to have a window's page set its own zoom to interface scaling
 * (`platform.zoomFactor`). The message carries the zoom factor as a number.
 *
 * A zoom set from the page is Chromium's temporary zoom, keyed by the frame rather than the URL,
 * which the renderer keeps rewriting. See `createInterfaceScaling` in
 * `src/main/interface-scaling.util.ts` for when main sends it.
 *
 * Kept free of imports so the preload bundle can use it without pulling in the logger or
 * `electron`. `e2e-tests/tests/smoke/interface-scaling.spec.ts` repeats the name; keep the two in
 * step.
 */
export const INTERFACE_SCALING_CHANNEL = 'electronAPI:interfaceScaling.setZoomFactor';
