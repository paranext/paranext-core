import { WebViewProps } from '@papi/core';
import ConfigureChecks from './checks/configure-checks/configure-checks.component';

global.webViewComponent = function InventoryWebView({ useWebViewState }: WebViewProps) {
  const [projectId] = useWebViewState('projectId', '');

  return <ConfigureChecks currentProjectId={projectId} />;
};
