import MarkdownRenderer from '@/components/advanced/extension-marketplace/markdown-renderer.component';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/shadcn-ui/card';
import { memo, ReactNode, useMemo } from 'react';

export const CanvasWithDescription = memo(function CanvasWithDescription({
  viewMode,
  description,
  children,
}: {
  viewMode?: string;
  description?: string;
  children: ReactNode;
}) {
  const isCanvas = viewMode === 'story';
  const descriptionNode = useMemo(() => {
    // React component must return null to render nothing.
    // eslint-disable-next-line no-null/no-null
    if (!isCanvas || typeof description !== 'string' || !description.trim()) return null;
    return (
      <Card className="tw-w-full">
        <CardHeader className="tw-pb-2">
          <CardTitle className="tw-text-sm tw-font-medium tw-text-muted-foreground">
            Story Description
          </CardTitle>
        </CardHeader>
        <CardContent className="tw-pt-2">
          <MarkdownRenderer
            className="tw-prose-sm tw-max-w-none tw-text-muted-foreground"
            markdown={description}
          />
        </CardContent>
      </Card>
    );
  }, [description, isCanvas]);
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      {children}
      {descriptionNode}
    </div>
  );
});
