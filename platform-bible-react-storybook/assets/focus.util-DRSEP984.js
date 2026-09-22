const i=`
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
`;function s(t){return!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length)}function c(t,n){const a=n?`${i}, ${n}`:i;return Array.from(t.querySelectorAll(a)).filter(e=>!e.hasAttribute("disabled")&&!e.getAttribute("aria-hidden")&&s(e))}const u="tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";let o="keyboard",d=!1;function l(){d||typeof document>"u"||(d=!0,document.addEventListener("pointerdown",()=>{o="pointer"},!0),document.addEventListener("keydown",()=>{o="keyboard"},!0))}function f(){return o}const r="data-quiet-focus";function b(t){t&&(typeof window<"u"&&typeof window.matchMedia=="function"&&window.matchMedia("(forced-colors: active)").matches||(t.setAttribute(r,""),t.style.outline="none"))}function h(t){t&&(t.removeAttribute(r),t.style.removeProperty("outline"))}const y="tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";export{u as L,r as Q,f as a,y as b,c as g,b as h,h as s,l as t};
