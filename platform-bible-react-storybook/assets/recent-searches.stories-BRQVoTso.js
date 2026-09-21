import"./index-CMl4ZC6j.js";import{R as k}from"./recent-searches.component-8kQmZMQr.js";import{A as v}from"./scripture-util-DArajUVn-CPHPTCtZ.js";import"./index-C77E7Q-s.js";import"./index-DCo3rgjq.js";import"./iframe-CiomroTv.js";import"./preload-helper-CTOgD26E.js";import"./button-BIGjazkj.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-BKJh3U-K.js";import"./dropdown-menu-cx4POoJW.js";import"./menu.context-CDiDH8ia.js";import"./z-index-DiGYIwoM.js";import"./IconCheck-xSz0BcmR.js";import"./createReactComponent-BKjBBrYQ.js";import"./IconChevronRight-5z2zkbK6.js";import"./index-ByUZJc_b.js";import"./index-B7wK_3di.js";import"./index-DdcCMvCS.js";import"./index-DmZDvQ6g.js";import"./index-C_LP8I5X.js";import"./index-towpankL.js";import"./index-CTeptPlf.js";import"./index-C2bfiLK2.js";import"./index-C0TbK2Un.js";import"./index-DA9q0_Ct.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-UC45PTNn.js";import"./index-BUxDx8q7.js";import"./index-CYqYTnI_.js";import"./tooltip-BQf2yA6c.js";import"./index-Di5sLbTc.js";import"./createLucideIcon-CwOiedh0.js";import"./index.es-CXoS8DB2.js";const{expect:o,fn:b,screen:r,within:T}=__STORYBOOK_MODULE_TEST__,c=[{book:"GEN",chapterNum:1,verseNum:1},{book:"EXO",chapterNum:2,verseNum:3},{book:"MAT",chapterNum:15,verseNum:1}],me={title:"Advanced/RecentSearches",component:k,tags:["autodocs"],parameters:{docs:{description:{component:'A clock button that opens the list of references the user visited most recently, and reports the one they pick.\n\nIt is a **menu**, not a listbox: picking an item runs an action and closes the list, which is what menu semantics (`role="menu"` / `role="menuitem"`, roving focus, type-ahead, Escape to close) describe. Consumers querying these roles are relying on a documented contract — see the `adr-recent-searches-menu-semantics` entry in `Architecture-Decisions.md`.\n\nThe menu is deliberately non-modal. It usually opens beside a search box the user is still typing in, often inside another popover, so it must not trap focus or stop the surrounding controls responding to clicks.\n\nRenders nothing at all when there are no recent searches, so a caller can mount it unconditionally.'}}},args:{recentSearches:c,onSearchItemSelect:b(),renderItem:e=>v(e,"English"),getItemKey:e=>`${e.book}-${e.chapterNum}-${e.verseNum}`,buttonClassName:"tw:h-9 tw:w-9"}},a={},t={args:{recentSearches:[]}},n={play:async({canvas:e,step:s,args:B,userEvent:i})=>{await s("Open the recent searches menu",async()=>{await i.click(e.getByRole("button",{name:"Show recent searches"}))}),await s("The list uses menu semantics, not listbox semantics",async()=>{await o(await r.findByRole("menu")).toBeInTheDocument(),await o(r.getAllByRole("menuitem")).toHaveLength(c.length),await o(r.queryByRole("option")).not.toBeInTheDocument()}),await s("Picking an entry reports it to the caller",async()=>{const N=r.getByRole("menu");await i.click(T(N).getByRole("menuitem",{name:/Exodus 2:3/})),await o(B.onSearchItemSelect).toHaveBeenCalledWith(c[1])})}};var m,p,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,h,d,y,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
