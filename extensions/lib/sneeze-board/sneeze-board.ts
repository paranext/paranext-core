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
export type SneezeBoardData = { userId: string; date: string; comment?: string };
// TODO: change date to a Date type once we deserialize the json into a Date type
export type SneezeBoardDictionary = { [id: string]: { date: string; Comment?: string } };

class AchYouDataProviderEngine
  implements IDataProviderEngine<string | SneezeBoardData, SneezeBoardDictionary, SneezeBoardData>
{
  // TODO: Define the set method
  /**
   * Sneezes stored by the Data Provider.
   * Keys are User Ids.
   * Values are { date: Date, Comment?: string }
   */
  displaySneezes: SneezeBoardDictionary = {};

  /**
   * @param selector
   */
  get = async (selector: string | SneezeBoardData) => {
    this.displaySneezes = {};

    if (selector === '*')
      this.displaySneezes = Object.fromEntries(
        blessYouData.Sneezes.map(({ userId, ...rest }) => [userId, rest]),
      );
    // Handle all string selectors so it can be assumed the following selectors are of type SneezeBoardData
    if (typeof selector === 'string') return this.displaySneezes;

    if (selector.userId) {
      const filteredSneezes: SneezeBoardData[] = blessYouData.Sneezes.filter((sneeze) => {
        return selector.userId === sneeze.userId;
      });
      this.displaySneezes = Object.fromEntries(
        filteredSneezes.map(({ userId, ...rest }) => [userId, rest]),
      );
    }
    // TODO: Come back and parse Json date into the date type instead of type string
    // if (selector.date)
    //   return blessYouData.Sneezes.filter((sneeze) => {
    //     return selector.date === sneeze.date;
    //   });
    if (selector.comment) {
      const filteredSneezes: SneezeBoardData[] = blessYouData.Sneezes.filter((sneeze) => {
        return selector.comment === sneeze.comment;
      });
      this.displaySneezes = Object.fromEntries(
        filteredSneezes.map(({ userId, ...rest }) => [userId, rest]),
      );
    }
    return this.displaySneezes;
  };
}

export async function activate() {
  logger.info('Sneeze Board is activating!');

  const AchYouDataProviderEnginePromise = papi.dataProvider.registerEngine(
    'sneeze-board.sneezes',
    new AchYouDataProviderEngine(),
  );

  // TODO: Add data provider interface that implements IDataProvider like the other extensions and
  // then call the dispose method on the promise variable below instead of logging it
  // eslint-disable-next-line no-console
  console.log({ AchYouDataProviderEnginePromise });

  await papi.webViews.addWebView({
    componentName: 'SneezeBoard',
    contents: sneezeBoardReactWebView,
  });

  const unsubPromises = [
    papi.commands.registerCommand('sneeze-board.get-sneezes', () => {
      return `27002 Achoos`;
    }),
  ];

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
