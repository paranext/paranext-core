import { bench, describe } from 'vitest';
import { cn as cnCompat } from '../utils';
import { cnBaseline } from './cn-baseline';
import { cnOptimized } from './cn-optimized';

// Scenarios mirror real-world usage in this repo's shadcn-ui components plus a
// few stress cases.

const SCENARIOS = {
  single: ['tw:p-4'],

  buttonTypical: [
    'tw:inline-flex tw:items-center tw:justify-center tw:gap-2 tw:rounded-md tw:text-sm tw:font-medium tw:transition-colors',
    'tw:focus-visible:outline-none tw:focus-visible:ring-2 tw:disabled:pointer-events-none tw:disabled:opacity-50',
    'tw:bg-primary tw:text-primary-foreground tw:hover:bg-primary/90',
    'tw:h-10 tw:px-4 tw:py-2',
  ],

  // Real string from dialog.tsx (DialogContent, ~22 classes, all TW4)
  dialogHeavy: [
    'pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95',
    'tw:bg-secondary',
  ],

  // Conditional-object pattern
  conditional: [
    'tw:p-4 tw:bg-primary tw:text-primary-foreground',
    {
      'tw:border-blue-500': true,
      'tw:text-red-500': true,
      'tw:h-20': false,
      'tw:m-2': true,
    },
    'tw:rounded-md',
  ],

  // Pure TW3 classes (extension scenario the compat layer was added for)
  tw3Only: [
    'tw-flex tw-items-center tw-gap-2',
    'tw-bg-blue-500 tw-text-white',
    'hover:tw-bg-blue-600',
    'tw-p-4 tw-m-2',
  ],

  // The actual conflict case the compat layer was designed for
  tw3vsTw4Conflict: [
    'tw-p-4 tw-bg-red-500 hover:tw-bg-red-600 tw--mt-4',
    'tw:p-8 tw:bg-blue-500 tw:hover:bg-blue-600 tw:-mt-2',
  ],

  // Many classes, deep variants — stress test
  stressMany: [
    'tw:flex tw:items-center tw:justify-between tw:gap-2 tw:rounded-md',
    'tw:bg-primary tw:text-primary-foreground tw:shadow tw:ring-1 tw:ring-foreground/10',
    'tw:hover:bg-primary/90 tw:focus-visible:outline-none tw:focus-visible:ring-2',
    'tw:disabled:pointer-events-none tw:disabled:opacity-50',
    'tw:dark:bg-secondary tw:dark:text-secondary-foreground',
    'tw:sm:p-4 tw:md:p-6 tw:lg:p-8',
    'tw:peer-focus:ring-blue-500 tw:group-hover:bg-accent',
    'tw:data-open:animate-in tw:data-closed:animate-out',
    'tw:rtl:flex-row-reverse',
    'pr-twp some-non-tw-class',
  ],
};

// Sanity: we want the benchmark loop body to actually do work — not get
// optimized away. We add the result length to a sink so V8 can't eliminate it.
let sink = 0;

function runCompat(args: unknown[]) {
  // @ts-expect-error variadic spread
  sink += cnCompat(...args).length;
}
function runBaseline(args: unknown[]) {
  // @ts-expect-error variadic spread
  sink += cnBaseline(...args).length;
}
function runOptimized(args: unknown[]) {
  // @ts-expect-error variadic spread
  sink += cnOptimized(...args).length;
}

for (const [name, args] of Object.entries(SCENARIOS)) {
  describe(name, () => {
    bench(
      'compat (TW3+TW4)',
      () => {
        runCompat(args);
      },
      { iterations: 5000, warmupIterations: 500 },
    );

    bench(
      'baseline (extendTailwindMerge prefix:tw)',
      () => {
        runBaseline(args);
      },
      { iterations: 5000, warmupIterations: 500 },
    );

    bench(
      'compat-optimized (fast-path when no tw-)',
      () => {
        runOptimized(args);
      },
      { iterations: 5000, warmupIterations: 500 },
    );
  });
}

// Workload that simulates one render of a non-trivial component (~20 cn calls).
describe('mixed render (one component render ≈ 20 cn calls)', () => {
  const calls = [
    SCENARIOS.buttonTypical,
    SCENARIOS.dialogHeavy,
    SCENARIOS.conditional,
    SCENARIOS.single,
    SCENARIOS.stressMany,
    SCENARIOS.buttonTypical,
    SCENARIOS.dialogHeavy,
    SCENARIOS.conditional,
    SCENARIOS.single,
    SCENARIOS.stressMany,
    SCENARIOS.buttonTypical,
    SCENARIOS.dialogHeavy,
    SCENARIOS.conditional,
    SCENARIOS.single,
    SCENARIOS.stressMany,
    SCENARIOS.buttonTypical,
    SCENARIOS.dialogHeavy,
    SCENARIOS.conditional,
    SCENARIOS.single,
    SCENARIOS.stressMany,
  ];

  bench(
    'compat',
    () => {
      for (const args of calls) runCompat(args);
    },
    { iterations: 1000, warmupIterations: 200 },
  );

  bench(
    'baseline',
    () => {
      for (const args of calls) runBaseline(args);
    },
    { iterations: 1000, warmupIterations: 200 },
  );

  bench(
    'compat-optimized',
    () => {
      for (const args of calls) runOptimized(args);
    },
    { iterations: 1000, warmupIterations: 200 },
  );
});

// Suppress unused warning while keeping V8 honest. Without referencing `sink`
// outside the bench bodies, TS might complain in some configs.
if (typeof globalThis !== 'undefined') {
  (globalThis as Record<string, unknown>).__bench_sink__ = sink;
}
