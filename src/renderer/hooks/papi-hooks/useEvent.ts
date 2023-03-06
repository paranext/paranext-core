import { getNetworkEvent } from '@shared/services/NetworkService';
import { Event, EventHandler } from '@shared/util/Event';
import { isString } from '@shared/util/Util';
import { useEffect } from 'react';

export default <T>(event: Event<T> | string, eventHandler: EventHandler<T>) => {
  useEffect(() => {
    const onEvent = isString(event) ? getNetworkEvent<T>(event) : event;
    const unsubscriber = onEvent(eventHandler);
    return () => {
      unsubscriber();
    };
  }, [event, eventHandler]);
};
