import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/shadcn-ui/button';
import { Input } from '@/components/shadcn-ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { ThemeProvider } from '@/storybook/theme-provider.component';

const meta: Meta = {
  title: 'Demo/Text Direction',
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

function DemoComponent() {
  return (
    <div className="pr-twp tw-max-w-md tw-space-y-4 tw-p-6">
      <Card>
        <CardHeader>
          <CardTitle>Direction Test Card</CardTitle>
          <CardDescription>
            This card tests RTL/LTR direction changes. العربية: هذا نص تجريبي باللغة العربية
          </CardDescription>
        </CardHeader>
        <CardContent className="tw-space-y-4">
          <div className="tw-space-y-2">
            <label htmlFor="test-input" className="tw-block tw-text-sm tw-font-medium">
              Test Input (English + עברית)
            </label>
            <Input id="test-input" placeholder="Type here... اكتب هنا" className="tw-w-full" />
          </div>

          <div className="tw-flex tw-gap-2">
            <Button variant="default">Button 1 (زر)</Button>
            <Button variant="outline">Button 2 (כפתור)</Button>
          </div>

          <div className="tw-space-y-1 tw-text-sm">
            <p>
              <strong>English:</strong> This text should align left in LTR mode and right in RTL
              mode.
            </p>
            <p>
              <strong>عربي:</strong> هذا النص يجب أن يظهر من اليمين إلى اليسار في وضع RTL.
            </p>
            <p>
              <strong>עברית:</strong> הטקסט הזה צריך להופיע מימין לשמאל במצב RTL.
            </p>
          </div>

          <div className="tw-rounded tw-border tw-p-3">
            <p className="tw-mb-2 tw-text-xs tw-text-muted-foreground">Mixed content test:</p>
            <p>Hello مرحبا שלום world! Numbers: 123 ١٢٣</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const DirectionDemo: Story = {
  render: () => <DemoComponent />,
  parameters: {
    docs: {
      description: {
        story:
          'Use the Direction toggle in the toolbar above to switch between LTR and RTL modes. Notice how the layout, text alignment, and component positioning changes.',
      },
    },
  },
};

export const ButtonAlignment: Story = {
  render: () => (
    <div className="pr-twp tw-space-y-4 tw-p-6">
      <h3 className="tw-text-lg tw-font-semibold">Button Alignment Test</h3>
      <div className="tw-flex tw-justify-start tw-gap-2">
        <Button>First زر</Button>
        <Button variant="outline">Second כפתור</Button>
        <Button variant="ghost">Third Button</Button>
      </div>
      <div className="tw-flex tw-justify-end tw-gap-2">
        <Button size="sm">Small</Button>
        <Button>Medium</Button>
        <Button size="lg">Large</Button>
      </div>
    </div>
  ),
};
