import InstallButton from '@/components/extension-marketplace/buttons/install-button.component';
import DisableButton from '@/components/extension-marketplace/buttons/disable-button.component';
import UpdateButton from '@/components/extension-marketplace/buttons/update-button.component';
import EnableButton from '@/components/extension-marketplace/buttons/enable-button.component';

export default function MarketplaceButtonExamples() {
  return (
    <>
      <p>
        Note: These buttons are currently styled with fixed colors and are therefore not themeable
      </p>
      <br />
      InstallButton Button:
      <div className="pr-space-x-2">
        <InstallButton isInstalling={false} handleClick={() => {}} buttonText="Get" />
        <InstallButton isInstalling handleClick={() => {}} buttonText="Get" />
        <InstallButton isInstalling={false} handleClick={() => {}} />
        <InstallButton isInstalling handleClick={() => {}} />
      </div>
      DisableButton Button:
      <div className="pr-space-x-2">
        <DisableButton isDisabling={false} handleClick={() => {}} />
        <DisableButton isDisabling handleClick={() => {}} />
      </div>
      EnableButton Button:
      <div className="pr-space-x-2">
        <EnableButton isEnabling={false} handleClick={() => {}} />
        <EnableButton isEnabling handleClick={() => {}} />
      </div>
      UpdateButton Button:
      <div className="pr-space-x-2">
        <UpdateButton isUpdating={false} handleClick={() => {}} />
        <UpdateButton isUpdating handleClick={() => {}} />
      </div>
    </>
  );
}
