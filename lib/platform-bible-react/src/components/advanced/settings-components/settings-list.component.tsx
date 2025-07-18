import { PropsWithChildren } from 'react';
import { Separator } from '@/components/shadcn-ui/separator';

/** Props for the SettingsList component, currently just children */
type SettingsListProps = PropsWithChildren;

/**
 * SettingsList component is a wrapper for list items. Rendered with a formatted div
 *
 * @deprecated Jul 18 2025. This component is no longer supported or tested. Use of this component
 *   is discouraged and it may be removed in the future.
 * @param children To populate the list with
 * @returns Formatted div encompassing the children
 */
export function SettingsList({ children }: SettingsListProps) {
  return <div className="pr-twp tw-grid">{children}</div>;
}

/** Props for SettingsListItem component */
type SettingsListItemProps = PropsWithChildren & {
  /** Primary text of the list item */
  primary: string;

  /** Optional text of the list item */
  secondary?: string | undefined;

  /** Optional boolean to display a message if the children aren't loaded yet. Defaults to false */
  isLoading?: boolean;

  /** Optional message to display if isLoading */
  loadingMessage?: string;
};

/**
 * SettingsListItem component is a common list item. Rendered with a formatted div
 *
 * @deprecated Jul 18 2025. This component is no longer supported or tested. Use of this component
 *   is discouraged and it may be removed in the future.
 * @param SettingsListItemProps
 * @returns Formatted div encompassing the list item content
 */
export function SettingsListItem({
  primary,
  secondary,
  children,
  isLoading = false,
  loadingMessage,
}: SettingsListItemProps) {
  return (
    <div className="tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2">
      <div>
        <p className="tw-text-sm tw-font-medium tw-leading-none">{primary}</p>
        <p className="tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground">
          {secondary}
        </p>
      </div>

      {isLoading ? (
        <p className="tw-text-sm tw-text-muted-foreground">{loadingMessage}</p>
      ) : (
        <div>{children}</div>
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
 * @deprecated Jul 18 2025. This component is no longer supported or tested. Use of this component
 *   is discouraged and it may be removed in the future.
 * @param SettingsListHeaderProps
 * @returns Formatted div with list header content
 */
export function SettingsListHeader({
  primary,
  secondary,
  includeSeparator = false,
}: SettingsListHeaderProps) {
  return (
    <div className="tw-space-y-4 tw-py-2">
      <div>
        <h3 className="tw-text-lg tw-font-medium">{primary}</h3>
        <p className="tw-text-sm tw-text-muted-foreground">{secondary}</p>
      </div>
      {includeSeparator ? <Separator /> : ''}
    </div>
  );
}
