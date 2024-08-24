declare module '@senojs/rollup-plugin-style-inject' {
  type StyleInjectOptions = {
    insertAt?: 'top' | 'bottom';
  };

  // This should return `PluginOption` type from vite but this is only build config.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export default function styleInject(options?: StyleInjectOptions): any;
}
