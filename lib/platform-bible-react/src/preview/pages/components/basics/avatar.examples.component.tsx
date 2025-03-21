import { Avatar, AvatarFallback, AvatarImage } from '@/components/shadcn-ui/avatar';

export function AvatarExample() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}

export default AvatarExample;
