import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProcessType } from '@shared/global-this.model';
import PapiEventEmitter from '@shared/models/papi-event-emitter.model';
import App from '@renderer/app.component';

// #region globalThis setup

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = false;
globalThis.resourcesPath = 'resources://';

// #endregion

jest.mock('@shared/services/network.service', () => ({
  createRequestFunction:
    (requestType: string) =>
    async (...args: unknown[]) =>
      `Mocked ${requestType} request with args ${args.join(', ')}`,
  createNetworkEventEmitter: () => {
    return new PapiEventEmitter();
  },
  papiNetworkService: {
    createNetworkEventEmitter: () => {
      return new PapiEventEmitter();
    },
    onDidClientConnect: new PapiEventEmitter().event,
  },
}));
jest.mock('@renderer/hooks/papi-hooks/use-promise.hook', () => ({
  __esModule: true,
  default: /** usePromise Mock */ () => ['mock', false],
}));
jest.mock('@renderer/hooks/papi-hooks/use-event.hook', () => ({
  __esModule: true,
  default: /** useEvent Mock */ () => {},
}));
jest.mock('@renderer/components/docking/platform-dock-layout.component', () => ({
  __esModule: true,
  default: /** ParanextDockLayout Mock */ () => undefined,
}));
// Mock all of the papi-components because they should test themselves
jest.mock(
  'papi-components',
  () =>
    new Proxy(
      {},
      {
        get() {
          return function MockComponent() {};
        },
      },
    ),
);

describe('App', () => {
  it('should render', async () => {
    expect(render(<App />)).toBeTruthy();
  });
});
