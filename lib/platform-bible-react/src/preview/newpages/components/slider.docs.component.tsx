import MarkdownRenderer from '@/components/advanced/extension-marketplace/markdown-renderer.component';
import { Slider } from '@/components/shadcn-ui/slider';
import CodePreview from '@/preview/newpreview-components/code-preview.component';
import DocsPage from '@/preview/newpreview-components/docs-page';
import Example from '@/preview/newpreview-components/example';
import { ComponentProperty } from '@/preview/newpreview-components/properties-table.component';
import { NavEntry } from '@/preview/newpreview-components/quicknav.component';
import ApiReferenceSection from '@/preview/newpreview-components/section-api-reference.component';
import IntroSection from '@/preview/newpreview-components/section-intro.component';
import Section from '@/preview/newpreview-components/section.component';
import UsagePattern from '@/preview/newpreview-components/usage-pattern.component';
import { UsabilityChecks } from '@/preview/newpreview-components/ux-approval.component';

const uxApprovalList: UsabilityChecks = {
  rtl_ready: 'done',
  font: 'needed',
  spacing: 'needs rework',
  themeable: 'done',
  accessible: 'needed',
  wording: 'not applicable',
};

const props: ComponentProperty[] = [
  { name: 'defaultValue', type: 'number[]', default: '[]', values: '' },
  { name: 'max', type: 'number', default: '100', values: '' },
  { name: 'step', type: 'number', default: '1', values: '' },
];

const sections: NavEntry[] = [
  { id: 'intro', name: 'Intro' },
  { id: 'best-practices', name: 'Best Practices' },
  { id: 'usage', name: 'Usage' },
  { id: 'api', name: 'Api Reference' },
  { id: 'examples', name: 'Examples' },
];

const expandAllApi = {};

const markdown = `
# paranext-core

Extensible Bible translation software

<div align="center">
  <img src="./assets/icon.svg" width="256" alt="Platform icon" />
</div>

<div align="center">

[![Build Status][github-actions-status]][github-actions-url]
[![CodeQL][gitghub-codeql-status]][gitghub-codeql-url]
[![Github Tag][github-tag-image]][github-tag-url]

</div>

## Summary

Platform.Bible is extensible Bible translation software. Its functionality is provided almost completely by extensions in order to be very powerful and flexible, giving developers the freedom to create and to share their desired Bible translation experience.

This repository contains the core Platform.Bible software (Electron client, extension host including "PAPI", and .NET library) and the extensions that come bundled with it. There are many other repositories containing additional extensions.

## Users

This software is not yet ready for users. We'll update here with where you can install it when it is ready.

If you would still like to try it, you can [download early releases here on GitHub](https://github.com/paranext/paranext-core/releases).
`;

export default function SliderDocs() {
  return (
    <DocsPage
      sections={sections}
      content={
        <>
          <IntroSection
            id="intro"
            header="Slider"
            githubComponentUrlPart="shadcn-ui/slider.tsx"
            description="An input where the user selects a value from within a given range."
            content={<Slider defaultValue={[50]} max={100} step={1} />}
            usabilityChecks={uxApprovalList}
          />

          <Section
            id="best-practices"
            header="Best Practices"
            description="Use this component for ... TBD"
            content={
              <>
                <div className="tw-grid tw-grid-cols-2 tw-gap-4">
                  <UsagePattern
                    good
                    componentExample={<Slider defaultValue={[50]} max={100} step={1} />}
                    text="Use the Slider for selecting a single value within a range."
                  />
                  <UsagePattern
                    good={false}
                    componentExample={
                      <>
                        <Slider defaultValue={[25]} max={100} step={1} className="tw-w-1/3" />
                        <Slider defaultValue={[50]} max={100} step={1} className="tw-w-1/3" />
                        <Slider defaultValue={[75]} max={100} step={1} className="tw-w-1/3" />
                      </>
                    }
                    text="Don't use multiple Sliders for related values. Consider using a single range
                  Slider instead."
                  />
                </div>
                <br />
                <h3 className="tw-pb-2 tw-font-thin">Markdown</h3>
                <div className="tw-rounded-md tw-border tw-bg-background tw-p-4">
                  <MarkdownRenderer markdown={markdown} />
                </div>
              </>
            }
          />

          <Section
            id="usage"
            header="Usage"
            description="To use the Slider component, import it and pass the necessary props."
            content={
              <CodePreview
                code={`import { Slider } from "@/components/ui/slider"

export default function SliderExample() {
  return (
    <Slider defaultValue={[50]} max={100} step={1} />
  )
}`}
              />
            }
          />

          <ApiReferenceSection apiFunctionName="Slider" properties={props} />

          <Section
            id="examples"
            header="Examples"
            content={
              <div className="tw-space-y-6">
                <Example
                  title="Default"
                  code="<Slider defaultValue={[50]} max={100} step={1} />"
                  component={<Slider defaultValue={[50]} max={100} step={1} />}
                />

                <Example
                  title="Range"
                  code="<Slider defaultValue={[25, 75]} max={100} step={1} />"
                  component={<Slider defaultValue={[25, 75]} max={100} step={1} />}
                />
              </div>
            }
          />
        </>
      }
    />
  );
}
