/* eslint-disable import/first */
jest.mock('../util/logger');

import { isClient } from '@shared/util/InternalUtil';
import * as ConnectionService from './ConnectionService';
import * as NetworkService from './NetworkService';

describe('UserService', () => {
  afterAll(async () => {
    ConnectionService.disconnect();
  });

  const requestType = 'test.requestType';

  it('should be testing on the server', () => {
    expect(isClient()).toBe(false);
  });

  it('should initialize the service', async () => {
    await expect(NetworkService.initialize()).resolves.not.toThrow();
  });

  it('should register a request handler', async () => {
    const handler = async () => {};

    const unsubPromise = await NetworkService.registerRequestHandler(
      requestType,
      handler,
    );

    await expect(unsubPromise.promise).resolves.not.toThrow();
  });

  it('should send a request', async () => {
    const arg1 = 'testArg1';
    await expect(
      NetworkService.request(requestType, arg1),
    ).resolves.not.toThrow();
  });

  it('should create a request function', async () => {
    const requestFunc = NetworkService.createRequestFunction(requestType);
    await expect(requestFunc()).resolves.not.toThrow();
  });
});
