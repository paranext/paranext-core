import{j as t,r as c}from"./iframe-rLF9vsh8.js";import{c as oa,d as na,e as ia,D as la}from"./dialog-DeGi4nt5.js";import{A as ca,b as ua}from"./alert-BEojP0RV.js";import{E as da}from"./empty-state.component-BNf8rBuH.js";import{B as ha}from"./button-B5x4nOPy.js";import{E as pa,a as ma,b as ga,d as wa,e as ya}from"./empty-9Se5h160.js";import{c as fa}from"./utils-BPbySc-g.js";import{T as ba}from"./triangle-alert-ChRGTlz6.js";import{L as Sa}from"./label-CHjvGtAx.js";import{T as xa,e as Na,c as H,f as b}from"./table-p-ZraqJt.js";import{T as Ra,a as Ea,b as va,c as La}from"./tooltip-CHEJpKpI.js";import{M as _a}from"./multi-select-combo-box.component-DmLo9H5x.js";import{S as Ta}from"./search-bar.component-fHwp-zkj.js";import{t as he}from"./index-B0qwtMYq.js";import{S as Aa}from"./spinner.component-DH31Yd3U.js";import{c as Lt}from"./createLucideIcon-ryJjTFAX.js";import{C as ka}from"./check-Ct6VlJxS.js";import{L as Da}from"./lock-UTVBSSWZ.js";import"./preload-helper-CTOgD26E.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-CKjvWiYO.js";import"./index-D356yfeG.js";import"./index-C544dqB2.js";import"./index-C6VhfXcK.js";import"./index-BghdBo9n.js";import"./index-d-katl-A.js";import"./index-Wo3QQhJE.js";import"./index-KM8q9xSZ.js";import"./index-BAd_bxPv.js";import"./index-DLiGhJQB.js";import"./index-DFo2SiZl.js";import"./index-DZeVYwCK.js";import"./index-BnuTq2W6.js";import"./focus.util-DRSEP984.js";import"./portal-container.context-uLX-WK0m.js";import"./index-C_Zu7waH.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-DT8e0yhB.js";import"./index-xS_4aRd8.js";import"./command-ClMoDWkE.js";import"./input-group-C15YcZ4G.js";import"./input-5YyD3jm1.js";import"./IconCheck-D1W0t1DO.js";import"./popover-CeF82zBm.js";import"./chevrons-up-down-BcfYWPfz.js";import"./star-BbSpxvjd.js";import"./search-COTgiHvi.js";import"./x-DCVJ9QBZ.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./loader-circle-DoO5izsv.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ja=[["path",{d:"M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057",key:"1uxyv8"}],["path",{d:"M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78",key:"99tcn7"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],pe=Lt("cloud-off",ja);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ia=[["path",{d:"m13.5 8.5-5 5",key:"1cs55j"}],["path",{d:"m8.5 8.5 5 5",key:"a8mexj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],Ca=Lt("search-x",Ia);function q({message:e,retryLabel:a,onRetry:r,icon:s,role:n="alert",className:i}){return t.jsxs(pa,{className:fa(i),role:n,children:[t.jsxs(ma,{children:[t.jsx(ga,{variant:"icon",children:s??t.jsx(ba,{})}),t.jsx(wa,{children:e})]}),r&&t.jsx(ya,{children:t.jsx(ha,{onClick:()=>r(),children:a})})]})}q.__docgenInfo={description:`Icon + message zero state for a region that has nothing to show because something failed or is
unavailable, with an optional retry action.

One implementation for every surface that reports the same condition. The resource panels, the
resource picker, Get Resources, and the Text Collection grid can all be looking at the very same
failed DBL catalog fetch, and a retry button that changes size or emphasis depending on which of
them the user happened to reach it from reads as a different control doing a different thing.

Composes the shadcn \`Empty\` primitive per \`adr-empty-is-zero-state-primitive\` rather than
hand-rolling a container.

The icon is the state's visual signature. Without one, a failure and a "nothing is configured"
prompt render as the same centred text plus a button — two identical screens whose buttons do
opposite things (retry vs. reconfigure).`,methods:[],displayName:"RetryableErrorView",props:{message:{required:!0,tsType:{name:"ReactNode"},description:"Already-localized message saying what went wrong, or why the region has nothing to show."},retryLabel:{required:!1,tsType:{name:"ReactNode"},description:"Already-localized label for the retry button. Required alongside `onRetry`; ignored without it."},onRetry:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`Re-attempts whatever failed. Omit when nothing the user does here could change the outcome —
the view then renders its message alone rather than an inert button.`},icon:{required:!1,tsType:{name:"ReactNode"},description:"Overrides the default warning glyph so distinct failures stay distinguishable."},role:{required:!1,tsType:{name:"union",raw:"'alert' | 'status'",elements:[{name:"literal",value:"'alert'"},{name:"literal",value:"'status'"}]},description:"ARIA live-region role. Defaults to `alert` for a failure; pass `status` for a state that\nreports a condition rather than an error, such as a capability this installation does not\nhave.",defaultValue:{value:"'alert'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Class name applied to the `Empty` container so the caller owns sizing within its surface."}}};function Ba(e,a){return a?Array.isArray(a)?a.length===0||a.includes(e.type):e.type===a:!0}function Pa(e){const a=new Map,r=new Set;return e.forEach(s=>{const n=s.bestLanguageName;a.set(n,(a.get(n)??0)+1),s.installed&&r.add(n)}),Array.from(a.entries()).sort(([s],[n])=>s.localeCompare(n)).map(([s,n])=>({label:s,value:s,starred:r.has(s),secondaryLabel:n.toString()}))}function Ua(e,a){const r=new Set(a.map(i=>i.value)),s=[],n=[];return e.forEach(i=>(r.has(i)?s:n).push(i)),{offered:s,held:n}}function Ga(e,a=50){const[r,s]=c.useState(a),n=c.useRef(null);return c.useEffect(()=>{s(a)},[e,a]),c.useEffect(()=>{if(r>=e.length)return;const i=n.current,o=new IntersectionObserver(([u])=>{u.isIntersecting&&s(V=>Math.min(V+a,e.length))},{threshold:0});return i&&o.observe(i),()=>o.disconnect()},[r,e.length,a]),{visibleItems:e.slice(0,r),sentinelRef:n,hasMore:r<e.length}}const h=(e,a)=>e[a]??a;function _t({resource:e}){return t.jsxs(t.Fragment,{children:[t.jsx(b,{className:"tw:max-w-0 tw:truncate tw:border-0 tw:py-1 tw:pe-2 tw:text-start tw:font-normal",children:t.jsx("span",{title:e.displayName,children:e.displayName})}),t.jsx(b,{className:"tw:max-w-0 tw:truncate tw:border-0 tw:py-1 tw:ps-2",children:t.jsx("span",{title:e.fullName,children:e.fullName})}),t.jsx(b,{className:"tw:max-w-0 tw:truncate tw:border-0 tw:py-1 tw:ps-4 tw:text-end tw:text-muted-foreground",children:t.jsx("span",{title:e.bestLanguageName,children:e.bestLanguageName})})]})}function Ma({resource:e,reason:a}){const r=c.useId();return t.jsxs(Ea,{children:[t.jsx(va,{asChild:!0,children:t.jsxs(H,{role:"button","aria-disabled":"true","aria-label":e.displayName,"aria-describedby":r,onKeyDown:s=>{(s.key==="Enter"||s.key===" ")&&s.preventDefault()},className:"tw:cursor-not-allowed tw:border-0 tw:opacity-50 tw:hover:bg-transparent",children:[t.jsxs(b,{className:"tw:border-0 tw:px-1 tw:py-1",children:[t.jsx(Da,{className:"tw:h-3.5 tw:w-3.5","aria-hidden":!0}),t.jsx("span",{id:r,className:"tw:sr-only",children:a})]}),t.jsx(_t,{resource:e})]})}),t.jsx(La,{className:"tw:max-w-xs",children:a})]})}function Q({label:e,resources:a,onSelect:r,showCheckmark:s,getDisabledReason:n}){if(a.length!==0)return t.jsxs(t.Fragment,{children:[t.jsx(H,{className:"tw:border-0 tw:hover:bg-transparent",children:t.jsx(b,{colSpan:4,className:"tw:border-0 tw:pt-4 tw:pb-0",children:t.jsx(Sa,{className:"tw:text-xs tw:tracking-wider tw:text-muted-foreground tw:uppercase",children:e})})}),a.map(i=>{const o=n==null?void 0:n(i);return o?t.jsx(Ma,{resource:i,reason:o},i.dblEntryUid):t.jsxs(H,{className:r?"tw:cursor-pointer tw:border-0":"tw:pointer-events-none tw:border-0",role:r?"button":void 0,"aria-label":r?i.displayName:void 0,onClick:r?()=>r(i):void 0,onKeyDown:r?u=>{(u.key==="Enter"||u.key===" ")&&(u.preventDefault(),r(i))}:void 0,children:[t.jsx(b,{className:"tw:border-0 tw:px-1 tw:py-1",children:s&&t.jsxs(t.Fragment,{children:[t.jsx(ka,{className:"tw:h-3.5 tw:w-3.5","aria-hidden":!0}),t.jsx("span",{className:"tw:sr-only",children:e})]})}),t.jsx(_t,{resource:i})]},i.dblEntryUid)})]})}function Oa(e){return e.isResourcesLoading?"loading":e.hasNoResults?e.canClearFiltersHelp?"filteredEmpty":e.hasResourcesError?"error":e.areDownloadsUnavailable?"downloadsUnavailable":"empty":"list"}function qa(e,a){if(!a)return!0;const r=a.toLowerCase();return e.displayName.toLowerCase().includes(r)||e.fullName.toLowerCase().includes(r)||e.bestLanguageName.toLowerCase().includes(r)}function Tt({allResources:e,isResourcesLoading:a,hasResourcesError:r,onRetryResources:s,areDownloadsUnavailable:n,resourceType:i,selectedResourceIds:o,notice:u,allowSelectingInstalled:V=!0,localizedStrings:d,allowDeselect:It,getDisabledReason:ae,onSelect:Y,searchInputRef:Ct}){const[B,re]=c.useState(""),[se,oe]=c.useState([]),Bt=c.useRef(null),x=Ct??Bt,Pt=c.useCallback(()=>{var l;re(""),oe([]),(l=x.current)==null||l.focus()},[x]),g=c.useMemo(()=>e.filter(l=>Ba(l,i)),[e,i]),N=c.useMemo(()=>Pa(g),[g]),{offered:m,held:ne}=c.useMemo(()=>Ua(se,N),[se,N]),Ut=c.useCallback(l=>oe([...ne,...l]),[ne]),f=c.useMemo(()=>g.filter(l=>qa(l,B)).filter(l=>m.length===0||m.includes(l.bestLanguageName)),[g,B,m]),ie=c.useMemo(()=>f.filter(l=>o==null?void 0:o.includes(l.dblEntryUid)),[f,o]),le=c.useMemo(()=>f.filter(l=>l.installed&&!(o!=null&&o.includes(l.dblEntryUid))),[f,o]),ce=c.useMemo(()=>f.filter(l=>!l.installed&&!(o!=null&&o.includes(l.dblEntryUid))),[f,o]),{visibleItems:Gt,sentinelRef:Mt,hasMore:Ot}=Ga(ce),qt=ie.length===0&&le.length===0&&ce.length===0,zt=h(d,"%resourcePicker_title%"),Ft=h(d,"%resourcePicker_description%"),Ht=h(d,"%resourcePicker_search_placeholder%"),$=h(d,"%resourcePicker_language_filter_any%"),Wt=h(d,"%resourcePicker_language_filter_search_placeholder%"),Kt=h(d,"%resourcePicker_language_filter_no_results%"),Vt=h(d,"%resourcePicker_section_already_selected%"),Yt=h(d,"%resourcePicker_section_installed%"),$t=h(d,"%resourcePicker_section_available_to_download%"),Xt=h(d,"%resourcePicker_no_results%"),Jt=h(d,"%resourcePicker_load_error%"),Qt=h(d,"%resourcePicker_retry%"),Zt=h(d,"%resourcePicker_no_results_filtered%"),ea=h(d,"%resourcePicker_clear_filters%"),ta=h(d,"%resourcePicker_downloads_unavailable%"),aa=h(d,"%resourcePicker_showing_count%"),X=m.length>0&&g.some(l=>!m.includes(l.bestLanguageName)),ue=B.length>0||X,ra=c.useMemo(()=>{var l;return X?m.length===1?((l=N.find(R=>R.value===m[0]))==null?void 0:l.label)??m[0]:he(h(d,"%resourcePicker_language_filter_multipleSelected%"),{selectCount:m.length}):$},[X,m,N,$,d]),sa=ue&&g.length>0,S=!!a||!!r||g.length===0,de=c.useRef(S);c.useEffect(()=>{const l=de.current&&!S;if(de.current=S,!l)return;const R=x.current;if(!R||R.disabled)return;const{activeElement:J}=document;(!J||J===document.body||J.getAttribute("data-slot")==="dialog-content")&&R.focus()},[S,x]);const w=Oa({isResourcesLoading:!!a,hasResourcesError:!!r,hasNoResults:qt,canClearFiltersHelp:sa,areDownloadsUnavailable:!!n});return t.jsxs(t.Fragment,{children:[t.jsxs(oa,{className:"tw:px-4 tw:pt-4",children:[t.jsx(na,{children:zt}),t.jsx(ia,{className:"tw:sr-only",children:Ft})]}),t.jsxs("div",{className:"tw:flex tw:gap-2 tw:p-4",children:[t.jsx(Ta,{ref:x,value:B,onSearch:re,placeholder:Ht,isFullWidth:!0,isDisabled:S}),t.jsx(_a,{entries:N,selected:m,onChange:Ut,customSelectedText:ra,placeholder:$,searchPlaceholder:Wt,commandEmptyMessage:Kt,variant:"outline",isDisabled:S,sortSelected:!0,showScrollCue:!0})]}),t.jsx("div",{role:"status",children:u&&t.jsx(ca,{role:void 0,className:"tw:mx-4 tw:mb-2 tw:w-auto tw:bg-muted tw:text-muted-foreground",children:t.jsx(ua,{children:u})})}),ue&&(w==="list"||w==="filteredEmpty")&&t.jsx("p",{className:"tw:px-4 tw:pb-1 tw:text-end tw:text-xs tw:text-muted-foreground",children:he(aa,{filtered:f.length,total:g.length})}),t.jsxs("div",{className:"tw:min-h-0 tw:flex-1 tw:overflow-x-hidden tw:overflow-y-auto tw:px-4 tw:pb-4",children:[w==="loading"&&t.jsx("p",{className:"tw:py-8 tw:text-center",children:t.jsx(Aa,{})}),w==="error"&&t.jsx(q,{icon:t.jsx(pe,{}),message:Jt,retryLabel:Qt,onRetry:s}),w==="filteredEmpty"&&t.jsx(q,{role:"status",icon:t.jsx(Ca,{}),message:Zt,retryLabel:ea,onRetry:Pt}),w==="downloadsUnavailable"&&t.jsx(q,{role:"status",icon:t.jsx(pe,{}),message:ta}),w==="empty"&&t.jsx(da,{className:"tw:py-8 tw:text-center",message:Xt}),w==="list"&&t.jsx(Ra,{children:t.jsxs(xa,{className:"tw:table-fixed",children:[t.jsxs("colgroup",{children:[t.jsx("col",{className:"tw:w-7"}),t.jsx("col",{className:"tw:w-1/4"}),t.jsx("col",{}),t.jsx("col",{className:"tw:w-1/6"})]}),t.jsxs(Na,{children:[t.jsx(Q,{label:Vt,resources:ie,onSelect:It?Y:void 0,showCheckmark:!0}),t.jsx(Q,{label:Yt,resources:le,onSelect:V?Y:void 0,getDisabledReason:ae}),t.jsx(Q,{label:$t,resources:Gt,onSelect:Y,getDisabledReason:ae}),Ot&&t.jsx(H,{className:"tw:border-0",children:t.jsx(b,{colSpan:4,className:"tw:border-0 tw:p-0",children:t.jsx("div",{ref:Mt,"aria-hidden":!0})})})]})]})})]})]})}Tt.__docgenInfo={description:"Presentational dialog content for picking a DBL resource. Renders three sections — Already\nSelected, Installed, and Available to Download — derived from `allResources` and\n`selectedResourceIds`. Supports text search and language filtering.\n\nDoes not include an outer `Dialog` or `DialogContent` wrapper; the host (paranext-core dialog\ninfrastructure or a Storybook decorator) is responsible for providing that context.\n\nObtain localized strings by passing {@link RESOURCE_PICKER_DIALOG_STRING_KEYS} to\n`useLocalizedStrings` and forwarding the result as `localizedStrings`.\n\n@param props See {@link ResourcePickerDialogProps}",methods:[],displayName:"ResourcePickerDialog",props:{allResources:{required:!0,tsType:{name:"Array",elements:[{name:"DblResourceData"}],raw:"DblResourceData[]"},description:"Full list of DBL resources fetched by the caller via PAPI"},isResourcesLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the `allResources` is still loading"},hasResourcesError:{required:!1,tsType:{name:"boolean"},description:'Whether loading `allResources` failed. Distinct from an empty `allResources`: without it the\ndialog can only report "no results", which reads as a truthful empty catalog and leaves the\nuser nothing to act on.'},onRetryResources:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`Re-runs the caller's resource fetch. Omit when the caller has no way to re-drive it; the error
state then renders its message without a retry rather than an inert button.`},areDownloadsUnavailable:{required:!1,tsType:{name:"boolean"},description:`Whether this installation cannot download resources at all, so the list is empty for a reason
that has nothing to do with the user's filters and that no retry can change.

Distinct from \`hasResourcesError\`: that state offers a retry because trying again might work.
This one deliberately offers none, and says why the list is empty instead of leaving the user
to infer it from "no results".`},resourceType:{required:!1,tsType:{name:"union",raw:"ResourceType | ResourceType[]",elements:[{name:"ResourceType"},{name:"Array",elements:[{name:"ResourceType"}],raw:"ResourceType[]"}]},description:`If provided, only resources of this type (or any of the listed types) are shown. Omitting it
shows everything, and so does an empty array — that is what a multi-select with nothing chosen
hands over, and {@link matchesResourceType} treats the two the same. There is no value that
means "show nothing".`},notice:{required:!1,tsType:{name:"string"},description:`Already-localized sentence shown above the resource list explaining why the list is INCOMPLETE
but still usable — for example that the online catalog could not be reached, so only the
resources already on this computer are listed. Omit when the list is complete.

Distinct from \`hasResourcesError\`, which is for having nothing to show at all: a notice keeps
the user working against a partial list, where the error state replaces it.`},allowSelectingInstalled:{required:!1,tsType:{name:"boolean"},description:`When false, rows in the "Installed" section are shown but cannot be picked. Use it when the
caller can act on a resource that still needs installing but has nothing to do with one that is
already on disk, so an installed row would accept a click and then silently do nothing.
Defaults to true.`,defaultValue:{value:"true",computed:!1}},selectedResourceIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"IDs of resources already selected in the calling panel"},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [key in (typeof RESOURCE_PICKER_DIALOG_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof RESOURCE_PICKER_DIALOG_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:"Localized strings — use RESOURCE_PICKER_DIALOG_STRING_KEYS with useLocalizedStrings"},allowDeselect:{required:!1,tsType:{name:"boolean"},description:`When true, clicking an "Already Selected" row calls \`onSelect\` just like any other row, letting
the caller treat it as a deselect. Defaults to false (Already Selected rows stay
non-interactive, showing only a checkmark) to preserve existing consumers' behavior.`},getDisabledReason:{required:!1,tsType:{name:"signature",type:"function",raw:"(resource: DblResourceData) => string | undefined",signature:{arguments:[{type:{name:"DblResourceData"},name:"resource"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:`Returns why a resource cannot be picked, or \`undefined\` when it can. Applies to the "Installed"
and "Available to Download" rows only, so a resource that is already selected can still be
deselected.

A row with a reason is shown dimmed with a lock icon and is not selectable. The reason appears
in a tooltip on hover and keyboard focus, and is the row's description for screen readers.`},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(resource: DblResourceData) => void",signature:{arguments:[{type:{name:"DblResourceData"},name:"resource"}],return:{name:"void"}}},description:"Called when the user clicks a resource row to select it"},searchInputRef:{required:!1,tsType:{name:"RefObject",elements:[{name:"union",raw:"HTMLInputElement | null",elements:[{name:"HTMLInputElement"},{name:"null"}]}],raw:"RefObject<HTMLInputElement | null>"},description:`Ref to the search input, for a host that decides where focus lands when the dialog opens.

Without it a host can only order its JSX and hope: the picker disables its search box whenever
there is nothing to filter, so "render the close button last so focus lands on search" silently
lands on whatever is tabbable instead — the Retry button, or the close button itself. A host
holding this ref can state the intent directly and stay correct when the box is disabled.`}}};const za=[{dblEntryUid:"selected-1",displayName:"NIV",fullName:"New International Version",bestLanguageName:"English",type:"ScriptureResource",size:12e6,installed:!0,updateAvailable:!1,projectId:"prj-niv"},{dblEntryUid:"selected-2",displayName:"RVR60",fullName:"Reina Valera 1960",bestLanguageName:"Spanish",type:"ScriptureResource",size:98e5,installed:!0,updateAvailable:!1,projectId:"prj-rvr"},{dblEntryUid:"installed-1",displayName:"ESV",fullName:"English Standard Version",bestLanguageName:"English",type:"ScriptureResource",size:115e5,installed:!0,updateAvailable:!1,projectId:"prj-esv"},{dblEntryUid:"installed-2",displayName:"KJV",fullName:"King James Version",bestLanguageName:"English",type:"ScriptureResource",size:82e5,installed:!0,updateAvailable:!0,projectId:"prj-kjv"},{dblEntryUid:"installed-3",displayName:"UBS-SLR",fullName:"UBS Source Language Resource",bestLanguageName:"Greek",type:"SourceLanguageResource",size:25e6,installed:!0,updateAvailable:!1,projectId:"prj-ubsslr"},{dblEntryUid:"download-1",displayName:"NLT",fullName:"New Living Translation",bestLanguageName:"English",type:"ScriptureResource",size:102e5,installed:!1,updateAvailable:!1,projectId:"prj-nlt"},{dblEntryUid:"download-2",displayName:"UBS HB",fullName:"UBS Handbook",bestLanguageName:"English",type:"XmlResource",size:54e5,installed:!1,updateAvailable:!1,projectId:"prj-ubshb"},{dblEntryUid:"download-3",displayName:"SIL TNN",fullName:"SIL Translation Notes and Drafts",bestLanguageName:"English",type:"XmlResource",size:32e5,installed:!1,updateAvailable:!1,projectId:"prj-siltnn"},{dblEntryUid:"download-4",displayName:"BHS",fullName:"Biblia Hebraica Stuttgartensia",bestLanguageName:"Hebrew",type:"SourceLanguageResource",size:187e5,installed:!1,updateAvailable:!1,projectId:"prj-bhs"}],Fa=["selected-1","selected-2"],me=["English","Spanish","French","Arabic","Hindi","Portuguese","Swahili","Mandarin","Russian","German"],W=["ScriptureResource","SourceLanguageResource","XmlResource"];function Ha(e){return Array.from({length:e},(a,r)=>({dblEntryUid:`gen-${r}`,displayName:`RES-${r}`,fullName:`Generated Resource ${r}`,bestLanguageName:me[r%me.length],type:W[r%W.length],size:5e6+r*1e3,installed:!1,updateAvailable:!1,projectId:`prj-gen-${r}`}))}const Wa=Ha(2500),Z=["Afrikaans","Akan","Albanian","Amharic","Arabic","Armenian","Assamese","Aymara","Azerbaijani","Balinese","Bambara","Basque","Belarusian","Bemba","Bengali","Bikol","Bosnian","Bulgarian","Burmese","Cebuano","Chichewa","Chin, Hakha","Chuvash","Coptic","Croatian","Czech","Danish","Dinka","Dutch","Dzongkha","Efik","English","Estonian","Ewe","Faroese","Fijian","Finnish","French","Fulfulde","Ga","Ge'ez","Georgian","German","Gikuyu","Greek","Guarani","Gujarati","Haitian Creole","Hausa","Hebrew","Hiligaynon","Hindi","Hmong","Hungarian","Icelandic","Igbo","Ilocano","Indonesian","Inuktitut","Italian","Japanese","Javanese","Kannada","Kanuri","Kazakh","Khmer","Kinyarwanda","Kirundi","Konkani","Korean","Kurdish","Kyrgyz","Lao","Latvian","Lingala","Lithuanian","Luganda","Luo","Macedonian","Malagasy","Malay","Malayalam","Maltese","Mandarin","Maori","Marathi","Mongolian","Nahuatl","Nepali","Norwegian","Odia","Oromo","Pashto","Persian","Polish","Portuguese","Punjabi","Quechua","Romanian","Russian","Samoan","Sango","Serbian","Sesotho","Shona","Sindhi","Sinhala","Slovak","Slovenian","Somali","Spanish","Swahili","Swedish","Syriac","Tagalog","Tajik","Tamil","Telugu","Thai","Tigrinya","Tongan","Tsonga","Turkish","Ugaritic","Ukrainian","Urdu","Uzbek","Vietnamese","Wolof","Xhosa","Yoruba","Zulu"],ee=["Amharic","Nepali","Portuguese","Quechua","Swahili","Tagalog"],Ka=["Coptic","Ge'ez","Syriac","Ugaritic"];function Va(){const e=[];for(let r=0;r<Z.length;r++){const s=Z[r*37%Z.length],n=Ka.includes(s),i=ee.includes(s),o=1+r%3;for(let u=0;u<o;u++)e.push({dblEntryUid:`many-${r}-${u}`,displayName:`${s.slice(0,3).toUpperCase()}${r}-${u+1}`,fullName:`${s} Resource ${u+1}`,bestLanguageName:s,type:n?"XmlResource":W[(r+u)%W.length],size:4e6+r*1e4+u*1e3,installed:i&&u===0,updateAvailable:!1,projectId:`prj-many-${r}-${u}`})}return e}const z=Va(),{expect:p,userEvent:y,waitFor:F,within:C}=__STORYBOOK_MODULE_TEST__,te={"%resourcePicker_title%":"Resource picker","%resourcePicker_description%":"Choose a resource to add. Picking one downloads it if it isn't already installed.","%resourcePicker_section_already_selected%":"Included","%resourcePicker_section_installed%":"Installed","%resourcePicker_section_available_to_download%":"Available to download","%resourcePicker_no_results%":"No results found","%resourcePicker_search_placeholder%":"Search resources…","%resourcePicker_language_filter_any%":"Any language","%resourcePicker_language_filter_search_placeholder%":"Search languages…","%resourcePicker_language_filter_no_results%":"No languages found","%resourcePicker_language_filter_multipleSelected%":"{selectCount} languages","%resourcePicker_showing_count%":"Showing {filtered} of {total} resources","%resourcePicker_load_error%":"Couldn't load the list of available resources.","%resourcePicker_retry%":"Try again","%resourcePicker_no_results_filtered%":"No resources match the current filters.","%resourcePicker_clear_filters%":"Clear filters","%resourcePicker_downloads_unavailable%":"Resource downloads aren't available on this installation."},Vr={title:"Advanced/ResourcePickerDialog",component:Tt,tags:["autodocs","test"],decorators:[e=>t.jsx(la,{open:!0,modal:!1,children:t.jsx("div",{className:"tw:flex tw:h-[600px] tw:w-[560px] tw:flex-col tw:rounded-lg tw:border tw:bg-background tw:shadow-xl",children:t.jsx(e,{})})})],args:{allResources:za,selectedResourceIds:Fa,localizedStrings:te,onSelect:e=>console.log("Selected:",e)}};function K(e){const a=e.querySelector('[data-slot="command-list"]');if(!a)throw new Error("The language filter list did not render");return a}function At(e){return[...K(e).querySelectorAll('[role="option"]')].map(a=>(a.textContent??"").replace(/\d+$/,"").trim())}const P={play:async({canvasElement:e,step:a})=>{const r=C(e.ownerDocument.body);await a("Open the language filter",async()=>{await y.click(r.getByRole("combobox"))}),await a("A list that fits draws no below-the-fold cue",async()=>{const s=K(e.ownerDocument);await p(s.scrollHeight).toBeLessThanOrEqual(s.clientHeight),await p(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull()}),await a("Leave the dialog as the reference example",async()=>{await y.keyboard("{Escape}"),await F(()=>p(e.ownerDocument.querySelector('[data-slot="command-list"]')).toBeNull())})}},U={args:{resourceType:"ScriptureResource"}},G={args:{allResources:[]}},E={args:{allResources:[],hasResourcesError:!0,onRetryResources:()=>console.log("Retry requested")}},v={play:async({canvasElement:e})=>{const a=C(e),r=await a.findByPlaceholderText(te["%resourcePicker_search_placeholder%"]??"");await y.type(r,"zzznomatch"),await p(await a.findByText(te["%resourcePicker_no_results_filtered%"]??"")).toBeInTheDocument()}},M={args:{selectedResourceIds:[]}},O={name:"Large Resource List (2500 entries)",args:{allResources:Wa,selectedResourceIds:[]}},L={args:{notice:"Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."}},_={args:{hasResourcesError:!0,notice:"Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."}},T={args:{allowSelectingInstalled:!1,notice:"No project is selected, so a resource you choose here will be downloaded to this computer but not added to a text collection."}},kt="An Extremely Long Resource Full Name That Keeps Going Well Past Any Reasonable Dialog Width",Dt={dblEntryUid:"long-1",displayName:"aVeryLongShortNameThatRefusesToWrapAnywhere",fullName:kt,bestLanguageName:"A Language With An Unreasonably Long Display Name",type:"ScriptureResource",size:1,installed:!1,updateAvailable:!1,projectId:"long-proj"},jt=async e=>{const s=(await C(e).findByText(kt)).closest(".tw\\:overflow-y-auto");if(!s)throw new Error("resource list scroll container not found");p(s.clientWidth).toBeGreaterThan(0),p(s.scrollWidth).toBeLessThanOrEqual(s.clientWidth)},A={args:{allResources:[Dt],selectedResourceIds:[]},play:async({canvasElement:e})=>jt(e)},k={decorators:[e=>t.jsx("div",{className:"tw:flex tw:min-h-0 tw:w-[320px] tw:flex-col",children:t.jsx(e,{})})],args:{allResources:[Dt],selectedResourceIds:[]},play:async({canvasElement:e})=>jt(e)},D={name:"Many Languages (~130)",args:{allResources:z,selectedResourceIds:[]},play:async({canvasElement:e,step:a})=>{const r=C(e.ownerDocument.body);await a("Open the language filter",async()=>{await y.click(r.getByRole("combobox"))}),await a("The search box is localized, not built from an English template",async()=>{await p(await r.findByPlaceholderText("Search languages…")).toBeInTheDocument()}),await a("Languages with installed resources come first, alphabetically",async()=>{const s=At(e.ownerDocument).slice(0,ee.length);await p(s).toEqual([...ee].sort((n,i)=>n.localeCompare(i)))}),await a("The list overflows and scrolls rather than showing everything",async()=>{const s=K(e.ownerDocument);await p(s.scrollHeight).toBeGreaterThan(s.clientHeight)}),await a("A below-the-fold cue marks the list as continuing past the fold",async()=>{await F(async()=>{await p(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).not.toBeNull()})}),await a("Scrolling to the end retires the cue",async()=>{const s=K(e.ownerDocument);s.scrollTop=s.scrollHeight,await F(async()=>{await p(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull()}),s.scrollTop=0}),await a("Filtering to a short list retires the cue and re-measures",async()=>{const s=await r.findByPlaceholderText("Search languages…");await y.type(s,"Amhar"),await F(async()=>{await p(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull()})}),await a("A query matching no language shows the localized empty message",async()=>{const s=await r.findByPlaceholderText("Search languages…");await y.clear(s),await y.type(s,"zzzznotalanguage"),await p(await r.findByText("No languages found")).toBeInTheDocument()})}},j={name:"Many Languages, Scripture only",args:{allResources:z,selectedResourceIds:[],resourceType:"ScriptureResource"},play:async({canvasElement:e,step:a})=>{const r=C(e.ownerDocument.body);await a("Open the language filter",async()=>{await y.click(r.getByRole("combobox"))}),await a("The offered languages are exactly those with a Scripture resource",async()=>{const s=new Set(At(e.ownerDocument)),n=new Set(z.filter(o=>o.type==="ScriptureResource").map(o=>o.bestLanguageName)),i=[...new Set(z.map(o=>o.bestLanguageName))].filter(o=>!n.has(o));await p(i.length).toBeGreaterThan(0),await p(i.filter(o=>s.has(o))).toEqual([]),await p([...s].sort()).toEqual([...n].sort())})}},I={args:{getDisabledReason:e=>e.displayName==="ESV"||e.displayName==="NLT"?"Not available for this translation":void 0}};var ge,we,ye;P.parameters={...P.parameters,docs:{...(ge=P.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  play: async ({
    canvasElement,
    step
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await step('Open the language filter', async () => {
      await userEvent.click(body.getByRole('combobox'));
    });
    await step('A list that fits draws no below-the-fold cue', async () => {
      // Negative control for the cue asserted in the Many Languages story: with four languages the
      // list does not overflow, so the fade must be absent.
      const list = getLanguageList(canvasElement.ownerDocument);
      await expect(list.scrollHeight).toBeLessThanOrEqual(list.clientHeight);
      await expect(canvasElement.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull();
    });
    await step('Leave the dialog as the reference example', async () => {
      // This is the story consumers copy args from, so it should not be left with a dropdown over
      // the sections it exists to show.
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(canvasElement.ownerDocument.querySelector('[data-slot="command-list"]')).toBeNull());
    });
  }
}`,...(ye=(we=P.parameters)==null?void 0:we.docs)==null?void 0:ye.source}}};var fe,be,Se;U.parameters={...U.parameters,docs:{...(fe=U.parameters)==null?void 0:fe.docs,source:{originalSource:`{
  args: {
    resourceType: 'ScriptureResource'
  }
}`,...(Se=(be=U.parameters)==null?void 0:be.docs)==null?void 0:Se.source}}};var xe,Ne,Re;G.parameters={...G.parameters,docs:{...(xe=G.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    allResources: []
  }
}`,...(Re=(Ne=G.parameters)==null?void 0:Ne.docs)==null?void 0:Re.source}}};var Ee,ve,Le,_e,Te;E.parameters={...E.parameters,docs:{...(Ee=E.parameters)==null?void 0:Ee.docs,source:{originalSource:`{
  args: {
    allResources: [],
    hasResourcesError: true,
    onRetryResources: () => console.log('Retry requested')
  }
}`,...(Le=(ve=E.parameters)==null?void 0:ve.docs)==null?void 0:Le.source},description:{story:`The catalog fetch failed. Distinguishable from {@link NoResults} — which reports a genuinely empty
catalog — and paired with the retry that can actually re-drive the fetch.`,...(Te=(_e=E.parameters)==null?void 0:_e.docs)==null?void 0:Te.description}}};var Ae,ke,De,je,Ie;v.parameters={...v.parameters,docs:{...(Ae=v.parameters)==null?void 0:Ae.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const searchInput = await canvas.findByPlaceholderText(STRINGS['%resourcePicker_search_placeholder%'] ?? '');
    await userEvent.type(searchInput, 'zzznomatch');
    await expect(await canvas.findByText(STRINGS['%resourcePicker_no_results_filtered%'] ?? '')).toBeInTheDocument();
  }
}`,...(De=(ke=v.parameters)==null?void 0:ke.docs)==null?void 0:De.source},description:{story:"The filtered-empty state: it blames the filter rather than the catalog, and offers a one-click\nway back to the full list. Driven by the component's own filter state, so the `play` function\ntypes a non-matching term rather than presetting a prop.",...(Ie=(je=v.parameters)==null?void 0:je.docs)==null?void 0:Ie.description}}};var Ce,Be,Pe;M.parameters={...M.parameters,docs:{...(Ce=M.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    selectedResourceIds: []
  }
}`,...(Pe=(Be=M.parameters)==null?void 0:Be.docs)==null?void 0:Pe.source}}};var Ue,Ge,Me;O.parameters={...O.parameters,docs:{...(Ue=O.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  name: 'Large Resource List (2500 entries)',
  args: {
    allResources: LARGE_SAMPLE_RESOURCES,
    selectedResourceIds: []
  }
}`,...(Me=(Ge=O.parameters)==null?void 0:Ge.docs)==null?void 0:Me.source}}};var Oe,qe,ze,Fe,He;L.parameters={...L.parameters,docs:{...(Oe=L.parameters)==null?void 0:Oe.docs,source:{originalSource:`{
  args: {
    notice: "Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."
  }
}`,...(ze=(qe=L.parameters)==null?void 0:qe.docs)==null?void 0:ze.source},description:{story:"`notice` explains why the list may be short — an unreachable online catalog, or something the\ncalling panel knows. The text arrives already localized; the dialog only renders it.",...(He=(Fe=L.parameters)==null?void 0:Fe.docs)==null?void 0:He.description}}};var We,Ke,Ve,Ye,$e;_.parameters={..._.parameters,docs:{...(We=_.parameters)==null?void 0:We.docs,source:{originalSource:`{
  args: {
    hasResourcesError: true,
    notice: "Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."
  }
}`,...(Ve=(Ke=_.parameters)==null?void 0:Ke.docs)==null?void 0:Ve.source},description:{story:`A partial failure keeps the list and explains itself in the notice. The error state is reserved
for having nothing to show at all, so it must not replace rows that did load.`,...($e=(Ye=_.parameters)==null?void 0:Ye.docs)==null?void 0:$e.description}}};var Xe,Je,Qe,Ze,et;T.parameters={...T.parameters,docs:{...(Xe=T.parameters)==null?void 0:Xe.docs,source:{originalSource:`{
  args: {
    allowSelectingInstalled: false,
    notice: 'No project is selected, so a resource you choose here will be downloaded to this computer but not added to a text collection.'
  }
}`,...(Qe=(Je=T.parameters)==null?void 0:Je.docs)==null?void 0:Qe.source},description:{story:"`allowSelectingInstalled={false}` greys out the Installed section while leaving Available to\nDownload pickable — for a caller that can install a resource but has nothing to do with one\nalready on disk.",...(et=(Ze=T.parameters)==null?void 0:Ze.docs)==null?void 0:et.description}}};var tt,at,rt,st,ot;A.parameters={...A.parameters,docs:{...(tt=A.parameters)==null?void 0:tt.docs,source:{originalSource:`{
  args: {
    allResources: [LONG_NAME_RESOURCE],
    selectedResourceIds: []
  },
  play: async ({
    canvasElement
  }) => expectNoHorizontalScroll(canvasElement)
}`,...(rt=(at=A.parameters)==null?void 0:at.docs)==null?void 0:rt.source},description:{story:`A resource whose names are far wider than the 560px dialog this file's decorator renders. The
columns truncate; the list must not gain a horizontal scrollbar, which hides the language column
off the right edge and is never the right answer for a name that is merely long.

Asserted in a real browser rather than jsdom on purpose: jsdom has no layout, so \`scrollWidth\`
and \`clientWidth\` are both 0 there and the check would pass no matter what the CSS said.`,...(ot=(st=A.parameters)==null?void 0:st.docs)==null?void 0:ot.description}}};var nt,it,lt,ct,ut;k.parameters={...k.parameters,docs:{...(nt=k.parameters)==null?void 0:nt.docs,source:{originalSource:`{
  decorators: [Story => <div className="tw:flex tw:min-h-0 tw:w-[320px] tw:flex-col">
        <Story />
      </div>],
  args: {
    allResources: [LONG_NAME_RESOURCE],
    selectedResourceIds: []
  },
  play: async ({
    canvasElement
  }) => expectNoHorizontalScroll(canvasElement)
}`,...(lt=(it=k.parameters)==null?void 0:it.docs)==null?void 0:lt.source},description:{story:`The same guard at a deliberately narrow width. The defect is reported against two conditions — a
long name AND a small dialog — and either one alone can pass: at the file-wide 560px the columns
still have room to absorb a long name that a narrower dialog would push past the edge. The inner
wrapper constrains the content inside the meta decorator's fixed-width shell, since a story-level
decorator nests inside that one rather than replacing it.`,...(ut=(ct=k.parameters)==null?void 0:ct.docs)==null?void 0:ut.description}}};var dt,ht,pt,mt,gt;D.parameters={...D.parameters,docs:{...(dt=D.parameters)==null?void 0:dt.docs,source:{originalSource:`{
  name: 'Many Languages (~130)',
  args: {
    allResources: MANY_LANGUAGE_RESOURCES,
    selectedResourceIds: []
  },
  play: async ({
    canvasElement,
    step
  }) => {
    // The language popover portals out of the canvas, so query the whole document.
    const body = within(canvasElement.ownerDocument.body);
    await step('Open the language filter', async () => {
      await userEvent.click(body.getByRole('combobox'));
    });
    await step('The search box is localized, not built from an English template', async () => {
      await expect(await body.findByPlaceholderText('Search languages…')).toBeInTheDocument();
    });
    await step('Languages with installed resources come first, alphabetically', async () => {
      const leadingLabels = getOfferedLanguages(canvasElement.ownerDocument).slice(0, MANY_LANGUAGE_INSTALLED_LANGUAGES.length);
      await expect(leadingLabels).toEqual([...MANY_LANGUAGE_INSTALLED_LANGUAGES].sort((a, b) => a.localeCompare(b)));
    });
    await step('The list overflows and scrolls rather than showing everything', async () => {
      const list = getLanguageList(canvasElement.ownerDocument);
      // A catalogue-sized language list must not fit — if it does, the fixture stopped being
      // representative and the scroll affordance below is untested.
      await expect(list.scrollHeight).toBeGreaterThan(list.clientHeight);
    });
    await step('A below-the-fold cue marks the list as continuing past the fold', async () => {
      // The negative control is the Default story, whose four languages fit and draw no cue.
      // Appearance takes an effect plus a re-render, so it is awaited like the retirements below.
      await waitFor(async () => {
        await expect(canvasElement.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).not.toBeNull();
      });
    });
    await step('Scrolling to the end retires the cue', async () => {
      const list = getLanguageList(canvasElement.ownerDocument);
      list.scrollTop = list.scrollHeight;

      // Covers the hook's \`scroll\` listener: without it the cue would stay drawn at the bottom of
      // a list the user has already reached the end of.
      await waitFor(async () => {
        await expect(canvasElement.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull();
      });
      list.scrollTop = 0;
    });
    await step('Filtering to a short list retires the cue and re-measures', async () => {
      const searchBox = await body.findByPlaceholderText('Search languages…');
      await userEvent.type(searchBox, 'Amhar');

      // Covers the hook's MutationObserver: the scroller's own box never changes size, only its
      // content does, so a resize observer alone would leave the cue drawn over a 1-row list.
      await waitFor(async () => {
        await expect(canvasElement.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull();
      });
    });
    await step('A query matching no language shows the localized empty message', async () => {
      const searchBox = await body.findByPlaceholderText('Search languages…');
      await userEvent.clear(searchBox);
      await userEvent.type(searchBox, 'zzzznotalanguage');
      await expect(await body.findByText('No languages found')).toBeInTheDocument();
    });
  }
}`,...(pt=(ht=D.parameters)==null?void 0:ht.docs)==null?void 0:pt.source},description:{story:`A catalogue-sized language spread (~130 languages, a handful installed). Open the language filter
here to see the scrolling, the installed-first ordering, and the per-language counts — the other
stories have too few languages for the list to overflow at all.`,...(gt=(mt=D.parameters)==null?void 0:mt.docs)==null?void 0:gt.description}}};var wt,yt,ft,bt,St;j.parameters={...j.parameters,docs:{...(wt=j.parameters)==null?void 0:wt.docs,source:{originalSource:`{
  name: 'Many Languages, Scripture only',
  args: {
    allResources: MANY_LANGUAGE_RESOURCES,
    selectedResourceIds: [],
    resourceType: 'ScriptureResource'
  },
  play: async ({
    canvasElement,
    step
  }) => {
    const body = within(canvasElement.ownerDocument.body);
    await step('Open the language filter', async () => {
      await userEvent.click(body.getByRole('combobox'));
    });
    await step('The offered languages are exactly those with a Scripture resource', async () => {
      const offered = new Set(getOfferedLanguages(canvasElement.ownerDocument));

      // Pins the \`resourceType\` argument at the call site: without it every language in the
      // catalogue is offered, and selecting one of these lands on an empty list. Derived from the
      // fixture rather than hardcoded, so it stays honest if the fixture changes.
      const scriptureLanguages = new Set(MANY_LANGUAGE_RESOURCES.filter(r => r.type === 'ScriptureResource').map(r => r.bestLanguageName));
      const languagesWithoutScripture = [...new Set(MANY_LANGUAGE_RESOURCES.map(r => r.bestLanguageName))].filter(language => !scriptureLanguages.has(language));
      await expect(languagesWithoutScripture.length).toBeGreaterThan(0);
      await expect(languagesWithoutScripture.filter(language => offered.has(language))).toEqual([]);
      // ...and the scoping does not over-filter: every language with a Scripture resource is offered.
      await expect([...offered].sort()).toEqual([...scriptureLanguages].sort());
    });
  }
}`,...(ft=(yt=j.parameters)==null?void 0:yt.docs)==null?void 0:ft.source},description:{story:`The same catalogue scoped to Scripture resources. Languages that only have non-Scripture
resources are absent from the language filter, so no selection can produce an empty list.`,...(St=(bt=j.parameters)==null?void 0:bt.docs)==null?void 0:St.description}}};var xt,Nt,Rt,Et,vt;I.parameters={...I.parameters,docs:{...(xt=I.parameters)==null?void 0:xt.docs,source:{originalSource:`{
  args: {
    getDisabledReason: resource => resource.displayName === 'ESV' || resource.displayName === 'NLT' ? 'Not available for this translation' : undefined
  }
}`,...(Rt=(Nt=I.parameters)==null?void 0:Nt.docs)==null?void 0:Rt.source},description:{story:`Some rows cannot be picked, e.g. texts whose license prohibits their use as a model or base for a
new translation. They stay listed, dimmed with a lock icon, and the reason shows in a tooltip on
hover or keyboard focus. The consumer supplies the reason; the one here is sample text.`,...(vt=(Et=I.parameters)==null?void 0:Et.docs)==null?void 0:vt.description}}};const Yr=["Default","WithResourceTypeFilter","NoResults","CatalogFailedToLoad","NoResultsForFilter","EmptyAlreadySelected","LargeResourceList","WithNotice","NoticeWithFailedCatalog","InstalledNotSelectable","LongNamesDoNotScrollHorizontally","LongNamesDoNotScrollHorizontallyWhenNarrow","ManyLanguages","ManyLanguagesScopedToScripture","WithDisabledRows"];export{E as CatalogFailedToLoad,P as Default,M as EmptyAlreadySelected,T as InstalledNotSelectable,O as LargeResourceList,A as LongNamesDoNotScrollHorizontally,k as LongNamesDoNotScrollHorizontallyWhenNarrow,D as ManyLanguages,j as ManyLanguagesScopedToScripture,G as NoResults,v as NoResultsForFilter,_ as NoticeWithFailedCatalog,I as WithDisabledRows,L as WithNotice,U as WithResourceTypeFilter,Yr as __namedExportsOrder,Vr as default};
