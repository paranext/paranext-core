type CodePreviewProps = { code: string };

export default function CodePreview({ code }: CodePreviewProps) {
  return (
    <pre className="tw-rounded-md tw-bg-muted tw-p-4 tw-text-sm">
      <code>{code}</code>
    </pre>
  );
}
