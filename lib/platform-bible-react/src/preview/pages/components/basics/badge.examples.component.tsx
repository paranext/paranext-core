import { Badge } from '@/components/shadcn-ui/badge';
import { X } from 'lucide-react';

export function BadgeExamples() {
  return (
    <div className="tw-flex tw-flex-col tw-items-start tw-gap-2">
      <Badge variant="default">default</Badge>
      <Badge
        className="tw-cursor-pointer"
        onClick={() => alert('Hello World')}
        variant="destructive"
      >
        destructive <X className="tw-h-3 tw-w-3" />
      </Badge>
      <Badge variant="outline">outline</Badge>
      <Badge variant="secondary">secondary</Badge>
    </div>
  );
}

export default BadgeExamples;
