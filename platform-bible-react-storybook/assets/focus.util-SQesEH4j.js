const o=`
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
`;function i(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function r(e,d){const n=d?`${o}, ${d}`:o;return Array.from(e.querySelectorAll(n)).filter(t=>!t.hasAttribute("disabled")&&!t.getAttribute("aria-hidden")&&i(t))}const a="tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";export{a as L,r as g};
