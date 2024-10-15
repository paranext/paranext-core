import { Button } from '@/components/shadcn-ui/button';
import CodePreview from '@/preview/newpreview-components/code-preview.component';
import DocsPage from '@/preview/newpreview-components/docs-page';
import Example from '@/preview/newpreview-components/example';
import PropertiesTable, {
  ComponentProperty,
} from '@/preview/newpreview-components/properties-table.component';
import { NavEntry } from '@/preview/newpreview-components/quicknav.component';
import ApiReferenceSection from '@/preview/newpreview-components/section-api-reference.component';
import IntroSection from '@/preview/newpreview-components/section-intro.component';
import Section from '@/preview/newpreview-components/section.component';
import { UsabilityChecks } from '@/preview/newpreview-components/ux-approval.component';

const uxApprovalList: UsabilityChecks = {
  rtl_ready: 'needed',
  font: 'needed',
  spacing: 'needed',
  themeable: 'needed',
  accessible: 'needed',
  wording: 'needed',
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

const sections: NavEntry[] = [
  { id: 'intro', name: 'Intro' },
  { id: 'best-practices', name: 'Best Practices' },
  { id: 'usage', name: 'Usage' },
  { id: 'api', name: 'Api Reference' },
  { id: 'examples', name: 'Examples' },
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
            content={<Button>Hello</Button>}
            usabilityChecks={uxApprovalList}
          />

          <Section
            id="best-practices"
            header="Best Practices"
            description="Use this component for ... TBD"
          />

          <Section
            id="usage"
            header="Usage"
            description="To use the Button component, import it and pass the necessary props."
            content={<CodePreview code="import ..." />}
          />

          <ApiReferenceSection apiFunctionName="Button" properties={props} />

          <Section
            id="examples"
            header="Examples"
            content={
              <div className="pr-space-y-6">
                <Example
                  title="Variants"
                  code={`<Button variant="default">default</Button>
<Button variant="secondary">secondary</Button>
<Button variant="destructive">destructive</Button>
<Button variant="outline">outline</Button>
<Button variant="ghost">ghost</Button>
<Button variant="link">link</Button>`}
                  component={
                    <div className="pr-space-x-2">
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
<Button size="lg">lg</Button>
<Button size="sm">sm</Button>`}
                  component={
                    <div className="pr-space-x-2">
                      <Button size="default">default</Button>
                      <Button size="icon">icon</Button>
                      <Button size="lg">lg</Button>
                      <Button size="sm">sm</Button>
                    </div>
                  }
                />
              </div>
            }
          />
        </>
      }
    />
  );
}
