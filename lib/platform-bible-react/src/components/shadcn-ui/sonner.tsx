// CUSTOM: Added React import - file uses React.CSSProperties which requires the React namespace
import React from 'react';
import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';
import {
  IconCircleCheck,
  IconInfoCircle,
  IconAlertTriangle,
  IconAlertOctagon,
  IconLoader,
} from '@tabler/icons-react';

function Toaster({ ...props }: ToasterProps) {
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

export { Toaster };
