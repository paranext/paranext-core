import DownloadButton from '@/components/advanced-components/extension-marketplace/buttons/download-button.component';
import RemoveButton from '@/components/advanced-components/extension-marketplace/buttons/remove-button.component';
import UpdateButton from '@/components/advanced-components/extension-marketplace/buttons/update-button.component';

export default function MarketplaceButtonExamples() {
  return (
    <>
      <p>
        Note: These buttons are currently styled with fixed colors and are therefore not themeable
      </p>
      <br />
      Download Button:
      <div className="pr-space-x-2">
        <DownloadButton isDownloading={false} handleClick={() => {}} buttonText="Get" />
        <DownloadButton isDownloading handleClick={() => {}} buttonText="Get" />
        <DownloadButton isDownloading={false} handleClick={() => {}} />
        <DownloadButton isDownloading handleClick={() => {}} />
      </div>
      RemoveButton Button:
      <div className="pr-space-x-2">
        <RemoveButton isRemoving={false} handleClick={() => {}} />
        <RemoveButton isRemoving handleClick={() => {}} />
      </div>
      UpdateButton Button:
      <div className="pr-space-x-2">
        <UpdateButton isUpdating={false} handleClick={() => {}} />
        <UpdateButton isUpdating handleClick={() => {}} />
      </div>
    </>
  );
}
