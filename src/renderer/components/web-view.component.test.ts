import { WebViewContentType, WebViewProps } from '../../shared/data/web-view.model';
import { getTitle } from './web-view.component';

describe('WebView Component', () => {
  describe('getTitle', () => {
    it('can get title when title is defined', () => {
      const title = 'MyTitle';
      const props: WebViewProps = {
        id: '',
        content: '',
        contentType: WebViewContentType.HTML,
        title,
      };
      expect(getTitle(props)).toEqual(title);
    });

    it('can get title when title is undefined', () => {
      const id = 'my-webview';
      const title = `${id} ${WebViewContentType.HTML}`;
      const props: WebViewProps = {
        id,
        content: '',
        contentType: WebViewContentType.HTML,
      };
      expect(getTitle(props)).toEqual(title);
    });

    it('can get title when title is undefined and ID is empty', () => {
      const title = `${WebViewContentType.HTML} Web View`;
      const props: WebViewProps = {
        id: '',
        content: '',
        contentType: WebViewContentType.HTML,
      };
      expect(getTitle(props)).toEqual(title);
    });
  });
});
