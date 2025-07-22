import { Footer } from '@/components/advanced/extension-marketplace/footer.component';
import { MoreInfo } from '@/components/advanced/extension-marketplace/more-info.component';
import { useNavigate } from 'storybook/internal/router';

export function MarketplaceExamples() {
  const navigate = useNavigate();
  const sampleUrl = 'https://example.com';

  return (
    <div className="tw-w-1/2 tw-space-y-4">
      <MoreInfo
        category="Study Tools"
        downloads={{ x: 1000000000 }}
        languages={['es', 'en', 'fr', 'ur']}
        moreInfoUrl={sampleUrl}
        handleMoreInfoLinkClick={() => navigate(sampleUrl)}
        supportUrl={sampleUrl}
        handleSupportLinkClick={() => navigate(sampleUrl)}
      />
      <Footer
        publisherDisplayName="Publisher"
        fileSize={1200000000}
        locales={['es', 'en', 'fr', 'ur']}
        versionHistory={{
          '1.0': { date: '2021-01-01', description: 'Initial release' },
          '1.1': { date: '2021-03-15', description: 'Bug fixes and performance improvements' },
          '1.2': { date: '2021-06-10', description: 'Added new search features' },
          '1.3': { date: '2021-09-20', description: 'UI improvements and accessibility updates' },
          '2.0': { date: '2022-01-30', description: 'Major update with new study tools' },
          '2.1': { date: '2022-05-12', description: 'Enhanced translation support' },
          '2.2': { date: '2022-08-25', description: 'Added offline functionality' },
        }}
      />
    </div>
  );
}

export default MarketplaceExamples;
