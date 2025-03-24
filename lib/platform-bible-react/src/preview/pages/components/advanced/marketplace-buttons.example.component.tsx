import { InstallButton } from '@/components/advanced/extension-marketplace/buttons/install-button.component';
import { DisableButton } from '@/components/advanced/extension-marketplace/buttons/disable-button.component';
import { UpdateButton } from '@/components/advanced/extension-marketplace/buttons/update-button.component';
import { EnableButton } from '@/components/advanced/extension-marketplace/buttons/enable-button.component';
import {
  DropdownMenuItemType,
  FilterDropdown,
} from '@/components/advanced/extension-marketplace/filter-dropdown.component';

export function MarketplaceButtonExamples() {
  const publisherFilterItems = ['All', 'Verified', 'Experimental'];

  const filterGroup = {
    label: 'Publishers',
    items: [
      ...publisherFilterItems.map((items) => ({
        label: items,
        itemType: DropdownMenuItemType.Check,
        onClick: () => {},
      })),
    ],
  };

  const sortGroup = {
    label: 'Sort by',
    items: [
      {
        label: 'Release Date (Newest First)',
        itemType: DropdownMenuItemType.Radio,
        onClick: () => {},
      },
      { label: 'Name A-Z', itemType: DropdownMenuItemType.Radio, onClick: () => {} },
    ],
  };
  return (
    <div>
      <p>
        Note: These buttons are currently styled with fixed colors and are therefore not theme-able
      </p>
      <br />
      FilterButton Button:
      <div className="tw-flex tw-gap-x-2">
        <FilterDropdown groups={[filterGroup, sortGroup]} />
      </div>
      InstallButton Button:
      <div className="tw-flex tw-gap-x-2">
        <InstallButton isInstalling={false} handleClick={() => {}} buttonText="Get" />
        <InstallButton isInstalling handleClick={() => {}} buttonText="Get" />
        <InstallButton isInstalling={false} handleClick={() => {}} />
        <InstallButton isInstalling handleClick={() => {}} />
      </div>
      DisableButton Button:
      <div className="tw-flex tw-gap-x-2">
        <DisableButton isDisabling={false} handleClick={() => {}} />
        <DisableButton isDisabling handleClick={() => {}} />
      </div>
      EnableButton Button:
      <div className="tw-flex tw-gap-x-2">
        <EnableButton isEnabling={false} handleClick={() => {}} />
        <EnableButton isEnabling handleClick={() => {}} />
      </div>
      UpdateButton Button:
      <div className="tw-flex tw-gap-x-2">
        <UpdateButton isUpdating={false} handleClick={() => {}} />
        <UpdateButton isUpdating handleClick={() => {}} />
      </div>
    </div>
  );
}

export default MarketplaceButtonExamples;
