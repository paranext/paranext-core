import { AsyncVariable } from 'platform-bible-utils';

test('wait on other async tasks to set and notify variables', async () => {
  const VARIABLE_NAME: string = 'abc';
  const TEST_VALUE: string = 'A1B2C3';
  const testVariable: AsyncVariable<string> = new AsyncVariable<string>(VARIABLE_NAME);
  const thing = (async () => {
    await expect(testVariable.promise).resolves.toBe(TEST_VALUE);
  })();
  expect(testVariable.hasSettled).toBeFalsy();
  testVariable.resolveToValue(TEST_VALUE);
  expect(testVariable.hasSettled).toBeTruthy();

  await thing;
});

test('reject the promise for the value', async () => {
  const VARIABLE_NAME: string = 'def';
  const TEST_REASON: string = 'This is just a test';
  const testVariable: AsyncVariable<string> = new AsyncVariable<string>(VARIABLE_NAME);
  const thing = (async () => {
    await expect(testVariable.promise).rejects.toMatch(TEST_REASON);
  })();
  testVariable.rejectWithReason(TEST_REASON);

  await thing;
});
