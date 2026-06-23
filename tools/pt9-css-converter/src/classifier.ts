export type Bucket = 'typography' | 'non-directional' | 'directional';

export interface Declaration {
  property: string;
  value: string;
}

export interface ClassifyResult {
  bucket: Bucket;
  unknown: boolean;
}

const TYPOGRAPHY_PROPS = new Set([
  'color',
  'font-family',
  'font-size',
  'font-style',
  'font-variant',
  'font-weight',
  'text-decoration',
  'vertical-align',
]);

const NON_DIRECTIONAL_LAYOUT_PROPS = new Set([
  'line-height',
  'margin-bottom',
  'margin-top',
  'padding-bottom',
  'padding-top',
  'text-align',
  'text-indent',
  'white-space',
]);

const DIRECTIONAL_PROPS = new Set(['margin-left', 'margin-right', 'padding-left', 'padding-right']);

export function classify({ property }: Declaration): ClassifyResult {
  const prop = property.toLowerCase();
  if (DIRECTIONAL_PROPS.has(prop)) return { bucket: 'directional', unknown: false };
  if (NON_DIRECTIONAL_LAYOUT_PROPS.has(prop)) return { bucket: 'non-directional', unknown: false };
  if (TYPOGRAPHY_PROPS.has(prop)) return { bucket: 'typography', unknown: false };
  return { bucket: 'typography', unknown: true };
}

const MIRROR_PROPERTY: { [property: string]: string } = {
  'margin-left': 'margin-right',
  'margin-right': 'margin-left',
  'padding-left': 'padding-right',
  'padding-right': 'padding-left',
};

export function mirrorRtl({ property, value }: Declaration): Declaration {
  const mirrored = MIRROR_PROPERTY[property.toLowerCase()];
  return mirrored ? { property: mirrored, value } : { property, value };
}
