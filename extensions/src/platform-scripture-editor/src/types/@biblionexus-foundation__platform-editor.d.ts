/**
 * Work-around until the `@biblionexus-foundation/platform-editor` package fully includes its types.
 * Note there is also a patch that should be removed when this is fixed.
 */

declare module 'shared-react/annotation/selection.model' {
  type UsjLocation = {
    jsonPath: string;
    offset: number;
  };

  export type SelectionRange = {
    start: UsjLocation;
    end?: UsjLocation;
  };

  export type AnnotationRange = {
    start: UsjLocation;
    end: UsjLocation;
  };
}

declare module 'shared-react/nodes/scripture/usj/ImmutableNoteCallerNode' {
  export const immutableNoteCallerNodeName = 'ImmutableNoteCallerNode';
}

declare module 'shared/adaptors/logger-basic.model' {
  export type LoggerBasic = {
    error(message: string): void;
    warn(message: string): void;
    info(message: string): void;
  };
}

declare module 'shared/utils/get-marker-action.model' {
  import { SerializedVerseRef } from '@sillsdev/scripture';

  export type ScriptureReference = SerializedVerseRef;
}

declare module 'shared-react/plugins/text-direction.model' {
  /** Left-to-right or Right-to-left or Automatically determined from the content. */
  export type TextDirection = 'ltr' | 'rtl' | 'auto';
}

declare module 'shared-react/nodes/scripture/usj/usj-node-options.model' {
  import { SyntheticEvent } from 'react';

  /** Option properties to use with each node. */
  type NodeOptions = { [nodeClassName: string]: { [prop: string]: unknown } | undefined };
  type OnClick = (event: SyntheticEvent) => void;
  const immutableNoteCallerNodeName = 'ImmutableNoteCallerNode';

  export const MarkNodeName = 'MarkNode';

  export type AddMissingComments = (usjCommentIds: string[]) => void;

  /** Options for each editor node. */
  export interface UsjNodeOptions extends NodeOptions {
    [immutableNoteCallerNodeName]?: {
      /** Possible note callers to use when caller is '+'. */
      noteCallers?: string[];
      /** Click handler method. */
      onClick?: OnClick;
    };
    [MarkNodeName]?: {
      /** Method to add missing comments. */
      addMissingComments?: AddMissingComments;
    };
  }
}
