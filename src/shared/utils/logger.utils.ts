import { ProcessType } from '@shared/global-this.model';
import { includes, split } from 'platform-bible-utils';
import { getProcessType, isRenderer } from '@shared/utils/internal-util';
import chalk from 'chalk';
import { MainLogger, RendererLogger } from 'electron-log';

/**
 * When `platform.privacyMode` is enabled, log output strips the user's home directory, OS username,
 * and Paratext display name from any text so that logs the user shares don't reveal their identity.
 * The renderer doesn't have access to `os.homedir()` so the home dir is set from the node-side
 * `logger.service` before any logging occurs; the renderer leaves it empty and falls back to no
 * stripping (renderer stack traces are bundler URLs that don't contain the home directory anyway).
 */
let privacyModeEnabled = false;
let homeDirToStrip = '';
let usernameToStrip = '';
/**
 * Patterns derived from the Paratext registered display name (and its URL-encoded variants) that
 * appear in .NET REST URLs and other log output. Each entry is a literal substring; the longest are
 * tried first so a substring match doesn't preempt a longer form.
 */
let displayNamePatterns: string[] = [];

const HOME_PLACEHOLDER = '**user_home**';
const USERNAME_PLACEHOLDER = '***';

/**
 * Update the cached home directory (and derived username) used to anonymize paths when privacy mode
 * is on. The username is the final path segment of the home directory (e.g. `<user>` for
 * `C:\Users\<user>`) and is matched as a standalone word so unrelated text that happens to contain
 * the same letters isn't clobbered.
 */
export function setLoggerHomeDir(homeDir: string): void {
  if (typeof homeDir !== 'string' || homeDir.length <= 1) {
    homeDirToStrip = '';
    usernameToStrip = '';
    return;
  }
  homeDirToStrip = homeDir;
  // Last non-empty segment of the home dir is the OS username on every platform we ship for.
  const segments = homeDir.split(/[\\/]/).filter((s) => s.length > 0);
  usernameToStrip = segments.length > 0 ? segments[segments.length - 1] : '';
}

/**
 * Register the user's Paratext display name so it (and its URL-encoded variants) are masked from
 * log output when privacy mode is on. Pass an empty string to clear it. The .NET REST URLs and
 * registration-related logs surface the name as plain text, `<First>+<Last>` (form-encoded), and
 * `<First>%20<Last>` (percent-encoded); we generate all three.
 */
export function setLoggerDisplayName(name: string): void {
  if (typeof name !== 'string' || name.trim().length === 0) {
    displayNamePatterns = [];
    return;
  }
  const trimmed = name.trim();
  const variants = new Set<string>([
    trimmed,
    trimmed.replace(/ /g, '+'),
    encodeURIComponent(trimmed),
  ]);
  // Longest first so e.g. a substring of one variant doesn't preempt the full-length match of
  // another that contains it.
  displayNamePatterns = [...variants]
    .filter((v) => v.length > 0)
    .sort((a, b) => b.length - a.length);
}

/** Toggle privacy mode for log output. Wired up from the settings service. */
export function setLoggerPrivacyMode(enabled: boolean): void {
  privacyModeEnabled = !!enabled;
}

/** Escape a string so it can be embedded literally in a `RegExp` source. */
function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Defense-in-depth pattern: query-string params whose values are user identifiers and should always
 * be masked under privacy mode, regardless of whether the async registration fetch in
 * `settings.service.ts` has populated `displayNamePatterns` yet. This catches `.NET` REST URLs that
 * fire before the JS side learns the user's display name (e.g. `?username=<First>%20<Last>`). The
 * value part is `[^&\s]+` — everything up to the next param separator or whitespace, which covers
 * percent-encoded spaces and other reserved chars in the value.
 */
const PII_QUERY_PARAM_REGEX = /([?&](?:username|user|email|name)=)[^&\s]+/gi;

/**
 * If privacy mode is enabled, scrub `text` in several passes:
 *
 * 1. Replace every form of the home directory with `**user_home**`. Three representations appear in
 *    our logs on Windows: native backslashes (`C:\Users\<user>`), forward slashes
 *    (`C:/Users/<user>`, e.g. from `file://` URIs), and JSON-escaped double backslashes
 *    (`C:\\Users\\<user>`, e.g. when a path is embedded in a JSON payload that gets logged
 *    verbatim). Order matters here: replace the doubled variant first so its component
 *    single-backslash form doesn't partially match.
 * 2. Replace any remaining standalone occurrences of the OS username (the last segment of the home
 *    dir) with `***`. Caught by `\b…\b` so we only match it as a word — this catches version
 *    strings like `0.3.0+<user>-dev.<sha>` (build metadata seeded from the dev machine) without
 *    mangling unrelated identifiers that happen to contain the same letters.
 * 3. Replace every known variant of the Paratext display name (plain + URL-encoded) with `***`.
 * 4. Mask the value of any `username=` / `user=` / `email=` / `name=` query-string param. This pass
 *    doesn't depend on knowing the display name and is what guarantees `.NET` REST URLs don't leak
 *    even if the registration data hasn't been fetched yet.
 */
function anonymizePath(text: string): string {
  if (!privacyModeEnabled) return text;
  let result = text;
  if (homeDirToStrip) {
    const doubleBackslashHome = homeDirToStrip.replace(/\\/g, '\\\\');
    if (doubleBackslashHome !== homeDirToStrip) {
      result = result.split(doubleBackslashHome).join(HOME_PLACEHOLDER);
    }
    result = result.split(homeDirToStrip).join(HOME_PLACEHOLDER);
    const forwardSlashHome = homeDirToStrip.replace(/\\/g, '/');
    if (forwardSlashHome !== homeDirToStrip) {
      result = result.split(forwardSlashHome).join(HOME_PLACEHOLDER);
    }
  }
  if (usernameToStrip) {
    const usernameRegex = new RegExp(`\\b${escapeRegExp(usernameToStrip)}\\b`, 'g');
    result = result.replace(usernameRegex, USERNAME_PLACEHOLDER);
  }
  // Display-name variants are matched as plain substrings (no word boundary) so the URL-encoded
  // forms that contain `+` or `%20` — which `\b` treats as boundaries themselves — still match.
  displayNamePatterns.forEach((pattern) => {
    if (pattern.length > 0) result = result.split(pattern).join(USERNAME_PLACEHOLDER);
  });
  result = result.replace(PII_QUERY_PARAM_REGEX, `$1${USERNAME_PLACEHOLDER}`);
  return result;
}

/** Represents details that can be parsed from a single line of an Error object */
type ParsedErrorLine =
  | {
      functionName: string;
      fileName: string;
      lineNumber: number;
      columnNumber: number;
    }
  | undefined;

/**
 * Destructure a line from an Error object
 *
 * @param errorLine Single line from an Error object string
 * @returns Object containing the function name, file name, line number, and column number from the
 *   line of the Error object string. If the line couldn't be parsed, then undefined.
 */
function parseErrorLine(errorLine: string): ParsedErrorLine {
  // A few example lines to parse:
  // "    at functionName (filename.js:15:27)"
  // "at /home/username/paranext-core/src/shared/services/logger.service.ts:119:22"
  // "     at Timeout.i [as _onTimeout] (/home/username/paranext-core/extensions/dist/evil/evil.js:1:591)"
  const regex = /at[\s+]?([\w .[\]<>]+)?\s+\(?(.*?):(\d+):(\d+)\)?$/;
  const matches = errorLine.match(regex);

  // This console log is helpful if you need to see why some Error line isn't parsing as expected
  // eslint-disable-next-line no-console
  // console.log(`**** LINE: ${errorLine}\nResulting filename: ${matches?.at(2)}`);

  if (matches && matches.length === 5) {
    // `_` is a required positional placeholder for the full match; the naming convention rule flags it.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    const [_, functionName, fileName, lineNumber, columnNumber] = matches;
    return {
      functionName,
      fileName,
      lineNumber: parseInt(lineNumber, 10),
      columnNumber: parseInt(columnNumber, 10),
    };
  }
  if (matches && matches.length === 4) {
    // `_` is a required positional placeholder for the full match; the naming convention rule flags it.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/naming-convention
    const [_, fileName, lineNumber, columnNumber] = matches;
    return {
      functionName: '',
      fileName,
      lineNumber: parseInt(lineNumber, 10),
      columnNumber: parseInt(columnNumber, 10),
    };
  }
  return undefined;
}

/**
 * Examine the call stack and return a parsed string containing the function name, file name, line
 * number, and column number where the call to the logger was made.
 *
 * @returns String that is suitable to attach to log output to indicate who what code wants to log
 */
function identifyCaller(): string | undefined {
  const { stack } = new Error();
  if (!stack) return undefined;
  let details: ParsedErrorLine;
  const lines = split(stack, '\n');
  // Start at 3 to skip the "Error" line, this function's stack frame, and this function's caller
  for (let lineNumber = 3; lineNumber < lines.length; lineNumber += 1) {
    // Skip over all logging library frames to get to the real call
    if (!includes(lines[lineNumber], 'node_modules') && !includes(lines[lineNumber], 'node:')) {
      details = parseErrorLine(lines[lineNumber]);
      if (details) break;
    }
  }
  if (!details) return '';
  const functionName = details.functionName ? `${details.functionName} ` : '';
  // Renderer doesn't have access to `process`, so we're just gonna go with it
  const rawFilePath =
    isRenderer() || process.platform === 'win32' ? details.fileName : `file://${details.fileName}`;
  const filePath = anonymizePath(rawFilePath);
  return `[at ${functionName}${filePath}:${details.lineNumber}:${details.columnNumber}]`;
}

/**
 * Format a string of a service message
 *
 * @param message Message from the service
 * @param serviceName Name of the service to show in the log
 * @returns Formatted string of a service message
 */
export function formatLog(message: string, serviceName: string) {
  // Remove the new line at the end of every message coming from stdout from other processes
  const messageTrimmed = message.trimEnd();
  const openTag = `[${serviceName}]`;
  if (includes(messageTrimmed, '\n')) {
    const closeTag = `[/${serviceName}]`;
    // Multi-line
    return `${openTag}\n${messageTrimmed}\n${closeTag}`;
  }
  return `${openTag} ${messageTrimmed}`;
}

/** Does shared setup on the logger in any process */
export function setUpLogger(log: MainLogger | RendererLogger) {
  // Make sure processType is loaded
  if (!Object.values(ProcessType).includes(getProcessType()))
    // Logger isn't fully set up yet, so falling back to raw `console.warn` for this early diagnostic.
    // eslint-disable-next-line no-console
    console.warn(chalk.yellow(`Unexpected process type: ${globalThis.processType}`));

  // insert formatting before logging
  log.transports.console.level = globalThis.logLevel;
  // Match console format to default file format so the renderer console logs can be sent to main
  // and recorded the same as main logs
  log.transports.console.format = '[{y}-{m}-{d} {h}:{i}:{s}.{ms}] [{level}] {text}';
  // Don't show main console logs in the renderer DevTools
  if (log.transports.ipc) log.transports.ipc.level = false;
  log.hooks.push((message) => {
    // Sanitize first so every code path through this hook anonymizes paths, including the two
    // early returns below for messages forwarded from other processes (the dotnet child, the
    // renderer-piped-through-main case). Those branches don't run the `data.map` further down,
    // so without this they'd leak the user's home directory in `.net`/renderer log lines.
    const sanitizedMessage = {
      ...message,
      data: message.data.map((logLine) =>
        typeof logLine === 'string' ? anonymizePath(logLine) : logLine,
      ),
    };

    // If we're piping through a log message from another process, don't add another file path
    // Messages from other processes all start with "[process name]"
    if (sanitizedMessage.data.some((logLine) => /^\s*\[[\w\d:\-. ]+\]/.test(logLine)))
      if (sanitizedMessage.variables?.processType === 'renderer')
        // And skip formatting if it comes from the renderer because it already has formatting
        return {
          ...sanitizedMessage,
          variables: {
            ...sanitizedMessage.variables,
            // Not sure when variables would not be defined, so dunno when this could happen
            processType: sanitizedMessage.variables?.processType ?? 'unknown',
            skipFormatting: true,
          },
        };
      else return sanitizedMessage;

    const caller = identifyCaller();

    let processName = 'unkn';
    switch (
      // Renderer's logs come in through main with `message.variables.processType` set to 'renderer'
      message.variables?.processType === 'renderer' ? ProcessType.Renderer : getProcessType()
    ) {
      case ProcessType.Main:
        processName = 'main';
        break;
      case ProcessType.ExtensionHost:
        processName = 'exth';
        break;
      case ProcessType.Renderer:
        processName = 'rend';
        break;
      default:
        // Not expecting unknown. dotnet is already handled in `dotnet-data-provider.service.ts`
        break;
    }

    return {
      ...sanitizedMessage,
      data: sanitizedMessage.data.map((logLine) =>
        formatLog(caller ? `${logLine} ${caller}` : `${logLine}`, processName),
      ),
    };
  });
}
