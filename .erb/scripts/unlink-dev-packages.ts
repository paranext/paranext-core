import { DEV_PACKAGES, execInRepo } from './dev-package-utils';

function unlinkDevPackages(): void {
  try {
    DEV_PACKAGES.forEach((p) => {
      console.log(`Running ${p.repoLinkScript}:unlink`);
      execInRepo(`npm run ${p.repoLinkScript}:unlink`);
    });

    console.log('Unlinked dev packages');
  } catch (err) {
    console.warn(
      'Warning: Failed to unlink dev packages.',
      err instanceof Error ? err.message : err,
    );
  }
}

unlinkDevPackages();
