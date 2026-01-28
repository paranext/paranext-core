// Stub for @papi/frontend — replaced by vi.mock in tests
export default {
  commands: { sendCommand: () => Promise.resolve() },
};
export const logger = { warn: () => {}, error: () => {}, info: () => {} };
