// Hypothetical optimization of the compat `cn`: fast-path when the resolved
// class string contains no TW3 (`tw-`) prefix at all. In that case we can skip
// the normalize/restore round-trip entirely and just call `twMerge` directly,
// matching baseline performance for the all-TW4 case (which is the dominant
// case in PBR's own components).
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type PrefixInfo = { normalized: string; original: string };

function splitClassSegments(cls: string): string[] {
  const segments: string[] = [];
  let current = '';
  let bracketDepth = 0;
  for (let i = 0; i < cls.length; i++) {
    const char = cls[i];
    if (char === '[') bracketDepth += 1;
    else if (char === ']') bracketDepth -= 1;
    if (char === ':' && bracketDepth === 0) {
      segments.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  segments.push(current);
  return segments;
}

function normalizeTw3ToTw4(token: string): PrefixInfo {
  if (token.startsWith('tw:')) return { normalized: token, original: token };
  const segments = splitClassSegments(token);
  const negFormBIndex = segments.findIndex((s) => s.startsWith('-tw-'));
  if (negFormBIndex !== -1) {
    const utility = segments[negFormBIndex].slice(4);
    const variants = segments.filter((_, i) => i !== negFormBIndex);
    return { normalized: `tw:${[...variants, `-${utility}`].join(':')}`, original: token };
  }
  const importantFormIndex = segments.findIndex((s) => s.startsWith('!tw-'));
  if (importantFormIndex !== -1) {
    const utility = segments[importantFormIndex].slice(4);
    const variants = segments.filter((_, i) => i !== importantFormIndex);
    return { normalized: `tw:${[...variants, `!${utility}`].join(':')}`, original: token };
  }
  const lastSegment = segments[segments.length - 1];
  if (lastSegment.startsWith('tw-')) {
    const utility = lastSegment.slice(3);
    const variants = segments.slice(0, -1);
    return { normalized: `tw:${[...variants, utility].join(':')}`, original: token };
  }
  return { normalized: token, original: token };
}

function restoreToOriginalFormat(normalizedClass: string, originalFormat: string): string {
  if (originalFormat.startsWith('tw:')) return normalizedClass;
  const segments = splitClassSegments(normalizedClass);
  if (segments[0] !== 'tw') return normalizedClass;
  const variants = segments.slice(1, -1);
  const utility = segments[segments.length - 1];
  const origSegments = splitClassSegments(originalFormat);
  const wasNegFormB = origSegments.some((s) => s.startsWith('-tw-'));
  const wasImportantForm = origSegments.some((s) => s.startsWith('!tw-'));
  if (wasNegFormB && utility.startsWith('-'))
    return [...variants, `-tw-${utility.slice(1)}`].join(':');
  if (wasImportantForm && utility.startsWith('!'))
    return [...variants, `!tw-${utility.slice(1)}`].join(':');
  return [...variants, `tw-${utility}`].join(':');
}

// Cheap probe: does this string contain any TW3 prefix form at all?
// All three TW3 forms (`tw-X`, `-tw-X`, `!tw-X`) contain the substring `tw-`,
// so a single `indexOf` check covers everything.
function hasTw3Prefix(s: string): boolean {
  return s.indexOf('tw-') !== -1;
}

export function cnOptimized(...inputs: ClassValue[]) {
  const resolved = clsx(inputs);
  if (!resolved) return resolved;

  // Fast path: pure TW4 (or non-tailwind) — skip normalize/restore.
  if (!hasTw3Prefix(resolved)) return twMerge(resolved);

  // Slow path: same as the original compat implementation.
  const tokens = resolved.split(' ').filter(Boolean);
  const lastSeenOriginal = new Map<string, string>();
  const normalizedTokens: string[] = [];
  tokens.forEach((token) => {
    const info = normalizeTw3ToTw4(token);
    lastSeenOriginal.set(info.normalized, info.original);
    normalizedTokens.push(info.normalized);
  });
  const merged = twMerge(normalizedTokens.join(' '));
  const mergedTokens = merged.split(' ').filter(Boolean);
  const restored = mergedTokens.map((mergedToken) => {
    const original = lastSeenOriginal.get(mergedToken);
    if (!original) return mergedToken;
    return restoreToOriginalFormat(mergedToken, original);
  });
  return restored.join(' ');
}
