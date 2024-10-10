type CodePreviewProps = { code: string };

export default function CodePreview({ code }: CodePreviewProps) {
  return (
    <pre className="pr-rounded-md pr-bg-muted pr-p-4 pr-text-sm">
      <code>{code}</code>
    </pre>
  );
}
