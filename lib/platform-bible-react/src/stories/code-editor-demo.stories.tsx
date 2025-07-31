import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { makeLiveEditStory } from 'storybook-addon-code-editor';
import { useState } from 'react';

// Simple interactive demo component
function InteractiveDemo() {
  const [text, setText] = useState('Hello, World!');
  const [count, setCount] = useState(0);

  return (
    <div className="tw-space-y-4 tw-p-4">
      <h2 className="tw-text-xl tw-font-bold">Live Code Editor Demo</h2>
      <div className="tw-space-y-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
        <p className="tw-text-sm tw-text-gray-600">You typed: {text}</p>
      </div>
      <div className="tw-space-y-2">
        <Button onClick={() => setCount(count + 1)}>Clicked {count} times</Button>
        <Button variant="outline" onClick={() => setCount(0)}>
          Reset
        </Button>
      </div>
    </div>
  );
}

const meta: Meta<typeof InteractiveDemo> = {
title: 'Demo/Live Edit/Demo',
  component: InteractiveDemo,
  parameters: {
    docs: {
      description: {
        component:
          'Live editing examples for all components. Start with simple examples, then try the advanced UI components.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InteractiveDemo>;

// Basic examples first
export const BasicExample: Story = {};

// Add live editing functionality
makeLiveEditStory(BasicExample, {
  code: `export default function SimpleTest() {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Hello from Code Editor!</h1>
      <p>This is a simple test. Try editing this code!</p>
      <button onClick={() => alert('Button clicked!')}>
        Click me
      </button>
    </div>
  );
}`,
  availableImports: {
    '@/components/shadcn-ui/button': { Button },
    '@/components/shadcn-ui/input': { Input },
  },
});

export const InteractiveCounter: Story = {};

makeLiveEditStory(InteractiveCounter, {
  code: `import { useState } from 'react';

export default function StatefulTest() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '10px' }}>
        Reset
      </button>
    </div>
  );
}`,
  // React and hooks are automatically available
});

export const Counter: Story = {};

makeLiveEditStory(Counter, {
  code: `import { useState } from 'react';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';

export default function InteractiveDemo() {
  const [text, setText] = useState('Hello, World!');
  const [count, setCount] = useState(0);

  return (
    <div className="tw-space-y-4 tw-p-4">
      <h2 className="tw-text-xl tw-font-bold">Live Code Editor Demo</h2>
      <div className="tw-space-y-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
        <p className="tw-text-sm tw-text-gray-600">You typed: {text}</p>
      </div>
      <div className="tw-space-y-2">
        <Button onClick={() => setCount(count + 1)}>
          Clicked {count} times
        </Button>
        <Button
          variant="outline"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}`,
  availableImports: {
    '@/components/shadcn-ui/button': { Button },
    '@/components/shadcn-ui/input': { Input },
  },
});

export const InputWithState: Story = {};

makeLiveEditStory(InputWithState, {
  code: `import { useState } from 'react';
import { Input } from '@/components/shadcn-ui/input';

export default function InputDemo() {
  const [value, setValue] = useState('');

  return (
    <div className="tw-space-y-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Edit this in the code editor!"
      />
      <p className="tw-text-sm">Value: {value}</p>
      <p className="tw-text-xs tw-text-gray-500">
        Try adding validation, changing the placeholder, or styling!
      </p>
    </div>
  );
}`,
  availableImports: {
    '@/components/shadcn-ui/input': { Input },
  },
});
