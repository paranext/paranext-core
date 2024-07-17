import Markdown from 'markdown-to-jsx';

interface MarkdownRendererProps {
    markdown: string;
    }

export default function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
    return (
        <div className="pr-prose">
            <Markdown options={{}}>{markdown}</Markdown>
        </div>
    );
}