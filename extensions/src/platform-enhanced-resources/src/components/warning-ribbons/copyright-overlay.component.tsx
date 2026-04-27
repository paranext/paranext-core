import { Alert, AlertDescription, AlertTitle, Button } from 'platform-bible-react';
import type { LocalizedStringValue } from 'platform-bible-utils';
import { Copyright as CopyrightIcon } from 'lucide-react';

/** Object containing all keys used for localization in this component. */
export const COPYRIGHT_OVERLAY_STRING_KEYS = Object.freeze([
  '%enhancedResources_copyrightOverlay_title%',
  '%enhancedResources_copyrightOverlay_dismiss%',
  '%enhancedResources_copyrightOverlay_emptyMessage%',
] as const);

type CopyrightOverlayLocalizedStringKey = (typeof COPYRIGHT_OVERLAY_STRING_KEYS)[number];
type CopyrightOverlayLocalizedStrings = {
  [key in CopyrightOverlayLocalizedStringKey]?: LocalizedStringValue;
};

export type CopyrightOverlayProps = {
  /** Copyright text supplied by the resource. May contain newlines for paragraph separation. */
  copyrightInfo?: string;
  /** When true, the overlay renders nothing. Caller controls whether to mount/unmount. */
  dismissed?: boolean;
  /** Dismiss handler invoked from the close button. */
  onDismiss?: () => void;
  localizedStringsWithLoadingState?: [CopyrightOverlayLocalizedStrings, boolean];
};

/**
 * Pure presentational copyright overlay shown when the user clicks "More info..." on the copyright
 * ribbon (BHV-310, theme 9). Renders the resource's copyright text in a structured Alert. The
 * actual modal/dialog wrapping happens in the wiring layer.
 */
export function CopyrightOverlay({
  copyrightInfo,
  dismissed = false,
  onDismiss = () => {},
  localizedStringsWithLoadingState = [{}, false],
}: CopyrightOverlayProps) {
  if (dismissed) return undefined;

  const getLocalizedString = (key: CopyrightOverlayLocalizedStringKey) =>
    localizedStringsWithLoadingState[0][key] ?? key;

  const titleText = String(getLocalizedString('%enhancedResources_copyrightOverlay_title%'));
  const dismissText = String(getLocalizedString('%enhancedResources_copyrightOverlay_dismiss%'));
  const emptyMessage = String(
    getLocalizedString('%enhancedResources_copyrightOverlay_emptyMessage%'),
  );

  return (
    <Alert role="alertdialog" aria-labelledby="er-copyright-title" className="tw-m-4 tw-max-w-2xl">
      <CopyrightIcon className="tw-h-4 tw-w-4" />
      <AlertTitle id="er-copyright-title">{titleText}</AlertTitle>
      <AlertDescription className="tw-flex tw-flex-col tw-gap-3">
        {copyrightInfo ? (
          copyrightInfo.split(/\n+/).map((paragraph) => (
            <p key={paragraph} className="tw-text-sm tw-leading-relaxed">
              {paragraph}
            </p>
          ))
        ) : (
          <p className="tw-text-sm tw-italic tw-text-muted-foreground">{emptyMessage}</p>
        )}
        <div className="tw-flex tw-justify-end">
          <Button variant="outline" onClick={onDismiss}>
            {dismissText}
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}

export default CopyrightOverlay;
