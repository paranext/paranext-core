import { Button } from '@/components/shadcn-ui/button';
import { Mail } from 'lucide-react';
import DiscordLogo from './discord-logo.component';

export default function ContactButtons() {
  return (
    <>
      <span className="pr-leading-9">Get in contact with the UX Team</span>

      <Button variant="outline" size="icon" title="Discord">
        <a
          target="_blank"
          rel="noreferrer"
          href="https://discord.com/channels/1064938364597436416/1082713526780575845"
        >
          <DiscordLogo />
        </a>
      </Button>

      <Button variant="outline" size="icon" title="email">
        <a href="mailto:feedback@paratext.org">
          <Mail />
        </a>
      </Button>
    </>
  );
}
