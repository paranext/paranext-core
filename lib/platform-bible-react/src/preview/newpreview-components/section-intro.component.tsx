import { SectionProps } from './section.component';
import UxApproval, { UxApprovalProps } from './ux-approval.component';

export default function IntroSection({
  id,
  header,
  description,
  content,
  approvalList,
}: SectionProps & UxApprovalProps) {
  return (
    <section id={id}>
      <div className="pr-mb-4 pr-flex pr-items-center pr-justify-between">
        <h1 className="pr-text-4xl pr-font-bold">{header}</h1>

        <UxApproval approvalList={approvalList} />
      </div>
      <p className="pr-mb-6 pr-text-xl pr-text-muted-foreground">{description}</p>
      {content}
    </section>
  );
}
