import { WebViewContentType, WebViewProps } from '../../shared/data/web-view.model';
import { getTitle } from './web-view.component';

describe('WebView Component', () => {
  describe('getTitle', () => {
    it('can get title when title is defined', () => {
      const title = 'MyTitle';
      const props: WebViewProps = {
        id: '',
        webViewType: '',
        content: '',
        contentType: WebViewContentType.HTML,
        title,
      };
      expect(getTitle(props)).toEqual(title);
    });

    it('can get title when title is undefined but webViewType exists', () => {
      const webViewType = 'my-webview';
      const title = `${webViewType} Web View`;
      const props: WebViewProps = {
        id: '',
        webViewType,
        content: '',
        contentType: WebViewContentType.HTML,
      };
      expect(getTitle(props)).toEqual(title);
    });

    it('can get title when title is undefined and webViewType is empty but contentType exists', () => {
      const contentType = WebViewContentType.HTML;
      const title = `${contentType} Web View`;
      const props: WebViewProps = {
        id: '',
        webViewType: '',
        content: '',
        contentType,
      };
      expect(getTitle(props)).toEqual(title);
    });
  });
});
