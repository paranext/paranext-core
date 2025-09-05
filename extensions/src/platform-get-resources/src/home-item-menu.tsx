import { Ellipsis } from 'lucide-react';
import {
  Button,
  cn,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from 'platform-bible-react';

export interface HomeItemMenuProps {
  /* children of type <DropdownMenuItem> */
  children: React.ReactNode;
  /* Optional class name to apply to the ellipsis button */
  ellipsisButtonClassName?: string;
}

/**
 * A dropdown menu for a home item, triggered by an ellipsis button.
 *
 * @param children Children of type <DropdownMenuItem>
 * @param ellipsisButtonClassName Optional class name to apply to the ellipsis button
 * @returns
 */
export function HomeItemDropdownMenu({ children, ellipsisButtonClassName }: HomeItemMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={cn('tw-w-4', ellipsisButtonClassName)}>
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
