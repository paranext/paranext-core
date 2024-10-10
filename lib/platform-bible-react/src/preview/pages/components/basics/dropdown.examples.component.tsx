import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { HasDirection } from '@/preview/preview-components/direction-toggle.component';
import { ChevronDown } from 'lucide-react';

export default function DropdownExamples({ direction }: HasDirection) {
  return (
    <DropdownMenu dir={direction}>
      <DropdownMenuTrigger asChild>
        <Button>
          Open
          <ChevronDown className="tw-ms-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>DropdownMenuLabel</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <span>DropdownMenuItem</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
