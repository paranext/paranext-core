import { BookA, LandPlot, Box } from 'lucide-react';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from 'platform-bible-react';
import { formatReplacementString } from 'platform-bible-utils';
import { Domain } from 'platform-lexical-tools';

/** Props for the DomainsDisplay component */
type DomainsDisplayProps = {
  /** Domains to display */
  domains: Domain[];
  /** Text to display for each domain */
  domainText: string;
};

/**
 * Renders a list of domains for a dictionary entry or sense.
 *
 * The component displays each domain as a rounded, colored pill with a small icon (a book for
 * lexical domains, a land plot for contextual domains, and a box for any other kind of domain). The
 * text of the pill is the code of the domain, followed by the label if there is one. When the user
 * hovers over the pill, a tooltip is displayed with the domain taxonomy in the format specified by
 * `domainText`.
 */
export function DomainsDisplay({ domains, domainText }: DomainsDisplayProps) {
  // Helper to choose icon based on taxonomy. Icons picked by UX. Only works with SDBH lexical reference text.
  const getDomainIcon = (taxonomy: string) => {
    if (taxonomy === 'SDBH-Lexical') return <BookA className="tw-inline tw-mr-1 tw-h-3 tw-w-3" />;
    if (taxonomy === 'SDBH-Contextual')
      return <LandPlot className="tw-inline tw-mr-1 tw-h-3 tw-w-3" />;
    return <Box className="tw-inline tw-mr-1 tw-h-3 tw-w-3" />;
  };

  return (
    <div className="tw-mt-2 tw-flex tw-flex-wrap tw-gap-2">
      {domains.map((domain) => (
        <TooltipProvider key={domain.code}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="tw-rounded tw-bg-accent tw-px-2 tw-py-0.5 tw-text-xs tw-accent-foreground tw-flex tw-items-center tw-gap-1">
                {getDomainIcon(domain.taxonomy)}
                <span>{domain.code}</span>
                <span>{domain.label ?? ''}</span>
              </span>
            </TooltipTrigger>
            <TooltipContent>
              {formatReplacementString(domainText, { taxonomy: domain.taxonomy })}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}
