import { Button } from '@/components/shadcn-ui/button';
import { Mail } from 'lucide-react';
import DiscordLogo from '../preview-components/discord-logo.component';

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

      <Button variant="ghost" size="icon" title="Discord">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://discord.com/channels/1064938364597436416/1082713526780575845"
        >
          <DiscordLogo />
        </a>
      </Button>

      <Button variant="ghost" size="icon" title="email">
        <a href="mailto:feedback@paratext.org">
          <Mail />
        </a>
      </Button>
    </>
  );
}
