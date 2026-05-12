// CUSTOM: Added React import - file uses React.CSSProperties which requires the React namespace
import React from 'react';
import { useTheme } from 'next-themes';
// CUSTOM: Imported toast function as 'sonner' to re-export it alongside the Toaster component
import { Toaster as Sonner, toast as sonner, type ToasterProps } from 'sonner';
import {
  IconCircleCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertOctagon,
  IconLoader,
} from '@tabler/icons-react';

/**
 * Props for the Sonner toast component.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/sonner}
 * @see Sonner Documentation: {@link https://sonner.emilkowal.ski}
 */
// CUSTOM: Added SonnerProps type alias with TSDoc linking to shadcn/ui and Sonner documentation
type SonnerProps = ToasterProps;

/**
 * The Sonner component is an opinionated toast component for React. It is built on Sonner and
 * styled with Shadcn UI.
 *
 * @see Shadcn UI Documentation: {@link https://ui.shadcn.com/docs/components/sonner}
 * @see Sonner Documentation: {@link https://sonner.emilkowal.ski}
 */
// CUSTOM: Added TSDoc with links to shadcn/ui and Sonner documentation
function Toaster({ ...props }: SonnerProps) {
  const { theme: rawTheme = 'system' } = useTheme();
  // CUSTOM: Narrow the string returned by useTheme() to the specific union type ToasterProps['theme']
  // requires, avoiding a type assertion. useTheme() returns string | undefined; ToasterProps expects
  // 'light' | 'dark' | 'system' | undefined. Default to 'system' for any unrecognised value.
  const theme: ToasterProps['theme'] =
    rawTheme === 'light' || rawTheme === 'dark' || rawTheme === 'system' ? rawTheme : 'system';

  // CUSTOM: CSS custom properties (--*) are not in React.CSSProperties; 'as React.CSSProperties'
  // is the standard React pattern for passing CSS variables via the style prop. Extracted to a
  // single-line const so the eslint-disable-next-line can target the assertion precisely.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const toasterStyle = {
    '--normal-bg': 'var(--popover)',
    '--normal-text': 'var(--popover-foreground)',
    '--normal-border': 'var(--border)',
    '--border-radius': 'var(--radius)',
  } as React.CSSProperties;

  return (
    <Sonner
      theme={theme}
      className="tw:toaster tw:group"
      icons={{
        success: <IconCircleCheck className="tw:size-4" />,
        info: <IconInfoCircle className="tw:size-4" />,
        warning: <IconAlertTriangle className="tw:size-4" />,
        error: <IconAlertOctagon className="tw:size-4" />,
        loading: <IconLoader className="tw:size-4 tw:animate-spin" />,
      }}
      style={toasterStyle}
      toastOptions={{
        classNames: {
          toast: 'cn-toast',
        },
      }}
      {...props}
    />
  );
}

// CUSTOM: Exported Toaster as Sonner to maintain the Platform.Bible API name; also re-exported the
// sonner toast function so consumers have a single import point for both the component and the
// imperative toast trigger.
export { Toaster as Sonner, sonner };
