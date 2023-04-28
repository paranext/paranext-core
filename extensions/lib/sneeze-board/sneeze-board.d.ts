import type { DataProvider } from 'shared/models/data-provider.model';

export type SerializedSneeze = { userId: string; date: string; comment?: string };
export type Sneeze = SerializedSneeze & { sneezeId: number };
export type User = { userId: string; name: string; color: string };

export interface AchYouDataProvider
  extends DataProvider<string | number | Date, Sneeze[] | User[], Sneeze | User> {}
