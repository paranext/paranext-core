import{j as t,r as c}from"./iframe-QtFa4wfL.js";import{c as Jt,d as Qt,e as Zt,D as ea}from"./dialog-Co5Gg98i.js";import{A as ta,b as aa}from"./alert-BQbJNGn0.js";import{E as ra}from"./empty-state.component-C1aL_IAF.js";import{B as sa}from"./button-B4r93LFw.js";import{E as oa,a as na,b as la,d as ia,e as ca}from"./empty-Dqxv23vL.js";import{c as ua}from"./utils-BPbySc-g.js";import{T as da}from"./triangle-alert-BpE5UTZQ.js";import{L as ha}from"./label-BNJZvb_3.js";import{T as pa,e as ga,c as Q,f as S}from"./table-DpwNzqJ3.js";import{M as ma}from"./multi-select-combo-box.component-vLufhsCL.js";import{S as wa}from"./search-bar.component-6h3Av0SB.js";import"./index-AIIJ_tDp.js";import{S as ya}from"./spinner.component-BopQ4O8h.js";import{e as ue}from"./scripture-util-DArajUVn-CPHPTCtZ.js";import{c as bt}from"./createLucideIcon-BQYIVAxF.js";import{C as fa}from"./check-UGw0aJNH.js";import"./preload-helper-CTOgD26E.js";import"./z-index-DiGYIwoM.js";import"./createReactComponent-DoJGq_4c.js";import"./index-DzRyrQAi.js";import"./index-7mVneCqS.js";import"./index-BhgWw5rV.js";import"./index-D6YHWlXZ.js";import"./index-DAPJwYe9.js";import"./index-CWHL3stg.js";import"./index-goK9KuNK.js";import"./index-B-LdocwY.js";import"./index-DkhQlTn3.js";import"./index-CEUeK5K_.js";import"./index-CbkIYif6.js";import"./index-BnuTq2W6.js";import"./focus.util-DRSEP984.js";import"./command-DOjmZ_cs.js";import"./input-group-c0Vi4I5b.js";import"./input-z667Ty71.js";import"./IconCheck-DQNeq2OF.js";import"./popover-DFXV4c0M.js";import"./index-BxQ5710E.js";import"./floating-ui.dom-CQVRXqPN.js";import"./index-BIzHTuLA.js";import"./chevrons-up-down-_nDhxThX.js";import"./star-X9WAPXXI.js";import"./search-cvfFhTc8.js";import"./x-BMzV7ccG.js";import"./index-C77E7Q-s.js";import"./index-DCo3rgjq.js";import"./loader-circle-DMnPu6ox.js";import"./index.es-CXoS8DB2.js";/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ba=[["path",{d:"M10.94 5.274A7 7 0 0 1 15.71 10h1.79a4.5 4.5 0 0 1 4.222 6.057",key:"1uxyv8"}],["path",{d:"M18.796 18.81A4.5 4.5 0 0 1 17.5 19H9A7 7 0 0 1 5.79 5.78",key:"99tcn7"}],["path",{d:"m2 2 20 20",key:"1ooewy"}]],de=bt("cloud-off",ba);/**
 * @license lucide-react v1.8.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sa=[["path",{d:"m13.5 8.5-5 5",key:"1cs55j"}],["path",{d:"m8.5 8.5 5 5",key:"a8mexj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]],Na=bt("search-x",Sa);function O({message:e,retryLabel:a,onRetry:r,icon:s,role:o="alert",className:i}){return t.jsxs(oa,{className:ua(i),role:o,children:[t.jsxs(na,{children:[t.jsx(la,{variant:"icon",children:s??t.jsx(da,{})}),t.jsx(ia,{children:e})]}),r&&t.jsx(ca,{children:t.jsx(sa,{onClick:()=>r(),children:a})})]})}O.__docgenInfo={description:`Icon + message zero state for a region that has nothing to show because something failed or is
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
the view then renders its message alone rather than an inert button.`},icon:{required:!1,tsType:{name:"ReactNode"},description:"Overrides the default warning glyph so distinct failures stay distinguishable."},role:{required:!1,tsType:{name:"union",raw:"'alert' | 'status'",elements:[{name:"literal",value:"'alert'"},{name:"literal",value:"'status'"}]},description:"ARIA live-region role. Defaults to `alert` for a failure; pass `status` for a state that\nreports a condition rather than an error, such as a capability this installation does not\nhave.",defaultValue:{value:"'alert'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"Class name applied to the `Empty` container so the caller owns sizing within its surface."}}};function xa(e,a){return a?Array.isArray(a)?a.length===0||a.includes(e.type):e.type===a:!0}function Ea(e){const a=new Map,r=new Set;return e.forEach(s=>{const o=s.bestLanguageName;a.set(o,(a.get(o)??0)+1),s.installed&&r.add(o)}),Array.from(a.entries()).sort(([s],[o])=>s.localeCompare(o)).map(([s,o])=>({label:s,value:s,starred:r.has(s),secondaryLabel:o.toString()}))}function Ra(e,a){const r=new Set(a.map(i=>i.value)),s=[],o=[];return e.forEach(i=>(r.has(i)?s:o).push(i)),{offered:s,held:o}}function va(e,a=50){const[r,s]=c.useState(a),o=c.useRef(null);return c.useEffect(()=>{s(a)},[e,a]),c.useEffect(()=>{if(r>=e.length)return;const i=o.current,n=new IntersectionObserver(([p])=>{p.isIntersecting&&s(W=>Math.min(W+a,e.length))},{threshold:0});return i&&n.observe(i),()=>n.disconnect()},[r,e.length,a]),{visibleItems:e.slice(0,r),sentinelRef:o,hasMore:r<e.length}}const d=(e,a)=>e[a]??a;function X({label:e,resources:a,onSelect:r,showCheckmark:s}){if(a.length!==0)return t.jsxs(t.Fragment,{children:[t.jsx(Q,{className:"tw:border-0 tw:hover:bg-transparent",children:t.jsx(S,{colSpan:4,className:"tw:border-0 tw:pt-4 tw:pb-0",children:t.jsx(ha,{className:"tw:text-xs tw:tracking-wider tw:text-muted-foreground tw:uppercase",children:e})})}),a.map(o=>t.jsxs(Q,{className:r?"tw:cursor-pointer tw:border-0":"tw:pointer-events-none tw:border-0",role:r?"button":void 0,"aria-label":r?o.displayName:void 0,onClick:r?()=>r(o):void 0,onKeyDown:r?i=>{(i.key==="Enter"||i.key===" ")&&(i.preventDefault(),r(o))}:void 0,children:[t.jsx(S,{className:"tw:border-0 tw:px-1 tw:py-1",children:s&&t.jsxs(t.Fragment,{children:[t.jsx(fa,{className:"tw:h-3.5 tw:w-3.5","aria-hidden":!0}),t.jsx("span",{className:"tw:sr-only",children:e})]})}),t.jsx(S,{className:"tw:max-w-0 tw:truncate tw:border-0 tw:py-1 tw:pe-2 tw:text-start tw:font-normal",children:t.jsx("span",{title:o.displayName,children:o.displayName})}),t.jsx(S,{className:"tw:max-w-0 tw:truncate tw:border-0 tw:py-1 tw:ps-2",children:t.jsx("span",{title:o.fullName,children:o.fullName})}),t.jsx(S,{className:"tw:max-w-0 tw:truncate tw:border-0 tw:py-1 tw:ps-4 tw:text-end tw:text-muted-foreground",children:t.jsx("span",{title:o.bestLanguageName,children:o.bestLanguageName})})]},o.dblEntryUid))]})}function La(e){return e.isResourcesLoading?"loading":e.hasNoResults?e.canClearFiltersHelp?"filteredEmpty":e.hasResourcesError?"error":e.areDownloadsUnavailable?"downloadsUnavailable":"empty":"list"}function _a(e,a){if(!a)return!0;const r=a.toLowerCase();return e.displayName.toLowerCase().includes(r)||e.fullName.toLowerCase().includes(r)||e.bestLanguageName.toLowerCase().includes(r)}function St({allResources:e,isResourcesLoading:a,hasResourcesError:r,onRetryResources:s,areDownloadsUnavailable:o,resourceType:i,selectedResourceIds:n,notice:p,allowSelectingInstalled:W=!0,localizedStrings:u,allowDeselect:vt,onSelect:K,searchInputRef:Lt}){const[I,te]=c.useState(""),[ae,re]=c.useState([]),_t=c.useRef(null),N=Lt??_t,Tt=c.useCallback(()=>{var l;te(""),re([]),(l=N.current)==null||l.focus()},[N]),m=c.useMemo(()=>e.filter(l=>xa(l,i)),[e,i]),x=c.useMemo(()=>Ea(m),[m]),{offered:g,held:se}=c.useMemo(()=>Ra(ae,x),[ae,x]),At=c.useCallback(l=>re([...se,...l]),[se]),f=c.useMemo(()=>m.filter(l=>_a(l,I)).filter(l=>g.length===0||g.includes(l.bestLanguageName)),[m,I,g]),oe=c.useMemo(()=>f.filter(l=>n==null?void 0:n.includes(l.dblEntryUid)),[f,n]),ne=c.useMemo(()=>f.filter(l=>l.installed&&!(n!=null&&n.includes(l.dblEntryUid))),[f,n]),le=c.useMemo(()=>f.filter(l=>!l.installed&&!(n!=null&&n.includes(l.dblEntryUid))),[f,n]),{visibleItems:kt,sentinelRef:Dt,hasMore:jt}=va(le),Bt=oe.length===0&&ne.length===0&&le.length===0,It=d(u,"%resourcePicker_title%"),Ct=d(u,"%resourcePicker_description%"),Pt=d(u,"%resourcePicker_search_placeholder%"),Y=d(u,"%resourcePicker_language_filter_any%"),Gt=d(u,"%resourcePicker_language_filter_search_placeholder%"),Ut=d(u,"%resourcePicker_language_filter_no_results%"),Mt=d(u,"%resourcePicker_section_already_selected%"),Ot=d(u,"%resourcePicker_section_installed%"),qt=d(u,"%resourcePicker_section_available_to_download%"),zt=d(u,"%resourcePicker_no_results%"),Ft=d(u,"%resourcePicker_load_error%"),Ht=d(u,"%resourcePicker_retry%"),Wt=d(u,"%resourcePicker_no_results_filtered%"),Kt=d(u,"%resourcePicker_clear_filters%"),Yt=d(u,"%resourcePicker_downloads_unavailable%"),Vt=d(u,"%resourcePicker_showing_count%"),V=g.length>0&&m.some(l=>!g.includes(l.bestLanguageName)),ie=I.length>0||V,$t=c.useMemo(()=>{var l;return V?g.length===1?((l=x.find(E=>E.value===g[0]))==null?void 0:l.label)??g[0]:ue(d(u,"%resourcePicker_language_filter_multipleSelected%"),{selectCount:g.length}):Y},[V,g,x,Y,u]),Xt=ie&&m.length>0,b=!!a||!!r||m.length===0,ce=c.useRef(b);c.useEffect(()=>{const l=ce.current&&!b;if(ce.current=b,!l)return;const E=N.current;if(!E||E.disabled)return;const{activeElement:$}=document;(!$||$===document.body||$.getAttribute("data-slot")==="dialog-content")&&E.focus()},[b,N]);const w=La({isResourcesLoading:!!a,hasResourcesError:!!r,hasNoResults:Bt,canClearFiltersHelp:Xt,areDownloadsUnavailable:!!o});return t.jsxs(t.Fragment,{children:[t.jsxs(Jt,{className:"tw:px-4 tw:pt-4",children:[t.jsx(Qt,{children:It}),t.jsx(Zt,{className:"tw:sr-only",children:Ct})]}),t.jsxs("div",{className:"tw:flex tw:gap-2 tw:p-4",children:[t.jsx(wa,{ref:N,value:I,onSearch:te,placeholder:Pt,isFullWidth:!0,isDisabled:b}),t.jsx(ma,{entries:x,selected:g,onChange:At,customSelectedText:$t,placeholder:Y,searchPlaceholder:Gt,commandEmptyMessage:Ut,variant:"outline",isDisabled:b,sortSelected:!0,showScrollCue:!0})]}),t.jsx("div",{role:"status",children:p&&t.jsx(ta,{role:void 0,className:"tw:mx-4 tw:mb-2 tw:w-auto tw:bg-muted tw:text-muted-foreground",children:t.jsx(aa,{children:p})})}),ie&&(w==="list"||w==="filteredEmpty")&&t.jsx("p",{className:"tw:px-4 tw:pb-1 tw:text-end tw:text-xs tw:text-muted-foreground",children:ue(Vt,{filtered:f.length,total:m.length})}),t.jsxs("div",{className:"tw:min-h-0 tw:flex-1 tw:overflow-x-hidden tw:overflow-y-auto tw:px-4 tw:pb-4",children:[w==="loading"&&t.jsx("p",{className:"tw:py-8 tw:text-center",children:t.jsx(ya,{})}),w==="error"&&t.jsx(O,{icon:t.jsx(de,{}),message:Ft,retryLabel:Ht,onRetry:s}),w==="filteredEmpty"&&t.jsx(O,{role:"status",icon:t.jsx(Na,{}),message:Wt,retryLabel:Kt,onRetry:Tt}),w==="downloadsUnavailable"&&t.jsx(O,{role:"status",icon:t.jsx(de,{}),message:Yt}),w==="empty"&&t.jsx(ra,{className:"tw:py-8 tw:text-center",message:zt}),w==="list"&&t.jsxs(pa,{className:"tw:table-fixed",children:[t.jsxs("colgroup",{children:[t.jsx("col",{className:"tw:w-7"}),t.jsx("col",{className:"tw:w-1/4"}),t.jsx("col",{}),t.jsx("col",{className:"tw:w-1/6"})]}),t.jsxs(ga,{children:[t.jsx(X,{label:Mt,resources:oe,onSelect:vt?K:void 0,showCheckmark:!0}),t.jsx(X,{label:Ot,resources:ne,onSelect:W?K:void 0}),t.jsx(X,{label:qt,resources:kt,onSelect:K}),jt&&t.jsx(Q,{className:"tw:border-0",children:t.jsx(S,{colSpan:4,className:"tw:border-0 tw:p-0",children:t.jsx("div",{ref:Dt,"aria-hidden":!0})})})]})]})]})]})}St.__docgenInfo={description:"Presentational dialog content for picking a DBL resource. Renders three sections — Already\nSelected, Installed, and Available to Download — derived from `allResources` and\n`selectedResourceIds`. Supports text search and language filtering.\n\nDoes not include an outer `Dialog` or `DialogContent` wrapper; the host (paranext-core dialog\ninfrastructure or a Storybook decorator) is responsible for providing that context.\n\nObtain localized strings by passing {@link RESOURCE_PICKER_DIALOG_STRING_KEYS} to\n`useLocalizedStrings` and forwarding the result as `localizedStrings`.\n\n@param props See {@link ResourcePickerDialogProps}",methods:[],displayName:"ResourcePickerDialog",props:{allResources:{required:!0,tsType:{name:"Array",elements:[{name:"DblResourceData"}],raw:"DblResourceData[]"},description:"Full list of DBL resources fetched by the caller via PAPI"},isResourcesLoading:{required:!1,tsType:{name:"boolean"},description:"Whether the `allResources` is still loading"},hasResourcesError:{required:!1,tsType:{name:"boolean"},description:'Whether loading `allResources` failed. Distinct from an empty `allResources`: without it the\ndialog can only report "no results", which reads as a truthful empty catalog and leaves the\nuser nothing to act on.'},onRetryResources:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:`Re-runs the caller's resource fetch. Omit when the caller has no way to re-drive it; the error
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
non-interactive, showing only a checkmark) to preserve existing consumers' behavior.`},onSelect:{required:!0,tsType:{name:"signature",type:"function",raw:"(resource: DblResourceData) => void",signature:{arguments:[{type:{name:"DblResourceData"},name:"resource"}],return:{name:"void"}}},description:"Called when the user clicks a resource row to select it"},searchInputRef:{required:!1,tsType:{name:"RefObject",elements:[{name:"union",raw:"HTMLInputElement | null",elements:[{name:"HTMLInputElement"},{name:"null"}]}],raw:"RefObject<HTMLInputElement | null>"},description:`Ref to the search input, for a host that decides where focus lands when the dialog opens.

Without it a host can only order its JSX and hope: the picker disables its search box whenever
there is nothing to filter, so "render the close button last so focus lands on search" silently
lands on whatever is tabbable instead — the Retry button, or the close button itself. A host
holding this ref can state the intent directly and stay correct when the box is disabled.`}}};const Ta=[{dblEntryUid:"selected-1",displayName:"NIV",fullName:"New International Version",bestLanguageName:"English",type:"ScriptureResource",size:12e6,installed:!0,updateAvailable:!1,projectId:"prj-niv"},{dblEntryUid:"selected-2",displayName:"RVR60",fullName:"Reina Valera 1960",bestLanguageName:"Spanish",type:"ScriptureResource",size:98e5,installed:!0,updateAvailable:!1,projectId:"prj-rvr"},{dblEntryUid:"installed-1",displayName:"ESV",fullName:"English Standard Version",bestLanguageName:"English",type:"ScriptureResource",size:115e5,installed:!0,updateAvailable:!1,projectId:"prj-esv"},{dblEntryUid:"installed-2",displayName:"KJV",fullName:"King James Version",bestLanguageName:"English",type:"ScriptureResource",size:82e5,installed:!0,updateAvailable:!0,projectId:"prj-kjv"},{dblEntryUid:"installed-3",displayName:"UBS-SLR",fullName:"UBS Source Language Resource",bestLanguageName:"Greek",type:"SourceLanguageResource",size:25e6,installed:!0,updateAvailable:!1,projectId:"prj-ubsslr"},{dblEntryUid:"download-1",displayName:"NLT",fullName:"New Living Translation",bestLanguageName:"English",type:"ScriptureResource",size:102e5,installed:!1,updateAvailable:!1,projectId:"prj-nlt"},{dblEntryUid:"download-2",displayName:"UBS HB",fullName:"UBS Handbook",bestLanguageName:"English",type:"XmlResource",size:54e5,installed:!1,updateAvailable:!1,projectId:"prj-ubshb"},{dblEntryUid:"download-3",displayName:"SIL TNN",fullName:"SIL Translation Notes and Drafts",bestLanguageName:"English",type:"XmlResource",size:32e5,installed:!1,updateAvailable:!1,projectId:"prj-siltnn"},{dblEntryUid:"download-4",displayName:"BHS",fullName:"Biblia Hebraica Stuttgartensia",bestLanguageName:"Hebrew",type:"SourceLanguageResource",size:187e5,installed:!1,updateAvailable:!1,projectId:"prj-bhs"}],Aa=["selected-1","selected-2"],he=["English","Spanish","French","Arabic","Hindi","Portuguese","Swahili","Mandarin","Russian","German"],F=["ScriptureResource","SourceLanguageResource","XmlResource"];function ka(e){return Array.from({length:e},(a,r)=>({dblEntryUid:`gen-${r}`,displayName:`RES-${r}`,fullName:`Generated Resource ${r}`,bestLanguageName:he[r%he.length],type:F[r%F.length],size:5e6+r*1e3,installed:!1,updateAvailable:!1,projectId:`prj-gen-${r}`}))}const Da=ka(2500),J=["Afrikaans","Akan","Albanian","Amharic","Arabic","Armenian","Assamese","Aymara","Azerbaijani","Balinese","Bambara","Basque","Belarusian","Bemba","Bengali","Bikol","Bosnian","Bulgarian","Burmese","Cebuano","Chichewa","Chin, Hakha","Chuvash","Coptic","Croatian","Czech","Danish","Dinka","Dutch","Dzongkha","Efik","English","Estonian","Ewe","Faroese","Fijian","Finnish","French","Fulfulde","Ga","Ge'ez","Georgian","German","Gikuyu","Greek","Guarani","Gujarati","Haitian Creole","Hausa","Hebrew","Hiligaynon","Hindi","Hmong","Hungarian","Icelandic","Igbo","Ilocano","Indonesian","Inuktitut","Italian","Japanese","Javanese","Kannada","Kanuri","Kazakh","Khmer","Kinyarwanda","Kirundi","Konkani","Korean","Kurdish","Kyrgyz","Lao","Latvian","Lingala","Lithuanian","Luganda","Luo","Macedonian","Malagasy","Malay","Malayalam","Maltese","Mandarin","Maori","Marathi","Mongolian","Nahuatl","Nepali","Norwegian","Odia","Oromo","Pashto","Persian","Polish","Portuguese","Punjabi","Quechua","Romanian","Russian","Samoan","Sango","Serbian","Sesotho","Shona","Sindhi","Sinhala","Slovak","Slovenian","Somali","Spanish","Swahili","Swedish","Syriac","Tagalog","Tajik","Tamil","Telugu","Thai","Tigrinya","Tongan","Tsonga","Turkish","Ugaritic","Ukrainian","Urdu","Uzbek","Vietnamese","Wolof","Xhosa","Yoruba","Zulu"],Z=["Amharic","Nepali","Portuguese","Quechua","Swahili","Tagalog"],ja=["Coptic","Ge'ez","Syriac","Ugaritic"];function Ba(){const e=[];for(let r=0;r<J.length;r++){const s=J[r*37%J.length],o=ja.includes(s),i=Z.includes(s),n=1+r%3;for(let p=0;p<n;p++)e.push({dblEntryUid:`many-${r}-${p}`,displayName:`${s.slice(0,3).toUpperCase()}${r}-${p+1}`,fullName:`${s} Resource ${p+1}`,bestLanguageName:s,type:o?"XmlResource":F[(r+p)%F.length],size:4e6+r*1e4+p*1e3,installed:i&&p===0,updateAvailable:!1,projectId:`prj-many-${r}-${p}`})}return e}const q=Ba(),{expect:h,userEvent:y,waitFor:z,within:B}=__STORYBOOK_MODULE_TEST__,ee={"%resourcePicker_title%":"Resource picker","%resourcePicker_description%":"Choose a resource to add. Picking one downloads it if it isn't already installed.","%resourcePicker_section_already_selected%":"Included","%resourcePicker_section_installed%":"Installed","%resourcePicker_section_available_to_download%":"Available to download","%resourcePicker_no_results%":"No results found","%resourcePicker_search_placeholder%":"Search resources…","%resourcePicker_language_filter_any%":"Any language","%resourcePicker_language_filter_search_placeholder%":"Search languages…","%resourcePicker_language_filter_no_results%":"No languages found","%resourcePicker_language_filter_multipleSelected%":"{selectCount} languages","%resourcePicker_showing_count%":"Showing {filtered} of {total} resources","%resourcePicker_load_error%":"Couldn't load the list of available resources.","%resourcePicker_retry%":"Try again","%resourcePicker_no_results_filtered%":"No resources match the current filters.","%resourcePicker_clear_filters%":"Clear filters","%resourcePicker_downloads_unavailable%":"Resource downloads aren't available on this installation."},kr={title:"Advanced/ResourcePickerDialog",component:St,tags:["autodocs","test"],decorators:[e=>t.jsx(ea,{open:!0,modal:!1,children:t.jsx("div",{className:"tw:flex tw:h-[600px] tw:w-[560px] tw:flex-col tw:rounded-lg tw:border tw:bg-background tw:shadow-xl",children:t.jsx(e,{})})})],args:{allResources:Ta,selectedResourceIds:Aa,localizedStrings:ee,onSelect:e=>console.log("Selected:",e)}};function H(e){const a=e.querySelector('[data-slot="command-list"]');if(!a)throw new Error("The language filter list did not render");return a}function Nt(e){return[...H(e).querySelectorAll('[role="option"]')].map(a=>(a.textContent??"").replace(/\d+$/,"").trim())}const C={play:async({canvasElement:e,step:a})=>{const r=B(e.ownerDocument.body);await a("Open the language filter",async()=>{await y.click(r.getByRole("combobox"))}),await a("A list that fits draws no below-the-fold cue",async()=>{const s=H(e.ownerDocument);await h(s.scrollHeight).toBeLessThanOrEqual(s.clientHeight),await h(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull()}),await a("Leave the dialog as the reference example",async()=>{await y.keyboard("{Escape}"),await z(()=>h(e.ownerDocument.querySelector('[data-slot="command-list"]')).toBeNull())})}},P={args:{resourceType:"ScriptureResource"}},G={args:{allResources:[]}},R={args:{allResources:[],hasResourcesError:!0,onRetryResources:()=>console.log("Retry requested")}},v={play:async({canvasElement:e})=>{const a=B(e),r=await a.findByPlaceholderText(ee["%resourcePicker_search_placeholder%"]??"");await y.type(r,"zzznomatch"),await h(await a.findByText(ee["%resourcePicker_no_results_filtered%"]??"")).toBeInTheDocument()}},U={args:{selectedResourceIds:[]}},M={name:"Large Resource List (2500 entries)",args:{allResources:Da,selectedResourceIds:[]}},L={args:{notice:"Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."}},_={args:{hasResourcesError:!0,notice:"Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."}},T={args:{allowSelectingInstalled:!1,notice:"No project is selected, so a resource you choose here will be downloaded to this computer but not added to a text collection."}},xt="An Extremely Long Resource Full Name That Keeps Going Well Past Any Reasonable Dialog Width",Et={dblEntryUid:"long-1",displayName:"aVeryLongShortNameThatRefusesToWrapAnywhere",fullName:xt,bestLanguageName:"A Language With An Unreasonably Long Display Name",type:"ScriptureResource",size:1,installed:!1,updateAvailable:!1,projectId:"long-proj"},Rt=async e=>{const s=(await B(e).findByText(xt)).closest(".tw\\:overflow-y-auto");if(!s)throw new Error("resource list scroll container not found");h(s.clientWidth).toBeGreaterThan(0),h(s.scrollWidth).toBeLessThanOrEqual(s.clientWidth)},A={args:{allResources:[Et],selectedResourceIds:[]},play:async({canvasElement:e})=>Rt(e)},k={decorators:[e=>t.jsx("div",{className:"tw:flex tw:min-h-0 tw:w-[320px] tw:flex-col",children:t.jsx(e,{})})],args:{allResources:[Et],selectedResourceIds:[]},play:async({canvasElement:e})=>Rt(e)},D={name:"Many Languages (~130)",args:{allResources:q,selectedResourceIds:[]},play:async({canvasElement:e,step:a})=>{const r=B(e.ownerDocument.body);await a("Open the language filter",async()=>{await y.click(r.getByRole("combobox"))}),await a("The search box is localized, not built from an English template",async()=>{await h(await r.findByPlaceholderText("Search languages…")).toBeInTheDocument()}),await a("Languages with installed resources come first, alphabetically",async()=>{const s=Nt(e.ownerDocument).slice(0,Z.length);await h(s).toEqual([...Z].sort((o,i)=>o.localeCompare(i)))}),await a("The list overflows and scrolls rather than showing everything",async()=>{const s=H(e.ownerDocument);await h(s.scrollHeight).toBeGreaterThan(s.clientHeight)}),await a("A below-the-fold cue marks the list as continuing past the fold",async()=>{await z(async()=>{await h(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).not.toBeNull()})}),await a("Scrolling to the end retires the cue",async()=>{const s=H(e.ownerDocument);s.scrollTop=s.scrollHeight,await z(async()=>{await h(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull()}),s.scrollTop=0}),await a("Filtering to a short list retires the cue and re-measures",async()=>{const s=await r.findByPlaceholderText("Search languages…");await y.type(s,"Amhar"),await z(async()=>{await h(e.ownerDocument.querySelector('[data-slot="command-list-scroll-cue"]')).toBeNull()})}),await a("A query matching no language shows the localized empty message",async()=>{const s=await r.findByPlaceholderText("Search languages…");await y.clear(s),await y.type(s,"zzzznotalanguage"),await h(await r.findByText("No languages found")).toBeInTheDocument()})}},j={name:"Many Languages, Scripture only",args:{allResources:q,selectedResourceIds:[],resourceType:"ScriptureResource"},play:async({canvasElement:e,step:a})=>{const r=B(e.ownerDocument.body);await a("Open the language filter",async()=>{await y.click(r.getByRole("combobox"))}),await a("The offered languages are exactly those with a Scripture resource",async()=>{const s=new Set(Nt(e.ownerDocument)),o=new Set(q.filter(n=>n.type==="ScriptureResource").map(n=>n.bestLanguageName)),i=[...new Set(q.map(n=>n.bestLanguageName))].filter(n=>!o.has(n));await h(i.length).toBeGreaterThan(0),await h(i.filter(n=>s.has(n))).toEqual([]),await h([...s].sort()).toEqual([...o].sort())})}};var pe,ge,me;C.parameters={...C.parameters,docs:{...(pe=C.parameters)==null?void 0:pe.docs,source:{originalSource:`{
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
}`,...(me=(ge=C.parameters)==null?void 0:ge.docs)==null?void 0:me.source}}};var we,ye,fe;P.parameters={...P.parameters,docs:{...(we=P.parameters)==null?void 0:we.docs,source:{originalSource:`{
  args: {
    resourceType: 'ScriptureResource'
  }
}`,...(fe=(ye=P.parameters)==null?void 0:ye.docs)==null?void 0:fe.source}}};var be,Se,Ne;G.parameters={...G.parameters,docs:{...(be=G.parameters)==null?void 0:be.docs,source:{originalSource:`{
  args: {
    allResources: []
  }
}`,...(Ne=(Se=G.parameters)==null?void 0:Se.docs)==null?void 0:Ne.source}}};var xe,Ee,Re,ve,Le;R.parameters={...R.parameters,docs:{...(xe=R.parameters)==null?void 0:xe.docs,source:{originalSource:`{
  args: {
    allResources: [],
    hasResourcesError: true,
    onRetryResources: () => console.log('Retry requested')
  }
}`,...(Re=(Ee=R.parameters)==null?void 0:Ee.docs)==null?void 0:Re.source},description:{story:`The catalog fetch failed. Distinguishable from {@link NoResults} — which reports a genuinely empty
catalog — and paired with the retry that can actually re-drive the fetch.`,...(Le=(ve=R.parameters)==null?void 0:ve.docs)==null?void 0:Le.description}}};var _e,Te,Ae,ke,De;v.parameters={...v.parameters,docs:{...(_e=v.parameters)==null?void 0:_e.docs,source:{originalSource:`{
  play: async ({
    canvasElement
  }) => {
    const canvas = within(canvasElement);
    const searchInput = await canvas.findByPlaceholderText(STRINGS['%resourcePicker_search_placeholder%'] ?? '');
    await userEvent.type(searchInput, 'zzznomatch');
    await expect(await canvas.findByText(STRINGS['%resourcePicker_no_results_filtered%'] ?? '')).toBeInTheDocument();
  }
}`,...(Ae=(Te=v.parameters)==null?void 0:Te.docs)==null?void 0:Ae.source},description:{story:"The filtered-empty state: it blames the filter rather than the catalog, and offers a one-click\nway back to the full list. Driven by the component's own filter state, so the `play` function\ntypes a non-matching term rather than presetting a prop.",...(De=(ke=v.parameters)==null?void 0:ke.docs)==null?void 0:De.description}}};var je,Be,Ie;U.parameters={...U.parameters,docs:{...(je=U.parameters)==null?void 0:je.docs,source:{originalSource:`{
  args: {
    selectedResourceIds: []
  }
}`,...(Ie=(Be=U.parameters)==null?void 0:Be.docs)==null?void 0:Ie.source}}};var Ce,Pe,Ge;M.parameters={...M.parameters,docs:{...(Ce=M.parameters)==null?void 0:Ce.docs,source:{originalSource:`{
  name: 'Large Resource List (2500 entries)',
  args: {
    allResources: LARGE_SAMPLE_RESOURCES,
    selectedResourceIds: []
  }
}`,...(Ge=(Pe=M.parameters)==null?void 0:Pe.docs)==null?void 0:Ge.source}}};var Ue,Me,Oe,qe,ze;L.parameters={...L.parameters,docs:{...(Ue=L.parameters)==null?void 0:Ue.docs,source:{originalSource:`{
  args: {
    notice: "Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."
  }
}`,...(Oe=(Me=L.parameters)==null?void 0:Me.docs)==null?void 0:Oe.source},description:{story:"`notice` explains why the list may be short — an unreachable online catalog, or something the\ncalling panel knows. The text arrives already localized; the dialog only renders it.",...(ze=(qe=L.parameters)==null?void 0:qe.docs)==null?void 0:ze.description}}};var Fe,He,We,Ke,Ye;_.parameters={..._.parameters,docs:{...(Fe=_.parameters)==null?void 0:Fe.docs,source:{originalSource:`{
  args: {
    hasResourcesError: true,
    notice: "Can't reach the Digital Bible Library right now, so only resources already on this computer are shown."
  }
}`,...(We=(He=_.parameters)==null?void 0:He.docs)==null?void 0:We.source},description:{story:`A partial failure keeps the list and explains itself in the notice. The error state is reserved
for having nothing to show at all, so it must not replace rows that did load.`,...(Ye=(Ke=_.parameters)==null?void 0:Ke.docs)==null?void 0:Ye.description}}};var Ve,$e,Xe,Je,Qe;T.parameters={...T.parameters,docs:{...(Ve=T.parameters)==null?void 0:Ve.docs,source:{originalSource:`{
  args: {
    allowSelectingInstalled: false,
    notice: 'No project is selected, so a resource you choose here will be downloaded to this computer but not added to a text collection.'
  }
}`,...(Xe=($e=T.parameters)==null?void 0:$e.docs)==null?void 0:Xe.source},description:{story:"`allowSelectingInstalled={false}` greys out the Installed section while leaving Available to\nDownload pickable — for a caller that can install a resource but has nothing to do with one\nalready on disk.",...(Qe=(Je=T.parameters)==null?void 0:Je.docs)==null?void 0:Qe.description}}};var Ze,et,tt,at,rt;A.parameters={...A.parameters,docs:{...(Ze=A.parameters)==null?void 0:Ze.docs,source:{originalSource:`{
  args: {
    allResources: [LONG_NAME_RESOURCE],
    selectedResourceIds: []
  },
  play: async ({
    canvasElement
  }) => expectNoHorizontalScroll(canvasElement)
}`,...(tt=(et=A.parameters)==null?void 0:et.docs)==null?void 0:tt.source},description:{story:`A resource whose names are far wider than the 560px dialog this file's decorator renders. The
columns truncate; the list must not gain a horizontal scrollbar, which hides the language column
off the right edge and is never the right answer for a name that is merely long.

Asserted in a real browser rather than jsdom on purpose: jsdom has no layout, so \`scrollWidth\`
and \`clientWidth\` are both 0 there and the check would pass no matter what the CSS said.`,...(rt=(at=A.parameters)==null?void 0:at.docs)==null?void 0:rt.description}}};var st,ot,nt,lt,it;k.parameters={...k.parameters,docs:{...(st=k.parameters)==null?void 0:st.docs,source:{originalSource:`{
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
}`,...(nt=(ot=k.parameters)==null?void 0:ot.docs)==null?void 0:nt.source},description:{story:`The same guard at a deliberately narrow width. The defect is reported against two conditions — a
long name AND a small dialog — and either one alone can pass: at the file-wide 560px the columns
still have room to absorb a long name that a narrower dialog would push past the edge. The inner
wrapper constrains the content inside the meta decorator's fixed-width shell, since a story-level
decorator nests inside that one rather than replacing it.`,...(it=(lt=k.parameters)==null?void 0:lt.docs)==null?void 0:it.description}}};var ct,ut,dt,ht,pt;D.parameters={...D.parameters,docs:{...(ct=D.parameters)==null?void 0:ct.docs,source:{originalSource:`{
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
}`,...(dt=(ut=D.parameters)==null?void 0:ut.docs)==null?void 0:dt.source},description:{story:`A catalogue-sized language spread (~130 languages, a handful installed). Open the language filter
here to see the scrolling, the installed-first ordering, and the per-language counts — the other
stories have too few languages for the list to overflow at all.`,...(pt=(ht=D.parameters)==null?void 0:ht.docs)==null?void 0:pt.description}}};var gt,mt,wt,yt,ft;j.parameters={...j.parameters,docs:{...(gt=j.parameters)==null?void 0:gt.docs,source:{originalSource:`{
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
}`,...(wt=(mt=j.parameters)==null?void 0:mt.docs)==null?void 0:wt.source},description:{story:`The same catalogue scoped to Scripture resources. Languages that only have non-Scripture
resources are absent from the language filter, so no selection can produce an empty list.`,...(ft=(yt=j.parameters)==null?void 0:yt.docs)==null?void 0:ft.description}}};const Dr=["Default","WithResourceTypeFilter","NoResults","CatalogFailedToLoad","NoResultsForFilter","EmptyAlreadySelected","LargeResourceList","WithNotice","NoticeWithFailedCatalog","InstalledNotSelectable","LongNamesDoNotScrollHorizontally","LongNamesDoNotScrollHorizontallyWhenNarrow","ManyLanguages","ManyLanguagesScopedToScripture"];export{R as CatalogFailedToLoad,C as Default,U as EmptyAlreadySelected,T as InstalledNotSelectable,M as LargeResourceList,A as LongNamesDoNotScrollHorizontally,k as LongNamesDoNotScrollHorizontallyWhenNarrow,D as ManyLanguages,j as ManyLanguagesScopedToScripture,G as NoResults,v as NoResultsForFilter,_ as NoticeWithFailedCatalog,L as WithNotice,P as WithResourceTypeFilter,Dr as __namedExportsOrder,kr as default};
