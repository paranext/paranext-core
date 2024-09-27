import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProcessType } from '@shared/global-this.model';
import App from '@renderer/app.component';

// #region globalThis setup

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = false;
globalThis.resourcesPath = 'resources://';

// #endregion

// Define the mock component outside of the jest.mock() call
function MockPlatformBibleToolbar() {
  return <div />;
}

jest.mock('@shared/services/network.service', () => {
  // eslint-disable-next-line global-require
  const { PlatformEventEmitter } = require('platform-bible-utils');
  return {
    createRequestFunction:
      (requestType: string) =>
      async (...args: unknown[]) =>
        `Mocked ${requestType} request with args ${args.join(', ')}`,
    createNetworkEventEmitter: () => {
      return new PlatformEventEmitter();
    },
    papiNetworkService: {
      createNetworkEventEmitter: () => {
        return new PlatformEventEmitter();
      },
      onDidClientConnect: new PlatformEventEmitter().event,
    },
  };
});
jest.mock('@renderer/components/docking/platform-dock-layout.component', () => ({
  __esModule: true,
  default: /** ParanextDockLayout Mock */ () => undefined,
}));
jest.mock('@renderer/components/platform-bible-toolbar', () => ({
  __esModule: true,
  default: MockPlatformBibleToolbar,
}));

describe('App', () => {
  it('should render', async () => {
    expect(render(<App />)).toBeTruthy();
  });
});
