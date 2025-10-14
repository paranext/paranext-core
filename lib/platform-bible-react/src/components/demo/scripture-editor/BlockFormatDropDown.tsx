import { Button } from '@/components/shadcn-ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import { EditorRef } from '@eten-tech-foundation/platform-editor';
import {
  AlignJustify,
  Ban,
  FileText,
  ChevronDown,
  Heading1,
  Heading2,
  Heading3,
  TextQuote,
} from 'lucide-react';
import { MutableRefObject, ReactElement } from 'react';

type BlockMarkerToBlockNames = typeof blockMarkerToBlockNames;

const commonBlockMarkerToBlockNames = {
  m: 'm - Paragraph - Margin - No First Line Indent',
  ms: 'ms - Heading - Major Section Level 1',
  nb: 'nb - Paragraph - No Break with Previous Paragraph',
  p: 'p - Paragraph - Normal - First Line Indent',
  pi: 'pi - Paragraph - Indented - Level 1 - First Line Indent',
  q1: 'q1 - Poetry - Indent Level 1',
  q2: 'q2 - Poetry - Indent Level 2',
  r: 'r - Heading - Parallel References',
  s: 's - Heading - Section Level 1',
  // do not allow `b - Poetry - Stanza Break (Blank Line)` here to avoid a USFM validity issue.
};

// This list is incomplete.
const blockMarkerToBlockNames = {
  ...commonBlockMarkerToBlockNames,
  ide: 'ide - File - Encoding',
  h: 'h - File - Header',
  h1: 'h1 - File - Header',
  h2: 'h2 - File - Left Header',
  h3: 'h3 - File - Right Header',
  toc1: 'toc1 - File - Long Table of Contents Text',
  toc2: 'toc2 - File - Short Table of Contents Text',
  toc3: 'toc3 - File - Book Abbreviation',
  cl: 'cl - Chapter - Publishing Label',
  mt: 'mt - Title - Major Title Level 1',
  mt1: 'mt1 - Title - Major Title Level 1',
  mt2: 'mt2 - Title - Major Title Level 2',
  mt3: 'mt3 - Title - Major Title Level 3',
  mt4: 'mt4 - Title - Major Title Level 4',
  ms1: 'ms1 - Heading - Major Section Level 1',
  ms2: 'ms2 - Heading - Major Section Level 2',
  ms3: 'ms3 - Heading - Major Section Level 3',
  b: 'b - Poetry - Stanza Break (Blank Line)',
};

// Map block markers to lucide-react icons
const blockMarkerToIcon = {
  m: AlignJustify,
  ms: Heading1,
  nb: AlignJustify,
  p: AlignJustify,
  pi: AlignJustify,
  q1: TextQuote,
  q2: TextQuote,
  r: Heading1,
  s: Heading1,
  // Extended markers
  ide: FileText,
  h: FileText,
  h1: FileText,
  h2: FileText,
  h3: FileText,
  toc1: FileText,
  toc2: FileText,
  toc3: FileText,
  cl: FileText,
  mt: Heading1,
  mt1: Heading1,
  mt2: Heading2,
  mt3: Heading3,
  mt4: Heading3,
  ms1: Heading1,
  ms2: Heading2,
  ms3: Heading3,
  b: TextQuote,
} as const;

function BlockMarkerIcon({
  blockMarker,
  className,
}: {
  blockMarker: string | undefined;
  className?: string;
}) {
  const IconComponent =
    blockMarker && blockMarker in blockMarkerToIcon
      ? // `blockMarker` is a string, but TypeScript cannot verify that it is a key of `blockMarkerToIcon`.
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        blockMarkerToIcon[blockMarker as keyof typeof blockMarkerToIcon]
      : Ban;

  return <IconComponent className={className} size={16} />;
}

export function BlockFormatDropDown({
  editorRef,
  blockMarker,
}: {
  editorRef: MutableRefObject<EditorRef | null>;
  blockMarker: string | undefined;
}): ReactElement {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="" aria-label="Formatting options for block type">
          <BlockMarkerIcon blockMarker={blockMarker} className="tw-me-2" />
          {blockFormatLabel(blockMarker)}
          <ChevronDown className="tw-ms-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {Object.keys(commonBlockMarkerToBlockNames).map((itemBlockMarker) => (
          <DropdownMenuItem
            key={itemBlockMarker}
            className={`item block-marker ${dropDownActiveClass(blockMarker === itemBlockMarker)}`}
            onClick={() => editorRef.current?.formatPara(itemBlockMarker)}
          >
            <BlockMarkerIcon blockMarker={itemBlockMarker} className="tw-me-2" />
            <span className={`text usfm_${itemBlockMarker}`}>
              {
                commonBlockMarkerToBlockNames[
                  // `itemBlockMarker` is a string, but TypeScript cannot verify that it is a key of `blockMarkerToBlockNames`.
                  // eslint-disable-next-line no-type-assertion/no-type-assertion
                  itemBlockMarker as keyof typeof commonBlockMarkerToBlockNames
                ]
              }
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function blockFormatLabel(blockMarker: string | undefined) {
  return blockMarker && blockMarker in blockMarkerToBlockNames
    ? // `blockMarker` is a string, but TypeScript cannot verify that it is a key of `blockMarkerToBlockNames`.
      // eslint-disable-next-line no-type-assertion/no-type-assertion
      blockMarkerToBlockNames[blockMarker as keyof BlockMarkerToBlockNames]
    : 'No Style';
}

function dropDownActiveClass(active: boolean) {
  return active ? 'active dropdown-item-active' : '';
}
