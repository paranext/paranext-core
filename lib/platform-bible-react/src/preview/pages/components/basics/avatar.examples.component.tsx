import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn-ui/avatar';

export default function AvatarExample() {
  return (
    <div className="tw-flex tw-flex-col tw-gap-2">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}
