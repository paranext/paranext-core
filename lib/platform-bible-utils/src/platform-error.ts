import { isString } from './util';

export const PLATFORM_ERROR_VERSION = 1;

export type PlatformError = {
  cause?: unknown;
  message: string;
  platformErrorVersion: number;
  stack?: string | undefined;
};

export function newPlatformError(error?: unknown): PlatformError {
  if (!error) return { message: '', platformErrorVersion: PLATFORM_ERROR_VERSION };
  if (isString(error)) return { message: error, platformErrorVersion: PLATFORM_ERROR_VERSION };
  if (typeof error === 'object' && 'message' in error && typeof error.message === 'string')
    return { ...error, message: error.message, platformErrorVersion: PLATFORM_ERROR_VERSION };
  return { cause: error, message: '', platformErrorVersion: PLATFORM_ERROR_VERSION };
}

export function isPlatformError(error: unknown): error is PlatformError {
  return !!error && typeof error === 'object' && 'platformErrorVersion' in error;
}
