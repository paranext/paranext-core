import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{S as d}from"./search-bar.component-C5UClP5Q.js";import{r as c}from"./iframe-BcYeWgcr.js";import{T as Y}from"./theme-provider.component-Bum-YBGl.js";import"./button-BklEqBlb.js";import"./index-BJ893FO-.js";import"./index-DNc3TkLQ.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./input-CLS-C3Rv.js";import"./search-CDL-OBzM.js";import"./createLucideIcon-D1oFpSf_.js";import"./x-GMUNTJKS.js";const{fn:n}=__STORYBOOK_MODULE_TEST__;function l({initialValue:r="",onSearch:t,...o}){const[i,s]=c.useState(r),a=c.useCallback(h=>{s(h),t==null||t(h)},[t]);return e.jsx(d,{...o,value:i,onSearch:a})}const oe={title:"Basics/SearchBar",component:d,tags:["autodocs"],decorators:[r=>e.jsx(Y,{children:e.jsx(r,{})})],argTypes:{onSearch:{action:"search"},placeholder:{control:"text"},value:{control:"text"},isFullWidth:{control:"boolean"},isDisabled:{control:"boolean"}}},u={render:()=>e.jsx(l,{onSearch:n()}),parameters:{docs:{description:{story:"A basic search bar with default placeholder."}}}},m={render:()=>e.jsx(l,{placeholder:"Search for items...",onSearch:n()}),parameters:{docs:{description:{story:"A search bar with custom placeholder text."}}}},p={render:()=>e.jsx(l,{placeholder:"Full width search",isFullWidth:!0,onSearch:n()}),parameters:{docs:{description:{story:"A search bar that takes up the full width of its container."}}}},S={render:()=>e.jsx(l,{placeholder:"Disabled search",isDisabled:!0,onSearch:n()}),parameters:{docs:{description:{story:"A disabled search bar that cannot be interacted with."}}}},y={render:()=>e.jsx(l,{initialValue:"Initial search term",placeholder:"Search...",onSearch:n()}),parameters:{docs:{description:{story:"A search bar with an initial value."}}}},b={render:r=>{const[t,o]=c.useState(""),[i,s]=c.useState("");let a;const h=f=>{o(f),clearTimeout(a),a=setTimeout(()=>{var v;s(f),(v=r.onSearch)==null||v.call(r,f)},500)};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx(d,{...r,value:t,onSearch:h}),e.jsxs("div",{className:"tw-text-sm tw-text-muted-foreground",children:[e.jsxs("div",{children:["Current input: ",e.jsx("code",{children:t||"(empty)"})]}),e.jsxs("div",{children:["Debounced search: ",e.jsx("code",{children:i||"(empty)"})]})]})]})},args:{placeholder:"Type to search (debounced)...",onSearch:n()},parameters:{docs:{description:{story:"A search bar with debounced search functionality - search is triggered 500ms after typing stops."}}}},x={render:()=>{const[r,t]=c.useState(""),[o,i]=c.useState(""),[s,a]=c.useState("");return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"Default Search"}),e.jsx(d,{value:r,onSearch:t,placeholder:"Search..."})]}),e.jsxs("div",{children:[e.jsx("label",{className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"Full Width Search"}),e.jsx(d,{value:o,onSearch:i,placeholder:"Full width search...",isFullWidth:!0})]}),e.jsxs("div",{children:[e.jsx("label",{className:"tw-mb-2 tw-block tw-text-sm tw-font-medium",children:"Disabled Search"}),e.jsx(d,{value:s,onSearch:a,placeholder:"Disabled...",isDisabled:!0})]})]})},parameters:{docs:{description:{story:"Different search bar variants showing various configurations."}}}},w={render:r=>{const[t,o]=c.useState(""),i=s=>{var a;o(s),(a=r.onSearch)==null||a.call(r,s)};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx(d,{...r,value:t,onSearch:i}),e.jsxs("div",{className:"tw-text-sm tw-text-muted-foreground",children:["Current search: ",e.jsx("code",{children:t||"(empty)"})]})]})},args:{placeholder:"Type to search...",onSearch:n()},parameters:{docs:{description:{story:"An interactive search bar that shows the current search value."}}}};var j,Q,D;u.parameters={...u.parameters,docs:{...(j=u.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <SearchBarWithState onSearch={fn()} />,
  parameters: {
    docs: {
      description: {
        story: 'A basic search bar with default placeholder.'
      }
    }
  }
}`,...(D=(Q=u.parameters)==null?void 0:Q.docs)==null?void 0:D.source}}};var g,W,N;m.parameters={...m.parameters,docs:{...(g=m.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <SearchBarWithState placeholder="Search for items..." onSearch={fn()} />,
  parameters: {
    docs: {
      description: {
        story: 'A search bar with custom placeholder text.'
      }
    }
  }
}`,...(N=(W=m.parameters)==null?void 0:W.docs)==null?void 0:N.source}}};var T,B,q;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  render: () => <SearchBarWithState placeholder="Full width search" isFullWidth onSearch={fn()} />,
  parameters: {
    docs: {
      description: {
        story: 'A search bar that takes up the full width of its container.'
      }
    }
  }
}`,...(q=(B=p.parameters)==null?void 0:B.docs)==null?void 0:q.source}}};var A,F,k;S.parameters={...S.parameters,docs:{...(A=S.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: () => <SearchBarWithState placeholder="Disabled search" isDisabled onSearch={fn()} />,
  parameters: {
    docs: {
      description: {
        story: 'A disabled search bar that cannot be interacted with.'
      }
    }
  }
}`,...(k=(F=S.parameters)==null?void 0:F.docs)==null?void 0:k.source}}};var C,_,E;y.parameters={...y.parameters,docs:{...(C=y.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <SearchBarWithState initialValue="Initial search term" placeholder="Search..." onSearch={fn()} />,
  parameters: {
    docs: {
      description: {
        story: 'A search bar with an initial value.'
      }
    }
  }
}`,...(E=(_=y.parameters)==null?void 0:_.docs)==null?void 0:E.source}}};var V,O,I;b.parameters={...b.parameters,docs:{...(V=b.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(I=(O=b.parameters)==null?void 0:O.docs)==null?void 0:I.source}}};var P,R,K;x.parameters={...x.parameters,docs:{...(P=x.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(K=(R=x.parameters)==null?void 0:R.docs)==null?void 0:K.source}}};var L,M,U;w.parameters={...w.parameters,docs:{...(L=w.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(U=(M=w.parameters)==null?void 0:M.docs)==null?void 0:U.source}}};const ie=["Default","WithPlaceholder","FullWidth","Disabled","WithValue","Debounced","Variants","Interactive"];export{b as Debounced,u as Default,S as Disabled,p as FullWidth,w as Interactive,x as Variants,m as WithPlaceholder,y as WithValue,ie as __namedExportsOrder,oe as default};
