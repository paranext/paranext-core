// Stub for @papi/frontend — replaced by vi.mock in tests
const papi = {
  commands: { sendCommand: () => Promise.resolve() },
};
export default papi;
export const logger = { warn: () => {}, error: () => {}, info: () => {} };
