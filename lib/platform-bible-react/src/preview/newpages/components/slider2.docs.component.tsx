import { Slider } from '@/components/shadcn-ui/slider';
import DocsPageGenerator from '@/preview/newpreview-components/docs-page-generator.component';
import Example from '@/preview/newpreview-components/example.component';
import { ComponentProperty } from '@/preview/newpreview-components/properties-table.component';
import UsagePattern from '@/preview/newpreview-components/usage-pattern.component';
import { UsabilityChecks } from '@/preview/newpreview-components/ux-checks.component';

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

const markdown = `
# paranext-core

Extensible Bible translation software

<div align="center">
  <img src="https://framerusercontent.com/images/23x48W6TDuiHiXHwharuxxrtglo.png" width="256" alt="Platform icon" />
</div>

## Summary

Platform.Bible is extensible Bible translation software. Its functionality is provided almost completely by extensions in order to be very powerful and flexible, giving developers the freedom to create and to share their desired Bible translation experience.

This repository contains the core Platform.Bible software (Electron client, extension host including "PAPI", and .NET library) and the extensions that come bundled with it. There are many other repositories containing additional extensions.

## Users

This software is not yet ready for users. We'll update here with where you can install it when it is ready.

If you would still like to try it, you can [download early releases here on GitHub](https://github.com/paranext/paranext-core/releases).
`;

export default function Slider2Docs() {
  return (
    <DocsPageGenerator
      componentDescription="An input where the user selects a value from within a given range."
      componentName="Slider"
      githubComponentUrlPart="shadcn-ui/slider.tsx"
      uxApprovalList={uxApprovalList}
      componentRendering={<Slider defaultValue={[50]} max={100} step={1} />}
      usage={{
        description: 'To use the Slider component, import it and pass the necessary props.',
        code: `import { Slider } from '@/components/shadcn-ui/slider';"

export default function SliderExample() {
  return (
    <Slider defaultValue={[50]} max={100} step={1} />
  )
}`,
      }}
      bestPractices={{
        description: 'Use this component for ... TBD',
        usagePatterns: (
          <>
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
          </>
        ),
        mdContent: markdown,
      }}
      api={props}
      examples={
        <>
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
        </>
      }
    />
  );
}
