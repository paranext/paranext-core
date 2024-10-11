import { Button } from '@/components/shadcn-ui/button';
import UxButtons from './ux-buttons';

export default function ContactButtons2() {
  return (
    <>
      <Button variant="ghost" title="Github">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/paranext/paranext-core/tree/main/lib/platform-bible-react#readme"
        >
          Github
        </a>
      </Button>

      <UxButtons />
    </>
  );
}
