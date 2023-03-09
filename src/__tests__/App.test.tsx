import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProcessType } from '@shared/globalThis';
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
}));
jest.mock('@renderer/hooks/papi-hooks/usePromise', () => ({
  __esModule: true,
  default: /** usePromise Mock */ () => ['mock', false],
}));

describe('App', () => {
  it('should render', async () => {
    expect(render(<App />)).toBeTruthy();
  });
});
