import MarkdownRenderer from '@/components/advanced/extension-marketplace/markdown-renderer.component';
import DocsPage from '@/preview/newpreview-components/docs-page.component';
import { ComponentProperty } from '@/preview/newpreview-components/properties-table.component';
import { NavEntry } from '@/preview/newpreview-components/quicknav.component';
import ApiReferenceSection from '@/preview/newpreview-components/section-api-reference.component';
import IntroSection from '@/preview/newpreview-components/section-intro.component';
import Section, { SectionApi } from '@/preview/newpreview-components/section.component';
import { UsabilityChecks } from '@/preview/newpreview-components/ux-checks.component';
import { ReactHTMLElement } from 'react';
import CodePreview from './code-preview.component';

const bestPracticesSectionApi: SectionApi = { updateIsOpen: undefined };
const usageSectionApi: SectionApi = { updateIsOpen: undefined };
const apiSectionApi: SectionApi = { updateIsOpen: undefined };
const exampleSectionApi: SectionApi = { updateIsOpen: undefined };

const sections: NavEntry[] = [
  { id: 'intro', name: 'Intro' },
  { id: 'best-practices', name: 'Best Practices', api: bestPracticesSectionApi },
  { id: 'usage', name: 'Usage', api: usageSectionApi },
  { id: 'api', name: 'Api Reference', api: apiSectionApi },
  { id: 'examples', name: 'Examples', api: exampleSectionApi },
];

type DocsPageGeneratorProps = {
  componentName: string; // Button
  componentDescription: string; // TBD
  githubComponentUrlPart: string; // shadcn-ui/button.tsx
  componentRendering: ReactHTMLElement; // <Button>Hello World</Button>
  uxApprovalList: UsabilityChecks;
  usage: {
    description: string;
    code: string;
  };
  bestPractices: {
    description: string;
    usagePatterns?: ReactHTMLElement;
    mdContent?: string;
  };
  api: ComponentProperty[];
  examples: ReactHTMLElement;
};

export default function DocsPageGenerator({
  componentName,
  componentDescription,
  githubComponentUrlPart,
  componentRendering,
  uxApprovalList,
  usage,
  bestPractices,
  api,
  examples,
}: DocsPageGeneratorProps) {
  return (
    <DocsPage
      sections={sections}
      content={
        <>
          <IntroSection
            id="intro"
            header={componentName}
            githubComponentUrlPart={githubComponentUrlPart}
            description={componentDescription}
            content={componentRendering}
            usabilityChecks={uxApprovalList}
          />

          <Section
            id="best-practices"
            header="Best Practices"
            description={bestPractices.description}
            content={
              <>
                <div className="tw-grid tw-grid-cols-2 tw-gap-4">{bestPractices.usagePatterns}</div>
                {bestPractices.mdContent ? (
                  <>
                    <br />
                    <h3 className="tw-pb-2 tw-font-thin">Markdown</h3>
                    <div className="tw-rounded-md tw-border tw-bg-background tw-p-4">
                      <MarkdownRenderer markdown={bestPractices.mdContent} />
                    </div>
                  </>
                ) : (
                  ''
                )}
              </>
            }
            api={bestPracticesSectionApi}
          />

          <Section
            id="usage"
            header="Usage"
            description={usage.description}
            content={<CodePreview code={usage.code} />}
            api={usageSectionApi}
          />

          <ApiReferenceSection
            apiFunctionName="Button"
            properties={api}
            sectionApi={apiSectionApi}
          />

          <Section
            id="examples"
            header="Examples"
            content={<div className="tw-space-y-6">{examples}</div>}
            api={exampleSectionApi}
          />
        </>
      }
    />
  );
}
