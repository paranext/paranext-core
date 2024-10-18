import { cn } from '@/utils/shadcn-ui.util';
import { CheckCircle2, XCircle } from 'lucide-react';
import { ReactHTMLElement } from 'react';

type CodePreviewProps = {
  good: boolean;
  componentExample: ReactHTMLElement;
  text: string | ReactHTMLElement;
};

export default function UsagePattern({ good, componentExample, text }: CodePreviewProps) {
  return (
    <div
      className={cn(
        'tw-rounded-md tw-border tw-bg-background tw-p-4',
        good ? 'tw-border-green-500' : '',
      )}
    >
      <div className="tw-mb-2 tw-flex tw-items-center">
        {good ? (
          <CheckCircle2 className="tw-mr-2 tw-h-5 tw-w-5 tw-text-green-500" />
        ) : (
          <XCircle className="h-5 tw-mr-2 tw-w-5 tw-text-red-500" />
        )}
        <h3 className="tw-text-lg tw-font-medium">{good ? 'Good Usage' : 'Bad Usage'}</h3>
      </div>
      <div className="tw-flex tw-space-x-2">{componentExample}</div>
      <p className="tw-mt-2 tw-text-sm tw-text-muted-foreground">{text}</p>
    </div>
  );
}
