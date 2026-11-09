// Bare Electron entry point for interface-scaling.spec.ts, which creates and drives every window itself.
const { app } = require('electron');

// Keep, though empty: without a `window-all-closed` listener, `electronApp.close()` hangs.
app.on('window-all-closed', () => {});
