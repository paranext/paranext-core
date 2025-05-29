import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from 'platform-bible-react';
import { isLocalizeKey, LocalizeKey } from 'platform-bible-utils';
import { useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import './platform-tab-title.component.scss';

type PlatformTabTitleProps = {
  /** Url to image to show on the tab. Defaults to the software's standard logo. */
  iconUrl?: string;
  /** Text to show on the tab */
  text: string | LocalizeKey;
  /** Text to show when hovering over the tab. Defaults to empty string */
  tooltip?: string;
};

/**
 * Custom tab title for all tabs in Platform
 *
 * @param iconUrl Url to image to show on the tab. Defaults to the software's standard logo.
 * @param text The text to show on the tab title
 * @param tooltip Text to show when hovering over the tab. Defaults to empty string
 */
export function PlatformTabTitle({ iconUrl, text, tooltip }: PlatformTabTitleProps) {
  const tabAria: LocalizeKey = '%tab_aria_tab%';
  const [localizedStrings] = useLocalizedStrings(
    useMemo(() => (isLocalizeKey(text) ? [text, tabAria] : [tabAria]), [text]),
  );
  const title = isLocalizeKey(text) ? localizedStrings[text] : text;
  const tabLabel = localizedStrings[tabAria];

  const icon = (
    <div
      className="tab-menu-icon"
      style={
        iconUrl
          ? {
              backgroundImage: `url(${iconUrl})`,
            }
          : undefined
      }
    />
  );

  // This ref will always be defined
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const containerRef = useRef<HTMLDivElement>(undefined!);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div ref={containerRef} className="title" aria-label={tabLabel}>
            <span>{icon}</span>
            <span>{title}</span>
          </div>
        </TooltipTrigger>
        {tooltip &&
          createPortal(
            <TooltipContent className="tooltip" side="bottom">
              <p>{tooltip}</p>
            </TooltipContent>,
            document.body,
          )}
      </Tooltip>
    </TooltipProvider>
  );
}

export default PlatformTabTitle;
