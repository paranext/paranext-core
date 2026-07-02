/**
 * EXPERIMENTAL / DEMO-ONLY - not a design-system component.
 *
 * Two approaches for drawing a non-rectangular outline/highlight that wraps a multiline block of
 * text. The target shape is the one a text selection makes across wrapped lines: tight to where the
 * text starts and ends on the first and last lines, but filling the full block width on the lines
 * in between. Because the right edge steps in and out from line to line, the silhouette looks like
 * a staircase.
 *
 * - ClipPathOutline: a pair of stacked CSS clip-path pseudo-elements (a border-coloured layer and a
 *   slightly inset fill layer; the exposed rim reads as the outline). A pseudo-element is a
 *   generated `::before`/`::after` box that CSS paints behind the real element. `clip-path` cuts a
 *   box down to an arbitrary polygon.
 * - SvgPathOutline: measures each line's rectangle with `Range.getClientRects()` and stitches the
 *   rectangles into a single connected SVG path that can be stroked, rounded, dashed, or animated.
 *
 * Everything here is self-contained (local helpers + inline styles). It intentionally avoids
 * shadcn/ui, design tokens, and shared components so it can be copied out as a sketch without
 * implying it is supported UI.
 */
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react';

// ---------------------------------------------------------------------------
// Shared geometry helpers
// ---------------------------------------------------------------------------

type Point = [number, number];
interface Row {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

/** Collapse a Range's client rects into one row per visual line. */
function lineRows(el: HTMLElement): Row[] {
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = Array.from(range.getClientRects()).filter((r) => r.width > 0 && r.height > 1);
  const rows: Row[] = [];
  rects.forEach((r) => {
    const row = rows.find((x) => Math.abs(x.top - r.top) < 4 && Math.abs(x.bottom - r.bottom) < 6);
    if (row) {
      row.left = Math.min(row.left, r.left);
      row.right = Math.max(row.right, r.right);
    } else {
      rows.push({ top: r.top, bottom: r.bottom, left: r.left, right: r.right });
    }
  });
  rows.sort((a, b) => a.top - b.top);
  return rows;
}

/**
 * Build an ordered list of points (element-local px) tracing an outline around the text: down the
 * right edge, then back up the left edge. `pad` insets/expands the outline uniformly.
 *
 * When `blockMiddles` is true, every line _except the first and last_ is stretched to the block's
 * full extent (its max right / min left) instead of its own ragged edge. That yields the shape a
 * text selection makes: the first and last lines stay tight to where the text actually starts and
 * ends, while the middle lines fill the block width. When false, every line follows its own edge (a
 * fully ragged staircase). Only the trailing edge visibly changes, since every line already shares
 * the same leading edge (the right edge in left-to-right text, the left edge in right-to-left).
 */
function staircasePoints(el: HTMLElement, pad: number, blockMiddles = false): Point[] {
  const rows = lineRows(el);
  if (rows.length === 0) return [];
  const base = el.getBoundingClientRect();
  const ox = base.left;
  const oy = base.top;
  const maxRight = Math.max(...rows.map((r) => r.right));
  const minLeft = Math.min(...rows.map((r) => r.left));
  const last = rows.length - 1;
  // First and last lines keep their own ragged edge; middle lines snap to the block extent.
  const isEnd = (i: number) => i === 0 || i === last;
  const rightX = (i: number) => (blockMiddles && !isEnd(i) ? maxRight : rows[i].right) - ox + pad;
  const leftX = (i: number) => (blockMiddles && !isEnd(i) ? minLeft : rows[i].left) - ox - pad;
  const pts: Point[] = [];
  rows.forEach((r, i) => {
    pts.push([rightX(i), r.top - oy - pad]);
    pts.push([rightX(i), r.bottom - oy + pad]);
  });
  for (let i = last; i >= 0; i -= 1) {
    const r = rows[i];
    pts.push([leftX(i), r.bottom - oy + pad]);
    pts.push([leftX(i), r.top - oy - pad]);
  }
  return pts;
}

/** Format points as a CSS polygon() value (px units). */
function toPolygon(pts: Point[]): string {
  return pts.map(([x, y]) => `${x.toFixed(1)}px ${y.toFixed(1)}px`).join(', ');
}

function distance(a: Point, b: Point): number {
  return Math.hypot(a[0] - b[0], a[1] - b[1]);
}

function unit(from: Point, to: Point): Point {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const len = Math.hypot(dx, dy) || 1;
  return [dx / len, dy / len];
}

/** Build an SVG path through points with optional rounded corners of radius `r`. */
function roundedPath(pts: Point[], r: number): string {
  const n = pts.length;
  if (n < 3) return '';
  if (r <= 0) {
    return `M${pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' L')} Z`;
  }
  let d = '';
  for (let i = 0; i < n; i += 1) {
    const prev = pts[(i - 1 + n) % n];
    const cur = pts[i];
    const next = pts[(i + 1) % n];
    const v1 = unit(cur, prev);
    const v2 = unit(cur, next);
    const d1 = Math.min(r, distance(cur, prev) / 2);
    const d2 = Math.min(r, distance(cur, next) / 2);
    const p1: Point = [cur[0] + v1[0] * d1, cur[1] + v1[1] * d1];
    const p2: Point = [cur[0] + v2[0] * d2, cur[1] + v2[1] * d2];
    d +=
      i === 0
        ? `M${p1[0].toFixed(1)},${p1[1].toFixed(1)}`
        : `L${p1[0].toFixed(1)},${p1[1].toFixed(1)}`;
    d += ` Q${cur[0].toFixed(1)},${cur[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return `${d} Z`;
}

/**
 * Run `recompute` on mount, on element/window resize, and after web fonts finish loading (a font
 * swap re-wraps lines, which moves the outline). Wires and tears down its own listeners.
 */
function useReflow(target: RefObject<HTMLElement | null>, recompute: () => void): void {
  useLayoutEffect(() => {
    recompute();
  }, [recompute]);

  useEffect(() => {
    const el = target.current;
    const onChange = () => recompute();
    window.addEventListener('resize', onChange);
    let observer: ResizeObserver | undefined;
    if (el) {
      observer = new ResizeObserver(onChange);
      observer.observe(el);
    }
    const { fonts } = document;
    fonts?.addEventListener('loadingdone', onChange);
    return () => {
      window.removeEventListener('resize', onChange);
      observer?.disconnect();
      fonts?.removeEventListener('loadingdone', onChange);
    };
  }, [target, recompute]);
}

// ---------------------------------------------------------------------------
// Small shared UI bits (plain HTML - no design-system dependency)
// ---------------------------------------------------------------------------

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: Dispatch<SetStateAction<number>>;
}

function Slider({ label, value, min, max, onChange }: SliderProps) {
  return (
    <label
      style={{ display: 'inline-flex', gap: 6, alignItems: 'center', fontSize: 13, opacity: 0.8 }}
    >
      {label}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <span style={{ fontVariantNumeric: 'tabular-nums', minWidth: 22 }}>{value}</span>
    </label>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
}

function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <label
      style={{ display: 'inline-flex', gap: 6, alignItems: 'center', fontSize: 13, opacity: 0.8 }}
    >
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      {label}
    </label>
  );
}

const controlsRow: CSSProperties = {
  display: 'flex',
  gap: 18,
  flexWrap: 'wrap',
  alignItems: 'center',
  marginTop: 16,
};

const demoStage: CSSProperties = {
  display: 'flex',
  padding: '26px 22px',
  borderRadius: 10,
  background: 'rgba(127,127,127,0.08)',
  minHeight: 120,
  alignItems: 'center',
};

// ---------------------------------------------------------------------------
// Clip-path outline: pseudo-element pair (border layer + inset fill layer)
// ---------------------------------------------------------------------------

function ClipPathDemo() {
  // useRef's initial DOM value must be null until the element mounts.
  // eslint-disable-next-line no-null/no-null
  const ref = useRef<HTMLDivElement>(null);
  const [pad, setPad] = useState(6);
  const [border, setBorder] = useState(3);
  const [blockMiddles, setBlockMiddles] = useState(true);
  const [rtl, setRtl] = useState(false);
  const [outer, setOuter] = useState('');
  const [inner, setInner] = useState('');

  const rawId = useId();
  const cls = `cpo-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;

  const recompute = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // Measure in the chosen writing direction. The geometry reads visual rects, so it is
    // direction-agnostic; flipping `dir` re-wraps the lines without resizing the box.
    el.dir = rtl ? 'rtl' : 'ltr';
    setOuter(toPolygon(staircasePoints(el, pad, blockMiddles)));
    setInner(toPolygon(staircasePoints(el, pad - border, blockMiddles)));
  }, [pad, border, blockMiddles, rtl]);

  useReflow(ref, recompute);

  const fallback = '0 0, 100% 0, 100% 100%, 0 100%';

  return (
    <div>
      <style>{`
        .${cls} {
          position: relative; display: inline-block; max-inline-size: 26ch;
          padding-block: 8px; padding-inline: 14px;
          font-size: 1.5rem; font-weight: 600; line-height: 1.55;
          color: #1a1230; z-index: 0;
        }
        .${cls}::before, .${cls}::after {
          content: ""; position: absolute; inset: 0; z-index: -1; transition: clip-path .1s ease;
        }
        .${cls}::before { background: #ff5d8f; clip-path: polygon(${outer || fallback}); }
        .${cls}::after  {
          background: linear-gradient(120deg, #ffe08a, #ffb86c);
          clip-path: polygon(${inner || fallback});
        }
      `}</style>
      <div style={demoStage}>
        <div
          ref={ref}
          className={cls}
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          role="textbox"
          aria-multiline="true"
          aria-label="Editable demo text"
          tabIndex={0}
          onInput={recompute}
        >
          This editable demo draws a highlighter-style outline around a whole block of wrapped text.
          The middle lines stay flush to the block width while the short last line tucks in. Type
          here to watch the outline re-fit as the text re-wraps across several lines.
        </div>
      </div>
      <div style={controlsRow}>
        <Slider label="Padding" value={pad} min={0} max={16} onChange={setPad} />
        <Slider label="Border" value={border} min={0} max={10} onChange={setBorder} />
        <Toggle
          label="Block-width middle lines"
          checked={blockMiddles}
          onChange={setBlockMiddles}
        />
        <Toggle label="Right-to-left" checked={rtl} onChange={setRtl} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SVG path outline: getClientRects() -> single connected SVG staircase path
// ---------------------------------------------------------------------------

function SvgStaircaseDemo() {
  // useRef's initial DOM value must be null until the element mounts.
  // eslint-disable-next-line no-null/no-null
  const ref = useRef<HTMLDivElement>(null);
  const [pad, setPad] = useState(6);
  const [corner, setCorner] = useState(8);
  const [blockMiddles, setBlockMiddles] = useState(true);
  const [rtl, setRtl] = useState(false);
  const [d, setD] = useState('');

  const recompute = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    // Measure in the chosen writing direction. The geometry reads visual rects, so it is
    // direction-agnostic; flipping `dir` re-wraps the lines without resizing the box.
    el.dir = rtl ? 'rtl' : 'ltr';
    setD(roundedPath(staircasePoints(el, pad, blockMiddles), corner));
  }, [pad, corner, blockMiddles, rtl]);

  useReflow(ref, recompute);

  return (
    <div>
      <div style={demoStage}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <svg
            aria-hidden
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              pointerEvents: 'none',
              overflow: 'visible',
              zIndex: 0,
            }}
          >
            <path
              d={d}
              fill="rgba(110,168,254,0.12)"
              stroke="#6ea8fe"
              strokeWidth={2}
              strokeLinejoin="round"
            />
          </svg>
          <div
            ref={ref}
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            role="textbox"
            aria-multiline="true"
            aria-label="Editable demo text"
            tabIndex={0}
            onInput={recompute}
            style={{
              position: 'relative',
              zIndex: 1,
              fontSize: '1.5rem',
              fontWeight: 600,
              lineHeight: 1.85,
              maxInlineSize: '26ch',
              paddingBlock: '8px',
              paddingInline: '12px',
              color: 'inherit',
            }}
          >
            This editable demo traces one connected outline around a whole block of wrapped text,
            filling the middle lines to full width while the first and last lines hug the text. Type
            here to watch the path re-fit as the text re-wraps across several lines.
          </div>
        </div>
      </div>
      <div style={controlsRow}>
        <Slider label="Padding" value={pad} min={0} max={16} onChange={setPad} />
        <Slider label="Corner" value={corner} min={0} max={20} onChange={setCorner} />
        <Toggle
          label="Block-width middle lines"
          checked={blockMiddles}
          onChange={setBlockMiddles}
        />
        <Toggle label="Right-to-left" checked={rtl} onChange={setRtl} />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Storybook meta + stories
// ---------------------------------------------------------------------------

const meta: Meta = {
  title: 'Experimental/Text Outlines',
  // Custom MDX docs page (text-outlines.mdx) is the primary doc; opt out of autodocs.
  tags: ['!autodocs'],
  parameters: {
    layout: 'padded',
    // contentEditable demo surfaces trip a11y name/role checks; this is a sketch, not shipped UI.
    a11y: { test: 'off' },
  },
};
export default meta;

type Story = StoryObj;

export const ClipPathOutline: Story = {
  name: 'Clip-path outline',
  render: () => <ClipPathDemo />,
};

export const SvgPathOutline: Story = {
  name: 'SVG staircase path',
  render: () => <SvgStaircaseDemo />,
};
