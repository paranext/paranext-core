import { Button } from '@/components/shadcn-ui/button';
import { Mail } from 'lucide-react';
import DiscordLogo from '../preview-components/discord-logo.component';

export default function UxButtons() {
  return (
    <>
      <Button variant="ghost" size="icon" title="Discord">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://discord.com/channels/1064938364597436416/1082713526780575845"
        >
          <DiscordLogo className="tw-text-primary" />
        </a>
      </Button>

      <Button variant="ghost" size="icon" title="email">
        <a href="mailto:feedback@paratext.org">
          <Mail className="tw-text-primary" />
        </a>
      </Button>
    </>
  );
}
