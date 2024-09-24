import { Button } from '@/components/shadcn-ui/button';
import { sonner, Sonner } from '@/components/shadcn-ui/sonner';

function showWarning() {
  sonner.warning('Warning', {
    description: 'Please try again later.',
  });
}

function showCustomAction() {
  sonner.error('Error', {
    description: 'Please try again later.',
    action: <Button>Do something</Button>,
  });
}

function showActionAndCancel() {
  sonner.info('Info', {
    description: 'Please try again later.',
    action: { label: 'Action', onClick: () => alert('Hallo') },
    actionButtonStyle: { backgroundColor: 'hsl(var(--primary))' },
    cancel: { label: 'Cancel', onClick: () => {} },
    cancelButtonStyle: { backgroundColor: 'hsl(var(--secondary))' },
    closeButton: true,
  });
}

export default function SonnerExamples() {
  return (
    <>
      <p>Basic example that should be enhanced later...</p>
      <Button onClick={showWarning}>Show Warning</Button>
      <Button onClick={showCustomAction}>Show Custom Action</Button>
      <Button onClick={showActionAndCancel}>Show Action And Cancel</Button>
      <Sonner />
    </>
  );
}
