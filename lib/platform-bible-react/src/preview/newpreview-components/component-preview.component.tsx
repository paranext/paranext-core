import { ReactHTMLElement } from 'react';

type ComponentPreviewProps = { component: ReactHTMLElement };

export default function ComponentPreview({ component }: ComponentPreviewProps) {
  return <div className="pr-rounded-md pr-border pr-bg-background pr-p-4">{component}</div>;
}
