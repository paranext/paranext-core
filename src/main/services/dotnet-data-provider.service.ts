import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import path from 'path';

let dotnet: ChildProcessWithoutNullStreams | undefined;

function killDotnetDataProvider() {
  if (!dotnet) return;

  if (dotnet.kill()) {
    console.log('[dotnet data provider] was killed');
  } else {
    console.error(
      '[dotnet data provider] was not stopped! Investigate other .kill() options',
    );
  }
  dotnet = undefined;
}

/**
 * Starts the Dotnet Data Provider if it isn't already running.
 */
function startDotnetDataProvider() {
  if (dotnet) return;

  // default values for development
  let command = process.platform.includes('win') ? 'npm.cmd' : 'npm';
  let args: string[] = ['run', 'start:data'];

  if (process.env.NODE_ENV === 'production') {
    if (process.platform === 'win32') {
      command = path.join(
        process.resourcesPath,
        'dotnet',
        'ParanextDataProvider.exe',
      );
      args = [];
    } else {
      command = path.join(
        process.resourcesPath,
        'dotnet',
        'ParanextDataProvider',
      );
      args = [];
    }
  }

  dotnet = spawn(command, args);

  dotnet.stdout.on('data', (data) => {
    console.log(`[dotnet data provider] stdout: ${data}`);
  });

  dotnet.stderr.on('data', (data) => {
    console.error(`[dotnet data provider] stderr: ${data}`);
  });

  dotnet.on('close', (code, signal) => {
    if (signal) {
      console.log(`[dotnet data provider] terminated with signal ${signal}`);
    } else {
      console.log(`[dotnet data provider] exited with code ${code}`);
    }
  });
}

const dotnetDataProvider = {
  start: startDotnetDataProvider,
  kill: killDotnetDataProvider,
};
export default dotnetDataProvider;
