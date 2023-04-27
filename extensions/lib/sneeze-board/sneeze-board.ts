import papi from 'papi';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import IDataProviderEngine from 'shared/models/data-provider-engine.model';
// @ts-expect-error ts(1192) this file has no default export; the text is exported by rollup
import sneezeBoardReactWebView from './sneeze-board.web-view.tsx';
import styles from './sneeze-board.web-view.css?inline';

// TODO: Update the json file with the latest date from Darren (xml that needs to be run through a
// json converter online and have accessors renamed to userId, date, and comment)
import blessYouData from './sneeze-board.data.json';

const { logger } = papi;
logger.info('Sneeze Board is importing!');

const unsubscribers: UnsubscriberAsync[] = [];

// TODO: Change date to have a Date type once JSON gets parsed to a Date type
export type SerializedSneeze = { userId: string; date: string; comment?: string };
export type Sneeze = SerializedSneeze & { sneezeId: number };
export type User = { userId: string; name: string; color: string };
class AchYouDataProviderEngine
  implements IDataProviderEngine<string | number | Date, Sneeze[] | User[], Sneeze | User>
{
  sneezes: Sneeze[];
  startOfCountdown: number;
  users: User[];
  constructor() {
    this.startOfCountdown = +blessYouData.CountdownStart;
    this.sneezes = blessYouData.Sneezes.map((s, i) => {
      return { sneezeId: this.startOfCountdown - i, ...s };
    });
    this.users = blessYouData.Users;
  }

  /**
   * @param selector string userId of user who just sneezed or number sneezeId of sneeze that
   *  needs editing
   * @param data date and any comments associated with the sneeze
   */
  // Note: this method gets layered over so that you can run `this.set` in the data provider engine,
  // and it will notify update afterward.
  async set(selector: string | number, data: Sneeze) {
    // Setting a sneeze by userId means that user just sneezed a new sneeze so add it to the data
    if (typeof selector === 'string') this.sneezes.push(data);
    // You can't change scripture from just a string. You have to tell us you're a heretic
    // TODO: Finish the update sneeze set commented out below
    // if (typeof data === 'number'){
    //   let changingSneeze = this.sneezes.find((s) => data.sneezeId === s.sneezeId);
    //   // this.sneezes.
    // }
    return true;
  }

  /**
   * @param selector string user id or number sneezeId or Date date
   */
  get = async (selector: string | number | Date) => {
    console.log('Sneeze get');
    if (!selector) return [];
    if (selector === '*') return this.sneezes;
    if (selector === 'users') return this.users;
    if (typeof selector === 'string')
      // Handle all string selectors so it can be assumed the following selectors are of type SneezeBoardData
      return this.sneezes.filter((sneeze) => {
        return selector === sneeze.userId;
      });

    // TODO: Come back and parse Json date into the date type instead of type string and make this sortable by day, month, year etc.
    // if (selector.date && typeOf date === 'Date')
    //   return this.sneezes.filter((sneeze) => {
    //     return selector.date === sneeze.date;
    //   });
    if (typeof selector === 'number') {
      return this.sneezes.filter((sneeze) => {
        return selector === sneeze.sneezeId;
      });
    }
    return [];
  };
}

export async function activate() {
  logger.info('Sneeze Board is activating!');

  const AchYouDataProviderEngineInfo = await papi.dataProvider.registerEngine(
    'sneeze-board.sneezes',
    new AchYouDataProviderEngine(),
  );

  await papi.webViews.addWebView({
    componentName: 'SneezeBoard',
    contents: sneezeBoardReactWebView,
    styles,
  });

  const sneezeDataProvider = AchYouDataProviderEngineInfo?.dataProvider;

  const unsubPromises = [
    papi.commands.registerCommand('sneeze-board.get-sneezes', () => {
      return sneezeDataProvider.get('*');
    }),
  ];

  if (sneezeDataProvider) {
    // Test subscribing to a data provider
    const unsubGreetings = await sneezeDataProvider.subscribe(
      'c897cd73-9100-4e6a-8a32-fe237f1e9928',
      (timSneeze: Sneeze[] | User[]) =>
        logger.info(
          `Tim sneezed the ${(timSneeze as Sneeze[])[timSneeze.length - 1].sneezeId} sneeze`,
        ),
    );

    unsubscribers.push(unsubGreetings);
  }

  return Promise.all(unsubPromises.map((unsubPromise) => unsubPromise.promise)).then(() => {
    logger.info('Sneeze Board is finished activating!');
    return papi.util.aggregateUnsubscriberAsyncs(
      unsubPromises.map((unsubPromise) => unsubPromise.unsubscriber),
    );
  });
}

export async function deactivate() {
  return Promise.all(unsubscribers.map((unsubscriber) => unsubscriber()));
}
