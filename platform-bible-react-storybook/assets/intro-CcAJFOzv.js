import{j as e}from"./jsx-runtime-CvGToidP.js";import{useMDXComponents as s}from"./index-CNm5GXnS.js";import{M as i}from"./blocks-bGJDhVXO.js";import"./iframe-FHgAwj54.js";import"./index-CgTHgj0j.js";import"./index-BJ-VzaQi.js";function o(t){const n={a:"a",code:"code",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...s(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(i,{title:"Home/Intro"}),`
`,e.jsx(n.p,{children:"Building a design system for a Bible translation app requires a deep understanding of our values, mission, and the people who will be using the system. Below is a comprehensive plan for the design system, tailored to communicate our core values and help users interact with the app effectively."}),`
`,e.jsx(n.h3,{id:"introduction",children:"Introduction"}),`
`,e.jsx(n.p,{children:"Welcome to the Bible Platform Design System. This system serves as the cornerstone for crafting seamless, intuitive, and inclusive Bible translation apps. We've rooted our design philosophy in these core: expansive and extensible, open, cooperative, and opportunity-focused. The design choices, from shapes to colors, reflect these principles."}),`
`,e.jsxs(n.p,{children:["This Design System is created and maintained by the Paratext UX Team. It is an early draft not ready to be distributed or used as a reference. In case of questions or comments you may contact us through the ",e.jsx(n.a,{href:"https://discord.com/channels/1064938364597436416/1082713526780575845",rel:"nofollow",children:"UX channel"})," on the Platform.Bible Discord server."]}),`
`,e.jsx(n.h3,{id:"design-principles",children:"Design Principles"}),`
`,e.jsxs(n.ol,{children:[`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Foundationally Strong"}),": The app's interfaces should feel reliable and secure to convey stability, supporting the foundational value."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Expansively Inclusive"}),": The design system should be flexible to accommodate the diverse linguistic and cultural backgrounds of the vast user base."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Openness"}),": Interfaces should promote transparency and foster an environment of collaboration and sharing."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Cooperative Engagement"}),": The design should encourage cooperation among users, allowing them to interact, share insights, and work together on language projects."]}),`
`]}),`
`,e.jsxs(n.li,{children:[`
`,e.jsxs(n.p,{children:[e.jsx(n.strong,{children:"Opportunity Creation"}),": Finally, the app should highlight growth, learning, and the discovery of new possibilities within the context of language and spirituality."]}),`
`]}),`
`]}),`
`,e.jsx(n.h3,{id:"design-tokens",children:"Design Tokens"}),`
`,e.jsx(n.p,{children:"The design tokens represent the visual atoms of the design system. Here are some examples:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Color Palette"}),": A range of colors inspired by the sky, from dawn to dusk, communicates openness and opportunity."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Typography"}),": A legible typeface that resonates with trust, and suggests a foundation."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Spacing Scale"}),": Harmonized spacing that allows for content to breathe, signifying openness."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Iconography"}),": Symbols with roundness and unclosed elements to represent expansion and extensibility."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Borders and Radii"}),": Smooth, rounded corners on elements to emphasize friendliness and collaboration."]}),`
`]}),`
`,e.jsx(n.h3,{id:"foundations",children:"Foundations"}),`
`,e.jsx(n.p,{children:"This section would detail the core elements like Grid, Typography, Colors, Icons, and Imagery—a complete reference to ensure consistency in the design."}),`
`,e.jsx(n.h3,{id:"getting-started-guide",children:"Getting Started Guide"}),`
`,e.jsx(n.p,{children:"This guide would provide developers with step-by-step instructions on how to implement the design system. It would include essential information on how to configure their environment, and where to find components and resources."}),`
`,e.jsx(n.h3,{id:"voice-and-tone",children:"Voice and Tone"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Voice"}),": Welcoming, respectful, and warm. It should feel like a companion that supports the user in their exploration and understanding of the Bible."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tone"}),": Adaptable to context. Should be more formal and reverent when dealing with scripture content, and more casual and encouraging in teaching and guidance sections."]}),`
`]}),`
`,e.jsx(n.h3,{id:"mdx-typescript-and-csf-examples",children:"MDX, TypeScript, and CSF Examples"}),`
`,e.jsx(n.p,{children:"Our Bible translation app design system would use MDX for documentation, TypeScript for type-safe components, and CSF to showcase components in Storybook. Here's a snippet:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-mdx",children:`// Button.mdx
import { Meta, Story, Props } from '@storybook/addon-docs/blocks';
import { Button } from './Button';

<Meta title="Components/Button" component={Button} />

# Button

The button component is used to trigger an action or event.

## Usage

<Props of={Button} />

<Story name="Basic">
  <Button label="Translate" onClick={() => console.log('Translated!')} />
</Story>
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Button.tsx
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

export default Button;
`})}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-tsx",children:`// Button.stories.tsx
import React from 'react';
import Button from './Button';
import { Story, Meta } from '@storybook/react/types-6-0';

export default {
  title: 'Components/Button',
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Translate',
};
`})}),`
`,e.jsx(n.p,{children:"This snippet illustrates the foundational structure you'd see in the design system documentation and components. The documentation in MDX provides context and guidelines, TypeScript ensures robustness and type safety for the components, and CSF within Storybook offers a playground for interactive component visualization and testing."})]})}function p(t={}){const{wrapper:n}={...s(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(o,{...t})}):o(t)}export{p as default};
