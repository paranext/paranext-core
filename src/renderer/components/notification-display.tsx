import { Toaster } from 'sonner';
import './notification-display.scss';

// PT-4193: class hooks for notification-display.scss's fix for the two-button (action + cancel)
// toast layout collapse - see that file for the full explanation. Applied here (the `Toaster`'s
// shared `toastOptions`) rather than per-notification in notification.service-host.ts so every
// toast gets the hooks uniformly; the CSS itself only changes layout when both buttons are present.
export function NotificationDisplay() {
  return (
    <Toaster
      toastOptions={{
        classNames: {
          toast: 'notification-toast',
          content: 'notification-toast-content',
          actionButton: 'notification-toast-action-button',
          cancelButton: 'notification-toast-cancel-button',
        },
      }}
    />
  );
}

export default NotificationDisplay;
