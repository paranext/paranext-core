import IDataProvider from 'shared/models/data-provider.interface';

export type SerializedSneeze = { userId: string; date: string; comment?: string };
export type Sneeze = SerializedSneeze & { sneezeId: number };
export type User = { userId: string; name: string; color: string };

export interface AchYouDataProvider
  extends IDataProvider<string | number | Date, Sneeze[] | User[], Sneeze | User> {}
