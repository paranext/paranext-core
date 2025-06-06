import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { ThemeProvider } from '@/preview/preview-components/theme-provider.component';

const meta: Meta = {
  title: 'Demo/RTL Direction',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const DemoComponent = () => (
  <div className="pr-twp tw-space-y-4 tw-p-6 tw-max-w-md">
    <Card>
      <CardHeader>
        <CardTitle>Direction Test Card</CardTitle>
        <CardDescription>
          This card tests RTL/LTR direction changes. 
          العربية: هذا نص تجريبي باللغة العربية
        </CardDescription>
      </CardHeader>
      <CardContent className="tw-space-y-4">
        <div className="tw-space-y-2">
          <label htmlFor="test-input" className="tw-block tw-text-sm tw-font-medium">
            Test Input (English + עברית)
          </label>
          <Input 
            id="test-input" 
            placeholder="Type here... اكتب هنا"
            className="tw-w-full"
          />
        </div>
        
        <div className="tw-flex tw-gap-2">
          <Button variant="default">
            Button 1 (زر)
          </Button>
          <Button variant="outline">
            Button 2 (כפתור)
          </Button>
        </div>
        
        <div className="tw-text-sm tw-space-y-1">
          <p><strong>English:</strong> This text should align left in LTR mode and right in RTL mode.</p>
          <p><strong>عربي:</strong> هذا النص يجب أن يظهر من اليمين إلى اليسار في وضع RTL.</p>
          <p><strong>עברית:</strong> הטקסט הזה צריך להופיע מימין לשמאל במצב RTL.</p>
        </div>
        
        <div className="tw-border tw-p-3 tw-rounded">
          <p className="tw-text-xs tw-text-muted-foreground tw-mb-2">Mixed content test:</p>
          <p>Hello مرحبا שלום world! Numbers: 123 ١٢٣</p>
        </div>
      </CardContent>
    </Card>
  </div>
);

export const DirectionDemo: Story = {
  render: () => <DemoComponent />,
  parameters: {
    docs: {
      description: {
        story: 'Use the Direction toggle in the toolbar above to switch between LTR and RTL modes. Notice how the layout, text alignment, and component positioning changes.',
      },
    },
  },
};

export const ButtonAlignment: Story = {
  render: () => (
    <div className="pr-twp tw-p-6 tw-space-y-4">
      <h3 className="tw-text-lg tw-font-semibold">Button Alignment Test</h3>
      <div className="tw-flex tw-gap-2 tw-justify-start">
        <Button>First زر</Button>
        <Button variant="outline">Second כפתור</Button>
        <Button variant="ghost">Third Button</Button>
      </div>
      <div className="tw-flex tw-gap-2 tw-justify-end">
        <Button size="sm">Small</Button>
        <Button>Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  ),
};

