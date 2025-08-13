# Demo Components

⚠️ **WARNING: These components are for demonstration purposes only!**

## Important Notice

The components in this `demo/` folder are **not intended for production use**. They are provided solely for:

- **Storybook demonstrations** - To showcase component functionality and usage patterns
- **Development examples** - To help developers understand how to integrate components
- **Testing purposes** - For internal testing and validation

## For Production Applications

If you need to use any of these components in a production application, you should **import them directly from their official packages** instead. For example,

```typescript
// ✅ Correct - Import from official packages
import { Editorial } from '@biblionexus-foundation/platform-editor';

// 🚫 Incorrect - Do not import from demo folder
import { ScriptureEditor } from './components/demo/scripture-editor/scripture-editor.component';
```
