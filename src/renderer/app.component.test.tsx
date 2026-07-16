import { App } from '@renderer/app.component';
import { ProcessType } from '@shared/global-this.model';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { vi } from 'vitest';

// #region globalThis setup

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = false;
globalThis.resourcesPath = 'resources://';

// #endregion

// vi.mock factories are hoisted above imports by vitest, so top-level imports aren't available
// inside them. Use dynamic import() within the factory to access PlatformEventEmitter.
vi.mock('@shared/services/network.service', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@shared/services/network.service')>();
  const { PlatformEventEmitter } = await import('platform-bible-utils');
  return {
    ...actual,
    createRequestFunction:
      (requestType: string) =>
      async (...args: unknown[]) =>
        `Mocked ${requestType} request with args ${args.join(', ')}`,
    createNetworkEventEmitter: () => {
      return new PlatformEventEmitter();
    },
    createNetworkEventEmitterAsync: async () => {
      return new PlatformEventEmitter();
    },
    papiNetworkService: {
      createNetworkEventEmitter: () => {
        return new PlatformEventEmitter();
      },
      createNetworkEventEmitterAsync: async () => {
        return new PlatformEventEmitter();
      },
      onDidClientConnect: new PlatformEventEmitter().event,
    },
  };
});
vi.mock('@renderer/components/docking/platform-dock-layout.component', () => ({
  __esModule: true,
  default: /** PlatformDockLayout Mock */ () => undefined,
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
