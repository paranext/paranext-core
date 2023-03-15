import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProcessType } from '@shared/globalThis';
import { PEventEmitter } from '@shared/models/PEvent';
import App from '../renderer/App';

// #region globalThis setup

globalThis.processType = ProcessType.Renderer;
globalThis.isPackaged = false;
globalThis.resourcesPath = 'resources://';

// #endregion

jest.mock('@shared/services/NetworkService', () => ({
  createRequestFunction:
    (requestType: string) =>
    async (...args: unknown[]) =>
      `Mocked ${requestType} request with args ${args.join(', ')}`,
  createNetworkEventEmitter: () => {
    return new PEventEmitter();
  },
  papiExports: {
    createNetworkEventEmitter: () => {
      return new PEventEmitter();
    },
    onDidClientConnect: new PEventEmitter().event,
  },
}));
jest.mock('@renderer/hooks/papi-hooks/usePromise', () => ({
  __esModule: true,
  default: /** usePromise Mock */ () => ['mock', false],
}));
jest.mock('@renderer/hooks/papi-hooks/useEvent', () => ({
  __esModule: true,
  default: /** useEvent Mock */ () => {},
}));
jest.mock('@renderer/components/docking/ParanextDockLayout', () => ({
  __esModule: true,
  default: /** ParanextDockLayout Mock */ () => <></>,
}));

describe('App', () => {
  it('should render', async () => {
    expect(render(<App />)).toBeTruthy();
  });
});
