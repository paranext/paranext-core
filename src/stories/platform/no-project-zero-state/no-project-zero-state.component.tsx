/**
 * Full-screen "no project open" zero state for Paratext 10 Simple.
 *
 * This component renders APP-LEVEL — what the user sees when they launch the app with no project
 * loaded. It is intentionally NOT inside the WorkspaceShell because the 3-column workspace only
 * makes sense once a project is open.
 *
 * Three variants are exported, each modelling a different mental model for how the "I have no
 * project" situation should be communicated:
 *
 * - VariantARegistryRequired — registry is the only path to a project
 * - VariantBLocalCreation — local creation is a first-class peer to registry
 * - VariantCGallery — empty project gallery (cards-grid mental model)
 *
 * All three share the same prop surface (NoProjectZeroStateProps) so the parent app can swap them
 * via a feature flag without changing wiring.
 */

import * as React from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'platform-bible-react';

// User-facing strings are hoisted to the top of the file so they are easy to extract
// into the %key% / LocalizedStrings infrastructure later. Hardcoded English is fine for
// prototype stories per the orchestration brief.
const STRINGS = {
  appName: 'Paratext 10 Simple',
  // Variant A
  a_eyebrow: 'Welcome',
  a_headline: "Let's open your translation project",
  a_body:
    'Projects in Paratext are managed through the Paratext Registry. Sign in there to see the projects you belong to, then open one here to start translating.',
  a_primary: 'Open Paratext Registry',
  a_secondary: 'Open existing local project',
  a_footnote:
    'New to Paratext? The Registry is where teams are set up — this is the normal first step.',
  // Variant B
  b_headline: 'Start translating',
  b_body:
    'Create a brand-new project on this computer, or open one from the Paratext Registry to join an existing team.',
  b_primary: 'Create new project',
  b_secondary: 'Open Paratext Registry',
  b_tertiary: 'Open existing local project',
  b_primary_caption: 'Best for solo translators and pilots.',
  b_secondary_caption: 'Best for joining a team that already exists.',
  // Variant C
  c_headline: 'Your projects',
  c_body: "You don't have any projects open yet. Once you do, they'll appear here.",
  c_emptyCardTitle: 'No projects yet',
  c_emptyCardBody:
    'Open a project from the Paratext Registry to see it here. You can also create a new one or open one already on this computer.',
  c_primary: 'Open Paratext Registry',
  c_secondary: 'Create new project',
  c_tertiary: 'Open existing local project',
  c_recentSectionTitle: 'Recent projects',
  // Shared
  recent_label: 'Recently opened',
  recent_open: 'Open',
};

// The registry URL is referenced only in handler stub comments / console.log lines —
// no real navigation in stories per the brief.
const REGISTRY_URL = 'https://registry.paratext.org';

export interface NoProjectZeroStateProps {
  /** When true, the "Open existing local project" / Recent affordance becomes visible. */
  hasLocalProjects?: boolean;
  /** Sample local project names to surface in the recent list. */
  recentProjectNames?: string[];
  /** Stub handler — would navigate to https://registry.paratext.org in the real app. */
  onOpenRegistry?: () => void;
  /**
   * Stub handler — would open the "create local project" flow.
   *
   * Only used by Variants B and C. Variant A is the "registry is the only path" flow and
   * intentionally omits this affordance.
   */
  // eslint-disable-next-line react/no-unused-prop-types -- Used by B/C; A is registry-only by design.
  onCreateProject?: () => void;
  /** Stub handler — would open the local-project picker. */
  onOpenLocalProject?: (projectName?: string) => void;
}

// Default handler stubs. The real wiring lives in the renderer / project-service layer;
// these only exist so the stories render even when args are omitted.
function defaultOpenRegistry() {
  // In the real app this hands off to the OS shell / embedded browser to load REGISTRY_URL.
  console.log('[NoProjectZeroState] open registry ->', REGISTRY_URL);
}
function defaultCreateProject() {
  console.log('[NoProjectZeroState] create new project (stub)');
}
function defaultOpenLocalProject(projectName?: string) {
  console.log('[NoProjectZeroState] open local project (stub):', projectName ?? '(picker)');
}

// Shared full-screen frame. min-h-screen so it fills the Storybook iframe; tw:bg-background +
// dark-mode-aware text colors so the page looks intentional in light & dark themes.
function FullScreenFrame({
  children,
  align = 'center',
}: {
  children: React.ReactNode;
  align?: 'center' | 'start';
}) {
  return (
    <div
      className={[
        'pr-twp',
        'tw:flex tw:min-h-screen tw:w-full tw:flex-col tw:bg-background tw:font-sans tw:text-foreground',
        align === 'center' ? 'tw:items-center tw:justify-center' : 'tw:items-stretch',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

// Light branding row, intentionally subtle so the page reads as a calm starting point and
// not an error or splash screen.
function BrandStripe() {
  return (
    <div className="tw:absolute tw:top-0 tw:left-0 tw:flex tw:w-full tw:items-center tw:px-6 tw:py-4 tw:text-xs tw:text-muted-foreground">
      <span className="tw:font-medium tw:tracking-wide">{STRINGS.appName}</span>
    </div>
  );
}

// A compact "recent projects" list used by all three variants when hasLocalProjects is true.
// Kept in this file (rather than its own module) because all three variants embed it
// in slightly different surrounding chrome.
function RecentProjectsList({
  names,
  onOpen,
  variant = 'list',
}: {
  names: string[];
  onOpen: (name: string) => void;
  variant?: 'list' | 'cards';
}) {
  if (variant === 'cards') {
    return (
      <div className="tw:grid tw:w-full tw:grid-cols-1 tw:gap-3 tw:sm:grid-cols-2 tw:lg:grid-cols-3">
        {names.map((name) => (
          <Card
            key={name}
            className="tw:cursor-pointer tw:transition-colors tw:hover:bg-muted/50"
            onClick={() => onOpen(name)}
          >
            <CardHeader>
              <CardTitle className="tw:text-base">{name}</CardTitle>
              <CardDescription>Local project</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    );
  }
  return (
    <div className="tw:flex tw:w-full tw:flex-col tw:gap-1">
      <div className="tw:mb-1 tw:text-xs tw:font-semibold tw:tracking-wide tw:text-muted-foreground tw:uppercase">
        {STRINGS.recent_label}
      </div>
      <ul className="tw:flex tw:flex-col tw:divide-y tw:rounded-md tw:border">
        {names.map((name) => (
          <li
            key={name}
            className="tw:flex tw:items-center tw:justify-between tw:px-3 tw:py-2 tw:text-sm"
          >
            <span>{name}</span>
            <Button variant="ghost" size="sm" onClick={() => onOpen(name)}>
              {STRINGS.recent_open}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const FALLBACK_RECENTS = ['Greek NT Working Draft', 'Acholi Pilot', 'Sample-Translation'];

/* -------------------------------------------------------------------------- */
/* Variant A — Registry-required flow                                         */
/* -------------------------------------------------------------------------- */
/**
 * MENTAL MODEL — "The registry is the source of truth."
 *
 * This variant assumes Paratext 10 Simple cannot meaningfully create a project locally: a project
 * IS a registry entry. The page reads as a one-step onboarding ("go to the registry, come back")
 * rather than a menu of options. Local-project access is a secondary affordance that only appears
 * when there's something local to open (hasLocalProjects=true), so we don't dangle a button that
 * leads to an empty picker.
 *
 * Tone: calm, single-path, "this is normal." Not an error.
 */
export function VariantARegistryRequired({
  hasLocalProjects = false,
  recentProjectNames = FALLBACK_RECENTS,
  onOpenRegistry = defaultOpenRegistry,
  onOpenLocalProject = defaultOpenLocalProject,
}: NoProjectZeroStateProps) {
  return (
    <FullScreenFrame>
      <BrandStripe />
      <div className="tw:flex tw:w-full tw:max-w-xl tw:flex-col tw:items-center tw:gap-6 tw:px-6 tw:text-center">
        <div className="tw:text-xs tw:font-semibold tw:tracking-widest tw:text-muted-foreground tw:uppercase">
          {STRINGS.a_eyebrow}
        </div>
        <h1 className="tw:text-3xl tw:leading-tight tw:font-semibold tw:tracking-tight">
          {STRINGS.a_headline}
        </h1>
        <p className="tw:max-w-md tw:text-base tw:text-muted-foreground">{STRINGS.a_body}</p>
        <div className="tw:flex tw:flex-col tw:items-center tw:gap-2">
          <Button size="lg" onClick={onOpenRegistry}>
            {STRINGS.a_primary}
          </Button>
          {hasLocalProjects ? (
            <Button variant="ghost" size="sm" onClick={() => onOpenLocalProject()}>
              {STRINGS.a_secondary}
            </Button>
          ) : undefined}
        </div>
        <p className="tw:mt-2 tw:max-w-md tw:text-xs tw:text-muted-foreground">
          {STRINGS.a_footnote}
        </p>
        {hasLocalProjects ? (
          <div className="tw:mt-6 tw:w-full">
            <RecentProjectsList
              names={recentProjectNames}
              onOpen={(name) => onOpenLocalProject(name)}
            />
          </div>
        ) : undefined}
      </div>
    </FullScreenFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* Variant B — Local creation available                                       */
/* -------------------------------------------------------------------------- */
/**
 * MENTAL MODEL — "Two equally valid starting points."
 *
 * This variant assumes the user can create a project locally (e.g. a pilot or personal-use project)
 * OR join an existing team via the registry. The page lays out two large, side-by-side cards so
 * neither path feels demoted. The local-project picker is a tertiary text link below the cards so
 * it doesn't compete with the two "new beginning" actions.
 *
 * Tone: agentic, "pick your path."
 */
export function VariantBLocalCreation({
  hasLocalProjects = false,
  recentProjectNames = FALLBACK_RECENTS,
  onOpenRegistry = defaultOpenRegistry,
  onCreateProject = defaultCreateProject,
  onOpenLocalProject = defaultOpenLocalProject,
}: NoProjectZeroStateProps) {
  return (
    <FullScreenFrame>
      <BrandStripe />
      <div className="tw:flex tw:w-full tw:max-w-3xl tw:flex-col tw:items-center tw:gap-8 tw:px-6">
        <div className="tw:flex tw:flex-col tw:items-center tw:gap-3 tw:text-center">
          <h1 className="tw:text-3xl tw:font-semibold tw:tracking-tight">{STRINGS.b_headline}</h1>
          <p className="tw:max-w-xl tw:text-base tw:text-muted-foreground">{STRINGS.b_body}</p>
        </div>
        <div className="tw:grid tw:w-full tw:grid-cols-1 tw:gap-4 tw:sm:grid-cols-2">
          <Card className="tw:flex tw:flex-col">
            <CardHeader>
              <CardTitle>{STRINGS.b_primary}</CardTitle>
              <CardDescription>{STRINGS.b_primary_caption}</CardDescription>
            </CardHeader>
            <CardContent className="tw:mt-auto">
              <Button className="tw:w-full" size="lg" onClick={onCreateProject}>
                {STRINGS.b_primary}
              </Button>
            </CardContent>
          </Card>
          <Card className="tw:flex tw:flex-col">
            <CardHeader>
              <CardTitle>{STRINGS.b_secondary}</CardTitle>
              <CardDescription>{STRINGS.b_secondary_caption}</CardDescription>
            </CardHeader>
            <CardContent className="tw:mt-auto">
              <Button variant="outline" className="tw:w-full" size="lg" onClick={onOpenRegistry}>
                {STRINGS.b_secondary}
              </Button>
            </CardContent>
          </Card>
        </div>
        <Button variant="link" onClick={() => onOpenLocalProject()}>
          {STRINGS.b_tertiary}
        </Button>
        {hasLocalProjects ? (
          <div className="tw:w-full">
            <RecentProjectsList
              names={recentProjectNames}
              onOpen={(name) => onOpenLocalProject(name)}
            />
          </div>
        ) : undefined}
      </div>
    </FullScreenFrame>
  );
}

/* -------------------------------------------------------------------------- */
/* Variant C — Project gallery (empty)                                         */
/* -------------------------------------------------------------------------- */
/**
 * MENTAL MODEL — "Your projects live here, the page is just empty today."
 *
 * This variant frames the screen as the persistent home for the user's projects, not as a one-time
 * onboarding moment. Even when there are no projects, the gallery scaffolding is visible: a
 * heading, a section title, and a placeholder card where a real project card would be. When
 * hasLocalProjects flips on, the placeholder is replaced with actual project cards above the "open
 * another" action area.
 *
 * The actions area exposes all three handlers (registry, create, local) as equal peers because once
 * the user is in this view they may be looking for any of them.
 *
 * Tone: confident, durable surface — the kind of screen a returning user wouldn't mind seeing
 * again. Not an error, not a single-purpose onboarding.
 */
export function VariantCGallery({
  hasLocalProjects = false,
  recentProjectNames = FALLBACK_RECENTS,
  onOpenRegistry = defaultOpenRegistry,
  onCreateProject = defaultCreateProject,
  onOpenLocalProject = defaultOpenLocalProject,
}: NoProjectZeroStateProps) {
  return (
    <FullScreenFrame align="start">
      <div className="tw:mx-auto tw:flex tw:w-full tw:max-w-5xl tw:flex-1 tw:flex-col tw:gap-8 tw:px-6 tw:py-12">
        <header className="tw:flex tw:flex-col tw:gap-1">
          <div className="tw:text-xs tw:font-medium tw:tracking-widest tw:text-muted-foreground tw:uppercase">
            {STRINGS.appName}
          </div>
          <h1 className="tw:text-2xl tw:font-semibold tw:tracking-tight">{STRINGS.c_headline}</h1>
          <p className="tw:text-sm tw:text-muted-foreground">{STRINGS.c_body}</p>
        </header>

        <section className="tw:flex tw:flex-col tw:gap-3">
          <h2 className="tw:text-sm tw:font-semibold tw:tracking-wide tw:text-muted-foreground tw:uppercase">
            {STRINGS.c_recentSectionTitle}
          </h2>
          {hasLocalProjects ? (
            <RecentProjectsList
              variant="cards"
              names={recentProjectNames}
              onOpen={(name) => onOpenLocalProject(name)}
            />
          ) : (
            <Card className="tw:border-dashed">
              <CardHeader>
                <CardTitle className="tw:text-base">{STRINGS.c_emptyCardTitle}</CardTitle>
                <CardDescription>{STRINGS.c_emptyCardBody}</CardDescription>
              </CardHeader>
            </Card>
          )}
        </section>

        <section className="tw:mt-2 tw:flex tw:flex-wrap tw:items-center tw:gap-2">
          <Button onClick={onOpenRegistry}>{STRINGS.c_primary}</Button>
          <Button variant="outline" onClick={onCreateProject}>
            {STRINGS.c_secondary}
          </Button>
          <Button variant="ghost" onClick={() => onOpenLocalProject()}>
            {STRINGS.c_tertiary}
          </Button>
        </section>
      </div>
    </FullScreenFrame>
  );
}
