import logger from '@shared/services/logger.service';

export default class LogError extends Error {
  constructor(message?: string) {
    super(message);
    logger.error(message);
  }
}
