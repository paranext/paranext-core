import{j as e}from"./jsx-runtime-4wK_0ZO4.js";import{S as U}from"./search-bar.component-C5UClP5Q.js";import{V as K,a as Q,b as _,c as B}from"./tabs-vertical-BQ0KXFp2.js";import{r as m}from"./iframe-BcYeWgcr.js";import"./button-BklEqBlb.js";import"./index-BJ893FO-.js";import"./index-DNc3TkLQ.js";import"./index-BPbCuWFR.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./input-CLS-C3Rv.js";import"./search-CDL-OBzM.js";import"./createLucideIcon-D1oFpSf_.js";import"./x-GMUNTJKS.js";import"./index-B6gecgxP.js";import"./index-B1Guct03.js";import"./index-Dxmr7YCn.js";import"./index-DBWqXr8V.js";import"./index-PhEMGCGr.js";import"./index-BTW_afRk.js";import"./index-CHtcClp9.js";import"./index-CiidgNRF.js";import"./index-xAGYJ6Tj.js";import"./index-BdtTgfff.js";import"./index-DZhSYnG_.js";import"./index-D2kttkiv.js";function d({tabList:t,searchValue:n,onSearch:r,searchPlaceholder:o,headerTitle:s,searchClassName:i,id:c}){return e.jsxs("div",{id:c,className:"pr-twp",children:[e.jsxs("div",{className:"tw-sticky tw-top-0 tw-space-y-2 tw-pb-2",children:[s?e.jsx("h1",{children:s}):"",e.jsx(U,{className:i,value:n,onSearch:r,placeholder:o})]}),e.jsxs(K,{children:[e.jsx(Q,{children:t.map(a=>e.jsx(_,{value:a.value,children:a.value},a.key))}),t.map(a=>e.jsx(B,{value:a.value,children:a.content},a.key))]})]})}d.__docgenInfo={description:`TabNavigationContentSearch component provides a vertical tab navigation interface with a search
bar at the top. This component allows users to filter content within tabs based on a search
query.

@param {TabNavigationContentSearchProps} props
@param {TabKeyValueContent[]} props.tabList - List of objects containing keys, values, and
  content for each tab to be displayed.
@param {string} props.searchValue - The current value of the search input.
@param {function} props.onSearch - Callback function called when the search input changes;
  receives the new search query as an argument.
@param {string} [props.searchPlaceholder] - Optional placeholder text for the search input.
@param {string} [props.headerTitle] - Optional title to display above the search input.
@param {string} [props.searchClassName] - Optional CSS class name to apply custom styles to the
  search input.
@param {string} [props.id] - Optional id for the root element.`,methods:[],displayName:"TabNavigationContentSearch",props:{tabList:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
  key: string;
  value: string;
  content: ReactNode;
}`,signature:{properties:[{key:"key",value:{name:"string",required:!0}},{key:"value",value:{name:"string",required:!0}},{key:"content",value:{name:"ReactNode",required:!0}}]}}],raw:"TabKeyValueContent[]"},description:"List of values and keys for each tab this component should provide"},searchValue:{required:!0,tsType:{name:"string"},description:"The search query in the search bar"},onSearch:{required:!0,tsType:{name:"signature",type:"function",raw:"(searchQuery: string) => void",signature:{arguments:[{type:{name:"string"},name:"searchQuery"}],return:{name:"void"}}},description:"Handler to run when the value of the search bar changes"},searchPlaceholder:{required:!1,tsType:{name:"string"},description:"Optional placeholder for the search bar"},headerTitle:{required:!1,tsType:{name:"string"},description:"Optional title to include in the header"},searchClassName:{required:!1,tsType:{name:"string"},description:"Optional className to modify the search input"},id:{required:!1,tsType:{name:"string"},description:"Optional id for the root element"}}};const ge={title:"Advanced/TabNavigationContentSearch",component:d,tags:["autodocs"],parameters:{docs:{description:{component:`
A vertical tab navigation component with an integrated search functionality.

This component provides:
- Vertical tab layout for content organization
- Sticky search bar at the top for filtering content
- Customizable header title
- Flexible tab content through React nodes
- Search integration with parent component state

Perfect for organizing and searching through categorized content like documentation, settings, or any structured data.
        `}}},argTypes:{tabList:{control:!1,description:"Array of tab objects with key, value, and content"},searchValue:{control:"text",description:"Current search query value"},onSearch:{control:!1,description:"Callback function for search input changes"},searchPlaceholder:{control:"text",description:"Placeholder text for the search input"},headerTitle:{control:"text",description:"Optional title displayed above the search bar"},searchClassName:{control:"text",description:"Optional CSS classes for search input styling"}}},v=t=>{const n=["Application settings","User preferences","Theme selection","Language settings","Notification preferences"],r=["Password management","Two-factor authentication","Login history","Security alerts","Privacy settings"],o=["Developer options","Advanced configurations","System diagnostics","Performance tuning","Debug settings"],s=(c,a)=>c.filter(l=>l.toLowerCase().includes(a.toLowerCase()));return[{key:"general",value:"General",content:e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"General Settings"}),e.jsxs("div",{className:"tw-space-y-1",children:[s(n,t).map((c,a)=>e.jsx("div",{className:"tw-hover:bg-gray-50 tw-rounded tw-border tw-p-2",children:c},a)),s(n,t).length===0&&t&&e.jsx("div",{className:"tw-italic tw-text-muted-foreground",children:"No general settings match your search."})]})]})},{key:"security",value:"Security",content:e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Security Settings"}),e.jsxs("div",{className:"tw-space-y-1",children:[s(r,t).map((c,a)=>e.jsx("div",{className:"tw-hover:bg-gray-50 tw-rounded tw-border tw-p-2",children:c},a)),s(r,t).length===0&&t&&e.jsx("div",{className:"tw-italic tw-text-muted-foreground",children:"No security settings match your search."})]})]})},{key:"advanced",value:"Advanced",content:e.jsxs("div",{className:"tw-space-y-2",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Advanced Settings"}),e.jsxs("div",{className:"tw-space-y-1",children:[s(o,t).map((c,a)=>e.jsx("div",{className:"tw-hover:bg-gray-50 tw-rounded tw-border tw-p-2",children:c},a)),s(o,t).length===0&&t&&e.jsx("div",{className:"tw-italic tw-text-muted-foreground",children:"No advanced settings match your search."})]})]})}]};function y({headerTitle:t,searchPlaceholder:n="Search settings..."}){const[r,o]=m.useState(""),s=i=>{o(i)};return e.jsx("div",{className:"tw-h-96 tw-max-w-2xl tw-overflow-hidden tw-rounded tw-border",children:e.jsx(d,{tabList:v(r),searchValue:r,onSearch:s,searchPlaceholder:n,headerTitle:t})})}const h={render:()=>e.jsx(y,{})},p={render:()=>e.jsx(y,{headerTitle:"Application Settings"}),parameters:{docs:{description:{story:"Tab navigation with a header title displayed above the search bar."}}}},u={render:()=>e.jsx(y,{headerTitle:"Documentation",searchPlaceholder:"Search documentation topics..."}),parameters:{docs:{description:{story:"Tab navigation with a custom search placeholder text."}}}},w={render:()=>{const[t,n]=m.useState(""),r=[{key:"getting-started",value:"Getting Started",content:e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Getting Started Guide"}),e.jsxs("div",{className:"tw-space-y-2",children:[e.jsxs("div",{className:"tw-rounded tw-bg-blue-50 tw-p-3",children:[e.jsx("h4",{className:"tw-font-medium",children:"Installation"}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:"Learn how to install and set up the application for the first time."})]}),e.jsxs("div",{className:"tw-rounded tw-bg-green-50 tw-p-3",children:[e.jsx("h4",{className:"tw-font-medium",children:"Quick Start"}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:"A 5-minute guide to get you up and running with basic features."})]}),e.jsxs("div",{className:"tw-rounded tw-bg-purple-50 tw-p-3",children:[e.jsx("h4",{className:"tw-font-medium",children:"Tutorial"}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:"Step-by-step walkthrough of common tasks and workflows."})]})]})]})},{key:"api",value:"API Reference",content:e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"API Documentation"}),e.jsxs("div",{className:"tw-space-y-2",children:[e.jsxs("div",{className:"tw-rounded tw-border tw-p-3",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("span",{className:"tw-rounded tw-bg-green-100 tw-px-2 tw-py-1 tw-text-xs tw-text-green-800",children:"GET"}),e.jsx("code",{children:"/api/users"})]}),e.jsx("p",{className:"tw-mt-1 tw-text-sm tw-text-muted-foreground",children:"Retrieve user information"})]}),e.jsxs("div",{className:"tw-rounded tw-border tw-p-3",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("span",{className:"tw-rounded tw-bg-blue-100 tw-px-2 tw-py-1 tw-text-xs tw-text-blue-800",children:"POST"}),e.jsx("code",{children:"/api/projects"})]}),e.jsx("p",{className:"tw-mt-1 tw-text-sm tw-text-muted-foreground",children:"Create a new project"})]}),e.jsxs("div",{className:"tw-rounded tw-border tw-p-3",children:[e.jsxs("div",{className:"tw-flex tw-items-center tw-gap-2",children:[e.jsx("span",{className:"tw-rounded tw-bg-orange-100 tw-px-2 tw-py-1 tw-text-xs tw-text-orange-800",children:"PUT"}),e.jsx("code",{children:"/api/settings"})]}),e.jsx("p",{className:"tw-mt-1 tw-text-sm tw-text-muted-foreground",children:"Update application settings"})]})]})]})},{key:"troubleshooting",value:"Troubleshooting",content:e.jsxs("div",{className:"tw-space-y-4",children:[e.jsx("h3",{className:"tw-text-lg tw-font-semibold",children:"Common Issues"}),e.jsxs("div",{className:"tw-space-y-3",children:[e.jsxs("div",{className:"tw-border-l-4 tw-border-yellow-400 tw-pl-4",children:[e.jsx("h4",{className:"tw-font-medium",children:"Application won't start"}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:"Check system requirements and verify installation integrity."})]}),e.jsxs("div",{className:"tw-border-l-4 tw-border-red-400 tw-pl-4",children:[e.jsx("h4",{className:"tw-font-medium",children:"Login issues"}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:"Verify credentials and check network connectivity."})]}),e.jsxs("div",{className:"tw-border-l-4 tw-border-blue-400 tw-pl-4",children:[e.jsx("h4",{className:"tw-font-medium",children:"Performance problems"}),e.jsx("p",{className:"tw-text-sm tw-text-muted-foreground",children:"Clear cache and check available system resources."})]})]})]})}],o=s=>{n(s)};return e.jsx("div",{className:"tw-h-96 tw-max-w-3xl tw-overflow-hidden tw-rounded tw-border",children:e.jsx(d,{tabList:r,searchValue:t,onSearch:o,searchPlaceholder:"Search documentation...",headerTitle:"Documentation Center"})})},parameters:{docs:{description:{story:"Example showing the component used for documentation navigation with rich content."}}}},x={render:()=>{const[t,n]=m.useState("xyz-no-results"),r=[{key:"empty1",value:"Tab One",content:e.jsx("div",{className:"tw-py-8 tw-text-center",children:e.jsx("p",{className:"tw-text-muted-foreground",children:"No content matches your search."})})},{key:"empty2",value:"Tab Two",content:e.jsx("div",{className:"tw-py-8 tw-text-center",children:e.jsx("p",{className:"tw-text-muted-foreground",children:"No results found."})})}],o=s=>{n(s)};return e.jsx("div",{className:"tw-h-64 tw-max-w-2xl tw-overflow-hidden tw-rounded tw-border",children:e.jsx(d,{tabList:r,searchValue:t,onSearch:o,searchPlaceholder:"Search for something...",headerTitle:"Search Results"})})},parameters:{docs:{description:{story:"Example showing how to handle empty search results across tabs."}}}},g={render:()=>{const[t,n]=m.useState(""),[r,o]=m.useState({total:0,matches:0}),s=i=>{n(i);const c=v(i),a=15;let l=0;i?c.forEach(z=>{var b;(((b=z.content)==null?void 0:b.toString())||"").toLowerCase().includes(i.toLowerCase())&&(l+=1)}):l=a,o({total:a,matches:l})};return e.jsxs("div",{className:"tw-space-y-4",children:[e.jsxs("div",{className:"tw-rounded tw-bg-blue-50 tw-p-4",children:[e.jsx("h3",{className:"tw-mb-2 tw-font-semibold",children:"Search Statistics"}),e.jsxs("div",{className:"tw-space-y-1 tw-text-sm",children:[e.jsxs("div",{children:['Current search: "',t||"None",'"']}),e.jsxs("div",{children:["Results: ",r.matches," of ",r.total," items"]})]})]}),e.jsx("div",{className:"tw-h-96 tw-max-w-2xl tw-overflow-hidden tw-rounded tw-border",children:e.jsx(d,{tabList:v(t),searchValue:t,onSearch:s,searchPlaceholder:"Try searching for 'security' or 'theme'...",headerTitle:"Interactive Settings Search"})})]})},parameters:{docs:{description:{story:"Interactive example with search statistics and suggestions."}}}};var f,N,S;h.parameters={...h.parameters,docs:{...(f=h.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <SearchableTabDemo />
}`,...(S=(N=h.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var j,T,C;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: () => <SearchableTabDemo headerTitle="Application Settings" />,
  parameters: {
    docs: {
      description: {
        story: 'Tab navigation with a header title displayed above the search bar.'
      }
    }
  }
}`,...(C=(T=p.parameters)==null?void 0:T.docs)==null?void 0:C.source}}};var k,V,P;u.parameters={...u.parameters,docs:{...(k=u.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <SearchableTabDemo headerTitle="Documentation" searchPlaceholder="Search documentation topics..." />,
  parameters: {
    docs: {
      description: {
        story: 'Tab navigation with a custom search placeholder text.'
      }
    }
  }
}`,...(P=(V=u.parameters)==null?void 0:V.docs)==null?void 0:P.source}}};var q,L,D;w.parameters={...w.parameters,docs:{...(q=w.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const documentationTabs: TabKeyValueContent[] = [{
      key: 'getting-started',
      value: 'Getting Started',
      content: <div className="tw-space-y-4">
            <h3 className="tw-text-lg tw-font-semibold">Getting Started Guide</h3>
            <div className="tw-space-y-2">
              <div className="tw-rounded tw-bg-blue-50 tw-p-3">
                <h4 className="tw-font-medium">Installation</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  Learn how to install and set up the application for the first time.
                </p>
              </div>
              <div className="tw-rounded tw-bg-green-50 tw-p-3">
                <h4 className="tw-font-medium">Quick Start</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  A 5-minute guide to get you up and running with basic features.
                </p>
              </div>
              <div className="tw-rounded tw-bg-purple-50 tw-p-3">
                <h4 className="tw-font-medium">Tutorial</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  Step-by-step walkthrough of common tasks and workflows.
                </p>
              </div>
            </div>
          </div>
    }, {
      key: 'api',
      value: 'API Reference',
      content: <div className="tw-space-y-4">
            <h3 className="tw-text-lg tw-font-semibold">API Documentation</h3>
            <div className="tw-space-y-2">
              <div className="tw-rounded tw-border tw-p-3">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <span className="tw-rounded tw-bg-green-100 tw-px-2 tw-py-1 tw-text-xs tw-text-green-800">
                    GET
                  </span>
                  <code>/api/users</code>
                </div>
                <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">
                  Retrieve user information
                </p>
              </div>
              <div className="tw-rounded tw-border tw-p-3">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <span className="tw-rounded tw-bg-blue-100 tw-px-2 tw-py-1 tw-text-xs tw-text-blue-800">
                    POST
                  </span>
                  <code>/api/projects</code>
                </div>
                <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">Create a new project</p>
              </div>
              <div className="tw-rounded tw-border tw-p-3">
                <div className="tw-flex tw-items-center tw-gap-2">
                  <span className="tw-rounded tw-bg-orange-100 tw-px-2 tw-py-1 tw-text-xs tw-text-orange-800">
                    PUT
                  </span>
                  <code>/api/settings</code>
                </div>
                <p className="tw-mt-1 tw-text-sm tw-text-muted-foreground">
                  Update application settings
                </p>
              </div>
            </div>
          </div>
    }, {
      key: 'troubleshooting',
      value: 'Troubleshooting',
      content: <div className="tw-space-y-4">
            <h3 className="tw-text-lg tw-font-semibold">Common Issues</h3>
            <div className="tw-space-y-3">
              <div className="tw-border-l-4 tw-border-yellow-400 tw-pl-4">
                <h4 className="tw-font-medium">Application won&apos;t start</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  Check system requirements and verify installation integrity.
                </p>
              </div>
              <div className="tw-border-l-4 tw-border-red-400 tw-pl-4">
                <h4 className="tw-font-medium">Login issues</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  Verify credentials and check network connectivity.
                </p>
              </div>
              <div className="tw-border-l-4 tw-border-blue-400 tw-pl-4">
                <h4 className="tw-font-medium">Performance problems</h4>
                <p className="tw-text-sm tw-text-muted-foreground">
                  Clear cache and check available system resources.
                </p>
              </div>
            </div>
          </div>
    }];
    const handleSearch = (query: string) => {
      setSearchValue(query);
    };
    return <div className="tw-h-96 tw-max-w-3xl tw-overflow-hidden tw-rounded tw-border">
        <TabNavigationContentSearch tabList={documentationTabs} searchValue={searchValue} onSearch={handleSearch} searchPlaceholder="Search documentation..." headerTitle="Documentation Center" />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing the component used for documentation navigation with rich content.'
      }
    }
  }
}`,...(D=(L=w.parameters)==null?void 0:L.docs)==null?void 0:D.source}}};var I,A,E;x.parameters={...x.parameters,docs:{...(I=x.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => {
    const [searchValue, setSearchValue] = useState('xyz-no-results');
    const emptyTabs: TabKeyValueContent[] = [{
      key: 'empty1',
      value: 'Tab One',
      content: <div className="tw-py-8 tw-text-center">
            <p className="tw-text-muted-foreground">No content matches your search.</p>
          </div>
    }, {
      key: 'empty2',
      value: 'Tab Two',
      content: <div className="tw-py-8 tw-text-center">
            <p className="tw-text-muted-foreground">No results found.</p>
          </div>
    }];
    const handleSearch = (query: string) => {
      setSearchValue(query);
    };
    return <div className="tw-h-64 tw-max-w-2xl tw-overflow-hidden tw-rounded tw-border">
        <TabNavigationContentSearch tabList={emptyTabs} searchValue={searchValue} onSearch={handleSearch} searchPlaceholder="Search for something..." headerTitle="Search Results" />
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how to handle empty search results across tabs.'
      }
    }
  }
}`,...(E=(A=x.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var O,R,G;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => {
    const [searchValue, setSearchValue] = useState('');
    const [searchStats, setSearchStats] = useState({
      total: 0,
      matches: 0
    });
    const handleSearch = (query: string) => {
      setSearchValue(query);

      // Calculate search statistics
      const tabData = createSampleContent(query);
      const total = 15; // Total items across all tabs
      let matches = 0;
      if (query) {
        // Count items that would be displayed after filtering
        tabData.forEach(tab => {
          const contentStr = tab.content?.toString() || '';
          if (contentStr.toLowerCase().includes(query.toLowerCase())) {
            matches += 1;
          }
        });
      } else {
        matches = total;
      }
      setSearchStats({
        total,
        matches
      });
    };
    return <div className="tw-space-y-4">
        <div className="tw-rounded tw-bg-blue-50 tw-p-4">
          <h3 className="tw-mb-2 tw-font-semibold">Search Statistics</h3>
          <div className="tw-space-y-1 tw-text-sm">
            <div>Current search: &quot;{searchValue || 'None'}&quot;</div>
            <div>
              Results: {searchStats.matches} of {searchStats.total} items
            </div>
          </div>
        </div>

        <div className="tw-h-96 tw-max-w-2xl tw-overflow-hidden tw-rounded tw-border">
          <TabNavigationContentSearch tabList={createSampleContent(searchValue)} searchValue={searchValue} onSearch={handleSearch} searchPlaceholder="Try searching for 'security' or 'theme'..." headerTitle="Interactive Settings Search" />
        </div>
      </div>;
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example with search statistics and suggestions.'
      }
    }
  }
}`,...(G=(R=g.parameters)==null?void 0:R.docs)==null?void 0:G.source}}};const ve=["Default","WithTitle","CustomPlaceholder","DocumentationExample","EmptyState","InteractiveDemo"];export{u as CustomPlaceholder,h as Default,w as DocumentationExample,x as EmptyState,g as InteractiveDemo,p as WithTitle,ve as __namedExportsOrder,ge as default};
