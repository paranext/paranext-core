import{b as N}from"./index-VL4OM5EA.js";import{R as k}from"./recent-searches.component-BUvzDz8A.js";import"./index.es-CXoS8DB2.js";import"./index-C5x4eDsm.js";import"./index-Cn7xqC4M.js";import"./iframe-BqYvhf7C.js";import"./preload-helper-CTOgD26E.js";import"./button-DtGA6OYm.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-PEkvp2XX.js";import"./dropdown-menu-aKW8BiyK.js";import"./menu.context-X8dGpjzO.js";import"./use-dismiss-on-window-blur.hook-CmW6mvGb.js";import"./z-index-DhRj3SmA.js";import"./createReactComponent-I2N3EuVV.js";import"./IconChevronRight-CuNyuPrQ.js";import"./index-CyQshAAy.js";import"./index-BvJCGcWd.js";import"./index-pHbbg5KX.js";import"./index-Cm-cmOD4.js";import"./index--NDpXzwn.js";import"./index-DwKr2vXH.js";import"./index-CFcgSA2o.js";import"./index-rmFLYQWT.js";import"./index-B_V2pCCV.js";import"./index-BmzRO4KU.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-DQKmi0Ri.js";import"./index-CV-3M0tS.js";import"./index-DVFcviTG.js";import"./IconCheck-CnwZqolt.js";import"./tooltip-iyNlpbe0.js";import"./portal-container.context-Bq5le6pR.js";import"./index-B_byjAdI.js";import"./localization.util-C4JImkK1.js";import"./createLucideIcon-D8JX_TTK.js";const{expect:o,fn:v,screen:r,within:T}=__STORYBOOK_MODULE_TEST__,i=[{book:"GEN",chapterNum:1,verseNum:1},{book:"EXO",chapterNum:2,verseNum:3},{book:"MAT",chapterNum:15,verseNum:1}],le={title:"Advanced/RecentSearches",component:k,tags:["autodocs"],parameters:{docs:{description:{component:'A clock button that opens the list of references the user visited most recently, and reports the one they pick.\n\nIt is a **menu**, not a listbox: picking an item runs an action and closes the list, which is what menu semantics (`role="menu"` / `role="menuitem"`, roving focus, type-ahead, Escape to close) describe. Consumers querying these roles are relying on a documented contract — see the `adr-recent-searches-menu-semantics` entry in `Architecture-Decisions.md`.\n\nThe menu is deliberately non-modal. It usually opens beside a search box the user is still typing in, often inside another popover, so it must not trap focus or stop the surrounding controls responding to clicks.\n\nRenders nothing at all when there are no recent searches, so a caller can mount it unconditionally.'}}},args:{recentSearches:i,onSearchItemSelect:v(),renderItem:e=>N(e,"English"),getItemKey:e=>`${e.book}-${e.chapterNum}-${e.verseNum}`,buttonClassName:"tw:h-9 tw:w-9"}},a={},t={args:{recentSearches:[]}},n={play:async({canvas:e,step:s,args:B,userEvent:c})=>{await s("Open the recent searches menu",async()=>{await c.click(e.getByRole("button",{name:"Show recent searches"}))}),await s("The list uses menu semantics, not listbox semantics",async()=>{await o(await r.findByRole("menu")).toBeInTheDocument(),await o(r.getAllByRole("menuitem")).toHaveLength(i.length),await o(r.queryByRole("option")).not.toBeInTheDocument()}),await s("Picking an entry reports it to the caller",async()=>{const b=r.getByRole("menu");await c.click(T(b).getByRole("menuitem",{name:/Exodus 2:3/})),await o(B.onSearchItemSelect).toHaveBeenCalledWith(i[1])})}};var m,p,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,h,d,y,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    recentSearches: []
  }
}`,...(d=(h=t.parameters)==null?void 0:h.docs)==null?void 0:d.source},description:{story:`The component returns nothing when the list is empty, so the canvas below is intentionally blank
— a caller never has to guard the render itself.`,...(g=(y=t.parameters)==null?void 0:y.docs)==null?void 0:g.description}}};var w,E,R,S,f;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
  play: async ({
    canvas,
    step,
    args,
    userEvent
  }) => {
    await step('Open the recent searches menu', async () => {
      await userEvent.click(canvas.getByRole('button', {
        name: 'Show recent searches'
      }));
    });
    await step('The list uses menu semantics, not listbox semantics', async () => {
      // The menu portals out of the canvas, so query the whole document rather than \`canvas\`.
      await expect(await screen.findByRole('menu')).toBeInTheDocument();
      await expect(screen.getAllByRole('menuitem')).toHaveLength(RECENT_REFERENCES.length);
      await expect(screen.queryByRole('option')).not.toBeInTheDocument();
    });
    await step('Picking an entry reports it to the caller', async () => {
      const menu = screen.getByRole('menu');
      await userEvent.click(within(menu).getByRole('menuitem', {
        name: /Exodus 2:3/
      }));
      await expect(args.onSearchItemSelect).toHaveBeenCalledWith(RECENT_REFERENCES[1]);
    });
  }
}`,...(R=(E=n.parameters)==null?void 0:E.docs)==null?void 0:R.source},description:{story:"Opens the menu and picks an entry, asserting the roles the component promises consumers.",...(f=(S=n.parameters)==null?void 0:S.docs)==null?void 0:f.description}}};const ue=["Default","NoRecentSearches","PickingARecentSearch"];export{a as Default,t as NoRecentSearches,n as PickingARecentSearch,ue as __namedExportsOrder,le as default};
