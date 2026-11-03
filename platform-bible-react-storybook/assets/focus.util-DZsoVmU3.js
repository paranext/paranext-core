import{i as s}from"./use-dismiss-on-window-blur.hook-D544YCcQ.js";const i=`
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [contenteditable],
  tr:not([disabled])
`;function c(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function l(t,n){const a=n?`${i}, ${n}`:i;return Array.from(t.querySelectorAll(a)).filter(e=>!e.hasAttribute("disabled")&&!e.getAttribute("aria-hidden")&&c(e))}const f="tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";let o="keyboard",r=!1;function b(){r||typeof document>"u"||(r=!0,document.addEventListener("pointerdown",t=>{s(t)||(o="pointer")},!0),document.addEventListener("keydown",()=>{o="keyboard"},!0))}function h(){return o}const d="data-quiet-focus";function y(t){t&&(typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(forced-colors: active)").matches||(t.setAttribute(d,""),t.style.outline="none"))}function w(t){t&&(t.removeAttribute(d),t.style.removeProperty("outline"))}const g="tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";export{f as L,d as Q,h as a,g as b,l as g,y as h,w as s,b as t};
