import { PropsWithChildren, JSX } from 'react';
import { Separator } from '@/components/shadcn-ui/separator';

/** Props for the SettingsList component, currently just children */
type SettingsListProps = PropsWithChildren;

/**
 * SettingsList component is a wrapper for list items. Rendered with a formatted div
 *
 * @param children To populate the list with
 * @returns Formatted div encompassing the children
 */
export function SettingsList({ children }: SettingsListProps) {
  return <div className="pr-twp pr-grid">{children}</div>;
}

/** Props for SettingsListItem component */
type SettingsListItemProps = {
  /** Primary text of the list item */
  primary: string;

  /** Optional text of the list item */
  secondary?: string | undefined;

  /** Handler for the caller to generate the action component for the list item */
  generateActionComponent: () => JSX.Element;

  /**
   * Optional boolean to display a message if the action component isn't generated yet. Defaults to
   * false
   */
  isLoading?: boolean;

  /** Optional message to display if isLoading */
  loadingMessage?: string;
};

/**
 * SettingsListItem component is a common list item. Rendered with a formatted div
 *
 * @param primary Primary text of the list item
 * @param secondary Optional secondary text of the list item
 * @param generateActionComponent Handler for the caller to generate the action component for the
 *   list item
 * @param isLoading Optional, to display a message if the action component isn't generated yet,
 *   defaults to false
 * @param loadingMessage Optional, message to display if isLoading
 * @returns Formatted div encompassing the list item content
 */
export function SettingsListItem({
  primary,
  secondary,
  generateActionComponent,
  isLoading = false,
  loadingMessage,
}: SettingsListItemProps) {
  return (
    <div className="pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2">
      <div>
        <p className="pr-text-sm pr-font-medium pr-leading-none">{primary}</p>
        <p className="pr-text-sm pr-text-muted-foreground">{secondary}</p>
      </div>

      {isLoading ? (
        <p className="pr-text-sm pr-text-muted-foreground">{loadingMessage}</p>
      ) : (
        generateActionComponent()
      )}
    </div>
  );
}

/** Props for SettingsListHeader component */
type SettingsListHeaderProps = {
  /** The primary text of the list header */
  primary: string;

  /** Optional secondary text of the list header */
  secondary?: string | undefined;

  /** Optional boolean to include a separator underneath the secondary text. Defaults to false */
  includeSeparator?: boolean;
};

/**
 * SettingsListHeader component displays text above the list
 *
 * @param primary The primary text of the list header
 * @param secondary Optional secondary text of the list header
 * @param includeSeparator Optional boolean to include a separator underneath the secondary text.
 *   Defaults to false
 * @returns Formatted div with list header content
 */
export function SettingsListHeader({
  primary,
  secondary,
  includeSeparator = false,
}: SettingsListHeaderProps) {
  return (
    <div className="pr-space-y-4 pr-py-2">
      <div>
        <h3 className="pr-text-lg pr-font-medium">{primary}</h3>
        <p className="pr-text-sm pr-text-muted-foreground">{secondary}</p>
      </div>
      {includeSeparator ? <Separator /> : ''}
    </div>
  );
}
