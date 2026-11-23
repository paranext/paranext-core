// Re-uses the Appearance + Theme toolbar tools registered for the platform-bible-react
// Storybook. Importing the lib manager triggers its `addons.register(...)` side effect, so
// the root Storybook gets the same toolbar controls without duplicating the implementation.
import '../lib/platform-bible-react/.storybook/manager';
