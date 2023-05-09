import logger from '@shared/services/logger.service';

/**
 * Should only be used in the renderer to alert developers in the browser console since it also
 * doubles up messages in the logs.
 */
export default class LogError extends Error {
  constructor(message?: string) {
    super(message);
    logger.error(message);
  }
}
