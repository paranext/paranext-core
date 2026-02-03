import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

export const REPO_ROOT = path.resolve(__dirname, '..', '..');
export const SCRIPTURE_EDITORS_PATH = path.resolve(REPO_ROOT, '..', 'scripture-editors');

export function scriptureEditorsExists(): boolean {
  return fs.existsSync(SCRIPTURE_EDITORS_PATH);
}

export function execInScriptureEditors(cmd: string): void {
  const env = { ...process.env, VOLTA_FEATURE_PNPM: '1' };
  execSync(cmd, { stdio: 'inherit', cwd: SCRIPTURE_EDITORS_PATH, env });
}

export function execInRepo(cmd: string): void {
  execSync(cmd, { stdio: 'inherit', cwd: REPO_ROOT });
}

export const DEVPUB_TARGETS = ['platform-editor', 'utilities'] as const;
export const REPO_LINK_SCRIPTS = ['editor', 'utils'] as const;
