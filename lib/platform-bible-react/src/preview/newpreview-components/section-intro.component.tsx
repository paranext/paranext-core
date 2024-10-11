import { Button } from '@/components/shadcn-ui/button';
import { SquareArrowOutUpRight } from 'lucide-react';
import Link from './link';
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
      <div className="pr-mb-4 pr-flex pr-items-center pr-justify-between">
        <div className="pr-flex pr-items-center">
          <h1 className="pr-text-4xl pr-font-bold">{header}</h1>
          <Button size="icon" variant="link">
            <Link
              href={`https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/components/${githubComponentUrlPart}`}
              newTab
              text={<SquareArrowOutUpRight className="pr-h-5" />}
            />
          </Button>
        </div>
        <UxApproval usabilityChecks={usabilityChecks} componentName={header} />
      </div>
      <p className="pr-mb-6 pr-text-xl pr-text-muted-foreground">{description}</p>
      <ComponentPreview component={content} />
    </section>
  );
}
