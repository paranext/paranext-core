import{r as i,j as t}from"./iframe-CwCaby_0.js";import{B as y}from"./button-D1Rh3Vm6.js";import{a as v,b as g}from"./content-zoom-text.context-Q66fvspJ.js";import"./preload-helper-CTOgD26E.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-Bv-dt4QP.js";const o=i.forwardRef(function({area:a,as:e="div",label:r,...u},f){const w={[g]:a??"",...r?{[v]:r}:{}};return i.createElement(e,{...u,...w,ref:f})});o.displayName="ContentZoomRoot";o.__docgenInfo={description:`Marks an element that renders project text — scripture, note bodies, result snippets, resource
text in its own font — so the platform scales it with the pane's content zoom.

Mark the text, not the region around it. Buttons, inputs, filters, headers, badges, card frames
and pop-ups stay outside every marked element and keep interface scale. Several elements may
share one area id and zoom together, so a card, list or table view marks each text element with
the same id; flowing, editor-like text keeps one marker around the text body. Areas must not nest
— a marked element found inside another marked element is ignored.

The platform scales marked elements on Ctrl/⌘+\`+\`/\`-\`/\`0\`, Ctrl/⌘+wheel and the tab context menu,
remembers the level per area and shows the zoom indicator; the view writes nothing else. A view
that marks no area gets no content zoom unless the platform declares its web view type zoomable.
Your view is zoomable only while at least one element carrying \`data-platform-content-zoom-root\`
is rendered: the tab menu's zoom items, Ctrl/⌘ + \`+\`/\`-\`/\`0\` and Ctrl/⌘+wheel appear and act only
then. If your view shows nothing to zoom for a while (before a search, while loading), render an
empty marked element so the controls stay available.

Pop-ups opened from inside stay at interface scale; anchor them to live positions
(\`useLivePopoverAnchor\`) so they open beside zoomed content.

Renders a \`div\` by default and a \`span\` with \`as="span"\`, in normal flow, with no classes of its
own — the caller supplies whatever layout classes its parent expects. Library components that
render project text mark it themselves inside a \`ContentZoomTextProvider\`; do not wrap such a
provider's subtree in a \`ContentZoomRoot\`.

Measurement caveat: inside a zoomed area, \`getBoundingClientRect()\` reports zoomed pixels, while
\`getComputedStyle(el).fontSize\` does not reflect the zoom factor. To read the factor itself, look
up the \`--platform-content-zoom-<areaId>\` custom property (\`--platform-content-zoom-main\` for the
unnamed area, \`--platform-content-zoom-default\` as a fallback) on the view's \`documentElement\`.

@example

\`\`\`tsx
<li>
  <Button onClick={goToVerse}>{verseRef}</Button>
  <ContentZoomRoot as="span" className="scripture-font">
    {snippet}
  </ContentZoomRoot>
</li>;
\`\`\`

@experimental This export is unstable and may change shape or disappear without notice`,methods:[],displayName:"ContentZoomRoot",props:{area:{required:!1,tsType:{name:"string"},description:`Id of the zoom area this element belongs to: lower-case letters, digits and hyphens, starting
with a letter (\`[a-z][a-z0-9-]*\`). \`default\` is reserved by the platform and is ignored. Omit
this prop for the view's main area. A view with several independently zoomable panes gives each
its own id — the Scripture editor uses \`footnotes\` for its footnotes pane.

This library does not validate the id at runtime; the platform ignores a malformed one and logs
a warning once.

@experimental This property is unstable and may change shape or disappear without notice`},as:{required:!1,tsType:{name:"union",raw:"'div' | 'span'",elements:[{name:"literal",value:"'div'"},{name:"literal",value:"'span'"}]},description:"Element to render: `'div'` (the default) or `'span'`. Use `'span'` inside phrasing content — a\n`<p>`, a heading, or a table cell's inline text — where a `div` is not allowed.\n\n@experimental This property is unstable and may change shape or disappear without notice",defaultValue:{value:"'div'",computed:!1}},label:{required:!1,tsType:{name:"string"},description:`Name of this zoom area as the zoom indicator shows it: \`<label> · 120 %\` instead of \`120 %\`.
Give it when a view has several areas the user could not otherwise tell apart — the Text
Collection labels each resource's area with the resource's short name. Plain text. When several
elements share an area id, the first one with a label names the area. Omit it and the indicator
shows the level alone.

@experimental This property is unstable and may change shape or disappear without notice`}}};const{expect:l}=__STORYBOOK_MODULE_TEST__,b='.content-zoom-story{--platform-content-zoom-main:2}[data-platform-content-zoom-root=""]{zoom:var(--platform-content-zoom-main,1)}',k={title:"Advanced/ContentZoomRoot",component:o,tags:["autodocs","test"]},n={render:()=>t.jsxs("div",{className:"content-zoom-story",children:[t.jsx("style",{children:b}),t.jsxs("p",{className:"tw:flex tw:items-baseline tw:gap-2 tw:text-sm",children:[t.jsx(y,{variant:"ghost",size:"sm",children:"GEN 1:1"}),t.jsx(o,{as:"span",className:"scripture-font",children:"In the beginning God created the heavens and the earth."})]})]}),play:async({canvasElement:s,step:a})=>{await a("The marker is a span and the button is outside it",async()=>{const e=s.querySelector("[data-platform-content-zoom-root]");await l(e==null?void 0:e.tagName).toBe("SPAN"),await l(e==null?void 0:e.querySelector("button")).toBeNull()})}};var m,d,p,c,h;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => <div className="content-zoom-story">
      <style>{PLATFORM_ZOOM_STAND_IN}</style>
      <p className="tw:flex tw:items-baseline tw:gap-2 tw:text-sm">
        <Button variant="ghost" size="sm">
          GEN 1:1
        </Button>
        <ContentZoomRoot as="span" className="scripture-font">
          In the beginning God created the heavens and the earth.
        </ContentZoomRoot>
      </p>
    </div>,
  play: async ({
    canvasElement,
    step
  }) => {
    await step('The marker is a span and the button is outside it', async () => {
      const marker = canvasElement.querySelector('[data-platform-content-zoom-root]');
      await expect(marker?.tagName).toBe('SPAN');
      await expect(marker?.querySelector('button')).toBeNull();
    });
  }
}`,...(p=(d=n.parameters)==null?void 0:d.docs)==null?void 0:p.source},description:{story:"Only the marked span grows; the reference button beside it in the same line stays at 100 %.",...(h=(c=n.parameters)==null?void 0:c.docs)==null?void 0:h.description}}};const R=["InlineSpanAt200Percent"];export{n as InlineSpanAt200Percent,R as __namedExportsOrder,k as default};
