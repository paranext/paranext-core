import { describe, expect, it, vi } from 'vitest';
import { isLockedFileError, retryWhileFileLocked } from './locked-file.util';

function fsError(code: string, filePath?: string): Error {
  return Object.assign(
    new Error(`${code}: test`),
    filePath === undefined ? { code } : { code, path: filePath },
  );
}

describe('isLockedFileError', () => {
  it('recognizes an EBUSY error that names a file', () => {
    expect(isLockedFileError(fsError('EBUSY', 'C:\\ext\\a_1.0.0.zip'))).toBe(true);
  });

  it('rejects other codes, errors without a path, and non-errors', () => {
    expect(isLockedFileError(fsError('EPERM', 'a.zip'))).toBe(false);
    expect(isLockedFileError(fsError('ENOENT', 'a.zip'))).toBe(false);
    expect(isLockedFileError(fsError('EBUSY'))).toBe(false);
    expect(isLockedFileError(fsError('EBUSY', ''))).toBe(false);
    expect(isLockedFileError({ code: 'EBUSY', path: 'a.zip' })).toBe(false);
    expect(isLockedFileError(undefined)).toBe(false);
  });
});

describe('retryWhileFileLocked', () => {
  it('retries while the file is locked and returns the result once it is free', async () => {
    const operation = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(fsError('EBUSY', 'a.zip'))
      .mockRejectedValueOnce(fsError('EBUSY', 'a.zip'))
      .mockResolvedValueOnce('contents');

    // Checked from inside the callback, so a call made after a later attempt fails this test
    const onLocked = vi.fn(() => expect(operation).toHaveBeenCalledTimes(1));

    await expect(
      retryWhileFileLocked(operation, { delayMs: 1, maxAttempts: 5, onLocked }),
    ).resolves.toBe('contents');
    expect(operation).toHaveBeenCalledTimes(3);
    expect(onLocked).toHaveBeenCalledTimes(1);
    expect(onLocked).toHaveBeenCalledWith(expect.objectContaining({ path: 'a.zip' }), 4);
  });

  it('does not call onLocked when the file is free', async () => {
    const onLocked = vi.fn();

    await expect(retryWhileFileLocked(async () => 'contents', { onLocked })).resolves.toBe(
      'contents',
    );
    expect(onLocked).not.toHaveBeenCalled();
  });

  it('throws the locked-file error once the attempts run out', async () => {
    const operation = vi.fn(async () => {
      throw fsError('EBUSY', 'a.zip');
    });

    await expect(retryWhileFileLocked(operation, { delayMs: 1, maxAttempts: 4 })).rejects.toThrow(
      'EBUSY',
    );
    expect(operation).toHaveBeenCalledTimes(4);
  });

  it('throws any other error at once without retrying', async () => {
    const operation = vi.fn(async () => {
      throw fsError('ENOENT', 'a.zip');
    });

    await expect(retryWhileFileLocked(operation, { delayMs: 1 })).rejects.toThrow('ENOENT');
    expect(operation).toHaveBeenCalledTimes(1);
  });
});
