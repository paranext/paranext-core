import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Lightbulb, ChevronDown } from 'lucide-react';
import { cn } from '@/utils/shadcn-ui/utils';

type Variant = 'do' | 'dont' | 'neutral';

type ExampleBlockProps = {
  variant?: Variant;
  /** Overrides the default label ("Best Practice" / "Anti-pattern" / "Tip") */
  title?: string;
  /** Body content of the block — typically a sentence or two explaining what the example illustrates */
  children?: React.ReactNode;
  /** Live component rendered in a framed preview area above the code */
  preview?: React.ReactNode;
  /** Extra classes for the preview container (e.g. extra padding for floating tooltips) */
  previewClassName?: string;
  /**
   * Source code string. Single-line strings display inline; multiline strings collapse to one line
   * and expand on click.
   */
  code?: string;
  className?: string;
};

const variantConfig = {
  do: {
    Icon: ThumbsUp,
    label: 'Best Practice',
    accentClass: 'tw:bg-teal-500',
    bgClass: 'tw:bg-teal-500/5',
    textClass: 'tw:text-teal-600 tw:dark:text-teal-400',
    iconBgClass: 'tw:bg-teal-500/15',
  },
  dont: {
    Icon: ThumbsDown,
    label: 'Anti-pattern',
    accentClass: 'tw:bg-rose-500',
    bgClass: 'tw:bg-rose-500/5',
    textClass: 'tw:text-rose-600 tw:dark:text-rose-400',
    iconBgClass: 'tw:bg-rose-500/15',
  },
  neutral: {
    Icon: Lightbulb,
    label: 'Tip',
    accentClass: 'tw:bg-sky-500',
    bgClass: 'tw:bg-sky-500/5',
    textClass: 'tw:text-sky-600 tw:dark:text-sky-400',
    iconBgClass: 'tw:bg-sky-500/15',
  },
};

/**
 * Color-coded documentation block for Do / Don't / Tip examples in Storybook.
 *
 * - `variant="do"` — teal, thumbs-up, "Best Practice"
 * - `variant="dont"` — rose, thumbs-down, "Anti-pattern"
 * - `variant="neutral"` (default) — sky, lightbulb, "Tip"
 *
 * Pass a live component to `preview` to render it in a framed stage. Pass source code to `code` —
 * single-line displays inline, multiline collapses and expands on click. The preview and code share
 * one container with no visual gap between them. Wrap two blocks in `<ExampleBlockGroup>` for a
 * responsive side-by-side layout.
 */
export function ExampleBlock({
  variant = 'neutral',
  title,
  children,
  preview,
  previewClassName,
  code,
  className,
}: ExampleBlockProps) {
  const { Icon, label, accentClass, bgClass, textClass, iconBgClass } = variantConfig[variant];

  const [isCodeOpen, setIsCodeOpen] = useState(false);

  const isMultiline = code ? code.includes('\n') : false;
  const collapsedCode = code ? code.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim() : '';

  return (
    <div
      className={cn(
        'sb-unstyled pr-twp tw:relative tw:rounded-lg tw:p-4 tw:pl-5',
        bgClass,
        className,
      )}
    >
      <div
        className={cn(
          'tw:absolute tw:bottom-0 tw:left-0 tw:top-0 tw:w-1 tw:rounded-l-lg',
          accentClass,
        )}
      />
      <div className="tw:flex tw:items-start tw:gap-3">
        <div
          className={cn(
            'tw:flex tw:h-8 tw:w-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg',
            iconBgClass,
          )}
        >
          <Icon className={cn('tw:h-4 tw:w-4', textClass)} />
        </div>
        <div className="tw:min-w-0 tw:flex-1 tw:pt-1">
          <p
            className={cn(
              'tw:m-0 tw:mb-2 tw:text-xs tw:font-bold tw:uppercase tw:tracking-widest',
              textClass,
            )}
          >
            {title ?? label}
          </p>

          {(preview !== undefined || code !== undefined) && (
            <div className="tw:mb-3 tw:overflow-hidden tw:rounded-md tw:border tw:border-border/50 tw:bg-background/50">
              {preview !== undefined && (
                <div
                  className={cn(
                    'tw:flex tw:items-center tw:justify-center tw:p-4',
                    previewClassName,
                  )}
                >
                  {preview}
                </div>
              )}

              {code !== undefined &&
                (isMultiline ? (
                  <button
                    type="button"
                    onClick={() => setIsCodeOpen((o) => !o)}
                    className={cn(
                      'tw:flex tw:w-full tw:cursor-pointer tw:items-center tw:gap-2 tw:overflow-hidden tw:text-left',
                      preview !== undefined && 'tw:border-t tw:border-border/50',
                    )}
                  >
                    {isCodeOpen ? (
                      <pre className="tw:m-0 tw:flex-1 tw:overflow-x-auto tw:px-3 tw:py-2 tw:font-mono tw:text-xs tw:text-foreground/50">
                        <code>{code}</code>
                      </pre>
                    ) : (
                      <pre className="tw:m-0 tw:flex-1 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:px-3 tw:py-2 tw:font-mono tw:text-xs tw:text-foreground/50">
                        <code>{collapsedCode}</code>
                      </pre>
                    )}
                    <ChevronDown
                      className={cn(
                        'tw:mr-3 tw:h-3 tw:w-3 tw:shrink-0 tw:text-foreground/30 tw:transition-transform',
                        isCodeOpen && 'tw:rotate-180',
                      )}
                    />
                  </button>
                ) : (
                  <pre
                    className={cn(
                      'tw:m-0 tw:overflow-x-auto tw:px-3 tw:py-2 tw:font-mono tw:text-xs tw:text-foreground/50',
                      preview !== undefined && 'tw:border-t tw:border-border/50',
                    )}
                  >
                    <code>{code}</code>
                  </pre>
                ))}
            </div>
          )}

          {children !== undefined && (
            <div className="tw:text-sm tw:text-foreground/70">{children}</div>
          )}
        </div>
      </div>
    </div>
  );
}

type ExampleBlockGroupProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Lays out two `ExampleBlock`s side by side on medium+ screens, stacked on mobile. Typically used
 * to show a Do and Don't example together.
 */
export function ExampleBlockGroup({ children, className }: ExampleBlockGroupProps) {
  return (
    <div className={cn('pr-twp tw:my-4 tw:grid tw:gap-4 tw:md:grid-cols-2', className)}>
      {children}
    </div>
  );
}
