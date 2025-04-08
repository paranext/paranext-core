import { MarkdownRenderer } from '@/components/advanced/extension-marketplace/markdown-renderer.component';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn-ui/alert';
import { AlertCircle, Terminal } from 'lucide-react';

export function ExampleAlerts() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <Alert>
        <Terminal className="tw-h-4 tw-w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add an svg icon, title, and description to your alert.
        </AlertDescription>
      </Alert>
      <Alert>
        <img
          className="tw-h-4 tw-w-4"
          src="https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"
          alt="Wifi icon"
        />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>You can alternatively use an img for your icon.</AlertDescription>
      </Alert>
      <Alert>
        <Terminal className="tw-h-4 tw-w-4" />
        <AlertDescription>
          You don&apos;t have to provide a title. Here is just an svg icon and a description.
        </AlertDescription>
      </Alert>
      <Alert>
        <img
          className="tw-h-4 tw-w-4"
          src="https://raw.githubusercontent.com/Iconscout/unicons/refs/heads/master/svg/line/wifi.svg"
          alt="Wifi icon"
        />
        <AlertDescription>Here is just an img icon and a description.</AlertDescription>
      </Alert>
      <Alert variant="destructive" className="tw-max-w-64">
        <AlertCircle className="tw-h-4 tw-w-4" />
        <AlertTitle>Settings are incomplete</AlertTitle>
        <AlertDescription>
          Results from the Capitalization check may be misleading because settings are incomplete
        </AlertDescription>
      </Alert>
      <Alert className="tw-max-w-64">
        <AlertDescription>
          Alert! With only AlertDescription, this looks like a Card 🤔
        </AlertDescription>
      </Alert>
      <Alert className="tw-max-w-64">
        Alert! With nothing else in it, this looks like a Card 🤔
      </Alert>
      <Alert>
        <img
          className="tw-h-4 tw-w-4"
          src="https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg"
          alt="Markdown icon"
        />
        <AlertTitle>
          <MarkdownRenderer
            anchorTarget="_blank"
            className="tw-mb-1 tw-max-w-none tw-font-medium tw-leading-none tw-tracking-tight"
            markdown="[Markdown Support](https://www.markdownguide.org/cheat-sheet/)"
          />
        </AlertTitle>
        <AlertDescription>
          <MarkdownRenderer
            anchorTarget="_blank"
            className="tw-max-w-none tw-text-sm"
            markdown={`You can put a **markdown editor** in the *title* and *description*!\n- To match the markdown title with the original title, add \`tw-max-w-none tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight\` to the \`MarkdownRenderer\` class.\n- To match the markdown description with the normal description, add \`tw-max-w-none tw-text-sm\` to the \`MarkdownRenderer\` class.`}
          />
        </AlertDescription>
      </Alert>
      <Alert>
        <img
          className="tw-h-4 tw-w-4"
          src="https://upload.wikimedia.org/wikipedia/commons/4/48/Markdown-mark.svg"
          alt="Markdown icon"
        />
        <AlertDescription>
          <MarkdownRenderer
            anchorTarget="_blank"
            className="tw-max-w-none tw-text-sm"
            markdown="You can also put a **markdown editor** in the *description* with an icon but without a title!"
          />
        </AlertDescription>
      </Alert>
      <Alert className="tw-max-w-64">
        <AlertDescription>
          <MarkdownRenderer
            anchorTarget="_blank"
            className="tw-max-w-none tw-text-sm"
            markdown="You can also put a **markdown editor** in the *description* without an icon or a title!"
          />
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default ExampleAlerts;
