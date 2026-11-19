import{b as N}from"./index-CpyFeyxh.js";import{R as k}from"./recent-searches.component-CtnC1pzB.js";import"./index.es-CXoS8DB2.js";import"./index-CzAFR9y0.js";import"./index-Cn7xqC4M.js";import"./iframe-mqlPs3X8.js";import"./preload-helper-CTOgD26E.js";import"./button-tdPrQ8Qh.js";import"./index-BnuTq2W6.js";import"./utils-BPbySc-g.js";import"./index-_nrjBVy-.js";import"./dropdown-menu-D8bZcvKA.js";import"./menu.context-WsFMLzSO.js";import"./use-dismiss-on-window-blur.hook-t8PvvY3W.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-C6feNOf9.js";import"./IconChevronRight-uOc6hPYK.js";import"./index-BdLttvAx.js";import"./index-BngELp5c.js";import"./index-0sXM-3yj.js";import"./index-DLfa7zIi.js";import"./index-Dz4fdeZ-.js";import"./index-DxwvqoQi.js";import"./index-ew1Xv4v9.js";import"./index-BzzM4UHV.js";import"./index-tqMZmzmc.js";import"./index-DXTI1UB5.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-D6hW9Cpb.js";import"./index-D9rueFij.js";import"./index-DiJ8SgsR.js";import"./IconCheck-ec1GGmw6.js";import"./tooltip-BeuLH7dW.js";import"./portal-container.context-C6ODcSqN.js";import"./index-B_-ksReR.js";import"./localization.util-C4JImkK1.js";import"./createLucideIcon-CRYG9yQn.js";const{expect:o,fn:v,screen:r,within:T}=__STORYBOOK_MODULE_TEST__,i=[{book:"GEN",chapterNum:1,verseNum:1},{book:"EXO",chapterNum:2,verseNum:3},{book:"MAT",chapterNum:15,verseNum:1}],le={title:"Advanced/RecentSearches",component:k,tags:["autodocs"],parameters:{docs:{description:{component:'A clock button that opens the list of references the user visited most recently, and reports the one they pick.\n\nIt is a **menu**, not a listbox: picking an item runs an action and closes the list, which is what menu semantics (`role="menu"` / `role="menuitem"`, roving focus, type-ahead, Escape to close) describe. Consumers querying these roles are relying on a documented contract — see the `adr-recent-searches-menu-semantics` entry in `Architecture-Decisions.md`.\n\nThe menu is deliberately non-modal. It usually opens beside a search box the user is still typing in, often inside another popover, so it must not trap focus or stop the surrounding controls responding to clicks.\n\nRenders nothing at all when there are no recent searches, so a caller can mount it unconditionally.'}}},args:{recentSearches:i,onSearchItemSelect:v(),renderItem:e=>N(e,"English"),getItemKey:e=>`${e.book}-${e.chapterNum}-${e.verseNum}`,buttonClassName:"tw:h-9 tw:w-9"}},a={},t={args:{recentSearches:[]}},n={play:async({canvas:e,step:s,args:B,userEvent:c})=>{await s("Open the recent searches menu",async()=>{await c.click(e.getByRole("button",{name:"Show recent searches"}))}),await s("The list uses menu semantics, not listbox semantics",async()=>{await o(await r.findByRole("menu")).toBeInTheDocument(),await o(r.getAllByRole("menuitem")).toHaveLength(i.length),await o(r.queryByRole("option")).not.toBeInTheDocument()}),await s("Picking an entry reports it to the caller",async()=>{const b=r.getByRole("menu");await c.click(T(b).getByRole("menuitem",{name:/Exodus 2:3/})),await o(B.onSearchItemSelect).toHaveBeenCalledWith(i[1])})}};var m,p,l;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:"{}",...(l=(p=a.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,h,d,y,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
