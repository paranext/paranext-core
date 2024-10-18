import { Button } from '@/components/shadcn-ui/button';
import CodePreview from '@/preview/newpreview-components/code-preview.component';
import DocsPage from '@/preview/newpreview-components/docs-page.component';
import Example from '@/preview/newpreview-components/example.component';
import { ComponentProperty } from '@/preview/newpreview-components/properties-table.component';
import { NavEntry } from '@/preview/newpreview-components/quicknav.component';
import ApiReferenceSection from '@/preview/newpreview-components/section-api-reference.component';
import IntroSection from '@/preview/newpreview-components/section-intro.component';
import Section, { SectionApi } from '@/preview/newpreview-components/section.component';
import { UsabilityChecks } from '@/preview/newpreview-components/ux-approval.component';
import { ChevronsDownUp } from 'lucide-react';

const uxApprovalList: UsabilityChecks = {
  rtl_ready: 'needed',
  font: 'done',
  spacing: 'done',
  themeable: 'done',
  accessible: 'needed',
  wording: 'not applicable',
};

const props: ComponentProperty[] = [
  { name: 'size', type: 'enum', default: 'default', values: 'default | icon | lg | sm' },
  {
    name: 'variant',
    type: 'enum',
    default: 'default',
    values: 'default | secondary | destructive | outline | ghost | link',
  },
  { name: 'onClick', type: 'function', default: '', values: '???' },
];

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

export default function ButtonDocs() {
  return (
    <DocsPage
      sections={sections}
      content={
        <>
          <IntroSection
            id="intro"
            header="Button"
            githubComponentUrlPart="shadcn-ui/button.tsx"
            description="TBD"
            content={<Button>Hello World</Button>}
            usabilityChecks={uxApprovalList}
          />

          <Section
            id="best-practices"
            header="Best Practices"
            description="Use this component for ... TBD"
            api={bestPracticesSectionApi}
          />

          <Section
            id="usage"
            header="Usage"
            description="To use the Button component, import it and pass the necessary props."
            content={
              <CodePreview
                code={`import { Button } from '@/components/shadcn-ui/button';"

export default function ButtonExample() {
  return (
    <Button>Hello World</Button>
  )
}`}
              />
            }
            api={usageSectionApi}
          />

          <ApiReferenceSection
            apiFunctionName="Button"
            properties={props}
            sectionApi={apiSectionApi}
          />

          <Section
            id="examples"
            header="Examples"
            content={
              <div className="tw-space-y-6">
                <Example
                  title="Variants"
                  code={`<Button variant="default">default</Button>
<Button variant="secondary">secondary</Button>
<Button variant="destructive">destructive</Button>
<Button variant="outline">outline</Button>
<Button variant="ghost">ghost</Button>
<Button variant="link">link</Button>`}
                  component={
                    <div className="tw-space-x-2">
                      <Button variant="default">default</Button>
                      <Button variant="secondary">secondary</Button>
                      <Button variant="destructive">destructive</Button>
                      <Button variant="outline">outline</Button>
                      <Button variant="ghost">ghost</Button>
                      <Button variant="link">link</Button>
                    </div>
                  }
                />

                <Example
                  title="Sizes"
                  code={`<Button size="default">default</Button>
<Button size="icon">icon</Button>
<Button size="sm">sm</Button>
<Button size="lg">lg</Button>
`}
                  component={
                    <div className="tw-space-x-2">
                      <Button size="default">default</Button>
                      <Button size="icon">icon</Button>
                      <Button size="sm">sm</Button>
                      <Button size="lg">lg</Button>
                    </div>
                  }
                />

                <Example
                  title="Icon buttons with onClick"
                  code={`<Button
  size="icon"
  variant="secondary"
  title="Collapse all sections"
  onClick={() => alert('Collapse all')}
>
  <ChevronsDownUp />
</Button>`}
                  component={
                    <Button
                      size="icon"
                      variant="secondary"
                      title="Collapse all sections"
                      onClick={() => alert('Collapse all')}
                    >
                      <ChevronsDownUp />
                    </Button>
                  }
                />

                <Example
                  title="Smaller icon button with tw-h-8 on the button and tw-h-4 on the icon"
                  code={`<Button
  size="icon"
  variant="secondary"
  title="Collapse all sections"
  className="tw-h-8"
>
  <ChevronsDownUp className="tw-h-4" />
</Button>`}
                  component={
                    <Button
                      size="icon"
                      variant="secondary"
                      title="Collapse all sections"
                      className="tw-h-8"
                    >
                      <ChevronsDownUp className="tw-h-4" />
                    </Button>
                  }
                />
              </div>
            }
            api={exampleSectionApi}
          />
        </>
      }
    />
  );
}
