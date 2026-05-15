# Action Palette (not Command Palette)

The catch-all user-facing search/launcher surface is named the **Action Palette**, not the industry-standard "Command Palette." In this codebase, a Command is the machine-layer PAPI RPC (no UI concerns) and an Action is the user-facing wrapper (localized presentation, arg-flow, confirmation, dispatch to one Command). The palette lists Actions, so naming it the "Command Palette" — as VS Code, Linear, Notion, Figma, JetBrains, and shadcn's `cmdk`-based component all do — would reintroduce the exact term-overload that the Command/Action split exists to remove. We accept a small familiarity cost for users coming from those products in exchange for a vocabulary that stays internally coherent across microcopy, extension-authoring docs, and code.

## Considered alternatives

- **"Command Palette"** — industry standard, instant recognition for power users from other tools. Rejected because it conflicts with our domain term "Command" (machine-layer RPC) and would force every doc and microcopy string to mix "Command Palette" (the surface) with "Actions" (the items inside it).
- **Generic names** (Quick Open, Quick Actions, Quick Switcher) — avoid both overloads but lose the connection to the Action concept users will encounter elsewhere in the product (keybinding settings, menu items, extension manifests). Rejected for the same coherence reason that drove us away from "Command Palette."
