import { serializeRequestType } from '@shared/utils/util';

/** Prefix on requests that indicates that the request is related to extension service operations */
export const CATEGORY_EXTENSION_SERVICE = 'extensionService';

/** Serialized request type for request sent from main to extension service to handle a uri redirect */
export const HANDLE_URI_REQUEST_TYPE = serializeRequestType(
  CATEGORY_EXTENSION_SERVICE,
  'handleUri',
);
