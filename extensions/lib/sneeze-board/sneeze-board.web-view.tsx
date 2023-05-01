import papi from 'papi';
import React, { ChangeEvent, SyntheticEvent } from 'react';
import { AchYouDataProvider, Sneeze, User } from './sneeze-board.d';

const { useState } = React;

const {
  react: {
    components: { Button, ComboBox, TextField },
    hooks: { useData, useDataProvider },
  },
  logger,
} = papi;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SneezeBoard() {
  logger.info('Preparing to display the Sneeze Board');

  const dataProvider = useDataProvider<AchYouDataProvider>('sneeze-board.sneezes');

  const [selectedItem, setSelectedItem] = useState<string>('Select user');
  const [comment, setComment] = useState<string>('');
  const [sneezes, , isLoading] = useData<string | number | Date, Sneeze[], Sneeze>(
    'sneeze-board.sneezes',
    '*',
    [],
  );

  const [users] = useData<string, User[], User>('sneeze-board.sneezes', 'users', []);
  // const [users, setUser] = useData<string, User[], User>('sneeze-board.sneezes', 'users', []);
  const names: string[] = [];
  const userIds: { [userId: string]: string } = {};
  const userColor: { [userId: string]: string } = {};
  users.forEach((u) => {
    names.push(u.name);
    userIds[u.name] = u.userId;
    userColor[u.userId] = u.color;
  });

  const nameChangeHandler = (_event: SyntheticEvent<Element, Event>, value: unknown) => {
    setSelectedItem(value as string);
  };

  const commentChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value);
  };

  const toolTip = (sneeze: Sneeze) => {
    const sneezeUser: string = `Sneezer: ${Object.keys(userIds).find(
      (key) => userIds[key] === sneeze.userId,
    )}`;
    const sneezeDate: string = `\nDate: ${sneeze.date.substring(0, 10)}`;
    const sneezeComment: string = sneeze.comment ? `\nComment: ${sneeze.comment}` : '';
    return `${sneezeUser}${sneezeDate}${sneezeComment}`;
  };

  return (
    <>
      {isLoading ? (
        <div className="flex-container">Loading sneeze board...</div>
      ) : (
        <div className="flex-container">
          {sneezes.map((s) => (
            <div
              key={s.sneezeId}
              className={`sneeze-record${s.comment && ' comment'}`}
              style={{ color: userColor[s.userId] }}
              title={toolTip(s)}
            >
              {s.sneezeId}
            </div>
          ))}
        </div>
      )}
      <br />
      <Button
        className="sneezed"
        onClick={() => {
          if (selectedItem === 'Select user') return;
          const userId: string = userIds[selectedItem];

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

          dataProvider?.set(userId, {
            sneezeId: sneezes[sneezes.length - 1].sneezeId - 1,
            userId,
            date: formattedDate,
            comment,
          });
        }}
      >
        I Sneezed
      </Button>
      <ComboBox className="names" title="Sneezers" options={names} onChange={nameChangeHandler} />
      <TextField label="Comment" onChange={commentChangeHandler} />
    </>
  );
}
