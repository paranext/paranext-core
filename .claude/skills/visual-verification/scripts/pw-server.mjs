#!/usr/bin/env node
/**
 * Playwright Interaction Server
 *
 * A persistent server that connects to Platform.Bible via CDP and accepts
 * line-delimited JSON commands on stdin. Provides full UI interaction
 * capabilities: click, fill, press, screenshot, wait, eval, scroll, frame.
 *
 * Usage:
 *   node .claude/skills/visual-verification/scripts/pw-server.mjs
 *
 * Prerequisites:
 *   Platform.Bible running with --remote-debugging-port=9223
 *
 * Protocol:
 *   Send one JSON command per line on stdin.
 *   Receive one JSON response per line on stdout.
 *   Errors are also JSON responses with "error" field.
 *
 * Commands:
 *   {"cmd":"screenshot","output":"/tmp/ss.png"}
 *   {"cmd":"click","role":"button","name":"Save"}
 *   {"cmd":"click","selector":".my-class"}
 *   {"cmd":"click","text":"Save Changes"}
 *   {"cmd":"fill","selector":"input","text":"Genesis"}
 *   {"cmd":"fill","role":"textbox","name":"Search","text":"Genesis"}
 *   {"cmd":"press","key":"Enter"}
 *   {"cmd":"press","key":"Escape"}
 *   {"cmd":"wait","role":"dialog","timeout":10000}
 *   {"cmd":"wait","selector":".dock-tab","hasText":"About","timeout":10000}
 *   {"cmd":"text","selector":".title"}
 *   {"cmd":"text","role":"heading"}
 *   {"cmd":"visible","role":"button","name":"Save"}
 *   {"cmd":"visible","selector":".modal"}
 *   {"cmd":"eval","code":"document.title"}
 *   {"cmd":"scroll","selector":".content","down":500}
 *   {"cmd":"scroll","selector":".content","up":300}
 *   {"cmd":"frame","selector":"iframe[data-web-view-id]"}
 *   {"cmd":"frame-by-title","title":"Home"}
 *   {"cmd":"frame-reset"}
 *   {"cmd":"locators","role":"button"}
 *   {"cmd":"locators","selector":".dock-tab"}
 *   {"cmd":"snapshot"}
 *   {"cmd":"snapshot","roles":["button","textbox"]}
 *   {"cmd":"annotated-screenshot","output":"/tmp/annotated.png"}
 *   {"cmd":"annotated-screenshot","output":"/tmp/annotated.png","limit":30}
 *   {"cmd":"click-ref","ref":"@ref3"}
 *   {"cmd":"viewport","width":1920,"height":1080}
 *   {"cmd":"status"}
 *   {"cmd":"quit"}
 */

import { createRequire } from 'module';
import fs from 'fs';
import path from 'path';
import readline from 'readline';

// Resolve playwright from the repo root's node_modules. This script lives deep
// under .claude/skills/visual-verification/scripts/, so we anchor createRequire
// at the repo root's package.json (located by findParanextRoot) to resolve
// playwright reliably regardless of how the script is invoked.
function findParanextRoot() {
  const candidates = [
    // When invoked as: node paranext-core/.claude/skills/.../pw-server.mjs
    process.argv[1] ? path.resolve(path.dirname(process.argv[1]), '../../../..') : null,
    process.env.PARANEXT_ROOT,
    process.cwd(),
  ].filter(Boolean);

  for (const candidate of candidates) {
    if (fs.existsSync(path.join(candidate, 'node_modules', 'playwright'))) {
      return candidate;
    }
  }
  throw new Error(
    'Cannot find paranext-core root with playwright installed. ' +
    'Run from the paranext-core directory or set PARANEXT_ROOT env var.'
  );
}

const paranextRoot = findParanextRoot();
const require = createRequire(path.join(paranextRoot, 'package.json'));
const { chromium } = require('playwright');

const CDP_URL = process.env.CDP_URL || 'http://localhost:9223';

/** JSON response helper */
function respond(obj) {
  console.log(JSON.stringify(obj));
}

/** Error response helper */
function respondError(cmd, message) {
  respond({ cmd, error: message });
}

/** Build a locator from command parameters */
function buildLocator(page, params) {
  const { role, name, selector, text, hasText } = params;

  if (selector) {
    const loc = page.locator(selector);
    // Pass the raw string: Playwright matches hasText as a case-insensitive
    // substring by default. Wrapping in new RegExp() would treat regex
    // metacharacters in the param (e.g. "(", "[", "+") as syntax, which both
    // breaks literal matches like "Save (Ctrl+S)" / "[Beta]" and is unsafe.
    if (hasText) return loc.filter({ hasText });
    return loc;
  }

  if (role) {
    const opts = {};
    // Raw string: getByRole matches name as a case-insensitive substring by
    // default. See the hasText comment above re: regex metacharacters.
    if (name) opts.name = name;
    return page.getByRole(role, opts);
  }

  if (text) {
    // Raw string: getByText matches as a case-insensitive substring by default.
    return page.getByText(text);
  }

  return null;
}

/** Default set of ARIA roles considered "interactive" for snapshot/annotated-screenshot */
const DEFAULT_INTERACTIVE_ROLES = new Set([
  'button', 'link', 'textbox', 'checkbox', 'radio',
  'combobox', 'listbox', 'menuitem', 'menuitemcheckbox',
  'menuitemradio', 'option', 'searchbox', 'slider',
  'spinbutton', 'switch', 'tab', 'treeitem',
]);

/** Filter AX tree nodes to only interactive ones with a backing DOM node */
function filterInteractiveNodes(nodes, roles) {
  const allowedRoles = roles ? new Set(roles) : DEFAULT_INTERACTIVE_ROLES;
  return nodes.filter((node) => {
    if (node.ignored) return false;
    const role = node.role?.value;
    return role && allowedRoles.has(role) && node.backendDOMNodeId;
  });
}

/** Extract useful properties from an AX tree node */
function extractNodeProps(node) {
  const props = {};
  if (node.properties) {
    for (const prop of node.properties) {
      if (['focused', 'disabled', 'checked', 'expanded', 'pressed', 'selected'].includes(prop.name))
        props[prop.name] = prop.value?.value;
    }
  }
  if (node.value?.value !== undefined) props.value = String(node.value.value);
  return props;
}

async function main() {
  // Connect to CDP
  process.stderr.write(`[pw-server] Connecting to ${CDP_URL}...\n`);
  let browser;
  try {
    browser = await chromium.connectOverCDP(CDP_URL, { timeout: 10_000 });
  } catch (err) {
    respondError('connect', `Failed to connect to CDP at ${CDP_URL}: ${err.message}`);
    process.exit(1);
  }

  // Find the renderer page
  let page;
  for (const ctx of browser.contexts()) {
    for (const p of ctx.pages()) {
      const url = p.url();
      if (url.includes('localhost') || url.includes('index.html') || url.startsWith('file://')) {
        // Skip devtools
        if (!url.includes('devtools://')) {
          page = p;
          break;
        }
      }
    }
    if (page) break;
  }

  if (!page) {
    // Fallback to first non-devtools page
    for (const ctx of browser.contexts()) {
      for (const p of ctx.pages()) {
        if (!p.url().includes('devtools://')) {
          page = p;
          break;
        }
      }
      if (page) break;
    }
  }

  if (!page) {
    respondError('connect', 'No renderer page found');
    process.exit(1);
  }

  // Set a consistent viewport size for screenshots.
  // Electron defaults to 1024x728 window, yielding ~675x728 usable viewport.
  // Force 1920x1080 (Full HD) so screenshots capture the full UI layout.
  const viewportWidth = parseInt(process.env.PW_VIEWPORT_WIDTH, 10) || 1920;
  const viewportHeight = parseInt(process.env.PW_VIEWPORT_HEIGHT, 10) || 1080;
  await page.setViewportSize({ width: viewportWidth, height: viewportHeight });

  // Track current frame context (for frame switching)
  let currentFrame = page;

  // Ephemeral ref map for snapshot/annotated-screenshot → click-ref
  // Maps "@refN" → { backendDOMNodeId, frameId }
  let lastSnapshotRefMap = {};

  process.stderr.write(`[pw-server] Connected. Page: ${page.url()} (viewport: ${viewportWidth}x${viewportHeight})\n`);
  respond({ cmd: 'connected', url: page.url(), viewport: { width: viewportWidth, height: viewportHeight } });

  // Read commands from stdin
  const rl = readline.createInterface({ input: process.stdin });

  for await (const line of rl) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let params;
    try {
      params = JSON.parse(trimmed);
    } catch {
      respondError('parse', `Invalid JSON: ${trimmed}`);
      continue;
    }

    const { cmd } = params;
    const timeout = params.timeout || 10_000;

    try {
      switch (cmd) {
        case 'screenshot': {
          const output = params.output || '/tmp/pw-screenshot.png';
          const dir = output.substring(0, output.lastIndexOf('/'));
          if (dir) fs.mkdirSync(dir, { recursive: true });
          await page.screenshot({ path: output, fullPage: params.fullPage !== false });
          respond({ cmd: 'screenshot', path: output });
          break;
        }

        case 'click': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          await locator.click({ timeout });
          respond({ cmd: 'click', clicked: true });
          break;
        }

        case 'dblclick': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          await locator.dblclick({ timeout });
          respond({ cmd: 'dblclick', clicked: true });
          break;
        }

        case 'fill': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          await locator.fill(params.text || '', { timeout });
          respond({ cmd: 'fill', filled: true });
          break;
        }

        case 'type': {
          // Type character-by-character (useful when fill() doesn't trigger events)
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          await locator.pressSequentially(params.text || '', {
            delay: params.delay ?? 50,
            timeout,
          });
          respond({ cmd: 'type', typed: true });
          break;
        }

        case 'press': {
          if (params.selector || params.role) {
            const locator = buildLocator(currentFrame, params);
            if (locator) {
              await locator.press(params.key, { timeout });
            }
          } else {
            await page.keyboard.press(params.key);
          }
          respond({ cmd: 'press', key: params.key });
          break;
        }

        case 'wait': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          const state = params.state || 'visible';
          await locator.waitFor({ state, timeout });
          respond({ cmd: 'wait', found: true, state });
          break;
        }

        case 'wait-ms': {
          const ms = params.ms || 1000;
          await page.waitForTimeout(ms);
          respond({ cmd: 'wait-ms', ms });
          break;
        }

        case 'text': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          const textContent = await locator.first().textContent({ timeout });
          respond({ cmd: 'text', value: textContent });
          break;
        }

        case 'inner-text': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          const innerText = await locator.first().innerText({ timeout });
          respond({ cmd: 'inner-text', value: innerText });
          break;
        }

        case 'value': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          const val = await locator.first().inputValue({ timeout });
          respond({ cmd: 'value', value: val });
          break;
        }

        case 'visible': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          const isVisible = await locator.first().isVisible();
          respond({ cmd: 'visible', visible: isVisible });
          break;
        }

        case 'count': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          const count = await locator.count();
          respond({ cmd: 'count', count });
          break;
        }

        case 'eval': {
          const result = await currentFrame.evaluate(params.code);
          respond({ cmd: 'eval', value: result });
          break;
        }

        case 'scroll': {
          const locator = buildLocator(currentFrame, params);
          if (locator) {
            if (params.down) {
              await locator.evaluate((el, px) => el.scrollBy(0, px), params.down);
            } else if (params.up) {
              await locator.evaluate((el, px) => el.scrollBy(0, -px), params.up);
            } else if (params.left) {
              await locator.evaluate((el, px) => el.scrollBy(-px, 0), params.left);
            } else if (params.right) {
              await locator.evaluate((el, px) => el.scrollBy(px, 0), params.right);
            }
          } else {
            // Scroll the page
            const delta = params.down || -(params.up || 0);
            await page.mouse.wheel(0, delta);
          }
          respond({ cmd: 'scroll', scrolled: true });
          break;
        }

        case 'frame': {
          const frames = page.frames();
          let found = false;
          for (const f of frames) {
            if (f.url() !== page.url() && f.url() !== 'about:blank') {
              // Try to match by selector or URL
              if (params.url && f.url().includes(params.url)) {
                currentFrame = f;
                found = true;
                break;
              }
            }
          }

          if (!found && params.selector) {
            // Match the selector to a real frame element, then resolve its src
            // to a live frame. A selector that matches NO frame must be an
            // error — do NOT silently fall through to an arbitrary frame, since
            // that would report SUCCESS for the wrong frame.
            const selectorLocator = page.locator(params.selector);
            const selectorMatches = await selectorLocator.count();
            if (selectorMatches === 0) {
              respondError(cmd, `Selector "${params.selector}" matched no frame element.`);
              break;
            }
            const frameSrc = await selectorLocator.first().getAttribute('src', { timeout });
            if (frameSrc) {
              // Only match by src if it's non-null/non-empty (srcdoc iframes have no src)
              for (const f of frames) {
                if (f.url().includes(frameSrc)) {
                  currentFrame = f;
                  found = true;
                  break;
                }
              }
            } else if (params.index != null) {
              // src is null (srcdoc iframe) AND the caller explicitly asked for
              // an index — honor that intentional index-based selection.
              const idx = params.index;
              const nonMainFrames = frames.filter((f) => f !== page.mainFrame());
              if (idx <= nonMainFrames.length) {
                currentFrame = nonMainFrames[idx - 1];
                found = true;
              }
            }
          } else if (!found && params.index != null) {
            // No selector, but an explicit index — intentional index-based selection.
            const idx = params.index;
            const nonMainFrames = frames.filter((f) => f !== page.mainFrame());
            if (idx <= nonMainFrames.length) {
              currentFrame = nonMainFrames[idx - 1];
              found = true;
            }
          }

          if (found) {
            respond({ cmd: 'frame', url: currentFrame.url() });
          } else {
            respondError(cmd, `Frame not found. Available: ${frames.map((f) => f.url()).join(', ')}`);
          }
          break;
        }

        case 'frame-reset': {
          currentFrame = page;
          respond({ cmd: 'frame-reset', url: page.url() });
          break;
        }

        case 'frame-by-title': {
          const frames = page.frames();
          let found = false;
          for (const f of frames) {
            if (f !== page.mainFrame()) {
              try {
                const el = await f.frameElement();
                const title = await el.getAttribute('title');
                if (title && title.includes(params.title)) {
                  currentFrame = f;
                  found = true;
                  break;
                }
              } catch {
                /* skip frames without elements */
              }
            }
          }
          if (found) {
            respond({ cmd: 'frame-by-title', title: params.title, url: currentFrame.url() });
          } else {
            respondError(cmd, `Frame with title "${params.title}" not found`);
          }
          break;
        }

        case 'frames': {
          const frames = page.frames();
          const frameInfo = [];
          for (const f of frames) {
            const info = { url: f.url(), name: f.name() };
            try {
              const el = await f.frameElement();
              if (el) info.title = await el.getAttribute('title');
            } catch {
              /* main frame has no frameElement */
            }
            frameInfo.push(info);
          }
          respond({ cmd: 'frames', frames: frameInfo });
          break;
        }

        case 'locators': {
          // List matching elements for debugging
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          const count = await locator.count();
          const items = [];
          for (let i = 0; i < Math.min(count, params.limit ?? 20); i++) {
            const el = locator.nth(i);
            const tag = await el.evaluate((e) => e.tagName.toLowerCase());
            const text = await el.evaluate((e) => e.textContent?.trim().slice(0, 100));
            const attrs = await el.evaluate((e) => {
              const a = {};
              for (const attr of ['id', 'class', 'role', 'aria-label', 'data-testid', 'name']) {
                const v = e.getAttribute(attr);
                if (v) a[attr] = v;
              }
              return a;
            });
            items.push({ index: i, tag, text, ...attrs });
          }
          respond({ cmd: 'locators', count, items });
          break;
        }

        case 'hover': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          await locator.hover({ timeout });
          respond({ cmd: 'hover', hovered: true });
          break;
        }

        case 'select': {
          // Select option in a <select> element
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          await locator.selectOption(params.option || params.value, { timeout });
          respond({ cmd: 'select', selected: true });
          break;
        }

        case 'check': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          await locator.check({ timeout });
          respond({ cmd: 'check', checked: true });
          break;
        }

        case 'uncheck': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          await locator.uncheck({ timeout });
          respond({ cmd: 'uncheck', unchecked: true });
          break;
        }

        case 'attribute': {
          const locator = buildLocator(currentFrame, params);
          if (!locator) {
            respondError(cmd, 'Must provide role, selector, or text');
            break;
          }
          const attrVal = await locator.first().getAttribute(params.attr, { timeout });
          respond({ cmd: 'attribute', attr: params.attr, value: attrVal });
          break;
        }

        case 'snapshot': {
          // Accessibility tree snapshot with interactive element refs
          const cdp = await page.context().newCDPSession(page);
          try {
            const { nodes } = await cdp.send('Accessibility.getFullAXTree');
            const interactive = filterInteractiveNodes(nodes, params.roles);
            const limit = params.limit ?? 100;
            const elements = [];
            const refMap = {};
            let refIndex = 1;

            for (const node of interactive) {
              if (refIndex > limit) break;
              const ref = `@ref${refIndex}`;
              const role = node.role?.value;
              const name = node.name?.value || '';
              const nodeProps = extractNodeProps(node);
              elements.push({ ref, role, name, ...nodeProps });
              refMap[ref] = { backendDOMNodeId: node.backendDOMNodeId };
              refIndex++;
            }

            lastSnapshotRefMap = refMap;
            respond({ cmd: 'snapshot', count: elements.length, elements });
          } finally {
            await cdp.detach();
          }
          break;
        }

        case 'annotated-screenshot': {
          // Screenshot with numbered badges on interactive elements
          const output = params.output || '/tmp/pw-annotated.png';
          const dir = output.substring(0, output.lastIndexOf('/'));
          if (dir) fs.mkdirSync(dir, { recursive: true });

          const cdp = await page.context().newCDPSession(page);
          try {
            const { nodes } = await cdp.send('Accessibility.getFullAXTree');
            const interactive = filterInteractiveNodes(nodes, params.roles);
            const limit = params.limit ?? 50;
            const annotations = [];
            const refMap = {};
            let refIndex = 1;

            // Get iframe offset if we're in a sub-frame
            let frameOffsetX = 0;
            let frameOffsetY = 0;
            if (currentFrame !== page) {
              try {
                const frameEl = await currentFrame.frameElement();
                if (frameEl) {
                  const box = await frameEl.boundingBox();
                  if (box) {
                    frameOffsetX = box.x;
                    frameOffsetY = box.y;
                  }
                }
              } catch { /* ignore — main frame has no frameElement */ }
            }

            // Resolve bounding boxes for each interactive element
            for (const node of interactive) {
              if (refIndex > limit) break;
              try {
                const { model } = await cdp.send('DOM.getBoxModel', {
                  backendNodeId: node.backendDOMNodeId,
                });
                // content quad: [x1,y1, x2,y2, x3,y3, x4,y4]
                const quad = model.content;
                const x = Math.min(quad[0], quad[2], quad[4], quad[6]);
                const y = Math.min(quad[1], quad[3], quad[5], quad[7]);
                const maxX = Math.max(quad[0], quad[2], quad[4], quad[6]);
                const maxY = Math.max(quad[1], quad[3], quad[5], quad[7]);
                const width = maxX - x;
                const height = maxY - y;

                // Skip zero-size or very tiny elements
                if (width < 2 || height < 2) continue;

                const absX = x + frameOffsetX;
                const absY = y + frameOffsetY;

                const ref = `@ref${refIndex}`;
                const role = node.role?.value;
                const name = node.name?.value || '';
                annotations.push({
                  ref, label: refIndex, role, name,
                  x: Math.round(absX), y: Math.round(absY),
                  width: Math.round(width), height: Math.round(height),
                });
                refMap[ref] = { backendDOMNodeId: node.backendDOMNodeId };
                refIndex++;
              } catch {
                // Element hidden or detached — skip
              }
            }

            // Inject overlay into main frame
            const overlayId = '__pw_annotation_overlay__';
            const overlayHtml = annotations.map((a) => {
              const badgeSize = 20;
              return `<div style="position:fixed;left:${a.x}px;top:${a.y}px;width:${a.width}px;height:${a.height}px;border:2px solid red;pointer-events:none;z-index:2147483646;box-sizing:border-box;"></div>` +
                `<div style="position:fixed;left:${a.x - badgeSize / 2}px;top:${a.y - badgeSize / 2}px;width:${badgeSize}px;height:${badgeSize}px;background:red;color:white;border-radius:50%;font-size:11px;font-weight:bold;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:2147483647;font-family:Arial,sans-serif;">${a.label}</div>`;
            }).join('');

            await page.evaluate(({ id, html }) => {
              const existing = document.getElementById(id);
              if (existing) existing.remove();
              const container = document.createElement('div');
              container.id = id;
              container.innerHTML = html;
              document.body.appendChild(container);
            }, { id: overlayId, html: overlayHtml });

            try {
              // Brief pause to let overlay render
              await page.waitForTimeout(100);
              await page.screenshot({ path: output, fullPage: false });
            } finally {
              // Always remove overlay
              await page.evaluate((id) => {
                const el = document.getElementById(id);
                if (el) el.remove();
              }, overlayId);
            }

            lastSnapshotRefMap = refMap;
            respond({ cmd: 'annotated-screenshot', path: output, count: annotations.length, annotations });
          } finally {
            await cdp.detach();
          }
          break;
        }

        case 'click-ref': {
          // Click element by ref from last snapshot
          const ref = params.ref;
          if (!ref || !lastSnapshotRefMap[ref]) {
            respondError(cmd, `Unknown ref "${ref}". Run snapshot or annotated-screenshot first.`);
            break;
          }

          const { backendDOMNodeId } = lastSnapshotRefMap[ref];
          const cdp = await page.context().newCDPSession(page);
          try {
            const { model } = await cdp.send('DOM.getBoxModel', {
              backendNodeId: backendDOMNodeId,
            });
            const quad = model.content;
            const x = Math.min(quad[0], quad[2], quad[4], quad[6]);
            const y = Math.min(quad[1], quad[3], quad[5], quad[7]);
            const maxX = Math.max(quad[0], quad[2], quad[4], quad[6]);
            const maxY = Math.max(quad[1], quad[3], quad[5], quad[7]);

            // Add iframe offset if in sub-frame
            let offsetX = 0;
            let offsetY = 0;
            if (currentFrame !== page) {
              try {
                const frameEl = await currentFrame.frameElement();
                if (frameEl) {
                  const box = await frameEl.boundingBox();
                  if (box) {
                    offsetX = box.x;
                    offsetY = box.y;
                  }
                }
              } catch { /* ignore */ }
            }

            const cx = Math.round((x + maxX) / 2 + offsetX);
            const cy = Math.round((y + maxY) / 2 + offsetY);
            await page.mouse.click(cx, cy);
            respond({ cmd: 'click-ref', ref, clicked: true, x: cx, y: cy });
          } finally {
            await cdp.detach();
          }
          break;
        }

        case 'viewport': {
          const w = params.width || 1920;
          const h = params.height || 1080;
          await page.setViewportSize({ width: w, height: h });
          respond({ cmd: 'viewport', width: w, height: h });
          break;
        }

        case 'status': {
          const vp = page.viewportSize();
          respond({
            cmd: 'status',
            connected: true,
            pageUrl: page.url(),
            currentFrameUrl: currentFrame === page ? page.url() : currentFrame.url(),
            inFrame: currentFrame !== page,
            viewport: vp,
          });
          break;
        }

        case 'quit': {
          respond({ cmd: 'quit', disconnecting: true });
          try { browser.close(); } catch { /* already disconnected */ }
          process.exit(0);
          break;
        }

        default:
          respondError(cmd, `Unknown command: ${cmd}`);
      }
    } catch (err) {
      respondError(cmd, err.message);
    }
  }

  // stdin closed
  process.stderr.write('[pw-server] stdin closed, disconnecting...\n');
  try { browser.close(); } catch { /* already disconnected */ }
}

main().catch((err) => {
  respondError('fatal', err.message);
  process.exit(1);
});
