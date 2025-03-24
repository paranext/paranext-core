import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';

import { ChevronDown } from 'lucide-react';

export function DropdownExamples() {
  return (
    <DropdownMenu>
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
          <DropdownMenuCheckboxItem checked>
            <span>DropdownMenuItem</span>
            <DropdownMenuShortcut>CTRL+L</DropdownMenuShortcut>
          </DropdownMenuCheckboxItem>
          <DropdownMenuItem>
            <span>This is a very very very very large name</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuRadioGroup value="top">
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default DropdownExamples;
