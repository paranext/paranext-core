import{S as k}from"./index-B_7uv8bx.js";import{R as v}from"./recent-searches.component-lQYRRVMs.js";import"./index.es-CXoS8DB2.js";import"./index-CzAFR9y0.js";import"./index-Cn7xqC4M.js";import"./iframe-CLY8HXus.js";import"./preload-helper-CTOgD26E.js";import"./button-DWuf7YZ7.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-oRwYTAvN.js";import"./dropdown-menu-DLdI7Vr6.js";import"./menu.context-cBlD0XY6.js";import"./use-dismiss-on-window-blur.hook-B573qa9V.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-_Glmy_9R.js";import"./IconChevronRight-DsOQNSaa.js";import"./index-CU-qSmRi.js";import"./index-WG3z7JxO.js";import"./index-CfHlfHC3.js";import"./index-BZ1BORpw.js";import"./index-B8B8mBpf.js";import"./index-7q7jYcH0.js";import"./index-CQ4LImey.js";import"./index-DUdH3CjZ.js";import"./index-D8wS3Brh.js";import"./index-Ups2hCRF.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-oAQhoQtH.js";import"./index-qWAgTN2x.js";import"./index-BWHmrCom.js";import"./IconCheck-CTr7am3z.js";import"./tooltip-th5YdtSJ.js";import"./portal-container.context-BOQU1hP_.js";import"./index-Dwk8AIdn.js";import"./localization.util-C4JImkK1.js";import"./createLucideIcon-DZroSnUJ.js";const{expect:o,fn:b,screen:r,within:T}=__STORYBOOK_MODULE_TEST__,i=[{book:"GEN",chapterNum:1,verseNum:1},{book:"EXO",chapterNum:2,verseNum:3},{book:"MAT",chapterNum:15,verseNum:1}],le={title:"Advanced/RecentSearches",component:v,tags:["autodocs"],parameters:{docs:{description:{component:'A clock button that opens the list of references the user visited most recently, and reports the one they pick.\n\nIt is a **menu**, not a listbox: picking an item runs an action and closes the list, which is what menu semantics (`role="menu"` / `role="menuitem"`, roving focus, type-ahead, Escape to close) describe. Consumers querying these roles are relying on a documented contract — see the `adr-recent-searches-menu-semantics` entry in `Architecture-Decisions.md`.\n\nThe menu is deliberately non-modal. It usually opens beside a search box the user is still typing in, often inside another popover, so it must not trap focus or stop the surrounding controls responding to clicks.\n\nRenders nothing at all when there are no recent searches, so a caller can mount it unconditionally.'}}},args:{recentSearches:i,onSearchItemSelect:b(),renderItem:e=>k(e,"English"),getItemKey:e=>`${e.book}-${e.chapterNum}-${e.verseNum}`,buttonClassName:"tw:h-9 tw:w-9"}},a={},t={args:{recentSearches:[]}},n={play:async({canvas:e,step:s,args:B,userEvent:c})=>{await s("Open the recent searches menu",async()=>{await c.click(e.getByRole("button",{name:"Show recent searches"}))}),await s("The list uses menu semantics, not listbox semantics",async()=>{await o(await r.findByRole("menu")).toBeInTheDocument(),await o(r.getAllByRole("menuitem")).toHaveLength(i.length),await o(r.queryByRole("option")).not.toBeInTheDocument()}),await s("Picking an entry reports it to the caller",async()=>{const N=r.getByRole("menu");await c.click(T(N).getByRole("menuitem",{name:/Exodus 2:3/})),await o(B.onSearchItemSelect).toHaveBeenCalledWith(i[1])})}};var m,p,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,h,d,y,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    recentSearches: []
  }
}`,...(d=(h=t.parameters)==null?void 0:h.docs)==null?void 0:d.source},description:{story:`The component returns nothing when the list is empty, so the canvas below is intentionally blank
— a caller never has to guard the render itself.`,...(g=(y=t.parameters)==null?void 0:y.docs)==null?void 0:g.description}}};var w,E,S,R,f;n.parameters={...n.parameters,docs:{...(w=n.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(S=(E=n.parameters)==null?void 0:E.docs)==null?void 0:S.source},description:{story:"Opens the menu and picks an entry, asserting the roles the component promises consumers.",...(f=(R=n.parameters)==null?void 0:R.docs)==null?void 0:f.description}}};const ue=["Default","NoRecentSearches","PickingARecentSearch"];export{a as Default,t as NoRecentSearches,n as PickingARecentSearch,ue as __namedExportsOrder,le as default};
