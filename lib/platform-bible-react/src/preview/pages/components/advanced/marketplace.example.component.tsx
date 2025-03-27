import { Footer } from '@/components/advanced/extension-marketplace/footer.component';
import { NoExtensionsFound } from '@/components/advanced/extension-marketplace/no-extensions-found.component';
import { MoreInfo } from '@/components/advanced/extension-marketplace/more-info.component';

export function MarketplaceExamples() {
  return (
    <div className="tw-w-1/3 tw-space-y-4">
      <MoreInfo
        category="Study Tools"
        downloads={{ x: 1000000000 }}
        languages={['es', 'en', 'fr', 'ur']}
        moreInfoUrl="https://example.com"
      />
      <Footer
        publisherDisplayName="Publisher"
        fileSize={1200000000}
        locales={['es', 'en', 'fr', 'ur']}
        versionHistory={{ '1.0': { date: '2021-01-01', description: 'Initial release' } }}
      />
      <NoExtensionsFound message="No extensions found" />
    </div>
  );
}

export default MarketplaceExamples;
