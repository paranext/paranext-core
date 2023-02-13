import '@testing-library/jest-dom';
import { act, render, RenderResult } from '@testing-library/react';
import App from '../renderer/App';

jest.mock('@shared/services/NetworkService', () => ({
  createRequestFunction:
    (requestType: string) =>
    async (...args: unknown[]) =>
      `Mocked ${requestType} request with args ${args.join(', ')}`,
}));
jest.mock('@renderer/hooks/usePromise', () => ({
  __esModule: true,
  default: /** usePromise Mock */ () => ['mock', false],
}));

describe('App', () => {
  it('should render', async () => {
    let renderResult: RenderResult | undefined;
    act(() => {
      renderResult = render(<App />);
    });
    expect(renderResult).toBeTruthy();
  });
});
