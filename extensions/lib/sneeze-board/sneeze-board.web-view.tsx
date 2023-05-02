import papi from 'papi';
import React, { ChangeEvent, SyntheticEvent } from 'react';
import { AchYouDataProvider, Sneeze, User } from './sneeze-board.d';
import { QuickVerseDataProvider } from '../quick-verse/quick-verse.d';

const { useState } = React;

const {
  react: {
    components: { Button, ComboBox, TextField },
    hooks: { useData, useDataProvider },
  },
  logger,
} = papi;

// @ts-expect-error ts(6133) This function is called by the React web view container
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SneezeBoard() {
  logger.info('Preparing to display the Sneeze Board');

  const dataProvider = useDataProvider<AchYouDataProvider>('sneeze-board.sneezes');
  const verseProvider = useDataProvider<QuickVerseDataProvider>('quick-verse.quick-verse');

  const [selectedItem, setSelectedItem] = useState<string>('Select user');
  const [color, setColor] = useState<string>('black');
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

  const squareStyle = (userId: string) => {
    if (userColor[userId]) {
      return {
        width: '20px',
        height: '20px',
        backgroundColor: userColor[userId],
      };
    } else {
      return {};
    }
  };

  const parseDateTime = (dateTimeStr: string): Date => {
    const [dateStr, timeStr] = dateTimeStr.split('T');
    const [year, month, day] = dateStr.split('-').map(Number);
    const [hour, minute, second, ms] = timeStr.slice(0, -1).split(':').map(Number);
    const dateTime = new Date();
    dateTime.setUTCFullYear(year);
    dateTime.setUTCMonth(month - 1);
    dateTime.setUTCDate(day);
    dateTime.setUTCHours(hour);
    dateTime.setUTCMinutes(minute);
    dateTime.setUTCSeconds(second);
    dateTime.setUTCMilliseconds(ms);
    return dateTime;
  };

  const finalSneezeDate = () => {
    if (sneezes.length === 0) {
      return '';
    }
    const firstSneezeTime = parseDateTime(sneezes[0].date);
    const mostRecentSneezeTime = parseDateTime(sneezes[sneezes.length - 1].date);
    const numberOfSneezes = sneezes.length;
    const targetedNumberOfSneezes = sneezes[0].sneezeId;
    const timeSpan = mostRecentSneezeTime.getTime() - firstSneezeTime.getTime();
    console.log(timeSpan);
    // return (timeSpan / numberOfSneezes) * targetedNumberOfSneezes + firstSneezeTime.getTime();
  };

  const getVerse = (ref: string): string => {
    console.log('Try to get verse!!!!!!!');
    verseProvider
      ?.get(ref)
      .then((verse) => {
        console.log('Got the verse!');
        return verse;
      })
      .catch((err) => {
        console.log('Got the error!');
        return `Invalid verse reference: ${ref} err: ${err}`;
      });
    return `Failed to load verse: ${ref}`;
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
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <ComboBox className="names" title="Sneezers" options={names} onChange={nameChangeHandler} />
        <div style={squareStyle(userIds[selectedItem])} />
      </div>

      <TextField label="Comment" onChange={commentChangeHandler} />
      <p>Estimated final sneeze date: {finalSneezeDate()}</p>
      <h3>Encouraging Verse:</h3>
      <p>{getVerse('2Kings 4:35')}</p>
    </>
  );
}
