import { BookChapterControl } from '@/components/advanced/book-chapter-control/book-chapter-control.component';
import {
  getToolbarOSReservedSpaceClassName,
  Toolbar,
} from '@/components/advanced/toolbar.component';
import { Button } from '@/components/shadcn-ui/button';
import { cn } from '@/utils/shadcn-ui.util';
import { BookIcon, HomeIcon, Minus, Square, UserRound, X } from 'lucide-react';
import { defaultScrRef } from 'platform-bible-utils';
import { useState } from 'react';
import * as menuData from './sample.menu.json';

export function ToolbarExamples() {
  const [scrRef] = useState(defaultScrRef);

  return (
    <div className="tw-flex tw-flex-col tw-gap-4">
      <Toolbar menuData={undefined} onSelectMenuItem={() => {}}>
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} />
      </Toolbar>
      <Toolbar menuData={undefined} appMenuAreaChildren={<BookIcon />} onSelectMenuItem={() => {}}>
        <Button variant="ghost">
          <HomeIcon />
        </Button>
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} />
      </Toolbar>
      <Toolbar menuData={menuData} appMenuAreaChildren={<BookIcon />} onSelectMenuItem={() => {}}>
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} />
      </Toolbar>
      <Toolbar menuData={menuData} onSelectMenuItem={() => {}}>
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} />
      </Toolbar>
      <Toolbar
        menuData={menuData}
        onSelectMenuItem={() => {}}
        className="tw-h-8 tw-bg-muted tw-text-muted-foreground"
        configAreaChildren={
          <>
            <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} className="tw-h-8" />
            <UserRound />
          </>
        }
      >
        <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} className="tw-h-8" />
      </Toolbar>
      Mac
      <div>
        <div className="tw-absolute tw-z-10">
          <div className="tw-flex tw-gap-2 tw-p-2 tw-ps-3">
            <div className="tw-h-3 tw-w-3 tw-rounded-full tw-border-[#df4744] tw-bg-[#f25450]" />
            <div className="tw-h-3 tw-w-3 tw-rounded-full tw-border-[#e0a035] tw-bg-[#fdbb40]" />
            <div className="tw-h-3 tw-w-3 tw-rounded-full tw-border-[#22ac32] tw-bg-[#36c84b]" />
          </div>
        </div>
        <Toolbar
          menuData={menuData}
          onSelectMenuItem={() => {}}
          className={cn('tw-h-8 tw-bg-background', getToolbarOSReservedSpaceClassName('darwin'))}
          configAreaChildren={<div className="tw-h-8">End</div>}
        >
          <div className="tw-h-8">Middle</div>
        </Toolbar>
      </div>
      Windows / Linux
      <div className="tw-relative">
        <Toolbar
          menuData={menuData}
          onSelectMenuItem={() => {}}
          className={cn('tw-h-10 tw-bg-background', getToolbarOSReservedSpaceClassName('linux'))}
          configAreaChildren={<div className="tw-h-8">End</div>}
        >
          <div className="tw-h-8">Middle</div>
        </Toolbar>
        <div className="tw-absolute tw-right-0 tw-top-0 tw-flex">
          <div className="tw-flex tw-h-10 tw-w-[46px] tw-items-center tw-justify-center hover:tw-bg-gray-300">
            <Minus className="tw-h-4 tw-w-4" />
          </div>
          <div className="tw-flex tw-h-10 tw-w-[46px] tw-items-center tw-justify-center hover:tw-bg-gray-300">
            <Square className="tw-h-3.5 tw-w-3.5" />
          </div>
          <div className="tw-flex tw-h-10 tw-w-[46px] tw-items-center tw-justify-center hover:tw-bg-red-600 hover:tw-text-white">
            <X className="tw-h-4 tw-w-4" />
          </div>
        </div>
      </div>
      Muted Variant
      <div className="tw-items-center tw-rounded-md tw-bg-muted/50 tw-py-2">
        <Toolbar
          menuData={menuData}
          onSelectMenuItem={() => {}}
          className="tw-h-8 tw-border-0 tw-bg-transparent"
          menubarVariant="muted"
          configAreaChildren={
            <>
              <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} className="tw-h-8" />
              <UserRound />
            </>
          }
        >
          <BookChapterControl scrRef={scrRef} handleSubmit={() => {}} className="tw-h-8" />
        </Toolbar>
        <div className="tw-m-2 tw-h-8 tw-rounded-sm tw-bg-background" />
      </div>
    </div>
  );
}

export default ToolbarExamples;
