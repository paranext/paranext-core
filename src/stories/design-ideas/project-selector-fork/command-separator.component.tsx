/*
 * Design-ideas fork: a stand-in for `CommandSeparator` from
 * lib/platform-bible-react/src/components/shadcn-ui/command.tsx, which `platform-bible-react` does
 * not export. Every separator in the forked selector is rendered with cmdk's `alwaysRender`, so a
 * plain separator element with the same classes is equivalent and avoids depending on `cmdk`
 * directly.
 */
import { cn } from 'platform-bible-react';

export function CommandSeparator({
  className,
  'data-testid': testId,
}: {
  className?: string;
  'data-testid'?: string;
}) {
  return (
    <div
      role="separator"
      data-slot="command-separator"
      className={cn('tw:-mx-1 tw:h-px tw:bg-border', className)}
      data-testid={testId}
    />
  );
}
