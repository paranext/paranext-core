/**
 * JSDOC SOURCE PapiRendererXMLHttpRequest This wraps the browser's XMLHttpRequest implementation to
 * provide better control over internet access. It is isomorphic with the standard XMLHttpRequest,
 * so it should act as a drop-in replacement.
 *
 * Note that Node doesn't have a native implementation, so this is only for the renderer.
 */
export default class PapiRendererXMLHttpRequest implements XMLHttpRequest {
  // Use "any" to match the XMLHttpRequest interface
  /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/lines-between-class-members */
  readonly DONE!: 4;
  readonly HEADERS_RECEIVED!: 2;
  readonly LOADING!: 3;
  readonly OPENED!: 1;
  readonly UNSENT!: 0;
  abort!: () => void;
  addEventListener!: <K extends keyof XMLHttpRequestEventMap>(
    type: K,
    listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ) => void;
  dispatchEvent!: (event: Event) => boolean;
  getAllResponseHeaders!: () => string;
  getResponseHeader!: (name: string) => string | null;
  open!: (
    method: string,
    url: string,
    async?: boolean,
    username?: string | null,
    password?: string | null,
  ) => void;
  onabort!: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
  onerror!: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
  onload!: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
  onloadend!: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
  onloadstart!: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
  onprogress!: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
  onreadystatechange!: ((this: XMLHttpRequest, ev: Event) => any) | null;
  ontimeout!: ((this: XMLHttpRequest, ev: ProgressEvent) => any) | null;
  overrideMimeType!: (mime: string) => void;
  readyState!: number;
  removeEventListener!: <K extends keyof XMLHttpRequestEventMap>(
    type: K,
    listener: (this: XMLHttpRequest, ev: XMLHttpRequestEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ) => void;
  response!: any;
  responseText!: string;
  responseType!: XMLHttpRequestResponseType;
  responseURL!: string;
  responseXML!: Document | null;
  send!: (body?: Document | XMLHttpRequestBodyInit | null) => void;
  setRequestHeader!: (name: string, value: string) => void;
  status!: number;
  statusText!: string;
  timeout!: number;
  upload!: XMLHttpRequestUpload;
  withCredentials!: boolean;
  /* eslint-enable @typescript-eslint/no-explicit-any */

  constructor() {
    // TODO: Hook into something that checks for whether the platform is in offline mode

    // Return a real object for now.
    // If we ever need something better we could use a Proxy or just hold an inner object.
    // eslint-disable-next-line no-constructor-return
    return new XMLHttpRequest();
  }
}
