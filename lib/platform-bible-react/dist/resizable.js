import { jsx, jsxs, Fragment as Fragment$1 } from "react/jsx-runtime";
import { Slot, Dialog as Dialog$1, Separator as Separator$1, Popover as Popover$1, Tooltip as Tooltip$1, DropdownMenu as DropdownMenu$1, Label as Label$1, RadioGroup as RadioGroup$1 } from "radix-ui";
import { IconX, IconCheck, IconSearch, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { Canon } from "@sillsdev/scripture";
import React, { useRef, useEffect, useCallback, useState, createContext, useContext, useMemo, Fragment, useLayoutEffect, useImperativeHandle, useId, forwardRef } from "react";
import { X, Check, ChevronsUpDown, Star, Undo, Redo, SquareX, FunctionSquare, SquareSigma, Ban, Copy, Redo2, Undo2, Sparkles, ClipboardCopy, ClipboardCheck, CircleCheckBig, MessageSquare, Search, Library, BookOpen, BookMarked, Book, MessageSquarePlus, PanelBottom, FileText, Scan, ZoomOut, ZoomIn, Eye, Pencil, BookCopy, Users, ExternalLink, CircleQuestionMark, Settings, BookA, House, Download, RefreshCw, Group, ArrowRight, Loader2, ChevronDown, AlertTriangle, LoaderCircle } from "lucide-react";
import { cva } from "class-variance-authority";
import { filterAndRankItems, GENERATOR_NOTE_CALLER, HIDDEN_NOTE_CALLER, isInsertEmbedOpOfType, getDefaultViewOptions, getMarkerMenuItems, defaultStyleInfo, Editorial } from "@eten-tech-foundation/platform-editor";
import { Section, MODIFIER_KEYS, split, slice, formatReplacementString, usfmMarkers, deepEqual, isPlatformError, ABORTED, getErrorMessage, normalizeProjectId, compareProjectsByName, PROJECT_SELECTOR_CUSTOM_DATA_KEYS, formatProjectName, getLocalizeKeyForScrollGroupId as getLocalizeKeyForScrollGroupId$1, hasDistinctFullName, getSectionForBook } from "platform-bible-utils";
import { Command as Command$1 } from "cmdk";
import "@eten-tech-foundation/scripture-utilities";
import * as ResizablePrimitive from "react-resizable-panels";
import { clsx } from "clsx";
import { extendTailwindMerge, twMerge } from "tailwind-merge";
const twMergeWithTwPrefix = extendTailwindMerge({ prefix: "tw" });
function splitClassSegments(cls) {
  const segments = [];
  let current = "";
  let bracketDepth = 0;
  for (let i = 0; i < cls.length; i++) {
    const char = cls[i];
    if (char === "[") bracketDepth += 1;
    else if (char === "]") bracketDepth -= 1;
    if (char === ":" && bracketDepth === 0) {
      segments.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  segments.push(current);
  return segments;
}
function normalizeTw3ToTw4(token) {
  if (token.startsWith("tw:")) {
    return { normalized: token, original: token };
  }
  const segments = splitClassSegments(token);
  const negFormBIndex = segments.findIndex((s) => s.startsWith("-tw-"));
  if (negFormBIndex !== -1) {
    const utility = segments[negFormBIndex].slice(4);
    const variants = segments.filter((_, i) => i !== negFormBIndex);
    const normalized = `tw:${[...variants, `-${utility}`].join(":")}`;
    return { normalized, original: token };
  }
  const importantFormIndex = segments.findIndex((s) => s.startsWith("!tw-"));
  if (importantFormIndex !== -1) {
    const utility = segments[importantFormIndex].slice(4);
    const variants = segments.filter((_, i) => i !== importantFormIndex);
    const normalized = `tw:${[...variants, `!${utility}`].join(":")}`;
    return { normalized, original: token };
  }
  const lastSegment = segments[segments.length - 1];
  if (lastSegment.startsWith("tw-")) {
    const utility = lastSegment.slice(3);
    const variants = segments.slice(0, -1);
    const normalized = `tw:${[...variants, utility].join(":")}`;
    return { normalized, original: token };
  }
  return { normalized: token, original: token };
}
function restoreToOriginalFormat(normalizedClass, originalFormat) {
  if (originalFormat.startsWith("tw:")) {
    return normalizedClass;
  }
  const segments = splitClassSegments(normalizedClass);
  if (segments[0] !== "tw") return normalizedClass;
  const variants = segments.slice(1, -1);
  const utility = segments[segments.length - 1];
  const origSegments = splitClassSegments(originalFormat);
  const wasNegFormB = origSegments.some((s) => s.startsWith("-tw-"));
  const wasImportantForm = origSegments.some((s) => s.startsWith("!tw-"));
  if (wasNegFormB && utility.startsWith("-")) {
    const positiveUtility = utility.slice(1);
    return [...variants, `-tw-${positiveUtility}`].join(":");
  }
  if (wasImportantForm && utility.startsWith("!")) {
    const bareUtility = utility.slice(1);
    return [...variants, `!tw-${bareUtility}`].join(":");
  }
  return [...variants, `tw-${utility}`].join(":");
}
function cn(...inputs) {
  const resolved = clsx(inputs);
  if (!resolved) return resolved;
  if (resolved.indexOf("tw-") === -1) return twMergeWithTwPrefix(resolved);
  const tokens = resolved.split(" ").filter(Boolean);
  const lastSeenOriginal = /* @__PURE__ */ new Map();
  const normalizedTokens = [];
  tokens.forEach((token) => {
    const info = normalizeTw3ToTw4(token);
    lastSeenOriginal.set(info.normalized, info.original);
    normalizedTokens.push(info.normalized);
  });
  const merged = twMerge(normalizedTokens.join(" "));
  const mergedTokens = merged.split(" ").filter(Boolean);
  const restored = mergedTokens.map((mergedToken) => {
    const original = lastSeenOriginal.get(mergedToken);
    if (!original) return mergedToken;
    return restoreToOriginalFormat(mergedToken, original);
  });
  return restored.join(" ");
}
const Z_INDEX_ABOVE_DOCK = 600;
const Z_INDEX_ABOVE_POPOVER = 650;
const Z_INDEX_OVERLAY = 400;
const Z_INDEX_MODAL_BACKDROP = 450;
const Z_INDEX_MODAL = 500;
const Z_INDEX_NESTED_MODAL_BACKDROP = 510;
const Z_INDEX_NESTED_MODAL = 520;
const Z_INDEX_TOOLTIP = 675;
const Z_INDEX_ONBOARDING_TOUR = 690;
const Z_INDEX_FIRST_RUN = 700;
const Z_INDEX_CONNECTION_LOST = 800;
const buttonVariants = cva(
  // CUSTOM: Added 'pr-twp' at the front of the base class string to apply Platform.Bible's
  // Tailwind CSS scope isolation. All Button instances inherit this via buttonVariants.
  // CUSTOM: Moved the pressed-state nudge off 'tw:active:not-aria-[haspopup]:translate-y-px' onto
  // 'transform'. Every Tailwind translate utility writes the same '--tw-translate-y', so the nudge
  // replaced a caller's centering translate rather than adding to it. The browser applies
  // 'translate', 'rotate' and 'scale' before 'transform', so those compose (a caller 'rotate-*' or
  // 'scale-*' does rotate or scale the 1px); caller 'skew-*', 'rotate-x/y/z-*', 'transform*'
  // utilities and inline style transforms still override it.
  "pr-twp tw:group/button tw:inline-flex tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:border tw:border-transparent tw:bg-clip-padding tw:text-sm tw:font-medium tw:whitespace-nowrap tw:transition-all tw:outline-none tw:select-none tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:active:not-aria-[haspopup]:transform-[translateY(1px)] tw:disabled:pointer-events-none tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "tw:bg-primary tw:text-primary-foreground tw:[a]:hover:bg-primary/80",
        outline: "tw:border-border tw:bg-background tw:hover:bg-muted tw:hover:text-foreground tw:aria-expanded:bg-muted tw:aria-expanded:text-foreground tw:dark:border-input tw:dark:bg-input/30 tw:dark:hover:bg-input/50",
        secondary: "tw:bg-secondary tw:text-secondary-foreground tw:hover:bg-secondary/80 tw:aria-expanded:bg-secondary tw:aria-expanded:text-secondary-foreground",
        ghost: "tw:hover:bg-muted tw:hover:text-foreground tw:aria-expanded:bg-muted tw:aria-expanded:text-foreground tw:dark:hover:bg-muted/50",
        destructive: "tw:bg-destructive/10 tw:text-destructive tw:hover:bg-destructive/20 tw:focus-visible:border-destructive/40 tw:focus-visible:ring-destructive/20 tw:dark:bg-destructive/20 tw:dark:hover:bg-destructive/30 tw:dark:focus-visible:ring-destructive/40",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline",
        // CUSTOM: Added 'subtle' variant — no background, muted color at rest, foreground on hover.
        // Use when a button should visually recede into the layout by default.
        subtle: "tw:text-muted-foreground tw:hover:text-foreground"
      },
      size: {
        default: "tw:h-8 tw:gap-1.5 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",
        // CUSTOM: Renamed 'var(--radius-md)' to 'var(--tw-radius-md)' in the rounding utilities for
        // the sizes that clamp their radius. 'src/index.css' imports Tailwind with 'prefix(tw)',
        // which emits every '@theme' variable under a 'tw' prefix, so the boilerplate's unprefixed
        // name resolves to nothing. That invalidates the whole 'min()' and leaves those sizes with
        // square corners.
        xs: "tw:h-6 tw:gap-1 tw:rounded-[min(var(--tw-radius-md),10px)] tw:px-2 tw:text-xs tw:in-data-[slot=button-group]:rounded-lg tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3",
        sm: "tw:h-7 tw:gap-1 tw:rounded-[min(var(--tw-radius-md),12px)] tw:px-2.5 tw:text-[0.8rem] tw:in-data-[slot=button-group]:rounded-lg tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:[&_svg:not([class*=size-])]:size-3.5",
        lg: "tw:h-9 tw:gap-1.5 tw:px-2.5 tw:has-data-[icon=inline-end]:pe-2 tw:has-data-[icon=inline-start]:ps-2",
        icon: "tw:size-8",
        "icon-xs": "tw:size-6 tw:rounded-[min(var(--tw-radius-md),10px)] tw:in-data-[slot=button-group]:rounded-lg tw:[&_svg:not([class*=size-])]:size-3",
        "icon-sm": "tw:size-7 tw:rounded-[min(var(--tw-radius-md),12px)] tw:in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "tw:size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      "data-variant": variant,
      "data-size": size,
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
const STORAGE_KEY = "layoutDirection";
function getStorage() {
  return globalThis.localStorage ?? void 0;
}
function readDirection() {
  var _a;
  try {
    const retrieved = (_a = getStorage()) == null ? void 0 : _a.getItem(STORAGE_KEY);
    if (retrieved === "rtl") {
      return retrieved;
    }
  } catch {
  }
  return "ltr";
}
function persistDirection(dir) {
  var _a;
  try {
    (_a = getStorage()) == null ? void 0 : _a.setItem(STORAGE_KEY, dir);
  } catch {
  }
}
function Dialog({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog$1.Root, { "data-slot": "dialog", ...props });
}
function DialogTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog$1.Trigger, { "data-slot": "dialog-trigger", ...props });
}
function DialogPortal({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog$1.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({ ...props }) {
  return /* @__PURE__ */ jsx(Dialog$1.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog$1.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        // CUSTOM: Removed tw:z-50; z-index is set via the style prop using Z_INDEX_MODAL_BACKDROP constant
        "tw:fixed tw:inset-0 tw:isolate tw:bg-black/10 tw:duration-100 tw:supports-backdrop-filter:backdrop-blur-xs tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-closed:animate-out tw:data-closed:fade-out-0",
        className
      ),
      style: { zIndex: Z_INDEX_MODAL_BACKDROP, ...style },
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  // CUSTOM: Destructure overlayClassName to forward to DialogOverlay for per-call backdrop styling
  overlayClassName,
  // CUSTOM: Destructure overlayStyle to forward to DialogOverlay for per-call backdrop z-index
  overlayStyle,
  // CUSTOM: Destructure style to allow merging with shared z-index constant
  style,
  ...props
}) {
  const dir = readDirection();
  return /* @__PURE__ */ jsxs(DialogPortal, { children: [
    /* @__PURE__ */ jsx(DialogOverlay, { className: overlayClassName, style: overlayStyle }),
    /* @__PURE__ */ jsxs(
      Dialog$1.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 (handled via style prop)
          "pr-twp tw:fixed tw:top-1/2 tw:start-1/2 tw:grid tw:w-full tw:max-w-[calc(100%-2rem)] tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:gap-4 tw:rounded-xl tw:bg-popover tw:p-4 tw:text-sm tw:text-popover-foreground tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:outline-none tw:sm:max-w-sm tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          className
        ),
        style: { zIndex: Z_INDEX_MODAL, ...style },
        dir,
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsx(Dialog$1.Close, { "data-slot": "dialog-close", asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "ghost", className: "tw:absolute tw:top-2 tw:end-2", size: "icon-sm", children: [
            /* @__PURE__ */ jsx(IconX, {}),
            /* @__PURE__ */ jsx("span", { className: "tw:sr-only", children: "Close" })
          ] }) })
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; sm:tw:text-start uses logical property for RTL awareness
        "pr-twp tw:flex tw:flex-col tw:gap-2 tw:sm:text-start",
        className
      ),
      ...props
    }
  );
}
function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-4 tw:-mb-4 tw:flex tw:flex-col-reverse tw:gap-2 tw:rounded-b-xl tw:border-t tw:bg-muted/50 tw:p-4 tw:sm:flex-row tw:sm:justify-end",
        className
      ),
      ...props,
      children: [
        children,
        showCloseButton && /* @__PURE__ */ jsx(Dialog$1.Close, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", children: "Close" }) })
      ]
    }
  );
}
function DialogTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Dialog$1.Title,
    {
      "data-slot": "dialog-title",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:font-heading tw:text-base tw:leading-none tw:font-medium",
        className
      ),
      ...props
    }
  );
}
function DialogDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Dialog$1.Description,
    {
      "data-slot": "dialog-description",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:text-sm tw:text-muted-foreground tw:*:[a]:underline tw:*:[a]:underline-offset-3 tw:*:[a]:hover:text-foreground",
        className
      ),
      ...props
    }
  );
}
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Removed tw:w-full to give callers control over width
        // CUSTOM: Added tw:file:text-foreground so the file-picker button text matches the foreground design token
        "pr-twp tw:h-8 tw:min-w-0 tw:rounded-lg tw:border tw:border-input tw:bg-transparent tw:px-2.5 tw:py-1 tw:text-base tw:transition-colors tw:outline-none tw:file:inline-flex tw:file:h-6 tw:file:border-0 tw:file:bg-transparent tw:file:text-sm tw:file:font-medium tw:file:text-foreground tw:placeholder:text-muted-foreground tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:pointer-events-none tw:disabled:cursor-not-allowed tw:disabled:bg-input/50 tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:md:text-sm tw:dark:bg-input/30 tw:dark:disabled:bg-input/80 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}
function InputGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "input-group",
      role: "group",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/input-group tw:relative tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:items-center tw:rounded-lg tw:border tw:border-input tw:transition-colors tw:outline-none tw:in-data-[slot=combobox-content]:focus-within:border-inherit tw:in-data-[slot=combobox-content]:focus-within:ring-0 tw:has-disabled:bg-input/50 tw:has-disabled:opacity-50 tw:has-[[data-slot=input-group-control]:focus-visible]:border-ring tw:has-[[data-slot=input-group-control]:focus-visible]:ring-3 tw:has-[[data-slot=input-group-control]:focus-visible]:ring-ring/50 tw:has-[[data-slot][aria-invalid=true]]:border-destructive tw:has-[[data-slot][aria-invalid=true]]:ring-3 tw:has-[[data-slot][aria-invalid=true]]:ring-destructive/20 tw:has-[>[data-align=block-end]]:h-auto tw:has-[>[data-align=block-end]]:flex-col tw:has-[>[data-align=block-start]]:h-auto tw:has-[>[data-align=block-start]]:flex-col tw:has-[>textarea]:h-auto tw:dark:bg-input/30 tw:dark:has-disabled:bg-input/80 tw:dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 tw:has-[>[data-align=block-end]]:[&>input]:pt-3 tw:has-[>[data-align=block-start]]:[&>input]:pb-3 tw:has-[>[data-align=inline-end]]:[&>input]:pe-1.5 tw:has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        className
      ),
      ...props
    }
  );
}
const inputGroupAddonVariants = cva(
  "tw:flex tw:h-auto tw:cursor-text tw:items-center tw:justify-center tw:gap-2 tw:py-1.5 tw:text-sm tw:font-medium tw:text-muted-foreground tw:select-none tw:group-data-[disabled=true]/input-group:opacity-50 tw:[&>kbd]:rounded-[calc(var(--radius)-5px)] tw:[&>svg:not([class*=size-])]:size-4",
  {
    variants: {
      align: {
        "inline-start": "tw:order-first tw:ps-2 tw:has-[>button]:ms-[-0.3rem] tw:has-[>kbd]:ms-[-0.15rem]",
        "inline-end": "tw:order-last tw:pe-2 tw:has-[>button]:me-[-0.3rem] tw:has-[>kbd]:me-[-0.15rem]",
        "block-start": "tw:order-first tw:w-full tw:justify-start tw:px-2.5 tw:pt-2 tw:group-has-[>input]/input-group:pt-2 tw:[.border-b]:pb-2",
        "block-end": "tw:order-last tw:w-full tw:justify-start tw:px-2.5 tw:pb-2 tw:group-has-[>input]/input-group:pb-2 tw:[.border-t]:pt-2"
      }
    },
    defaultVariants: {
      align: "inline-start"
    }
  }
);
function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}) {
  return (
    // CUSTOM: Clicking anywhere in the addon area proxies focus to the associated input — a
    // deliberate UX enhancement. The a11y rules flag a non-interactive role="group" element having
    // a click handler, but removing the handler would degrade the UX. Keyboard focus on the input
    // itself is still accessible and not affected by this handler.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    /* @__PURE__ */ jsx(
      "div",
      {
        role: "group",
        "data-slot": "input-group-addon",
        "data-align": align,
        className: cn(inputGroupAddonVariants({ align }), className),
        onClick: (e) => {
          var _a, _b;
          if (e.target instanceof HTMLElement && e.target.closest("button")) {
            return;
          }
          (_b = (_a = e.currentTarget.parentElement) == null ? void 0 : _a.querySelector("input")) == null ? void 0 : _b.focus();
        },
        ...props
      }
    )
  );
}
cva("tw:flex tw:items-center tw:gap-2 tw:text-sm tw:shadow-none", {
  variants: {
    size: {
      xs: "tw:h-6 tw:gap-1 tw:rounded-[calc(var(--radius)-3px)] tw:px-1.5 tw:[&>svg:not([class*=size-])]:size-3.5",
      sm: "tw:",
      "icon-xs": "tw:size-6 tw:rounded-[calc(var(--radius)-3px)] tw:p-0 tw:has-[>svg]:p-0",
      "icon-sm": "tw:size-8 tw:p-0 tw:has-[>svg]:p-0"
    }
  },
  defaultVariants: {
    size: "xs"
  }
});
function Command({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Command$1,
    {
      "data-slot": "command",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:size-full tw:flex-col tw:overflow-hidden tw:rounded-xl! tw:bg-popover tw:p-1 tw:text-popover-foreground",
        className
      ),
      ...props
    }
  );
}
function CommandInput({
  className,
  // CUSTOM: destructure `onKeyDown` from props so we can compose with our space-to-click handler below
  onKeyDown,
  // CUSTOM: opt-in flag for the space-to-click behavior; not a DOM attribute, so keep it out of
  // the spread below
  spaceSelectsHighlightedItem = false,
  ...props
}) {
  const dir = readDirection();
  const handleKeyDown = React.useCallback(
    (event) => {
      onKeyDown == null ? void 0 : onKeyDown(event);
      if (event.defaultPrevented) return;
      if (!spaceSelectsHighlightedItem) return;
      if (event.key !== " ") return;
      if (event.currentTarget.value !== "") return;
      const commandRoot = event.currentTarget.closest("[cmdk-root]");
      const highlighted = commandRoot == null ? void 0 : commandRoot.querySelector(
        '[cmdk-item][data-selected="true"]:not([data-disabled="true"])'
      );
      if (!highlighted) return;
      event.preventDefault();
      event.stopPropagation();
      highlighted.click();
    },
    [onKeyDown, spaceSelectsHighlightedItem]
  );
  return (
    // CUSTOM: Added dir prop for RTL support
    /* @__PURE__ */ jsx("div", { "data-slot": "command-input-wrapper", className: "tw:p-1 tw:pb-0", dir, children: /* @__PURE__ */ jsxs(InputGroup, { className: "tw:h-8! tw:rounded-lg! tw:border-input/30 tw:bg-input/30 tw:shadow-none! tw:*:data-[slot=input-group-addon]:ps-2!", children: [
      /* @__PURE__ */ jsx(
        Command$1.Input,
        {
          "data-slot": "command-input",
          className: cn(
            "tw:w-full tw:text-sm tw:outline-hidden tw:disabled:cursor-not-allowed tw:disabled:opacity-50",
            className
          ),
          onKeyDown: handleKeyDown,
          ...props
        }
      ),
      /* @__PURE__ */ jsx(InputGroupAddon, { children: /* @__PURE__ */ jsx(IconSearch, { className: "tw:size-4 tw:shrink-0 tw:opacity-50" }) })
    ] }) })
  );
}
function CommandList({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Command$1.List,
    {
      "data-slot": "command-list",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation.
        // CUSTOM: Removed tw:no-scrollbar so the vertical scrollbar is visible when the
        // list overflows tw:max-h-72 (needed for long filter lists like language pickers).
        "pr-twp tw:max-h-72 tw:scroll-py-1 tw:overflow-x-hidden tw:overflow-y-auto tw:outline-none",
        className
      ),
      ...props
    }
  );
}
function CommandEmpty({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Empty,
    {
      "data-slot": "command-empty",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:py-6 tw:text-center tw:text-sm",
        className
      ),
      ...props
    }
  );
}
function CommandGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Group,
    {
      "data-slot": "command-group",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:overflow-hidden tw:p-1 tw:text-foreground tw:**:[[cmdk-group-heading]]:px-2 tw:**:[[cmdk-group-heading]]:py-1.5 tw:**:[[cmdk-group-heading]]:text-xs tw:**:[[cmdk-group-heading]]:font-medium tw:**:[[cmdk-group-heading]]:text-muted-foreground",
        className
      ),
      ...props
    }
  );
}
function CommandSeparator({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Command$1.Separator,
    {
      "data-slot": "command-separator",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:-mx-1 tw:h-px tw:bg-border",
        className
      ),
      ...props
    }
  );
}
function CommandItem({
  className,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxs(
    Command$1.Item,
    {
      "data-slot": "command-item",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/command-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-2 tw:rounded-sm tw:px-2 tw:py-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:in-data-[slot=dialog-content]:rounded-lg! tw:data-[disabled=true]:pointer-events-none tw:data-[disabled=true]:opacity-50 tw:data-selected:bg-muted tw:data-selected:text-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-selected:*:[svg]:text-foreground",
        className
      ),
      ...props,
      children: [
        children,
        /* @__PURE__ */ jsx(IconCheck, { className: "tw:ms-auto tw:opacity-0 tw:group-has-data-[slot=command-shortcut]/command-item:hidden tw:group-data-[checked=true]/command-item:opacity-100" })
      ]
    }
  );
}
function CommandShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-slot": "command-shortcut",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; tw:ms-auto uses logical margin for RTL support
        "pr-twp tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-data-selected/command-item:text-foreground",
        className
      ),
      ...props
    }
  );
}
const scrBookData = [
  { shortName: "ERR", fullNames: ["ERROR"], chapters: -1 },
  { shortName: "GEN", fullNames: ["Genesis"], chapters: 50 },
  { shortName: "EXO", fullNames: ["Exodus"], chapters: 40 },
  { shortName: "LEV", fullNames: ["Leviticus"], chapters: 27 },
  { shortName: "NUM", fullNames: ["Numbers"], chapters: 36 },
  { shortName: "DEU", fullNames: ["Deuteronomy"], chapters: 34 },
  { shortName: "JOS", fullNames: ["Joshua"], chapters: 24 },
  { shortName: "JDG", fullNames: ["Judges"], chapters: 21 },
  { shortName: "RUT", fullNames: ["Ruth"], chapters: 4 },
  { shortName: "1SA", fullNames: ["1 Samuel"], chapters: 31 },
  { shortName: "2SA", fullNames: ["2 Samuel"], chapters: 24 },
  { shortName: "1KI", fullNames: ["1 Kings"], chapters: 22 },
  { shortName: "2KI", fullNames: ["2 Kings"], chapters: 25 },
  { shortName: "1CH", fullNames: ["1 Chronicles"], chapters: 29 },
  { shortName: "2CH", fullNames: ["2 Chronicles"], chapters: 36 },
  { shortName: "EZR", fullNames: ["Ezra"], chapters: 10 },
  { shortName: "NEH", fullNames: ["Nehemiah"], chapters: 13 },
  { shortName: "EST", fullNames: ["Esther"], chapters: 10 },
  { shortName: "JOB", fullNames: ["Job"], chapters: 42 },
  { shortName: "PSA", fullNames: ["Psalm", "Psalms"], chapters: 150 },
  { shortName: "PRO", fullNames: ["Proverbs"], chapters: 31 },
  { shortName: "ECC", fullNames: ["Ecclesiastes"], chapters: 12 },
  { shortName: "SNG", fullNames: ["Song of Solomon", "Song of Songs"], chapters: 8 },
  { shortName: "ISA", fullNames: ["Isaiah"], chapters: 66 },
  { shortName: "JER", fullNames: ["Jeremiah"], chapters: 52 },
  { shortName: "LAM", fullNames: ["Lamentations"], chapters: 5 },
  { shortName: "EZK", fullNames: ["Ezekiel"], chapters: 48 },
  { shortName: "DAN", fullNames: ["Daniel"], chapters: 12 },
  { shortName: "HOS", fullNames: ["Hosea"], chapters: 14 },
  { shortName: "JOL", fullNames: ["Joel"], chapters: 3 },
  { shortName: "AMO", fullNames: ["Amos"], chapters: 9 },
  { shortName: "OBA", fullNames: ["Obadiah"], chapters: 1 },
  { shortName: "JON", fullNames: ["Jonah"], chapters: 4 },
  { shortName: "MIC", fullNames: ["Micah"], chapters: 7 },
  { shortName: "NAM", fullNames: ["Nahum"], chapters: 3 },
  { shortName: "HAB", fullNames: ["Habakkuk"], chapters: 3 },
  { shortName: "ZEP", fullNames: ["Zephaniah"], chapters: 3 },
  { shortName: "HAG", fullNames: ["Haggai"], chapters: 2 },
  { shortName: "ZEC", fullNames: ["Zechariah"], chapters: 14 },
  { shortName: "MAL", fullNames: ["Malachi"], chapters: 4 },
  { shortName: "MAT", fullNames: ["Matthew"], chapters: 28 },
  { shortName: "MRK", fullNames: ["Mark"], chapters: 16 },
  { shortName: "LUK", fullNames: ["Luke"], chapters: 24 },
  { shortName: "JHN", fullNames: ["John"], chapters: 21 },
  { shortName: "ACT", fullNames: ["Acts"], chapters: 28 },
  { shortName: "ROM", fullNames: ["Romans"], chapters: 16 },
  { shortName: "1CO", fullNames: ["1 Corinthians"], chapters: 16 },
  { shortName: "2CO", fullNames: ["2 Corinthians"], chapters: 13 },
  { shortName: "GAL", fullNames: ["Galatians"], chapters: 6 },
  { shortName: "EPH", fullNames: ["Ephesians"], chapters: 6 },
  { shortName: "PHP", fullNames: ["Philippians"], chapters: 4 },
  { shortName: "COL", fullNames: ["Colossians"], chapters: 4 },
  { shortName: "1TH", fullNames: ["1 Thessalonians"], chapters: 5 },
  { shortName: "2TH", fullNames: ["2 Thessalonians"], chapters: 3 },
  { shortName: "1TI", fullNames: ["1 Timothy"], chapters: 6 },
  { shortName: "2TI", fullNames: ["2 Timothy"], chapters: 4 },
  { shortName: "TIT", fullNames: ["Titus"], chapters: 3 },
  { shortName: "PHM", fullNames: ["Philemon"], chapters: 1 },
  { shortName: "HEB", fullNames: ["Hebrews"], chapters: 13 },
  { shortName: "JAS", fullNames: ["James"], chapters: 5 },
  { shortName: "1PE", fullNames: ["1 Peter"], chapters: 5 },
  { shortName: "2PE", fullNames: ["2 Peter"], chapters: 3 },
  { shortName: "1JN", fullNames: ["1 John"], chapters: 5 },
  { shortName: "2JN", fullNames: ["2 John"], chapters: 1 },
  { shortName: "3JN", fullNames: ["3 John"], chapters: 1 },
  { shortName: "JUD", fullNames: ["Jude"], chapters: 1 },
  { shortName: "REV", fullNames: ["Revelation"], chapters: 22 },
  // DC and other - TJ got book names from Canon.ts and chapter numbers from finding the largest
  // number among all the `.vrs` files in `Paratext/My Paratext Projects`. There were a few books
  // that had varying chapter numbers, and some books that had skipped chapter numbers. This model
  // is just not good enough; we need versification to make a perfect model.
  { shortName: "TOB", fullNames: ["Tobit"], chapters: 14 },
  { shortName: "JDT", fullNames: ["Judith"], chapters: 16 },
  { shortName: "ESG", fullNames: ["Esther Greek"], chapters: 11 },
  { shortName: "WIS", fullNames: ["Wisdom of Solomon"], chapters: 19 },
  { shortName: "SIR", fullNames: ["Sirach (Ecclesiasticus)"], chapters: 52 },
  { shortName: "BAR", fullNames: ["Baruch"], chapters: 6 },
  { shortName: "LJE", fullNames: ["Letter of Jeremiah"], chapters: 1 },
  { shortName: "S3Y", fullNames: ["Song of 3 Young Men"], chapters: 1 },
  { shortName: "SUS", fullNames: ["Susanna"], chapters: 1 },
  { shortName: "BEL", fullNames: ["Bel and the Dragon"], chapters: 1 },
  { shortName: "1MA", fullNames: ["1 Maccabees"], chapters: 16 },
  { shortName: "2MA", fullNames: ["2 Maccabees"], chapters: 15 },
  { shortName: "3MA", fullNames: ["3 Maccabees"], chapters: 7 },
  { shortName: "4MA", fullNames: ["4 Maccabees"], chapters: 18 },
  { shortName: "1ES", fullNames: ["1 Esdras (Greek)"], chapters: 9 },
  { shortName: "2ES", fullNames: ["2 Esdras (Latin)"], chapters: 16 },
  { shortName: "MAN", fullNames: ["Prayer of Manasseh"], chapters: 1 },
  { shortName: "PS2", fullNames: ["Psalm 151"], chapters: 1 },
  { shortName: "ODA", fullNames: ["Odes"], chapters: 14 },
  { shortName: "PSS", fullNames: ["Psalms of Solomon"], chapters: 18 },
  { shortName: "JSA", fullNames: ["Joshua A. *obsolete*"], chapters: 24 },
  { shortName: "JDB", fullNames: ["Judges B. *obsolete*"], chapters: 21 },
  { shortName: "TBS", fullNames: ["Tobit S. *obsolete*"], chapters: 14 },
  { shortName: "SST", fullNames: ["Susanna Th. *obsolete*"], chapters: 1 },
  { shortName: "DNT", fullNames: ["Daniel Th. *obsolete*"], chapters: 12 },
  { shortName: "BLT", fullNames: ["Bel Th. *obsolete*"], chapters: 1 },
  // TJ could not find a number of chapters for these books, so he just set it to 1
  { shortName: "XXA", fullNames: ["Extra A"], chapters: 1 },
  { shortName: "XXB", fullNames: ["Extra B"], chapters: 1 },
  { shortName: "XXC", fullNames: ["Extra C"], chapters: 1 },
  { shortName: "XXD", fullNames: ["Extra D"], chapters: 1 },
  { shortName: "XXE", fullNames: ["Extra E"], chapters: 1 },
  { shortName: "XXF", fullNames: ["Extra F"], chapters: 1 },
  { shortName: "XXG", fullNames: ["Extra G"], chapters: 1 },
  { shortName: "FRT", fullNames: ["Front Matter"], chapters: 1 },
  { shortName: "BAK", fullNames: ["Back Matter"], chapters: 1 },
  { shortName: "OTH", fullNames: ["Other Matter"], chapters: 1 },
  { shortName: "3ES", fullNames: ["3 Ezra *obsolete*"], chapters: 1 },
  // End of books TJ set to 1 chapter
  { shortName: "EZA", fullNames: ["Apocalypse of Ezra"], chapters: 12 },
  { shortName: "5EZ", fullNames: ["5 Ezra (Latin Prologue)"], chapters: 2 },
  { shortName: "6EZ", fullNames: ["6 Ezra (Latin Epilogue)"], chapters: 12 },
  // TJ could not find a number of chapters for these books, so he just set it to 1
  { shortName: "INT", fullNames: ["Introduction"], chapters: 1 },
  { shortName: "CNC", fullNames: ["Concordance "], chapters: 1 },
  { shortName: "GLO", fullNames: ["Glossary "], chapters: 1 },
  { shortName: "TDX", fullNames: ["Topical Index"], chapters: 1 },
  { shortName: "NDX", fullNames: ["Names Index"], chapters: 1 },
  // End of books TJ set to 1 chapter
  { shortName: "DAG", fullNames: ["Daniel Greek"], chapters: 14 },
  { shortName: "PS3", fullNames: ["Psalms 152-155"], chapters: 4 },
  { shortName: "2BA", fullNames: ["2 Baruch (Apocalypse)"], chapters: 77 },
  { shortName: "LBA", fullNames: ["Letter of Baruch"], chapters: 86 },
  { shortName: "JUB", fullNames: ["Jubilees"], chapters: 34 },
  { shortName: "ENO", fullNames: ["Enoch"], chapters: 42 },
  { shortName: "1MQ", fullNames: ["1 Meqabyan"], chapters: 36 },
  { shortName: "2MQ", fullNames: ["2 Meqabyan"], chapters: 20 },
  { shortName: "3MQ", fullNames: ["3 Meqabyan"], chapters: 10 },
  { shortName: "REP", fullNames: ["Reproof (Proverbs 25-31)"], chapters: 6 },
  { shortName: "4BA", fullNames: ["4 Baruch (Rest of Baruch)"], chapters: 5 },
  { shortName: "LAO", fullNames: ["Laodiceans"], chapters: 1 }
];
const getChaptersForBook = (bookNum) => {
  var _a;
  return ((_a = scrBookData[bookNum]) == null ? void 0 : _a.chapters) ?? -1;
};
const ALL_BOOK_IDS = Canon.allBookIds.filter(
  (bookId) => !Canon.isObsolete(Canon.bookIdToNumber(bookId))
);
function getBookIdsFromBooksPresent(booksPresent) {
  const ids = [];
  const bookCount = Math.min(booksPresent.length, Canon.allBookIds.length);
  for (let index = 0; index < bookCount; index += 1) {
    if (booksPresent[index] === "1") ids.push(Canon.bookNumberToId(index + 1));
  }
  return ids;
}
function getLocalizeKeyForScrollGroupId(scrollGroupId) {
  return `%scrollGroup_${scrollGroupId}%`;
}
const DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS = {
  [getLocalizeKeyForScrollGroupId("undefined")]: "Ø",
  [getLocalizeKeyForScrollGroupId(0)]: "A",
  [getLocalizeKeyForScrollGroupId(1)]: "B",
  [getLocalizeKeyForScrollGroupId(2)]: "C",
  [getLocalizeKeyForScrollGroupId(3)]: "D",
  [getLocalizeKeyForScrollGroupId(4)]: "E",
  [getLocalizeKeyForScrollGroupId(5)]: "F",
  [getLocalizeKeyForScrollGroupId(6)]: "G",
  [getLocalizeKeyForScrollGroupId(7)]: "H",
  [getLocalizeKeyForScrollGroupId(8)]: "I",
  [getLocalizeKeyForScrollGroupId(9)]: "J",
  [getLocalizeKeyForScrollGroupId(10)]: "K",
  [getLocalizeKeyForScrollGroupId(11)]: "L",
  [getLocalizeKeyForScrollGroupId(12)]: "M",
  [getLocalizeKeyForScrollGroupId(13)]: "N",
  [getLocalizeKeyForScrollGroupId(14)]: "O",
  [getLocalizeKeyForScrollGroupId(15)]: "P",
  [getLocalizeKeyForScrollGroupId(16)]: "Q",
  [getLocalizeKeyForScrollGroupId(17)]: "R",
  [getLocalizeKeyForScrollGroupId(18)]: "S",
  [getLocalizeKeyForScrollGroupId(19)]: "T",
  [getLocalizeKeyForScrollGroupId(20)]: "U",
  [getLocalizeKeyForScrollGroupId(21)]: "V",
  [getLocalizeKeyForScrollGroupId(22)]: "W",
  [getLocalizeKeyForScrollGroupId(23)]: "X",
  [getLocalizeKeyForScrollGroupId(24)]: "Y",
  [getLocalizeKeyForScrollGroupId(25)]: "Z"
};
function getEndChapterWithFallback(book, bounds) {
  return getChaptersForBook(Canon.bookIdToNumber(book));
}
function findAdjacentPresentBook(book, availableBooks, direction) {
  const bookNum = Canon.bookIdToNumber(book);
  let closestBook;
  let closestBookNum = direction === "next" ? Infinity : -Infinity;
  availableBooks.forEach((candidate) => {
    const candidateNum = Canon.bookIdToNumber(candidate);
    const isCloser = direction === "next" ? candidateNum > bookNum && candidateNum < closestBookNum : candidateNum < bookNum && candidateNum > closestBookNum;
    if (isCloser) {
      closestBook = candidate;
      closestBookNum = candidateNum;
    }
  });
  return closestBook;
}
function getPreviousChapterRef(scrRef, availableBooks, bounds) {
  const { book, chapterNum } = scrRef;
  if (availableBooks.includes(book) && chapterNum > 1)
    return { book, chapterNum: chapterNum - 1, verseNum: 1 };
  const previousBook = findAdjacentPresentBook(book, availableBooks, "previous");
  if (!previousBook) return void 0;
  return {
    book: previousBook,
    chapterNum: Math.max(getEndChapterWithFallback(previousBook), 1),
    verseNum: 1
  };
}
function getNextChapterRef(scrRef, availableBooks, bounds) {
  const { book, chapterNum } = scrRef;
  if (availableBooks.includes(book) && chapterNum < getEndChapterWithFallback(book))
    return { book, chapterNum: chapterNum + 1, verseNum: 1 };
  const nextBook = findAdjacentPresentBook(book, availableBooks, "next");
  if (!nextBook) return void 0;
  return { book: nextBook, chapterNum: 1, verseNum: 1 };
}
function getPreviousVerseRef(scrRef, availableBooks, bounds) {
  const { book, chapterNum, verseNum } = scrRef;
  const isBookPresent = availableBooks === void 0 || availableBooks.includes(book);
  if (isBookPresent) {
    if (verseNum > 1) return { book, chapterNum, verseNum: verseNum - 1 };
    if (verseNum === 1 && chapterNum === 1) return { book, chapterNum: 1, verseNum: 0 };
    return { book, chapterNum, verseNum: 0 };
  }
  if (availableBooks === void 0) return void 0;
  const previousBook = findAdjacentPresentBook(book, availableBooks, "previous");
  if (!previousBook) return void 0;
  const endChapter = Math.max(getEndChapterWithFallback(previousBook), 1);
  return { book: previousBook, chapterNum: endChapter, verseNum: Math.max(1, 1) };
}
function getNextVerseRef(scrRef, availableBooks, bounds) {
  const { book, chapterNum, verseNum } = scrRef;
  const isBookPresent = availableBooks === void 0 || availableBooks.includes(book);
  if (isBookPresent) {
    return { book, chapterNum, verseNum: verseNum + 1 };
  }
  const nextBook = findAdjacentPresentBook(book, availableBooks, "next");
  if (!nextBook) return void 0;
  return { book: nextBook, chapterNum: 1, verseNum: 1 };
}
function resolveReferenceHistoryDirection(physicalDirection, interfaceDirection) {
  const forwardKey = interfaceDirection === "rtl" ? "left" : "right";
  return physicalDirection === forwardKey ? "forward" : "back";
}
const getSectionLongName = (section, otLongName, ntLongName, dcLongName, extraLongName) => {
  switch (section) {
    case Section.OT:
      return otLongName ?? "Old Testament";
    case Section.NT:
      return ntLongName ?? "New Testament";
    case Section.DC:
      return dcLongName ?? "Deuterocanon";
    case Section.Extra:
      return extraLongName ?? "Extra Materials";
    default:
      throw new Error(`Unknown section: ${section}`);
  }
};
const getSectionShortName = (section, otShortName, ntShortName, dcShortName, extraShortName) => {
  switch (section) {
    case Section.OT:
      return otShortName ?? "OT";
    case Section.NT:
      return ntShortName ?? "NT";
    case Section.DC:
      return dcShortName ?? "DC";
    case Section.Extra:
      return extraShortName ?? "Extra";
    default:
      throw new Error(`Unknown section: ${section}`);
  }
};
function getLocalizedBookName(bookId, localizedBookNames) {
  var _a;
  const localizedName = (_a = localizedBookNames == null ? void 0 : localizedBookNames.get(bookId)) == null ? void 0 : _a.localizedName;
  return localizedName ?? Canon.bookIdToEnglishName(bookId);
}
function getLocalizedBookId(bookId, localizedBookNames) {
  var _a;
  const localizedId = (_a = localizedBookNames == null ? void 0 : localizedBookNames.get(bookId)) == null ? void 0 : _a.localizedId;
  return localizedId ?? bookId.toUpperCase();
}
const ALL_ENGLISH_BOOK_NAMES = Object.fromEntries(
  ALL_BOOK_IDS.map((bookId) => [bookId, Canon.bookIdToEnglishName(bookId)])
);
function doesBookMatchQuery(bookId, query, localizedBookNames) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return false;
  const englishName = Canon.bookIdToEnglishName(bookId);
  const localizedBook = localizedBookNames == null ? void 0 : localizedBookNames.get(bookId);
  const matchesEnglishNameOrId = englishName.toLowerCase().includes(normalizedQuery) || bookId.toLowerCase().includes(normalizedQuery);
  if (matchesEnglishNameOrId) return true;
  const matchesLocalizedNameOrId = localizedBook ? localizedBook.localizedName.toLowerCase().includes(normalizedQuery) || localizedBook.localizedId.toLowerCase().includes(normalizedQuery) : false;
  if (matchesLocalizedNameOrId) return true;
  return false;
}
function isRunningInWebView() {
  try {
    return window.top !== window;
  } catch {
    return true;
  }
}
function shouldSuppressFocusReturn(doc, isInWebView) {
  return doc.activeElement instanceof HTMLIFrameElement || !doc.hasFocus() && isInWebView;
}
function focusUnlessSuppressed(focus) {
  if (!shouldSuppressFocusReturn(document, isRunningInWebView())) focus();
}
function findControllerOf(content) {
  if (!content.id) return void 0;
  return Array.from(content.ownerDocument.querySelectorAll("[aria-controls]")).find(
    (element) => element.getAttribute("aria-controls") === content.id && !content.contains(element)
  );
}
function findLabellerOf(content) {
  const labelledBy = content.getAttribute("aria-labelledby");
  const labeller = labelledBy ? content.ownerDocument.getElementById(labelledBy) : void 0;
  return labeller && !content.contains(labeller) ? labeller : void 0;
}
function useGatedCloseAutoFocus(callerOnCloseAutoFocus, getTriggerToRestore) {
  const [isInWebView] = useState(isRunningInWebView);
  const callerOnCloseAutoFocusRef = useRef(callerOnCloseAutoFocus);
  callerOnCloseAutoFocusRef.current = callerOnCloseAutoFocus;
  const getTriggerToRestoreRef = useRef(getTriggerToRestore);
  getTriggerToRestoreRef.current = getTriggerToRestore;
  return useCallback(
    (event) => {
      var _a, _b;
      (_a = callerOnCloseAutoFocusRef.current) == null ? void 0 : _a.call(callerOnCloseAutoFocusRef, event);
      if (event.defaultPrevented) return;
      if (shouldSuppressFocusReturn(document, isInWebView)) {
        event.preventDefault();
        return;
      }
      if (isInWebView || document.hasFocus()) return;
      const { activeElement } = document;
      if (activeElement && activeElement !== document.body) return;
      const trigger = (_b = getTriggerToRestoreRef.current) == null ? void 0 : _b.call(getTriggerToRestoreRef);
      if (!trigger) return;
      trigger.focus({ preventScroll: true });
      if (document.activeElement === trigger) event.preventDefault();
    },
    [isInWebView]
  );
}
const WINDOW_BLUR_PRESS_MARKER = Symbol.for("platform-bible-react.window-blur-press");
function isWindowBlurPress(event) {
  return Reflect.get(event, WINDOW_BLUR_PRESS_MARKER) === true;
}
function useDismissOnWindowBlur({
  ref: forwardedRef,
  onCloseAutoFocus: forwardedOnCloseAutoFocus
}) {
  const elementRef = useRef(void 0);
  const lastContentRef = useRef(void 0);
  const capturedTriggerRef = useRef(void 0);
  useEffect(() => {
    const handleWindowBlur = () => {
      const element = elementRef.current;
      if (!element || element.dataset.state === "closed") return;
      const parent = element.parentElement;
      if (!parent) return;
      const eventInit = { bubbles: true, pointerType: "mouse" };
      const syntheticPress = typeof PointerEvent === "undefined" ? new MouseEvent("pointerdown", eventInit) : new PointerEvent("pointerdown", eventInit);
      Object.defineProperty(syntheticPress, WINDOW_BLUR_PRESS_MARKER, { value: true });
      parent.dispatchEvent(syntheticPress);
    };
    window.addEventListener("blur", handleWindowBlur);
    return () => window.removeEventListener("blur", handleWindowBlur);
  }, []);
  const ref = useCallback(
    (element) => {
      elementRef.current = element ?? void 0;
      if (element && element !== lastContentRef.current) {
        lastContentRef.current = element;
        capturedTriggerRef.current = findControllerOf(element) ?? findLabellerOf(element);
      }
      if (typeof forwardedRef === "function") {
        const forwardedCleanup = forwardedRef(element);
        if (typeof forwardedCleanup === "function") {
          return () => {
            elementRef.current = void 0;
            forwardedCleanup();
          };
        }
      } else if (forwardedRef) forwardedRef.current = element;
      return void 0;
    },
    [forwardedRef]
  );
  const getTriggerToRestore = useCallback(() => {
    var _a;
    const content = lastContentRef.current;
    const capturedTrigger = ((_a = capturedTriggerRef.current) == null ? void 0 : _a.isConnected) ? capturedTriggerRef.current : void 0;
    const trigger = (content && findControllerOf(content)) ?? capturedTrigger ?? (content && findLabellerOf(content));
    return (trigger == null ? void 0 : trigger.isConnected) ? trigger : void 0;
  }, []);
  const gatedOnCloseAutoFocus = useGatedCloseAutoFocus(
    forwardedOnCloseAutoFocus,
    getTriggerToRestore
  );
  const onCloseAutoFocus = useCallback(
    (event) => {
      gatedOnCloseAutoFocus(event);
      if (!elementRef.current) {
        lastContentRef.current = void 0;
        capturedTriggerRef.current = void 0;
      }
    },
    [gatedOnCloseAutoFocus]
  );
  return { ref, onCloseAutoFocus };
}
const FOCUSABLE_SELECTOR = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [contenteditable],
  tr:not([disabled])
`;
function isVisible(el) {
  return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
}
function getFocusableElements(container, uniqueQuerySelector) {
  const query = uniqueQuerySelector ? `${FOCUSABLE_SELECTOR}, ${uniqueQuerySelector}` : FOCUSABLE_SELECTOR;
  return Array.from(container.querySelectorAll(query)).filter(
    (el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden") && isVisible(el)
  );
}
const LIST_ITEM_KEYBOARD_FOCUS_RING = "tw:data-selected:ring-2 tw:data-selected:ring-ring/50 tw:data-selected:ring-inset tw:forced-colors:data-selected:outline-2 tw:forced-colors:data-selected:outline-[color:Highlight] tw:forced-colors:data-selected:-outline-offset-2";
let lastInteractionModality = "keyboard";
let isModalityTrackerRegistered = false;
function trackInteractionModality() {
  if (isModalityTrackerRegistered || typeof document === "undefined") return;
  isModalityTrackerRegistered = true;
  document.addEventListener(
    "pointerdown",
    (event) => {
      if (isWindowBlurPress(event)) return;
      lastInteractionModality = "pointer";
    },
    true
  );
  document.addEventListener(
    "keydown",
    () => {
      lastInteractionModality = "keyboard";
    },
    true
  );
}
function getLastInteractionModality() {
  return lastInteractionModality;
}
const QUIET_FOCUS_ATTRIBUTE = "data-quiet-focus";
function hideFocusRing(element) {
  if (!element) return;
  if (typeof window !== "undefined" && typeof window.matchMedia === "function" && window.matchMedia("(forced-colors: active)").matches)
    return;
  element.setAttribute(QUIET_FOCUS_ATTRIBUTE, "");
  element.style.outline = "none";
}
function showFocusRing(element) {
  if (!element) return;
  element.removeAttribute(QUIET_FOCUS_ATTRIBUTE);
  element.style.removeProperty("outline");
}
const QUIET_FOCUS_RING_SUPPRESSION = "tw:data-quiet-focus:focus-visible:border-transparent tw:data-quiet-focus:focus-visible:ring-0 tw:data-quiet-focus:focus-visible:outline-none";
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Separator$1.Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:shrink-0 tw:bg-border tw:data-horizontal:h-px tw:data-horizontal:w-full tw:data-vertical:w-px tw:data-vertical:self-stretch",
        className
      ),
      ...props
    }
  );
}
const buttonGroupVariants = cva(
  "tw:group/button-group tw:flex tw:w-fit tw:items-stretch tw:*:focus-visible:relative tw:*:focus-visible:z-10 tw:has-[>[data-slot=button-group]]:gap-2 tw:has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-lg tw:[&>[data-slot=select-trigger]:not([class*=w-])]:w-fit tw:[&>input]:flex-1",
  {
    variants: {
      orientation: {
        horizontal: "tw:[&>*:not(:first-child)]:rounded-s-none tw:[&>*:not(:first-child)]:border-s-0 tw:[&>*:not(:last-child)]:rounded-e-none tw:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-lg!",
        vertical: "tw:flex-col tw:[&>*:not(:first-child)]:rounded-t-none tw:[&>*:not(:first-child)]:border-t-0 tw:[&>*:not(:last-child)]:rounded-b-none tw:[&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!"
      }
    },
    defaultVariants: {
      orientation: "horizontal"
    }
  }
);
function ButtonGroup({
  className,
  orientation,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      role: "group",
      "data-slot": "button-group",
      "data-orientation": orientation,
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        buttonGroupVariants({ orientation }),
        className
      ),
      ...props
    }
  );
}
function ButtonGroupText({
  className,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "div";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:rounded-lg tw:border tw:bg-muted tw:px-2.5 tw:text-sm tw:font-medium tw:[&_svg]:pointer-events-none tw:[&_svg:not([class*=size-])]:size-4",
        className
      ),
      ...props
    }
  );
}
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Separator,
    {
      "data-slot": "button-group-separator",
      orientation,
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:relative tw:self-stretch tw:bg-input tw:data-horizontal:mx-px tw:data-horizontal:w-auto tw:data-vertical:my-px tw:data-vertical:h-auto",
        className
      ),
      ...props
    }
  );
}
function createPortalContainerContext() {
  const PortalContainerContext = React.createContext(null);
  function PortalContainerProvider2({
    container,
    children
  }) {
    return /* @__PURE__ */ jsx(PortalContainerContext.Provider, { value: container, children });
  }
  function usePortalContainer() {
    return React.useContext(PortalContainerContext) ?? void 0;
  }
  return { PortalContainerProvider: PortalContainerProvider2, usePortalContainer };
}
function Popover({ ...props }) {
  return /* @__PURE__ */ jsx(Popover$1.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({ ...props }) {
  return /* @__PURE__ */ jsx(Popover$1.Trigger, { "data-slot": "popover-trigger", ...props });
}
const { PortalContainerProvider: PortalContainerProvider$1, usePortalContainer: usePopoverPortalContainer } = createPortalContainerContext();
const PopoverPortalContainerProvider = PortalContainerProvider$1;
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref,
  onCloseAutoFocus,
  ...props
}) {
  const dir = readDirection();
  const portalContainer = usePopoverPortalContainer();
  const blurDismissProps = useDismissOnWindowBlur({ ref, onCloseAutoFocus });
  return (
    // CUSTOM: When a PopoverPortalContainerProvider is in scope, portal into its container
    // instead of the default document.body so nested popovers stay inside modal dialogs.
    /* @__PURE__ */ jsx(Popover$1.Portal, { container: portalContainer, children: /* @__PURE__ */ jsx(
      Popover$1.Content,
      {
        "data-slot": "popover-content",
        ...blurDismissProps,
        align,
        sideOffset,
        className: cn(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation; removed tw:z-50 to use shared constant below
          "pr-twp tw:flex tw:w-72 tw:origin-(--radix-popover-content-transform-origin) tw:flex-col tw:gap-2.5 tw:rounded-lg tw:bg-popover tw:p-2.5 tw:text-sm tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:outline-hidden tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          className
        ),
        style: { zIndex: Z_INDEX_ABOVE_DOCK, ...style },
        dir,
        ...props
      }
    ) })
  );
}
function PopoverAnchor({ ...props }) {
  return /* @__PURE__ */ jsx(Popover$1.Anchor, { "data-slot": "popover-anchor", ...props });
}
function PopoverHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "popover-header",
      className: cn("pr-twp tw:flex tw:flex-col tw:gap-0.5 tw:text-sm", className),
      ...props
    }
  );
}
function PopoverTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "popover-title",
      className: cn("pr-twp tw:font-medium", className),
      ...props
    }
  );
}
function PopoverDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      "data-slot": "popover-description",
      className: cn("pr-twp tw:text-muted-foreground", className),
      ...props
    }
  );
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Tooltip$1.Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
function Tooltip({ ...props }) {
  return /* @__PURE__ */ jsx(Tooltip$1.Root, { "data-slot": "tooltip", ...props });
}
function TooltipTrigger({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    Tooltip$1.Trigger,
    {
      "data-slot": "tooltip-trigger",
      className: variant ? cn(buttonVariants({ variant }), className) : className,
      ...props
    }
  );
}
const { PortalContainerProvider, usePortalContainer: useTooltipPortalContainer } = createPortalContainerContext();
const TooltipPortalContainerProvider = PortalContainerProvider;
function TooltipContent({
  className,
  sideOffset = 0,
  // CUSTOM: Destructure style so it can be merged with the custom z-index style object
  style,
  // CUSTOM: Added showArrow prop to allow callers to suppress the arrow element entirely.
  // Note: showArrow={true} (the default) does NOT guarantee the arrow is visible — Radix still
  // hides it automatically when its computed position falls outside the content bounds (e.g. after
  // collision-avoidance shifts the content away from a very small or edge-positioned trigger).
  // showArrow={false} removes the element from the DOM so it can never appear.
  showArrow = true,
  // CUSTOM: Added arrowClassName so callers that restyle TooltipContent's background/border (e.g.
  // a destructive-themed tooltip) can restyle the arrow to match, instead of being stuck with the
  // hardcoded bg-foreground/fill-foreground default.
  arrowClassName,
  children,
  ...props
}) {
  const portalContainer = useTooltipPortalContainer();
  return (
    // CUSTOM: When a TooltipPortalContainerProvider is in scope, portal into its container instead
    // of the default document.body.
    /* @__PURE__ */ jsx(Tooltip$1.Portal, { container: portalContainer, children: /* @__PURE__ */ jsxs(
      Tooltip$1.Content,
      {
        "data-slot": "tooltip-content",
        sideOffset,
        style: { zIndex: Z_INDEX_TOOLTIP, ...style },
        className: cn(
          // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
          "pr-twp tw:inline-flex tw:w-fit tw:max-w-xs tw:origin-(--radix-tooltip-content-transform-origin) tw:items-center tw:gap-1.5 tw:rounded-md tw:bg-foreground tw:px-3 tw:py-1.5 tw:text-xs tw:text-background tw:has-data-[slot=kbd]:pe-1.5 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:**:data-[slot=kbd]:relative tw:**:data-[slot=kbd]:isolate tw:**:data-[slot=kbd]:z-50 tw:**:data-[slot=kbd]:rounded-sm tw:data-[state=delayed-open]:animate-in tw:data-[state=delayed-open]:fade-in-0 tw:data-[state=delayed-open]:zoom-in-95 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95",
          className
        ),
        ...props,
        children: [
          children,
          showArrow && /* @__PURE__ */ jsx(
            Tooltip$1.Arrow,
            {
              className: cn(
                "tw:z-50 tw:size-2.5 tw:rotate-45 tw:rounded-xs tw:bg-foreground tw:fill-foreground",
                "tw:in-data-[side=bottom]:translate-y-[calc(-50%-1px)] tw:in-data-[side=top]:translate-y-[calc(-50%-1px)]",
                "tw:in-data-[side=bottom]:[clip-path:polygon(100%_0,100%_100%,0_100%)] tw:in-data-[side=top]:[clip-path:polygon(100%_0,100%_100%,0_100%)]",
                arrowClassName
              )
            }
          )
        ]
      }
    ) })
  );
}
const LOCALIZATION_KEY_PATTERN = /^%[^%]*%$/;
function isResolvedLocalizedValue(value) {
  return value !== void 0 && !LOCALIZATION_KEY_PATTERN.test(value) && value.trim() !== "";
}
function resolveLocalizedString(value, fallback) {
  return isResolvedLocalizedValue(value) ? value : fallback;
}
function useTruncationTooltip() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const onPointerEnter = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    if (element.scrollWidth > element.clientWidth) setOpen(true);
  }, []);
  const onPointerLeave = useCallback(() => setOpen(false), []);
  return { ref, open, onPointerEnter, onPointerLeave };
}
const MenuContext = createContext(void 0);
function useMenuContext() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a MenuContext.Provider.");
  }
  return context;
}
const menuVariants = cva("", {
  variants: {
    variant: {
      default: "",
      muted: "tw:hover:bg-muted tw:hover:text-foreground tw:focus:bg-muted tw:focus:text-foreground tw:data-[state=open]:bg-muted tw:data-[state=open]:text-foreground"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});
function DropdownMenu({ variant = "default", ...props }) {
  const dir = readDirection();
  const contextValue = React.useMemo(
    () => ({
      variant
    }),
    [variant]
  );
  return /* @__PURE__ */ jsx(MenuContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsx(DropdownMenu$1.Root, { "data-slot": "dropdown-menu", dir, ...props }) });
}
function DropdownMenuPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenu$1.Portal, { "data-slot": "dropdown-menu-portal", ...props });
}
function DropdownMenuTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenu$1.Trigger, { "data-slot": "dropdown-menu-trigger", ...props });
}
function DropdownMenuContent({
  className,
  align = "start",
  sideOffset = 4,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style,
  children,
  // CUSTOM: Destructure ref (a regular prop in React 19) and onCloseAutoFocus so
  // useDismissOnWindowBlur can compose them with its own
  ref,
  onCloseAutoFocus,
  ...props
}) {
  const dir = readDirection();
  const blurDismissProps = useDismissOnWindowBlur({ ref, onCloseAutoFocus });
  return /* @__PURE__ */ jsx(DropdownMenu$1.Portal, { children: /* @__PURE__ */ jsx(
    DropdownMenu$1.Content,
    {
      "data-slot": "dropdown-menu-content",
      ...blurDismissProps,
      sideOffset,
      align,
      className: cn(
        /* CUSTOM: adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
        // CUSTOM: Removed tw:w-(--radix-dropdown-menu-trigger-width) which pinned the dropdown to
        // exactly the trigger button width, making menus unusably narrow when the trigger is a small
        // icon button. Restores natural min-width behavior so content determines popup width.
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop) —
        // a dropdown menu must clear the overlay layer, including when opened from inside a
        // popover or dialog
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        // A blur layer on a scrolling surface scrolls away with its items and never covers the
        // scrollbar gutter, so this scrolling surface in particular must be painted opaque.
        "pr-twp tw:max-h-(--radix-dropdown-menu-content-available-height) tw:min-w-32 tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-x-hidden tw:overflow-y-auto tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-md tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-[state=closed]:overflow-hidden tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        className
      ),
      style: { zIndex: Z_INDEX_ABOVE_DOCK, ...style },
      ...props,
      children: /* @__PURE__ */ jsx("div", { dir, children })
    }
  ) });
}
function DropdownMenuGroup({ ...props }) {
  return /* @__PURE__ */ jsx(DropdownMenu$1.Group, { "data-slot": "dropdown-menu-group", ...props });
}
function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}) {
  const dir = readDirection();
  const context = useMenuContext();
  return /* @__PURE__ */ jsx(
    DropdownMenu$1.Item,
    {
      "data-slot": "dropdown-menu-item",
      "data-inset": inset,
      "data-variant": variant,
      className: cn(
        "tw:group/dropdown-menu-item tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-[variant=destructive]:text-destructive tw:data-[variant=destructive]:focus:bg-destructive/10 tw:data-[variant=destructive]:focus:text-destructive tw:dark:data-[variant=destructive]:focus:bg-destructive/20 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4 tw:data-[variant=destructive]:*:[svg]:text-destructive",
        className,
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant })
      ),
      dir,
      ...props
    }
  );
}
function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}) {
  const dir = readDirection();
  const context = useMenuContext();
  return /* @__PURE__ */ jsxs(
    DropdownMenu$1.CheckboxItem,
    {
      "data-slot": "dropdown-menu-checkbox-item",
      "data-inset": inset,
      className: cn(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        className,
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant })
      ),
      checked,
      dir,
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-checkbox-item-indicator",
            children: /* @__PURE__ */ jsx(DropdownMenu$1.ItemIndicator, { children: /* @__PURE__ */ jsx(IconCheck, {}) })
          }
        ),
        children
      ]
    }
  );
}
function DropdownMenuRadioGroup({
  ...props
}) {
  return /* @__PURE__ */ jsx(DropdownMenu$1.RadioGroup, { "data-slot": "dropdown-menu-radio-group", ...props });
}
function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}) {
  const dir = readDirection();
  const context = useMenuContext();
  return /* @__PURE__ */ jsxs(
    DropdownMenu$1.RadioItem,
    {
      "data-slot": "dropdown-menu-radio-item",
      "data-inset": inset,
      className: cn(
        "tw:relative tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:py-1 tw:pe-8 tw:ps-1.5 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-disabled:pointer-events-none tw:data-disabled:opacity-50 tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        className,
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant })
      ),
      dir,
      ...props,
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "tw:pointer-events-none tw:absolute tw:end-2 tw:flex tw:items-center tw:justify-center",
            "data-slot": "dropdown-menu-radio-item-indicator",
            children: /* @__PURE__ */ jsx(DropdownMenu$1.ItemIndicator, { children: /* @__PURE__ */ jsx(IconCheck, {}) })
          }
        ),
        children
      ]
    }
  );
}
function DropdownMenuLabel({ className, inset, ...props }) {
  return /* @__PURE__ */ jsx(
    DropdownMenu$1.Label,
    {
      "data-slot": "dropdown-menu-label",
      "data-inset": inset,
      className: cn(
        "tw:px-1.5 tw:py-1 tw:text-xs tw:font-medium tw:text-muted-foreground tw:data-inset:ps-7",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSeparator({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    DropdownMenu$1.Separator,
    {
      "data-slot": "dropdown-menu-separator",
      className: cn("tw:-mx-1 tw:my-1 tw:h-px tw:bg-border", className),
      ...props
    }
  );
}
function DropdownMenuShortcut({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "span",
    {
      "data-slot": "dropdown-menu-shortcut",
      className: cn(
        // CUSTOM: Added tw:[unicode-bidi:plaintext] so the hint takes its direction from its first
        // letter, keeping macOS symbols in order (⌃F, not F⌃) in RTL menus. Unlike dir="ltr", it
        // keeps the span's direction, so tw:ms-auto still puts the hint at the inline end
        "tw:[unicode-bidi:plaintext] tw:ms-auto tw:text-xs tw:tracking-widest tw:text-muted-foreground tw:group-focus/dropdown-menu-item:text-accent-foreground",
        className
      ),
      ...props
    }
  );
}
function DropdownMenuSub({ ...props }) {
  return /* @__PURE__ */ jsx(DropdownMenu$1.Sub, { "data-slot": "dropdown-menu-sub", ...props });
}
function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}) {
  const context = useMenuContext();
  const dir = readDirection();
  return /* @__PURE__ */ jsxs(
    DropdownMenu$1.SubTrigger,
    {
      "data-slot": "dropdown-menu-sub-trigger",
      "data-inset": inset,
      className: cn(
        "tw:flex tw:cursor-default tw:items-center tw:gap-1.5 tw:rounded-md tw:px-1.5 tw:py-1 tw:text-sm tw:outline-hidden tw:select-none tw:focus:bg-accent tw:focus:text-accent-foreground tw:not-data-[variant=destructive]:focus:**:text-accent-foreground tw:data-inset:ps-7 tw:data-open:bg-accent tw:data-open:text-accent-foreground tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0 tw:[&_svg:not([class*=size-])]:size-4",
        className,
        // CUSTOM: Apply variant-driven styles from menu context
        menuVariants({ variant: context.variant })
      ),
      ...props,
      children: [
        children,
        dir === "rtl" ? /* @__PURE__ */ jsx(IconChevronLeft, { className: "tw:ms-auto" }) : /* @__PURE__ */ jsx(IconChevronRight, { className: "tw:ms-auto" })
      ]
    }
  );
}
function DropdownMenuSubContent({
  className,
  // CUSTOM: Destructure style so we can merge the shared z-index constant into it
  style,
  children,
  ...props
}) {
  const dir = readDirection();
  return /* @__PURE__ */ jsx(
    DropdownMenu$1.SubContent,
    {
      "data-slot": "dropdown-menu-sub-content",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        // CUSTOM: Fixed tw: prefix not being on some classes and removed erroneous empty tw: tokens
        // CUSTOM: Removed tw:z-50 to use the shared z-index constant below (see style prop),
        // keeping submenus on the same overlay tier as their parent DropdownMenuContent
        // CUSTOM: Removed tw:bg-popover/70 and the tw:before:* backdrop-blur layer that shadcn's
        // translucent menu color adds, so the base tw:bg-popover paints this surface opaque: text
        // behind a menu must not show through it (adr-opaque-menu-surfaces).
        "pr-twp tw:min-w-[96px] tw:origin-(--radix-dropdown-menu-content-transform-origin) tw:overflow-hidden tw:rounded-lg tw:bg-popover tw:p-1 tw:text-popover-foreground tw:shadow-lg tw:ring-1 tw:ring-foreground/10 tw:duration-100 tw:data-[side=bottom]:slide-in-from-top-2 tw:data-[side=left]:slide-in-from-right-2 tw:data-[side=right]:slide-in-from-left-2 tw:data-[side=top]:slide-in-from-bottom-2 tw:data-open:animate-in tw:data-open:fade-in-0 tw:data-open:zoom-in-95 tw:data-closed:animate-out tw:data-closed:fade-out-0 tw:data-closed:zoom-out-95 tw:animate-none! tw:**:data-[slot$=-item]:focus:bg-foreground/10 tw:**:data-[slot$=-item]:data-highlighted:bg-foreground/10 tw:**:data-[slot$=-separator]:bg-foreground/5 tw:**:data-[slot$=-trigger]:focus:bg-foreground/10 tw:**:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! tw:**:data-[variant=destructive]:focus:bg-foreground/10! tw:**:data-[variant=destructive]:text-accent-foreground! tw:**:data-[variant=destructive]:**:text-accent-foreground! tw:relative",
        className
      ),
      style: { zIndex: Z_INDEX_ABOVE_POPOVER, ...style },
      ...props,
      children: /* @__PURE__ */ jsx("div", { dir, children })
    }
  );
}
function Label({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    Label$1.Root,
    {
      "data-slot": "label",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:flex tw:items-center tw:gap-2 tw:text-sm tw:leading-none tw:font-medium tw:select-none tw:group-data-[disabled=true]:pointer-events-none tw:group-data-[disabled=true]:opacity-50 tw:peer-disabled:cursor-not-allowed tw:peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
function RadioGroup({
  className,
  ...props
}) {
  const dir = readDirection();
  return /* @__PURE__ */ jsx(
    RadioGroup$1.Root,
    {
      "data-slot": "radio-group",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:grid tw:w-full tw:gap-2",
        className
      ),
      dir,
      ...props
    }
  );
}
function RadioGroupItem({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    RadioGroup$1.Item,
    {
      "data-slot": "radio-group-item",
      className: cn(
        // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:group/radio-group-item tw:peer tw:relative tw:flex tw:aspect-square tw:size-4 tw:shrink-0 tw:rounded-full tw:border tw:border-input tw:outline-none tw:after:absolute tw:after:-inset-x-3 tw:after:-inset-y-2 tw:focus-visible:border-ring tw:focus-visible:ring-3 tw:focus-visible:ring-ring/50 tw:disabled:cursor-not-allowed tw:disabled:opacity-50 tw:aria-invalid:border-destructive tw:aria-invalid:ring-3 tw:aria-invalid:ring-destructive/20 tw:aria-invalid:aria-checked:border-primary tw:dark:bg-input/30 tw:dark:aria-invalid:border-destructive/50 tw:dark:aria-invalid:ring-destructive/40 tw:data-checked:border-primary tw:data-checked:bg-primary tw:data-checked:text-primary-foreground tw:dark:data-checked:bg-primary",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsx(
        RadioGroup$1.Indicator,
        {
          "data-slot": "radio-group-indicator",
          className: "tw:flex tw:size-4 tw:items-center tw:justify-center",
          children: /* @__PURE__ */ jsx("span", { className: "tw:absolute tw:top-1/2 tw:start-1/2 tw:size-2 tw:-translate-x-1/2 tw:rtl:translate-x-1/2 tw:-translate-y-1/2 tw:rounded-full tw:bg-primary-foreground" })
        }
      )
    }
  );
}
const CANCEL_ACCEPT_BUTTONS_STRING_KEYS = Object.freeze([
  "%cancelButton_tooltip%",
  "%acceptButton_tooltip%"
]);
const localizeString$1 = (strings, key) => strings[key] ?? key;
function CancelAcceptButtons({
  onCancelClick,
  onAcceptClick,
  canAccept = true,
  localizedStrings = {},
  className = "tw:h-6 tw:w-6",
  acceptLabel
}) {
  const cancelLocalized = localizeString$1(localizedStrings, "%cancelButton_tooltip%");
  const acceptLocalized = acceptLabel ?? localizeString$1(localizedStrings, "%acceptButton_tooltip%");
  return /* @__PURE__ */ jsxs(ButtonGroup, { children: [
    /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
        Button,
        {
          "aria-label": cancelLocalized,
          className,
          size: "icon",
          onClick: onCancelClick,
          variant: "secondary",
          children: /* @__PURE__ */ jsx(X, {})
        }
      ) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: cancelLocalized }) })
    ] }) }),
    /* @__PURE__ */ jsx(ButtonGroupSeparator, {}),
    /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
        Button,
        {
          "aria-label": acceptLocalized,
          className,
          size: "icon",
          onClick: onAcceptClick,
          disabled: !canAccept,
          children: /* @__PURE__ */ jsx(Check, {})
        }
      ) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: acceptLocalized }) })
    ] }) })
  ] });
}
function isMacOs() {
  return /Macintosh/i.test(navigator.userAgent);
}
function isWindows() {
  return /Windows/i.test(navigator.userAgent);
}
const INTERACTIVE_ELEMENT_TAG_SELECTORS = ["input", "select", "textarea", "button"];
const INTERACTIVE_ELEMENT_ROLE_SELECTORS = ["button", "textbox"];
const useListbox = ({
  options,
  onFocusChange,
  onOptionSelect,
  onCharacterPress
}) => {
  const listboxRef = useRef(null);
  const [activeId, setActiveId] = useState(void 0);
  const [selectedId, setSelectedId] = useState(void 0);
  const focusOption = useCallback(
    (id) => {
      setActiveId(id);
      const option = options.find((opt) => opt.id === id);
      if (option) {
        onFocusChange == null ? void 0 : onFocusChange(option);
      }
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ block: "center" });
        element.focus();
      }
      if (listboxRef.current) {
        listboxRef.current.setAttribute("aria-activedescendant", id);
      }
    },
    [onFocusChange, options]
  );
  const toggleSelectInternal = useCallback(
    (id) => {
      const option = options.find((opt) => opt.id === id);
      if (!option) return;
      setSelectedId((prev) => prev === id ? void 0 : id);
      onOptionSelect == null ? void 0 : onOptionSelect(option);
    },
    [onOptionSelect, options]
  );
  const isInteractiveElement = (element) => {
    if (!element) return false;
    const tag = element.tagName.toLowerCase();
    if (element.isContentEditable) return true;
    if (INTERACTIVE_ELEMENT_TAG_SELECTORS.includes(tag)) return true;
    const role = element.getAttribute("role");
    if (role && INTERACTIVE_ELEMENT_ROLE_SELECTORS.includes(role)) return true;
    const tabIndex = element.getAttribute("tabindex");
    if (tabIndex !== void 0 && tabIndex !== "-1") return true;
    return false;
  };
  const handleKeyDown = useCallback(
    (event) => {
      var _a;
      const targetElement = event.target;
      const getElementById = (id) => id ? document.getElementById(id) : void 0;
      const selectedElement = getElementById(selectedId);
      const activeElement = getElementById(activeId);
      const isInsideSelected = !!(selectedElement && targetElement && selectedElement.contains(targetElement) && targetElement !== selectedElement);
      const isInteractiveInsideSelected = isInsideSelected && isInteractiveElement(targetElement);
      if (isInteractiveInsideSelected) {
        if (event.key === "Escape" || event.key === "ArrowLeft" && !targetElement.isContentEditable) {
          if (selectedId) {
            event.preventDefault();
            event.stopPropagation();
            const opt = options.find((o) => o.id === selectedId);
            if (opt) {
              focusOption(opt.id);
            }
          }
          return;
        }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
          if (!selectedElement) return;
          const focusableElements = Array.from(
            selectedElement.querySelectorAll(
              'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
            )
          );
          if (focusableElements.length === 0) return;
          const currentIndex2 = focusableElements.findIndex((el) => el === targetElement);
          if (currentIndex2 === -1) return;
          let nextIndex2;
          if (event.key === "ArrowDown") {
            nextIndex2 = Math.min(currentIndex2 + 1, focusableElements.length - 1);
          } else {
            nextIndex2 = Math.max(currentIndex2 - 1, 0);
          }
          if (nextIndex2 !== currentIndex2) {
            event.preventDefault();
            event.stopPropagation();
            (_a = focusableElements[nextIndex2]) == null ? void 0 : _a.focus();
          }
          return;
        }
        return;
      }
      const currentIndex = options.findIndex((opt) => opt.id === activeId);
      let nextIndex = currentIndex;
      switch (event.key) {
        case "ArrowDown":
          nextIndex = Math.min(currentIndex + 1, options.length - 1);
          event.preventDefault();
          break;
        case "ArrowUp":
          nextIndex = Math.max(currentIndex - 1, 0);
          event.preventDefault();
          break;
        case "Home":
          nextIndex = 0;
          event.preventDefault();
          break;
        case "End":
          nextIndex = options.length - 1;
          event.preventDefault();
          break;
        case " ":
        case "Enter":
          if (activeId) {
            toggleSelectInternal(activeId);
          }
          event.preventDefault();
          event.stopPropagation();
          return;
        case "ArrowRight": {
          const container = activeElement;
          if (container) {
            const preferred = container.querySelector(
              'input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled])'
            );
            const fallback = container.querySelector(
              'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
            );
            const toFocus = preferred ?? fallback;
            if (toFocus) {
              event.preventDefault();
              toFocus.focus();
              return;
            }
          }
          break;
        }
        default:
          if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && !event.altKey) {
            const isInInteractiveElement = isInteractiveElement(targetElement);
            if (!isInInteractiveElement) {
              onCharacterPress == null ? void 0 : onCharacterPress(event.key);
              event.preventDefault();
            }
          }
          return;
      }
      const nextOption = options[nextIndex];
      if (nextOption) focusOption(nextOption.id);
    },
    [options, focusOption, activeId, selectedId, toggleSelectInternal, onCharacterPress]
  );
  return {
    listboxRef,
    activeId,
    selectedId,
    /** Keyboard event handler for listbox navigation and selection */
    handleKeyDown,
    /** Focus an option by its ID */
    focusOption
  };
};
const badgeVariants = cva(
  "tw:group/badge tw:inline-flex tw:h-5 tw:w-fit tw:shrink-0 tw:items-center tw:justify-center tw:gap-1 tw:overflow-hidden tw:rounded-4xl tw:border tw:border-transparent tw:px-2 tw:py-0.5 tw:text-xs tw:font-medium tw:whitespace-nowrap tw:transition-all tw:focus-visible:border-ring tw:focus-visible:ring-[3px] tw:focus-visible:ring-ring/50 tw:has-data-[icon=inline-end]:pe-1.5 tw:has-data-[icon=inline-start]:ps-1.5 tw:aria-invalid:border-destructive tw:aria-invalid:ring-destructive/20 tw:dark:aria-invalid:ring-destructive/40 tw:[&>svg]:pointer-events-none tw:[&>svg]:size-3!",
  {
    variants: {
      variant: {
        default: "tw:bg-primary tw:text-primary-foreground tw:[a]:hover:bg-primary/80",
        secondary: "tw:bg-secondary tw:text-secondary-foreground tw:[a]:hover:bg-secondary/80",
        destructive: "tw:bg-destructive/10 tw:text-destructive tw:focus-visible:ring-destructive/20 tw:dark:bg-destructive/20 tw:dark:focus-visible:ring-destructive/40 tw:[a]:hover:bg-destructive/20",
        outline: "tw:border-border tw:text-foreground tw:[a]:hover:bg-muted tw:[a]:hover:text-muted-foreground",
        ghost: "tw:hover:bg-muted tw:hover:text-muted-foreground tw:dark:hover:bg-muted/50",
        link: "tw:text-primary tw:underline-offset-4 tw:hover:underline",
        // CUSTOM: Added 'muted' variant — a muted-background badge without a visible border, for
        // low-emphasis status indicators.
        muted: "tw:border-transparent tw:bg-muted tw:text-muted-foreground tw:hover:bg-muted/80",
        // CUSTOM: Added 'blueIndicator' variant — a small solid blue dot for status indication,
        // without padding. Used as a notification or presence indicator.
        blueIndicator: "tw:w-[5px] tw:h-[5px] tw:bg-blue-400 tw:px-0",
        // CUSTOM: Added 'mutedIndicator' variant — a small solid muted dot for status indication,
        // without padding. Used as a lower-emphasis presence or state indicator.
        mutedIndicator: "tw:w-[5px] tw:h-[5px] tw:bg-zinc-400 tw:px-0"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant = "default", asChild = false, ...props }) {
  const Comp = asChild ? Slot.Root : "span";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "badge",
      "data-variant": variant,
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        badgeVariants({ variant }),
        className
      ),
      ...props
    }
  );
}
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("pr-twp tw:animate-pulse tw:rounded-md tw:bg-muted", className),
      ...props
    }
  );
}
function isEventFromWithin(e, container) {
  return e.target instanceof Node && container.contains(e.target);
}
function Table({
  className,
  // CUSTOM: Added stickyHeader prop to support sticky table headers with appropriate container padding
  stickyHeader,
  ref,
  ...props
}) {
  const tableRef = React.useRef(null);
  React.useEffect(() => {
    if (typeof ref === "function") {
      ref(tableRef.current);
    } else if (ref && "current" in ref) {
      ref.current = tableRef.current;
    }
  }, [ref]);
  React.useEffect(() => {
    const currentTable = tableRef.current;
    if (!currentTable) return;
    const setTabIndexes = () => {
      requestAnimationFrame(() => {
        const focusables = getFocusableElements(currentTable, `[tabindex]:not([tabindex="-1"])`);
        focusables.forEach((el) => {
          el.setAttribute("tabindex", "-1");
        });
      });
    };
    setTabIndexes();
    const observer = new MutationObserver(() => {
      setTabIndexes();
    });
    observer.observe(currentTable, {
      childList: true,
      // Watch for added/removed elements
      subtree: true,
      // Include descendants
      attributes: true,
      attributeFilter: ["tabindex"]
      // Watch for tabindex changes
    });
    return () => {
      observer.disconnect();
    };
  }, []);
  const handleKeyDownInTable = (e) => {
    var _a;
    const { current: currentTable } = tableRef;
    if (!currentTable) return;
    if (!isEventFromWithin(e, currentTable)) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      (_a = getFocusableElements(currentTable)[0]) == null ? void 0 : _a.focus();
      return;
    }
    if (e.key === " " && document.activeElement === currentTable) {
      e.preventDefault();
    }
  };
  return (
    // CUSTOM: Added pr-twp to apply Platform.Bible's Tailwind CSS scope isolation. Removed
    // tw:overflow-auto from the boilerplate wrapper so callers control overflow behavior.
    // Added conditional padding when stickyHeader is true to avoid header overlap.
    /* @__PURE__ */ jsx(
      "div",
      {
        "data-slot": "table-container",
        className: cn("pr-twp tw:relative tw:w-full", { "tw:p-1": stickyHeader }),
        children: /* @__PURE__ */ jsx(
          "table",
          {
            "data-slot": "table",
            tabIndex: 0,
            ref: tableRef,
            onKeyDown: handleKeyDownInTable,
            className: cn(
              "tw:w-full tw:caption-bottom tw:text-sm",
              // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with custom focus ring
              "tw:outline-hidden",
              // CUSTOM: Add focus styles so keyboard users see a visible focus indicator on the table
              "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
              className
            ),
            "aria-label": "Table",
            "aria-labelledby": "table-label",
            ...props
          }
        )
      }
    )
  );
}
function TableHeader({
  className,
  // CUSTOM: Added stickyHeader prop to apply sticky positioning styles when true
  stickyHeader,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "thead",
    {
      "data-slot": "table-header",
      className: cn(
        {
          // CUSTOM: Apply sticky header styles when stickyHeader is true so headers remain
          // visible while scrolling through long tables
          "tw:sticky tw:top-[-1px] tw:z-20 tw:bg-background tw:drop-shadow-sm": stickyHeader
        },
        "tw:[&_tr]:border-b",
        className
      ),
      ...props
    }
  );
}
function TableBody({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tbody",
    {
      "data-slot": "table-body",
      className: cn("tw:[&_tr:last-child]:border-0", className),
      ...props
    }
  );
}
function TableFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "tfoot",
    {
      "data-slot": "table-footer",
      className: cn(
        "tw:border-t tw:bg-muted/50 tw:font-medium tw:[&>tr]:last:border-b-0",
        className
      ),
      ...props
    }
  );
}
function useFocusableInRowKeyboardNavigation(rowRef) {
  React.useEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    const handleKeyDown = (e) => {
      if (!row.contains(document.activeElement)) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        e.stopPropagation();
        const focusables = rowRef.current ? getFocusableElements(rowRef.current) : [];
        const index = focusables.indexOf(document.activeElement);
        const nextIndex = e.key === "ArrowRight" ? index + 1 : index - 1;
        if (nextIndex >= 0 && nextIndex < focusables.length) {
          focusables[nextIndex].focus();
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        row.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
      }
    };
    row.addEventListener("keydown", handleKeyDown);
    return () => {
      row.removeEventListener("keydown", handleKeyDown);
    };
  }, [rowRef]);
}
function focusAdjacentFocusableElementInRow(focusablesInRow, currentIndexOfFocusables, direction) {
  let nextFocusable;
  if (direction === "ArrowLeft" && currentIndexOfFocusables > 0) {
    nextFocusable = focusablesInRow[currentIndexOfFocusables - 1];
  } else if (direction === "ArrowRight" && currentIndexOfFocusables < focusablesInRow.length - 1) {
    nextFocusable = focusablesInRow[currentIndexOfFocusables + 1];
  }
  if (nextFocusable) {
    requestAnimationFrame(() => nextFocusable.focus());
    return true;
  }
  return false;
}
function focusAdjacentRow(rowsInTable, currentRowIndex, direction) {
  let nextRow;
  if (direction === "ArrowDown" && currentRowIndex < rowsInTable.length - 1) {
    nextRow = rowsInTable[currentRowIndex + 1];
  } else if (direction === "ArrowUp" && currentRowIndex > 0) {
    nextRow = rowsInTable[currentRowIndex - 1];
  }
  if (nextRow) {
    requestAnimationFrame(() => nextRow.focus());
    return true;
  }
  return false;
}
function TableRow({
  className,
  onKeyDown,
  // CUSTOM: Added onSelect and setFocusAlsoRunsSelect props to support selection-on-focus behavior
  onSelect,
  setFocusAlsoRunsSelect = false,
  ref,
  ...props
}) {
  const rowRef = React.useRef(null);
  React.useEffect(() => {
    if (typeof ref === "function") {
      ref(rowRef.current);
    } else if (ref && "current" in ref) {
      ref.current = rowRef.current;
    }
  }, [ref]);
  useFocusableInRowKeyboardNavigation(rowRef);
  const focusablesInRow = React.useMemo(
    () => rowRef.current ? getFocusableElements(rowRef.current) : [],
    [rowRef]
  );
  const handleKeyDown = React.useCallback(
    (e) => {
      const { current: currentRow } = rowRef;
      if (!currentRow || !currentRow.parentElement) return;
      if (!isEventFromWithin(e, currentRow)) {
        onKeyDown == null ? void 0 : onKeyDown(e);
        return;
      }
      const closestTable = currentRow.closest("table");
      const rowsInTable = closestTable ? (
        // getFocusableElements returns an HTMLElement[] but we are filtering for HTMLTableRowElements
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        getFocusableElements(closestTable).filter(
          (element) => element.tagName === "TR"
        )
      ) : [];
      const currentRowIndex = rowsInTable.indexOf(currentRow);
      const currentIndexOfFocusables = focusablesInRow.indexOf(
        // activeElement is generic Element, so we need to cast it to HTMLElement
        // eslint-disable-next-line no-type-assertion/no-type-assertion
        document.activeElement
      );
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        focusAdjacentRow(rowsInTable, currentRowIndex, e.key);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        focusAdjacentFocusableElementInRow(focusablesInRow, currentIndexOfFocusables, e.key);
      } else if (e.key === "Escape") {
        e.preventDefault();
        const table = currentRow.closest("table");
        if (table) {
          table.focus();
        }
      }
      onKeyDown == null ? void 0 : onKeyDown(e);
    },
    [rowRef, focusablesInRow, onKeyDown]
  );
  const handleFocus = React.useCallback(
    (e) => {
      if (setFocusAlsoRunsSelect) onSelect == null ? void 0 : onSelect(e);
    },
    [setFocusAlsoRunsSelect, onSelect]
  );
  return /* @__PURE__ */ jsx(
    "tr",
    {
      "data-slot": "table-row",
      ref: rowRef,
      tabIndex: -1,
      onKeyDown: handleKeyDown,
      onFocus: handleFocus,
      className: cn(
        "tw:border-b tw:transition-colors tw:hover:bg-muted/50 tw:has-aria-expanded:bg-muted/50 tw:data-[state=selected]:bg-muted",
        // CUSTOM: Add outline-hidden to remove duplicate browser outline and replace with a custom
        // focus ring so keyboard users see a visible, accessible focus indicator on focused rows
        "tw:outline-hidden",
        "tw:focus:relative tw:focus:z-10 tw:focus:ring-2 tw:focus:ring-ring tw:focus:ring-offset-1 tw:focus:ring-offset-background",
        className
      ),
      ...props
    }
  );
}
function TableHead({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "th",
    {
      "data-slot": "table-head",
      className: cn(
        "tw:h-10 tw:px-2 tw:text-start tw:align-middle tw:font-medium tw:whitespace-nowrap tw:text-foreground tw:[&:has([role=checkbox])]:pe-0",
        className
      ),
      ...props
    }
  );
}
function TableCell({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "td",
    {
      "data-slot": "table-cell",
      className: cn(
        "tw:p-2 tw:align-middle tw:whitespace-nowrap tw:[&:has([role=checkbox])]:pe-0",
        className
      ),
      ...props
    }
  );
}
function TableCaption({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "caption",
    {
      "data-slot": "table-caption",
      className: cn("tw:mt-4 tw:text-sm tw:text-muted-foreground", className),
      ...props
    }
  );
}
function useHasContentBelow(scrollerRef, isEnabled = true) {
  const [hasContentBelow, setHasContentBelow] = useState(false);
  useEffect(() => {
    const element = scrollerRef.current;
    if (!isEnabled || !element) {
      setHasContentBelow(false);
      return void 0;
    }
    const update = () => {
      setHasContentBelow(element.scrollTop + element.clientHeight < element.scrollHeight - 1);
    };
    update();
    element.addEventListener("scroll", update);
    const resizeObserver = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : void 0;
    resizeObserver == null ? void 0 : resizeObserver.observe(element);
    const mutationObserver = new MutationObserver(update);
    mutationObserver.observe(element, { childList: true, subtree: true });
    return () => {
      element.removeEventListener("scroll", update);
      resizeObserver == null ? void 0 : resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [scrollerRef, isEnabled]);
  return hasContentBelow;
}
function OptionListScrollCue({
  children,
  isEnabled,
  scrollerRef
}) {
  const hasContentBelow = useHasContentBelow(scrollerRef, isEnabled);
  if (!isEnabled) return children;
  return (
    // `min-h-0` and the flex column keep the scroller, not this wrapper, as the box that shrinks:
    // the wrapper stands between `Command`'s flex column and `CommandList`, and a block whose
    // `min-height` resolves to its content height would push the list out of a capped popover
    // instead of letting it scroll.
    /* @__PURE__ */ jsxs("div", { className: "tw:relative tw:flex tw:min-h-0 tw:flex-col", children: [
      children,
      hasContentBelow && /* @__PURE__ */ jsx(
        "div",
        {
          "data-slot": "command-list-scroll-cue",
          "aria-hidden": true,
          className: "tw:pointer-events-none tw:absolute tw:inset-x-0 tw:bottom-0 tw:h-3 tw:bg-gradient-to-t tw:from-popover tw:to-transparent"
        }
      )
    ] })
  );
}
function MultiSelectComboBox({
  entries,
  selected,
  onChange,
  placeholder,
  searchPlaceholder,
  hasToggleAllFeature = false,
  selectAllText = "Select All",
  clearAllText = "Clear All",
  commandEmptyMessage = "No entries found",
  customSelectedText,
  isOpen = void 0,
  onOpenChange = void 0,
  isDisabled = false,
  sortSelected = false,
  showScrollCue = false,
  icon = void 0,
  className = void 0,
  variant = "ghost",
  id
}) {
  const [isOpenLocal, setIsOpenLocal] = useState(false);
  const listRef = useRef(null);
  const handleSelect = useCallback(
    (label) => {
      var _a;
      const value = (_a = entries.find((entry) => entry.label === label)) == null ? void 0 : _a.value;
      if (!value) return;
      onChange(
        selected.includes(value) ? selected.filter((item) => item !== value) : [...selected, value]
      );
    },
    [entries, selected, onChange]
  );
  const getPlaceholderText = () => {
    if (customSelectedText) return customSelectedText;
    return placeholder;
  };
  const actualIsOpen = isOpen ?? isOpenLocal;
  const actualOnOpenChange = onOpenChange ?? setIsOpenLocal;
  const [wasOpen, setWasOpen] = useState(actualIsOpen);
  const [sortSelection, setSortSelection] = useState(selected);
  if (wasOpen !== actualIsOpen) {
    setWasOpen(actualIsOpen);
    if (actualIsOpen) setSortSelection(selected);
  }
  const sortedOptions = useMemo(() => {
    if (!sortSelected) return entries;
    const starredItems = entries.filter((opt) => opt.starred).sort((a, b) => a.label.localeCompare(b.label));
    const nonStarredItems = entries.filter((opt) => !opt.starred).sort((a, b) => {
      const aSelected = sortSelection.includes(a.value);
      const bSelected = sortSelection.includes(b.value);
      if (aSelected && !bSelected) return -1;
      if (!aSelected && bSelected) return 1;
      return a.label.localeCompare(b.label);
    });
    return [...starredItems, ...nonStarredItems];
  }, [entries, sortSelection, sortSelected]);
  const handleSelectAll = () => {
    const allValues = entries.map((entry) => entry.value);
    setSortSelection(allValues);
    onChange(allValues);
  };
  const handleClearAll = () => {
    setSortSelection([]);
    onChange([]);
  };
  return /* @__PURE__ */ jsx("div", { id, className, children: /* @__PURE__ */ jsxs(Popover, { open: actualIsOpen, onOpenChange: actualOnOpenChange, children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant,
        role: "combobox",
        "aria-expanded": actualIsOpen,
        className: "tw:group tw:w-full tw:justify-between",
        disabled: isDisabled,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-center tw:gap-2", children: [
            icon && /* @__PURE__ */ jsx("div", { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50", children: /* @__PURE__ */ jsx("span", { className: "tw:flex tw:h-full tw:w-full tw:items-center tw:justify-center", children: icon }) }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "tw:min-w-0 tw:overflow-hidden tw:text-ellipsis tw:whitespace-nowrap tw:text-start tw:font-normal"
                ),
                children: getPlaceholderText()
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ChevronsUpDown, { className: "tw:ml-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(PopoverContent, { align: "start", className: "tw:w-full tw:p-0", children: /* @__PURE__ */ jsxs(Command, { children: [
      /* @__PURE__ */ jsx(
        CommandInput,
        {
          placeholder: searchPlaceholder ?? placeholder,
          spaceSelectsHighlightedItem: true
        }
      ),
      hasToggleAllFeature && /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:justify-between tw:border-b tw:p-2", children: [
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: handleSelectAll, children: selectAllText }),
        /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: handleClearAll, children: clearAllText })
      ] }),
      /* @__PURE__ */ jsx(OptionListScrollCue, { isEnabled: showScrollCue, scrollerRef: listRef, children: /* @__PURE__ */ jsxs(CommandList, { ref: listRef, children: [
        /* @__PURE__ */ jsx(CommandEmpty, { children: commandEmptyMessage }),
        /* @__PURE__ */ jsx(CommandGroup, { children: sortedOptions.map((option) => {
          return /* @__PURE__ */ jsxs(
            CommandItem,
            {
              value: option.label,
              onSelect: handleSelect,
              className: "tw:flex tw:items-center tw:gap-2",
              children: [
                /* @__PURE__ */ jsx("div", { className: "w-4", children: /* @__PURE__ */ jsx(
                  Check,
                  {
                    className: cn(
                      "tw:h-4 tw:w-4",
                      selected.includes(option.value) ? "tw:opacity-100" : "tw:opacity-0"
                    )
                  }
                ) }),
                option.starred && /* @__PURE__ */ jsx(Star, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ jsx("div", { className: "tw:flex-grow", children: option.label }),
                option.secondaryLabel && /* @__PURE__ */ jsx("div", { className: "tw:text-end tw:text-muted-foreground", children: option.secondaryLabel })
              ]
            },
            option.label
          );
        }) })
      ] }) })
    ] }) })
  ] }) });
}
function stripMarkerNestingPrefix(markerText) {
  return markerText.replace(/^\+/, "");
}
function isNoteMarker(styleInfo, marker) {
  if (!styleInfo || marker === "") return false;
  const typed = stripMarkerNestingPrefix(marker).toLowerCase();
  return Object.values(styleInfo.markers).some(
    (style) => style.styleType === "note" && stripMarkerNestingPrefix(style.marker).toLowerCase() === typed
  );
}
function filterAndRankPaletteItems(items, filterText, mode) {
  if (!filterText) return [...items];
  const rankableItems = [...items];
  const query = stripMarkerNestingPrefix(filterText).toLowerCase();
  if (mode === "passive") {
    return filterAndRankItems({
      query,
      items: rankableItems,
      filter: (item) => stripMarkerNestingPrefix(item.label).toLowerCase().startsWith(query),
      sortBy: "label"
    });
  }
  return filterAndRankItems({
    query,
    items: rankableItems,
    filter: (item) => stripMarkerNestingPrefix(item.label).toLowerCase().includes(query),
    sortBy: "label"
  });
}
function isImeCompositionKeyEvent(event) {
  return event.isComposing || event.keyCode === 229;
}
const FILTER_CHAR_REGEX = /^[a-z0-9+-]$/i;
function resolveFilterCharacter(event) {
  var _a;
  const { key, keyCode } = event;
  if (event.altKey && isMacOs()) return void 0;
  if (key === "Dead") return void 0;
  if (FILTER_CHAR_REGEX.test(key)) return key;
  if (keyCode >= 65 && keyCode <= 90) {
    const letter = String.fromCharCode(keyCode);
    const upperKey = key.toUpperCase();
    const lowerKey = key.toLowerCase();
    const isUpper = upperKey !== lowerKey ? key === upperKey : event.shiftKey !== (((_a = event.getModifierState) == null ? void 0 : _a.call(event, "CapsLock")) ?? false);
    return isUpper ? letter : letter.toLowerCase();
  }
  return void 0;
}
const CONTROL_KEYS = [
  " ",
  "Enter",
  "Escape",
  "Tab",
  "Backspace",
  "ArrowUp",
  "ArrowDown",
  "*",
  "\\"
];
const FILTER_CHAR_ALPHABET = [
  ..."abcdefghijklmnopqrstuvwxyz",
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."0123456789",
  "+",
  "-"
];
function getMarkerPaletteClaimedKeys() {
  return [...CONTROL_KEYS, ...FILTER_CHAR_ALPHABET.filter((char) => FILTER_CHAR_REGEX.test(char))];
}
function claim(event) {
  event.preventDefault();
  event.stopPropagation();
}
function handleMarkerPaletteSessionKeyDown(event, session, driver) {
  var _a, _b;
  const { kind } = session;
  if (isImeCompositionKeyEvent(event)) {
    return "passed";
  }
  if (MODIFIER_KEYS.has(event.key)) {
    return "passed";
  }
  const isAltAChordModifier = !isMacOs();
  if ((event.ctrlKey || event.metaKey || event.altKey && isAltAChordModifier) && !((_a = event.getModifierState) == null ? void 0 : _a.call(event, "AltGraph"))) {
    if (event.key === "Enter") claim(event);
    driver.dismiss();
    return "ended";
  }
  if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    claim(event);
    driver.update({ moveSelection: event.key === "ArrowDown" ? 1 : -1 });
    return "continue";
  }
  if (event.key === "Enter" || event.key === "Tab") {
    claim(event);
    const matches = filterAndRankPaletteItems(
      session.items.map((item) => ({ label: item.marker })),
      session.filter,
      // The host-driven mode, for every kind: all marker palettes are host-driven (the session
      // owns the query and the palette renders it read-only), so this commit must resolve against
      // the same list the host filtered. `'passive'` is that mode's name — a label PREFIX match,
      // mirroring PT9's marker dropdown — not containment. Ranking cmdk's way here instead would
      // commit an item the rendered list never offered.
      "passive"
    );
    if (matches.length === 0) {
      return "continue";
    }
    driver.commit();
    return "ended";
  }
  if (event.key === "Escape") {
    claim(event);
    driver.dismiss();
    return "ended";
  }
  if (event.key === " ") {
    if (kind !== "selection") {
      claim(event);
      if (session.filter === "") {
        driver.dismiss();
        return "ended";
      }
      const typedMarker = stripMarkerNestingPrefix(session.filter).toLowerCase();
      if ((_b = session.isNoteMarker) == null ? void 0 : _b.call(session, typedMarker)) {
        const offered = session.items.find(
          (item) => stripMarkerNestingPrefix(item.marker).toLowerCase() === typedMarker
        );
        if (offered) driver.commitItem(offered.marker);
        driver.dismiss();
        return "ended";
      }
      driver.commitTyped(session.filter);
      driver.dismiss();
      return "ended";
    }
    claim(event);
    const typed = stripMarkerNestingPrefix(session.filter).toLowerCase();
    const match = session.items.find(
      (item) => stripMarkerNestingPrefix(item.marker).toLowerCase() === typed
    );
    if (match) driver.commitItem(match.marker);
    driver.dismiss();
    return "ended";
  }
  if (event.key === "*") {
    if (kind === "selection" && session.filter === "") {
      claim(event);
      driver.dismiss();
      return "ended";
    }
    claim(event);
    driver.commitTypedCloser(session.filter);
    driver.dismiss();
    return "ended";
  }
  if (event.key === "\\" && kind !== "selection") {
    if (session.filter === "") {
      claim(event);
      return "continue";
    }
    claim(event);
    driver.commitTypedAndReopen(session.filter);
    return "ended";
  }
  if (event.key === "Backspace" && session.filter === "") {
    claim(event);
    driver.dismiss();
    return "ended";
  }
  const filterCharacter = resolveFilterCharacter(event);
  if (event.key === "Backspace" || filterCharacter !== void 0) {
    claim(event);
    session.filter = event.key === "Backspace" ? session.filter.slice(0, -1) : session.filter + filterCharacter;
    driver.update({ filterText: session.filter });
    return "continue";
  }
  claim(event);
  return "continue";
}
function clearPaletteSessionIfCurrent(sessionRef, token) {
  var _a;
  if (((_a = sessionRef.current) == null ? void 0 : _a.token) === token) sessionRef.current = void 0;
}
function captureEditorContentSnapshot(readContent, readCaret) {
  const content = readContent();
  if (content === void 0) return void 0;
  const caret = readCaret();
  return {
    content: JSON.stringify(content),
    caret: caret === void 0 ? void 0 : JSON.stringify(caret)
  };
}
function hasEditorChanged(baseline, current) {
  if (!baseline || !current) return false;
  if (baseline.content !== current.content) return true;
  if (current.caret === void 0) return false;
  return current.caret !== baseline.caret;
}
function runMarkerPaletteSession(options) {
  const {
    items,
    kind,
    isNoteMarker: isNoteMarker2,
    sessionCounterRef,
    setSession,
    clearSessionIfCurrent,
    runSessionKey,
    show,
    restoreSelectionIfLost,
    hasEditorChangedSinceFocus,
    focusEditor,
    applyItem,
    onShowError
  } = options;
  const restoreEditorSelection = () => {
    restoreSelectionIfLost();
    focusEditor();
  };
  sessionCounterRef.current += 1;
  const token = sessionCounterRef.current;
  const isStillCurrentSession = () => sessionCounterRef.current === token;
  const session = { kind, token, filter: "", items };
  if (isNoteMarker2) session.isNoteMarker = isNoteMarker2;
  setSession(session);
  show({
    // The session owns these keys wherever focus ends up — without this, a palette that wins the
    // focus race takes the session's keys with it and none of the ratified commit semantics run.
    // Inert for a LIST-FOCUSED palette, which every marker palette is: it forwards every key and
    // never reads this list. Declared anyway so the declaration stays honest for a forwarding
    // palette that is not list-focused — see `getMarkerPaletteClaimedKeys`.
    keys: getMarkerPaletteClaimedKeys(),
    onKey: (event) => runSessionKey(event)
  }).then((committedId) => {
    var _a;
    clearSessionIfCurrent(token);
    const id = committedId ?? ((_a = session.itemToApplyOnClose) == null ? void 0 : _a.marker);
    if (id !== void 0) {
      const editorChanged = (hasEditorChangedSinceFocus == null ? void 0 : hasEditorChangedSinceFocus()) ?? false;
      restoreEditorSelection();
      const selected = editorChanged ? void 0 : items.find((item) => item.marker === id);
      if (selected) applyItem(selected);
    } else if (isStillCurrentSession()) {
      restoreEditorSelection();
    }
    return void 0;
  }).catch((error) => {
    clearSessionIfCurrent(token);
    if (isStillCurrentSession()) restoreEditorSelection();
    onShowError(error);
  });
}
function routeMarkerPaletteKey(event, options) {
  const {
    sessionRef,
    editorRef,
    palette,
    restoreCaret,
    reopenAtCaret,
    clearSessionIfCurrent,
    hasEditorChangedSinceFocus
  } = options;
  const session = sessionRef.current;
  if (!session) return "no-session";
  const applyUnlessEditorChanged = (apply) => {
    if (hasEditorChangedSinceFocus == null ? void 0 : hasEditorChangedSinceFocus()) {
      palette.dismiss();
      return;
    }
    apply();
  };
  const outcome = handleMarkerPaletteSessionKeyDown(event, session, {
    update: (update) => palette.update(update),
    commit: () => palette.commit(),
    dismiss: () => palette.dismiss(),
    commitTyped: (typed) => applyUnlessEditorChanged(() => {
      var _a;
      restoreCaret();
      (_a = editorRef.current) == null ? void 0 : _a.commitTypedMarker(typed);
    }),
    commitTypedAndReopen: (typed) => applyUnlessEditorChanged(() => {
      var _a;
      restoreCaret();
      (_a = editorRef.current) == null ? void 0 : _a.commitTypedMarker(typed, { trailingSpace: false });
      if (!reopenAtCaret()) palette.dismiss();
    }),
    commitTypedCloser: (typed) => applyUnlessEditorChanged(() => {
      var _a;
      restoreCaret();
      (_a = editorRef.current) == null ? void 0 : _a.commitTypedCloser(typed);
    }),
    commitItem: (marker) => applyUnlessEditorChanged(() => {
      var _a;
      const selected = session.items.find((item) => item.marker === marker);
      if (!selected) return;
      if (selected.kind === "note") {
        session.itemToApplyOnClose = selected;
        return;
      }
      restoreCaret();
      (_a = editorRef.current) == null ? void 0 : _a.applyMarkerMenuSelection(selected, {
        trigger: "backslash",
        literalPrefixLanded: false
      });
    })
  });
  if (outcome === "ended") clearSessionIfCurrent(session.token);
  return "routed";
}
function useMarkerPaletteCompositionClose({
  isSessionOpen,
  dismiss,
  target
}) {
  useEffect(() => {
    const listenOn = target ?? document;
    const handleCompositionStart = () => {
      if (isSessionOpen()) dismiss();
    };
    listenOn.addEventListener("compositionstart", handleCompositionStart, { capture: true });
    return () => {
      listenOn.removeEventListener("compositionstart", handleCompositionStart, { capture: true });
    };
  }, [isSessionOpen, dismiss, target]);
}
function useMarkerPaletteFocusOutCapture({
  containerRef,
  editorRef,
  selectionRef,
  baselineRef,
  isSessionOpen,
  target
}) {
  useEffect(() => {
    const listenOn = target ?? document;
    const handleFocusOut = (event) => {
      var _a, _b, _c;
      const editorInput = (_a = containerRef.current) == null ? void 0 : _a.querySelector(".editor-input");
      if (!editorInput || event.target !== editorInput) return;
      const selection = (_b = editorRef.current) == null ? void 0 : _b.getSelection();
      if (selection) selectionRef.current = selection;
      else if ((_c = editorRef.current) == null ? void 0 : _c.getSelectedParaMarker()) selectionRef.current = void 0;
      if (isSessionOpen())
        baselineRef.current = captureEditorContentSnapshot(
          () => {
            var _a2;
            return (_a2 = editorRef.current) == null ? void 0 : _a2.getUsj();
          },
          () => {
            var _a2;
            return (_a2 = editorRef.current) == null ? void 0 : _a2.getSelection();
          }
        );
    };
    listenOn.addEventListener("focusout", handleFocusOut);
    return () => listenOn.removeEventListener("focusout", handleFocusOut);
  }, [containerRef, editorRef, selectionRef, baselineRef, isSessionOpen, target]);
}
function useMarkerPaletteSessionWriters({
  sessionRef,
  editorRef,
  baselineRef
}) {
  const suspendedEditorRef = useRef(void 0);
  const setSession = useCallback(
    (session) => {
      sessionRef.current = session;
      if (session) baselineRef.current = void 0;
      const editor = editorRef.current ?? void 0;
      suspendedEditorRef.current = session ? editor : void 0;
      editor == null ? void 0 : editor.setMarkerSettleSuspended(!!session);
    },
    [sessionRef, baselineRef, editorRef]
  );
  const clearSessionIfCurrent = useCallback(
    (token) => {
      var _a;
      clearPaletteSessionIfCurrent(sessionRef, token);
      if (sessionRef.current) return;
      suspendedEditorRef.current = void 0;
      (_a = editorRef.current) == null ? void 0 : _a.setMarkerSettleSuspended(false);
    },
    [sessionRef, editorRef]
  );
  useEffect(
    () => () => {
      var _a;
      (_a = suspendedEditorRef.current) == null ? void 0 : _a.setMarkerSettleSuspended(false);
    },
    []
  );
  return { setSession, clearSessionIfCurrent };
}
function Kbd({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "kbd",
    {
      "data-slot": "kbd",
      className: cn(
        // CUSTOM: Added pr-twp at the front to apply Platform.Bible's Tailwind CSS scope isolation
        "pr-twp tw:pointer-events-none tw:inline-flex tw:h-5 tw:w-fit tw:min-w-5 tw:items-center tw:justify-center tw:gap-1 tw:rounded-sm tw:bg-muted tw:px-1 tw:font-sans tw:text-xs tw:font-medium tw:text-muted-foreground tw:select-none tw:in-data-[slot=tooltip-content]:bg-background/20 tw:in-data-[slot=tooltip-content]:text-background tw:dark:in-data-[slot=tooltip-content]:bg-background/10 tw:[&_svg:not([class*=size-])]:size-3",
        className
      ),
      ...props
    }
  );
}
function KbdGroup({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "kbd",
    {
      "data-slot": "kbd-group",
      className: cn("pr-twp tw:inline-flex tw:items-center tw:gap-1", className),
      ...props
    }
  );
}
const MACOS_SYMBOL_KEYS = /* @__PURE__ */ new Set([
  "⌘",
  "⌥",
  "⌃",
  "⇧",
  "⇥",
  "⏎",
  "⌫",
  "⎋",
  "␣",
  "↑",
  "↓",
  "←",
  "→"
]);
function parseMacOsHint(hint) {
  const graphemes = split(hint, "");
  let symbolCount = 0;
  while (symbolCount < graphemes.length && MACOS_SYMBOL_KEYS.has(graphemes[symbolCount]))
    symbolCount += 1;
  if (symbolCount === 0) return void 0;
  const symbols = graphemes.slice(0, symbolCount);
  const finalKey = slice(hint, symbolCount);
  return finalKey ? [...symbols, finalKey] : symbols;
}
function parsePlusJoinedHint(hint) {
  const keycaps = [];
  let current = "";
  split(hint, "").forEach((grapheme) => {
    if (grapheme === "+" && current) {
      keycaps.push(current);
      current = "";
    } else current += grapheme;
  });
  if (current) keycaps.push(current);
  return keycaps;
}
function getShortcutKeycaps(hint) {
  const macOsKeycaps = parseMacOsHint(hint);
  if (macOsKeycaps) return { keycaps: macOsKeycaps, separator: "" };
  return { keycaps: parsePlusJoinedHint(hint), separator: "+" };
}
function ShortcutKeys({ hint }) {
  const { keycaps, separator } = getShortcutKeycaps(hint);
  if (keycaps.length === 1) return /* @__PURE__ */ jsx(Kbd, { className: "tw:tracking-normal", children: keycaps[0] });
  return (
    // `dir="ltr"` on the group itself, not an enclosing element: `KbdGroup` is `inline-flex`, and
    // flex item order follows `direction`, so this keeps the keycap order in a right-to-left layout.
    /* @__PURE__ */ jsx(KbdGroup, { dir: "ltr", className: "tw:tracking-normal", children: keycaps.map((keycap, index) => (
      // A combo can repeat a glyph (`Ctrl++` has two keycaps but only one distinct value), so the
      // keycap text is not a safe key; position is stable because the keycaps never reorder.
      // eslint-disable-next-line react/no-array-index-key
      /* @__PURE__ */ jsxs(Fragment, { children: [
        index > 0 && separator && /* @__PURE__ */ jsx("span", { children: separator }),
        /* @__PURE__ */ jsx(Kbd, { children: keycap })
      ] }, index)
    )) })
  );
}
const UNDO_REDO_BUTTONS_STRING_KEYS = Object.freeze([
  "%undoButton_tooltip%",
  "%redoButton_tooltip%"
]);
const localizeString = (strings, key) => strings[key] ?? key;
function UndoRedoButtons({
  onUndoClick,
  onRedoClick,
  canUndo = true,
  canRedo = true,
  localizedStrings = {},
  showKeyboardShortcuts = true,
  className = "tw:h-6 tw:w-6",
  variant = "ghost"
}) {
  const isMac = isMacOs();
  const undoLocalized = localizeString(localizedStrings, "%undoButton_tooltip%");
  const redoLocalized = localizeString(localizedStrings, "%redoButton_tooltip%");
  const getsSeparator = variant === "secondary" || variant === "default";
  return /* @__PURE__ */ jsxs(ButtonGroup, { children: [
    /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
        Button,
        {
          "aria-label": undoLocalized,
          className,
          size: "icon",
          onClick: onUndoClick,
          disabled: !canUndo,
          variant,
          children: /* @__PURE__ */ jsx(Undo, {})
        }
      ) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsxs("p", { children: [
        undoLocalized,
        showKeyboardShortcuts && /* @__PURE__ */ jsxs(Fragment$1, { children: [
          " ",
          /* @__PURE__ */ jsx(ShortcutKeys, { hint: isMac ? "⌘Z" : "Ctrl+Z" })
        ] })
      ] }) })
    ] }) }),
    onRedoClick && getsSeparator && /* @__PURE__ */ jsx(ButtonGroupSeparator, {}),
    onRedoClick && /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
        Button,
        {
          "aria-label": redoLocalized,
          className,
          size: "icon",
          onClick: onRedoClick,
          disabled: !canRedo,
          variant,
          children: /* @__PURE__ */ jsx(Redo, {})
        }
      ) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsxs("p", { children: [
        redoLocalized,
        showKeyboardShortcuts && /* @__PURE__ */ jsxs(Fragment$1, { children: [
          " ",
          /* @__PURE__ */ jsx(ShortcutKeys, { hint: isMac ? "⇧⌘Z" : "Ctrl+Y" })
        ] })
      ] }) })
    ] }) })
  ] });
}
function EditorKeyboardShortcuts({
  children,
  editorRef,
  canUndo = true,
  canRedo = true
}) {
  const divRef = useRef(null);
  useEffect(() => {
    var _a;
    const isMac = isMacOs();
    const editorInput = ((_a = divRef.current) == null ? void 0 : _a.querySelector(".editor-input")) ?? void 0;
    const handleKeyDown = (event) => {
      var _a2, _b, _c, _d;
      if (!editorInput || document.activeElement !== editorInput) return;
      const key = event.key.toLowerCase();
      if (isMac) {
        if (!event.metaKey) return;
        if (!event.shiftKey && key === "z") {
          event.preventDefault();
          if (canUndo) {
            (_a2 = editorRef.current) == null ? void 0 : _a2.undo();
          }
        } else if (event.shiftKey && key === "z") {
          event.preventDefault();
          if (canRedo) {
            (_b = editorRef.current) == null ? void 0 : _b.redo();
          }
        }
      } else {
        if (!event.ctrlKey) return;
        if (!event.shiftKey && key === "z") {
          event.preventDefault();
          if (canUndo) {
            (_c = editorRef.current) == null ? void 0 : _c.undo();
          }
        } else if (key === "y" || event.shiftKey && key === "z") {
          event.preventDefault();
          if (canRedo) {
            (_d = editorRef.current) == null ? void 0 : _d.redo();
          }
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [canRedo, canUndo, editorRef]);
  return /* @__PURE__ */ jsx("div", { ref: divRef, children });
}
function useLivePopoverAnchor() {
  const sourceRef = useRef(void 0);
  const lastRectRef = useRef(new DOMRect());
  const virtualRef = useRef({
    getBoundingClientRect: () => {
      var _a;
      const rect = (_a = sourceRef.current) == null ? void 0 : _a.measure();
      if (rect) lastRectRef.current = rect;
      return lastRectRef.current;
    },
    get contextElement() {
      var _a;
      return (_a = sourceRef.current) == null ? void 0 : _a.contextElement;
    }
  });
  const setSource = useCallback((source) => {
    sourceRef.current = source;
    lastRectRef.current = source.measure() ?? new DOMRect();
  }, []);
  return useMemo(() => ({ virtualRef, setSource }), [setSource]);
}
function measureBox(target) {
  if (target.getClientRects().length === 0) return void 0;
  return target.getBoundingClientRect();
}
function leftEdgeRect(rect) {
  return new DOMRect(rect.left, rect.top, 0, rect.height);
}
const renderCallerButtonContent = (callerType, localizedStrings, customCaller) => {
  if (callerType === "generated") {
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx("p", { children: "+" }),
      " ",
      localizedStrings["%footnoteEditor_callerDropdown_item_generated%"]
    ] });
  }
  if (callerType === "hidden") {
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx("p", { children: "-" }),
      " ",
      localizedStrings["%footnoteEditor_callerDropdown_item_hidden%"]
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx("p", { children: customCaller }),
    " ",
    localizedStrings["%footnoteEditor_callerDropdown_item_custom%"]
  ] });
};
function FootnoteCallerDropdown({
  callerType,
  customCaller,
  updateCaller,
  localizedStrings,
  focusNoteText
}) {
  const committedCaller = useRef(false);
  const customCallerInputRef = useRef(null);
  const customCallerSelectRef = useRef(null);
  const isCustomCallerInputFocused = useRef(false);
  const [selectedCallerType, setSelectedCallerType] = useState(callerType);
  const [newCustomCaller, setNewCustomCaller] = useState(customCaller);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const wasCustomBeforePressRef = useRef(false);
  const selectedCallerTypeRef = useRef(selectedCallerType);
  selectedCallerTypeRef.current = selectedCallerType;
  const newCustomCallerRef = useRef(newCustomCaller);
  newCustomCallerRef.current = newCustomCaller;
  useEffect(() => {
    setSelectedCallerType(callerType);
  }, [callerType]);
  useEffect(() => {
    if (newCustomCaller !== customCaller) {
      setNewCustomCaller(customCaller);
    }
  }, [customCaller]);
  const handleDropdownOpenChange = (open) => {
    isCustomCallerInputFocused.current = false;
    setIsDropdownOpen(open);
    if (!open) {
      const pendingCallerType = selectedCallerTypeRef.current;
      const pendingCustomCaller = newCustomCallerRef.current;
      if (pendingCallerType !== "custom" || pendingCustomCaller) {
        if (pendingCallerType !== callerType || pendingCustomCaller !== customCaller) {
          committedCaller.current = true;
          updateCaller(pendingCallerType, pendingCustomCaller);
        }
      } else {
        setSelectedCallerType(callerType);
        setNewCustomCaller(customCaller);
      }
    }
  };
  const handleKeyDown = (event) => {
    var _a, _b, _c, _d;
    event.stopPropagation();
    if (document.activeElement === customCallerSelectRef.current && event.key === "ArrowDown" || event.key === "ArrowRight") {
      (_a = customCallerInputRef.current) == null ? void 0 : _a.focus();
      isCustomCallerInputFocused.current = true;
    } else if (document.activeElement === customCallerInputRef.current && event.key === "ArrowUp") {
      (_b = customCallerSelectRef.current) == null ? void 0 : _b.focus();
      isCustomCallerInputFocused.current = false;
    } else if (document.activeElement === customCallerInputRef.current && event.key === "ArrowLeft" && ((_c = customCallerInputRef.current) == null ? void 0 : _c.selectionStart) === 0) {
      (_d = customCallerSelectRef.current) == null ? void 0 : _d.focus();
      isCustomCallerInputFocused.current = false;
    }
    if (selectedCallerType === "custom" && event.key === "Enter" && (document.activeElement === customCallerSelectRef.current || document.activeElement === customCallerInputRef.current)) {
      handleDropdownOpenChange(false);
    }
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { open: isDropdownOpen, onOpenChange: handleDropdownOpenChange, children: [
    /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "tw:h-6", children: renderCallerButtonContent(callerType, localizedStrings, customCaller) }) }) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: localizedStrings["%footnoteEditor_callerDropdown_tooltip%"] })
    ] }) }),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        style: { zIndex: Z_INDEX_ABOVE_POPOVER },
        onEscapeKeyDown: () => {
          selectedCallerTypeRef.current = callerType;
          newCustomCallerRef.current = customCaller;
          setSelectedCallerType(callerType);
          setNewCustomCaller(customCaller);
        },
        onCloseAutoFocus: (event) => {
          if (!committedCaller.current) return;
          committedCaller.current = false;
          event.preventDefault();
          focusUnlessSuppressed(focusNoteText);
        },
        onClick: () => {
          if (isCustomCallerInputFocused.current) isCustomCallerInputFocused.current = false;
        },
        onKeyDown: handleKeyDown,
        onMouseMove: () => {
          var _a;
          if (isCustomCallerInputFocused.current) (_a = customCallerInputRef.current) == null ? void 0 : _a.focus();
        },
        children: [
          /* @__PURE__ */ jsx(DropdownMenuLabel, { children: localizedStrings["%footnoteEditor_callerDropdown_label%"] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsx(
            DropdownMenuCheckboxItem,
            {
              checked: selectedCallerType === "generated",
              onCheckedChange: () => setSelectedCallerType("generated"),
              children: /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: localizedStrings["%footnoteEditor_callerDropdown_item_generated%"] }),
                /* @__PURE__ */ jsx("span", { className: "tw:w-10 tw:text-center", children: GENERATOR_NOTE_CALLER })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            DropdownMenuCheckboxItem,
            {
              checked: selectedCallerType === "hidden",
              onCheckedChange: () => setSelectedCallerType("hidden"),
              children: /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: localizedStrings["%footnoteEditor_callerDropdown_item_hidden%"] }),
                /* @__PURE__ */ jsx("span", { className: "tw:w-10 tw:text-center", children: HIDDEN_NOTE_CALLER })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(
            DropdownMenuCheckboxItem,
            {
              ref: customCallerSelectRef,
              checked: selectedCallerType === "custom",
              onCheckedChange: () => setSelectedCallerType("custom"),
              onPointerDown: () => {
                wasCustomBeforePressRef.current = selectedCallerType === "custom";
              },
              onClick: (event) => {
                var _a;
                event.stopPropagation();
                if (wasCustomBeforePressRef.current && event.target !== customCallerInputRef.current) {
                  handleDropdownOpenChange(false);
                  return;
                }
                isCustomCallerInputFocused.current = true;
                (_a = customCallerInputRef.current) == null ? void 0 : _a.focus();
              },
              onSelect: (event) => event.preventDefault(),
              children: /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:w-full tw:justify-between", children: [
                /* @__PURE__ */ jsx("span", { children: localizedStrings["%footnoteEditor_callerDropdown_item_custom%"] }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    tabIndex: 0,
                    onMouseDown: (event) => {
                      event.stopPropagation();
                      setSelectedCallerType("custom");
                      isCustomCallerInputFocused.current = true;
                    },
                    ref: customCallerInputRef,
                    className: "tw:h-auto tw:w-10 tw:p-0 tw:text-center",
                    value: newCustomCaller,
                    onKeyDown: (event) => {
                      if (!(event.key === "Enter" || event.key === "ArrowUp" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowRight"))
                        event.stopPropagation();
                    },
                    maxLength: 1,
                    onChange: (event) => setNewCustomCaller(event.target.value)
                  }
                )
              ] })
            }
          )
        ]
      }
    )
  ] });
}
const renderNoteTypeButtonContent = (noteType, localizedStrings) => {
  if (noteType === "f") {
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(FunctionSquare, {}),
      " ",
      localizedStrings["%footnoteEditor_noteType_footnote_label%"]
    ] });
  }
  if (noteType === "fe") {
    return /* @__PURE__ */ jsxs(Fragment$1, { children: [
      /* @__PURE__ */ jsx(SquareSigma, {}),
      " ",
      localizedStrings["%footnoteEditor_noteType_endNote_label%"]
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(SquareX, {}),
    " ",
    localizedStrings["%footnoteEditor_noteType_crossReference_label%"]
  ] });
};
const formatNoteTypeTooltip = (noteType, localizedStrings) => {
  if (noteType === "x") {
    return localizedStrings["%footnoteEditor_noteType_crossReference_label%"];
  }
  let noteTypeString = localizedStrings["%footnoteEditor_noteType_endNote_label%"];
  if (noteType === "f") {
    noteTypeString = localizedStrings["%footnoteEditor_noteType_footnote_label%"];
  }
  return formatReplacementString(localizedStrings["%footnoteEditor_noteType_tooltip%"] ?? "", {
    noteType: noteTypeString
  });
};
function FootnoteTypeDropdown({
  noteType,
  handleNoteTypeChange,
  localizedStrings,
  isTypeSwitchable,
  focusNoteText
}) {
  const choseNoteType = useRef(false);
  const chooseNoteType = (newNoteType) => {
    if (newNoteType === noteType) return;
    choseNoteType.current = true;
    handleNoteTypeChange(newNoteType);
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", className: "tw:h-6", children: renderNoteTypeButtonContent(noteType, localizedStrings) }) }) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: formatNoteTypeTooltip(noteType, localizedStrings) }) })
    ] }) }),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        style: { zIndex: Z_INDEX_ABOVE_POPOVER },
        onCloseAutoFocus: (event) => {
          if (!choseNoteType.current) return;
          choseNoteType.current = false;
          event.preventDefault();
          focusUnlessSuppressed(focusNoteText);
        },
        children: [
          /* @__PURE__ */ jsx(DropdownMenuLabel, { children: localizedStrings["%footnoteEditor_noteTypeDropdown_label%"] }),
          /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
          /* @__PURE__ */ jsxs(
            DropdownMenuCheckboxItem,
            {
              disabled: noteType !== "x" && !isTypeSwitchable,
              checked: noteType === "x",
              onCheckedChange: () => chooseNoteType("x"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ jsx(SquareX, {}),
                /* @__PURE__ */ jsx("span", { children: localizedStrings["%footnoteEditor_noteType_crossReference_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            DropdownMenuCheckboxItem,
            {
              disabled: noteType === "x" && !isTypeSwitchable,
              checked: noteType === "f",
              onCheckedChange: () => chooseNoteType("f"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ jsx(FunctionSquare, {}),
                /* @__PURE__ */ jsx("span", { children: localizedStrings["%footnoteEditor_noteType_footnote_label%"] })
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            DropdownMenuCheckboxItem,
            {
              disabled: noteType === "x" && !isTypeSwitchable,
              checked: noteType === "fe",
              onCheckedChange: () => chooseNoteType("fe"),
              className: "tw:gap-2",
              children: [
                /* @__PURE__ */ jsx(SquareSigma, {}),
                /* @__PURE__ */ jsx("span", { children: localizedStrings["%footnoteEditor_noteType_endNote_label%"] })
              ]
            }
          )
        ]
      }
    )
  ] });
}
const OPEN_CONTEXT_MENU_ATTRIBUTE_SELECTOR = '[aria-controls="editor-context-menu"]';
function isEditorContextMenuOpenFor(editorRoot) {
  if (!editorRoot) return false;
  if (editorRoot.matches(OPEN_CONTEXT_MENU_ATTRIBUTE_SELECTOR)) return true;
  return !!editorRoot.querySelector(OPEN_CONTEXT_MENU_ATTRIBUTE_SELECTOR);
}
const MARKER_MENU_STRING_KEYS = Object.freeze([
  "%markerMenu_deprecated_label%",
  "%markerMenu_disallowed_label%",
  "%markerMenu_noResults%",
  "%markerMenu_searchPlaceholder%",
  // These four keys are not read by this component directly; they are provided here so callers
  // can localize them and pass the result into the optional `searchPlaceholder` prop to override
  // the default search-field placeholder.
  "%markerMenu_searchPlaceholder_character%",
  "%markerMenu_searchPlaceholder_insert%",
  "%markerMenu_searchPlaceholder_newParagraph%",
  "%markerMenu_searchPlaceholder_paragraph%"
]);
function MenuMarkerIcon({ icon, className }) {
  const IconComponent = icon ?? Ban;
  return /* @__PURE__ */ jsx(IconComponent, { className, size: 16 });
}
function MarkerSelectionStateIndicator({ state }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "marker-selection-state",
      className: "tw:flex tw:w-4 tw:min-w-4 tw:items-center tw:justify-center",
      children: state !== "none" && /* @__PURE__ */ jsx(Check, { size: 16 })
    }
  );
}
function getMarkerMenuItemValue(item) {
  var _a;
  return `item-${item.marker ?? ((_a = item.icon) == null ? void 0 : _a.displayName)}-${item.title.replaceAll(" ", "")}`;
}
function MarkerMenuCommandItem({
  item,
  localizedStrings
}) {
  return /* @__PURE__ */ jsxs(
    CommandItem,
    {
      className: "tw:flex tw:gap-2 tw:hover:bg-accent",
      disabled: item.isDisallowed || item.isDeprecated || item.isDisabled,
      "aria-checked": item.selectionState === void 0 ? void 0 : (
        // `as const` keeps the literal types ('mixed', true, false) instead of widening to
        // `string | boolean`, which is required for assignability to CommandItem's
        // `aria-checked` prop type (boolean | 'false' | 'true' | 'mixed' | undefined).
        { all: true, partial: "mixed", none: false }[item.selectionState]
      ),
      value: getMarkerMenuItemValue(item),
      onSelect: item.action,
      children: [
        item.selectionState !== void 0 && /* @__PURE__ */ jsx(MarkerSelectionStateIndicator, { state: item.selectionState }),
        /* @__PURE__ */ jsx("div", { className: "tw:w-8 tw:min-w-8", children: item.marker ? (
          // Monospace: a USFM marker is a code, not prose, and should read as one. Deliberately
          // inherits the row's own foreground rather than taking a marker-specific colour.
          /* @__PURE__ */ jsx("span", { className: "tw:font-mono tw:text-xs", children: item.marker })
        ) : /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(MenuMarkerIcon, { icon: item.icon }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2", children: [
          /* @__PURE__ */ jsx("p", { className: "tw:min-w-0 tw:shrink tw:truncate tw:text-sm", title: item.title, children: item.title }),
          item.subtitle && /* @__PURE__ */ jsx(
            "p",
            {
              className: "tw:min-w-0 tw:shrink-[9999] tw:truncate tw:text-end tw:text-xs tw:text-muted-foreground",
              title: item.subtitle,
              children: item.subtitle
            }
          )
        ] }),
        (item.isDisallowed || item.isDeprecated) && /* @__PURE__ */ jsx(CommandShortcut, { className: "tw:font-sans", children: item.isDisallowed ? localizedStrings["%markerMenu_disallowed_label%"] : localizedStrings["%markerMenu_deprecated_label%"] })
      ]
    }
  );
}
function MarkerMenu({
  localizedStrings,
  markerMenuItems,
  searchRef,
  searchPlaceholder,
  defaultHighlightedMarker
}) {
  const [commandSearch, setCommandSearch] = useState("");
  const [defaultHighlightedValue] = useState(() => {
    const item = markerMenuItems.find(
      (markerItem) => markerItem.marker === defaultHighlightedMarker && !markerItem.isDisallowed && !markerItem.isDeprecated && !markerItem.isDisabled
    );
    return item ? getMarkerMenuItemValue(item) : void 0;
  });
  const [codeMatchItems, titleMatchItems] = useMemo(() => {
    const query = stripMarkerNestingPrefix(commandSearch.trim().toLowerCase());
    if (!query) {
      const allowedItems = markerMenuItems.filter((markerItem) => !markerItem.isDisallowed);
      return [allowedItems.length > 0 ? allowedItems : markerMenuItems, []];
    }
    const filteredCodeMatchItems = markerMenuItems.filter((markerItem) => {
      var _a;
      const code = (_a = markerItem.marker) == null ? void 0 : _a.toLowerCase();
      return markerItem.isDisallowed ? code === query : code == null ? void 0 : code.includes(query);
    });
    const filteredTitleMatchItems = markerMenuItems.filter(
      (markerItem) => markerItem.title.toLowerCase().includes(query) && !filteredCodeMatchItems.includes(markerItem)
    );
    return [filteredCodeMatchItems, filteredTitleMatchItems];
  }, [commandSearch, markerMenuItems]);
  return /* @__PURE__ */ jsxs(Command, { className: "tw:p-1", shouldFilter: false, loop: true, defaultValue: defaultHighlightedValue, children: [
    /* @__PURE__ */ jsx(
      CommandInput,
      {
        className: "marker-menu-search",
        ref: searchRef,
        value: commandSearch,
        onValueChange: (value) => setCommandSearch(value),
        placeholder: searchPlaceholder ?? localizedStrings["%markerMenu_searchPlaceholder%"],
        spaceSelectsHighlightedItem: true
      }
    ),
    /* @__PURE__ */ jsxs(CommandList, { children: [
      /* @__PURE__ */ jsx(CommandEmpty, { children: localizedStrings["%markerMenu_noResults%"] }),
      /* @__PURE__ */ jsx(CommandGroup, { children: codeMatchItems.map((item) => /* @__PURE__ */ jsx(
        MarkerMenuCommandItem,
        {
          item,
          localizedStrings
        },
        getMarkerMenuItemValue(item)
      )) }),
      titleMatchItems.length > 0 && /* @__PURE__ */ jsxs(Fragment$1, { children: [
        codeMatchItems.length > 0 && /* @__PURE__ */ jsx(CommandSeparator, { alwaysRender: true }),
        /* @__PURE__ */ jsx(CommandGroup, { children: titleMatchItems.map((item) => /* @__PURE__ */ jsx(
          MarkerMenuCommandItem,
          {
            item,
            localizedStrings
          },
          getMarkerMenuItemValue(item)
        )) })
      ] })
    ] })
  ] });
}
function generateInlineMarkerMenuListItems(editorRef, closeMarkersMenu, localizedStrings, parentMarker, noteMarker) {
  if (!parentMarker || parentMarker === "p") return [];
  const caretMarkerDetails = usfmMarkers[parentMarker];
  const markerDetails = (caretMarkerDetails == null ? void 0 : caretMarkerDetails.children) ? caretMarkerDetails : noteMarker && usfmMarkers[noteMarker];
  if (!markerDetails || !markerDetails.children) return [];
  const markerMenuItems = [];
  Object.entries(markerDetails.children).forEach(([, markers]) => {
    markerMenuItems.push(
      ...markers.map((marker) => {
        return {
          marker,
          title: localizedStrings[usfmMarkers[marker].description] ?? usfmMarkers[marker].description,
          action: () => {
            var _a;
            (_a = editorRef.current) == null ? void 0 : _a.insertMarker(marker);
            closeMarkersMenu();
          }
        };
      })
    );
  });
  return markerMenuItems.sort((a, b) => (a.marker ?? a.title).localeCompare(b.marker ?? b.title));
}
function isUnclosedNoteOp(op) {
  if (!op || !isInsertEmbedOpOfType("note", op)) return false;
  const { note } = op.insert;
  return !!note && "closed" in note && note.closed === "false";
}
function getWholeNoteSelection(usj) {
  var _a;
  const wrapper = usj == null ? void 0 : usj.content[0];
  const note = typeof wrapper === "object" ? (_a = wrapper.content) == null ? void 0 : _a[0] : void 0;
  if (typeof note !== "object" || note.type !== "note" || !note.marker) return void 0;
  const jsonPath = "$.content[0].content[0]";
  return {
    start: { jsonPath },
    end: { jsonPath, closingMarkerOffset: `\\${note.marker}*`.length }
  };
}
function markerMenuItemToPaletteItem(item) {
  return {
    id: item.marker,
    label: item.marker,
    description: item.description,
    badge: item.kind === "closeTag" ? "%markerMenu_endTag_label%" : void 0,
    muted: !item.isBasic
  };
}
function deltaOpsLength(ops) {
  return ops.reduce(
    (length, op) => length + (typeof op.insert === "string" ? op.insert.length : 1),
    0
  );
}
function deltaOpsStartWith(ops, prefix) {
  let opIndex = 0;
  let opOffset = 0;
  return prefix.every((prefixOp) => {
    if (typeof prefixOp.insert !== "string") {
      const op = ops[opIndex];
      if (opOffset !== 0 || !op || !deepEqual(op, prefixOp)) return false;
      opIndex += 1;
      return true;
    }
    let remaining = prefixOp.insert;
    while (remaining.length > 0) {
      const op = ops[opIndex];
      if (!op || typeof op.insert !== "string" || !deepEqual(op.attributes, prefixOp.attributes))
        return false;
      const available = op.insert.slice(opOffset);
      const compared = Math.min(available.length, remaining.length);
      if (available.slice(0, compared) !== remaining.slice(0, compared)) return false;
      remaining = remaining.slice(compared);
      opOffset += compared;
      if (opOffset === op.insert.length) {
        opIndex += 1;
        opOffset = 0;
      }
    }
    return true;
  });
}
function footnoteToCrossReferenceOp(op) {
  var _a;
  const opCharAttribute = (_a = op.attributes) == null ? void 0 : _a.char;
  if (opCharAttribute == null ? void 0 : opCharAttribute.style) {
    if (opCharAttribute.style === "ft") {
      opCharAttribute.style = "xt";
    }
    if (opCharAttribute.style === "fr") {
      opCharAttribute.style = "xo";
    }
    if (opCharAttribute.style === "fq") {
      opCharAttribute.style = "xq";
    }
  }
}
function crossReferenceToFootnoteOp(op) {
  var _a;
  const opCharAttribute = (_a = op.attributes) == null ? void 0 : _a.char;
  if (opCharAttribute == null ? void 0 : opCharAttribute.style) {
    if (opCharAttribute.style === "xt") {
      opCharAttribute.style = "ft";
    }
    if (opCharAttribute.style === "xo") {
      opCharAttribute.style = "fr";
    }
    if (opCharAttribute.style === "xq") {
      opCharAttribute.style = "fq";
    }
  }
}
const INLINE_APPLY_DEBOUNCE_MS = 300;
const DEFAULT_CUSTOM_CALLER = "*";
const PARAGRAPH_USJ = {
  type: "USJ",
  version: "3.1",
  content: [
    {
      type: "para"
    }
  ]
};
function FootnoteEditor({
  classNameForEditor,
  noteOps,
  onChange,
  onClose,
  scrRef,
  noteKey,
  editorOptions,
  defaultMarkerMenuTrigger,
  localizedStrings,
  parentEditorRef,
  inline = false,
  ref,
  initialCaretPosition,
  markerPalette,
  onNoteEdit
}) {
  var _a;
  const editorRef = useRef(null);
  const editorParentRef = useRef(null);
  const containerRef = useRef(null);
  const noteKeyRef = useRef(noteKey);
  useEffect(() => {
    noteKeyRef.current = noteKey;
  }, [noteKey]);
  const initialCaretPositionRef = useRef(initialCaretPosition);
  useEffect(() => {
    initialCaretPositionRef.current = initialCaretPosition;
  }, [initialCaretPosition]);
  const placeInitialCaret = useCallback(() => {
    var _a2, _b;
    const caretPosition = initialCaretPositionRef.current;
    if (caretPosition !== void 0 && caretPosition !== "end")
      (_a2 = editorRef.current) == null ? void 0 : _a2.selectNoteTextOffset(0, caretPosition.utf16Offset, {
        field: caretPosition.field,
        glyph: caretPosition.glyph
      });
    else (_b = editorRef.current) == null ? void 0 : _b.selectNote(0);
  }, []);
  useLayoutEffect(() => {
    if (inline) return;
    if (!containerRef.current) return;
    const width = parseFloat(getComputedStyle(containerRef.current).width);
    if (width > 0) containerRef.current.style.width = `${width}px`;
  }, [inline]);
  const [callerType, setCallerType] = useState("generated");
  const [originalCallerType, setOriginalCallerType] = useState("generated");
  const [customCaller, setCustomCaller] = useState(DEFAULT_CUSTOM_CALLER);
  const [originalCustomCaller, setOriginalCustomCaller] = useState(DEFAULT_CUSTOM_CALLER);
  const [noteType, setNoteType] = useState("f");
  const [isTypeSwitchable, setIsTypeSwitchable] = useState(false);
  const [isAtInitialState, setIsAtInitialState] = useState(true);
  const [canRedo, setCanRedo] = useState(false);
  const hasInitializedEditor = useRef(false);
  const initialNoteOpsJson = useRef("");
  const hasUserEditsRef = useRef(false);
  const lastAppliedNoteOpRef = useRef(void 0);
  const carriedTextRef = useRef([]);
  const appliedCarriedTextRef = useRef([]);
  const undoneCarryRef = useRef(void 0);
  const lastNoteOpRef = useRef(void 0);
  const takeTextAfterNote = useCallback(() => {
    var _a2;
    const taken = (_a2 = editorRef.current) == null ? void 0 : _a2.takeOpsAfterNote(0);
    if (!(taken == null ? void 0 : taken.length)) return;
    carriedTextRef.current = [...carriedTextRef.current, ...taken];
    undoneCarryRef.current = void 0;
  }, []);
  const followCarriedTextThroughHistory = useCallback(
    (previousNoteOp, noteOp) => {
      var _a2, _b;
      if (!previousNoteOp) return;
      const wasOpen = isUnclosedNoteOp(previousNoteOp);
      const isOpen = isUnclosedNoteOp(noteOp);
      if (!wasOpen && isOpen) {
        undoneCarryRef.current = {
          text: carriedTextRef.current,
          closedNoteOp: previousNoteOp,
          openNoteOp: noteOp
        };
        carriedTextRef.current = [];
        return;
      }
      const undone = undoneCarryRef.current;
      if (!undone) return;
      if (wasOpen && !isOpen && deepEqual(previousNoteOp, undone.openNoteOp) && deepEqual(noteOp, undone.closedNoteOp) && !((_b = (_a2 = editorRef.current) == null ? void 0 : _a2.getOpsAfterNote(0)) == null ? void 0 : _b.length)) {
        carriedTextRef.current = undone.text;
        undoneCarryRef.current = void 0;
      } else if (!deepEqual(noteOp, undone.openNoteOp)) undoneCarryRef.current = void 0;
    },
    []
  );
  const [showMarkersMenu, setShowMarkersMenu] = useState(false);
  const markersMenuAnchor = useLivePopoverAnchor();
  const [contextMarker, setContextMarker] = useState();
  const markerMenuSearchRef = useRef(null);
  const paletteSession = useRef(
    void 0
  );
  const paletteSessionCounter = useRef(0);
  const markerPaletteRef = useRef(markerPalette);
  useEffect(() => {
    markerPaletteRef.current = markerPalette;
  }, [markerPalette]);
  useEffect(
    () => () => {
      var _a2;
      if (!paletteSession.current) return;
      paletteSession.current = void 0;
      (_a2 = markerPaletteRef.current) == null ? void 0 : _a2.dismiss();
    },
    []
  );
  const lastFocusOutSelectionRef = useRef(void 0);
  const paletteBaselineSnapshotRef = useRef(void 0);
  const hasEditorChangedSinceFocus = useCallback(
    () => hasEditorChanged(
      paletteBaselineSnapshotRef.current,
      captureEditorContentSnapshot(
        () => {
          var _a2;
          return (_a2 = editorRef.current) == null ? void 0 : _a2.getUsj();
        },
        () => {
          var _a2;
          return (_a2 = editorRef.current) == null ? void 0 : _a2.getSelection();
        }
      )
    ),
    []
  );
  const { setSession: setPaletteSession, clearSessionIfCurrent: clearPaletteSession } = useMarkerPaletteSessionWriters({
    sessionRef: paletteSession,
    editorRef,
    baselineRef: paletteBaselineSnapshotRef
  });
  const restoreSelectionIfLost = useCallback(() => {
    var _a2, _b, _c, _d;
    if (((_a2 = editorRef.current) == null ? void 0 : _a2.getSelection()) || ((_b = editorRef.current) == null ? void 0 : _b.getSelectedParaMarker())) return;
    const lastFocusOutSelection = lastFocusOutSelectionRef.current;
    if (lastFocusOutSelection) (_c = editorRef.current) == null ? void 0 : _c.setSelection(lastFocusOutSelection);
    else (_d = editorRef.current) == null ? void 0 : _d.selectNote(0);
  }, []);
  const focusNoteText = useCallback(() => {
    var _a2;
    restoreSelectionIfLost();
    (_a2 = editorRef.current) == null ? void 0 : _a2.focus();
  }, [restoreSelectionIfLost]);
  const options = useMemo(
    () => ({
      ...editorOptions,
      // Drop any inherited context-menu extras (e.g. the main editor's "Insert footnote" /
      // "Insert cross-reference" / "Insert comment" items). Those items' onSelect closures are
      // bound to the OUTER main-document editorRef, so surfacing them inside this popover would
      // let a right-click here silently mutate the main document. The popover keeps only the
      // built-in Cut/Copy/Paste context-menu items.
      contextMenu: void 0,
      markerMenuTrigger: defaultMarkerMenuTrigger,
      hasExternalUI: true,
      view: {
        ...editorOptions.view ?? getDefaultViewOptions(),
        noteMode: "expanded",
        // The note's marker and caller are governed by this popover's two dropdowns, so they are
        // not text to type into — the same division Paratext 9 draws. Left editable they read as
        // editable and are not: the edit does not persist, and because the note-scoped rebuild
        // refuses a caller it cannot recognize, anything else typed into that slot goes with it
        // (a `\cat` category run typed after the caller was silently discarded). Atomic here
        // routes that typing to the note's CONTENT, which is where it belongs and where the
        // category folds from.
        isNoteShellEditable: false,
        // The wrapper paragraph is scaffolding (see PARAGRAPH_USJ above): suppress its `\p`
        // marker prefix so the popover's text starts with the footnote's own first glyph.
        showParaMarkerPrefixes: false
      }
    }),
    [editorOptions, defaultMarkerMenuTrigger]
  );
  const inlineMarkerMenuItems = useMemo(
    () => generateInlineMarkerMenuListItems(
      editorRef,
      () => setShowMarkersMenu(false),
      localizedStrings,
      contextMarker,
      noteType
    ),
    [localizedStrings, contextMarker, noteType]
  );
  useEffect(() => {
    var _a2;
    if (!showMarkersMenu) (_a2 = editorRef.current) == null ? void 0 : _a2.focus();
  }, [noteType, showMarkersMenu]);
  const isDomCaretInsideNote = useCallback(() => {
    var _a2, _b, _c;
    const editorInput = (_a2 = editorParentRef.current) == null ? void 0 : _a2.querySelector(".editor-input");
    const noteElement = editorInput == null ? void 0 : editorInput.querySelector("span.note");
    const anchorNode = (_c = (_b = editorParentRef.current) == null ? void 0 : _b.ownerDocument.getSelection()) == null ? void 0 : _c.anchorNode;
    return !!noteElement && !!anchorNode && noteElement.contains(anchorNode);
  }, []);
  const saveCurrentNoteOp = useCallback(
    (applyToParent = false) => {
      var _a2, _b, _c, _d, _e;
      onNoteEdit == null ? void 0 : onNoteEdit();
      const currentNoteOp = (_b = (_a2 = editorRef.current) == null ? void 0 : _a2.getNoteOps(0)) == null ? void 0 : _b.at(0);
      if (currentNoteOp && isInsertEmbedOpOfType("note", currentNoteOp)) {
        onChange == null ? void 0 : onChange([currentNoteOp]);
        if (applyToParent && parentEditorRef && noteKeyRef.current) {
          const carriedText = [
            ...carriedTextRef.current,
            ...((_c = editorRef.current) == null ? void 0 : _c.getOpsAfterNote(0)) ?? []
          ];
          const appliedCarriedText = appliedCarriedTextRef.current;
          const isCarriedTextChanged = !deepEqual(carriedText, appliedCarriedText);
          if (inline && !isCarriedTextChanged && deepEqual(currentNoteOp, lastAppliedNoteOpRef.current))
            return;
          lastAppliedNoteOpRef.current = currentNoteOp;
          const replaceOps = [currentNoteOp];
          if (isCarriedTextChanged) {
            const isAppliedTextInPlace = appliedCarriedText.length > 0 && deltaOpsStartWith(
              ((_d = parentEditorRef.current) == null ? void 0 : _d.getOpsAfterNote(noteKeyRef.current)) ?? [],
              appliedCarriedText
            );
            if (isAppliedTextInPlace)
              replaceOps.push({ delete: deltaOpsLength(appliedCarriedText) });
            replaceOps.push(...carriedText);
            appliedCarriedTextRef.current = carriedText;
          }
          (_e = parentEditorRef.current) == null ? void 0 : _e.replaceEmbedUpdate(noteKeyRef.current, replaceOps);
        }
      }
    },
    [inline, onChange, onNoteEdit, parentEditorRef]
  );
  const replaceNoteKeepingCaret = useCallback(
    (noteOp) => {
      var _a2, _b, _c;
      const selectionBeforeChange = (_a2 = editorRef.current) == null ? void 0 : _a2.getSelection();
      (_b = editorRef.current) == null ? void 0 : _b.applyUpdate([noteOp, { delete: 1 }]);
      if (selectionBeforeChange) (_c = editorRef.current) == null ? void 0 : _c.setSelection(selectionBeforeChange);
      focusNoteText();
    },
    [focusNoteText]
  );
  const applyCallerToEditor = useCallback(
    (resolvedCallerType, resolvedCustomCaller) => {
      var _a2, _b, _c;
      if (!paletteSession.current) (_a2 = editorRef.current) == null ? void 0 : _a2.commitPendingMarkerEdits();
      const currentNoteOp = (_c = (_b = editorRef.current) == null ? void 0 : _b.getNoteOps(0)) == null ? void 0 : _c.at(0);
      if (!currentNoteOp || !isInsertEmbedOpOfType("note", currentNoteOp)) return;
      if (!currentNoteOp.insert.note) return;
      let caller;
      if (resolvedCallerType === "custom") {
        caller = resolvedCustomCaller;
      } else if (resolvedCallerType === "generated") {
        caller = GENERATOR_NOTE_CALLER;
      } else {
        caller = HIDDEN_NOTE_CALLER;
      }
      if (currentNoteOp.insert.note.caller === caller) return;
      currentNoteOp.insert.note.caller = caller;
      replaceNoteKeepingCaret(currentNoteOp);
    },
    [replaceNoteKeepingCaret]
  );
  const pendingApplyTimeoutRef = useRef(void 0);
  const saveCurrentNoteOpRef = useRef(saveCurrentNoteOp);
  useEffect(() => {
    saveCurrentNoteOpRef.current = saveCurrentNoteOp;
  }, [saveCurrentNoteOp]);
  const cancelPendingApply = useCallback(() => {
    if (pendingApplyTimeoutRef.current === void 0) return;
    clearTimeout(pendingApplyTimeoutRef.current);
    pendingApplyTimeoutRef.current = void 0;
  }, []);
  const flushPendingApply = useCallback(() => {
    if (pendingApplyTimeoutRef.current === void 0) return;
    cancelPendingApply();
    saveCurrentNoteOpRef.current(true);
  }, [cancelPendingApply]);
  const schedulePendingApply = useCallback(() => {
    cancelPendingApply();
    pendingApplyTimeoutRef.current = setTimeout(() => {
      pendingApplyTimeoutRef.current = void 0;
      saveCurrentNoteOpRef.current(true);
    }, INLINE_APPLY_DEBOUNCE_MS);
  }, [cancelPendingApply]);
  useEffect(() => {
    var _a2, _b;
    let timeout;
    let reassertFrame;
    let reassertTimeout;
    hasInitializedEditor.current = false;
    hasUserEditsRef.current = false;
    lastFocusOutSelectionRef.current = void 0;
    setIsAtInitialState(true);
    const noteOp = noteOps == null ? void 0 : noteOps.at(0);
    lastAppliedNoteOpRef.current = noteOp;
    carriedTextRef.current = [];
    appliedCarriedTextRef.current = [];
    undoneCarryRef.current = void 0;
    lastNoteOpRef.current = void 0;
    if (noteOp && isInsertEmbedOpOfType("note", noteOp)) {
      const rawCaller = (_a2 = noteOp.insert.note) == null ? void 0 : _a2.caller;
      let parsedCallerType = "custom";
      if (rawCaller === GENERATOR_NOTE_CALLER) {
        parsedCallerType = "generated";
      } else if (rawCaller === HIDDEN_NOTE_CALLER) {
        parsedCallerType = "hidden";
      }
      const loadedCustomCaller = parsedCallerType === "custom" && rawCaller !== void 0 ? rawCaller : DEFAULT_CUSTOM_CALLER;
      setCustomCaller(loadedCustomCaller);
      setOriginalCustomCaller(loadedCustomCaller);
      setCallerType(parsedCallerType);
      setOriginalCallerType(parsedCallerType);
      setNoteType(((_b = noteOp.insert.note) == null ? void 0 : _b.style) ?? "f");
      timeout = setTimeout(() => {
        var _a3, _b2, _c, _d;
        const loadedNoteOp = (_b2 = (_a3 = editorRef.current) == null ? void 0 : _a3.getNoteOps(0)) == null ? void 0 : _b2.at(0);
        (_c = editorRef.current) == null ? void 0 : _c.applyUpdate(loadedNoteOp ? [noteOp, { delete: 1 }] : [noteOp]);
        placeInitialCaret();
        (_d = editorRef.current) == null ? void 0 : _d.focus();
        reassertFrame = requestAnimationFrame(() => {
          reassertTimeout = setTimeout(() => {
            var _a4;
            if (isDomCaretInsideNote()) return;
            placeInitialCaret();
            (_a4 = editorRef.current) == null ? void 0 : _a4.focus();
          }, 0);
        });
      }, 0);
    }
    return () => {
      flushPendingApply();
      initialCaretPositionRef.current = void 0;
      if (timeout) {
        clearTimeout(timeout);
      }
      if (reassertFrame !== void 0) cancelAnimationFrame(reassertFrame);
      if (reassertTimeout !== void 0) clearTimeout(reassertTimeout);
    };
  }, [noteOps, flushPendingApply, isDomCaretInsideNote, placeInitialCaret]);
  useLayoutEffect(() => {
    return () => flushPendingApply();
  }, [flushPendingApply]);
  const flushPendingEdits = useCallback(() => {
    var _a2;
    if (!hasUserEditsRef.current) return;
    if (!paletteSession.current) (_a2 = editorRef.current) == null ? void 0 : _a2.commitPendingMarkerEdits();
    flushPendingApply();
  }, [flushPendingApply]);
  useImperativeHandle(
    ref,
    () => ({
      flushPendingEdits,
      focus: () => {
        var _a2;
        return (_a2 = editorRef.current) == null ? void 0 : _a2.focus();
      },
      containsFocus: () => {
        const container = containerRef.current;
        return !!container && container.contains(container.ownerDocument.activeElement);
      }
    }),
    [flushPendingEdits]
  );
  const closeAndSave = useCallback(() => {
    var _a2, _b;
    if (!paletteSession.current) {
      const editorInput = (_a2 = editorParentRef.current) == null ? void 0 : _a2.querySelector(".editor-input");
      if (editorInput == null ? void 0 : editorInput.contains(editorInput.ownerDocument.activeElement)) editorInput.blur();
      (_b = editorRef.current) == null ? void 0 : _b.commitPendingMarkerEdits();
    }
    if (inline) {
      flushPendingApply();
    } else {
      cancelPendingApply();
      saveCurrentNoteOp(true);
    }
    onClose();
  }, [cancelPendingApply, flushPendingApply, inline, onClose, saveCurrentNoteOp]);
  const closeAndSaveRef = useRef(closeAndSave);
  useLayoutEffect(() => {
    closeAndSaveRef.current = closeAndSave;
  });
  const prevScrRefBookChapter = useRef({ book: scrRef.book, chapterNum: scrRef.chapterNum });
  useLayoutEffect(() => {
    if (prevScrRefBookChapter.current.book !== scrRef.book || prevScrRefBookChapter.current.chapterNum !== scrRef.chapterNum) {
      prevScrRefBookChapter.current = { book: scrRef.book, chapterNum: scrRef.chapterNum };
      closeAndSaveRef.current();
    }
  }, [scrRef.book, scrRef.chapterNum]);
  const handleCopy = () => {
    var _a2;
    const editor = editorRef.current;
    const wholeNote = getWholeNoteSelection(editor == null ? void 0 : editor.getUsj());
    if (!editor || !wholeNote) return;
    const ownerDocument = ((_a2 = editorParentRef.current) == null ? void 0 : _a2.ownerDocument) ?? document;
    const { activeElement: focusedBefore } = ownerDocument;
    const selectionBefore = editor.getSelection() ?? lastFocusOutSelectionRef.current;
    editor.setSelection(wholeNote);
    try {
      editor.copy();
    } finally {
      if (selectionBefore) editor.setSelection(selectionBefore);
      else editor.selectNote(0);
      editor.getSelection();
      if (ownerDocument.activeElement !== focusedBefore) {
        if (focusedBefore instanceof HTMLElement && focusedBefore !== ownerDocument.body)
          focusedBefore.focus({ preventScroll: true });
        else if (ownerDocument.activeElement instanceof HTMLElement)
          ownerDocument.activeElement.blur();
      }
    }
  };
  const handleCallerChange = useCallback(
    (newCallerType, newCustomCaller) => {
      onNoteEdit == null ? void 0 : onNoteEdit();
      setCallerType(newCallerType);
      setCustomCaller(newCustomCaller);
      applyCallerToEditor(newCallerType, newCustomCaller);
      if (inline) flushPendingApply();
    },
    [applyCallerToEditor, flushPendingApply, inline, onNoteEdit]
  );
  const handleNoteTypeChange = (value) => {
    var _a2, _b, _c, _d, _e;
    setNoteType(value);
    if (!paletteSession.current) (_a2 = editorRef.current) == null ? void 0 : _a2.commitPendingMarkerEdits();
    const currentNoteOp = (_c = (_b = editorRef.current) == null ? void 0 : _b.getNoteOps(0)) == null ? void 0 : _c.at(0);
    if (currentNoteOp && isInsertEmbedOpOfType("note", currentNoteOp)) {
      if (currentNoteOp.insert.note) currentNoteOp.insert.note.style = value;
      const innerNoteOps = (_e = (_d = currentNoteOp.insert.note) == null ? void 0 : _d.contents) == null ? void 0 : _e.ops;
      if (noteType !== "x" && value === "x") {
        innerNoteOps == null ? void 0 : innerNoteOps.forEach((op) => footnoteToCrossReferenceOp(op));
      } else if (noteType === "x" && value !== "x") {
        innerNoteOps == null ? void 0 : innerNoteOps.forEach((op) => crossReferenceToFootnoteOp(op));
      }
      replaceNoteKeepingCaret(currentNoteOp);
      if (inline) flushPendingApply();
    }
  };
  const handleStateChange = (state) => {
    setContextMarker(state.contextMarker);
    setCanRedo(state.canRedo);
  };
  const handleUsjChange = useCallback(
    (usj) => {
      var _a2, _b, _c, _d, _e, _f, _g;
      const noteOp = (_b = (_a2 = editorRef.current) == null ? void 0 : _a2.getNoteOps(0)) == null ? void 0 : _b.at(0);
      if (noteOp && isInsertEmbedOpOfType("note", noteOp)) {
        if (usj.content.length > 1) {
          setTimeout(() => {
            var _a3;
            (_a3 = editorRef.current) == null ? void 0 : _a3.applyUpdate([{ retain: 2 }, { delete: 1 }]);
          }, 0);
        }
        const currentNoteType = (_c = noteOp.insert.note) == null ? void 0 : _c.style;
        const innerNoteOps = (_e = (_d = noteOp.insert.note) == null ? void 0 : _d.contents) == null ? void 0 : _e.ops;
        if (!currentNoteType) setIsTypeSwitchable(false);
        if (currentNoteType === "x") {
          setIsTypeSwitchable(
            !!(innerNoteOps == null ? void 0 : innerNoteOps.every((op) => {
              var _a3, _b2;
              if (!((_a3 = op.attributes) == null ? void 0 : _a3.char)) return true;
              const nodeType = ((_b2 = op.attributes) == null ? void 0 : _b2.char).style;
              return nodeType === "xt" || nodeType === "xo" || nodeType === "xq";
            }))
          );
        } else {
          setIsTypeSwitchable(
            !!(innerNoteOps == null ? void 0 : innerNoteOps.every((op) => {
              var _a3, _b2;
              if (!((_a3 = op.attributes) == null ? void 0 : _a3.char)) return true;
              const nodeType = ((_b2 = op.attributes) == null ? void 0 : _b2.char).style;
              return nodeType === "ft" || nodeType === "fr" || nodeType === "fq";
            }))
          );
        }
        if (!hasInitializedEditor.current) {
          hasInitializedEditor.current = true;
          initialNoteOpsJson.current = JSON.stringify(noteOp);
          lastNoteOpRef.current = noteOp;
          setIsAtInitialState(true);
          return;
        }
        hasUserEditsRef.current = true;
        followCarriedTextThroughHistory(lastNoteOpRef.current, noteOp);
        lastNoteOpRef.current = noteOp;
        if ((_g = (_f = editorRef.current) == null ? void 0 : _f.getOpsAfterNote(0)) == null ? void 0 : _g.length) setTimeout(takeTextAfterNote, 0);
        setIsAtInitialState(JSON.stringify(noteOp) === initialNoteOpsJson.current);
        saveCurrentNoteOp();
        if (inline) schedulePendingApply();
      } else {
        setIsTypeSwitchable(false);
        setIsAtInitialState(true);
      }
    },
    [
      inline,
      saveCurrentNoteOp,
      schedulePendingApply,
      followCarriedTextThroughHistory,
      takeTextAfterNote
    ]
  );
  const showInlineMarkersMenu = useCallback(() => {
    const currentSelection = window.getSelection();
    if (!inlineMarkerMenuItems.length || !currentSelection || currentSelection.rangeCount === 0)
      return;
    const contextElement = editorParentRef.current;
    if (!contextElement) return;
    const range = currentSelection.getRangeAt(0).cloneRange();
    markersMenuAnchor.setSource({
      measure: () => {
        const rect = measureBox(range);
        return rect && leftEdgeRect(rect);
      },
      contextElement
    });
    setShowMarkersMenu(true);
  }, [inlineMarkerMenuItems, markersMenuAnchor]);
  const runPaletteSessionKeyRef = useRef(() => {
  });
  const openMarkerPalette = useCallback(
    (ctx, items, openOptions) => {
      const { anchorRect } = ctx;
      if (!markerPalette || !anchorRect) return;
      const { hasTextSelection } = openOptions;
      runMarkerPaletteSession({
        items,
        // The kind decides how a commit APPLIES — wrap the selected text, or land at the caret.
        // It decides nothing about focus: every marker palette focuses its list.
        kind: hasTextSelection ? "selection" : "backslash",
        // The Space note rule: when the typed filter names a NOTE marker in the stylesheet, Space
        // commits that marker if this list OFFERS it and inserts NOTHING if it does not. This
        // popover's list offers note-INTERNAL markers only, so a typed `\f` always takes the second
        // branch — which is the point of the rule here: materializing it would make a NESTED `\f `
        // literal, and the Tier-2 tokenizer would absorb the following word into it as a caller
        // just as it does in body text. Decided from the stylesheet rather than from the offered
        // items for exactly that reason.
        // Same stylesheet the items come from: while the data provider is loading, or after it
        // errors, `styleInfo` is undefined and the list is built from the default, so reading the
        // raw value here would turn the rule off exactly when it is needed.
        isNoteMarker: (marker) => isNoteMarker(options.styleInfo ?? defaultStyleInfo, marker),
        sessionCounterRef: paletteSessionCounter,
        setSession: setPaletteSession,
        clearSessionIfCurrent: clearPaletteSession,
        // Through the ref so the palette always runs the CURRENT handler — the callback is
        // captured once, at show time, while the session it drives is replaced on every reopen.
        runSessionKey: (event) => runPaletteSessionKeyRef.current(event),
        show: (keyForwarding) => markerPalette.show({
          items: items.map(markerMenuItemToPaletteItem),
          anchor: anchorRect,
          keyForwarding
        }),
        // What a lost selection costs on this path specifically: the apply lands the marker as an
        // invalid trailing span after the note's closing marker while the typed literal strands at
        // the real caret (live-observed: a red `\fq` after `\f*`).
        restoreSelectionIfLost,
        hasEditorChangedSinceFocus,
        focusEditor: () => {
          var _a2;
          return (_a2 = editorRef.current) == null ? void 0 : _a2.focus();
        },
        applyItem: (selected) => {
          var _a2;
          return (_a2 = editorRef.current) == null ? void 0 : _a2.applyMarkerMenuSelection(selected, {
            trigger: "backslash",
            // ACTIVE palette: the trigger was claimed and never landed, so there is never a
            // literal prefix for the apply to clean up.
            literalPrefixLanded: false
          });
        },
        onShowError: (error) => {
          if (!isPlatformError(error) || error.code !== ABORTED)
            console.warn(
              `FootnoteEditor: the marker palette did not open: ${getErrorMessage(error)}`
            );
        }
      });
    },
    [
      markerPalette,
      restoreSelectionIfLost,
      hasEditorChangedSinceFocus,
      options.styleInfo,
      setPaletteSession,
      clearPaletteSession
    ]
  );
  const openMarkerPaletteAtCaret = useCallback(() => {
    var _a2;
    const ctx = (_a2 = editorRef.current) == null ? void 0 : _a2.getMarkerMenuContext();
    if (!ctx) return false;
    const items = getMarkerMenuItems(options.styleInfo ?? defaultStyleInfo, ctx);
    if (items.length === 0) return false;
    openMarkerPalette(ctx, items, { hasTextSelection: !!ctx.hasTextSelection });
    return true;
  }, [openMarkerPalette, options.styleInfo]);
  useMarkerPaletteCompositionClose({
    isSessionOpen: useCallback(() => !!paletteSession.current, []),
    dismiss: useCallback(() => markerPalette == null ? void 0 : markerPalette.dismiss(), [markerPalette])
  });
  const runPaletteSessionKey = useCallback(
    (event) => {
      if (!markerPalette) return;
      const routed = routeMarkerPaletteKey(event, {
        sessionRef: paletteSession,
        editorRef,
        palette: markerPalette,
        restoreCaret: restoreSelectionIfLost,
        reopenAtCaret: openMarkerPaletteAtCaret,
        clearSessionIfCurrent: clearPaletteSession,
        hasEditorChangedSinceFocus
      });
      if (routed === "no-session") markerPalette.dismiss();
    },
    [
      markerPalette,
      openMarkerPaletteAtCaret,
      restoreSelectionIfLost,
      clearPaletteSession,
      hasEditorChangedSinceFocus
    ]
  );
  useEffect(() => {
    runPaletteSessionKeyRef.current = runPaletteSessionKey;
  }, [runPaletteSessionKey]);
  useMarkerPaletteFocusOutCapture({
    containerRef: editorParentRef,
    editorRef,
    selectionRef: lastFocusOutSelectionRef,
    baselineRef: paletteBaselineSnapshotRef,
    isSessionOpen: useCallback(() => !!paletteSession.current, [])
  });
  useEffect(() => {
    const clickListener = () => {
      if (showMarkersMenu) setShowMarkersMenu(false);
    };
    window.addEventListener("click", clickListener);
    window.addEventListener("blur", clickListener);
    return () => {
      window.removeEventListener("click", clickListener);
      window.removeEventListener("blur", clickListener);
    };
  }, [showMarkersMenu]);
  useEffect(() => {
    var _a2;
    if (showMarkersMenu) {
      (_a2 = markerMenuSearchRef.current) == null ? void 0 : _a2.focus();
    }
  }, [showMarkersMenu]);
  useEffect(() => {
    var _a2;
    const getEditorInput = () => {
      var _a3;
      return ((_a3 = editorParentRef.current) == null ? void 0 : _a3.querySelector(".editor-input")) ?? void 0;
    };
    if (((_a2 = options.view) == null ? void 0 : _a2.markerMode) === "editable") {
      const handleKeyDown2 = (event) => {
        var _a3, _b, _c, _d;
        if (isImeCompositionKeyEvent(event)) return;
        const session = paletteSession.current;
        const editorInput = getEditorInput();
        if (!editorInput || document.activeElement !== editorInput) return;
        if (session && markerPalette) {
          runPaletteSessionKeyRef.current(event);
          return;
        }
        if (isEditorContextMenuOpenFor(editorParentRef.current)) {
          if (event.key === defaultMarkerMenuTrigger) {
            event.preventDefault();
            event.stopPropagation();
          }
          return;
        }
        if (event.key === "Enter" && !isDomCaretInsideNote()) {
          event.preventDefault();
          event.stopPropagation();
          (_a3 = editorRef.current) == null ? void 0 : _a3.selectNote(0);
          (_b = editorRef.current) == null ? void 0 : _b.focus();
          return;
        }
        if (!markerPalette) return;
        if (event.key !== defaultMarkerMenuTrigger) return;
        if (!isDomCaretInsideNote()) {
          event.preventDefault();
          event.stopPropagation();
          (_c = editorRef.current) == null ? void 0 : _c.selectNote(0);
          (_d = editorRef.current) == null ? void 0 : _d.focus();
          return;
        }
        if (openMarkerPaletteAtCaret()) {
          event.preventDefault();
          event.stopPropagation();
        }
      };
      const handlePaste = () => {
        var _a3, _b;
        const editorInput = getEditorInput();
        if (!editorInput || document.activeElement !== editorInput) return;
        if (isDomCaretInsideNote()) return;
        (_a3 = editorRef.current) == null ? void 0 : _a3.selectNote(0);
        (_b = editorRef.current) == null ? void 0 : _b.focus();
      };
      document.addEventListener("keydown", handleKeyDown2, { capture: true });
      document.addEventListener("paste", handlePaste, { capture: true });
      return () => {
        document.removeEventListener("keydown", handleKeyDown2, { capture: true });
        document.removeEventListener("paste", handlePaste, { capture: true });
      };
    }
    const isEditorFocusedWithoutMenu = () => {
      const editorInput = getEditorInput();
      if (!editorInput || document.activeElement !== editorInput) return false;
      return !isEditorContextMenuOpenFor(editorParentRef.current);
    };
    const swallowEnter = (event) => {
      if (event.key !== "Enter" || isImeCompositionKeyEvent(event)) return;
      if (!isEditorFocusedWithoutMenu()) return;
      event.preventDefault();
      event.stopPropagation();
    };
    const swallowParagraphInput = (event) => {
      if (event.inputType !== "insertParagraph" && event.inputType !== "insertLineBreak") return;
      if (!isEditorFocusedWithoutMenu()) return;
      event.preventDefault();
      event.stopPropagation();
    };
    const handleKeyDown = (event) => {
      const editorInput = getEditorInput();
      if (!showMarkersMenu && editorInput && document.activeElement === editorInput && event.key === defaultMarkerMenuTrigger) {
        event.preventDefault();
        showInlineMarkersMenu();
      } else if (showMarkersMenu && event.key === "Escape") {
        event.preventDefault();
        setShowMarkersMenu(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keydown", swallowEnter, { capture: true });
    document.addEventListener("beforeinput", swallowParagraphInput, { capture: true });
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keydown", swallowEnter, { capture: true });
      document.removeEventListener("beforeinput", swallowParagraphInput, { capture: true });
    };
  }, [
    showMarkersMenu,
    showInlineMarkersMenu,
    defaultMarkerMenuTrigger,
    (_a = options.view) == null ? void 0 : _a.markerMode,
    options.styleInfo,
    markerPalette,
    openMarkerPaletteAtCaret,
    isDomCaretInsideNote
  ]);
  useEffect(() => {
    const container = containerRef.current;
    if (!inline || !container) return void 0;
    const handleKeyDown = (event) => {
      if (event.key !== "Escape" || event.defaultPrevented || isImeCompositionKeyEvent(event))
        return;
      event.preventDefault();
      event.stopPropagation();
      closeAndSaveRef.current();
    };
    container.addEventListener("keydown", handleKeyDown);
    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [inline]);
  useEffect(() => {
    const snapStrayCaretIntoNote = () => {
      var _a2, _b, _c;
      const editorInput = ((_a2 = editorParentRef.current) == null ? void 0 : _a2.querySelector(".editor-input")) ?? void 0;
      if (!editorInput || document.activeElement !== editorInput) return;
      if (!document.hasFocus()) return;
      const domSelection = document.getSelection();
      if (domSelection && !domSelection.isCollapsed) return;
      if (isDomCaretInsideNote()) return;
      (_b = editorRef.current) == null ? void 0 : _b.selectNote(0);
      (_c = editorRef.current) == null ? void 0 : _c.focus();
    };
    document.addEventListener("pointerup", snapStrayCaretIntoNote);
    document.addEventListener("selectionchange", snapStrayCaretIntoNote);
    return () => {
      document.removeEventListener("pointerup", snapStrayCaretIntoNote);
      document.removeEventListener("selectionchange", snapStrayCaretIntoNote);
    };
  }, [isDomCaretInsideNote]);
  const copyButtonTooltip = localizedStrings["%footnoteEditor_copyButton_tooltip%"];
  const undoRedoButtons = /* @__PURE__ */ jsx(
    UndoRedoButtons,
    {
      onUndoClick: () => {
        var _a2;
        return (_a2 = editorRef.current) == null ? void 0 : _a2.undo();
      },
      onRedoClick: () => {
        var _a2;
        return (_a2 = editorRef.current) == null ? void 0 : _a2.redo();
      },
      canUndo: !isAtInitialState,
      canRedo,
      localizedStrings
    }
  );
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: containerRef,
        className: cn("footnote-editor tw:grid tw:max-w-full tw:gap-[12px]", inline && "tw:w-full"),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:flex-wrap tw:gap-y-2", children: [
            /* @__PURE__ */ jsxs("div", { className: cn("tw:flex tw:gap-4", inline && "tw:flex-wrap"), children: [
              /* @__PURE__ */ jsx(
                FootnoteTypeDropdown,
                {
                  isTypeSwitchable,
                  noteType,
                  handleNoteTypeChange,
                  localizedStrings,
                  focusNoteText
                }
              ),
              /* @__PURE__ */ jsx(
                FootnoteCallerDropdown,
                {
                  callerType,
                  customCaller,
                  updateCaller: handleCallerChange,
                  localizedStrings,
                  focusNoteText
                }
              ),
              inline && undoRedoButtons
            ] }),
            !inline && /* @__PURE__ */ jsx("div", { className: "tw:flex tw:flex-1 tw:justify-end", children: /* @__PURE__ */ jsxs(ButtonGroup, { children: [
              undoRedoButtons,
              /* @__PURE__ */ jsx(
                CancelAcceptButtons,
                {
                  onCancelClick: onClose,
                  onAcceptClick: closeAndSave,
                  canAccept: !isAtInitialState || originalCallerType !== callerType || callerType === "custom" && customCaller !== originalCustomCaller,
                  localizedStrings,
                  acceptLabel: localizedStrings["%footnoteEditor_saveButton_tooltip%"]
                }
              )
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              ref: editorParentRef,
              className: "tw:relative tw:rounded-[6px] tw:border-2 tw:border-ring",
              children: [
                /* @__PURE__ */ jsx("div", { className: classNameForEditor, children: /* @__PURE__ */ jsx(
                  EditorKeyboardShortcuts,
                  {
                    editorRef,
                    canUndo: !isAtInitialState,
                    canRedo,
                    children: /* @__PURE__ */ jsx(
                      Editorial,
                      {
                        options,
                        onStateChange: handleStateChange,
                        onUsjChange: handleUsjChange,
                        defaultUsj: PARAGRAPH_USJ,
                        onScrRefChange: () => {
                        },
                        scrRef,
                        ref: editorRef
                      }
                    )
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "tw:absolute tw:bottom-0 tw:end-0", children: /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
                  /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
                    Button,
                    {
                      "aria-label": copyButtonTooltip,
                      onClick: handleCopy,
                      className: "tw:h-6 tw:w-6",
                      variant: "ghost",
                      size: "icon",
                      children: /* @__PURE__ */ jsx(Copy, {})
                    }
                  ) }),
                  /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: copyButtonTooltip }) })
                ] }) }) })
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(Popover, { open: showMarkersMenu, children: [
      /* @__PURE__ */ jsx(PopoverAnchor, { virtualRef: markersMenuAnchor.virtualRef }),
      /* @__PURE__ */ jsx(
        PopoverContent,
        {
          className: "tw:w-[500px] tw:p-0",
          onClick: (event) => {
            event.preventDefault();
            event.stopPropagation();
          },
          children: /* @__PURE__ */ jsx(
            MarkerMenu,
            {
              markerMenuItems: inlineMarkerMenuItems,
              localizedStrings,
              searchRef: markerMenuSearchRef
            }
          )
        }
      )
    ] })
  ] });
}
const LUCIDE_ICON_COMPONENTS = {
  "refresh-cw": RefreshCw,
  download: Download,
  house: House,
  "book-a": BookA,
  settings: Settings,
  "circle-question-mark": CircleQuestionMark,
  "external-link": ExternalLink,
  users: Users,
  "book-copy": BookCopy,
  pencil: Pencil,
  eye: Eye,
  "zoom-in": ZoomIn,
  "zoom-out": ZoomOut,
  scan: Scan,
  "file-text": FileText,
  "panel-bottom": PanelBottom,
  "message-square-plus": MessageSquarePlus,
  "square-function": FunctionSquare,
  "square-x": SquareX,
  "square-sigma": SquareSigma,
  book: Book,
  "book-marked": BookMarked,
  "book-open": BookOpen,
  library: Library,
  search: Search,
  "message-square": MessageSquare,
  "circle-check-big": CircleCheckBig,
  "clipboard-check": ClipboardCheck,
  "clipboard-copy": ClipboardCopy,
  sparkles: Sparkles,
  "undo-2": Undo2,
  "redo-2": Redo2
};
const LUCIDE_ICONS_BY_NAME = LUCIDE_ICON_COMPONENTS;
const LUCIDE_ICON_NAMES = Object.keys(LUCIDE_ICONS_BY_NAME);
function isLucideIconName(name) {
  return name !== void 0 && Object.hasOwn(LUCIDE_ICONS_BY_NAME, name);
}
function collectOpenTabsByProject(openTabs) {
  const map = /* @__PURE__ */ new Map();
  openTabs.forEach((tab) => {
    const key = normalizeProjectId(tab.projectId);
    const existing = map.get(key);
    const info = {
      scrollGroupId: tab.scrollGroupId,
      scrollGroupScrRefLabel: tab.scrollGroupScrRefLabel
    };
    if (existing) {
      if (!existing.some((t) => t.scrollGroupId === tab.scrollGroupId)) existing.push(info);
    } else {
      map.set(key, [info]);
    }
  });
  map.forEach((infos) => infos.sort((a, b) => a.scrollGroupId - b.scrollGroupId));
  return map;
}
function pairIsSelected(pairs, projectId, scrollGroupId) {
  const normalizedId = normalizeProjectId(projectId);
  return pairs.some(
    (p) => normalizeProjectId(p.projectId) === normalizedId && p.scrollGroupId === scrollGroupId
  );
}
function computeRows(args) {
  const tabsByProject = collectOpenTabsByProject(args.openTabs);
  if (args.mode === "project") {
    const selectedKey = args.selection.projectId === void 0 ? void 0 : normalizeProjectId(args.selection.projectId);
    return args.projects.map((project) => {
      const tabs = tabsByProject.get(normalizeProjectId(project.id)) ?? [];
      return {
        rowKey: project.id,
        projectId: project.id,
        shortName: project.shortName,
        fullName: project.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: tabs.map((t) => t.scrollGroupId),
        isSelected: selectedKey !== void 0 && selectedKey === normalizeProjectId(project.id),
        isMuted: tabs.length === 0,
        isBoundButClosed: false,
        isDisabled: project.isDisabled === true,
        disabledReason: project.disabledReason,
        project
      };
    });
  }
  let selectedPairs = [];
  if (args.mode === "project-multi") {
    selectedPairs = args.selection.pairs;
  } else if (args.selection.projectId !== void 0) {
    selectedPairs = [
      {
        projectId: args.selection.projectId,
        scrollGroupId: args.selection.scrollGroupId
      }
    ];
  }
  const rows = [];
  args.projects.forEach((project) => {
    const tabs = tabsByProject.get(normalizeProjectId(project.id));
    if (!tabs || tabs.length === 0) {
      rows.push({
        rowKey: `project:${project.id}`,
        projectId: project.id,
        shortName: project.shortName,
        fullName: project.fullName,
        scrollGroupId: void 0,
        scrollGroupScrRefLabel: void 0,
        openGroups: [],
        isSelected: pairIsSelected(selectedPairs, project.id, void 0),
        isMuted: true,
        isBoundButClosed: false,
        isDisabled: project.isDisabled === true,
        disabledReason: project.disabledReason,
        project
      });
      return;
    }
    tabs.forEach((tab) => {
      rows.push({
        rowKey: `tab:${project.id}:${tab.scrollGroupId}`,
        projectId: project.id,
        shortName: project.shortName,
        fullName: project.fullName,
        scrollGroupId: tab.scrollGroupId,
        scrollGroupScrRefLabel: tab.scrollGroupScrRefLabel,
        openGroups: [],
        isSelected: pairIsSelected(selectedPairs, project.id, tab.scrollGroupId),
        isMuted: false,
        isBoundButClosed: false,
        isDisabled: project.isDisabled === true,
        disabledReason: project.disabledReason,
        project
      });
    });
  });
  selectedPairs.forEach((pair) => {
    if (pair.scrollGroupId === void 0) return;
    const normalizedPairId = normalizeProjectId(pair.projectId);
    if (rows.some(
      (r) => normalizeProjectId(r.projectId) === normalizedPairId && r.scrollGroupId === pair.scrollGroupId
    )) {
      return;
    }
    const project = args.projects.find((p) => normalizeProjectId(p.id) === normalizedPairId);
    if (!project) return;
    rows.push({
      rowKey: `closed:${project.id}:${pair.scrollGroupId}`,
      projectId: project.id,
      shortName: project.shortName,
      fullName: project.fullName,
      scrollGroupId: pair.scrollGroupId,
      scrollGroupScrRefLabel: void 0,
      openGroups: [],
      isSelected: true,
      isMuted: false,
      isBoundButClosed: true,
      isDisabled: project.isDisabled === true,
      disabledReason: project.disabledReason,
      project
    });
  });
  return rows;
}
const DEFAULT_SELECTED_SECTION_HEADING = "Selected";
const DEFAULT_UNSELECTED_SECTION_HEADING = "Unselected";
function belongsToOpenTabsSection(row) {
  if (row.isBoundButClosed) return false;
  if (row.scrollGroupId !== void 0) return true;
  return row.openGroups.length > 0;
}
function compareRows(a, b) {
  const nameCmp = compareProjectsByName(a, b);
  if (nameCmp !== 0) return nameCmp;
  const aGroup = a.scrollGroupId ?? Number.POSITIVE_INFINITY;
  const bGroup = b.scrollGroupId ?? Number.POSITIVE_INFINITY;
  return aGroup - bGroup;
}
function partitionFlat(rows) {
  return [{ kind: "flat", rows: [...rows].sort(compareRows) }];
}
function partitionByOpenTabs(rows) {
  const open = rows.filter(belongsToOpenTabsSection).sort(compareRows);
  const other = rows.filter((r) => !belongsToOpenTabsSection(r)).sort(compareRows);
  if (open.length === 0) {
    return [{ kind: "flat", rows: other }];
  }
  const sections = [{ kind: "openTabs", rows: open }];
  if (other.length > 0) sections.push({ kind: "other", rows: other });
  return sections;
}
function partitionBySelection(rows, grouping) {
  const selected = rows.filter((r) => r.isSelected).sort(compareRows);
  const unselected = rows.filter((r) => !r.isSelected).sort(compareRows);
  const headingFor = (key, bucket) => {
    var _a;
    const resolved = (_a = grouping.getSectionHeading) == null ? void 0 : _a.call(
      grouping,
      key,
      bucket.map((r) => r.project)
    );
    if (typeof resolved === "string" && resolved.length > 0) return resolved;
    return key === "selected" ? DEFAULT_SELECTED_SECTION_HEADING : DEFAULT_UNSELECTED_SECTION_HEADING;
  };
  const sections = [];
  if (selected.length > 0) {
    sections.push({
      kind: "grouping",
      groupingId: grouping.id,
      key: "selected",
      label: headingFor("selected", selected),
      rows: selected
    });
  }
  if (unselected.length > 0) {
    sections.push({
      kind: "grouping",
      groupingId: grouping.id,
      key: "unselected",
      label: headingFor("unselected", unselected),
      rows: unselected
    });
  }
  return sections;
}
function partitionByGrouping(rows, grouping) {
  if (grouping.id === "openTabs") return partitionByOpenTabs(rows);
  if (grouping.id === "selection") return partitionBySelection(rows, grouping);
  if (!grouping.getGroupKey) return partitionFlat(rows);
  const buckets = /* @__PURE__ */ new Map();
  const unknownRows = [];
  const { getGroupKey } = grouping;
  rows.forEach((row) => {
    const key = getGroupKey(row.project);
    if (key === void 0 || key === "") {
      unknownRows.push(row);
      return;
    }
    const existing = buckets.get(key);
    if (existing) existing.push(row);
    else buckets.set(key, [row]);
  });
  const entries = [...buckets.entries()].map(([key, groupRows]) => {
    var _a;
    const sortedRows = [...groupRows].sort(
      (a, b) => {
        var _a2;
        return ((_a2 = grouping.compareProjects) == null ? void 0 : _a2.call(grouping, a.project, b.project)) || compareRows(a, b);
      }
    );
    const heading = ((_a = grouping.getSectionHeading) == null ? void 0 : _a.call(
      grouping,
      key,
      sortedRows.map((r) => r.project)
    )) ?? key;
    return { key, heading, rows: sortedRows };
  });
  entries.sort((a, b) => {
    if (a.key === grouping.priorityKey) return -1;
    if (b.key === grouping.priorityKey) return 1;
    if (grouping.compareSections) {
      return grouping.compareSections(
        { key: a.key, heading: a.heading },
        { key: b.key, heading: b.heading }
      );
    }
    return a.heading.localeCompare(b.heading, void 0, { sensitivity: "base" });
  });
  const sections = entries.map(({ key, heading, rows: groupRows }) => ({
    kind: "grouping",
    groupingId: grouping.id,
    key,
    label: heading,
    rows: groupRows,
    isPriority: key === grouping.priorityKey
  }));
  if (unknownRows.length > 0 && grouping.unknownSectionHeading) {
    sections.push({
      kind: "grouping",
      groupingId: grouping.id,
      key: void 0,
      label: grouping.unknownSectionHeading,
      rows: [...unknownRows].sort(compareRows)
    });
  }
  return sections;
}
const PROJECT_SELECTOR_STRING_KEYS = [
  "%projectSelector_searchPlaceholder%",
  "%projectSelector_commandEmptyMessage%",
  "%projectSelector_groupByAriaLabel%",
  "%projectSelector_groupSectionLabel%",
  "%projectSelector_groupByNone%",
  "%projectSelector_openTabsSectionHeading%",
  "%projectSelector_otherProjectsSectionHeading%",
  "%projectSelector_boundButClosedTooltip%",
  "%projectSelector_openButtonLabel%",
  "%projectSelector_clearAll%",
  "%projectSelector_grouping_openTabs_label%",
  "%projectSelector_grouping_lastUsed_label%",
  "%projectSelector_grouping_lastUsed_recentSectionHeading%",
  "%projectSelector_grouping_lastUsed_otherSectionHeading%",
  "%projectSelector_grouping_language_label%",
  "%projectSelector_grouping_language_unknownSectionHeading%",
  "%projectSelector_grouping_type_label%",
  "%projectSelector_grouping_type_unknownSectionHeading%",
  "%projectSelector_grouping_selection_label%",
  "%projectSelector_grouping_selection_selectedSectionHeading%",
  "%projectSelector_grouping_selection_unselectedSectionHeading%"
];
function readProjectSelectorString(strings, key) {
  const value = strings[key];
  if (typeof value !== "string" || !isResolvedLocalizedValue(value)) return void 0;
  return value;
}
const RECENT = "recent";
const OTHER = "other";
function makeOpenTabsGrouping(label) {
  return {
    id: "openTabs",
    label: label ?? "Open tabs"
  };
}
function makeBuiltInGroupings(strings) {
  const s = strings ?? {};
  return [
    makeOpenTabsGrouping(s.openTabsLabel),
    {
      id: "lastUsed",
      label: s.lastUsedLabel ?? "Last used",
      getGroupKey: (project) => {
        var _a;
        return typeof ((_a = project.customData) == null ? void 0 : _a[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.lastUsedAt]) === "number" ? RECENT : OTHER;
      },
      getSectionHeading: (key) => key === RECENT ? s.lastUsedRecentSectionHeading ?? "Recently used" : s.lastUsedOtherSectionHeading ?? "Other",
      // Newest bucket first, "Other" second. compareSections runs after the priorityKey check, so
      // when a priorityKey is set (built-ins never set one) it wins over this ordering.
      compareSections: (a, b) => {
        if (a.key === RECENT) return -1;
        if (b.key === RECENT) return 1;
        return 0;
      }
    },
    {
      id: "language",
      label: s.languageLabel ?? "Language",
      getGroupKey: (project) => {
        var _a;
        const language = (_a = project.customData) == null ? void 0 : _a[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.language];
        return typeof language === "string" ? language : void 0;
      },
      unknownSectionHeading: s.languageUnknownSectionHeading ?? "Unknown language"
    },
    {
      id: "type",
      label: s.typeLabel ?? "Type",
      getGroupKey: (project) => {
        var _a;
        const type = (_a = project.customData) == null ? void 0 : _a[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.type];
        return typeof type === "string" ? type : void 0;
      },
      // First non-empty `typeName` wins as the section heading — protects against a project row
      // missing `typeName` while a sibling in the same type key has it.
      getSectionHeading: (key, projects) => {
        var _a;
        const first = projects.find(
          (p) => {
            var _a2;
            return typeof ((_a2 = p.customData) == null ? void 0 : _a2[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.typeName]) === "string";
          }
        );
        const heading = (_a = first == null ? void 0 : first.customData) == null ? void 0 : _a[PROJECT_SELECTOR_CUSTOM_DATA_KEYS.typeName];
        return typeof heading === "string" && heading.length > 0 ? heading : key;
      },
      unknownSectionHeading: s.typeUnknownSectionHeading ?? "Unknown type"
    }
  ];
}
const defaultGroupings = makeBuiltInGroupings();
function makeSelectionGrouping(strings) {
  const s = strings ?? {};
  return {
    id: "selection",
    label: s.label ?? "Selection",
    getSectionHeading: (key) => key === "selected" ? s.selectedSectionHeading ?? DEFAULT_SELECTED_SECTION_HEADING : s.unselectedSectionHeading ?? DEFAULT_UNSELECTED_SECTION_HEADING
  };
}
function buildBuiltInGroupingStrings(strings) {
  return {
    openTabsLabel: readProjectSelectorString(strings, "%projectSelector_grouping_openTabs_label%"),
    lastUsedLabel: readProjectSelectorString(strings, "%projectSelector_grouping_lastUsed_label%"),
    lastUsedRecentSectionHeading: readProjectSelectorString(
      strings,
      "%projectSelector_grouping_lastUsed_recentSectionHeading%"
    ),
    lastUsedOtherSectionHeading: readProjectSelectorString(
      strings,
      "%projectSelector_grouping_lastUsed_otherSectionHeading%"
    ),
    languageLabel: readProjectSelectorString(strings, "%projectSelector_grouping_language_label%"),
    languageUnknownSectionHeading: readProjectSelectorString(
      strings,
      "%projectSelector_grouping_language_unknownSectionHeading%"
    ),
    typeLabel: readProjectSelectorString(strings, "%projectSelector_grouping_type_label%"),
    typeUnknownSectionHeading: readProjectSelectorString(
      strings,
      "%projectSelector_grouping_type_unknownSectionHeading%"
    )
  };
}
function buildSelectionGroupingStrings(strings) {
  return {
    label: readProjectSelectorString(strings, "%projectSelector_grouping_selection_label%"),
    selectedSectionHeading: readProjectSelectorString(
      strings,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    unselectedSectionHeading: readProjectSelectorString(
      strings,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    )
  };
}
const NARROW_TRIGGER_THRESHOLD_PX = 100;
const PROJECT_SELECTOR_DEFAULT_STRINGS = {
  ariaLabel: "Projects & resources",
  buttonPlaceholder: "Select a project",
  commandEmptyMessage: "No projects found",
  searchPlaceholder: "Search projects & resources",
  groupByAriaLabel: "Group by",
  groupSectionLabel: "Group by",
  groupByNone: "None",
  openTabsSectionHeading: "Opened project & resource tabs",
  otherProjectsSectionHeading: "Your projects & resources",
  autoOpenTabsGroupingLabel: "Open tabs",
  autoSelectionGroupingLabel: "Selection",
  autoSelectionSelectedSectionHeading: DEFAULT_SELECTED_SECTION_HEADING,
  autoSelectionUnselectedSectionHeading: DEFAULT_UNSELECTED_SECTION_HEADING,
  boundButClosedTooltip: "Bound to {group} · not currently open",
  openButtonLabel: "Open",
  clearAll: "Clear all"
};
function resolveStrings(partial) {
  const given = partial ?? {};
  return {
    // The one field where an empty string is meaningful: it is a deliberate "no accessible name
    // here; the visible text or a labelling ancestor names this control", so it passes through
    // rather than falling back. Matches `RecentSearches`. Whitespace-only is not that opt-out.
    ariaLabel: given.ariaLabel === "" ? "" : resolveLocalizedString(given.ariaLabel, PROJECT_SELECTOR_DEFAULT_STRINGS.ariaLabel),
    buttonPlaceholder: resolveLocalizedString(
      given.buttonPlaceholder,
      PROJECT_SELECTOR_DEFAULT_STRINGS.buttonPlaceholder
    ),
    commandEmptyMessage: resolveLocalizedString(
      given.commandEmptyMessage,
      PROJECT_SELECTOR_DEFAULT_STRINGS.commandEmptyMessage
    ),
    searchPlaceholder: resolveLocalizedString(
      given.searchPlaceholder,
      PROJECT_SELECTOR_DEFAULT_STRINGS.searchPlaceholder
    ),
    groupByAriaLabel: resolveLocalizedString(
      given.groupByAriaLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.groupByAriaLabel
    ),
    groupSectionLabel: resolveLocalizedString(
      given.groupSectionLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.groupSectionLabel
    ),
    groupByNone: resolveLocalizedString(
      given.groupByNone,
      PROJECT_SELECTOR_DEFAULT_STRINGS.groupByNone
    ),
    openTabsSectionHeading: resolveLocalizedString(
      given.openTabsSectionHeading,
      PROJECT_SELECTOR_DEFAULT_STRINGS.openTabsSectionHeading
    ),
    otherProjectsSectionHeading: resolveLocalizedString(
      given.otherProjectsSectionHeading,
      PROJECT_SELECTOR_DEFAULT_STRINGS.otherProjectsSectionHeading
    ),
    autoOpenTabsGroupingLabel: resolveLocalizedString(
      given.autoOpenTabsGroupingLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.autoOpenTabsGroupingLabel
    ),
    autoSelectionGroupingLabel: resolveLocalizedString(
      given.autoSelectionGroupingLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.autoSelectionGroupingLabel
    ),
    autoSelectionSelectedSectionHeading: resolveLocalizedString(
      given.autoSelectionSelectedSectionHeading,
      PROJECT_SELECTOR_DEFAULT_STRINGS.autoSelectionSelectedSectionHeading
    ),
    autoSelectionUnselectedSectionHeading: resolveLocalizedString(
      given.autoSelectionUnselectedSectionHeading,
      PROJECT_SELECTOR_DEFAULT_STRINGS.autoSelectionUnselectedSectionHeading
    ),
    boundButClosedTooltip: resolveLocalizedString(
      given.boundButClosedTooltip,
      PROJECT_SELECTOR_DEFAULT_STRINGS.boundButClosedTooltip
    ),
    openButtonLabel: resolveLocalizedString(
      given.openButtonLabel,
      PROJECT_SELECTOR_DEFAULT_STRINGS.openButtonLabel
    ),
    clearAll: resolveLocalizedString(given.clearAll, PROJECT_SELECTOR_DEFAULT_STRINGS.clearAll)
  };
}
function buildProjectSelectorLocalizedStrings(strings) {
  return {
    searchPlaceholder: readProjectSelectorString(strings, "%projectSelector_searchPlaceholder%"),
    commandEmptyMessage: readProjectSelectorString(
      strings,
      "%projectSelector_commandEmptyMessage%"
    ),
    groupByAriaLabel: readProjectSelectorString(strings, "%projectSelector_groupByAriaLabel%"),
    groupSectionLabel: readProjectSelectorString(strings, "%projectSelector_groupSectionLabel%"),
    groupByNone: readProjectSelectorString(strings, "%projectSelector_groupByNone%"),
    openTabsSectionHeading: readProjectSelectorString(
      strings,
      "%projectSelector_openTabsSectionHeading%"
    ),
    otherProjectsSectionHeading: readProjectSelectorString(
      strings,
      "%projectSelector_otherProjectsSectionHeading%"
    ),
    autoOpenTabsGroupingLabel: readProjectSelectorString(
      strings,
      "%projectSelector_grouping_openTabs_label%"
    ),
    autoSelectionGroupingLabel: readProjectSelectorString(
      strings,
      "%projectSelector_grouping_selection_label%"
    ),
    autoSelectionSelectedSectionHeading: readProjectSelectorString(
      strings,
      "%projectSelector_grouping_selection_selectedSectionHeading%"
    ),
    autoSelectionUnselectedSectionHeading: readProjectSelectorString(
      strings,
      "%projectSelector_grouping_selection_unselectedSectionHeading%"
    ),
    boundButClosedTooltip: readProjectSelectorString(
      strings,
      "%projectSelector_boundButClosedTooltip%"
    ),
    openButtonLabel: readProjectSelectorString(strings, "%projectSelector_openButtonLabel%"),
    clearAll: readProjectSelectorString(strings, "%projectSelector_clearAll%")
  };
}
function scrollGroupLetterFromMap(id) {
  return DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS[getLocalizeKeyForScrollGroupId$1(id)] ?? String(id);
}
const FOOTER_ACTION_VALUE = "platform.footerAction";
const DIAGONAL_STRIKE_STYLE = {
  backgroundImage: "linear-gradient(to top right, transparent calc(50% - 1px), currentColor calc(50% - 0.5px), currentColor calc(50% + 0.5px), transparent calc(50% + 1px))"
};
function ScrollGroupChip({ scrollGroupId, isBoundButClosed }) {
  const letter = scrollGroupLetterFromMap(scrollGroupId);
  if (isBoundButClosed) {
    return /* @__PURE__ */ jsx(
      Badge,
      {
        variant: "outline",
        className: "tw:relative tw:text-muted-foreground",
        style: DIAGONAL_STRIKE_STYLE,
        children: letter
      }
    );
  }
  return /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: letter });
}
function ProjectRowView({
  row,
  mode,
  strings,
  onClick,
  onOpen,
  selectedRowRef,
  indicator,
  reserveIndicatorSlot
}) {
  const {
    ref: labelRef,
    open: isTruncatedHovered,
    onPointerEnter: onTruncationPointerEnter,
    onPointerLeave: onTruncationPointerLeave
  } = useTruncationTooltip();
  const [isExtraContentHovered, setIsExtraContentHovered] = useState(false);
  const disabledReasonId = useId();
  const hasDisabledReason = row.isDisabled && Boolean(row.disabledReason);
  const hasExtraTooltipContent = Boolean(row.scrollGroupScrRefLabel) || row.isBoundButClosed || Boolean(indicator == null ? void 0 : indicator.label) || hasDisabledReason;
  const isHovered = isTruncatedHovered || isExtraContentHovered;
  const handlePointerEnter = useCallback(() => {
    if (hasExtraTooltipContent) {
      setIsExtraContentHovered(true);
      return;
    }
    onTruncationPointerEnter();
  }, [hasExtraTooltipContent, onTruncationPointerEnter]);
  const handlePointerLeave = useCallback(() => {
    setIsExtraContentHovered(false);
    onTruncationPointerLeave();
  }, [onTruncationPointerLeave]);
  const leftCheck = /* @__PURE__ */ jsx(Check, { className: cn("tw:h-4 tw:w-4", row.isSelected ? "tw:opacity-100" : "tw:opacity-0") });
  let rightContent;
  if (mode === "project") {
    if (row.openGroups.length > 0) {
      rightContent = /* @__PURE__ */ jsx("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:gap-1", children: row.openGroups.map((g) => /* @__PURE__ */ jsx(Badge, { variant: "secondary", children: scrollGroupLetterFromMap(g) }, g)) });
    }
  } else if (row.scrollGroupId !== void 0) {
    rightContent = /* @__PURE__ */ jsxs("span", { className: "tw:ms-auto tw:flex tw:shrink-0 tw:items-center tw:gap-2", children: [
      /* @__PURE__ */ jsx(
        ScrollGroupChip,
        {
          scrollGroupId: row.scrollGroupId,
          isBoundButClosed: row.isBoundButClosed
        }
      ),
      row.isBoundButClosed && !row.isDisabled && onOpen && /* @__PURE__ */ jsxs(
        Button,
        {
          size: "sm",
          variant: "ghost",
          className: "tw:h-6 tw:gap-1 tw:px-2 tw:text-xs",
          onClick: (event) => {
            event.stopPropagation();
            onOpen(row);
          },
          onMouseDown: (event) => event.stopPropagation(),
          "aria-label": strings.openButtonLabel,
          children: [
            /* @__PURE__ */ jsx(ArrowRight, { className: "tw:h-3 tw:w-3" }),
            strings.openButtonLabel
          ]
        }
      )
    ] });
  }
  const rowNode = /* @__PURE__ */ jsxs(
    CommandItem,
    {
      ref: row.isSelected ? selectedRowRef : void 0,
      value: `${row.rowKey} ${row.shortName} ${row.fullName ?? ""}`,
      onSelect: () => {
        if (row.isDisabled) return;
        onClick(row);
      },
      disabled: row.isDisabled,
      onPointerEnter: handlePointerEnter,
      onPointerLeave: handlePointerLeave,
      ...hasDisabledReason && { "aria-describedby": disabledReasonId },
      className: cn(
        "tw:flex tw:items-center tw:gap-2 tw:pe-4",
        // `CommandItem` turns pointer events off on disabled items, which would keep the tooltip
        // explaining why from ever opening. cmdk itself still ignores clicks on disabled items.
        "tw:data-[disabled=true]:pointer-events-auto tw:data-[disabled=true]:cursor-not-allowed"
      ),
      children: [
        /* @__PURE__ */ jsx("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: leftCheck }),
        reserveIndicatorSlot && /* @__PURE__ */ jsx("span", { className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center", children: indicator == null ? void 0 : indicator.node }),
        /* @__PURE__ */ jsxs(
          "span",
          {
            ref: labelRef,
            className: "tw:flex tw:min-w-0 tw:flex-1 tw:flex-col tw:items-start tw:overflow-hidden tw:text-start",
            children: [
              /* @__PURE__ */ jsx("span", { className: "tw:w-full tw:truncate tw:font-medium", children: row.shortName }),
              hasDistinctFullName(row) && /* @__PURE__ */ jsx("span", { className: "tw:w-full tw:truncate tw:text-xs tw:text-muted-foreground", children: row.fullName })
            ]
          }
        ),
        rightContent,
        hasDisabledReason && /* @__PURE__ */ jsx("span", { id: disabledReasonId, hidden: true, children: row.disabledReason })
      ]
    }
  );
  const letter = row.scrollGroupId !== void 0 ? scrollGroupLetterFromMap(row.scrollGroupId) : void 0;
  const tooltipBoundBut = row.isBoundButClosed && letter ? strings.boundButClosedTooltip.replace("{group}", letter) : void 0;
  return /* @__PURE__ */ jsxs(Tooltip, { open: isHovered, delayDuration: 400, children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: rowNode }),
    /* @__PURE__ */ jsxs(
      TooltipContent,
      {
        side: "top",
        align: "center",
        sideOffset: 8,
        collisionPadding: 16,
        className: "tw:max-w-md tw:text-start",
        children: [
          /* @__PURE__ */ jsx("div", { className: "tw:font-semibold", dir: "auto", children: formatProjectName(row) }),
          !row.isBoundButClosed && row.scrollGroupScrRefLabel && letter && /* @__PURE__ */ jsxs("div", { className: "tw:text-sm", children: [
            row.scrollGroupScrRefLabel,
            /* @__PURE__ */ jsxs("span", { className: "tw:text-muted-foreground", children: [
              " (",
              letter,
              ")"
            ] })
          ] }),
          tooltipBoundBut && /* @__PURE__ */ jsx("div", { className: "tw:text-sm tw:italic", children: tooltipBoundBut }),
          (indicator == null ? void 0 : indicator.label) && /* @__PURE__ */ jsx("div", { className: "tw:text-sm", "aria-hidden": true, children: indicator.label }),
          row.isDisabled && row.disabledReason && /* @__PURE__ */ jsx("div", { className: "tw:text-sm tw:italic", children: row.disabledReason })
        ]
      }
    )
  ] });
}
const NO_GROUPING = "none";
function GroupByMenu({
  availableGroupings,
  activeGrouping,
  onChangeGrouping,
  strings
}) {
  const isGroupingActive = activeGrouping !== NO_GROUPING;
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
        Button,
        {
          variant: "ghost",
          size: "sm",
          className: cn(
            "tw:h-8 tw:w-8 tw:shrink-0 tw:p-0",
            // Match shadcn Toggle's "on" styling so the icon reads as a toggle-group button
            // that's currently pressed while a grouping is active.
            isGroupingActive && "tw:bg-accent tw:text-accent-foreground tw:hover:bg-accent/80 tw:data-[state=open]:bg-accent"
          ),
          "aria-label": strings.groupByAriaLabel,
          "aria-pressed": isGroupingActive,
          onMouseDown: (event) => event.preventDefault(),
          children: /* @__PURE__ */ jsx(Group, { className: "tw:h-4 tw:w-4" })
        }
      ) }) }),
      /* @__PURE__ */ jsx(TooltipContent, { children: strings.groupByAriaLabel })
    ] }),
    /* @__PURE__ */ jsxs(
      DropdownMenuContent,
      {
        align: "end",
        className: "tw:w-56",
        style: { zIndex: Z_INDEX_ABOVE_POPOVER },
        children: [
          /* @__PURE__ */ jsx(DropdownMenuLabel, { children: strings.groupSectionLabel }),
          /* @__PURE__ */ jsxs(DropdownMenuRadioGroup, { value: activeGrouping, onValueChange: onChangeGrouping, children: [
            /* @__PURE__ */ jsx(DropdownMenuRadioItem, { value: NO_GROUPING, children: strings.groupByNone }),
            /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
            availableGroupings.map((grouping) => /* @__PURE__ */ jsx(DropdownMenuRadioItem, { value: grouping.id, children: grouping.label }, grouping.id))
          ] })
        ]
      }
    )
  ] });
}
function resolveDefaultActiveGrouping(availableGroupings, defaultGrouping) {
  if (availableGroupings.length === 1) return availableGroupings[0].id;
  if (defaultGrouping) {
    if (defaultGrouping === NO_GROUPING) return NO_GROUPING;
    if (availableGroupings.some((g) => g.id === defaultGrouping)) return defaultGrouping;
  }
  if (availableGroupings.some((g) => g.id === "openTabs")) return "openTabs";
  return NO_GROUPING;
}
function ProjectSelector(props) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const strings = useMemo(() => resolveStrings(props.localizedStrings), [props.localizedStrings]);
  const availableGroupings = useMemo(() => {
    if (props.availableGroupings !== void 0) return props.availableGroupings;
    const auto = [];
    if (props.openTabs.length > 0) {
      auto.push(makeOpenTabsGrouping(strings.autoOpenTabsGroupingLabel));
    }
    if (props.mode === "project-multi") {
      auto.push(
        makeSelectionGrouping({
          label: strings.autoSelectionGroupingLabel,
          selectedSectionHeading: strings.autoSelectionSelectedSectionHeading,
          unselectedSectionHeading: strings.autoSelectionUnselectedSectionHeading
        })
      );
    }
    return auto;
  }, [
    props.availableGroupings,
    props.openTabs.length,
    props.mode,
    strings.autoOpenTabsGroupingLabel,
    strings.autoSelectionGroupingLabel,
    strings.autoSelectionSelectedSectionHeading,
    strings.autoSelectionUnselectedSectionHeading
  ]);
  const [pickedGrouping, setPickedGrouping] = useState(void 0);
  const resolvedGrouping = useMemo(
    () => resolveDefaultActiveGrouping(availableGroupings, props.defaultGrouping),
    [availableGroupings, props.defaultGrouping]
  );
  const activeGrouping = pickedGrouping ?? resolvedGrouping;
  const selectedRowRef = useRef(null);
  const [highlightedValue, setHighlightedValue] = useState(void 0);
  const handleOpenChange = useCallback((nextOpen) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      setQuery("");
      setHighlightedValue(void 0);
    }
  }, []);
  useEffect(() => {
    if (!open) return;
    const id = window.requestAnimationFrame(() => {
      const el = selectedRowRef.current;
      if (!el) return;
      el.scrollIntoView({ block: "nearest", behavior: "auto" });
    });
    return () => window.cancelAnimationFrame(id);
  }, [open]);
  const rows = useMemo(() => {
    if (props.mode === "project") {
      return computeRows({
        mode: "project",
        projects: props.projects,
        openTabs: props.openTabs,
        selection: props.selection
      });
    }
    if (props.mode === "project-multi") {
      return computeRows({
        mode: "project-multi",
        projects: props.projects,
        openTabs: props.openTabs,
        selection: props.selection
      });
    }
    return computeRows({
      mode: "projectScrollGroup",
      projects: props.projects,
      openTabs: props.openTabs,
      selection: props.selection
    });
  }, [props.mode, props.projects, props.openTabs, props.selection]);
  const filteredRows = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter(
      (r) => r.shortName.toLowerCase().includes(needle) || (r.fullName ?? "").toLowerCase().includes(needle)
    );
  }, [rows, query]);
  const projectsById = useMemo(
    () => new Map(props.projects.map((project) => [normalizeProjectId(project.id), project])),
    [props.projects]
  );
  const lookUpProject = useCallback(
    (projectId) => projectId === void 0 ? void 0 : projectsById.get(normalizeProjectId(projectId)),
    [projectsById]
  );
  const { renderProjectIndicator } = props;
  const renderIndicator = useCallback(
    (row) => renderProjectIndicator ? renderProjectIndicator(row.project) : void 0,
    [renderProjectIndicator]
  );
  const reserveIndicatorSlot = Boolean(renderProjectIndicator);
  const seedFooterHighlight = Boolean(props.footerAction) && filteredRows.length === 0;
  const sections = useMemo(() => {
    if (activeGrouping === NO_GROUPING) return partitionFlat(filteredRows);
    const grouping = availableGroupings.find((g) => g.id === activeGrouping);
    if (!grouping) return partitionFlat(filteredRows);
    return partitionByGrouping(filteredRows, grouping);
  }, [filteredRows, activeGrouping, availableGroupings]);
  const handleOpenProjectInGroup = (row) => {
    if (row.scrollGroupId === void 0) return;
    if (props.mode === "projectScrollGroup") {
      props.onOpenProjectInGroup(row.projectId, row.scrollGroupId);
      return;
    }
    if (props.mode === "project-multi" && props.onOpenProjectInGroup) {
      props.onOpenProjectInGroup(row.projectId, row.scrollGroupId);
    }
  };
  const handleRowClick = (row) => {
    switch (props.mode) {
      case "project": {
        props.onChangeSelection({ projectId: row.projectId });
        setOpen(false);
        return;
      }
      case "project-multi": {
        const current = props.selection.pairs;
        const normalizedRowId = normalizeProjectId(row.projectId);
        const match = (p) => normalizeProjectId(p.projectId) === normalizedRowId && p.scrollGroupId === row.scrollGroupId;
        const next = current.some(match) ? current.filter((p) => !match(p)) : [
          ...current.filter((p) => !match(p)),
          { projectId: row.projectId, scrollGroupId: row.scrollGroupId }
        ];
        props.onChangeSelection({ pairs: next });
        return;
      }
      case "projectScrollGroup": {
        if (row.isBoundButClosed && row.scrollGroupId !== void 0) {
          props.onOpenProjectInGroup(row.projectId, row.scrollGroupId);
          setOpen(false);
          return;
        }
        if (row.scrollGroupId !== void 0) {
          props.onChangeSelection({
            projectId: row.projectId,
            scrollGroupId: row.scrollGroupId
          });
          setOpen(false);
          return;
        }
        const targetGroup = props.selection.scrollGroupId ?? 0;
        props.onChangeSelection({ projectId: row.projectId, scrollGroupId: targetGroup });
        props.onOpenProjectInGroup(row.projectId, targetGroup);
        setOpen(false);
      }
    }
  };
  const handleClearAll = () => {
    if (props.mode !== "project-multi") return;
    props.onChangeSelection({ pairs: [] });
  };
  const renderTriggerLabel = props.mode === "project" ? props.renderTriggerLabel : void 0;
  const triggerLabelFormat = props.mode === "project" ? props.triggerLabelFormat : void 0;
  const triggerContent = useMemo(() => {
    switch (props.mode) {
      case "project": {
        const selected = lookUpProject(props.selection.projectId);
        if (renderTriggerLabel)
          return { node: renderTriggerLabel(selected), title: "", hasSelection: !!selected };
        let text = selected ? selected.shortName : strings.buttonPlaceholder;
        if (selected && triggerLabelFormat === "shortNameAndFullName")
          text = formatProjectName(selected);
        return { node: text, title: text, hasSelection: !!selected };
      }
      case "project-multi": {
        const { pairs } = props.selection;
        if (pairs.length === 0) {
          const text = strings.buttonPlaceholder;
          return { node: text, title: text, hasSelection: false };
        }
        const tuples = [];
        pairs.forEach((pair) => {
          const project = lookUpProject(pair.projectId);
          if (project) tuples.push({ project, scrollGroupId: pair.scrollGroupId });
        });
        if (tuples.length === 0) {
          const text = strings.buttonPlaceholder;
          return { node: text, title: text, hasSelection: false };
        }
        const items = tuples.map(
          ({ project, scrollGroupId }) => scrollGroupId === void 0 ? project.shortName : `${project.shortName} (${scrollGroupLetterFromMap(scrollGroupId)})`
        ).join(", ");
        const countText = tuples.length.toString();
        return {
          node: /* @__PURE__ */ jsxs(Fragment$1, { children: [
            /* @__PURE__ */ jsx(Badge, { variant: "muted", className: "tw:shrink-0", children: countText }),
            /* @__PURE__ */ jsx("span", { className: "tw:min-w-0 tw:truncate", children: items })
          ] }),
          title: `${countText} ${items}`,
          hasSelection: true
        };
      }
      case "projectScrollGroup": {
        const selected = lookUpProject(props.selection.projectId);
        if (!selected) {
          const text = strings.buttonPlaceholder;
          return { node: text, title: text, hasSelection: false };
        }
        const group = props.selection.scrollGroupId;
        if (group === void 0) {
          return { node: selected.shortName, title: selected.shortName, hasSelection: true };
        }
        const groupLetter = scrollGroupLetterFromMap(group);
        return {
          node: `${selected.shortName} · ${groupLetter}`,
          title: `${selected.shortName} · ${groupLetter}`,
          accessibleTitle: `${selected.shortName}, ${groupLetter}`,
          hasSelection: true
        };
      }
      default:
        return { node: "", title: "", hasSelection: false };
    }
  }, [
    props.mode,
    lookUpProject,
    props.selection,
    renderTriggerLabel,
    triggerLabelFormat,
    strings.buttonPlaceholder
  ]);
  const triggerRef = useRef(null);
  const [isTriggerNarrow, setIsTriggerNarrow] = useState(false);
  useEffect(() => {
    const el = triggerRef.current;
    if (!el) return;
    const update = (width) => {
      setIsTriggerNarrow(width < NARROW_TRIGGER_THRESHOLD_PX);
    };
    update(el.getBoundingClientRect().width);
    if (typeof ResizeObserver === "undefined") return void 0;
    const observer = new ResizeObserver((entries) => {
      entries.forEach((entry) => {
        const [borderBox] = entry.borderBoxSize;
        if (borderBox) update(borderBox.inlineSize);
        else update(el.getBoundingClientRect().width);
      });
    });
    observer.observe(el, { box: "border-box" });
    return () => observer.disconnect();
  }, []);
  let triggerIcon;
  if (props.isLoading)
    triggerIcon = /* @__PURE__ */ jsx(Loader2, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:animate-spin tw:opacity-50" });
  else if (isTriggerNarrow) triggerIcon = void 0;
  else if (props.mode === "project-multi")
    triggerIcon = /* @__PURE__ */ jsx(ChevronsUpDown, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  else triggerIcon = /* @__PURE__ */ jsx(ChevronDown, { className: "tw:ms-2 tw:h-4 tw:w-4 tw:shrink-0 tw:opacity-50" });
  const openButtonHandler = props.mode === "projectScrollGroup" || props.mode === "project-multi" && props.onOpenProjectInGroup ? handleOpenProjectInGroup : void 0;
  const triggerAriaLabel = strings.ariaLabel && triggerContent.hasSelection && triggerContent.title ? `${strings.ariaLabel}: ${triggerContent.accessibleTitle ?? triggerContent.title}` : strings.ariaLabel || void 0;
  const triggerButton = /* @__PURE__ */ jsxs(
    Button,
    {
      ref: triggerRef,
      variant: props.buttonVariant ?? "outline",
      role: "combobox",
      "aria-expanded": open,
      "aria-label": triggerAriaLabel,
      disabled: (props.isDisabled ?? false) || (props.isLoading ?? false),
      className: cn(
        // `tw:shrink!` overrides shadcn Button's base `tw:shrink-0` (which would pin the trigger
        // at its intrinsic width in a flex row and force overflow past sibling icons/spacers).
        // `tw:min-w-0` then lets flex-shrink actually reduce below content width. `tw:w-full`
        // still handles the standalone / block-parent case at 100% of the container.
        "tw:flex tw:h-8 tw:w-full tw:min-w-0 tw:shrink! tw:items-center tw:justify-between tw:overflow-hidden tw:font-normal",
        // Narrow triggers get a tighter internal padding + smaller text so the leading characters
        // of the shortName stay visible in an icon-rail sidebar (~56px). Layout unchanged in the
        // wide case.
        isTriggerNarrow && "tw:px-0.5 tw:text-xs",
        props.buttonClassName
      ),
      children: [
        /* @__PURE__ */ jsx("span", { className: "tw:flex tw:min-w-0 tw:flex-1 tw:items-baseline tw:gap-2 tw:overflow-hidden tw:whitespace-nowrap tw:text-start", children: typeof triggerContent.node === "string" ? /* @__PURE__ */ jsx("span", { className: "tw:min-w-0 tw:truncate", dir: "auto", children: triggerContent.node }) : triggerContent.node }),
        triggerIcon
      ]
    }
  );
  const triggerWithTooltip = triggerContent.title ? /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 400, children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: triggerButton }) }),
    /* @__PURE__ */ jsx(TooltipContent, { dir: "auto", children: triggerContent.title })
  ] }) }) : /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: triggerButton });
  const showGroupByMenu = availableGroupings.length > 1;
  return /* @__PURE__ */ jsxs(Popover, { open, onOpenChange: handleOpenChange, children: [
    triggerWithTooltip,
    /* @__PURE__ */ jsx(
      PopoverContent,
      {
        align: "start",
        collisionPadding: 16,
        className: "tw:w-80 tw:max-w-[calc(100vw-2rem)] tw:p-0",
        children: /* @__PURE__ */ jsx(TooltipProvider, { delayDuration: 400, children: /* @__PURE__ */ jsxs(
          Command,
          {
            shouldFilter: false,
            value: seedFooterHighlight ? highlightedValue ?? FOOTER_ACTION_VALUE : void 0,
            onValueChange: setHighlightedValue,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "tw:flex tw:items-center tw:pe-2", children: [
                /* @__PURE__ */ jsx("div", { className: "tw:flex-1", children: /* @__PURE__ */ jsx(
                  CommandInput,
                  {
                    value: query,
                    onValueChange: setQuery,
                    placeholder: strings.searchPlaceholder,
                    className: "tw:border-0",
                    spaceSelectsHighlightedItem: true
                  }
                ) }),
                showGroupByMenu && /* @__PURE__ */ jsx(
                  GroupByMenu,
                  {
                    availableGroupings,
                    activeGrouping,
                    onChangeGrouping: setPickedGrouping,
                    strings
                  }
                )
              ] }),
              props.mode === "project-multi" && props.selection.pairs.length > 0 && // Right-aligned "Clear all" only. There is deliberately no "Select all": selecting every
              // project mounts a data subscription per project, so on a large installation it is a
              // performance hazard rather than a convenience. Clear all is hidden while nothing is selected.
              /* @__PURE__ */ jsx("div", { className: "tw:flex tw:justify-end tw:border-b tw:py-2 tw:pe-4 tw:ps-2", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "sm", onClick: handleClearAll, children: `${strings.clearAll} (${props.selection.pairs.length.toString()})` }) }),
              /* @__PURE__ */ jsxs(CommandList, { children: [
                /* @__PURE__ */ jsx(CommandEmpty, { children: strings.commandEmptyMessage }),
                sections.map((section, index) => (
                  // Custom groupings yield multiple 'grouping' sections, so the section key must
                  // include the label (or key) to stay stable across re-orders.
                  /* @__PURE__ */ jsxs(
                    Fragment,
                    {
                      children: [
                        /* @__PURE__ */ jsx(CommandGroup, { heading: sectionHeading(section, strings), children: section.rows.map((row) => /* @__PURE__ */ jsx(
                          ProjectRowView,
                          {
                            row,
                            mode: props.mode,
                            strings,
                            onClick: handleRowClick,
                            onOpen: openButtonHandler,
                            selectedRowRef,
                            indicator: renderIndicator(row),
                            reserveIndicatorSlot
                          },
                          row.rowKey
                        )) }),
                        index < sections.length - 1 && /* @__PURE__ */ jsx(CommandSeparator, { alwaysRender: true })
                      ]
                    },
                    `${section.kind}:${section.groupingId ?? ""}:${section.key ?? section.label ?? ""}`
                  )
                )),
                props.footerAction && // Stuck to the bottom of the scroll box rather than merely last in it. The footer
                // is the list's escape hatch, and `CommandList` is `max-h-72 overflow-y-auto`, so
                // as a plain last child it scrolls out of reach on any list long enough to need
                // it — which is the state a user is most likely to be looking for it in. It stays
                // INSIDE `CommandList` because that is the subtree cmdk's `getValidItems()` walks
                // for arrow-key, Home/End and Enter navigation; moving it out would make it
                // pointer-only. Opaque background so rows scroll behind it rather than through it.
                // `role="presentation"` because this wrapper exists only to position the row:
                // without it the div breaks `CommandList`'s `role="listbox"` ownership of the
                // footer's `role="option"`, and some assistive tech stops counting the footer in
                // "1 of N".
                /* @__PURE__ */ jsxs("div", { role: "presentation", className: "tw:sticky tw:bottom-0 tw:z-10 tw:bg-popover", children: [
                  filteredRows.length > 0 && /* @__PURE__ */ jsx(
                    CommandSeparator,
                    {
                      alwaysRender: true,
                      "data-testid": "project-selector-footer-separator"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    CommandItem,
                    {
                      forceMount: true,
                      value: FOOTER_ACTION_VALUE,
                      "data-testid": "project-selector-footer-action",
                      "aria-haspopup": "dialog",
                      className: "tw:flex tw:items-center tw:gap-2 tw:pe-4",
                      onSelect: () => {
                        var _a;
                        (_a = props.footerAction) == null ? void 0 : _a.onSelect();
                        handleOpenChange(false);
                      },
                      children: [
                        /* @__PURE__ */ jsx(
                          "span",
                          {
                            "aria-hidden": true,
                            className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                          }
                        ),
                        Boolean(props.renderProjectIndicator) && /* @__PURE__ */ jsx(
                          "span",
                          {
                            "aria-hidden": true,
                            className: "tw:flex tw:h-4 tw:w-4 tw:shrink-0 tw:items-center tw:justify-center"
                          }
                        ),
                        /* @__PURE__ */ jsx("span", { className: "tw:min-w-0 tw:flex-1 tw:truncate tw:text-start", children: props.footerAction.label })
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        ) })
      }
    )
  ] });
}
function sectionHeading(section, strings) {
  switch (section.kind) {
    case "openTabs":
      return strings.openTabsSectionHeading;
    case "other":
      return strings.otherProjectsSectionHeading;
    case "grouping":
      return section.label;
    case "flat":
    default:
      return void 0;
  }
}
const SearchBar = forwardRef(
  ({ value, onSearch, placeholder, isFullWidth, className, isDisabled = false, id }, inputRef) => {
    const dir = readDirection();
    return /* @__PURE__ */ jsxs(
      "div",
      {
        id,
        className: cn("tw:relative tw:@container/search", { "tw:w-full": isFullWidth }, className),
        children: [
          /* @__PURE__ */ jsx(
            Search,
            {
              className: cn(
                "tw:absolute tw:top-1/2 tw:h-4 tw:w-4 tw:-translate-y-1/2 tw:transform tw:opacity-50 tw:@max-[7rem]/search:hidden",
                { "tw:right-3": dir === "rtl" },
                { "tw:left-3": dir === "ltr" }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            Input,
            {
              ref: inputRef,
              className: cn(
                "tw:w-full tw:overflow-hidden tw:text-ellipsis tw:text-sm tw:ps-9 tw:@max-[7rem]/search:ps-3 tw:@max-[3rem]/search:ps-0 tw:@max-[3rem]/search:pe-0",
                {
                  "tw:pe-8 tw:@max-[4rem]/search:pe-3": value
                }
              ),
              placeholder,
              value,
              onChange: (e) => onSearch(e.target.value),
              disabled: isDisabled
            }
          ),
          value && /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "ghost",
              size: "icon",
              className: cn(
                "tw:absolute tw:inset-y-0 tw:my-auto tw:h-7 tw:@max-[4rem]/search:hidden",
                { "tw:left-0": dir === "rtl" },
                { "tw:right-0": dir === "ltr" }
              ),
              onClick: () => {
                onSearch("");
              },
              children: [
                /* @__PURE__ */ jsx(X, { className: "tw:h-4 tw:w-4" }),
                /* @__PURE__ */ jsx("span", { className: "tw:sr-only", children: "Clear" })
              ]
            }
          )
        ]
      }
    );
  }
);
SearchBar.displayName = "SearchBar";
const MAX_BOOKS_LISTED_IN_SUMMARY = 5;
function getAvailableBookIds(availableBookInfo) {
  return getBookIdsFromBooksPresent(availableBookInfo).filter(
    (bookId) => !Canon.isObsolete(Canon.bookIdToNumber(bookId))
  );
}
function getBooksForSection(bookIds, section) {
  return bookIds.filter((bookId) => {
    try {
      return getSectionForBook(bookId) === section;
    } catch {
      return false;
    }
  });
}
const isSectionFullySelected = (bookIds, section, selectedBookIds) => getBooksForSection(bookIds, section).every((bookId) => selectedBookIds.includes(bookId));
function localizeBookIdsInCanonOrder(selectedBookIds, localizedBookNames) {
  const canonicalBookIds = [
    ...new Set(selectedBookIds.map((bookId) => bookId.toUpperCase()))
  ].filter((bookId) => Canon.bookIdToNumber(bookId) > 0);
  return canonicalBookIds.sort((a, b) => Canon.bookIdToNumber(a) - Canon.bookIdToNumber(b)).map((bookId) => getLocalizedBookId(bookId, localizedBookNames));
}
function summarizeSelectedBooks(selectedBookIds, availableBookIds, allBooksText, localizedBookNames) {
  if (selectedBookIds.length === 0) return void 0;
  const selectedSet = new Set(selectedBookIds.map((bookId) => bookId.toUpperCase()));
  const availableSet = new Set(availableBookIds.map((bookId) => bookId.toUpperCase()));
  if (availableSet.size > 0 && availableSet.size === selectedSet.size && [...availableSet].every((bookId) => selectedSet.has(bookId)))
    return allBooksText;
  const booksInCanonOrder = localizeBookIdsInCanonOrder(selectedBookIds, localizedBookNames);
  if (booksInCanonOrder.length === 0) return void 0;
  if (booksInCanonOrder.length <= MAX_BOOKS_LISTED_IN_SUMMARY) return booksInCanonOrder.join(", ");
  return `${booksInCanonOrder[0]} - ${booksInCanonOrder[booksInCanonOrder.length - 1]}`;
}
function LucideIcon({ name, className }) {
  const Icon = isLucideIconName(name) ? LUCIDE_ICONS_BY_NAME[name] : void 0;
  if (!Icon) return void 0;
  return /* @__PURE__ */ jsx(Icon, { "aria-hidden": "true", className: cn("tw:h-4 tw:w-4 tw:shrink-0", className) });
}
function EmptyState({ message, id, className }) {
  return /* @__PURE__ */ jsx(
    "p",
    {
      role: "status",
      "data-testid": id,
      className: cn("tw:text-sm tw:text-muted-foreground", className),
      children: message
    }
  );
}
function Empty({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:min-w-0 tw:flex-1 tw:flex-col tw:items-center tw:justify-center tw:gap-4 tw:rounded-xl tw:border-dashed tw:p-6 tw:text-center tw:text-balance",
        className
      ),
      ...props
    }
  );
}
function EmptyHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty-header",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:max-w-sm tw:flex-col tw:items-center tw:gap-2",
        className
      ),
      ...props
    }
  );
}
const emptyMediaVariants = cva(
  "tw:mb-2 tw:flex tw:shrink-0 tw:items-center tw:justify-center tw:[&_svg]:pointer-events-none tw:[&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "tw:bg-transparent",
        icon: "tw:flex tw:size-8 tw:shrink-0 tw:items-center tw:justify-center tw:rounded-lg tw:bg-muted tw:text-foreground tw:[&_svg:not([class*=size-])]:size-4"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function EmptyMedia({
  className,
  variant = "default",
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty-icon",
      "data-variant": variant,
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp",
        emptyMediaVariants({ variant }),
        className
      ),
      ...props
    }
  );
}
function EmptyTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty-title",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:font-heading tw:text-sm tw:font-medium tw:tracking-tight",
        className
      ),
      ...props
    }
  );
}
function EmptyDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty-description",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:text-sm/relaxed tw:text-muted-foreground tw:[&>a]:underline tw:[&>a]:underline-offset-4 tw:[&>a:hover]:text-primary",
        className
      ),
      ...props
    }
  );
}
function EmptyContent({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "empty-content",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation.
        "pr-twp tw:flex tw:w-full tw:max-w-sm tw:min-w-0 tw:flex-col tw:items-center tw:gap-2.5 tw:text-sm tw:text-balance",
        className
      ),
      ...props
    }
  );
}
function RetryableErrorView({
  message,
  retryLabel,
  onRetry,
  icon,
  role = "alert",
  className
}) {
  return /* @__PURE__ */ jsxs(Empty, { className: cn(className), role, children: [
    /* @__PURE__ */ jsxs(EmptyHeader, { children: [
      /* @__PURE__ */ jsx(EmptyMedia, { variant: "icon", children: icon ?? /* @__PURE__ */ jsx(AlertTriangle, {}) }),
      /* @__PURE__ */ jsx(EmptyDescription, { children: message })
    ] }),
    onRetry && /* @__PURE__ */ jsx(EmptyContent, { children: /* @__PURE__ */ jsx(Button, { onClick: () => onRetry(), children: retryLabel }) })
  ] });
}
const Spinner = forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx(LoaderCircle, { size: 35, className: cn("tw:animate-spin", className), ...props, ref });
});
Spinner.displayName = "Spinner";
const alertVariants = cva(
  // CUSTOM: Added img arbitrary selectors alongside existing svg selectors so that <img> elements
  // (or SVGs loaded from file) can be used as icons in the same position as inline <svg> icons.
  // Implemented by TJ Couch, approved by Alex Mercado, 20 February 2025.
  // Note: the new shadcn baseline changed the layout model significantly (grid + data-slot).
  // The svg selectors are now *:[svg]:... style. We add equivalent *:[img]:... selectors.
  "tw:group/alert tw:relative tw:grid tw:w-full tw:gap-0.5 tw:rounded-lg tw:border tw:px-2.5 tw:py-2 tw:text-start tw:text-sm tw:has-data-[slot=alert-action]:relative tw:has-data-[slot=alert-action]:pe-18 tw:has-[>svg]:grid-cols-[auto_1fr] tw:has-[>svg]:gap-x-2 tw:*:[svg]:row-span-2 tw:*:[svg]:translate-y-0.5 tw:*:[svg]:text-current tw:*:[svg:not([class*=size-])]:size-4 tw:has-[>img]:grid-cols-[auto_1fr] tw:has-[>img]:gap-x-2 tw:*:[img]:row-span-2 tw:*:[img]:translate-y-0.5 tw:*:[img]:text-current tw:*:[img:not([class*=size-])]:size-4",
  {
    variants: {
      variant: {
        default: "tw:bg-card tw:text-card-foreground",
        destructive: (
          // CUSTOM: Added tw:*:[img]:text-current alongside existing svg selector so that <img>
          // elements (or SVGs from file) display destructive color in the destructive variant.
          // Implemented by TJ Couch, approved by Alex Mercado, 20 February 2025.
          "tw:bg-card tw:text-destructive tw:*:data-[slot=alert-description]:text-destructive/90 tw:*:[svg]:text-current tw:*:[img]:text-current"
        )
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(
        // CUSTOM: Added 'pr-twp' to apply Platform.Bible's Tailwind CSS scope isolation, ensuring
        // shadcn styles are correctly scoped when rendered inside the Platform.Bible app.
        "pr-twp",
        alertVariants({ variant }),
        className
      ),
      ...props
    }
  );
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-title",
      className: cn(
        "tw:font-medium tw:group-has-[>svg]/alert:col-start-2 tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground",
        className
      ),
      ...props
    }
  );
}
function AlertDescription({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "tw:text-sm tw:text-balance tw:text-muted-foreground tw:md:text-pretty tw:[&_a]:underline tw:[&_a]:underline-offset-3 tw:[&_a]:hover:text-foreground tw:[&_p:not(:last-child)]:mb-4",
        className
      ),
      ...props
    }
  );
}
function ResizablePanelGroup({
  className,
  // CUSTOM: Deprecated direction prop that layers over orientation prop to preserve existing API
  direction,
  // CUSTOM: Deprecated onLayout prop that layers over onLayoutChange and transforms data to array of size numbers
  onLayout,
  orientation,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ResizablePrimitive.Group,
    {
      "data-slot": "resizable-panel-group",
      className: cn(
        "tw:flex tw:h-full tw:w-full tw:aria-[orientation=vertical]:flex-col",
        className
      ),
      orientation: orientation ?? direction,
      onLayoutChange: onLayout ? (layout) => onLayout(Object.values(layout)) : void 0,
      ...props
    }
  );
}
function toSizeString(value) {
  if (value === void 0) return void 0;
  return typeof value === "number" ? `${value}%` : value;
}
function ResizablePanel({
  // CUSTOM: Convert number size props to strings for the underlying panel component
  defaultSize,
  minSize,
  maxSize,
  collapsedSize,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ResizablePrimitive.Panel,
    {
      "data-slot": "resizable-panel",
      defaultSize: toSizeString(defaultSize),
      minSize: toSizeString(minSize),
      maxSize: toSizeString(maxSize),
      collapsedSize: toSizeString(collapsedSize),
      ...props
    }
  );
}
function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ResizablePrimitive.Separator,
    {
      "data-slot": "resizable-handle",
      className: cn(
        "tw:relative tw:flex tw:w-px tw:items-center tw:justify-center tw:bg-border tw:ring-offset-background tw:after:absolute tw:after:inset-y-0 tw:after:start-1/2 tw:after:w-1 tw:after:-translate-x-1/2 tw:rtl:after:translate-x-1/2 tw:focus-visible:ring-1 tw:focus-visible:ring-ring tw:focus-visible:outline-hidden tw:aria-[orientation=horizontal]:h-px tw:aria-[orientation=horizontal]:w-full tw:aria-[orientation=horizontal]:after:start-0 tw:aria-[orientation=horizontal]:after:h-1 tw:aria-[orientation=horizontal]:after:w-full tw:aria-[orientation=horizontal]:after:translate-x-0 tw:rtl:aria-[orientation=horizontal]:after:-translate-x-0 tw:aria-[orientation=horizontal]:after:-translate-y-1/2 tw:[&[aria-orientation=horizontal]>div]:rotate-90",
        className
      ),
      ...props,
      children: withHandle && /* @__PURE__ */ jsx("div", { className: "tw:z-10 tw:flex tw:h-6 tw:w-1 tw:shrink-0 tw:rounded-lg tw:bg-border" })
    }
  );
}
function injectStyle(css, insertAt = "top") {
  if (!css || typeof document === "undefined") return;
  const head = document.head || document.querySelector("head");
  const firstChild = head.querySelector(":first-child");
  const style = document.createElement("style");
  style.appendChild(document.createTextNode(css));
  if (insertAt === "top" && firstChild) {
    head.insertBefore(style, firstChild);
  } else {
    head.appendChild(style);
  }
}
export {
  ALL_BOOK_IDS,
  ALL_ENGLISH_BOOK_NAMES,
  Alert,
  AlertDescription,
  AlertTitle,
  Badge,
  Button,
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  CANCEL_ACCEPT_BUTTONS_STRING_KEYS,
  CancelAcceptButtons,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  DEFAULT_SCROLL_GROUP_LOCALIZED_STRINGS,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  EditorKeyboardShortcuts,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyState,
  EmptyTitle,
  FootnoteEditor,
  INLINE_APPLY_DEBOUNCE_MS,
  Input,
  InputGroup,
  InputGroupAddon,
  Kbd,
  KbdGroup,
  LIST_ITEM_KEYBOARD_FOCUS_RING,
  LUCIDE_ICON_NAMES,
  Label,
  LucideIcon,
  MARKER_MENU_STRING_KEYS,
  MarkerMenu,
  MenuContext,
  MultiSelectComboBox,
  NO_GROUPING,
  PROJECT_SELECTOR_DEFAULT_STRINGS,
  PROJECT_SELECTOR_STRING_KEYS,
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverPortalContainerProvider,
  PopoverTitle,
  PopoverTrigger,
  ProjectSelector,
  QUIET_FOCUS_RING_SUPPRESSION,
  RadioGroup,
  RadioGroupItem,
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
  RetryableErrorView,
  SearchBar,
  Separator,
  ShortcutKeys,
  Skeleton,
  Spinner,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipPortalContainerProvider,
  TooltipProvider,
  TooltipTrigger,
  UNDO_REDO_BUTTONS_STRING_KEYS,
  UndoRedoButtons,
  Z_INDEX_ABOVE_DOCK,
  Z_INDEX_ABOVE_POPOVER,
  Z_INDEX_CONNECTION_LOST,
  Z_INDEX_FIRST_RUN,
  Z_INDEX_MODAL,
  Z_INDEX_MODAL_BACKDROP,
  Z_INDEX_NESTED_MODAL,
  Z_INDEX_NESTED_MODAL_BACKDROP,
  Z_INDEX_ONBOARDING_TOUR,
  Z_INDEX_OVERLAY,
  Z_INDEX_TOOLTIP,
  badgeVariants,
  buildBuiltInGroupingStrings,
  buildProjectSelectorLocalizedStrings,
  buildSelectionGroupingStrings,
  buttonGroupVariants,
  buttonVariants,
  captureEditorContentSnapshot,
  clearPaletteSessionIfCurrent,
  cn,
  defaultGroupings,
  doesBookMatchQuery,
  filterAndRankPaletteItems,
  focusUnlessSuppressed,
  getAvailableBookIds,
  getBooksForSection,
  getLastInteractionModality,
  getLocalizedBookId,
  getLocalizedBookName,
  getMarkerPaletteClaimedKeys,
  getNextChapterRef,
  getNextVerseRef,
  getPreviousChapterRef,
  getPreviousVerseRef,
  getSectionLongName,
  getSectionShortName,
  handleMarkerPaletteSessionKeyDown,
  hasEditorChanged,
  hideFocusRing,
  isEditorContextMenuOpenFor,
  isLucideIconName,
  isMacOs,
  isNoteMarker,
  isRunningInWebView,
  isSectionFullySelected,
  isUnclosedNoteOp,
  isWindows,
  leftEdgeRect,
  makeBuiltInGroupings,
  makeSelectionGrouping,
  markerMenuItemToPaletteItem,
  measureBox,
  menuVariants,
  persistDirection,
  readDirection,
  resolveFilterCharacter,
  resolveLocalizedString,
  resolveReferenceHistoryDirection,
  routeMarkerPaletteKey,
  runMarkerPaletteSession,
  shouldSuppressFocusReturn,
  showFocusRing,
  stripMarkerNestingPrefix,
  summarizeSelectedBooks,
  trackInteractionModality,
  useDismissOnWindowBlur,
  useGatedCloseAutoFocus,
  useHasContentBelow,
  useListbox,
  useLivePopoverAnchor,
  useMarkerPaletteCompositionClose,
  useMarkerPaletteFocusOutCapture,
  useMarkerPaletteSessionWriters,
  useMenuContext,
  useTruncationTooltip
};
//# sourceMappingURL=resizable.js.map
