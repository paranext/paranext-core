import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import {
  DEFAULT_LANG,
  getLocalized,
} from '@/components/advanced/project-plan-dialog/localized.utils';
import type {
  CheckGroup,
  CheckSetting,
  PlanStage,
  StageId,
} from '@/components/advanced/project-plan-dialog/types';

const NONE_VALUE = '__none__';

export const CHECK_GROUPS: CheckGroup[] = [
  {
    id: 'basic-checks',
    label: 'Basic Checks',
    items: [
      { id: 'basic.markers', name: 'Markers', group: 'basic-checks' },
      { id: 'basic.punctuation', name: 'Punctuation', group: 'basic-checks' },
      { id: 'basic.capitalization', name: 'Capitalization', group: 'basic-checks' },
      { id: 'basic.repeated-words', name: 'Repeated words', group: 'basic-checks' },
      {
        id: 'basic.unmatched-pairs',
        name: 'Unmatched pairs of punctuation',
        group: 'basic-checks',
      },
      { id: 'basic.quotations', name: 'Quotations', group: 'basic-checks' },
      { id: 'basic.numbers', name: 'Numbers', group: 'basic-checks' },
      { id: 'basic.references', name: 'References', group: 'basic-checks' },
      { id: 'basic.chapter-verse-numbers', name: 'Chapter / verse numbers', group: 'basic-checks' },
      { id: 'basic.characters', name: 'Characters', group: 'basic-checks' },
      { id: 'basic.matched-pairs', name: 'Matched pairs of punctuation', group: 'basic-checks' },
      { id: 'basic.unwanted-patterns', name: 'Unwanted patterns', group: 'basic-checks' },
    ],
  },
  {
    id: 'spelling',
    label: 'Spelling',
    items: [
      { id: 'spelling.spelling', name: 'Spelling', group: 'spelling' },
      { id: 'spelling.word-list', name: 'Word list', group: 'spelling' },
    ],
  },
  {
    id: 'unresolved-notes',
    label: 'Unresolved Notes',
    items: [
      { id: 'notes.spelling-discussion', name: 'Spelling discussion', group: 'unresolved-notes' },
      { id: 'notes.rendering-discussion', name: 'Rendering discussion', group: 'unresolved-notes' },
      { id: 'notes.consultant', name: 'Consultant notes', group: 'unresolved-notes' },
      { id: 'notes.translator', name: 'Translator notes', group: 'unresolved-notes' },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    items: [
      { id: 'other.parallel-passages', name: 'Parallel passages', group: 'other' },
      { id: 'other.interlinear', name: 'Interlinear', group: 'other' },
      { id: 'other.biblical-terms', name: 'Biblical terms', group: 'other' },
    ],
  },
  {
    id: 'back-translation',
    label: 'Back Translation, Daughter Translation',
    items: [{ id: 'back.placeholder', name: '(none configured)', group: 'back-translation' }],
  },
];

interface ChecksTabProps {
  stages: PlanStage[];
  checks: CheckSetting[];
  onChecksChange: (next: CheckSetting[]) => void;
}

export function ChecksTab({ stages, checks, onChecksChange }: ChecksTabProps) {
  const findCheck = (checkId: string) => checks.find((c) => c.checkId === checkId);

  const updateCheck = (checkId: string, patch: Partial<CheckSetting>) => {
    const existing = findCheck(checkId);
    if (existing) {
      onChecksChange(checks.map((c) => (c.checkId === checkId ? { ...c, ...patch } : c)));
    } else {
      onChecksChange([
        ...checks,
        { checkId, notifyOnlyInStage: null, requiredInStage: null, ...patch },
      ]);
    }
  };

  return (
    <div className="tw:flex tw:flex-col tw:gap-4">
      <div className="tw:grid tw:grid-cols-[minmax(220px,1fr)_minmax(160px,1fr)_minmax(160px,1fr)] tw:gap-3 tw:border-b tw:pb-2 tw:text-sm tw:font-semibold">
        <div />
        <div>
          <div>Notify only (optional)</div>
          <div className="tw:text-xs tw:font-normal tw:text-muted-foreground">
            Show summary of errors in All Tasks and My Tasks, but do not require checks to pass.
          </div>
        </div>
        <div>
          <div>Required in stage</div>
          <div className="tw:text-xs tw:font-normal tw:text-muted-foreground">
            Checks must pass in this stage before the next stage can begin.
          </div>
        </div>
      </div>

      {CHECK_GROUPS.map((group) => (
        <details key={group.id} open className="tw:rounded tw:border tw:p-2">
          <summary className="tw:cursor-pointer tw:text-sm tw:font-semibold">{group.label}</summary>
          <div className="tw:mt-2 tw:flex tw:flex-col tw:gap-2">
            {group.items.map((item) => {
              const setting = findCheck(item.id);
              return (
                <div
                  key={item.id}
                  className="tw:grid tw:grid-cols-[minmax(220px,1fr)_minmax(160px,1fr)_minmax(160px,1fr)] tw:items-center tw:gap-3"
                >
                  <div className="tw:text-sm">{item.name}</div>
                  <StageSelect
                    stages={stages}
                    value={setting?.notifyOnlyInStage ?? null}
                    onChange={(v) => updateCheck(item.id, { notifyOnlyInStage: v })}
                  />
                  <StageSelect
                    stages={stages}
                    value={setting?.requiredInStage ?? null}
                    onChange={(v) => updateCheck(item.id, { requiredInStage: v })}
                  />
                </div>
              );
            })}
          </div>
        </details>
      ))}
    </div>
  );
}

function StageSelect({
  stages,
  value,
  onChange,
}: {
  stages: PlanStage[];
  value: StageId | null;
  onChange: (next: StageId | null) => void;
}) {
  return (
    <Select
      value={value ?? NONE_VALUE}
      onValueChange={(v) => onChange(v === NONE_VALUE ? null : v)}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="tw:z-600">
        <SelectItem value={NONE_VALUE}>—</SelectItem>
        {stages.map((s) => (
          <SelectItem key={s.id} value={s.id}>
            {getLocalized(s.names, DEFAULT_LANG) || '(unnamed stage)'}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ChecksTab;
