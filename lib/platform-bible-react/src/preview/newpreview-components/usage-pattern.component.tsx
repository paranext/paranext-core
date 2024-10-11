import { CheckCircle2, XCircle } from 'lucide-react';
import { ReactHTMLElement } from 'react';

type CodePreviewProps = { good: boolean; componentExample: ReactHTMLElement; text: string };

export default function UsagePattern({ good, componentExample, text }: CodePreviewProps) {
  return (
    <div className="pr-rounded-md pr-border pr-bg-background pr-p-4">
      <div className="pr-mb-2 pr-flex pr-items-center">
        {good ? (
          <CheckCircle2 className="pr-mr-2 pr-h-5 pr-w-5 pr-text-green-500" />
        ) : (
          <XCircle className="h-5 pr-mr-2 pr-w-5 pr-text-red-500" />
        )}
        <h3 className="pr-text-lg pr-font-medium">{good ? 'Good Usage' : 'Bad Usage'}</h3>
      </div>
      <div className="pr-flex pr-space-x-2">{componentExample}</div>
      <p className="pr-mt-2 pr-text-sm pr-text-muted-foreground">{text}</p>
    </div>
  );
}
