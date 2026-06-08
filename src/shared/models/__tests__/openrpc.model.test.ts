import { describe, it, expectTypeOf } from 'vitest';
import type {
  Method,
  OpenRpcNotification,
  NetworkObjectDocumentation,
  OpenRpc,
  SingleNotificationDocumentation,
} from '@shared/models/openrpc.model';

describe('openrpc.model — experimental marker types', () => {
  it('Method accepts an optional x-experimental boolean', () => {
    const m: Method = {
      name: 'x',
      params: [],
      result: { name: 'r', schema: {} },
      'x-experimental': true,
    };
    expectTypeOf(m['x-experimental']).toEqualTypeOf<boolean | undefined>();
  });

  it('OpenRpcNotification has no result field', () => {
    const n: OpenRpcNotification = {
      name: 'x',
      params: [],
      'x-experimental': true,
    };
    // @ts-expect-error — OpenRpcNotification cannot have a result
    const bad: OpenRpcNotification = { name: 'x', params: [], result: { name: 'r', schema: {} } };
    void bad;
    expectTypeOf(n.name).toEqualTypeOf<string>();
  });

  it('NetworkObjectDocumentation accepts x-experimental at top level and methods are Method[] only', () => {
    const d: NetworkObjectDocumentation = { 'x-experimental': true, methods: [] };
    expectTypeOf(d['x-experimental']).toEqualTypeOf<boolean | undefined>();
  });

  it('OpenRpc.methods accepts both Method and OpenRpcNotification', () => {
    const doc: OpenRpc = {
      openrpc: '1.2.6',
      info: { title: 't', version: 'v' },
      methods: [
        { name: 'a', params: [], result: { name: 'r', schema: {} } },
        { name: 'b', params: [] }, // notification
      ],
    };
    expectTypeOf(doc.methods).toEqualTypeOf<(Method | OpenRpcNotification)[]>();
  });

  it('SingleNotificationDocumentation has notification omitting name and result', () => {
    const d: SingleNotificationDocumentation = {
      notification: { params: [], 'x-experimental': true },
    };
    expectTypeOf(d.notification).toEqualTypeOf<Omit<OpenRpcNotification, 'name'>>();
  });

  it('NetworkObjectDocumentation.methods rejects notifications', () => {
    const notification: OpenRpcNotification = { name: 'evt', params: [] };
    const bad: NetworkObjectDocumentation = {
      // @ts-expect-error — NetworkObjectDocumentation.methods only accepts Method[], not OpenRpcNotification[]
      methods: [notification],
    };
    void bad;
  });
});
