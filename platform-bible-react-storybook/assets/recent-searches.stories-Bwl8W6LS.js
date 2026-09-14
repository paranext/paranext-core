import"./index-nJDboCOi.js";import{R as k}from"./recent-searches.component-BldK973s.js";import{A as v}from"./scripture-util-DArajUVn-CPHPTCtZ.js";import"./index-C77E7Q-s.js";import"./index-DCo3rgjq.js";import"./iframe-Cf36PwHX.js";import"./preload-helper-CTOgD26E.js";import"./button-DrW98VRO.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-C4Qlj0CU.js";import"./dropdown-menu-D7-Y7S_5.js";import"./menu.context-C8IMzRcs.js";import"./z-index-DiGYIwoM.js";import"./IconCheck-DQQSEM7J.js";import"./createReactComponent-B7pMdjnO.js";import"./IconChevronRight-75FS3304.js";import"./index-HePiTBCS.js";import"./index-B3YESymw.js";import"./index-s6RwUCS8.js";import"./index-DxI4K0Yt.js";import"./index-D6ZttVMU.js";import"./index-BrFr00Ts.js";import"./index-BpbJVJaq.js";import"./index-EeLS7y6b.js";import"./index-BMQSd8kY.js";import"./index-5V2xp-kI.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-CjiQzwtl.js";import"./index-CHXH4q3U.js";import"./index-h8D9Cw8K.js";import"./tooltip-ZqldpuMW.js";import"./index-B0kf4yJs.js";import"./createLucideIcon-DQyp1LVt.js";import"./index.es-CXoS8DB2.js";const{expect:o,fn:b,screen:r,within:T}=__STORYBOOK_MODULE_TEST__,c=[{book:"GEN",chapterNum:1,verseNum:1},{book:"EXO",chapterNum:2,verseNum:3},{book:"MAT",chapterNum:15,verseNum:1}],me={title:"Advanced/RecentSearches",component:k,tags:["autodocs"],parameters:{docs:{description:{component:'A clock button that opens the list of references the user visited most recently, and reports the one they pick.\n\nIt is a **menu**, not a listbox: picking an item runs an action and closes the list, which is what menu semantics (`role="menu"` / `role="menuitem"`, roving focus, type-ahead, Escape to close) describe. Consumers querying these roles are relying on a documented contract — see the `adr-recent-searches-menu-semantics` entry in `Architecture-Decisions.md`.\n\nThe menu is deliberately non-modal. It usually opens beside a search box the user is still typing in, often inside another popover, so it must not trap focus or stop the surrounding controls responding to clicks.\n\nRenders nothing at all when there are no recent searches, so a caller can mount it unconditionally.'}}},args:{recentSearches:c,onSearchItemSelect:b(),renderItem:e=>v(e,"English"),getItemKey:e=>`${e.book}-${e.chapterNum}-${e.verseNum}`,buttonClassName:"tw:h-9 tw:w-9"}},a={},t={args:{recentSearches:[]}},n={play:async({canvas:e,step:s,args:B,userEvent:i})=>{await s("Open the recent searches menu",async()=>{await i.click(e.getByRole("button",{name:"Show recent searches"}))}),await s("The list uses menu semantics, not listbox semantics",async()=>{await o(await r.findByRole("menu")).toBeInTheDocument(),await o(r.getAllByRole("menuitem")).toHaveLength(c.length),await o(r.queryByRole("option")).not.toBeInTheDocument()}),await s("Picking an entry reports it to the caller",async()=>{const N=r.getByRole("menu");await i.click(T(N).getByRole("menuitem",{name:/Exodus 2:3/})),await o(B.onSearchItemSelect).toHaveBeenCalledWith(c[1])})}};var m,p,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,h,d,y,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(R=(E=n.parameters)==null?void 0:E.docs)==null?void 0:R.source},description:{story:"Opens the menu and picks an entry, asserting the roles the component promises consumers.",...(f=(S=n.parameters)==null?void 0:S.docs)==null?void 0:f.description}}};const pe=["Default","NoRecentSearches","PickingARecentSearch"];export{a as Default,t as NoRecentSearches,n as PickingARecentSearch,pe as __namedExportsOrder,me as default};
