import{j as t,r as h}from"./iframe-CTiqha1F.js";import{c as Ka,d as Ya,e as $a,D as Xa}from"./dialog-_CXDspf9.js";import{A as Ja,b as Qa}from"./alert-DkGhUK0D.js";import{B as ra}from"./button-CCR5A31h.js";import{E as Za}from"./empty-state.component-gDYwxw-w.js";import{E as er,a as tr,b as ar,d as rr,e as sr}from"./empty-DX2n0SFw.js";import{c as or}from"./utils-BPbySc-g.js";import{T as nr}from"./triangle-alert-B1sVR6Ug.js";import{L as ir}from"./label-D9fAK6hH.js";import{T as lr,e as cr,c as K,f as x}from"./table-Cn7Wbm-r.js";import{T as ur,a as sa,b as oa,c as na}from"./tooltip-Dj3cN8D6.js";import{M as dr}from"./multi-select-combo-box.component-RZeJnu8p.js";import{S as hr}from"./search-bar.component-BQoOrAyt.js";import{t as ce}from"./index-B2Agy_j1.js";import{S as mr}from"./spinner.component-BSoOwb9P.js";import{c as ia}from"./createLucideIcon-CGw6ljBM.js";import{X as pr}from"./x--2S2QP5M.js";import{L as la}from"./lock-_N4gH-4x.js";import{C as gr}from"./check-gEYu15VO.js";import"./preload-helper-CTOgD26E.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-3Stgw6AR.js";import"./index-DzlMcghe.js";import"./index-BrKo-VD1.js";import"./index-aQscZVDh.js";import"./index-B21Eheaz.js";import"./index-DiPFuyzQ.js";import"./index-BnRkFOQK.js";import"./index-DzoTJT8T.js";import"./index-B8sVvzOx.js";import"./index-4H2VFBTy.js";import"./index-DghOQhbD.js";import"./index-CBrmAWKC.js";import"./index-BnuTq2W6.js";import"./focus.util-DRSEP984.js";import"./portal-container.context-DrmkKJsd.js";import"./index-Crw73O5a.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-Kew961MA.js";import"./index-Bxy-bvsl.js";import"./command-mNDPW3Rv.js";import"./input-group-DaSLtEo4.js";import"./input-BS3i0rDo.js";import"./IconCheck-BWLyNpeJ.js";import"./popover-BnGK_uxG.js";import"./chevrons-up-down-C1pfohDt.js";import"./star-CSuWIqka.js";import"./search-DcC7BO9N.js";import"./index.es-CXoS8DB2.js";import"./index-BkrqCNZF.js";import"./index-Cn7xqC4M.js";import"./loader-circle-B1xQcStJ.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wr=[["path",{d:"M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057",key:"1uxyv8"}],["path",{d:"M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78",key:"99tcn7"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],Se=ia("cloud-off",wr);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yr=[["path",{d:"m13.5 8.5-5 5",key:"1cs55j"}],["path",{d:"m8.5 8.5 5 5",key:"a8mexj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],fr=ia("search-x",yr);function te({message:e,retryLabel:a,onRetry:s,icon:r,role:i="alert",className:l}){return t.jsxs(er,{className:or(l),role:i,children:[t.jsxs(tr,{children:[t.jsx(ar,{variant:"icon",children:r??t.jsx(nr,{})}),t.jsx(rr,{children:e})]}),s&&t.jsx(sr,{children:t.jsx(ra,{onClick:()=>s(),children:a})})]})}te.__docgenInfo={description:`Icon + message zero state for a region that has nothing to show because something failed or is
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
the view then renders its message alone rather than an inert button.`},icon:{required:!1,tsType:{name:"ReactNode"},description:"Overrides the default warning glyph so distinct failures stay distinguishable."},role:{required:!1,tsType:{name:"union",raw:"'alert' | 'status'",elements:[{name:"literal",value:"'alert'"},{name:"literal",value:"'status'"}]},description:"ARIA live-region role. Defaults to `alert` for a failure; pass `status` for a state that\nreports a condition rather than an error, such as a capability this installation does not\nhave.",defaultValue:{value:"'alert'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Class name applied to the `Empty` container so the caller owns sizing within its surface."}}};function br(e,a){return a?Array.isArray(a)?a.length===0||a.includes(e.type):e.type===a:!0}function vr(e){const a=new Map,s=new Set;return e.forEach(r=>{const i=r.bestLanguageName;a.set(i,(a.get(i)??0)+1),r.installed&&s.add(i)}),Array.from(a.entries()).sort(([r],[i])=>r.localeCompare(i)).map(([r,i])=>({label:r,value:r,starred:s.has(r),secondaryLabel:i.toString()}))}function xr(e,a){const s=new Set(a.map(l=>l.value)),r=[],i=[];return e.forEach(l=>(s.has(l)?r:i).push(l)),{offered:r,held:i}}function Nr(e,a=50){const[s,r]=h.useState(a),i=h.useRef(null);return h.useEffect(()=>{r(a)},[e,a]),h.useEffect(()=>{if(s>=e.length)return;const l=i.current,n=new IntersectionObserver(([c])=>{c.isIntersecting&&r(b=>Math.min(b+a,e.length))},{threshold:0});return l&&n.observe(l),()=>n.disconnect()},[s,e.length,a]),{visibleItems:e.slice(0,s),sentinelRef:i,hasMore:s<e.length}}const d=(e,a)=>e[a]??a;function ca({resource:e}){return t.jsxs(t.Fragment,{children:[t.jsx(x,{className:"tw:max-w-0 tw:truncate tw:border-0 tw:py-1 tw:pe-2 tw:text-start tw:font-normal",children:t.jsx("span",{title:e.displayName,children:e.displayName})}),t.jsx(x,{className:"tw:max-w-0 tw:truncate tw:border-0 tw:py-1 tw:ps-2",children:t.jsx("span",{title:e.fullName,children:e.fullName})}),t.jsx(x,{className:"tw:max-w-0 tw:truncate tw:border-0 tw:py-1 tw:ps-4 tw:text-end tw:text-muted-foreground",children:t.jsx("span",{title:e.bestLanguageName,children:e.bestLanguageName})})]})}function Rr({resource:e,reason:a}){const s=h.useId();return t.jsxs(sa,{children:[t.jsx(oa,{asChild:!0,children:t.jsxs(K,{role:"button","aria-disabled":"true","aria-label":e.displayName,"aria-describedby":s,onKeyDown:r=>{(r.key==="Enter"||r.key===" ")&&r.preventDefault()},className:"tw:cursor-not-allowed tw:border-0 tw:opacity-50 tw:hover:bg-transparent",children:[t.jsxs(x,{className:"tw:border-0 tw:px-1 tw:py-1",children:[t.jsx(la,{className:"tw:h-3.5 tw:w-3.5","aria-hidden":!0}),t.jsx("span",{id:s,className:"tw:sr-only",children:a})]}),t.jsx(ca,{resource:e})]})}),t.jsx(na,{className:"tw:max-w-xs",children:a})]})}function D({label:e,caption:a,resources:s,onSelect:r,onRemove:i,getRemoveLabel:l,indicator:n,indicatorLabel:c,getDisabledReason:b}){const L=h.useId();if(s.length===0)return;const u=n==="lock"?la:gr;return t.jsxs(t.Fragment,{children:[t.jsx(K,{className:"tw:border-0 tw:hover:bg-transparent",children:t.jsx(x,{colSpan:4,className:"tw:border-0 tw:pt-4 tw:pb-0",children:t.jsx(ir,{className:"tw:text-xs tw:tracking-wider tw:text-muted-foreground tw:uppercase",children:e})})}),a&&t.jsx(K,{className:"tw:border-0 tw:hover:bg-transparent",children:t.jsx(x,{id:L,colSpan:4,className:"tw:border-0 tw:pt-0 tw:pb-1 tw:text-xs tw:whitespace-normal tw:text-muted-foreground",children:a})}),s.map(p=>{const T=b==null?void 0:b(p);return T?t.jsx(Rr,{resource:p,reason:T},p.dblEntryUid):t.jsxs(K,{className:r?"tw:cursor-pointer tw:border-0":"tw:cursor-default tw:border-0 tw:hover:bg-transparent",role:r?"button":void 0,"aria-label":r?p.displayName:void 0,"aria-describedby":r&&a?L:void 0,onClick:r?()=>r(p):void 0,onMouseDown:r?void 0:w=>w.preventDefault(),onKeyDown:r?w=>{(w.key==="Enter"||w.key===" ")&&(w.preventDefault(),r(p))}:void 0,children:[t.jsx(x,{className:"tw:border-0 tw:px-1 tw:py-1",children:i?t.jsxs(sa,{children:[t.jsx(oa,{asChild:!0,children:t.jsx(ra,{variant:"ghost",size:"icon-xs",className:"tw:size-5","aria-label":(l==null?void 0:l(p))??p.displayName,"aria-describedby":a?L:void 0,onClick:()=>i(p),children:t.jsx(pr,{className:"tw:h-3.5 tw:w-3.5","aria-hidden":!0})})}),t.jsx(na,{children:(l==null?void 0:l(p))??p.displayName})]}):n&&t.jsxs(t.Fragment,{children:[t.jsx(u,{className:"tw:h-3.5 tw:w-3.5","aria-hidden":!0}),t.jsx("span",{className:"tw:sr-only",children:c??e})]})}),t.jsx(ca,{resource:p})]},p.dblEntryUid)})]})}function Sr(e){return e.isResourcesLoading?"loading":e.hasNoResults?e.canClearFiltersHelp?"filteredEmpty":e.hasResourcesError?"error":e.areDownloadsUnavailable?"downloadsUnavailable":"empty":"list"}function Er(e,a){if(!a)return!0;const s=a.toLowerCase();return e.displayName.toLowerCase().includes(s)||e.fullName.toLowerCase().includes(s)||e.bestLanguageName.toLowerCase().includes(s)}function ua({allResources:e,isResourcesLoading:a,hasResourcesError:s,onRetryResources:r,areDownloadsUnavailable:i,resourceType:l,selectedResourceIds:n,teamResourceIds:c,notice:b,allowSelectingInstalled:L=!0,localizedStrings:u,allowDeselect:p,getDisabledReason:T,onSelect:w,onRemove:me,searchInputRef:ma}){const[$,pe]=h.useState(""),[ge,we]=h.useState([]),pa=h.useRef(null),k=ma??pa,ga=h.useCallback(()=>{var o;pe(""),we([]),(o=k.current)==null||o.focus()},[k]),y=h.useMemo(()=>e.filter(o=>br(o,l)),[e,l]),A=h.useMemo(()=>vr(y),[y]),{offered:g,held:ye}=h.useMemo(()=>xr(ge,A),[ge,A]),wa=h.useCallback(o=>we([...ye,...o]),[ye]),N=h.useMemo(()=>y.filter(o=>Er(o,$)).filter(o=>g.length===0||g.includes(o.bestLanguageName)),[y,$,g]),S=h.useMemo(()=>N.filter(o=>n==null?void 0:n.includes(o.dblEntryUid)),[N,n]),fe=c!==void 0,ya=h.useMemo(()=>S.filter(o=>c==null?void 0:c.includes(o.dblEntryUid)),[S,c]),fa=h.useMemo(()=>S.filter(o=>!(c!=null&&c.includes(o.dblEntryUid))),[S,c]),be=h.useMemo(()=>N.filter(o=>o.installed&&!(n!=null&&n.includes(o.dblEntryUid))),[N,n]),ve=h.useMemo(()=>N.filter(o=>!o.installed&&!(n!=null&&n.includes(o.dblEntryUid))),[N,n]),{visibleItems:ba,sentinelRef:va,hasMore:xa}=Nr(ve),Na=S.length===0&&be.length===0&&ve.length===0,Ra=d(u,"%resourcePicker_title%"),xe=fe&&!!me&&y.some(o=>(n==null?void 0:n.includes(o.dblEntryUid))&&!(c!=null&&c.includes(o.dblEntryUid))),Sa=d(u,xe?"%resourcePicker_description_withRemove%":"%resourcePicker_description%"),Ea=d(u,"%resourcePicker_search_placeholder%"),ne=d(u,"%resourcePicker_language_filter_any%"),_a=d(u,"%resourcePicker_language_filter_search_placeholder%"),La=d(u,"%resourcePicker_language_filter_no_results%"),Ta=d(u,"%resourcePicker_section_already_selected%"),ka=d(u,"%resourcePicker_section_team%"),Aa=d(u,"%resourcePicker_section_team_caption%"),ja=d(u,"%resourcePicker_teamLock%"),Da=d(u,"%resourcePicker_section_user%"),Ba=d(u,"%resourcePicker_section_user_caption%"),Ia=d(u,"%resourcePicker_removeFromList%"),Ca=o=>ce(Ia,{resourceName:o.displayName}),Pa=d(u,"%resourcePicker_section_installed%"),Ua=d(u,"%resourcePicker_section_available_to_download%"),Oa=d(u,"%resourcePicker_no_results%"),Ga=d(u,"%resourcePicker_load_error%"),Ma=d(u,"%resourcePicker_retry%"),qa=d(u,"%resourcePicker_no_results_filtered%"),Fa=d(u,"%resourcePicker_clear_filters%"),za=d(u,"%resourcePicker_downloads_unavailable%"),Ha=d(u,"%resourcePicker_showing_count%"),ie=g.length>0&&y.some(o=>!g.includes(o.bestLanguageName)),Ne=$.length>0||ie,Wa=h.useMemo(()=>{var o;return ie?g.length===1?((o=A.find(j=>j.value===g[0]))==null?void 0:o.label)??g[0]:ce(d(u,"%resourcePicker_language_filter_multipleSelected%"),{selectCount:g.length}):ne},[ie,g,A,ne,u]),Va=Ne&&y.length>0,E=!!a||!!s||y.length===0,Re=h.useRef(E);h.useEffect(()=>{const o=Re.current&&!E;if(Re.current=E,!o)return;const j=k.current;if(!j||j.disabled)return;const{activeElement:le}=document;(!le||le===document.body||le.getAttribute("data-slot")==="dialog-content")&&j.focus()},[E,k]);const v=Sr({isResourcesLoading:!!a,hasResourcesError:!!s,hasNoResults:Na,canClearFiltersHelp:Va,areDownloadsUnavailable:!!i});return t.jsxs(t.Fragment,{children:[t.jsxs(Ka,{className:"tw:px-4 tw:pt-4",children:[t.jsx(Ya,{children:Ra}),t.jsx($a,{className:"tw:sr-only",children:Sa})]}),t.jsxs("div",{className:"tw:flex tw:gap-2 tw:p-4",children:[t.jsx(hr,{ref:k,value:$,onSearch:pe,placeholder:Ea,isFullWidth:!0,isDisabled:E}),t.jsx(dr,{entries:A,selected:g,onChange:wa,customSelectedText:Wa,placeholder:ne,searchPlaceholder:_a,commandEmptyMessage:La,variant:"outline",isDisabled:E,sortSelected:!0,showScrollCue:!0})]}),t.jsx("div",{role:"status",children:b&&t.jsx(Ja,{role:void 0,className:"tw:mx-4 tw:mb-2 tw:w-auto tw:bg-muted tw:text-muted-foreground",children:t.jsx(Qa,{children:b})})}),Ne&&(v==="list"||v==="filteredEmpty")&&t.jsx("p",{className:"tw:px-4 tw:pb-1 tw:text-end tw:text-xs tw:text-muted-foreground",children:ce(Ha,{filtered:N.length,total:y.length})}),t.jsxs("div",{className:"tw:min-h-0 tw:flex-1 tw:overflow-x-hidden tw:overflow-y-auto tw:px-4 tw:pb-4",children:[v==="loading"&&t.jsx("p",{className:"tw:py-8 tw:text-center",children:t.jsx(mr,{})}),v==="error"&&t.jsx(te,{icon:t.jsx(Se,{}),message:Ga,retryLabel:Ma,onRetry:r}),v==="filteredEmpty"&&t.jsx(te,{role:"status",icon:t.jsx(fr,{}),message:qa,retryLabel:Fa,onRetry:ga}),v==="downloadsUnavailable"&&t.jsx(te,{role:"status",icon:t.jsx(Se,{}),message:za}),v==="empty"&&t.jsx(Za,{className:"tw:py-8 tw:text-center",message:Oa}),v==="list"&&t.jsx(ur,{children:t.jsxs(lr,{className:"tw:table-fixed",children:[t.jsxs("colgroup",{children:[t.jsx("col",{className:"tw:w-7"}),t.jsx("col",{className:"tw:w-1/4"}),t.jsx("col",{}),t.jsx("col",{className:"tw:w-1/6"})]}),t.jsxs(cr,{children:[fe?t.jsxs(t.Fragment,{children:[t.jsx(D,{label:ka,caption:Aa,resources:ya,indicator:"lock",indicatorLabel:ja}),t.jsx(D,{label:Da,caption:xe?Ba:void 0,resources:fa,onRemove:me,getRemoveLabel:Ca,indicator:"check"})]}):t.jsx(D,{label:Ta,resources:S,onSelect:p?w:void 0,indicator:"check"}),t.jsx(D,{label:Pa,resources:be,onSelect:L?w:void 0,getDisabledReason:T}),t.jsx(D,{label:Ua,resources:ba,onSelect:w,getDisabledReason:T}),xa&&t.jsx(K,{className:"tw:border-0",children:t.jsx(x,{colSpan:4,className:"tw:border-0 tw:p-0",children:t.jsx("div",{ref:va,"aria-hidden":!0})})})]})]})})]})]})}ua.__docgenInfo={description:"Presentational dialog content for picking a DBL resource. Renders three sections — Already\nSelected, Installed, and Available to Download — derived from `allResources` and\n`selectedResourceIds`. Supports text search and language filtering.\n\nDoes not include an outer `Dialog` or `DialogContent` wrapper; the host (paranext-core dialog\ninfrastructure or a Storybook decorator) is responsible for providing that context.\n\nObtain localized strings by passing {@link RESOURCE_PICKER_DIALOG_STRING_KEYS} to\n`useLocalizedStrings` and forwarding the result as `localizedStrings`.\n\n@param props See {@link ResourcePickerDialogProps}",methods:[],displayName:"ResourcePickerDialog",props:{allResources:{required:!0,tsType:{name:"Array",elements:[{name:"DblResourceData"}],raw:"DblResourceData[]"},description:"Full list of DBL resources fetched by the caller via PAPI"},isResourcesLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the `allResources` is still loading"},hasResourcesError:{required:!1,tsType:{name:"boolean"},description:'Whether loading `allResources` failed. Distinct from an empty `allResources`: without it the\ndialog can only report "no results", which reads as a truthful empty catalog and leaves the\nuser nothing to act on.'},onRetryResources:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`Re-runs the caller's resource fetch. Omit when the caller has no way to re-drive it; the error
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
Defaults to true.`,defaultValue:{value:"true",computed:!1}},selectedResourceIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:"IDs of resources already selected in the calling panel"},teamResourceIds:{required:!1,tsType:{name:"Array",elements:[{name:"string"}],raw:"string[]"},description:'IDs among `selectedResourceIds` that belong to the team: the resources a project administrator\nshared, which the user cannot deselect. An ID that is not also in `selectedResourceIds` is\nignored.\n\nWhen provided, the selected rows are listed in two sections instead of one "Included" section:\n"Team resources", each marked with a lock and never selectable, and "User resources", which\n`onRemove` gives a remove button. When omitted, every selected row is listed under "Included".\nIDs are compared exactly, as `selectedResourceIds` are.'},localizedStrings:{required:!0,tsType:{name:"signature",type:"object",raw:`{
  [key in (typeof RESOURCE_PICKER_DIALOG_STRING_KEYS)[number]]?: string;
}`,signature:{properties:[{key:{name:"unknown[number]",raw:"(typeof RESOURCE_PICKER_DIALOG_STRING_KEYS)[number]",required:!1},value:{name:"string"}}]}},description:"Localized strings — use RESOURCE_PICKER_DIALOG_STRING_KEYS with useLocalizedStrings"},allowDeselect:{required:!1,tsType:{name:"boolean"},description:'When true, clicking an "Already Selected" row calls `onSelect` just like any other row, letting\nthe caller treat it as a deselect. Defaults to false (Already Selected rows stay\nnon-interactive, showing only a checkmark) to preserve existing consumers\' behavior.\n\nApplies only to the single "Included" section, so it has no effect when `teamResourceIds` is\nprovided; use `onRemove` there.'},getDisabledReason:{required:!1,tsType:{name:"signature",type:"function",raw:"(resource: DblResourceData) => string | undefined",signature:{arguments:[{type:{name:"DblResourceData"},name:"resource"}],return:{name:"union",raw:"string | undefined",elements:[{name:"string"},{name:"undefined"}]}}},description:`Returns why a resource cannot be picked, or \`undefined\` when it can. Applies to the "Installed"
and "Available to Download" rows only, so a resource that is already selected can still be
deselected.

A row with a reason is shown dimmed with a lock icon and is not selectable. The reason appears
in a tooltip on hover and keyboard focus, and is the row's description for screen readers.`},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(resource: DblResourceData) => void",signature:{arguments:[{type:{name:"DblResourceData"},name:"resource"}],return:{name:"void"}}},description:"Called when the user clicks a resource row to select it"},onRemove:{required:!1,tsType:{name:"signature",type:"function",raw:"(resource: DblResourceData) => void",signature:{arguments:[{type:{name:"DblResourceData"},name:"resource"}],return:{name:"void"}}},description:'Called when the user presses the remove button on a row under "User resources". Those rows get\nthe button only when this is provided and `teamResourceIds` is too; the rest of the row is\nnever clickable, so a click meant to select a resource cannot remove it.'},searchInputRef:{required:!1,tsType:{name:"RefObject",elements:[{name:"union",raw:"HTMLInputElement | null",elements:[{name:"HTMLInputElement"},{name:"null"}]}],raw:"RefObject<HTMLInputElement | null>"},description:`Ref to the search input, for a host that decides where focus lands when the dialog opens.

Without it a host can only order its JSX and hope: the picker disables its search box whenever
there is nothing to filter, so "render the close button last so focus lands on search" silently
lands on whatever is tabbable instead — the Retry button, or the close button itself. A host
holding this ref can state the intent directly and stay correct when the box is disabled.`}}};const _r=[{dblEntryUid:"selected-1",displayName:"NIV",fullName:"New International Version",bestLanguageName:"English",type:"ScriptureResource",size:12e6,installed:!0,updateAvailable:!1,projectId:"prj-niv"},{dblEntryUid:"selected-2",displayName:"RVR60",fullName:"Reina Valera 1960",bestLanguageName:"Spanish",type:"ScriptureResource",size:98e5,installed:!0,updateAvailable:!1,projectId:"prj-rvr"},{dblEntryUid:"installed-1",displayName:"ESV",fullName:"English Standard Version",bestLanguageName:"English",type:"ScriptureResource",size:115e5,installed:!0,updateAvailable:!1,projectId:"prj-esv"},{dblEntryUid:"installed-2",displayName:"KJV",fullName:"King James Version",bestLanguageName:"English",type:"ScriptureResource",size:82e5,installed:!0,updateAvailable:!0,projectId:"prj-kjv"},{dblEntryUid:"installed-3",displayName:"UBS-SLR",fullName:"UBS Source Language Resource",bestLanguageName:"Greek",type:"SourceLanguageResource",size:25e6,installed:!0,updateAvailable:!1,projectId:"prj-ubsslr"},{dblEntryUid:"download-1",displayName:"NLT",fullName:"New Living Translation",bestLanguageName:"English",type:"ScriptureResource",size:102e5,installed:!1,updateAvailable:!1,projectId:"prj-nlt"},{dblEntryUid:"download-2",displayName:"UBS HB",fullName:"UBS Handbook",bestLanguageName:"English",type:"XmlResource",size:54e5,installed:!1,updateAvailable:!1,projectId:"prj-ubshb"},{dblEntryUid:"download-3",displayName:"SIL TNN",fullName:"SIL Translation Notes and Drafts",bestLanguageName:"English",type:"XmlResource",size:32e5,installed:!1,updateAvailable:!1,projectId:"prj-siltnn"},{dblEntryUid:"download-4",displayName:"BHS",fullName:"Biblia Hebraica Stuttgartensia",bestLanguageName:"Hebrew",type:"SourceLanguageResource",size:187e5,installed:!1,updateAvailable:!1,projectId:"prj-bhs"}],Lr=["selected-1","selected-2"],Ee=["English","Spanish","French","Arabic","Hindi","Portuguese","Swahili","Mandarin","Russian","German"],re=["ScriptureResource","SourceLanguageResource","XmlResource"];function Tr(e){return Array.from({length:e},(a,s)=>({dblEntryUid:`gen-${s}`,displayName:`RES-${s}`,fullName:`Generated Resource ${s}`,bestLanguageName:Ee[s%Ee.length],type:re[s%re.length],size:5e6+s*1e3,installed:!1,updateAvailable:!1,projectId:`prj-gen-${s}`}))}const kr=Tr(2500),ue=["Afrikaans","Akan","Albanian","Amharic","Arabic","Armenian","Assamese","Aymara","Azerbaijani","Balinese","Bambara","Basque","Belarusian","Bemba","Bengali","Bikol","Bosnian","Bulgarian","Burmese","Cebuano","Chichewa","Chin, Hakha","Chuvash","Coptic","Croatian","Czech","Danish","Dinka","Dutch","Dzongkha","Efik","English","Estonian","Ewe","Faroese","Fijian","Finnish","French","Fulfulde","Ga","Ge'ez","Georgian","German","Gikuyu","Greek","Guarani","Gujarati","Haitian Creole","Hausa","Hebrew","Hiligaynon","Hindi","Hmong","Hungarian","Icelandic","Igbo","Ilocano","Indonesian","Inuktitut","Italian","Japanese","Javanese","Kannada","Kanuri","Kazakh","Khmer","Kinyarwanda","Kirundi","Konkani","Korean","Kurdish","Kyrgyz","Lao","Latvian","Lingala","Lithuanian","Luganda","Luo","Macedonian","Malagasy","Malay","Malayalam","Maltese","Mandarin","Maori","Marathi","Mongolian","Nahuatl","Nepali","Norwegian","Odia","Oromo","Pashto","Persian","Polish","Portuguese","Punjabi","Quechua","Romanian","Russian","Samoan","Sango","Serbian","Sesotho","Shona","Sindhi","Sinhala","Slovak","Slovenian","Somali","Spanish","Swahili","Swedish","Syriac","Tagalog","Tajik","Tamil","Telugu","Thai","Tigrinya","Tongan","Tsonga","Turkish","Ugaritic","Ukrainian","Urdu","Uzbek","Vietnamese","Wolof","Xhosa","Yoruba","Zulu"],de=["Amharic","Nepali","Portuguese","Quechua","Swahili","Tagalog"],Ar=["Coptic","Ge'ez","Syriac","Ugaritic"];function jr(){const e=[];for(let s=0;s<ue.length;s++){const r=ue[s*37%ue.length],i=Ar.includes(r),l=de.includes(r),n=1+s%3;for(let c=0;c<n;c++)e.push({dblEntryUid:`many-${s}-${c}`,displayName:`${r.slice(0,3).toUpperCase()}${s}-${c+1}`,fullName:`${r} Resource ${c+1}`,bestLanguageName:r,type:i?"XmlResource":re[(s+c)%re.length],size:4e6+s*1e4+c*1e3,installed:l&&c===0,updateAvailable:!1,projectId:`prj-many-${s}-${c}`})}return e}const ae=jr(),{expect:m,userEvent:f,waitFor:Y,within:_}=__STORYBOOK_MODULE_TEST__,he={"%resourcePicker_title%":"Resource picker","%resourcePicker_description%":"Choose a resource to add. Picking one downloads it if it isn't already installed.","%resourcePicker_description_withRemove%":"Choose a resource to add, or remove one of your own from your list. Adding one downloads it if it isn't already installed.","%resourcePicker_section_already_selected%":"Included","%resourcePicker_section_team%":"Team resources","%resourcePicker_section_team_caption%":"Only a project administrator can remove these.","%resourcePicker_section_user%":"User resources","%resourcePicker_section_user_caption%":"Removing one takes it off your list on every tab. It stays installed.","%resourcePicker_teamLock%":"Shared by your team","%resourcePicker_removeFromList%":"Remove {resourceName} from your list","%resourcePicker_section_installed%":"Installed","%resourcePicker_section_available_to_download%":"Available to download","%resourcePicker_no_results%":"No results found","%resourcePicker_search_placeholder%":"Search resources…","%resourcePicker_language_filter_any%":"Any language","%resourcePicker_language_filter_search_placeholder%":"Search languages…","%resourcePicker_language_filter_no_results%":"No languages found","%resourcePicker_language_filter_multipleSelected%":"{selectCount} languages","%resourcePicker_showing_count%":"Showing {filtered} of {total} resources","%resourcePicker_load_error%":"Couldn't load the list of available resources.","%resourcePicker_retry%":"Try again","%resourcePicker_no_results_filtered%":"No resources match the current filters.","%resourcePicker_clear_filters%":"Clear filters","%resourcePicker_downloads_unavailable%":"Resource downloads aren't available on this installation."},js={title:"Advanced/ResourcePickerDialog",component:ua,tags:["autodocs","test"],decorators:[e=>t.jsx(Xa,{open:!0,modal:!1,children:t.jsx("div",{className:"tw:flex tw:h-[600px] tw:w-[560px] tw:flex-col tw:rounded-lg tw:border tw:bg-background tw:shadow-xl",children:t.jsx(e,{})})})],args:{allResources:_r,selectedResourceIds:Lr,localizedStrings:he,onSelect:e=>console.log("Selected:",e)}};function se(e){const a=e.querySelector('[data-slot="command-list"]');if(!a)throw new Error("The language filter list did not render");return a}function da(e){return[...se(e).querySelectorAll('[role="option"]')].map(a=>(a.textContent??"").replace(/\d+$/,"").trim())}const X={play:async({canvasElement:e,step:a})=>{const s=_(e.ownerDocument.body);await a("Open the language filter",async()=>{await f.click(s.getByRole("combobox"))}),await a("A list that fits draws no below-the-fold cue",async()=>{const r=se(e.ownerDocument);await m(r.scrollHeight).toBeLessThanOrEqual(r.clientHeight),await m(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull()}),await a("Leave the dialog as the reference example",async()=>{await f.keyboard("{Escape}"),await Y(()=>m(e.ownerDocument.querySelector('[data-slot="command-list"]')).toBeNull())})}},J={args:{resourceType:"ScriptureResource"}},Q={args:{allResources:[]}},B={args:{allResources:[],hasResourcesError:!0,onRetryResources:()=>console.log("Retry requested")}},I={play:async({canvasElement:e})=>{const a=_(e),s=await a.findByPlaceholderText(he["%resourcePicker_search_placeholder%"]??"");await f.type(s,"zzznomatch"),await m(await a.findByText(he["%resourcePicker_no_results_filtered%"]??"")).toBeInTheDocument()}},Z={args:{selectedResourceIds:[]}},ee={name:"Large Resource List (2500 entries)",args:{allResources:kr,selectedResourceIds:[]}},C={args:{notice:"Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."}},P={args:{hasResourcesError:!0,notice:"Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."}},U={args:{allowSelectingInstalled:!1,notice:"No project is selected, so a resource you choose here will be downloaded to this computer but not added to a text collection."}},ha="An Extremely Long Resource Full Name That Keeps Going Well Past Any Reasonable Dialog Width",R={dblEntryUid:"long-1",displayName:"aVeryLongShortNameThatRefusesToWrapAnywhere",fullName:ha,bestLanguageName:"A Language With An Unreasonably Long Display Name",type:"ScriptureResource",size:1,installed:!1,updateAvailable:!1,projectId:"long-proj"},oe=async e=>{const r=(await _(e).findByText(ha)).closest(".tw\\:overflow-y-auto");if(!r)throw new Error("resource list scroll container not found");m(r.clientWidth).toBeGreaterThan(0),m(r.scrollWidth).toBeLessThanOrEqual(r.clientWidth)},O={args:{allResources:[R],selectedResourceIds:[]},play:async({canvasElement:e})=>oe(e)},G={decorators:[e=>t.jsx("div",{className:"tw:flex tw:min-h-0 tw:w-[320px] tw:flex-col",children:t.jsx(e,{})})],args:{allResources:[R],selectedResourceIds:[]},play:async({canvasElement:e})=>oe(e)},M={args:{teamResourceIds:["selected-1"],onRemove:e=>console.log("Removed:",e)},play:async({canvasElement:e})=>{const a=_(e);await m(await a.findByText("Team resources")).toBeVisible(),await m(a.getByRole("button",{name:/RVR60/})).toBeVisible(),await m(a.queryByRole("button",{name:/NIV/})).toBeNull();const s=a.getByRole("button",{name:/RVR60/}),r=s.closest("tr");if(!r)throw new Error("RVR60 row not found");r.focus(),await f.keyboard("{ArrowRight}"),await Y(()=>m(s).toHaveFocus())}},q={args:{teamResourceIds:["selected-1"]}},F={decorators:[e=>t.jsx("div",{className:"tw:flex tw:min-h-0 tw:w-[320px] tw:flex-col",children:t.jsx(e,{})})],args:{allResources:[R],selectedResourceIds:[R.dblEntryUid],teamResourceIds:[R.dblEntryUid]},play:async({canvasElement:e})=>oe(e)},z={decorators:[e=>t.jsx("div",{className:"tw:flex tw:min-h-0 tw:w-[320px] tw:flex-col",children:t.jsx(e,{})})],args:{allResources:[R],selectedResourceIds:[R.dblEntryUid],teamResourceIds:[],onRemove:e=>console.log("Removed:",e)},play:async({canvasElement:e})=>oe(e)},H={name:"Many Languages (~130)",args:{allResources:ae,selectedResourceIds:[]},play:async({canvasElement:e,step:a})=>{const s=_(e.ownerDocument.body);await a("Open the language filter",async()=>{await f.click(s.getByRole("combobox"))}),await a("The search box is localized, not built from an English template",async()=>{await m(await s.findByPlaceholderText("Search languages…")).toBeInTheDocument()}),await a("Languages with installed resources come first, alphabetically",async()=>{const r=da(e.ownerDocument).slice(0,de.length);await m(r).toEqual([...de].sort((i,l)=>i.localeCompare(l)))}),await a("The list overflows and scrolls rather than showing everything",async()=>{const r=se(e.ownerDocument);await m(r.scrollHeight).toBeGreaterThan(r.clientHeight)}),await a("A below-the-fold cue marks the list as continuing past the fold",async()=>{await Y(async()=>{await m(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).not.toBeNull()})}),await a("Scrolling to the end retires the cue",async()=>{const r=se(e.ownerDocument);r.scrollTop=r.scrollHeight,await Y(async()=>{await m(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull()}),r.scrollTop=0}),await a("Filtering to a short list retires the cue and re-measures",async()=>{const r=await s.findByPlaceholderText("Search languages…");await f.type(r,"Amhar"),await Y(async()=>{await m(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull()})}),await a("A query matching no language shows the localized empty message",async()=>{const r=await s.findByPlaceholderText("Search languages…");await f.clear(r),await f.type(r,"zzzznotalanguage"),await m(await s.findByText("No languages found")).toBeInTheDocument()})}},W={name:"Many Languages, Scripture only",args:{allResources:ae,selectedResourceIds:[],resourceType:"ScriptureResource"},play:async({canvasElement:e,step:a})=>{const s=_(e.ownerDocument.body);await a("Open the language filter",async()=>{await f.click(s.getByRole("combobox"))}),await a("The offered languages are exactly those with a Scripture resource",async()=>{const r=new Set(da(e.ownerDocument)),i=new Set(ae.filter(n=>n.type==="ScriptureResource").map(n=>n.bestLanguageName)),l=[...new Set(ae.map(n=>n.bestLanguageName))].filter(n=>!i.has(n));await m(l.length).toBeGreaterThan(0),await m(l.filter(n=>r.has(n))).toEqual([]),await m([...r].sort()).toEqual([...i].sort())})}},V={args:{getDisabledReason:e=>e.displayName==="ESV"||e.displayName==="NLT"?"Not available for this translation":void 0}};var _e,Le,Te;X.parameters={...X.parameters,docs:{...(_e=X.parameters)==null?void 0:_e.docs,source:{originalSource:`{
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
}`,...(Te=(Le=X.parameters)==null?void 0:Le.docs)==null?void 0:Te.source}}};var ke,Ae,je;J.parameters={...J.parameters,docs:{...(ke=J.parameters)==null?void 0:ke.docs,source:{originalSource:`{
  args: {
    resourceType: 'ScriptureResource'
  }
}`,...(je=(Ae=J.parameters)==null?void 0:Ae.docs)==null?void 0:je.source}}};var De,Be,Ie;Q.parameters={...Q.parameters,docs:{...(De=Q.parameters)==null?void 0:De.docs,source:{originalSource:`{
  args: {
    allResources: []
  }
}`,...(Ie=(Be=Q.parameters)==null?void 0:Be.docs)==null?void 0:Ie.source}}};var Ce,Pe,Ue,Oe,Ge;B.parameters={...B.parameters,docs:{...(Ce=B.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  args: {
    allResources: [],
    hasResourcesError: true,
    onRetryResources: () => console.log('Retry requested')
  }
}`,...(Ue=(Pe=B.parameters)==null?void 0:Pe.docs)==null?void 0:Ue.source},description:{story:`The catalog fetch failed. Distinguishable from {@link NoResults} — which reports a genuinely empty
catalog — and paired with the retry that can actually re-drive the fetch.`,...(Ge=(Oe=B.parameters)==null?void 0:Oe.docs)==null?void 0:Ge.description}}};var Me,qe,Fe,ze,He;I.parameters={...I.parameters,docs:{...(Me=I.parameters)==null?void 0:Me.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const searchInput = await canvas.findByPlaceholderText(STRINGS['%resourcePicker_search_placeholder%'] ?? '');
    await userEvent.type(searchInput, 'zzznomatch');
    await expect(await canvas.findByText(STRINGS['%resourcePicker_no_results_filtered%'] ?? '')).toBeInTheDocument();
  }
}`,...(Fe=(qe=I.parameters)==null?void 0:qe.docs)==null?void 0:Fe.source},description:{story:"The filtered-empty state: it blames the filter rather than the catalog, and offers a one-click\nway back to the full list. Driven by the component's own filter state, so the `play` function\ntypes a non-matching term rather than presetting a prop.",...(He=(ze=I.parameters)==null?void 0:ze.docs)==null?void 0:He.description}}};var We,Ve,Ke;Z.parameters={...Z.parameters,docs:{...(We=Z.parameters)==null?void 0:We.docs,source:{originalSource:`{
  args: {
    selectedResourceIds: []
  }
}`,...(Ke=(Ve=Z.parameters)==null?void 0:Ve.docs)==null?void 0:Ke.source}}};var Ye,$e,Xe;ee.parameters={...ee.parameters,docs:{...(Ye=ee.parameters)==null?void 0:Ye.docs,source:{originalSource:`{
  name: 'Large Resource List (2500 entries)',
  args: {
    allResources: LARGE_SAMPLE_RESOURCES,
    selectedResourceIds: []
  }
}`,...(Xe=($e=ee.parameters)==null?void 0:$e.docs)==null?void 0:Xe.source}}};var Je,Qe,Ze,et,tt;C.parameters={...C.parameters,docs:{...(Je=C.parameters)==null?void 0:Je.docs,source:{originalSource:`{
  args: {
    notice: "Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."
  }
}`,...(Ze=(Qe=C.parameters)==null?void 0:Qe.docs)==null?void 0:Ze.source},description:{story:"`notice` explains why the list may be short — an unreachable online catalog, or something the\ncalling panel knows. The text arrives already localized; the dialog only renders it.",...(tt=(et=C.parameters)==null?void 0:et.docs)==null?void 0:tt.description}}};var at,rt,st,ot,nt;P.parameters={...P.parameters,docs:{...(at=P.parameters)==null?void 0:at.docs,source:{originalSource:`{
  args: {
    hasResourcesError: true,
    notice: "Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."
  }
}`,...(st=(rt=P.parameters)==null?void 0:rt.docs)==null?void 0:st.source},description:{story:`A partial failure keeps the list and explains itself in the notice. The error state is reserved
for having nothing to show at all, so it must not replace rows that did load.`,...(nt=(ot=P.parameters)==null?void 0:ot.docs)==null?void 0:nt.description}}};var it,lt,ct,ut,dt;U.parameters={...U.parameters,docs:{...(it=U.parameters)==null?void 0:it.docs,source:{originalSource:`{
  args: {
    allowSelectingInstalled: false,
    notice: 'No project is selected, so a resource you choose here will be downloaded to this computer but not added to a text collection.'
  }
}`,...(ct=(lt=U.parameters)==null?void 0:lt.docs)==null?void 0:ct.source},description:{story:"`allowSelectingInstalled={false}` greys out the Installed section while leaving Available to\nDownload pickable — for a caller that can install a resource but has nothing to do with one\nalready on disk.",...(dt=(ut=U.parameters)==null?void 0:ut.docs)==null?void 0:dt.description}}};var ht,mt,pt,gt,wt;O.parameters={...O.parameters,docs:{...(ht=O.parameters)==null?void 0:ht.docs,source:{originalSource:`{
  args: {
    allResources: [LONG_NAME_RESOURCE],
    selectedResourceIds: []
  },
  play: async ({
    canvasElement
  }) => expectNoHorizontalScroll(canvasElement)
}`,...(pt=(mt=O.parameters)==null?void 0:mt.docs)==null?void 0:pt.source},description:{story:`A resource whose names are far wider than the 560px dialog this file's decorator renders. The
columns truncate; the list must not gain a horizontal scrollbar, which hides the language column
off the right edge and is never the right answer for a name that is merely long.

Asserted in a real browser rather than jsdom on purpose: jsdom has no layout, so \`scrollWidth\`
and \`clientWidth\` are both 0 there and the check would pass no matter what the CSS said.`,...(wt=(gt=O.parameters)==null?void 0:gt.docs)==null?void 0:wt.description}}};var yt,ft,bt,vt,xt;G.parameters={...G.parameters,docs:{...(yt=G.parameters)==null?void 0:yt.docs,source:{originalSource:`{
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
}`,...(bt=(ft=G.parameters)==null?void 0:ft.docs)==null?void 0:bt.source},description:{story:`The same guard at a deliberately narrow width. The defect is reported against two conditions — a
long name AND a small dialog — and either one alone can pass: at the file-wide 560px the columns
still have room to absorb a long name that a narrower dialog would push past the edge. The inner
wrapper constrains the content inside the meta decorator's fixed-width shell, since a story-level
decorator nests inside that one rather than replacing it.`,...(xt=(vt=G.parameters)==null?void 0:vt.docs)==null?void 0:xt.description}}};var Nt,Rt,St,Et,_t;M.parameters={...M.parameters,docs:{...(Nt=M.parameters)==null?void 0:Nt.docs,source:{originalSource:`{
  args: {
    teamResourceIds: ['selected-1'],
    onRemove: resource => console.log('Removed:', resource)
  },
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    await expect(await canvas.findByText('Team resources')).toBeVisible();
    await expect(canvas.getByRole('button', {
      name: /RVR60/
    })).toBeVisible();
    // The team row is not a control at all, so there is nothing to activate.
    await expect(canvas.queryByRole('button', {
      name: /NIV/
    })).toBeNull();

    // The table keeps Tab out of its cells, so a keyboard user reaches the remove button from its
    // row. Run in a browser: the table's arrow keys skip elements jsdom reports as zero-size.
    const removeButton = canvas.getByRole('button', {
      name: /RVR60/
    });
    const row = removeButton.closest('tr');
    if (!row) throw new Error('RVR60 row not found');
    row.focus();
    await userEvent.keyboard('{ArrowRight}');
    await waitFor(() => expect(removeButton).toHaveFocus());
  }
}`,...(St=(Rt=M.parameters)==null?void 0:Rt.docs)==null?void 0:St.source},description:{story:`A panel's picker, where the selected resources are split by who can remove them: the team's,
locked, and the user's own, each with a remove button that takes it off the user's list. NIV is
the team's here.`,...(_t=(Et=M.parameters)==null?void 0:Et.docs)==null?void 0:_t.description}}};var Lt,Tt,kt,At,jt;q.parameters={...q.parameters,docs:{...(Lt=q.parameters)==null?void 0:Lt.docs,source:{originalSource:`{
  args: {
    teamResourceIds: ['selected-1']
  }
}`,...(kt=(Tt=q.parameters)==null?void 0:Tt.docs)==null?void 0:kt.source},description:{story:`The split without removal: the team's resources locked and the user's own listed, with no remove
buttons. The Text Collection opens the picker this way when it has nowhere to write a removal.`,...(jt=(At=q.parameters)==null?void 0:At.docs)==null?void 0:jt.description}}};var Dt,Bt,It,Ct,Pt;F.parameters={...F.parameters,docs:{...(Dt=F.parameters)==null?void 0:Dt.docs,source:{originalSource:`{
  decorators: [Story => <div className="tw:flex tw:min-h-0 tw:w-[320px] tw:flex-col">
        <Story />
      </div>],
  args: {
    allResources: [LONG_NAME_RESOURCE],
    selectedResourceIds: [LONG_NAME_RESOURCE.dblEntryUid],
    teamResourceIds: [LONG_NAME_RESOURCE.dblEntryUid]
  },
  play: async ({
    canvasElement
  }) => expectNoHorizontalScroll(canvasElement)
}`,...(It=(Bt=F.parameters)==null?void 0:Bt.docs)==null?void 0:It.source},description:{story:"A long-named team resource in a narrow dialog. The lock sits in the same fixed-width slot as the\ncheck mark, so the row truncates instead of scrolling — see `LongNamesDoNotScrollHorizontally`.",...(Pt=(Ct=F.parameters)==null?void 0:Ct.docs)==null?void 0:Pt.description}}};var Ut,Ot,Gt,Mt,qt;z.parameters={...z.parameters,docs:{...(Ut=z.parameters)==null?void 0:Ut.docs,source:{originalSource:`{
  decorators: [Story => <div className="tw:flex tw:min-h-0 tw:w-[320px] tw:flex-col">
        <Story />
      </div>],
  args: {
    allResources: [LONG_NAME_RESOURCE],
    selectedResourceIds: [LONG_NAME_RESOURCE.dblEntryUid],
    teamResourceIds: [],
    onRemove: resource => console.log('Removed:', resource)
  },
  play: async ({
    canvasElement
  }) => expectNoHorizontalScroll(canvasElement)
}`,...(Gt=(Ot=z.parameters)==null?void 0:Ot.docs)==null?void 0:Gt.source},description:{story:`A long-named resource of the user's own in a narrow dialog. Its remove button sits in the same
fixed-width slot as the check mark, so the row truncates instead of scrolling.`,...(qt=(Mt=z.parameters)==null?void 0:Mt.docs)==null?void 0:qt.description}}};var Ft,zt,Ht,Wt,Vt;H.parameters={...H.parameters,docs:{...(Ft=H.parameters)==null?void 0:Ft.docs,source:{originalSource:`{
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
}`,...(Ht=(zt=H.parameters)==null?void 0:zt.docs)==null?void 0:Ht.source},description:{story:`A catalogue-sized language spread (~130 languages, a handful installed). Open the language filter
here to see the scrolling, the installed-first ordering, and the per-language counts — the other
stories have too few languages for the list to overflow at all.`,...(Vt=(Wt=H.parameters)==null?void 0:Wt.docs)==null?void 0:Vt.description}}};var Kt,Yt,$t,Xt,Jt;W.parameters={...W.parameters,docs:{...(Kt=W.parameters)==null?void 0:Kt.docs,source:{originalSource:`{
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
}`,...($t=(Yt=W.parameters)==null?void 0:Yt.docs)==null?void 0:$t.source},description:{story:`The same catalogue scoped to Scripture resources. Languages that only have non-Scripture
resources are absent from the language filter, so no selection can produce an empty list.`,...(Jt=(Xt=W.parameters)==null?void 0:Xt.docs)==null?void 0:Jt.description}}};var Qt,Zt,ea,ta,aa;V.parameters={...V.parameters,docs:{...(Qt=V.parameters)==null?void 0:Qt.docs,source:{originalSource:`{
  args: {
    getDisabledReason: resource => resource.displayName === 'ESV' || resource.displayName === 'NLT' ? 'Not available for this translation' : undefined
  }
}`,...(ea=(Zt=V.parameters)==null?void 0:Zt.docs)==null?void 0:ea.source},description:{story:`Some rows cannot be picked, e.g. texts whose license prohibits their use as a model or base for a
new translation. They stay listed, dimmed with a lock icon, and the reason shows in a tooltip on
hover or keyboard focus. The consumer supplies the reason; the one here is sample text.`,...(aa=(ta=V.parameters)==null?void 0:ta.docs)==null?void 0:aa.description}}};const Ds=["Default","WithResourceTypeFilter","NoResults","CatalogFailedToLoad","NoResultsForFilter","EmptyAlreadySelected","LargeResourceList","WithNotice","NoticeWithFailedCatalog","InstalledNotSelectable","LongNamesDoNotScrollHorizontally","LongNamesDoNotScrollHorizontallyWhenNarrow","WithTeamAndUserResources","WithTeamAndUserResourcesNotRemovable","LongTeamResourceWhenNarrow","LongUserResourceWhenNarrow","ManyLanguages","ManyLanguagesScopedToScripture","WithDisabledRows"];export{B as CatalogFailedToLoad,X as Default,Z as EmptyAlreadySelected,U as InstalledNotSelectable,ee as LargeResourceList,O as LongNamesDoNotScrollHorizontally,G as LongNamesDoNotScrollHorizontallyWhenNarrow,F as LongTeamResourceWhenNarrow,z as LongUserResourceWhenNarrow,H as ManyLanguages,W as ManyLanguagesScopedToScripture,Q as NoResults,I as NoResultsForFilter,P as NoticeWithFailedCatalog,V as WithDisabledRows,C as WithNotice,J as WithResourceTypeFilter,M as WithTeamAndUserResources,q as WithTeamAndUserResourcesNotRemovable,Ds as __namedExportsOrder,js as default};
