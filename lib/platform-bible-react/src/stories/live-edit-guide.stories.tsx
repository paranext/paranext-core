import type { Meta, StoryObj } from '@storybook/react';

// Simple component to hold our documentation
function LiveEditGuide() {
  return (
    <div style={{ padding: '20px', maxWidth: '800px', fontFamily: 'system-ui' }}>
      <h1>📖 Live Code Editing Guide</h1>

      <p>
        This Storybook includes live code editing capabilities powered by{' '}
        <code>storybook-addon-code-editor</code>. You can edit React/TypeScript code in real-time
        and see changes immediately in the preview.
      </p>

      <h2>🚀 How to Use</h2>
      <ol>
        <li>
          <strong>Navigate to any Live Edit story</strong> in this section
        </li>
        <li>
          <strong>Look for the code editor</strong> - It will appear as an editor panel or section
        </li>
        <li>
          <strong>Edit the code</strong> directly in the Monaco editor (VS Code-like experience)
        </li>
        <li>
          <strong>See changes instantly</strong> reflected in the component preview
        </li>
      </ol>

      <h2>✨ Features</h2>
      <ul>
        <li>
          ✅ <strong>Monaco Editor</strong> - VS Code's editor with familiar shortcuts
        </li>
        <li>
          ✅ <strong>TypeScript Support</strong> - Full syntax highlighting and IntelliSense
        </li>
        <li>
          ✅ <strong>Real-time Updates</strong> - Changes appear immediately
        </li>
        <li>
          ✅ <strong>React Hooks</strong> - useState, useEffect, and other hooks work out of the box
        </li>
        <li>
          ✅ <strong>Component Library</strong> - Your Button, Input, and other components are
          available
        </li>
      </ul>

      <h2>📚 Examples to Try</h2>

      <h3>Basic Examples (Start Here)</h3>
      <ul>
        <li>
          <strong>BasicExample</strong> - Simple HTML/React editing, perfect for getting started
        </li>
        <li>
          <strong>InteractiveCounter</strong> - React hooks and state management
        </li>
      </ul>

      <h3>Advanced Examples</h3>
      <ul>
        <li>
          <strong>Counter</strong> - Complex example with Button + Input components
        </li>
        <li>
          <strong>InputWithState</strong> - Input validation and state management
        </li>
      </ul>

      <h2>💡 Quick Tips</h2>

      <h3>Editing Code</h3>
      <ul>
        <li>
          Use <strong>Ctrl/Cmd+Z</strong> to undo changes
        </li>
        <li>
          <strong>Ctrl/Cmd+S</strong> to format code
        </li>
        <li>All standard VS Code shortcuts work</li>
      </ul>

      <h3>Common Patterns</h3>
      <pre
        style={{
          background: '#f5f5f5',
          padding: '10px',
          borderRadius: '4px',
          overflow: 'auto',
        }}
      >
        {`// Add state
const [value, setValue] = useState('initial');

// Add event handlers
onClick={() => console.log('clicked')}

// Use components
<Button variant="destructive">Click me</Button>
<Input placeholder="Type here..." />`}
      </pre>

      <h3>What's Available</h3>
      <ul>
        <li>
          <strong>React</strong> - Automatically imported (useState, useEffect, etc.)
        </li>
        <li>
          <strong>Button</strong> - All variants: default, destructive, outline, secondary, ghost,
          link
        </li>
        <li>
          <strong>Input</strong> - Text inputs with full event handling
        </li>
        <li>
          <strong>Standard HTML</strong> - All HTML elements and inline styles
        </li>
      </ul>

      <h2>✅ Best Practices</h2>
      <ul>
        <li>
          ✅ <strong>Start simple</strong> - Begin with BasicExample to get familiar
        </li>
        <li>
          ✅ <strong>Experiment freely</strong> - Changes are temporary and won't affect the actual
          codebase
        </li>
        <li>
          ✅ <strong>Copy useful code</strong> - When you create something useful, copy it for your
          projects
        </li>
        <li>
          ✅ <strong>Try different patterns</strong> - Test controlled vs uncontrolled components,
          different event handlers, etc.
        </li>
      </ul>

      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          background: '#e8f5e8',
          borderRadius: '8px',
          border: '1px solid #4caf50',
        }}
      >
        <strong>Ready to start?</strong> Head to <strong>BasicExample</strong> to try your first
        live edit!
      </div>
    </div>
  );
}

const meta: Meta<typeof LiveEditGuide> = {
  title: 'Demo/Live Edit',
  component: LiveEditGuide,
  parameters: {
    docs: {
      description: {
        component: 'How to use the live code editor in Storybook.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LiveEditGuide>;

export const Guide: Story = {};
