import { Ellipsis } from 'lucide-react';
import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from 'platform-bible-react';
import { ReactNode } from 'react';

export interface HomeItemMenuProps {
  /* children of type <DropdownMenuItem> */
  children: ReactNode;
  /* Optional class name to apply to the ellipsis button */
  ellipsisButtonClassName?: string;
  /** Localized accessible name and tooltip text for the ellipsis button */
  label: string;
}

/**
 * A dropdown menu for a home item, triggered by an ellipsis button. Renders a tooltip, so it must
 * be inside a `TooltipProvider`.
 *
 * @param children Children of type <DropdownMenuItem>
 * @param ellipsisButtonClassName Optional class name to apply to the ellipsis button
 * @param label Localized accessible name and tooltip text for the ellipsis button
 * @returns
 */
export function HomeItemDropdownMenu({
  children,
  ellipsisButtonClassName,
  label,
}: HomeItemMenuProps) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              aria-label={label}
              className={cn('tw:w-4', ellipsisButtonClassName)}
            >
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="start">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
