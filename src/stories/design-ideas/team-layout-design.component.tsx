/*
 * The Team layout dialog (`src/renderer/components/dialogs/team-layout.component.tsx`) with the
 * unified pickers in place of its `ResourcePickerDialog` sub-dialogs: the same panels in the order
 * the columns appear in Simple — the base or model text, then the editor with the team's USFM lock,
 * then the third column's Bible texts and Commentaries, each a multi-select dropdown like the Text
 * collection's own — and the real dialog's strings where it has them. Those two lists are what
 * makes a resource a team resource: whatever is in either, everyone on the project gets and cannot
 * remove, and it is also in their Text collection. "More resources…" in either picker does what it
 * does outside the dialog.
 *
 * Saving follows the "Save and sync" design: the primary button saves and sends the layout to the
 * team in one go (a Send/Receive for the project), and its menu also offers Save alone, which sends
 * it at the next sync. Both wait until the layout has been changed. A layout saved but not sent yet
 * (saved alone, or its Send/Receive failed) opens with a notice saying so and a Sync now button.
 * Nothing here saves beyond the story's own state.
 */

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Label,
  Spinner,
  Switch,
} from 'platform-bible-react';
import { ChevronDown } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { getLocalizedStrings } from '../../../.storybook/localization.utils';
import type { UnifiedItem, UnifiedItemAction, UnifiedItemType } from './home-unified.component';
import { UnifiedProjectPicker } from './unified-project-picker.component';
import { TEAM_LAYOUT_SAVED_DATE_FORMAT, useTeamLayoutSend } from './use-team-layout-send.hook';
import type { UnifiedCatalog } from './use-unified-catalog.hook';

/** The keys this dialog shows from the real Team layout dialog's localized strings. */
const STRING_KEYS = [
  '%shareLayoutDialog_baseOrModelText_label%',
  '%shareLayoutDialog_cancel_label%',
  '%shareLayoutDialog_reviewAndSyncNotice%',
  '%shareLayoutDialog_tab_commentaryResources%',
  '%shareLayoutDialog_tab_scriptureResources%',
  '%shareLayoutDialog_teamLayout_title%',
  '%shareLayoutDialog_teamLock_description%',
  '%shareLayoutDialog_teamLock_label%',
  '%webView_modelTextPanel_emptyState_baseOrModel_summary%',
] as const;
const STRINGS = getLocalizedStrings([...STRING_KEYS]);
const t = (key: (typeof STRING_KEYS)[number]) => STRINGS[key] ?? key;

/** This design idea's own strings, for the actions Get resources offers when opened from here. */
const DESIGN_STRINGS = {
  selectBibleTexts: 'Select Bible texts',
  isModelText: 'The base or model text',
  selectCommentaries: 'Select commentaries',
  teamResources: 'Team resources ({count})',
  teamResourcesDescription:
    'Everyone on the {project} project gets the resources in these lists and cannot remove them. They are also available in the text collection.',
  useAsModelText: 'Use as model text',
  useAsModelTextTooltip: 'Use as base or model text for {project}',
  useIn: 'Use in {list}',
  useInTooltip: 'Add to the team’s {list} for {project}',
  inList: 'In {list}',
  saveAndSync: 'Save and sync',
  saveAndSyncHint: 'Saves, then syncs {project}. Your unsent text edits go too.',
  save: 'Save',
  saveHint: 'Your team gets it at your next sync',
  moreWaysToSave: 'More ways to save',
  notSent: 'Saved on this computer on {date}. Your team gets it after you sync {project}.',
  syncNow: 'Sync now',
} as const;

/** How the administrator chose to save. */
export type TeamLayoutSaveOptions = {
  /** Send/Receive the project right after saving, so the team gets the layout. */
  send: boolean;
};

export type TeamLayoutDesignResult = {
  modelTextId: string | undefined;
  scriptureIds: string[];
  commentaryIds: string[];
  isStructureLocked: boolean;
};

/**
 * What a row of Get resources offers when this dialog opened it: the same shape as `HomeUnified`'s
 * `rowUseAction`, plus whether using a row closes Get resources (the model text, which is one) or
 * leaves it open for more (the lists).
 */
export type TeamLayoutUseAction = {
  label: string;
  tooltip: string;
  onUse: (item: UnifiedItem) => void;
  isUsed?: (item: UnifiedItem) => boolean;
  usedLabel?: string;
  closesOnUse: boolean;
  /**
   * The resource types the list takes: Get resources opens filtered to them, and only their rows
   * offer the action.
   */
  itemTypes?: UnifiedItemType[];
};

/** What the Bible texts list takes: every kind of resource but commentaries. */
const BIBLE_TEXT_TYPES: UnifiedItemType[] = [
  'ScriptureResource',
  'EnhancedResource',
  'SourceLanguageResource',
  'XmlResource',
];
const COMMENTARY_TYPES: UnifiedItemType[] = ['CommentaryResource'];

type ListKey = 'scriptureIds' | 'commentaryIds';

function isSameLayout(a: TeamLayoutDesignResult, b: TeamLayoutDesignResult): boolean {
  const isSameSet = (x: string[], y: string[]) =>
    x.length === y.length && x.every((id) => y.includes(id));
  return (
    a.modelTextId === b.modelTextId &&
    a.isStructureLocked === b.isStructureLocked &&
    isSameSet(a.scriptureIds, b.scriptureIds) &&
    isSameSet(a.commentaryIds, b.commentaryIds)
  );
}

export type TeamLayoutDesignDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The catalog the pickers list. */
  items: UnifiedItem[];
  /** The project whose layout this is; its short name heads the editor's panel. */
  project: UnifiedItem | undefined;
  /** The layout the dialog opens on. */
  initial: TeamLayoutDesignResult;
  onSave: (result: TeamLayoutDesignResult, options: TeamLayoutSaveOptions) => void;
  /** When a layout saved on this computer has not been sent yet, the ISO date it was saved. */
  unsentSavedIso?: string;
  /** Sends the saved layout: a Send/Receive for the project. */
  onSyncNow?: () => void;
  /** A Send/Receive for the project is running. */
  isSyncing?: boolean;
  onItemAction?: (item: UnifiedItem, action: UnifiedItemAction) => void | Promise<void>;
  inFlightIds?: string[];
  /**
   * The pickers' "More resources…", as outside the dialog: given, it opens Get resources with the
   * action a row should offer there; without it, the pickers page through what is available.
   */
  onMoreResources?: (useAction: TeamLayoutUseAction) => void;
};

export function TeamLayoutDesignDialog({
  open,
  onOpenChange,
  items,
  project,
  initial,
  onSave,
  onItemAction,
  inFlightIds,
  onMoreResources,
  unsentSavedIso,
  onSyncNow,
  isSyncing = false,
}: TeamLayoutDesignDialogProps) {
  const [layout, setLayout] = useState(initial);
  // The layout as the dialog opened on it, so saving waits for a change.
  const [openedLayout, setOpenedLayout] = useState(initial);
  // Each open starts from the saved layout, so a cancelled edit is gone the next time. Only the
  // opening resets it: `initial` may be rebuilt on any render while the dialog is open.
  const wasOpenRef = useRef(open);
  useEffect(() => {
    if (open && !wasOpenRef.current) {
      setLayout(initial);
      setOpenedLayout(initial);
    }
    wasOpenRef.current = open;
  }, [open, initial]);
  // Get resources asks `isUsed` while it is open, after this render's `layout` may be stale.
  const layoutRef = useRef(layout);
  layoutRef.current = layout;
  const lockId = useId();
  const projectName = project?.shortName ?? '';

  // Bible texts list everything but commentaries; Commentaries only those; the text collection
  // takes any resource.
  const scriptureItems = useMemo(
    () => items.filter((item) => item.type !== 'CommentaryResource'),
    [items],
  );
  const commentaryItems = useMemo(
    () => items.filter((item) => item.type === 'CommentaryResource'),
    [items],
  );

  const teamResourceCount = layout.scriptureIds.length + layout.commentaryIds.length;

  const moreForList = (key: ListKey, listName: string, itemTypes: UnifiedItemType[]) =>
    onMoreResources &&
    (() =>
      onMoreResources({
        label: DESIGN_STRINGS.useIn.replace('{list}', listName),
        tooltip: DESIGN_STRINGS.useInTooltip
          .replace('{list}', listName)
          .replace('{project}', projectName),
        onUse: (item) =>
          setLayout((current) =>
            current[key].includes(item.id)
              ? current
              : { ...current, [key]: [...current[key], item.id] },
          ),
        isUsed: (item) => layoutRef.current[key].includes(item.id),
        usedLabel: DESIGN_STRINGS.inList.replace('{list}', listName),
        closesOnUse: false,
        itemTypes,
      }));

  // The same lists can come back in another order after an edit, so they compare as sets.
  const hasChanges = !isSameLayout(layout, openedLayout);

  const save = (send: boolean) => {
    onSave(layout, { send });
    onOpenChange(false);
  };

  const renderList = (
    key: ListKey,
    label: string,
    listItems: UnifiedItem[],
    placeholder: string,
  ) => {
    // The model text is a Bible text the team always has: listed ticked and fixed in Bible texts,
    // but not named on the trigger, which shows what the list adds beside it.
    const lockedModelTextId =
      key === 'scriptureIds' && layout.modelTextId ? layout.modelTextId : undefined;
    const lockedIds = lockedModelTextId ? [lockedModelTextId] : [];
    return (
      <div className="tw:flex tw:flex-col tw:gap-1">
        <span className="tw:text-sm">{label}</span>
        <UnifiedProjectPicker
          items={listItems}
          kind="resources"
          currentProjectId={project?.id}
          selectedIds={[...lockedIds, ...layout[key].filter((id) => !lockedIds.includes(id))]}
          disabledIds={lockedIds}
          disabledReason={DESIGN_STRINGS.isModelText}
          triggerHiddenIds={lockedIds}
          onChangeSelectedIds={(ids) =>
            setLayout((current) => ({
              ...current,
              // Unselect all cannot take the model text out: it stays a team resource.
              [key]: [...lockedIds, ...ids.filter((id) => !lockedIds.includes(id))],
            }))
          }
          onMoreItems={moreForList(
            key,
            label,
            key === 'commentaryIds' ? COMMENTARY_TYPES : BIBLE_TEXT_TYPES,
          )}
          // The label above already names the list, and the trigger lists what is picked.
          hasTriggerTooltip={false}
          // Bible texts can be resources or projects, so they list in those two sections, as the
          // model text picker does; Commentaries are all resources and stay one list.
          isMultiGrouped={key === 'scriptureIds'}
          isGroupedByKindOnly={key === 'scriptureIds'}
          onItemAction={onItemAction}
          inFlightIds={inFlightIds}
          placeholder={placeholder}
          buttonVariant="outline"
          buttonClassName="tw:w-full"
          isInDialog
        />
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="tw:!max-w-[min(1100px,calc(100%-2rem))]">
        <DialogHeader>
          <DialogTitle>{t('%shareLayoutDialog_teamLayout_title%')}</DialogTitle>
          <DialogDescription>{t('%shareLayoutDialog_reviewAndSyncNotice%')}</DialogDescription>
        </DialogHeader>
        {unsentSavedIso && (
          // The same dot as a project with unsent changes.
          <div className="tw:flex tw:flex-wrap tw:items-center tw:gap-2 tw:rounded-lg tw:bg-muted tw:px-3 tw:py-2 tw:text-sm">
            <span className="tw:h-2 tw:w-2 tw:shrink-0 tw:rounded-full tw:bg-primary" />
            <span className="tw:flex-1">
              {DESIGN_STRINGS.notSent
                .replace('{date}', TEAM_LAYOUT_SAVED_DATE_FORMAT.format(new Date(unsentSavedIso)))
                .replace('{project}', projectName)}
            </span>
            {onSyncNow && (
              <Button size="sm" variant="outline" disabled={isSyncing} onClick={onSyncNow}>
                {isSyncing && <Spinner className="tw:h-4" />}
                {DESIGN_STRINGS.syncNow}
              </Button>
            )}
          </div>
        )}
        {/* One panel per column the team will see, in the order they appear in the app. */}
        <div className="tw:grid tw:divide-y tw:divide-border tw:overflow-hidden tw:rounded-xl tw:border tw:bg-muted/30 tw:xl:grid-cols-3 tw:xl:divide-x tw:xl:divide-y-0">
          <div className="tw:flex tw:min-w-0 tw:flex-col tw:gap-3 tw:px-4 tw:py-3">
            <div className="tw:flex tw:flex-col tw:gap-1">
              <span className="tw:font-medium">
                {t('%shareLayoutDialog_baseOrModelText_label%')}
              </span>
              <span className="tw:text-xs tw:text-muted-foreground">
                {t('%webView_modelTextPanel_emptyState_baseOrModel_summary%')}
              </span>
            </div>
            <UnifiedProjectPicker
              items={items}
              kind="resources"
              isGroupedByKindOnly
              currentProjectId={project?.id}
              selectedId={layout.modelTextId}
              onSelect={(item) => setLayout((current) => ({ ...current, modelTextId: item.id }))}
              onMoreItems={
                onMoreResources &&
                (() =>
                  onMoreResources({
                    label: DESIGN_STRINGS.useAsModelText,
                    tooltip: DESIGN_STRINGS.useAsModelTextTooltip.replace('{project}', projectName),
                    onUse: (item) => setLayout((current) => ({ ...current, modelTextId: item.id })),
                    closesOnUse: true,
                  }))
              }
              onItemAction={onItemAction}
              inFlightIds={inFlightIds}
              buttonVariant="outline"
              buttonClassName="tw:w-full"
              isInDialog
            />
          </div>
          <div className="tw:flex tw:min-w-0 tw:flex-col tw:gap-3 tw:px-4 tw:py-3">
            <span className="tw:font-medium">{projectName}</span>
            <div className="tw:flex tw:items-start tw:gap-3">
              <Switch
                id={lockId}
                checked={layout.isStructureLocked}
                onCheckedChange={(checked) =>
                  setLayout((current) => ({ ...current, isStructureLocked: checked }))
                }
              />
              <div className="tw:flex tw:flex-col tw:gap-1">
                <Label htmlFor={lockId}>{t('%shareLayoutDialog_teamLock_label%')}</Label>
                <span className="tw:text-xs tw:text-muted-foreground">
                  {t('%shareLayoutDialog_teamLock_description%')}
                </span>
              </div>
            </div>
          </div>
          <div className="tw:flex tw:min-w-0 tw:flex-col tw:gap-3 tw:px-4 tw:py-3">
            <div className="tw:flex tw:flex-col tw:gap-1">
              <span className="tw:font-medium">
                {DESIGN_STRINGS.teamResources.replace('{count}', String(teamResourceCount))}
              </span>
              <span className="tw:text-xs tw:text-muted-foreground">
                {DESIGN_STRINGS.teamResourcesDescription.replace('{project}', projectName)}
              </span>
            </div>
            {renderList(
              'scriptureIds',
              t('%shareLayoutDialog_tab_scriptureResources%'),
              scriptureItems,
              DESIGN_STRINGS.selectBibleTexts,
            )}
            {renderList(
              'commentaryIds',
              t('%shareLayoutDialog_tab_commentaryResources%'),
              commentaryItems,
              DESIGN_STRINGS.selectCommentaries,
            )}
          </div>
        </div>
        <DialogFooter className="tw:items-center tw:gap-3">
          <div className="tw:flex tw:items-center tw:gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {t('%shareLayoutDialog_cancel_label%')}
            </Button>
            <div className="tw:flex">
              <Button
                className="tw:rounded-e-none"
                disabled={!hasChanges}
                onClick={() => save(true)}
              >
                {DESIGN_STRINGS.saveAndSync}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    disabled={!hasChanges}
                    aria-label={DESIGN_STRINGS.moreWaysToSave}
                    className="tw:rounded-s-none tw:border-s tw:border-s-primary-foreground/30 tw:px-2"
                  >
                    <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="tw:max-w-80">
                  <DropdownMenuItem onSelect={() => save(true)}>
                    <div className="tw:flex tw:flex-col">
                      <span>{DESIGN_STRINGS.saveAndSync}</span>
                      <span className="tw:text-xs tw:text-muted-foreground">
                        {DESIGN_STRINGS.saveAndSyncHint.replace('{project}', projectName)}
                      </span>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => save(false)}>
                    <div className="tw:flex tw:flex-col">
                      <span>{DESIGN_STRINGS.save}</span>
                      <span className="tw:text-xs tw:text-muted-foreground">
                        {DESIGN_STRINGS.saveHint}
                      </span>
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export type TeamLayoutControllerProps = {
  catalog: UnifiedCatalog;
  /** The project whose team layout the dialog edits. */
  project: UnifiedItem | undefined;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The model text the dialog starts on before any layout is saved. */
  modelTextId: string | undefined;
  /** The layout was saved; the administrator's own window takes it too. */
  onSaved?: (project: UnifiedItem, result: TeamLayoutDesignResult) => void;
  onMoreResources?: (useAction: TeamLayoutUseAction) => void;
  /** The story's switch for an offline or failing Send/Receive. */
  isSendFailing?: boolean;
};

/**
 * The Team layout dialog with what saving does: the layouts saved per project, the project's team
 * resources set from the dialog's lists, and the save sent or left not sent (`useTeamLayoutSend`).
 */
export function TeamLayoutController({
  catalog,
  project,
  open,
  onOpenChange,
  modelTextId,
  onSaved,
  onMoreResources,
  isSendFailing = false,
}: TeamLayoutControllerProps) {
  const [teamLayouts, setTeamLayouts] = useState<Record<string, TeamLayoutDesignResult>>({});
  const teamLayoutSend = useTeamLayoutSend(catalog, isSendFailing);

  // The dialog opens on the saved layout's lists, kept to what are still the project's team
  // resources. A team resource no list holds (as in the sample data, before any layout is saved)
  // starts in Commentaries if it is one and in Bible texts otherwise.
  const initial = useMemo<TeamLayoutDesignResult>(() => {
    const saved = project && teamLayouts[project.id];
    const teamIds = catalog.items
      .filter(
        (item) =>
          item.id !== project?.id &&
          project !== undefined &&
          item.teamProjectIds?.includes(project.id),
      )
      .map((item) => item.id);
    const keep = (ids: string[] | undefined) => (ids ?? []).filter((id) => teamIds.includes(id));
    const listed = new Set([...keep(saved?.scriptureIds), ...keep(saved?.commentaryIds)]);
    const unlisted = catalog.items.filter(
      (item) => teamIds.includes(item.id) && !listed.has(item.id),
    );
    const isCommentary = (item: UnifiedItem) => item.type === 'CommentaryResource';
    return {
      modelTextId: saved?.modelTextId ?? modelTextId,
      scriptureIds: [
        ...keep(saved?.scriptureIds),
        ...unlisted.filter((item) => !isCommentary(item)).map((item) => item.id),
      ],
      commentaryIds: [
        ...keep(saved?.commentaryIds),
        ...unlisted.filter(isCommentary).map((item) => item.id),
      ],
      isStructureLocked: saved?.isStructureLocked ?? false,
    };
  }, [catalog.items, project, teamLayouts, modelTextId]);

  return (
    <TeamLayoutDesignDialog
      open={open}
      onOpenChange={onOpenChange}
      items={catalog.items}
      project={project}
      initial={initial}
      onSave={(result, options) => {
        if (!project) return;
        setTeamLayouts((current) => ({ ...current, [project.id]: result }));
        // The lists are what makes a resource a team resource.
        catalog.setTeamResources(project.id, [...result.scriptureIds, ...result.commentaryIds]);
        onSaved?.(project, result);
        teamLayoutSend.afterSave(project, options.send);
      }}
      onItemAction={catalog.applyAction}
      inFlightIds={catalog.inFlightIds}
      onMoreResources={onMoreResources}
      unsentSavedIso={project?.teamLayoutSavedIso}
      onSyncNow={project && (() => teamLayoutSend.syncNow(project))}
      isSyncing={teamLayoutSend.isSyncing(project)}
    />
  );
}

export default TeamLayoutDesignDialog;
