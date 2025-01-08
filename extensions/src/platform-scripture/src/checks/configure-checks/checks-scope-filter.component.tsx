import { Label, Popover, RadioGroup, RadioGroupItem, Separator } from 'platform-bible-react';
import { useCallback, useState } from 'react';

enum CheckScopes {
  /** Section of project text that I can currently see */
  VisibleText = 'VisibleText',
  Chapter = 'Chapter',
  Book = 'Book',
  All = 'All',
}

type ChecksScopeFilterProps = {
  /** Callback function to handle the selection of a scope. */
  handleSelectScope: (scope: CheckScopes) => void;
};

export default function ChecksScopeFilter({ handleSelectScope }: ChecksScopeFilterProps) {
  const [selectedScope, setSelectedScope] = useState<CheckScopes>(CheckScopes.Chapter);

  const onScopeChange = useCallback(
    (newScope: CheckScopes) => {
      setSelectedScope(newScope);
      handleSelectScope(newScope);
    },
    [handleSelectScope],
  );

  return (
    <Popover>
      <Label>Scope</Label>
      <Separator />
      <RadioGroup value={selectedScope} onValueChange={onScopeChange}>
        <div>
          <RadioGroupItem value={CheckScopes.Book} id={CheckScopes.Book} />
          <Label htmlFor={CheckScopes.Book}>{CheckScopes.Book}</Label>
        </div>
        <div>
          <RadioGroupItem value={CheckScopes.Chapter} id={CheckScopes.Chapter} />
          <Label htmlFor={CheckScopes.Chapter}>{CheckScopes.Chapter}</Label>
        </div>
        <div>
          <RadioGroupItem value={CheckScopes.All} id={CheckScopes.All} />
          <Label htmlFor={CheckScopes.All}>{CheckScopes.All}</Label>
        </div>
      </RadioGroup>
    </Popover>
  );
}
