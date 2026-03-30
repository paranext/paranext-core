/** Generic placeholder for unimplemented Simple Mode tabs. Shows tab name, icon, and "Coming soon". */

import { getTabDef, type TabId } from './tab-registry';

// Custom icon renderers for tabs without Lucide icons
function AlephIcon({ className }: { className?: string }) {
  return (
    <span className={`tw-font-serif tw-text-lg tw-leading-none ${className ?? ''}`}>&#x05D0;</span>
  );
}

function TriquetraIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="8" r="6" />
      <circle cx="7" cy="16" r="6" />
      <circle cx="17" cy="16" r="6" />
    </svg>
  );
}

interface PlaceholderTabProps {
  tabId: string;
}

export function PlaceholderTab({ tabId }: PlaceholderTabProps) {
  const tabDef = getTabDef(tabId);
  const label = tabDef?.labelKey ?? tabId;

  const renderIcon = () => {
    if (tabDef?.customIcon === 'aleph') return <AlephIcon className="tw-text-muted-foreground" />;
    if (tabDef?.customIcon === 'triquetra')
      return <TriquetraIcon className="tw-w-8 tw-h-8 tw-text-muted-foreground" />;
    if (tabDef?.icon) {
      const Icon = tabDef.icon;
      return <Icon className="tw-w-8 tw-h-8 tw-text-muted-foreground" />;
    }
    return undefined;
  };

  return (
    <div className="tw-flex tw-flex-col tw-items-center tw-justify-center tw-h-full tw-gap-3 tw-bg-background">
      {renderIcon()}
      <div className="tw-text-sm tw-font-medium tw-text-muted-foreground">{label}</div>
      <div className="tw-text-xs tw-text-muted-foreground/60">Coming soon</div>
    </div>
  );
}

export { AlephIcon, TriquetraIcon };
