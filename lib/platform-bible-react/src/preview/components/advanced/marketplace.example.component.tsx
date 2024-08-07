import Footer from '@/components/advanced-components/extension-marketplace/footer.component';
import NoExtensionsFound from '@/components/advanced-components/extension-marketplace/no-extensions-found.component';
import MoreInfo from '@/components/advanced-components/extension-marketplace/more-info.component';

export default function MarketplaceExamples() {
  return (
    <div className="pr-w-1/3 pr-space-y-4">
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
