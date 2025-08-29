import{j as e}from"./jsx-runtime-CoJcBlqr.js";import{S as o}from"./search-bar.component-C0Jyzyts.js";import{r as n}from"./iframe-ChjBVkNN.js";import{T as U}from"./theme-provider.component-DRoiPDtx.js";import"./button-BOi5X0CC.js";import"./index-B3HFQzOn.js";import"./index-CtW3L1xI.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./input-FiVrRUt5.js";import"./search-BdbvA1lj.js";import"./createLucideIcon-CVIRtPIF.js";import"./x-DEJKqPBv.js";const{fn:s}=__STORYBOOK_MODULE_TEST__,ce={title:"Basics/SearchBar",component:o,tags:["autodocs"],decorators:[r=>e.jsx(U,{children:e.jsx(r,{})})],argTypes:{onSearch:{action:"search"},placeholder:{control:"text"},value:{control:"text"},isFullWidth:{control:"boolean"},isDisabled:{control:"boolean"}}},l={args:{onSearch:s()},parameters:{docs:{description:{story:"A basic search bar with default placeholder."}}}},h={args:{placeholder:"Search for items...",onSearch:s()},parameters:{docs:{description:{story:"A search bar with custom placeholder text."}}}},u={args:{placeholder:"Full width search",isFullWidth:!0,onSearch:s()},parameters:{docs:{description:{story:"A search bar that takes up the full width of its container."}}}},m={args:{placeholder:"Disabled search",isDisabled:!0,onSearch:s()},parameters:{docs:{description:{story:"A disabled search bar that cannot be interacted with."}}}},p={args:{value:"Initial search term",placeholder:"Search...",onSearch:s()},parameters:{docs:{description:{story:"A search bar with an initial value."}}}},y={render:r=>{const[a,i]=n.useState(""),[d,c]=n.useState("");let t;const M=w=>{i(w),clearTimeout(t),t=setTimeout(()=>{var v;c(w),(v=r.onSearch)==null||v.call(r,w)},500)};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx(o,{...r,value:a,onSearch:M}),e.jsxs("div",{className:"tw-text-sm tw-text-muted-foreground",children:[e.jsxs("div",{children:["Current input: ",e.jsx("code",{children:a||"(empty)"})]}),e.jsxs("div",{children:["Debounced search: ",e.jsx("code",{children:d||"(empty)"})]})]})]})},args:{placeholder:"Type to search (debounced)...",onSearch:s()},parameters:{docs:{description:{story:"A search bar with debounced search functionality - search is triggered 500ms after typing stops."}}}},S={render:()=>{const[r,a]=n.useState(""),[i,d]=n.useState(""),[c,t]=n.useState("");return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"Default Search"}),e.jsx(o,{value:r,onSearch:a,placeholder:"Search..."})]}),e.jsxs("div",{children:[e.jsx("label",{className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"Full Width Search"}),e.jsx(o,{value:i,onSearch:d,placeholder:"Full width search...",isFullWidth:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"Disabled Search"}),e.jsx(o,{value:c,onSearch:t,placeholder:"Disabled...",isDisabled:!0})]})]})},parameters:{docs:{description:{story:"Different search bar variants showing various configurations."}}}},b={render:r=>{const[a,i]=n.useState(""),d=c=>{var t;i(c),(t=r.onSearch)==null||t.call(r,c)};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx(o,{...r,value:a,onSearch:d}),e.jsxs("div",{className:"tw-text-sm tw-text-muted-foreground",children:["Current search: ",e.jsx("code",{children:a||"(empty)"})]})]})},args:{placeholder:"Type to search...",onSearch:s()},parameters:{docs:{description:{story:"An interactive search bar that shows the current search value."}}}};var f,x,g;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    onSearch: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A basic search bar with default placeholder.'
      }
    }
  }
}`,...(g=(x=l.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var D,j,Q;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search for items...',
    onSearch: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A search bar with custom placeholder text.'
      }
    }
  }
}`,...(Q=(j=h.parameters)==null?void 0:j.docs)==null?void 0:Q.source}}};var N,T,q;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    placeholder: 'Full width search',
    isFullWidth: true,
    onSearch: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A search bar that takes up the full width of its container.'
      }
    }
  }
}`,...(q=(T=u.parameters)==null?void 0:T.docs)==null?void 0:q.source}}};var A,F,W;m.parameters={...m.parameters,docs:{...(A=m.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    placeholder: 'Disabled search',
    isDisabled: true,
    onSearch: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A disabled search bar that cannot be interacted with.'
      }
    }
  }
}`,...(W=(F=m.parameters)==null?void 0:F.docs)==null?void 0:W.source}}};var B,k,_;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    value: 'Initial search term',
    placeholder: 'Search...',
    onSearch: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A search bar with an initial value.'
      }
    }
  }
}`,...(_=(k=p.parameters)==null?void 0:k.docs)==null?void 0:_.source}}};var C,E,O;y.parameters={...y.parameters,docs:{...(C=y.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => {
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');
    let timer: ReturnType<typeof setTimeout>;
    const handleSearchDebounced = (query: string) => {
      setSearchQuery(query);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setDebouncedQuery(query);
        args.onSearch?.(query);
      }, 500);
    };
    return <div className="tw-space-y-4">
        <SearchBar {...args} value={searchQuery} onSearch={handleSearchDebounced} />
        <div className="tw-text-sm tw-text-muted-foreground">
          <div>
            Current input: <code>{searchQuery || '(empty)'}</code>
          </div>
          <div>
            Debounced search: <code>{debouncedQuery || '(empty)'}</code>
          </div>
        </div>
      </div>;
  },
  args: {
    placeholder: 'Type to search (debounced)...',
    onSearch: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'A search bar with debounced search functionality - search is triggered 500ms after typing stops.'
      }
    }
  }
}`,...(O=(E=y.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var I,V,P;S.parameters={...S.parameters,docs:{...(I=S.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const [query1, setQuery1] = useState('');
    const [query2, setQuery2] = useState('');
    const [query3, setQuery3] = useState('');
    return <div className="tw-space-y-4">
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-mb-2 tw-block tw-text-sm tw-font-medium">Default Search</label>
          <SearchBar value={query1} onSearch={setQuery1} placeholder="Search..." />
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-mb-2 tw-block tw-text-sm tw-font-medium">Full Width Search</label>
          <SearchBar value={query2} onSearch={setQuery2} placeholder="Full width search..." isFullWidth />
        </div>
        <div>
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="tw-mb-2 tw-block tw-text-sm tw-font-medium">Disabled Search</label>
          <SearchBar value={query3} onSearch={setQuery3} placeholder="Disabled..." isDisabled />
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Different search bar variants showing various configurations.'
      }
    }
  }
}`,...(P=(V=S.parameters)==null?void 0:V.docs)==null?void 0:P.source}}};var R,K,L;b.parameters={...b.parameters,docs:{...(R=b.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: args => {
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = (query: string) => {
      setSearchQuery(query);
      args.onSearch?.(query);
    };
    return <div className="tw-space-y-4">
        <SearchBar {...args} value={searchQuery} onSearch={handleSearch} />
        <div className="tw-text-sm tw-text-muted-foreground">
          Current search: <code>{searchQuery || '(empty)'}</code>
        </div>
      </div>;
  },
  args: {
    placeholder: 'Type to search...',
    onSearch: fn()
  },
  parameters: {
    docs: {
      description: {
        story: 'An interactive search bar that shows the current search value.'
      }
    }
  }
}`,...(L=(K=b.parameters)==null?void 0:K.docs)==null?void 0:L.source}}};const oe=["Default","WithPlaceholder","FullWidth","Disabled","WithValue","Debounced","Variants","Interactive"];export{y as Debounced,l as Default,m as Disabled,u as FullWidth,b as Interactive,S as Variants,h as WithPlaceholder,p as WithValue,oe as __namedExportsOrder,ce as default};
