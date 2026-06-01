import type { PlanStage } from '@/components/advanced/project-plan-dialog/types';

export type LangCode = string;

export const DEFAULT_LANG: LangCode = 'en';

export type LocalizedMap = Record<LangCode, string>;

export function getLocalized(
  map: LocalizedMap | undefined,
  lang: LangCode,
  fallback?: LangCode | LangCode[],
): string {
  if (!map) return '';
  const direct = map[lang];
  if (direct && direct.length > 0) return direct;
  if (fallback) {
    const fallbacks = Array.isArray(fallback) ? fallback : [fallback];
    const found = fallbacks
      .map((f) => map[f])
      .find((v): v is string => typeof v === 'string' && v.length > 0);
    if (found) return found;
  }
  return '';
}

export function langsWithContent(map: LocalizedMap | undefined): LangCode[] {
  if (!map) return [];
  return Object.keys(map).filter((k) => {
    const v = map[k];
    return typeof v === 'string' && v.length > 0;
  });
}

export function planLangs(stages: PlanStage[]): LangCode[] {
  const keysOf = (m: LocalizedMap | undefined): LangCode[] => (m ? Object.keys(m) : []);
  const all = stages.flatMap((stage) => [
    ...keysOf(stage.names),
    ...keysOf(stage.descriptions),
    ...stage.tasks.flatMap((task) => [...keysOf(task.names), ...keysOf(task.descriptions)]),
  ]);
  const set = new Set<LangCode>(all);
  if (set.size === 0) set.add(DEFAULT_LANG);
  return Array.from(set).sort();
}

/**
 * Like {@link planLangs}, but only returns languages that actually have a non-empty value somewhere
 * in the plan — i.e., languages the plan is genuinely localized into.
 */
export function planLangsWithContent(stages: PlanStage[]): LangCode[] {
  const all = stages.flatMap((stage) => [
    ...langsWithContent(stage.names),
    ...langsWithContent(stage.descriptions),
    ...stage.tasks.flatMap((task) => [
      ...langsWithContent(task.names),
      ...langsWithContent(task.descriptions),
    ]),
  ]);
  const set = new Set<LangCode>(all);
  if (set.size === 0) set.add(DEFAULT_LANG);
  return Array.from(set).sort();
}

export function langDisplayName(code: LangCode): string {
  try {
    const dn = new Intl.DisplayNames([DEFAULT_LANG], { type: 'language' });
    const name = dn.of(code);
    if (name && name !== code) return name;
  } catch {
    // ignore — fall back to code
  }
  return code;
}
