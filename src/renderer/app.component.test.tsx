import { App } from '@renderer/app.component';
import { ProcessType } from '@shared/global-this.model';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { PlatformEventEmitter } from 'platform-bible-utils';
import { vi } from 'vitest';

// #region globalThis setup

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = false;
globalThis.resourcesPath = 'resources://';

// #endregion

vi.mock('@shared/services/network.service', () => ({
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
}));
vi.mock('@renderer/components/docking/platform-dock-layout.component', () => ({
  __esModule: true,
  default: /** ParanextDockLayout Mock */ () => undefined,
  PlatformDockLayout: /** PlatformDockLayout Named Export Mock */ () => <div />,
}));
vi.mock('@renderer/components/platform-bible-toolbar', () => ({
  __esModule: true,
  default: /** PlatformBibleToolbar Mock */ () => <div />,
  PlatformBibleToolbar: /** PlatformBibleToolbar Named Export Mock */ () => <div />,
}));

describe('App', () => {
  it('should render', async () => {
    expect(render(<App />)).toBeTruthy();
  });
});
