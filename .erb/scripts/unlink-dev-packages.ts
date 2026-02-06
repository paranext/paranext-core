import { DEV_PACKAGES, execInRepo } from './dev-package-utils';

function unlinkDevPackages(): void {
  try {
    DEV_PACKAGES.forEach((p) => {
      console.log(`Running ${p.repoLinkScript}:unlink`);
      execInRepo(`npm run ${p.repoLinkScript}:unlink`);
    });

    console.log('Unlinked dev packages');
  } catch (err) {
    console.error('Error: Failed to unlink dev packages.');
    // Log the error object for richer context, then the stack if available
    console.error('Error object:', err);
    if (err instanceof Error) {
      console.error('Stack:', err.stack);
    }
    process.exit(1);
  }
}

unlinkDevPackages();
