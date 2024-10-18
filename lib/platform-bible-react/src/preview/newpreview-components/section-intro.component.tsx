import { Button } from '@/components/shadcn-ui/button';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from './link.component';
import { SectionProps } from './section.component';
import UxApproval, { UsabilityChecks } from './ux-approval.component';
import ComponentPreview from './component-preview.component';

type IntroSectionProps = SectionProps & { usabilityChecks: UsabilityChecks } & {
  githubComponentUrlPart: string;
};

export default function IntroSection({
  id,
  header,
  description,
  content,
  usabilityChecks,
  githubComponentUrlPart,
}: IntroSectionProps) {
  return (
    <section id={id}>
      <div className="tw-mb-4 tw-flex tw-items-center tw-justify-between">
        <div className="tw-flex tw-items-center">
          <h1 className="tw-text-4xl tw-font-bold">{header}</h1>
          <Button size="icon" variant="link">
            <Link
              href={`https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/components/${githubComponentUrlPart}`}
              newTab
              text={<SquareArrowOutUpRight className="tw-h-5" />}
            />
          </Button>
        </div>
        <UxApproval usabilityChecks={usabilityChecks} componentName={header} />
      </div>
      <p className="tw-mb-6 tw-text-xl tw-text-muted-foreground">{description}</p>
      <ComponentPreview component={content} />
    </section>
  );
}
