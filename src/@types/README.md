# Project Types

This folder contains TypeScript types for local JavaScript files and overrides of npm packages.

Name the file for the package, i.e. `<packageName>.d.ts`. If you need supporting files in a folder then use `<packageName>/index.d.ts`.

In the file:

```typescript
declare module '<packageName>' {
  // add additions and overrides here
}
```
