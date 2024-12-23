import {
  Button,
  Checklist,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'platform-bible-react';
import { ChecksSetUpProps } from 'platform-scripture';
import { ReactNode } from 'react';

// TODO: Need to create a way to determine if a check's inventory still needs to be set up so we
// can only put set up links by the checks that actually need Set up. Also need a way to navigate
// to those inventories when the link is clicked.

// TODO: Need to pass the checks that should display results to the checks side panel so it knows
// which results need to be displayed.

// TODO: Change link to a button styled to look like a link and have button onClick function open
// the appropriate check settings to configure. Also get it to look right aligned.

// TODO: Implement select all and deselect all functionality.

// TODO: Localize relevant strings

function createLabel(item: string): ReactNode {
  return (
    <div className="checks-set-up-checklist-items">
      <span className="checks-set-up-check-names">{item}</span>
      <span className="checks-set-up-links">
        <a href="www.google.com">Set Up</a>
      </span>
    </div>
  );
}

/**
 * Renders a dropdown with a list of checks that can be selected. Also displays set up links next to
 * checks that still have configuration that hasn't been set up yet.
 */
export default function ChecksSetUp({
  availableChecks,
  id,
  handleSelectCheck,
  selectedChecks,
}: ChecksSetUpProps) {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            id={id}
            type="button"
            data-dropdown-toggle="dropdown"
            className="checks-set-up-dropdown-button"
          >
            Checks ({availableChecks.length} selected)
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="checks-set-up-check-type">Check Type</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="checks-set-up-dropdown-menu-group">
            <Checklist
              id="checksCheckList"
              listItems={availableChecks.map((check) => check.checkDescription)}
              selectedListItems={selectedChecks}
              handleSelectListItem={handleSelectCheck}
              createComplexLabel={createLabel}
            />
          </DropdownMenuGroup>
          <div className="checks-set-up-deselect-all">Deselect all</div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
