// @vitest-environment jsdom

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

const { sendCommandMock } = vi.hoisted(() => ({ sendCommandMock: vi.fn() }));

vi.mock('@papi/frontend', () => ({
  default: { commands: { sendCommand: sendCommandMock } },
  logger: { debug: vi.fn() },
}));

const { useRegistrationValidity } = await import('./use-registration-validity.hook');

beforeEach(() => {
  sendCommandMock.mockReset();
});

describe('useRegistrationValidity', () => {
  it('reports unknown until the check answers', () => {
    sendCommandMock.mockReturnValue(new Promise(() => {}));

    const { result } = renderHook(() => useRegistrationValidity());

    expect(result.current).toBe('unknown');
  });

  it('reports valid for a valid registration', async () => {
    sendCommandMock.mockResolvedValue(true);

    const { result } = renderHook(() => useRegistrationValidity());

    await waitFor(() => expect(result.current).toBe('valid'));
    expect(sendCommandMock).toHaveBeenCalledWith(
      'paratextRegistration.doesUserHaveValidRegistration',
    );
  });

  it('reports invalid for a missing or invalid registration', async () => {
    sendCommandMock.mockResolvedValue(false);

    const { result } = renderHook(() => useRegistrationValidity());

    await waitFor(() => expect(result.current).toBe('invalid'));
  });

  it('reports invalid when the check fails, so a failure never widens what is offered', async () => {
    sendCommandMock.mockRejectedValue(new Error('no handler'));

    const { result } = renderHook(() => useRegistrationValidity());

    await waitFor(() => expect(result.current).toBe('invalid'));
  });
});
