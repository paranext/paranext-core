/** Mock of logger.service.ts */
export const logger = {
  log: () => {
    throw new Error("Don't use `log`. Use `info` method instead.");
  },
  info: () => {},
  warn: () => {},
  error: () => {},
};
