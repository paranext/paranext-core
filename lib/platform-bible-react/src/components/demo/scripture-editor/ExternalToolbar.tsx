/* Bootstrap Icons https://icons.getbootstrap.com */

import { EditorRef } from '@eten-tech-foundation/platform-editor';
import { RefObject } from 'react';
import { ToolbarButton } from './ToolbarButton';

type ExternalToolbarProps = {
  editorRef: RefObject<EditorRef | null>;
};

export default function ExternalToolbar({ editorRef }: ExternalToolbarProps) {
  const handleInsertFootnote = () => {
    editorRef.current?.insertNote('f');
  };

  const handleInsertCrossReference = () => {
    editorRef.current?.insertNote('x');
  };

  const handleInsertEndnote = () => {
    editorRef.current?.insertNote('fe');
  };

  return (
    <div
      title="External Toolbar"
      style={{
        padding: '8px 12px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #ddd',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '8px',
      }}
    >
      <ToolbarButton
        onClick={handleInsertFootnote}
        title="Insert Footnote"
        ariaLabel="Insert Footnote"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-superscript"
          viewBox="0 0 16 16"
        >
          <path d="m4.266 12.496.96-2.853H8.76l.96 2.853H11L7.62 3H6.38L3 12.496zm2.748-8.063 1.419 4.23h-2.88l1.426-4.23zm5.132-1.797v-.075c0-.332.234-.618.619-.618.354 0 .618.256.618.58 0 .362-.271.649-.52.898l-1.788 1.832V6h3.59v-.958h-1.923v-.045l.973-1.04c.415-.438.867-.845.867-1.547 0-.8-.701-1.41-1.787-1.41C11.565 1 11 1.8 11 2.576v.06z" />
        </svg>
      </ToolbarButton>
      <ToolbarButton
        onClick={handleInsertCrossReference}
        title="Insert Cross Reference"
        ariaLabel="Insert Cross Reference"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-shuffle"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"
          />
          <path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192" />
        </svg>
      </ToolbarButton>
      <ToolbarButton
        onClick={handleInsertEndnote}
        title="Insert Endnote"
        ariaLabel="Insert Endnote"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-window-fullscreen"
          viewBox="0 0 16 16"
          style={{ transform: 'scaleY(-1)' }}
        >
          <path d="M3 3.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1" />
          <path d="M.5 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5v-13a.5.5 0 0 0-.5-.5zM1 5V2h14v3zm0 1h14v8H1z" />
        </svg>
      </ToolbarButton>
    </div>
  );
}
