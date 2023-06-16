import { Snackbar as MuiSnackbar, SnackbarContentClasses } from '@mui/material';
import { SyntheticEvent, ReactElement, ReactNode } from 'react';
import { SxProps, Theme } from '@mui/system';
import './snackbar.component.css';

export type CloseReason = 'timeout' | 'clickaway' | 'escapeKeyDown';

export interface AnchorOrigin {
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

export type SnackbarContentProps = {
  /**
   * The action to display, renders after the message
   */
  action?: ReactNode;

  /**
   * The message to display
   */
  message?: ReactNode;

  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<SnackbarContentClasses>;

  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxProps<Theme>;

  /**
   * Additional css classes to help with unique styling of the snackbar
   */
  className?: string;
};

export type SnackbarProps = {
  /**
   * If true, the component is shown
   */
  open?: boolean;

  /**
   * The number of milliseconds to wait before automatically calling onClose()
   * @default null
   */
  autoHideDuration?: number | null;

  /**
   * Additional css classes to help with unique styling of the snackbar
   */
  className?: string;

  /**
   * Optional, used to control the open prop
   * event: Event | SyntheticEvent<Element, Event>, reason: string
   */
  onClose?: (event: SyntheticEvent<any> | Event, reason: CloseReason) => void;

  /**
   * The anchor of the `Snackbar`.
   * the horizontal alignment is ignored.
   * @default vertical: 'bottom', horizontal: 'left'
   */
  anchorOrigin?: AnchorOrigin;

  /**
   * Replace the `SnackbarContent` component.
   */
  children?: ReactElement<any, any>;

  ContentProps?: SnackbarContentProps;
};

/**
 * Snackbar that provides brief notifications
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
function Snackbar({
  autoHideDuration = 6000,
  open = false,
  className,
  onClose,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  ContentProps = {
    action: '',
    message: '',
    classes: {
      root: 'papi-snackbar',
    },
    sx: {},
  },
  children,
}: SnackbarProps) {
  const snackbar = (
    <MuiSnackbar
      autoHideDuration={autoHideDuration}
      className={`papi-snackbar ${className ?? ''}`}
      open={open}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      ContentProps={ContentProps}
    >
      {children}
    </MuiSnackbar>
  );
  return snackbar;
}

export default Snackbar;
