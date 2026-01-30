import {
  IWebViewProvider,
  OpenWebViewOptions,
  SavedWebViewDefinition,
  WebViewDefinition,
} from '@papi/core';
import parallelPassagesWebView from './parallel-passages.web-view?inline';
import tailwindStyles from './tailwind.css?inline';

export const parallelPassagesWebViewType = 'platformScripture.parallelPassages';

export interface ParallelPassagesWebViewOptions extends OpenWebViewOptions {
  projectId?: string;
}

export class ParallelPassagesWebViewProvider implements IWebViewProvider {
  // eslint-disable-next-line @typescript-eslint/class-methods-use-this
  async getWebView(
    savedWebView: SavedWebViewDefinition,
    getWebViewOptions: ParallelPassagesWebViewOptions,
  ): Promise<WebViewDefinition | undefined> {
    const projectId = getWebViewOptions.projectId || savedWebView.projectId || undefined;

    return {
      ...savedWebView,
      title: 'Parallel Passages',
      projectId,
      content: parallelPassagesWebView,
      styles: tailwindStyles,
    };
  }
}

export default ParallelPassagesWebViewProvider;
