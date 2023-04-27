import papi from 'papi';
import { AchYouDataProvider, Sneeze, User } from './sneeze-board.d';

const {
  react: {
    components: { Button, ComboBox },
    hooks: { useData, useDataProvider },
  },
  logger,
} = papi;

// @ts-expect-error ts(6133) This function is called by the React web view container
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SneezeBoard() {
  logger.info('Preparing to display the Sneeze Board');

  const dataProvider = useDataProvider<AchYouDataProvider>('sneeze-board.sneezes');

  const [sneezes, , isLoading] = useData<string | number | Date, Sneeze[], Sneeze>(
    'sneeze-board.sneezes',
    '*',
    [],
  );

  const [users] = useData<string, User[], User>('sneeze-board.sneezes', 'users', []);
  // const [users, setUser] = useData<string, User[], User>('sneeze-board.sneezes', 'users', []);
  const names: string[] = [];
  const userColor: { [userId: string]: string } = {};
  users.forEach((u) => {
    names.push(u.name);
    userColor[u.userId] = u.color;
  });

  return (
    <>
      {isLoading ? (
        <div className="flex-container">Loading sneeze board...</div>
      ) : (
        <div className="flex-container">
          {sneezes.map((s) =>
            s.sneezeId % 5 === 0 ? (
              <div className="sneeze-record" style={{ color: userColor[s.userId] }}>
                {s.sneezeId}
              </div>
            ) : (
              <span className="sneeze-record" style={{ color: userColor[s.userId] }}>
                {s.sneezeId}
              </span>
            ),
          )}
        </div>
      )}
      <Button
        onClick={() => {
          dataProvider?.set('944616bd-20a1-4659-87af-04563043ffde', {
            userId: '944616bd-20a1-4659-87af-04563043ffde',
            sneezeId: sneezes[sneezes.length - 1].sneezeId - 1,
            date: Date.now.toString(),
          });
        }}
      >
        I Sneezed
      </Button>
      <ComboBox options={names} />
    </>
  );
}
