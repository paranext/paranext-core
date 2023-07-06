import { useRef } from 'react';
import Typography from '@mui/material/Typography';
import { Toolbar, RefSelector, ScriptureReference } from 'papi-components';
import './platform-bible-toolbar.css';

export default function PlatformBibleToolbar(props: {
  scrRef: ScriptureReference;
  referenceChanged: (scrRef: ScriptureReference) => void;
}) {
  const { referenceChanged } = props;
  const { scrRef } = props;

  // This ref will always be defined
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const toolbarRef = useRef<HTMLDivElement>(null);

  return (
    <Toolbar ref={toolbarRef}>
      <Typography className="title" variant="h6" noWrap>
        <RefSelector handleSubmit={referenceChanged} scrRef={scrRef} />
      </Typography>
    </Toolbar>
  );
}
