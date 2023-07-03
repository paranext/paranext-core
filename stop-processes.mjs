/* eslint-disable no-console */
import { exec } from 'child_process';
import fkill from 'fkill';

// All processes with any of these terms in the command line will be killed
const searchTerms = ['electronmon', 'esbuild', 'nodemon', 'vite', 'webpack'];

// Don't display errors because we try to kill processes that already died because of a previous kill
const fkillOptions = { silent: true, forceAfterTimeout: 1000 };

function killProcessesWithSearchTerm() {
  // Different platforms have different ways to get running process info
  let listCommand;
  if (process.platform === 'win32') {
    listCommand = 'WMIC path win32_process get Commandline,Processid /format:csv';
  } else if (process.platform === 'darwin' || process.platform === 'linux') {
    listCommand = 'ps -A -o pid,command';
  } else {
    console.error('Unsupported platform:', process.platform);
    return;
  }

  // Get the list of running processes
  exec(listCommand, async (error, stdout) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }

    // Process the output to find processes with a search term
    let processes;
    if (process.platform === 'win32') {
      processes = stdout
        .split('\n')
        .slice(1)
        .map((line) => {
          const firstIndex = line.indexOf(',');
          const lastIndex = line.lastIndexOf(',');
          const pid = line.substring(lastIndex + 1);
          const command = line.substring(firstIndex + 1, lastIndex);
          return { pid, command };
        });
    } else if (process.platform === 'darwin' || process.platform === 'linux') {
      processes = stdout
        .split('\n')
        .slice(1)
        .map((line) => {
          const trimmedLine = line.trim();
          const index = trimmedLine.indexOf(' ');
          const pid = trimmedLine.substring(0, index);
          const command = trimmedLine.substring(index + 1);
          return { pid, command };
        });
    } else {
      console.log(`Unexpected platform: ${process.platform}`);
      process.exit(-1);
    }

    // Kill the processes with a search term in process name or arguments
    await Promise.all(
      processes.map(async ({ pid, command }) => {
        if (command && pid && searchTerms.some((term) => command.includes(term))) {
          console.log(`Killing ${command}`);
          return fkill(Number(pid), fkillOptions);
        }
        return Promise.resolve();
      }),
    );
  });
}

// DO IT
(async () => {
  killProcessesWithSearchTerm();
  await Promise.all([fkill('electron', fkillOptions), fkill('dotnet', fkillOptions)]);
})();
