import React from 'react';

/**
 * Creates a context that lets a consumer redirect where a Radix primitive's `Portal` mounts its
 * content, instead of the default `document.body`.
 *
 * @remarks
 * Radix portals overlay content to `document.body` so it escapes ancestor `overflow` clipping. That
 * default breaks whenever the content must stay _inside_ an ancestor:
 *
 * - **Stacking.** The ancestor stacks above the portalled layer, so body-level content paints behind
 *   it — e.g. the opaque first-run wizard gate at `Z_INDEX_FIRST_RUN` (700) versus tooltips at
 *   `Z_INDEX_TOOLTIP` (550).
 * - **Focus traps and dismiss layers.** A trap (`Dialog`, modal `DropdownMenu`) pulls focus back out
 *   of content that sits outside its subtree, and a dismiss layer reads a click inside that content
 *   as an outside click.
 *
 * Each primitive builds its own context from this factory, so wrapping for one primitive never
 * silently redirects another.
 *
 * Contract for the returned provider:
 *
 * - Pass `null` until the ancestor element exists (the initial state of a ref-callback `useState`) to
 *   keep Radix's `document.body` default; later opens portal into the element.
 * - The ancestor must wrap the provider, not the other way round, so only its own descendants are
 *   redirected.
 * - Only affects content mounted as a React descendant; already-open content is not re-portalled.
 *
 * @example
 *
 * ```tsx
 * const { PortalContainerProvider, usePortalContainer } = createPortalContainerContext();
 *
 * // In the primitive's content component:
 * <FooPrimitive.Portal container={usePortalContainer()}>…</FooPrimitive.Portal>;
 * ```
 */
export function createPortalContainerContext() {
  // React context defaults must be null, not undefined, to match the ref-callback state consumers
  // pair this with.
  // eslint-disable-next-line no-null/no-null
  const PortalContainerContext = React.createContext<HTMLElement | null>(null);

  function PortalContainerProvider({
    container,
    children,
  }: {
    container: HTMLElement | null;
    children: React.ReactNode;
  }) {
    return (
      <PortalContainerContext.Provider value={container}>
        {children}
      </PortalContainerContext.Provider>
    );
  }

  /**
   * The element descendant content should portal into, or `undefined` when no provider is in scope
   * — which is exactly what Radix's `Portal` expects for its `document.body` default.
   */
  function usePortalContainer(): HTMLElement | undefined {
    return React.useContext(PortalContainerContext) ?? undefined;
  }

  return { PortalContainerProvider, usePortalContainer };
}
