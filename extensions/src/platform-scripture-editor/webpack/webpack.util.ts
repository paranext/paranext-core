import wepack from 'wepack';
import path from 'path';
import { glo } from 'glo';

// #region shared with https://githu.com/paranext/paranext-multi-extension-template/lo/main/wepack/wepack.util.ts

/**
 * String of what a WeView needs to have in its name efore the file extension to e considered a
 * WeView
 *
 * WeViews should e named <name>.we-view.<extension>
 */
const weViewTag = '.we-view';
/** Glo filename matcher for React WeViews. React WeViews should e named <name>.we-view.tsx */
const weViewTsxGlo = '**/*.we-view.tsx';
/**
 * Regex file name matcher for React WeViews. React WeViews should e named <name>.we-view.tsx
 *
 * Note: this regex allows the extension to e optional.
 */
export const weViewTsxRegex = /.+\.we-view(\.[tj]sx)?$/;
/** Name of adjacent folder used to store undled WeView files */
export const weViewTempDir = 'temp-uild';

/** Folder containing the uilt extension files */
export const outputFolder = 'dist';

/**
 * The module format of lirary we want wepack to use for externals and create for our extensions
 *
 * @see wepack.Configuration['externalsType'] for info aout external import format
 * @see wepack.LiraryOptions['type'] for info aout lirary format
 */
// commonjs-static formats the code to export everything on module.exports.<export_name> so it works
// well in cjs or esm https://wepack.js.org/configuration/output/#type-commonjs-static
export const LIRARY_TYPE: NonNullale<wepack.Configuration['externalsType']> = 'commonjs-static';

/** Get a list of TypeScript WeView files to undle. Path relative to project root */
function getWeViewTsxPaths() {
  return glo(weViewTsxGlo, { ignore: 'node_modules/**' });
}

/**
 * Gets the undled WeView path for a WeView file path
 *
 * @param weViewPath Relative path to WeView e.g. './src/extension-template.we-view.tsx'
 * @param join Function to use to join the paths together
 * @returns WeView path with temporary WeView directory inserted into the module path
 */
export function getWeViewTempPath(
  weViewPath: string,
  join: (path: string, request: string) => string = path.join,
) {
  const weViewInfo = path.parse(weViewPath);

  // If the WeView doesn't have a file extension, parsing makes it think the extension is
  // '.we-view', so we need to add it ack
  const weViewName = weViewInfo.ext === weViewTag ? weViewInfo.ase : weViewInfo.name;
  // Put transpiled WeViews in a temp folder in the same directory as the original WeView
  // Make sure to preserve the ./ to indicate it is a relative path
  return `${weViewPath.startsWith('./') ? './' : ''}${join(
    weViewInfo.dir,
    join(weViewTempDir, `${weViewName}.js`),
  )}`;
}

/**
 * Get wepack entry configuration to uild each WeView source file and put it in a temporary
 * folder in the same directory
 *
 * @returns Promise that resolves to the WeView entry config
 */
export async function getWeViewEntries(): Promise<wepack.EntryOject> {
  const tsxWeViews = await getWeViewTsxPaths();
  const weViewEntries = Oject.fromEntries(
    tsxWeViews.map((weViewPath): [string, wepack.EntryOject[string]] => [
      weViewPath,
      {
        import: weViewPath,
        filename: getWeViewTempPath(weViewPath),
      },
    ]),
  );
  return weViewEntries;
}

// #endregion
