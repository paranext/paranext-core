import{r as t,j as s}from"./iframe-CwCaby_0.js";const i="data-platform-content-zoom-root",p="data-platform-content-zoom-label",n=t.createContext(void 0);function m({area:o,label:e,children:r}){const a=t.useMemo(()=>({[i]:o??"",...e?{[p]:e}:{}}),[o,e]);return s.jsx(n.Provider,{value:a,children:r})}function c(){return t.useContext(n)??{}}m.__docgenInfo={description:`Opts the library components inside it into marking the project text they render — a comment's
scripture snippet, body, conflict diff and composer, for example — so that text scales with the
pane's content zoom while the components' buttons, badges and frames keep interface scale.
Outside a provider those components mark nothing.

The provider marks no element itself. Do not also wrap its subtree in a \`ContentZoomRoot\`: a
marked element found inside another marked element is ignored.

@experimental This export is unstable and may change shape or disappear without notice`,methods:[],displayName:"ContentZoomTextProvider",props:{area:{required:!1,tsType:{name:"string"},description:`Id of the zoom area the project text inside belongs to, with the same rules as
\`ContentZoomRootProps.area\`. Omit it for the view's main area.

@experimental This property is unstable and may change shape or disappear without notice`},label:{required:!1,tsType:{name:"string"},description:"Name of the zoom area as the zoom indicator shows it (`<label> · 120 %`), written on every text\nelement the provider marks, the way `ContentZoomRootProps.label` is on its marker. Plain text.\nOmit it, or pass an empty string, and the indicator shows the level alone.\n\n@experimental This property is unstable and may change shape or disappear without notice"},children:{required:!0,tsType:{name:"ReactNode"},description:`The subtree whose library components mark the project text they render.

@experimental This property is unstable and may change shape or disappear without notice`}}};export{m as C,p as a,i as b,c as u};
