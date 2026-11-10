// @vitest-environment node
/**
 * The launch and teardown waits that replaced fixed pauses: `waitForPapiMethodsRegistered`, which
 * gates a spec on the renderer's services having registered, and `waitForProcessGone`, which ends a
 * teardown as soon as the killed app has exited. Driven against a local WebSocket server and real
 * child processes, so no app is needed.
 */
import { spawn, type ChildProcess } from 'node:child_process';
import { once } from 'node:events';
import type { AddressInfo } from 'node:net';
import { afterEach, describe, expect, it } from 'vitest';
import { WebSocketServer } from 'ws';
import { isPidAlive, waitForPapiMethodsRegistered, waitForProcessGone } from './helpers';

const servers: WebSocketServer[] = [];
const children: ChildProcess[] = [];

afterEach(async () => {
  children.splice(0).forEach((child) => child.kill());
  await Promise.all(
    servers.splice(0).map(
      (server) =>
        new Promise<void>((resolve) => {
          server.clients.forEach((client) => client.terminate());
          server.close(() => resolve());
        }),
    ),
  );
});

/**
 * Serves `rpc.discover` on an ephemeral local port, answering round `n` (from 1) with the method
 * names `methodsAtRound(n)` returns.
 */
async function serveRpcDiscover(methodsAtRound: (round: number) => string[]) {
  const server = new WebSocketServer({ port: 0 });
  servers.push(server);
  let rounds = 0;
  server.on('connection', (socket) => {
    socket.on('message', (data) => {
      const request = JSON.parse(data.toString());
      if (request.method !== 'rpc.discover') return;
      rounds += 1;
      const methods = methodsAtRound(rounds).map((name) => ({ name }));
      socket.send(JSON.stringify({ jsonrpc: '2.0', id: request.id, result: { methods } }));
    });
  });
  await once(server, 'listening');
  // A server bound to a TCP port reports an AddressInfo, never a pipe name
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  const { port } = server.address() as AddressInfo;
  return { port, rounds: () => rounds };
}

describe('waitForPapiMethodsRegistered', () => {
  it('waits until every entry has registered, not just the first', async () => {
    const rpc = await serveRpcDiscover((round) =>
      round < 3
        ? ['object:DialogService-1.showDialog']
        : ['object:DialogService-1.showDialog', 'object:UsersnapService-1.submitIdea'],
    );

    await waitForPapiMethodsRegistered(
      [/^object:DialogService-\d+\.showDialog$/, 'object:UsersnapService-1.submitIdea'],
      rpc.port,
      10_000,
      10,
    );

    expect(rpc.rounds()).toBe(3);
  });

  it('names the entries still missing when the time runs out', async () => {
    const rpc = await serveRpcDiscover(() => ['object:DialogService-1.showDialog']);

    await expect(
      waitForPapiMethodsRegistered(
        ['object:DialogService-1.showDialog', 'object:UsersnapService-1.submitIdea'],
        rpc.port,
        300,
        10,
      ),
    ).rejects.toThrow(
      /^PAPI method\(s\) "object:UsersnapService-1\.submitIdea" not listed in rpc\.discover/,
    );
    // Positive control: the server was asked, so the missing entry is the server's answer
    expect(rpc.rounds()).toBeGreaterThan(0);
  });
});

/** A child process that exits on its own after `ms`. */
function childExitingAfter(ms: number): ChildProcess {
  const child = spawn(process.execPath, ['-e', `setTimeout(() => {}, ${ms})`], {
    stdio: 'ignore',
  });
  children.push(child);
  return child;
}

const NEVER = new Promise<void>(() => {});
const CAP_MS = 10_000;

describe('waitForProcessGone', () => {
  it('with a process handle, returns on its exit event and removes its listener', async () => {
    const child = childExitingAfter(300);
    await once(child, 'spawn');
    const listenersBefore = child.listenerCount('exit');
    const startedAt = Date.now();

    await waitForProcessGone(child, NEVER, CAP_MS);

    expect(child.exitCode ?? undefined).toBeDefined();
    expect(Date.now() - startedAt).toBeLessThan(CAP_MS / 2);
    expect(child.listenerCount('exit')).toBe(listenersBefore);
  });

  it('with a process handle that has already exited, returns at once', async () => {
    const child = childExitingAfter(0);
    await once(child, 'exit');
    const startedAt = Date.now();

    await waitForProcessGone(child, NEVER, CAP_MS);

    expect(Date.now() - startedAt).toBeLessThan(1_000);
  });

  it('with only a pid, polls until the process is gone', async () => {
    const child = childExitingAfter(400);
    await once(child, 'spawn');
    const { pid } = child;
    if (pid === undefined) throw new Error('the child has no pid');
    const startedAt = Date.now();

    await waitForProcessGone(undefined, NEVER, CAP_MS, pid);

    expect(isPidAlive(pid)).toBe(false);
    expect(Date.now() - startedAt).toBeLessThan(CAP_MS / 2);
  });

  it('with neither a handle nor a pid, returns at once', async () => {
    const startedAt = Date.now();

    await waitForProcessGone(undefined, NEVER, CAP_MS);

    expect(Date.now() - startedAt).toBeLessThan(1_000);
  });

  it("returns on the app's close event while the process still runs, removing its listener", async () => {
    const child = childExitingAfter(CAP_MS * 2);
    await once(child, 'spawn');
    const listenersBefore = child.listenerCount('exit');

    await waitForProcessGone(child, Promise.resolve(), CAP_MS);

    expect(child.exitCode ?? undefined).toBeUndefined();
    expect(child.listenerCount('exit')).toBe(listenersBefore);
  });

  it('returns at the cap when nothing reports the process gone', async () => {
    const child = childExitingAfter(CAP_MS * 2);
    await once(child, 'spawn');
    const startedAt = Date.now();

    await waitForProcessGone(child, NEVER, 200);

    expect(Date.now() - startedAt).toBeGreaterThanOrEqual(190);
    expect(child.exitCode ?? undefined).toBeUndefined();
  });
});
