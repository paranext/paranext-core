import { logger } from '@papi/frontend';
import { Button } from 'platform-bible-react';
import { Button as MuiButton } from '@mui/material';

/**
 * This web view exists to test if importing `platform-bible-react` and `@mui/material` at once will
 * successfully deduplicate `@emotion/react`. If it fails, there will be a console warning in the
 * renderer indicating `@emotion/react` was loaded twice.
 */

globalThis.webViewComponent = function HelloSomeoneWebViewReact() {
  return (
    <div>
      <div>Hello Someones</div>
      <Button onClick={() => logger.info('platform-bible-react button ')}>
        platform-bible-react
      </Button>
      <MuiButton onClick={() => logger.info('mui button')}>mui button</MuiButton>
    </div>
  );
};
