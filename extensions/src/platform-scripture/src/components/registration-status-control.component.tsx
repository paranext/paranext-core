import { useEffect, useRef } from 'react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Checkbox,
  Label,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  cn,
} from 'platform-bible-react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, ExternalLink } from 'lucide-react';
import {
  RegistrationControlInput,
  RegistrationControlOutput,
  useRegistrationStatus,
} from '../hooks/use-registration-status';

// =============================================================================
// PROPS
// =============================================================================

export interface RegistrationStatusControlProps {
  /** Input state for the control */
  input: RegistrationControlInput;

  /** Callback when register link is clicked */
  onRegisterClick?: () => void;

  /** Callback when manage link is clicked */
  onManageClick?: () => void;

  /** Callback when offline confirm checkbox changes */
  onOfflineConfirmChange?: (confirmed: boolean) => void;

  /** Callback when control state changes (for parent form) */
  onStateChange?: (output: RegistrationControlOutput) => void;

  /** Optional className for styling */
  className?: string;
}

// =============================================================================
// HELPERS
// =============================================================================

/** Maps message type to Alert variant */
function getAlertVariant(
  messageType: 'info' | 'success' | 'warning' | 'error',
): 'default' | 'destructive' | undefined {
  switch (messageType) {
    case 'error':
      return 'destructive';
    case 'success':
    case 'warning':
    case 'info':
    default:
      return 'default';
  }
}

/** Gets the appropriate icon for the message type */
function getAlertIcon(messageType: 'info' | 'success' | 'warning' | 'error') {
  switch (messageType) {
    case 'success':
      return <CheckCircle2 className="tw-h-4 tw-w-4 tw-text-green-600" />;
    case 'warning':
      return <AlertTriangle className="tw-h-4 tw-w-4 tw-text-yellow-600" />;
    case 'error':
      return <AlertCircle className="tw-h-4 tw-w-4" />;
    case 'info':
    default:
      return <Info className="tw-h-4 tw-w-4 tw-text-blue-600" />;
  }
}

/** Gets additional styling class for non-destructive alert variants */
function getAlertClassName(messageType: 'info' | 'success' | 'warning' | 'error'): string {
  switch (messageType) {
    case 'success':
      return 'tw-border-green-200 tw-bg-green-50';
    case 'warning':
      return 'tw-border-yellow-200 tw-bg-yellow-50';
    case 'info':
      return 'tw-border-blue-200 tw-bg-blue-50';
    case 'error':
    default:
      return '';
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * RegistrationStatusControl - Displays project registration status and provides registration
 * actions
 *
 * Features:
 *
 * - 11 display states based on project type, registration status, and user permissions
 * - "Register online..." link for CanRegister state
 * - "Manage registration..." link for Registered/RegisteredPrivate/Revoked states
 * - Offline checkbox for OfflineAllowed state
 * - Updates when project type or base project changes
 * - Propagates blocksSubmit state to parent form
 *
 * Related behaviors:
 *
 * - BHV-205: Registration control state display
 * - BHV-102: Registration requirement by project type
 * - BHV-111: Registry server project registration
 * - BHV-210: Registration offline confirmation
 *
 * @param props - Component props
 */
export function RegistrationStatusControl({
  input,
  onRegisterClick,
  onManageClick,
  onOfflineConfirmChange,
  onStateChange,
  className,
}: RegistrationStatusControlProps) {
  // Handlers are disabled with tooltips until features are implemented
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- Buttons disabled until feature is implemented
  const { state, output, handleOfflineConfirmChange } = useRegistrationStatus(input, {
    onRegisterClicked: onRegisterClick,
    onManageClicked: onManageClick,
    onOfflineConfirmChanged: onOfflineConfirmChange,
  });

  // Track previous output to detect changes
  const previousOutputRef = useRef<RegistrationControlOutput | undefined>();

  // Notify parent of state changes
  useEffect(() => {
    if (onStateChange) {
      // Only call if output has actually changed
      const prevOutput = previousOutputRef.current;
      if (
        !prevOutput ||
        prevOutput.currentState.displayState !== output.currentState.displayState ||
        prevOutput.currentState.offlineConfirmed !== output.currentState.offlineConfirmed ||
        prevOutput.currentState.blocksSubmit !== output.currentState.blocksSubmit
      ) {
        previousOutputRef.current = output;
        onStateChange(output);
      }
    }
  }, [output, onStateChange]);

  // Don't render anything if no project type selected (optional - could show info message)
  if (state.displayState === 'ProjectTypeNotSelected') {
    return (
      <div className={cn('pr-twp', className)}>
        <Alert className="tw-border-muted tw-bg-muted/50">
          {getAlertIcon('info')}
          <AlertDescription className="tw-text-muted-foreground">{state.message}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className={cn('pr-twp', className)} role="status" aria-live="polite">
      <Alert
        variant={getAlertVariant(state.messageType)}
        className={cn(getAlertClassName(state.messageType))}
      >
        {getAlertIcon(state.messageType)}
        <AlertTitle className="tw-font-semibold">Registration Status</AlertTitle>
        <AlertDescription className="tw-flex tw-flex-col tw-gap-2">
          {/* Status message */}
          <span>{state.message}</span>

          {/* Action links */}
          <div className="tw-flex tw-flex-wrap tw-gap-2">
            {/* Register online link (BHV-111) */}
            {state.showRegisterLink && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Button
                        variant="link"
                        size="sm"
                        disabled
                        className="tw-h-auto tw-p-0 tw-text-muted-foreground"
                      >
                        <ExternalLink className="tw-mr-1 tw-h-3 tw-w-3" />
                        Register online...
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Online registration is not yet available</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}

            {/* Manage registration link */}
            {state.showManageLink && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Button
                        variant="link"
                        size="sm"
                        disabled
                        className="tw-h-auto tw-p-0 tw-text-muted-foreground"
                      >
                        <ExternalLink className="tw-mr-1 tw-h-3 tw-w-3" />
                        Manage registration...
                      </Button>
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>Registration management is not yet available</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>

          {/* Offline checkbox (BHV-210) */}
          {state.showOfflineCheckbox && (
            <div className="tw-flex tw-items-center tw-gap-2 tw-mt-2">
              <Checkbox
                id="offline-confirm"
                checked={state.offlineConfirmed}
                onCheckedChange={(checked) => handleOfflineConfirmChange(checked === true)}
              />
              <Label
                htmlFor="offline-confirm"
                className="tw-text-sm tw-font-normal tw-cursor-pointer"
              >
                Migrate without registering (offline)
              </Label>
            </div>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default RegistrationStatusControl;
