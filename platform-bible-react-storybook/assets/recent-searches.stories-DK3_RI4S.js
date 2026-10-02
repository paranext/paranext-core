import"./index-FGdHILLe.js";import{R as k}from"./recent-searches.component-CvpsC0_1.js";import{A as v}from"./scripture-util-DArajUVn-CpoMU_29.js";import"./index-C77E7Q-s.js";import"./index-DCo3rgjq.js";import"./iframe-CNwPhygf.js";import"./preload-helper-CTOgD26E.js";import"./button-BC_8cVFC.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-36fm6Tqo.js";import"./dropdown-menu-CF8W8_MU.js";import"./menu.context-DRv6pfQX.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-VcwsCU-L.js";import"./IconChevronRight-DlqjrmjW.js";import"./index-BuDaAPKG.js";import"./index-Blg-BLDa.js";import"./index-BhPTU6kk.js";import"./index-BGd2ushH.js";import"./index-Ckmh6uok.js";import"./index-C_cCc8is.js";import"./index-C55uHr_V.js";import"./index-D9m1k4o8.js";import"./index-B8M0SSFd.js";import"./index-Dt8fqMTu.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-WanKTmE6.js";import"./index-1KM652Vt.js";import"./index-C3_hXi_U.js";import"./IconCheck-Ukef-0H6.js";import"./tooltip-DN-par-y.js";import"./portal-container.context-BkmmT0Ft.js";import"./index-BhR_R8XD.js";import"./localization.util-C4JImkK1.js";import"./createLucideIcon-Crb48Yqb.js";import"./index.es-CXoS8DB2.js";import"./grapheme-CMWZWa5_.js";const{expect:o,fn:b,screen:r,within:T}=__STORYBOOK_MODULE_TEST__,i=[{book:"GEN",chapterNum:1,verseNum:1},{book:"EXO",chapterNum:2,verseNum:3},{book:"MAT",chapterNum:15,verseNum:1}],ue={title:"Advanced/RecentSearches",component:k,tags:["autodocs"],parameters:{docs:{description:{component:'A clock button that opens the list of references the user visited most recently, and reports the one they pick.\n\nIt is a **menu**, not a listbox: picking an item runs an action and closes the list, which is what menu semantics (`role="menu"` / `role="menuitem"`, roving focus, type-ahead, Escape to close) describe. Consumers querying these roles are relying on a documented contract — see the `adr-recent-searches-menu-semantics` entry in `Architecture-Decisions.md`.\n\nThe menu is deliberately non-modal. It usually opens beside a search box the user is still typing in, often inside another popover, so it must not trap focus or stop the surrounding controls responding to clicks.\n\nRenders nothing at all when there are no recent searches, so a caller can mount it unconditionally.'}}},args:{recentSearches:i,onSearchItemSelect:b(),renderItem:e=>v(e,"English"),getItemKey:e=>`${e.book}-${e.chapterNum}-${e.verseNum}`,buttonClassName:"tw:h-9 tw:w-9"}},a={},t={args:{recentSearches:[]}},n={play:async({canvas:e,step:s,args:B,userEvent:c})=>{await s("Open the recent searches menu",async()=>{await c.click(e.getByRole("button",{name:"Show recent searches"}))}),await s("The list uses menu semantics, not listbox semantics",async()=>{await o(await r.findByRole("menu")).toBeInTheDocument(),await o(r.getAllByRole("menuitem")).toHaveLength(i.length),await o(r.queryByRole("option")).not.toBeInTheDocument()}),await s("Picking an entry reports it to the caller",async()=>{const N=r.getByRole("menu");await c.click(T(N).getByRole("menuitem",{name:/Exodus 2:3/})),await o(B.onSearchItemSelect).toHaveBeenCalledWith(i[1])})}};var m,p,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,h,d,y,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(R=(E=n.parameters)==null?void 0:E.docs)==null?void 0:R.source},description:{story:"Opens the menu and picks an entry, asserting the roles the component promises consumers.",...(f=(S=n.parameters)==null?void 0:S.docs)==null?void 0:f.description}}};const he=["Default","NoRecentSearches","PickingARecentSearch"];export{a as Default,t as NoRecentSearches,n as PickingARecentSearch,he as __namedExportsOrder,ue as default};
