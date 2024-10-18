import { PropsWithChildren } from 'react';

export default function Code(props: PropsWithChildren) {
  const { children } = props;
  return (
    <span className="tw-prose">
      <code>{children}</code>
    </span>
  );
}
