/**
 * Webpack plugin that runs the Tailwind CSS prebuild at the start of each build cycle.
 *
 * This ensures the prebuilt Tailwind CSS is always up-to-date, including during watch mode when
 * content files change and Tailwind needs to regenerate its CSS.
 *
 * Set the environment variable `PB_DISABLE_TAILWIND_PREBUILD=true` to disable this optimization and
 * use the normal webpack Tailwind processing instead.
 */

import type { Compiler } from 'webpack';
import { prebuildTailwind } from '../lib/prebuild-tailwind';

const PLUGIN_NAME = 'TailwindPrebuildWebpackCompilerPlugin';

/** Whether the tailwind prebuild optimization is disabled via environment variable */
export const isTailwindPrebuildDisabled = process.env.PB_DISABLE_TAILWIND_PREBUILD === 'true';

/**
 * Webpack plugin that runs `prebuildTailwind()` at the start of each compilation.
 *
 * In watch mode, this ensures Tailwind CSS is regenerated whenever webpack detects changes, which
 * is important because Tailwind scans content files to determine which classes to include.
 */
export default class TailwindPrebuildWebpackCompilerPlugin {
  private tailwindPrebuiltPromise: Promise<void> | null = null;

  apply(compiler: Compiler): void {
    // Skip if tailwind prebuild is disabled via environment variable
    if (isTailwindPrebuildDisabled) return;
    // Use the 'beforeCompile' hook to run before each compilation starts.
    // This hook runs for both initial builds and subsequent rebuilds in watch mode.
    // It's an async hook, so we use tapPromise to properly await the prebuild.
    compiler.hooks.beforeCompile.tapPromise(PLUGIN_NAME, async () => {
      if (!this.tailwindPrebuiltPromise) {
        this.tailwindPrebuiltPromise = prebuildTailwind();
      }
      await this.tailwindPrebuiltPromise;
    });
    // Use the `invalid` hook to track when to allow this plugin to run again.
    // This hook is called when a file change is detected in watch mode, before a rebuild starts.
    compiler.hooks.invalid.tap(PLUGIN_NAME, () => {
      // Clear the promise so the prebuild runs again on the next compilation
      this.tailwindPrebuiltPromise = null;
    });
  }
}

export const tailwindPrebuildWebpackCompilerPluginSingleton =
  new TailwindPrebuildWebpackCompilerPlugin();
