import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { act, renderHook, waitFor } from '@testing-library/react';
import { PlatformEventEmitter } from 'platform-bible-utils';
import { NetworkObject, NetworkObjectDetails } from '@shared/models/network-object.model';
import { networkObjectService } from '@shared/services/network-object.service';
import { projectLookupService } from '@shared/services/project-lookup.service';
import { getDataProviderObjectId } from '@shared/services/data-provider.service';
import { getPDPFactoryNetworkObjectNameFromId } from '@shared/models/project-lookup.service-model';
import { PDP_FACTORY_OBJECT_TYPE } from '@shared/models/project-data-provider-factory.interface';
import { ProjectMetadata } from '@shared/models/project-metadata.model';
import { useProjectDataProvider } from '@renderer/hooks/papi-hooks/use-project-data-provider.hook';

const PROJECT_ID = 'project-that-gets-re-hosted';
const PROJECT_INTERFACE = 'platform.placeholder';
const FIRST_FACTORY_ID = 'the-factory-that-goes-away';
const SECOND_FACTORY_ID = 'the-factory-that-takes-over';
const PDP_ID = 'some-nonce-pdp';

/** Handlers the hook subscribed to the "a network object was created" event */
const { createdNetworkObjectHandlers } = vi.hoisted(() => {
  const handlers: ((details: NetworkObjectDetails) => void)[] = [];
  return { createdNetworkObjectHandlers: handlers };
});

// Mock the layers the PDP service talks to rather than the service itself, so this test runs the
// real lookup chain: project lookup, then the PDP factory network object, then the PDP itself under
// a network object id nobody outside the platform could have guessed.
vi.mock('@shared/services/network-object.service', () => ({
  networkObjectService: { get: vi.fn() },
  overrideDispose: vi.fn(),
  onDidCreateNetworkObject: (handler: (details: NetworkObjectDetails) => void) => {
    createdNetworkObjectHandlers.push(handler);
    return () => {
      const handlerIndex = createdNetworkObjectHandlers.indexOf(handler);
      if (handlerIndex < 0) return false;
      createdNetworkObjectHandlers.splice(handlerIndex, 1);
      return true;
    };
  },
}));

vi.mock('@shared/services/project-lookup.service', () => ({
  projectLookupService: {
    getMetadataForProject: vi.fn(),
    getMinimalMatchPdpFactoryId: vi.fn(),
  },
}));

vi.mock('@shared/services/network.service', () => ({
  initialize: vi.fn(() => Promise.resolve()),
  getNetworkEvent: vi.fn(() => vi.fn()),
  createNetworkEventEmitterAsync: vi.fn(),
}));

vi.mock('@shared/services/logger.service', () => ({
  logger: { debug: vi.fn(), error: vi.fn(), info: vi.fn(), warn: vi.fn() },
}));

vi.mock('@shared/services/notification.service', () => ({
  notificationService: { send: vi.fn() },
}));

/** Stand in for some process publishing a network object with the given details */
function publishNetworkObject(details: NetworkObjectDetails) {
  [...createdNetworkObjectHandlers].forEach((handler) => handler(details));
}

/**
 * Let every lookup a publication could have started run to completion, so that "nothing happened"
 * is a fact rather than a race the assertion happened to win.
 */
async function settleEverythingPending() {
  await act(async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  });
}

/** A stand-in for a project data provider network object, with a handle that fires `onDidDispose` */
function makeProjectDataProvider(label: string) {
  const disposeEmitter = new PlatformEventEmitter<void>();
  return {
    // The hook only reads `onDidDispose`; the label is how a test tells the two apart.
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    networkObject: {
      label,
      onDidDispose: disposeEmitter.event,
    } as unknown as NetworkObject<object>,
    dispose: () => disposeEmitter.emit(),
  };
}

// A PDP has no id the caller can predict — it is registered under a nonce — and it does not exist
// at all until someone asks a factory for it. So the thing this hook can watch for is a PDP FACTORY
// arriving: the process that takes an app-global factory over re-publishes it, and that is the
// moment the project becomes resolvable again.
describe('useProjectDataProvider after the provider it holds is disposed', () => {
  beforeEach(() => {
    // `usePromise` reports a rejected lookup on the console, which is exactly what the middle of
    // this test provokes on purpose. Silencing it keeps the expected noise out of the run without
    // hiding an unexpected failure, which would still fail an assertion.
    // eslint-disable-next-line no-console
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('looks the project up again when a PDP factory is published', async () => {
    const firstHost = makeProjectDataProvider('first host');
    const secondHost = makeProjectDataProvider('second host');
    let servedProjectDataProvider: NetworkObject<object> | undefined = firstHost.networkObject;
    let isProjectResolvable = true;

    vi.mocked(projectLookupService.getMetadataForProject).mockImplementation(async () => {
      if (!isProjectResolvable) throw new Error(`No PDP factory currently provides ${PROJECT_ID}`);
      // Only `getMinimalMatchPdpFactoryId` reads this, and that is mocked too
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      return {} as ProjectMetadata;
    });
    vi.mocked(projectLookupService.getMinimalMatchPdpFactoryId).mockReturnValue(FIRST_FACTORY_ID);
    vi.mocked(networkObjectService.get).mockImplementation(async (id: string) => {
      if (id === getPDPFactoryNetworkObjectNameFromId(FIRST_FACTORY_ID))
        // Only `getProjectDataProviderId` is called on the factory here
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        return {
          getProjectDataProviderId: async () => PDP_ID,
        } as unknown as NetworkObject<object>;
      if (id === getDataProviderObjectId(PDP_ID)) return servedProjectDataProvider;
      return undefined;
    });

    const { result } = renderHook(() => useProjectDataProvider(PROJECT_INTERFACE, PROJECT_ID));
    await waitFor(() => expect(result.current).toBe(firstHost.networkObject));

    // The window hosting the factory and its PDP goes away
    isProjectResolvable = false;
    act(() => firstHost.dispose());
    await waitFor(() => expect(result.current).toBeUndefined());
    const lookupsAfterTheGapOpened = vi.mocked(projectLookupService.getMetadataForProject).mock
      .calls.length;

    // Some unrelated object appearing says nothing about whether this project can be resolved again
    act(() =>
      publishNetworkObject({
        id: 'SomeUnrelatedObject',
        objectType: 'object',
        functionNames: [],
      }),
    );
    await settleEverythingPending();
    expect(vi.mocked(projectLookupService.getMetadataForProject).mock.calls.length).toBe(
      lookupsAfterTheGapOpened,
    );
    expect(result.current).toBeUndefined();

    // Another window publishes the PDP factory, so the project is resolvable again
    isProjectResolvable = true;
    servedProjectDataProvider = secondHost.networkObject;
    act(() =>
      publishNetworkObject({
        id: getPDPFactoryNetworkObjectNameFromId(SECOND_FACTORY_ID),
        objectType: PDP_FACTORY_OBJECT_TYPE,
        functionNames: [],
      }),
    );

    await waitFor(() => expect(result.current).toBe(secondHost.networkObject));
  });
});
