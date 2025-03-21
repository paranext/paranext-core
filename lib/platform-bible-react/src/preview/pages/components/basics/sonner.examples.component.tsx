import { Button } from '@/components/shadcn-ui/button';
import { Sonner, sonner } from '@/components/shadcn-ui/sonner';

export function SonnerExamples() {
  return (
    <div className="*:tw-m-4">
      <Button
        onClick={() => sonner('This is a normal message', { description: 'This is a description' })}
      >
        Show normal message
      </Button>
      <Button onClick={() => sonner.warning('This is a warning!')}>Show warning</Button>
      <Button onClick={() => sonner.error('This is an error')}>Show error</Button>
      <Sonner />
    </div>
  );
}

export default SonnerExamples;
