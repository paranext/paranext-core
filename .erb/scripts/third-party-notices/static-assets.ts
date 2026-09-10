import * as fs from 'fs';
import * as path from 'path';
import { compareStrings } from './compare';
import { sha256Bytes } from './lock';
import { isLicenseTextFileName, isNoticeFileName } from './package-files';
import type { NamedText, Policy } from './types';

/**
 * The third-party files this repository copies rather than compiles, which reach NONE of this
 * pipeline's four sources.
 *
 * `collectShippedPackages` derives the npm half from webpack's module manifests, a stylesheet leaf
 * scan and `release/app`'s closure - all three of which describe MODULES. The static trees are not
 * compiled at all, and `electron-builder.json5` packs two of them into every installer as
 * `extraResources`: an extension's `assets/` and `public/`, which `copy-webpack-plugin` copies
 * wholesale into `extensions/dist` (see `extensions/webpack/webpack.util.ts`'s `staticFiles`), and
 * `./assets/**` at the repository root. So an icon, a font or a data file with its own terms is
 * redistributed by every artifact this repository produces while being invisible to everything that
 * decides what the notices document says.
 *
 * This is not hypothetical: `extensions/src/quick-verse/assets/letter-q.png` carries its own
 * `ATTRIBUTION.md` naming an author and terms, and ships in every installer. The one comparable
 * case covered WITHOUT a gate - the UBS lexical database - is hand-written prose in `render.ts`, a
 * paragraph somebody remembered to write: nothing there catches the next third-party asset.
 *
 * The gate is an INVENTORY rather than an identifier: what these trees hold is arbitrary binary
 * content, and licensee has nothing to read. So the rule is that every notice-shaped file under
 * them must be recorded in `notices-policy.json`, exactly as `snapStagePackages` requires every
 * staged Ubuntu library to be classified there. An unrecorded one refuses the build.
 *
 * TODO(PT-4560): the inventory sees only notice-SHAPED FILENAMES, so a third-party file whose terms
 * are stated in no file beside it is invisible to this gate, and it ships anyway. Not hypothetical:
 * `c-sharp/base-directory-assets/IP-Country.zip` shipped that way until a human noticed it and
 * wrote the `ATTRIBUTION.md` that now covers it. Closing the gap needs a recorded inventory of what
 * the packed trees CONTAIN rather than of the notices they happen to carry, and such an assertion
 * is build-dependent - so where it lives is a design question rather than a wider pattern here.
 * https://paratextstudio.atlassian.net/browse/PT-4560
 */

/**
 * A filename whose FIRST word states terms - `LICENSE`, `LICENSE-MIT`, `NOTICE.txt`, `SOURCE.md`.
 *
 * Anchored, so it matches whatever extension the file carries, including none.
 */
const NOTICE_FILE_PREFIX = /^(attribution|licen[cs]e|notice|copying|credits?|source)\b/i;

/**
 * A word that states terms, matched ANYWHERE in the filename.
 *
 * The anchored pattern above reads only the first word, which misses every convention that puts a
 * qualifier in front of it: `ThirdPartyNotices.txt` (Microsoft's, and the one `typescript` and
 * `monaco-editor` ship), `CopyrightNotice.txt`, `NODE-LICENSE.md`, `THIRD-PARTY-NOTICES.md` - the
 * name this repository itself uses. `LICENSES` is missed for a subtler reason: `licen[cs]e\b`
 * cannot match it, because `E`->`S` is not a word boundary, so Electron's own
 * `LICENSES.chromium.html` reads as an ordinary asset.
 *
 * Unanchored matching needs a guard against source files, or every `attributes.d.ts` and
 * `IconCopyright.mjs` in a copied tree becomes a policy entry. The extension test below is that
 * guard: a standalone statement of terms is a text document or has no extension at all.
 */
const NOTICE_WORD =
  /(licen[cs]e|notices?|copying|copyright|attributions?|credits?|authors?|patents?)/i;

/**
 * Extensions a standalone statement of terms uses. Anything else with these words in it is code.
 *
 * `rtf` is on the list even though `package-files.ts` denies it: that module's list decides what
 * may be REPRODUCED inside the document, where RTF markup would be noise, while this one decides
 * what has to be RECORDED. `NOTICE.rtf` is an ordinary spelling for a notice authored on Windows,
 * and a notice this gate cannot see is a notice nobody has to account for.
 */
const NOTICE_DOCUMENT = /\.(txt|md|markdown|rst|html?|text|rtf)$/i;

/** Whether a file's name says it states terms for the files beside it. */
function statesTerms(name: string): boolean {
  // A dotfile is configuration, never a notice - and `.gitattributes` matches `attributes`.
  if (name.startsWith('.')) return false;
  // `package-files.ts` asks the same question of a package directory, and answers it with a DENYLIST
  // of the extensions a statement of terms never has plus a stem match. Reused rather than restated,
  // because the two patterns below cannot reach the commonest license filenames there are: an
  // extension ALLOWLIST rejects `COPYING.LESSER` - the standard LGPL filename - along with
  // `LICENSE.GPL` and `LICENSE.MIT`, and this is the gate that exists because third-party content
  // shipped undisclosed. Failing open on the ordinary case is the way it stops being a gate.
  if (isLicenseTextFileName(name) || isNoticeFileName(name)) return true;
  // The rest of the vocabulary, which a package root has no need of and a copied asset tree does: an
  // asset states its terms in `ATTRIBUTION.md`, `SOURCE.md`, `CREDITS`, `AUTHORS` or `COPYRIGHT` as
  // readily as in a `LICENSE`, and `extensions/src/quick-verse/assets/ATTRIBUTION.md` is the live
  // case this module was written for.
  //
  // The file-type test bounds BOTH branches below. `license` is a word boundary in `license.png`, so
  // the prefix branch alone flagged an icon as a statement of terms - which then reached
  // `staticAssetNoticeTexts` and was read as UTF-8 into a fenced block of replacement characters.
  if (!NOTICE_DOCUMENT.test(name) && path.extname(name)) return false;
  return NOTICE_FILE_PREFIX.test(name) || NOTICE_WORD.test(name);
}

/**
 * The per-extension trees `copy-webpack-plugin` copies into `extensions/dist` verbatim.
 *
 * `contributions/` belongs here for the same reason `assets/` and `public/` do - the copy patterns
 * in `extensions/webpack/webpack.util.ts` and in every per-extension `webpack.config.main.ts` copy
 * all three wholesale, so a notice file dropped in any of them reaches every installer with no
 * webpack module compiled for it and nothing else in this pipeline able to see it.
 */
export const STATIC_TREES = ['assets', 'public', 'contributions'];

/**
 * Extensions whose whole source directory `copy-webpack-plugin` copies, not just the static trees.
 *
 * `extensions/src/evil` is copied wholesale so that its deliberately-misbehaving source ships as
 * source. Reading only `STATIC_TREES` under it would miss a notice file anywhere else in the tree.
 */
export const WHOLESALE_COPIED_EXTENSIONS = ['evil'];

/**
 * The trees `ParanextDataProvider.csproj` copies into the .NET publish output verbatim.
 *
 * `<Content Include="assets\**\*.*">` and `<Content Include="base-directory-assets\*.*">` put them
 * beside the executable, and `electron-builder.json5` packs the whole publish directory as
 * `./dotnet/` - so they reach every installer by the same mechanism an extension's `assets/` does,
 * and are equally invisible to a pipeline that reads webpack manifests and npm lockfiles.
 *
 * They carry third-party content: `c-sharp/assets/Attribution.md` names ubsicap/usfm for `usfm.sty`
 * and ebible.org for everything under `WEB/`, and `base-directory-assets/IP-Country.zip` is
 * geolocation data with its own terms.
 */
const DOTNET_STATIC_TREES = [
  path.join('c-sharp', 'assets'),
  path.join('c-sharp', 'base-directory-assets'),
];

/**
 * Every tree an installer packs verbatim, so every tree this gate has to read.
 *
 * `extraResources` names three sources, not one: `./extensions/dist/` (which is where
 * `copy-webpack-plugin` puts each extension's `assets/`, `public/` and `contributions/`),
 * `./assets/**` at the repository root, and the .NET publish output that carries
 * `DOTNET_STATIC_TREES`. All reach every installer by the same mechanism, so a notice file is
 * equally invisible and equally redistributed in any of them. The root tree holds only first-party
 * icons, entitlements and localization today; the point of reading it is that nothing else would
 * notice when that stops being true.
 *
 * `extensions/src/evil` is copied WHOLESALE rather than tree by tree (see `webpack.util.ts`), so
 * the whole extension directory is read for it - anything under it ships.
 *
 * Read from `extensions/src` and deliberately NOT from `extensions/dist`, which is where an
 * installer actually takes these files from. Two reasons, both about what this gate is for. It is a
 * COMMITTED-content gate: every file it finds is hash-pinned in `notices-policy.json` by its
 * repo-relative source path and reproduced verbatim from there (`staticAssetNoticeTexts`), so a
 * `dist` path would pin build output that no reviewer reads and no clone holds. And `dist` is empty
 * until something builds it, so a gate reading it would pass by finding nothing - silence on the
 * exact question it exists to refuse a build over. `packedExtensionNames` reads `dist` because it
 * asks the opposite question: not "what is committed" but "did this build carry it".
 */
function packedStaticTrees(repo: string): string[] {
  const trees: string[] = [];

  const extensionsRoot = path.join(repo, 'extensions', 'src');
  if (fs.existsSync(extensionsRoot))
    fs.readdirSync(extensionsRoot, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .forEach((extension) =>
        trees.push(
          ...(WHOLESALE_COPIED_EXTENSIONS.includes(extension.name)
            ? [path.join(extensionsRoot, extension.name)]
            : STATIC_TREES.map((tree) => path.join(extensionsRoot, extension.name, tree))),
        ),
      );

  trees.push(path.join(repo, 'assets'));
  trees.push(...DOTNET_STATIC_TREES.map((tree) => path.join(repo, tree)));

  return trees.filter((tree) => fs.existsSync(tree));
}

/**
 * The extensions whose trees an installer packs, by folder name.
 *
 * `electron-builder.json5` packs `./extensions/dist/` as `extraResources`, so the BUILT directory
 * is the set of extensions the artifact contains, and it is what this reads - `extensions/src`
 * answers "is this folder in git", which is a different question and one an installer does not ask.
 * The two only diverge where a build is incomplete or an extension has been added but not yet
 * built, and that divergence is the whole point: a section of the notices document describing what
 * one extension redistributes is gated on the extension having actually been carried into this
 * build.
 *
 * The only caller is on the full-report path, which already requires a completed build.
 *
 * A MISSING `extensions/dist` throws rather than reading as "this build packs no extensions". The
 * two are indistinguishable from the directory listing and their consequences are opposite: an
 * empty answer silently drops every gated prose section from the document AND from the lock written
 * beside it in the same run, so the byte-compare that catches a stale artifact cannot catch a short
 * one - the two agree with each other. `extensions/src` could never be absent in a clone, so
 * reading `dist` is what introduces the state, and refusing it is what keeps this a gate.
 */
export function packedExtensionNames(repo: string): string[] {
  const extensionsRoot = path.join(repo, 'extensions', 'dist');
  if (!fs.existsSync(extensionsRoot))
    throw new Error(
      `${path.relative(repo, extensionsRoot)} does not exist, so this run cannot establish which ` +
        'extensions the installers carry. Sections of the document are gated on that set, and an ' +
        'empty answer would drop them silently. Build the extensions first:\n' +
        '    npm run build\n' +
        '    npm run build:extensions:production',
    );
  return fs
    .readdirSync(extensionsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort(compareStrings);
}

/** An extension's own `LICENSE`, which this repository writes and ships with every extension. */
const FIRST_PARTY_EXTENSION_LICENSE = /^extensions\/src\/[^/]+\/LICENSE$/;

/** Every notice-shaped file under a packed static tree, repo-relative and sorted. */
export function findStaticAssetNotices(repo: string): string[] {
  const found: string[] = [];
  const walk = (dir: string) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
        return;
      }
      if (statesTerms(entry.name)) found.push(path.relative(repo, full).split(path.sep).join('/'));
    });
  };

  packedStaticTrees(repo).forEach(walk);

  // An extension's own top-level `LICENSE` is this repository's text, not a third-party notice: the
  // copy patterns put one in every extension's output beside the manifest that declares it, and
  // `extension-licenses.test.ts` is the gate for those. It only reaches this walk for an extension
  // copied wholesale, and recording it here would have the document reproduce the whole AGPL under
  // a heading that says these texts came from third parties.
  return found.filter((file) => !FIRST_PARTY_EXTENSION_LICENSE.test(file)).sort(compareStrings);
}

/** Sha256 of a file's exact bytes, as `staticAssetNotices` records them. */
function sha256Of(file: string): string {
  return sha256Bytes(fs.readFileSync(file));
}

/**
 * Refuses a build whose copied static assets carry terms the policy does not record.
 *
 * Two entry shapes, and the difference is reviewable rather than inferred:
 *
 * - `sha256` recorded: a TRACKED file, whose text is reproduced verbatim in the document. Pinned for
 *   the same reason a vendored license text is (`vendored-text.ts`) - it is a legal text somebody
 *   read, so an edited copy is a changed claim.
 * - `notTracked: true`: a file that is not in the repository, because it is fetched at install time
 *   (the lexical database's `LICENSE.md` and `SOURCE.md`). There is nothing stable to pin and the
 *   document describes it in prose instead, so the entry records the acknowledgement. The flag is
 *   required rather than inferred from a missing hash, so "no hash" cannot mean "nobody looked".
 */
export function assertStaticAssetNoticesRecorded(repo: string, policy: Policy): void {
  const recorded = policy.staticAssetNotices || {};
  const found = findStaticAssetNotices(repo);

  const unrecorded = found.filter((file) => !recorded[file]);
  if (unrecorded.length)
    throw new Error(
      `${unrecorded.length} third-party notice file(s) ship inside a copied static asset tree ` +
        `and are recorded nowhere:\n  ${unrecorded.join('\n  ')}\n` +
        "electron-builder packs these trees into every installer verbatim - each extension's " +
        'assets/ and public/ by way of extensions/dist, ./assets/** at the repository root, and ' +
        "the .NET publish output's copies of c-sharp/assets and c-sharp/base-directory-assets - " +
        'so nothing else in this pipeline can see them: webpack compiles no module for a copied ' +
        'file, and neither npm nor NuGet describes one. Record each in notices-policy.json under ' +
        '"staticAssetNotices", e.g.:\n' +
        `${unrecorded
          .map(
            (file) =>
              `    ${JSON.stringify(file)}: {\n` +
              `      "reason": "<what this file states, and for which asset - one sentence>",\n` +
              `      "sha256": "${sha256Of(path.join(repo, file))}"\n` +
              '    }',
          )
          .join(',\n')}`,
    );

  const mismatched = found
    .filter(
      (file) => recorded[file].sha256 && recorded[file].sha256 !== sha256Of(path.join(repo, file)),
    )
    .map(
      (file) =>
        `${file} (recorded ${recorded[file].sha256}, found ${sha256Of(path.join(repo, file))})`,
    );
  if (mismatched.length)
    throw new Error(
      `${mismatched.length} recorded static asset notice(s) no longer hash to what the notices ` +
        `policy records:\n  ${mismatched.join('\n  ')}\n` +
        'The text is reproduced verbatim in the document, so an edited copy is a changed legal ' +
        'claim - re-read it and update the entry, or restore the file.',
    );

  // Every entry with neither field, whether or not the file happens to be on disk. Testing only the
  // absent ones would let a PRESENT file with an unpinned entry through - which is the worse case,
  // since its text is then reproduced by nothing and checked by nothing.
  // A hash-pinned entry whose file is gone reaches neither of the checks above - both iterate the
  // files found ON DISK - and `unreviewed` skips it because it HAS a sha256. Without this the run
  // reached `staticAssetNoticeTexts` and died on a bare ENOENT naming no policy and no remedy,
  // after the Ruby batch and four `dotnet restore` passes had already run.
  const missing = Object.entries(recorded)
    .filter(([file, entry]) => entry.sha256 && !fs.existsSync(path.join(repo, file)))
    .map(([file]) => file)
    .sort(compareStrings);
  if (missing.length)
    throw new Error(
      `${missing.length} hash-pinned "staticAssetNotices" entr(y|ies) name a file that is not in ` +
        `the repository:\n  ${missing.join('\n  ')}\n` +
        'The document reproduces each of these verbatim, so the entry cannot be honoured. Restore ' +
        'the file, or remove the entry from notices-policy.json if the asset it covered has gone.',
    );

  const unreviewed = Object.entries(recorded)
    .filter(([, entry]) => !entry.sha256 && !entry.notTracked)
    .map(([file]) => file)
    .sort(compareStrings);
  if (unreviewed.length)
    throw new Error(
      `${unreviewed.length} "staticAssetNotices" entr(y|ies) record neither a sha256 nor ` +
        `"notTracked": true:\n  ${unreviewed.join('\n  ')}\n` +
        'A missing hash has to say whether it is deliberate - a file fetched at install time has ' +
        'nothing stable to pin - or the entry records that nobody read the file.',
    );
}

/**
 * The texts the document reproduces on behalf of copied static assets.
 *
 * Only the hash-pinned entries: an install-time file has no committed copy to reproduce, and
 * reproducing whatever happened to be on the generating machine would put a text into a legal
 * artifact that no other run could reproduce.
 */
export function staticAssetNoticeTexts(repo: string, policy: Policy): NamedText[] {
  return Object.entries(policy.staticAssetNotices || {})
    .filter(([, entry]) => entry.sha256)
    .map(([file]) => ({ name: file, text: fs.readFileSync(path.join(repo, file), 'utf8') }))
    .sort((a, b) => compareStrings(a.name, b.name));
}
