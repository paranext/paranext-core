/**
 * Spawns the Roslyn-based `Paranext.WireSurface` .NET tool (`c-sharp/Paranext.WireSurface`) to scan
 * the C# data provider project for wire-visible registrations, and returns its validated result.
 *
 * The tool talks over the filesystem rather than stdout: the tracked-file list can be arbitrarily
 * long (every `.cs` file under `c-sharp/**`), and JSON on stdout would have to be disentangled from
 * whatever the tool's own dependencies (MSBuild, in particular) write there during project load.
 * Both the input list and the output document instead live in a private temp directory, cleaned up
 * unconditionally once the run completes or fails.
 */

import * as childProcess from 'child_process';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { CSharpScanResult, isCSharpScanResult } from './wire-surface.model';

/** The subset of `child_process.spawnSync` this module calls, injectable so tests never shell out. */
type SpawnCSharpScanner = (
  command: string,
  args: readonly string[],
  options: childProcess.SpawnSyncOptionsWithStringEncoding,
) => childProcess.SpawnSyncReturns<string>;

const WIRE_SURFACE_TOOL_PROJECT = 'c-sharp/Paranext.WireSurface/Paranext.WireSurface.csproj';
const DATA_PROVIDER_PROJECT = 'c-sharp/ParanextDataProvider.csproj';

/**
 * Runs the Roslyn C# wire-surface scanner over `trackedCSharpFiles` and returns its parsed,
 * validated result. `trackedCSharpFiles` should be exactly the repo-relative, POSIX-separated paths
 * `generate-wire-surface.ts`'s own digest is built from, so the scanner's declared surface and the
 * generator's tracked-file digest can never silently diverge.
 *
 * `spawn` defaults to the real `child_process.spawnSync` and exists as a parameter purely so unit
 * tests can substitute a fake process without touching the filesystem or a real `dotnet` install.
 */
export function runCSharpWireSurfaceScanner(
  repoRoot: string,
  trackedCSharpFiles: readonly string[],
  spawn: SpawnCSharpScanner = childProcess.spawnSync,
): CSharpScanResult {
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wire-surface-'));
  try {
    const trackedFilesPath = path.join(tempDir, 'tracked-csharp-files.txt');
    const outputPath = path.join(tempDir, 'wire-surface-scan-result.json');
    fs.writeFileSync(trackedFilesPath, `${trackedCSharpFiles.join('\n')}\n`);

    const result = spawn(
      'dotnet',
      [
        'run',
        '--project',
        WIRE_SURFACE_TOOL_PROJECT,
        '--',
        '--project',
        path.resolve(repoRoot, DATA_PROVIDER_PROJECT),
        '--repo-root',
        repoRoot,
        '--tracked-files',
        trackedFilesPath,
        '--out',
        outputPath,
      ],
      { cwd: repoRoot, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 },
    );

    if (result.error) {
      throw new Error(
        `Could not run the C# wire-surface scanner (dotnet run --project ${WIRE_SURFACE_TOOL_PROJECT}): ` +
          `${result.error.message}`,
      );
    }
    if (result.status !== 0) {
      throw new Error(
        `The C# wire-surface scanner exited with status ${result.status}.\n` +
          `stderr:\n${result.stderr}`,
      );
    }

    const raw = fs.readFileSync(outputPath, 'utf8');
    const parsed: unknown = JSON.parse(raw);
    if (!isCSharpScanResult(parsed)) {
      throw new Error(
        `The C# wire-surface scanner's output at ${outputPath} is not a well-formed ` +
          "{ registrations, dynamicRegistrations } document (see wire-surface.model.ts's " +
          'isCSharpScanResult) -- the scanner and this generator have drifted out of contract.',
      );
    }
    return parsed;
  } finally {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
}
