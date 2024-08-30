import { WebViewProps } from '@papi/core';
import ConfigureChecks from './checks/configure-checks/configure-checks.component';

global.webViewComponent = function InventoryWebView({ useWebViewState }: WebViewProps) {
  const [projectId] = useWebViewState('projectId', '');
  const [projectName] = useWebViewState('projectName', '');
  const [availableChecks] = useWebViewState('availableChecks', []);

  return (
    <ConfigureChecks
      projectId={projectId}
      projectName={projectName}
      availableChecks={availableChecks}
    />
  );
};
