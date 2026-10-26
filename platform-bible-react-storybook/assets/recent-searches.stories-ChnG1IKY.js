import{S as k}from"./index-CDH2oUpg.js";import{R as v}from"./recent-searches.component-DKU4SvY4.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./iframe-D0U8KiZh.js";import"./preload-helper-CTOgD26E.js";import"./button-BlrYuo45.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-D0VhioC7.js";import"./dropdown-menu-BYW_FEzT.js";import"./menu.context-B4afClJd.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-tnCiva_m.js";import"./IconChevronRight-Dj_6Ss7V.js";import"./index-CCPHwnms.js";import"./index-0Jsl0_LH.js";import"./index-DkkW0WFv.js";import"./index-13LH3-dX.js";import"./index-CGBmeYmM.js";import"./index-B21-F0_p.js";import"./index-BpGhY15H.js";import"./index-CkXamuDT.js";import"./index-EUVjlI_h.js";import"./index-DW2VfzKa.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-BSV2yJ10.js";import"./index-CXlLqF72.js";import"./index-DVuQVjRc.js";import"./IconCheck-DujefcS0.js";import"./tooltip-DAMATG60.js";import"./portal-container.context-D13g5zk_.js";import"./index-DIFzZcO5.js";import"./localization.util-C4JImkK1.js";import"./createLucideIcon-BDWsZAIS.js";const{expect:o,fn:b,screen:r,within:T}=__STORYBOOK_MODULE_TEST__,c=[{book:"GEN",chapterNum:1,verseNum:1},{book:"EXO",chapterNum:2,verseNum:3},{book:"MAT",chapterNum:15,verseNum:1}],pe={title:"Advanced/RecentSearches",component:v,tags:["autodocs"],parameters:{docs:{description:{component:'A clock button that opens the list of references the user visited most recently, and reports the one they pick.\n\nIt is a **menu**, not a listbox: picking an item runs an action and closes the list, which is what menu semantics (`role="menu"` / `role="menuitem"`, roving focus, type-ahead, Escape to close) describe. Consumers querying these roles are relying on a documented contract — see the `adr-recent-searches-menu-semantics` entry in `Architecture-Decisions.md`.\n\nThe menu is deliberately non-modal. It usually opens beside a search box the user is still typing in, often inside another popover, so it must not trap focus or stop the surrounding controls responding to clicks.\n\nRenders nothing at all when there are no recent searches, so a caller can mount it unconditionally.'}}},args:{recentSearches:c,onSearchItemSelect:b(),renderItem:e=>k(e,"English"),getItemKey:e=>`${e.book}-${e.chapterNum}-${e.verseNum}`,buttonClassName:"tw:h-9 tw:w-9"}},a={},t={args:{recentSearches:[]}},n={play:async({canvas:e,step:s,args:B,userEvent:i})=>{await s("Open the recent searches menu",async()=>{await i.click(e.getByRole("button",{name:"Show recent searches"}))}),await s("The list uses menu semantics, not listbox semantics",async()=>{await o(await r.findByRole("menu")).toBeInTheDocument(),await o(r.getAllByRole("menuitem")).toHaveLength(c.length),await o(r.queryByRole("option")).not.toBeInTheDocument()}),await s("Picking an entry reports it to the caller",async()=>{const N=r.getByRole("menu");await i.click(T(N).getByRole("menuitem",{name:/Exodus 2:3/})),await o(B.onSearchItemSelect).toHaveBeenCalledWith(c[1])})}};var m,p,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,h,d,y,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(S=(E=n.parameters)==null?void 0:E.docs)==null?void 0:S.source},description:{story:"Opens the menu and picks an entry, asserting the roles the component promises consumers.",...(f=(R=n.parameters)==null?void 0:R.docs)==null?void 0:f.description}}};const le=["Default","NoRecentSearches","PickingARecentSearch"];export{a as Default,t as NoRecentSearches,n as PickingARecentSearch,le as __namedExportsOrder,pe as default};
