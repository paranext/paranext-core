import { ReactHTMLElement } from 'react';

type ComponentPreviewProps = { component: ReactHTMLElement };

export default function ComponentPreview({ component }: ComponentPreviewProps) {
  return (
    <div className="tw-rounded-md tw-border tw-bg-background tw-px-4 tw-py-6">{component}</div>
  );
}
