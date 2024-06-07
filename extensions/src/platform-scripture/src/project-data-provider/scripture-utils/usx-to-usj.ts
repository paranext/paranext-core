/* eslint-disable */
// COPIED DIRECTLY FROM https://github.com/BiblioNexus-Foundation/scripture-editors/blob/main/packages/shared/converters/usj/usx-to-usj.ts
// Please fix this when we can use that package without pulling in React on the backend

/**
 * Convert Scripture from USX to USJ. Adapted to TypeScript from this file:
 *
 * @see https://github.com/mvh-solutions/nice-usfm-json/blob/main/javascript/lib/usx-to-usj.js
 * And kept updated with changes from this file:
 * @see https://github.com/usfm-bible/tcdocs/blob/main/python/scripts/usx2usj.py
 */

import { DOMParser } from '@xmldom/xmldom';
import { MarkerObject, USJ_TYPE, USJ_VERSION, Usj } from './usj.model';
import { USX_TYPE } from './usx.model';

type Action = 'append' | 'merge' | 'ignore';
type Attribs = { [name: string]: string };

function usxDomToUsjRecurse<T extends Usj | MarkerObject = Usj>(
  inputUsxElement: HTMLElement,
): [outputJson: T, action: Action] {
  const attribs: Attribs = {};
  let type: string = inputUsxElement.tagName;
  let marker: string | undefined;
  let text: string | undefined;
  let action: Action = 'append';

  if (['row', 'cell'].includes(type)) type = 'table:' + type;
  if (inputUsxElement.attributes) {
    for (let i = 0; i < inputUsxElement.attributes.length; i++) {
      const attrib = inputUsxElement.attributes[i];
      attribs[attrib.name] = attrib.value;
    }
  }

  if (attribs.style) {
    marker = attribs.style;
    delete attribs.style;
  }
  // dropping because presence of vid in para elements is not consistent in USX
  if (attribs.vid) delete attribs.vid;
  if (attribs.closed) delete attribs.closed;
  if (attribs.status) delete attribs.status;

  let outObj: T = { type } as T;
  if (marker) (outObj as MarkerObject).marker = marker;
  outObj = { ...outObj, ...attribs };

  if (
    inputUsxElement.firstChild &&
    inputUsxElement.firstChild.nodeType === inputUsxElement.firstChild.TEXT_NODE &&
    inputUsxElement.firstChild.nodeValue &&
    inputUsxElement.firstChild.nodeValue.trim() !== ''
  ) {
    text = inputUsxElement.firstChild.nodeValue;
  }

  const children = Array.from(inputUsxElement.childNodes);
  outObj.content = [];

  if (text) {
    outObj.content.push(text);
  }

  for (const child of children) {
    // ChildNodes are Elements.
    if ((child as HTMLElement).tagName === undefined) {
      continue;
    }
    // ChildNodes are Elements.
    const [childDict, whatToDo] = usxDomToUsjRecurse<MarkerObject>(child as HTMLElement);

    switch (whatToDo) {
      case 'append':
        outObj.content.push(childDict);
        break;
      case 'merge':
        outObj.content = outObj.content.concat(childDict);
        break;
      case 'ignore':
        break;
      default:
        break;
    }

    if (
      child.nextSibling &&
      child.nextSibling.nodeType === child.nextSibling.TEXT_NODE &&
      child.nextSibling.nodeValue &&
      (child.nextSibling.nodeValue.trim() !== '' || child.nextSibling.nodeValue === ' ')
    ) {
      outObj.content.push(child.nextSibling.nodeValue);
    }
  }

  if (
    (outObj.content.length === 0 && outObj.type !== USX_TYPE) ||
    ['chapter', 'verse', 'optbreak', 'ms'].includes(type) ||
    (marker && ['va', 'ca', 'b'].includes(marker))
  ) {
    delete outObj.content;
  }

  if ('eid' in outObj && ['verse', 'chapter'].includes(type)) {
    action = 'ignore';
  }

  return [outObj, action];
}

export function usxDomToUsj(inputUsxDom: HTMLElement): Usj {
  const [outputJson] = usxDomToUsjRecurse(inputUsxDom);
  outputJson.type = USJ_TYPE;
  outputJson.version = USJ_VERSION;
  return outputJson;
}

export function usxStringToUsj(usxString: string): Usj {
  const parser = new DOMParser();
  const inputUsxDom = parser.parseFromString(usxString, 'text/xml');
  return usxDomToUsj(inputUsxDom.documentElement);
}
