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

  const changeHandler = (event, value) => {
    console.log(event);
    console.log(value);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex-container">Loading sneeze board...</div>
      ) : (
        <div className="flex-container">
          {sneezes.map((s) => (
            <div className="sneeze-record" style={{ color: userColor[s.userId] }}>
              {s.sneezeId}
            </div>
          ))}
        </div>
      )}
      <br />
      <Button
        onClick={() => {
          const currentDate: Date = new Date();
          const formattedDate: string = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}T${currentDate
            .getHours()
            .toString()
            .padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate
            .getSeconds()
            .toString()
            .padStart(2, '0')}.${currentDate.getMilliseconds().toString().padStart(3, '0')}`;

          dataProvider?.set('944616bd-20a1-4659-87af-04563043ffde', {
            sneezeId: sneezes[sneezes.length - 1].sneezeId - 1,
            userId: '944616bd-20a1-4659-87af-04563043ffde',
            date: formattedDate,
          });
        }}
      >
        I Sneezed
      </Button>
      <ComboBox title="Sneezers" options={names} onChange={changeHandler} />
    </>
  );
}
