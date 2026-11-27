import { Check, X } from 'lucide-react';
import { findIconConflicts } from './icon-conflicts.util';
import type { IconCatalogEntry } from './icon-usage.model';

const entries: IconCatalogEntry[] = [
  {
    name: 'X',
    library: 'lucide-react',
    component: X,
    usages: [
      { location: 'a.tsx', meaning: 'Close', concept: 'close' },
      { location: 'b.tsx', meaning: 'Deny', concept: 'deny-check' },
    ],
  },
  {
    name: 'Check',
    library: 'lucide-react',
    component: Check,
    usages: [
      { location: 'c.tsx', meaning: 'Accept', concept: 'submit' },
      { location: 'd.tsx', meaning: 'Close, right-to-left', concept: 'close', isMirrored: true },
    ],
  },
];

describe('findIconConflicts', () => {
  it('flags an icon drawn for several concepts', () => {
    expect(findIconConflicts(entries)).toContainEqual({
      kind: 'same-icon',
      id: 'icon:X',
      icon: 'X',
      concepts: ['close', 'deny-check'],
    });
  });

  it('flags a concept drawn with several icons', () => {
    const withSecondSubmit: IconCatalogEntry[] = [
      ...entries,
      {
        name: 'Plus',
        library: 'lucide-react',
        component: X,
        usages: [{ location: 'e.tsx', meaning: 'Send', concept: 'submit' }],
      },
    ];
    expect(findIconConflicts(withSecondSubmit)).toContainEqual({
      kind: 'same-concept',
      id: 'concept:submit',
      concept: 'submit',
      icons: ['Check', 'Plus'],
    });
  });

  it('ignores mirrored usages', () => {
    const ids = findIconConflicts(entries).map((conflict) => conflict.id);
    expect(ids).not.toContain('concept:close');
    expect(ids).not.toContain('icon:Check');
  });
});
