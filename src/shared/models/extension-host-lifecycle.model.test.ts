import { describe, expect, it } from 'vitest';
import { EXTENSION_HOST_STOPPED_EVENT_SCHEMA } from './extension-host-lifecycle.model';

describe('EXTENSION_HOST_STOPPED_EVENT_SCHEMA', () => {
  it('lists every stop reason', () => {
    expect(EXTENSION_HOST_STOPPED_EVENT_SCHEMA).toEqual({
      type: 'object',
      properties: { reason: { type: 'string', enum: ['lost-connection', 'crashed'] } },
      required: ['reason'],
    });
  });

  // Every registration shares this one object, so none may change it for the others.
  it('is frozen throughout', () => {
    const { properties, required } = EXTENSION_HOST_STOPPED_EVENT_SCHEMA;
    const reason = properties?.reason;
    expect(Object.isFrozen(EXTENSION_HOST_STOPPED_EVENT_SCHEMA)).toBe(true);
    expect(Object.isFrozen(properties)).toBe(true);
    expect(Object.isFrozen(reason)).toBe(true);
    expect(typeof reason === 'object' && Object.isFrozen(reason.enum)).toBe(true);
    expect(Object.isFrozen(required)).toBe(true);
  });
});
