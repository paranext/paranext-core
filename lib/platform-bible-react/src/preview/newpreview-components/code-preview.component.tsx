import { Button } from '@/components/shadcn-ui/button';
import { Sonner, sonner } from '@/components/shadcn-ui/sonner';
import { Check, Copy } from 'lucide-react';

type CodePreviewProps = { code: string };

function copyToClipboard(code: string) {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      return sonner('Code copied', { icon: <Check /> });
    })
    .catch((error) => {
      sonner.error(`Could not copy code. Error: ${error}`, {
        classNames: { toast: 'tw-text-destructive' },
      });
    });
}

export default function CodePreview({ code }: CodePreviewProps) {
  return (
    <>
      <div className="tw-relative tw-rounded-md tw-bg-muted tw-p-4 tw-text-sm">
        {/* Alternative in markdown style: <div className="tw-prose tw-relative"> */}
        <pre>
          <code>{code}</code>
        </pre>
        <Button
          variant="link"
          size="icon"
          className="tw-absolute tw-right-1 tw-top-1 tw-h-8 hover:tw-bg-background"
          title="Copy code"
          onClick={() => copyToClipboard(code)}
        >
          <Copy className="tw-h-4" />
        </Button>
      </div>
      <Sonner />
    </>
  );
}
