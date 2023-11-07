import { Snackbar as MuiSnackbar, SnackbarCloseReason, SnackbarOrigin } from '@mui/material';
import { SyntheticEvent, ReactNode, PropsWithChildren } from 'react';
import './snackbar.component.css';

export type CloseReason = SnackbarCloseReason;
export type AnchorOrigin = SnackbarOrigin;

export type SnackbarContentProps = {
  /** The action to display, renders after the message */
  action?: ReactNode;

  /** The message to display */
  message?: ReactNode;

  /** Additional css classes to help with unique styling of the snackbar, internal */
  className?: string;
};

export type SnackbarProps = PropsWithChildren<{
  /** Optional unique identifier */
  id?: string;

  /**
   * If true, the component is shown
   *
   * @default false
   */
  isOpen?: boolean;

  /**
   * The number of milliseconds to wait before automatically calling onClose()
   *
   * @default null
   */
  autoHideDuration?: number | null;

  /** Additional css classes to help with unique styling of the snackbar, external */
  className?: string;

  /**
   * Optional, used to control the open prop event: Event | SyntheticEvent<Element, Event>, reason:
   * string
   */
  onClose?: (event: Event | SyntheticEvent<Element, Event>, reason: CloseReason) => void;

  /**
   * The anchor of the `Snackbar`. The horizontal alignment is ignored.
   *
   * @default { vertical: 'bottom', horizontal: 'left' }
   */
  anchorOrigin?: AnchorOrigin;

  /** Props applied to the [`SnackbarContent`](/material-ui/api/snackbar-content/) element. */
  ContentProps?: SnackbarContentProps;
}>;

/**
 * Snackbar that provides brief notifications
 *
 * Thanks to MUI for heavy inspiration and documentation
 * https://mui.com/material-ui/getting-started/overview/
 */
function Snackbar({
  autoHideDuration = null,
  id,
  isOpen = false,
  className,
  onClose,
  anchorOrigin = { vertical: 'bottom', horizontal: 'left' },
  ContentProps,
  children,
}: SnackbarProps) {
  const newContentProps: SnackbarContentProps = {
    action: ContentProps?.action || children,
    message: ContentProps?.message,
    className,
  };

  return (
    <MuiSnackbar
      autoHideDuration={autoHideDuration}
      open={isOpen}
      onClose={onClose}
      anchorOrigin={anchorOrigin}
      id={id}
      ContentProps={newContentProps}
    />
  );
}

export default Snackbar;
