import { execInRepo, REPO_LINK_SCRIPTS } from './dev-package-utils';

function unlinkDevPackages(): void {
  try {
    REPO_LINK_SCRIPTS.forEach((s) => {
      console.log(`Running ${s}:unlink`);
      execInRepo(`npm run ${s}:unlink`);
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
