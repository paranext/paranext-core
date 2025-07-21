import{j as o}from"./jsx-runtime-D2K1yJFO.js";import{B as x}from"./book-chapter-control.component-7hkO9-mh.js";import{T as I}from"./theme-provider.component-SNPt0K8i.js";import{r as d}from"./iframe-BDvoTL_W.js";import{D as L}from"./index-4W15H_p_.js";import"./input-DzKuD-b8.js";import"./shadcn-ui.util-DMJ19wEV.js";import"./index-CcpEU6iC.js";import"./index-FfE_ZP1D.js";import"./index-Doh_X05t.js";import"./index-yfjpLrcO.js";import"./index-BPbCuWFR.js";import"./Combination-Ct2-ik-b.js";import"./index-DqfbVj1e.js";import"./index.es-hnQYuBQ8.js";function J({scrRef:e,handleSubmit:p,...P}){const[U,j]=d.useState(e),O=d.useCallback(m=>{j(m),p(m)},[p]);return o.jsx(I,{children:o.jsx("div",{className:"tw-p-4",children:o.jsx(x,{...P,scrRef:U,handleSubmit:O})})})}const te={title:"Advanced/BookChapterControl",component:x,tags:["autodocs"],decorators:[e=>o.jsx(e,{})],args:{scrRef:L,handleSubmit:e=>console.log("Scripture reference changed:",e)},render:e=>o.jsx(J,{...e})},t={parameters:{docs:{description:{story:"The default BookChapterControl component. Click on the input to open the dropdown menu and select books and chapters. You can also type to search for books or enter scripture references directly."}}}},r={args:{scrRef:{book:"GEN",chapterNum:1,verseNum:1}},parameters:{docs:{description:{story:"BookChapterControl starting with Genesis 1:1. Shows how the component displays different books."}}}},s={args:{scrRef:{book:"MAT",chapterNum:5,verseNum:3}},parameters:{docs:{description:{story:"BookChapterControl starting with Matthew 5:3 (New Testament). Demonstrates navigation within the New Testament books."}}}},n={args:{scrRef:{book:"PSA",chapterNum:23,verseNum:1}},parameters:{docs:{description:{story:"BookChapterControl starting with Psalm 23:1. Shows how the component handles books with many chapters."}}}},a={args:{scrRef:{book:"GEN",chapterNum:1,verseNum:1},getActiveBookIds:()=>["GEN","EXO","LEV","NUM","DEU","MAT","MRK","LUK","JHN"]},parameters:{docs:{description:{story:"BookChapterControl with a custom list of active books. Only the specified books (Genesis through Deuteronomy and the four Gospels) will be available in the dropdown."}}}},c={args:{scrRef:{book:"REV",chapterNum:22,verseNum:21}},parameters:{docs:{description:{story:"BookChapterControl starting with Revelation 22:21 (the last verse in the Bible). Demonstrates the component at the end of the scripture."}}}},i={args:{scrRef:{book:"ROM",chapterNum:8,verseNum:28},getActiveBookIds:void 0},parameters:{docs:{description:{story:`Interactive BookChapterControl playground starting with Romans 8:28. Try different interactions:
- Click the input to open the dropdown
- Type book names or abbreviations to filter (e.g., "gen", "genesis", "matt")
- Type scripture references directly (e.g., "John 3:16", "Psalm 23", "1 Cor 13:4")
- Use keyboard navigation (Arrow keys, Enter, Tab, Escape)
- Select books and chapters from the dropdown menu
Changes will be logged to the console and the component state will update.`}}}};var h,l,u;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: 'The default BookChapterControl component. Click on the input to open the dropdown menu and select books and chapters. You can also type to search for books or enter scripture references directly.'
      }
    }
  }
}`,...(u=(l=t.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var k,f,g;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'GEN',
      chapterNum: 1,
      verseNum: 1
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'BookChapterControl starting with Genesis 1:1. Shows how the component displays different books.'
      }
    }
  }
}`,...(g=(f=r.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var b,w,y;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'MAT',
      chapterNum: 5,
      verseNum: 3
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'BookChapterControl starting with Matthew 5:3 (New Testament). Demonstrates navigation within the New Testament books.'
      }
    }
  }
}`,...(y=(w=s.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var C,N,v;n.parameters={...n.parameters,docs:{...(C=n.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'PSA',
      chapterNum: 23,
      verseNum: 1
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'BookChapterControl starting with Psalm 23:1. Shows how the component handles books with many chapters.'
      }
    }
  }
}`,...(v=(N=n.parameters)==null?void 0:N.docs)==null?void 0:v.source}}};var R,B,T;a.parameters={...a.parameters,docs:{...(R=a.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'GEN',
      chapterNum: 1,
      verseNum: 1
    },
    getActiveBookIds: () => ['GEN', 'EXO', 'LEV', 'NUM', 'DEU', 'MAT', 'MRK', 'LUK', 'JHN']
  },
  parameters: {
    docs: {
      description: {
        story: 'BookChapterControl with a custom list of active books. Only the specified books (Genesis through Deuteronomy and the four Gospels) will be available in the dropdown.'
      }
    }
  }
}`,...(T=(B=a.parameters)==null?void 0:B.docs)==null?void 0:T.source}}};var E,S,G;c.parameters={...c.parameters,docs:{...(E=c.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'REV',
      chapterNum: 22,
      verseNum: 21
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'BookChapterControl starting with Revelation 22:21 (the last verse in the Bible). Demonstrates the component at the end of the scripture.'
      }
    }
  }
}`,...(G=(S=c.parameters)==null?void 0:S.docs)==null?void 0:G.source}}};var A,D,M;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    scrRef: {
      book: 'ROM',
      chapterNum: 8,
      verseNum: 28
    },
    getActiveBookIds: undefined // Use all books
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive BookChapterControl playground starting with Romans 8:28. Try different interactions:\\n' + '- Click the input to open the dropdown\\n' + '- Type book names or abbreviations to filter (e.g., "gen", "genesis", "matt")\\n' + '- Type scripture references directly (e.g., "John 3:16", "Psalm 23", "1 Cor 13:4")\\n' + '- Use keyboard navigation (Arrow keys, Enter, Tab, Escape)\\n' + '- Select books and chapters from the dropdown menu\\n' + 'Changes will be logged to the console and the component state will update.'
      }
    }
  }
}`,...(M=(D=i.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};const re=["Default","Genesis","NewTestament","Psalms","WithCustomBookList","Revelation","Playground"];export{t as Default,r as Genesis,s as NewTestament,i as Playground,n as Psalms,c as Revelation,a as WithCustomBookList,re as __namedExportsOrder,te as default};
