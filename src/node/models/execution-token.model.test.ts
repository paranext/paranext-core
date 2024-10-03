import { ExecutionToken } from './execution-token.model';

test('tokens are always frozen', () => {
  const token = new ExecutionToken('extension', 'foo');
  expect(Object.isFrozen(token)).toBe(true);
});
