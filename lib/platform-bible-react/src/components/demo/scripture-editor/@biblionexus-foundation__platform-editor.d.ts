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

  export const typedMarkNodeName = 'TypedMarkNode';

  export type AddMissingComments = (usjCommentIds: string[]) => void;

  /** Options for each editor node. */
  export interface UsjNodeOptions extends NodeOptions {
    [immutableNoteCallerNodeName]?: {
      /** Possible note callers to use when caller is '+'. */
      noteCallers?: string[];
      /** Click handler method. */
      onClick?: OnClick;
    };
    [typedMarkNodeName]?: {
      /** Method to add missing comments. */
      addMissingComments?: AddMissingComments;
    };
  }
}

declare module 'shared-react/views/view-mode.model' {
  export const FORMATTED_VIEW_MODE = 'formatted';
  export const UNFORMATTED_VIEW_MODE = 'unformatted';
  export type ViewMode = typeof FORMATTED_VIEW_MODE | typeof UNFORMATTED_VIEW_MODE;
}

declare module 'shared-react/views/view-options.utils' {
  // eslint-disable-next-line import/no-unresolved
  import { ViewMode } from 'shared-react/views/view-mode.model';

  export type ViewOptions = {
    /** USFM markers are visible, editable or hidden */
    markerMode: 'visible' | 'editable' | 'hidden';
    /** Does the text have spacing including indenting */
    hasSpacing: boolean;
    /** Is the text in a formatted font */
    isFormattedFont: boolean;
  };

  export type getDefaultViewMode = () => ViewMode;

  export type getDefaultViewOptions = () => ViewOptions | undefined;

  export type getViewOptions = (viewMode?: string | undefined) => ViewOptions | undefined;

  export type getViewMode = (viewOptions: ViewOptions | undefined) => ViewMode | undefined;
}
