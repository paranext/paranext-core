/* eslint-disable import/first */
import '@testing-library/jest-dom';
import { act, render, RenderResult } from '@testing-library/react';

jest.mock('@shared/services/NetworkService', () => ({
  createRequestFunction:
    (requestType: string) =>
    async (...args: unknown[]) =>
      `Mocked ${requestType} request with args ${args.join(', ')}`,
}));
import App from '../renderer/App';

describe('App', () => {
  it('should render', async () => {
    let renderResult: RenderResult | undefined;
    act(() => {
      renderResult = render(<App />);
    });
    expect(renderResult).toBeTruthy();
  });
});
