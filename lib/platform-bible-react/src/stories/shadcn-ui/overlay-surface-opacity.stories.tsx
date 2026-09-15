import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fireEvent, screen, waitFor } from 'storybook/test';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/shadcn-ui/context-menu';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/shadcn-ui/dropdown-menu';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from '@/components/shadcn-ui/menubar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/shadcn-ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn-ui/select';
import { DEFAULT_STORYBOOK_THEME, STORYBOOK_THEME_IDS } from '../../../.storybook/theme-decorator';
import { applyPlatformBibleThemeToElement } from '../../../.storybook/theme-apply';

const meta: Meta = {
  title: 'Shadcn/Overlay Surface Opacity',
  // No autodocs: the docs page renders every story at once, and several menus opening together
  // dismiss each other.
  tags: ['!autodocs', 'test'],
};

export default meta;

type Story = StoryObj;

const TRANSLUCENT_CONTROL_TEST_ID = 'translucent-control';

/**
 * A deliberately translucent swatch the detector must report as translucent in every theme. Styled
 * inline rather than with a Tailwind class so the control does not add a translucent utility to the
 * library's emitted CSS.
 */
function TranslucentControl() {
  return (
    <div
      data-testid={TRANSLUCENT_CONTROL_TEST_ID}
      style={{
        width: 8,
        height: 8,
        backgroundColor: 'color-mix(in oklab, var(--popover) 70%, transparent)',
      }}
    />
  );
}

/**
 * Alpha (0–1) of an element's resolved background color. Painting the color onto a 1×1 canvas reads
 * it in whatever syntax the browser reports — `oklch(…)`, `oklab(… / 0.7)`, `rgba(…)`.
 */
function backgroundAlpha(element: Element): number {
  const color = getComputedStyle(element).backgroundColor;
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) throw new Error('No 2D canvas context available');
  // Assigning an unparseable color leaves `fillStyle` unchanged, and the default fill is opaque
  // black — which would report every surface as opaque. Start from a sentinel and fail if it survives.
  context.fillStyle = 'rgba(1, 2, 3, 0.5)';
  const sentinel = context.fillStyle;
  context.fillStyle = color;
  if (context.fillStyle === sentinel) throw new Error(`Canvas could not parse "${color}"`);
  context.fillRect(0, 0, 1, 1);
  return context.getImageData(0, 0, 1, 1).data[3] / 255;
}

/** Names of the element and its ancestors, up to `<body>`, whose `opacity` is below 1. */
function translucentLayers(element: HTMLElement): string[] {
  const layers: string[] = [];
  for (
    let node: HTMLElement | null = element;
    node && node !== document.body;
    node = node.parentElement
  ) {
    if (getComputedStyle(node).opacity !== '1') {
      layers.push(node.dataset.slot ?? node.tagName.toLowerCase());
    }
  }
  return layers;
}

function findOpenSurface(slot: string): HTMLElement {
  const surface = document.querySelector<HTMLElement>(`[data-slot="${slot}"]`);
  if (!surface) throw new Error(`No rendered element with data-slot="${slot}"`);
  return surface;
}

/**
 * Asserts each surface's own background is fully opaque in every Storybook theme, and that no
 * ancestor between it and `<body>` is left translucent by `opacity` in any of those themes either.
 *
 * The background is sampled, not scrolled: a scroll container's own background covers its whole box
 * at every scroll position, scrollbar gutter included, so an opaque background also covers the
 * scrolled state. The scrolling symptom itself is checked by hand in the running app.
 */
async function expectSurfacesOpaqueInEveryTheme(slots: readonly string[]) {
  const surfaces = await waitFor(() => slots.map(findOpenSurface));
  // `opacity` does not vary by theme, but an entry animation can hold it below 1 briefly; wait for
  // it to settle before the per-theme ancestor checks below sample it.
  await waitFor(() => expect(surfaces.flatMap(translucentLayers)).toEqual([]));

  const readings: { themeId: string; slot: string; alpha: number }[] = [];
  const controlAlphas: number[] = [];
  const popoverTokens = new Set<string>();
  const translucentLayersByTheme: { themeId: string; layers: string[] }[] = [];
  try {
    STORYBOOK_THEME_IDS.forEach((themeId) => {
      applyPlatformBibleThemeToElement(document.documentElement, themeId);
      popoverTokens.add(
        getComputedStyle(document.documentElement).getPropertyValue('--popover').trim(),
      );
      controlAlphas.push(backgroundAlpha(screen.getByTestId(TRANSLUCENT_CONTROL_TEST_ID)));
      translucentLayersByTheme.push({ themeId, layers: surfaces.flatMap(translucentLayers) });
      surfaces.forEach((surface) =>
        readings.push({
          themeId,
          slot: surface.dataset.slot ?? '',
          alpha: backgroundAlpha(surface),
        }),
      );
    });
  } finally {
    applyPlatformBibleThemeToElement(document.documentElement, DEFAULT_STORYBOOK_THEME);
  }
  // Positive controls: the theme really changed between iterations, and the detector can see a
  // translucent background. Without them an all-opaque result could mean a blind test.
  await expect(popoverTokens.size).toBeGreaterThan(1);
  await expect(controlAlphas.every((alpha) => alpha < 1)).toBe(true);
  await expect(translucentLayersByTheme.filter((entry) => entry.layers.length > 0)).toEqual([]);
  await expect(readings).toEqual(readings.map((reading) => ({ ...reading, alpha: 1 })));
}

export const DropdownMenuSurfaces: Story = {
  render: () => (
    <>
      <TranslucentControl />
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger>Open menu</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item</DropdownMenuItem>
          <DropdownMenuSub open>
            <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Sub item</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  ),
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['dropdown-menu-content', 'dropdown-menu-sub-content']);
  },
};

export const ContextMenuSurfaces: Story = {
  render: () => (
    <>
      <TranslucentControl />
      <ContextMenu>
        <ContextMenuTrigger>Right-click here</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item</ContextMenuItem>
          <ContextMenuSub open>
            <ContextMenuSubTrigger>More</ContextMenuSubTrigger>
            <ContextMenuSubContent>
              <ContextMenuItem>Sub item</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>
    </>
  ),
  play: async ({ canvas }) => {
    fireEvent.contextMenu(canvas.getByText('Right-click here'));
    await expectSurfacesOpaqueInEveryTheme(['context-menu-content', 'context-menu-sub-content']);
  },
};

export const MenubarSurfaces: Story = {
  render: () => (
    <>
      <TranslucentControl />
      <Menubar defaultValue="file">
        <MenubarMenu value="file">
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>Item</MenubarItem>
            <MenubarSub open>
              <MenubarSubTrigger>More</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem>Sub item</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  ),
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['menubar-content', 'menubar-sub-content']);
  },
};

export const SelectSurface: Story = {
  render: () => (
    <>
      <TranslucentControl />
      <Select defaultOpen defaultValue="one">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="one">One</SelectItem>
          <SelectItem value="two">Two</SelectItem>
        </SelectContent>
      </Select>
    </>
  ),
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['select-content']);
  },
};

export const PopoverSurface: Story = {
  render: () => (
    <>
      <TranslucentControl />
      <Popover defaultOpen>
        <PopoverTrigger>Open popover</PopoverTrigger>
        <PopoverContent>Popover body</PopoverContent>
      </Popover>
    </>
  ),
  play: async () => {
    await expectSurfacesOpaqueInEveryTheme(['popover-content']);
  },
};
