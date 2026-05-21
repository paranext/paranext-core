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
    for (const f of fallbacks) {
      const v = map[f];
      if (v && v.length > 0) return v;
    }
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
  const set = new Set<LangCode>();
  const collect = (m: LocalizedMap | undefined) => {
    if (!m) return;
    for (const k of Object.keys(m)) set.add(k);
  };
  for (const stage of stages) {
    collect(stage.names);
    collect(stage.descriptions);
    for (const task of stage.tasks) {
      collect(task.names);
      collect(task.descriptions);
    }
  }
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
