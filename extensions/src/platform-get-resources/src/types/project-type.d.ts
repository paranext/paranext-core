import { EditedStatus } from 'platform-scripture';
import { ComponentType, SVGProps } from 'react';

export type LocalProjectInfo = {
  id: string;
  isEditable: boolean;
  fullName: string;
  name: string;
  language: string;
  type: ProjectTypeKey;
};

export type MergedProjectInfo = {
  id: string;
  name: string;
  fullName: string;
  language: string;
  isEditable: boolean;
  isSendReceivable: boolean;
  isLocallyAvailable?: boolean;
  editedStatus?: EditedStatus;
  lastSendReceiveDate?: string;
  type: ProjectTypeKey;
};

export const PROJECT_TYPE_KEYS: readonly ['project', 'resource', 'dictionary', 'media'];
export type ProjectTypeKey = (typeof PROJECT_TYPE_KEYS)[number];
export type TypeAction = {
  buttonLabel: string;
  action: () => void;
  condition: () => boolean;
  default?: () => boolean;
};
export type ProjectType = {
  key: ProjectTypeKey;
  localizedName: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  actions: TypeAction[];
};
