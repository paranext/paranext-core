const { execFileSync } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const REPO = path.resolve(__dirname, '..', '..', '..');
const SCRIPT = path.join(__dirname, 'detect.rb');

/**
 * Detects license texts for many directories in ONE Ruby process.
 *
 * Ruby's interpreter start-up is roughly 200ms. Invoking it per package across a 262-package
 * shipping set would spend about a minute doing nothing but booting. detect.rb loads licensee once
 * and iterates a directory list instead.
 *
 * @param {string[]} dirs Absolute package directories.
 * @returns {Map<string, { dir: string; files: object[] }>} Keyed by directory.
 */
function identify(dirs) {
  if (dirs.length === 0) return new Map();

  const out = execFileSync('bundle', ['exec', 'ruby', SCRIPT], {
    cwd: REPO,
    input: dirs.join('\n'),
    encoding: 'utf8',
    // License texts are reproduced in full, so the payload is megabytes, not kilobytes.
    maxBuffer: 256 * 1024 * 1024,
  });

  return new Map(JSON.parse(out).map((entry) => [entry.dir, entry]));
}

/**
 * Identifies a single license text. Used by the corpus test, which holds texts rather than
 * directories; production callers use `identify`, which batches.
 *
 * @param {string} text
 * @returns {Promise<{ spdxId: string; confidence: number; matcher: string }>}
 */
async function identifyText(text) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'notices-identify-'));
  try {
    fs.writeFileSync(path.join(dir, 'LICENSE'), text);
    const [entry] = [...identify([dir]).values()];
    if (!entry || entry.files.length === 0)
      return { spdxId: 'NONE', confidence: 0, matcher: 'none' };
    const { spdxId, confidence, matcher } = entry.files[0];
    return { spdxId, confidence, matcher };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

module.exports = { identify, identifyText };
