import papi from 'papi';
import { UnsubscriberAsync } from 'shared/utils/papi-util';
import IDataProviderEngine from 'shared/models/data-provider-engine.model';
// @ts-expect-error ts(1192) this file has no default export; the text is exported by rollup
import sneezeBoardReactWebView from './sneeze-board.web-view.tsx';

// TODO: Update the json file with the latest date from Darren (xml that needs to be run through a
// json converter online and have accessors renamed to userId, date, and comment)
import blessYouData from './sneeze-board.data.json';

const { logger } = papi;
logger.info('Sneeze Board is importing!');

const unsubscribers: UnsubscriberAsync[] = [];

// TODO: Change date to have a Date type once JSON gets parsed to a Date type
export type SerializedSneeze = { userId: string; date: string; comment?: string };
export type Sneeze = SerializedSneeze & { sneezeId: number };

class AchYouDataProviderEngine
  implements IDataProviderEngine<string | number | Date, Sneeze[], Sneeze>
{
  sneezes: Sneeze[];
  startOfCountdown: number;
  constructor() {
    this.startOfCountdown = +blessYouData.CountdownStart;
    this.sneezes = blessYouData.Sneezes.map((s) => {
      // TODO: Should we actually disable the line below?
      // eslint-disable-next-line no-plusplus
      return { sneezeId: this.startOfCountdown--, ...s };
    });
    console.log(this.sneezes);
  }

  // TODO: Define the set method

  /**
   * @param selector
   */
  get = async (selector: string | number | Date) => {
    if (!selector) return [];
    // TODO: Update blessyoudata to a data set with sneezes in it (bless you data has serializedSneezes only which don't have sneezeIds)
    if (selector === '*') return this.sneezes;
    // Handle all string selectors so it can be assumed the following selectors are of type SneezeBoardData
    if (typeof selector === 'string')
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
      (timSneeze: Sneeze[]) =>
        logger.info(`Tim sneezed the ${timSneeze[timSneeze.length - 1].sneezeId} sneeze`),
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
