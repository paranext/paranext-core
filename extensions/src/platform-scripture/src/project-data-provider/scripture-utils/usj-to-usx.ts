/* eslint-disable */
// COPIED DIRECTLY FROM https://github.com/BiblioNexus-Foundation/scripture-editors/blob/main/packages/shared/converters/usj/usj-to-usx.ts
// Please fix this when we can use that package without pulling in React on the backend

/**
 * Convert Scripture from USJ to USX. Adapted to TypeScript from this file:
 *
 * @see https://github.com/usfm-bible/tcdocs/blob/main/python/lib/usfmtc/usjproc.py
 */

import { DOMImplementation } from '@xmldom/xmldom';
import { MarkerContent, MarkerObject, Usj } from './usj.model';
import { USX_TYPE, USX_VERSION } from './usx.model';

let chapterEid: string | undefined;
let verseEid: string | undefined;

function createVerseEndElement(usxDoc: XMLDocument, verseEid: string): HTMLElement {
  const eidElement = usxDoc.createElement('verse');
  eidElement.setAttribute('eid', verseEid);
  return eidElement;
}

function createChapterEndElement(usxDoc: XMLDocument, chapterEid: string): HTMLElement {
  const eidElement = usxDoc.createElement('chapter');
  eidElement.setAttribute('eid', chapterEid);
  return eidElement;
}

function setAttributes(element: HTMLElement, markerContent: MarkerObject) {
  element.setAttribute('style', markerContent.marker);
  for (const [key, value] of Object.entries(markerContent)) {
    if (value && !['type', 'marker', 'content'].includes(key)) {
      element.setAttribute(key, value as string);
    }
  }
}

function convertUsjRecurse(
  markerContent: MarkerContent,
  parentElement: HTMLElement,
  usxDoc: XMLDocument,
  isLastItem: boolean,
) {
  let element: Text | HTMLElement;
  let type: string | undefined;
  let eidElement: HTMLElement | undefined;
  if (typeof markerContent === 'string') element = usxDoc.createTextNode(markerContent);
  else {
    type = markerContent.type.replace('table:', '');
    element = usxDoc.createElement(type);
    setAttributes(element, markerContent);
    if (markerContent.content) {
      for (const [index, item] of markerContent.content.entries()) {
        const _isLastItem = index === markerContent.content.length - 1;
        convertUsjRecurse(item, element, usxDoc, _isLastItem);
      }
    }
  }

  // Create chapter and verse end elements from SID attributes.
  if (verseEid && (type === 'verse' || (parentElement.tagName === 'para' && isLastItem))) {
    eidElement = createVerseEndElement(usxDoc, verseEid);
    verseEid = undefined;
  }
  if (type === 'verse' && typeof markerContent !== 'string' && markerContent.sid !== undefined)
    verseEid = markerContent.sid;

  if (chapterEid && (type === 'chapter' || (type === 'para' && isLastItem))) {
    eidElement = createChapterEndElement(usxDoc, chapterEid);
    chapterEid = undefined;
  }
  if (type === 'chapter' && typeof markerContent !== 'string' && markerContent.sid !== undefined)
    chapterEid = markerContent.sid;

  // Append to parent.
  if (eidElement && !isLastItem) parentElement.appendChild(eidElement);
  parentElement.appendChild(element);
  if (eidElement && isLastItem) parentElement.appendChild(eidElement);

  // Allow for final chapter and verse end elements at the end of an implied para.
  if (isLastItem && parentElement.nodeName === USX_TYPE) {
    if (verseEid) parentElement.appendChild(createVerseEndElement(usxDoc, verseEid));
    if (chapterEid) parentElement.appendChild(createChapterEndElement(usxDoc, chapterEid));
    verseEid = undefined;
    chapterEid = undefined;
  }
}

export function usjToUsxDom(usj: Usj, usxDoc: XMLDocument): HTMLElement {
  for (const [index, markerContent] of usj.content.entries()) {
    const isLastItem = index === usj.content.length - 1;
    convertUsjRecurse(markerContent, usxDoc.documentElement, usxDoc, isLastItem);
  }
  return usxDoc.documentElement;
}

export function usjToUsxString(usj: Usj): string {
  const usxDoc = new DOMImplementation().createDocument('', USX_TYPE);
  usxDoc.documentElement.setAttribute('version', USX_VERSION);
  usjToUsxDom(usj, usxDoc);
  return usxDoc.toString();
}
