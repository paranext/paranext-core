---
description: Mechanically verify the repo's Claude-facing docs (.context/standards, .claude rules/skills/agents/commands, CLAUDE.md) against the live code — cited paths, identifiers, npm scripts, localization keys, status claims. Read-only; prints a findings report. Run before each epic's investigation phase and on any PR that adds standards content.
---

# Verify Standards

Mechanically check every externally-verifiable claim in the repo's Claude-facing documentation
against the live repo, and report what no longer (or never did) hold. **This command is read-only
by design**: it never edits files, never posts to GitHub or Jira, and its output is a console
report for the caller to act on.

Why it exists: a staleness audit of this content found three rot classes — status claims that
expire in days ("PR #x in flight"), line/identifier cites that drift with refactors, and claims
that were never true at all. The first two need a re-verification cadence; the third needs a
**generation-time gate**: new standards claims must pass this command, or carry an explicit
aspirational marker (see "Exemptions").

## Scope

Checked: `.context/standards/**`, `.claude/rules/**`, `.claude/skills/**`, `.claude/agents/**`,
`.claude/commands/**`, and the root `CLAUDE.md`.

Not checked: `.context/research/**`, `.context/designs/**`, `.context/plans/**` — these are
frozen records or pinned-snapshot corpora with their own provenance rules.

## Exemptions

- **Frozen records**: any in-scope file whose first 30 lines contain `Status: frozen record` or a
  provenance fence — a blockquote starting `**Frozen record**` or naming itself a
  historical/point-in-time record — is skipped entirely; the report lists each skip with the
  marker text it matched, so an accidental freeze is visible.
- **Aspirational claims**: a line **ending in** `<!-- aspirational: not yet in repo -->` is exempt
  from that line's checks — it documents intent, not current code. The marker is the only
  recognized form; prose saying "aspirational" does not exempt anything (a mechanical gate can't
  honor prose).
- **Fenced code blocks**: localization-key and path checks are suppressed inside ``` fences
  (example keys and illustrative paths are legitimate there), but identifier, npm-script, dotnet
  category, and playwright project checks stay live — a fenced command or code sample presents
  itself as real and readers execute it, so a nonexistent name in one is a finding, not noise.

## Step 1: Refresh reference state

```bash
git fetch origin main --quiet \
  || echo "WARN: fetch failed — existence checks will run against the last-fetched origin/main from $(git log -1 --format=%cs origin/main 2>/dev/null || echo 'unknown date'); results may be stale"
git -C "$(git rev-parse --show-toplevel)/../Paratext" rev-parse --short HEAD 2>/dev/null || echo "PT9 checkout absent — PT9-path checks will be skipped"
```

If the fetch prints its WARN, carry that caveat into the final report — the sweep still runs,
but every existence check is only as fresh as that date.

The sweep reads the **doc text from the working tree** (so a PR branch's added or edited content
is what gets gated — run it from the branch you're gating) while all **existence checks** (paths,
scripts, identifiers, keys) run against `origin/main`, so "does this exist" answers don't depend
on your branch state.

## Step 2: Run the mechanical sweep

Run this from the repo root. It is self-contained and read-only; it prints one `findings:` line
per candidate issue, grouped by file at the end. **If the sweep prints `FATAL`, stop and report
the failure to the caller — do not triage, do not tick checklist boxes; a failed run verifies
nothing.**

```bash
python3 - <<'EOF'
import json, os, re, subprocess, collections

REPO = subprocess.run(["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True).stdout.strip()
PT9 = os.path.normpath(os.path.join(REPO, "..", "Paratext"))
SCOPE = [".context/standards", ".claude/rules", ".claude/skills", ".claude/agents", ".claude/commands", "CLAUDE.md"]

def sh(args): return subprocess.run(args, capture_output=True, text=True).stdout
def sh_ck(args):
    r = subprocess.run(args, capture_output=True, text=True)
    if r.returncode != 0: raise SystemExit(f"FATAL: {' '.join(args)} failed: {r.stderr.strip()[:200]}")
    return r.stdout

main_files = set(sh_ck(["git", "-C", REPO, "ls-tree", "-r", "--name-only", "origin/main"]).splitlines())
if not main_files: raise SystemExit("FATAL: could not read origin/main - run `git fetch origin main` (check the remote name) and rerun")
suffix = collections.defaultdict(list)
for p in main_files: suffix[p.rsplit("/", 1)[-1]].append(p)
pt9_files = set()
if os.path.isdir(PT9):
    pt9_files = set(sh(["git", "-C", PT9, "ls-files"]).splitlines())
pt9_suffix = collections.defaultdict(list)
for p in pt9_files: pt9_suffix[p.rsplit("/", 1)[-1]].append(p)

scripts = set()
for pkg in ["package.json", "extensions/package.json"] + [p for p in main_files if p.startswith("lib/") and p.endswith("/package.json") and p.count("/") == 2] + [p for p in main_files if p.startswith("extensions/src/") and p.endswith("/package.json") and p.count("/") == 3]:
    if pkg in main_files:
        try: scripts |= set(json.loads(sh(["git", "-C", REPO, "show", f"origin/main:{pkg}"])).get("scripts", {}).keys())
        except Exception: pass

loc_keys = set()
for lf in [p for p in main_files if p == "assets/localization/en.json" or p.endswith("/contributions/localizedStrings.json")]:
    try: loc_keys |= set(re.findall(r'"(%[^"%]+%)"', sh(["git", "-C", REPO, "show", f"origin/main:{lf}"])))
    except Exception: pass

pw_cfg = sh(["git", "-C", REPO, "show", "origin/main:e2e-tests/playwright-cdp.config.ts"])
pw_projects = set(re.findall(r"name:\s*['\"]([^'\"]+)['\"]", pw_cfg))
cats = set(re.findall(r'\[Category\("([^"]+)"\)\]', sh(["git", "-C", REPO, "grep", "-h", r"\[Category(", "origin/main", "--", "c-sharp-tests"])))

RE_PATHTOK = re.compile(r'(?<![\w/.])((?:[A-Za-z0-9_@-]+/)+[A-Za-z0-9_@.-]+\.[A-Za-z]{1,5})(?![\w/])')
RE_TICK = re.compile(r'`([^`\n]{2,80})`')
RE_IDENT = re.compile(r'^[A-Za-z_$][A-Za-z0-9_$]*(?:\(\))?$|^[A-Za-z_$][A-Za-z0-9_$]*(?:\.[A-Za-z_$][A-Za-z0-9_$]*)+$')
RE_NPM = re.compile(r'\bnpm run ([A-Za-z0-9:_-]+)')
RE_LOC = re.compile(r'(%[A-Za-z0-9_.]+%)')
RE_INFLIGHT = re.compile(r'not yet merged|in[- ]flight|unmerged|awaiting merge|pending merge', re.I)
RE_PRREF = re.compile(r'(?:\bPR\s*#|pull/|[A-Za-z][A-Za-z0-9-]*#)(\d{2,5})\b')
RE_DATE = re.compile(r'\b20\d\d-\d\d(?:-\d\d)?\b')
RE_ASPIRATIONAL = re.compile(r'<!--\s*aspirational:[^>]*-->\s*$')
RE_FROZEN = re.compile(r'^\s*(?:>.*)?Status:\s*frozen record|^\s*>\s*\**(?:Frozen record|.*historical record|.*point-in-time (?:record|plan))', re.I | re.M)
SKIP_TOKENS = {"TODO", "README", "LICENSE", "ROOT", "ARGUMENTS", "SLUG", "HEAD", "PATH", "URL", "PT9_MAP", "PT9_REFERENCES", "PRD_PATH", "ASPECTS", "PT9_CLAIMS", "DEPTH", "PT_REPOS_ROOT"}

def frozen_marker(text):
    m = RE_FROZEN.search("\n".join(text.splitlines()[:30]))
    return m.group(0).strip()[:60] if m else None

findings, skipped = collections.defaultdict(list), []
wt_files = sh_ck(["git", "-C", REPO, "ls-files"]).splitlines()
targets = [f for f in wt_files if any(f == s or f.startswith(s + "/") for s in SCOPE) and f.endswith(".md")]
if not targets: raise SystemExit(f"FATAL: no in-scope .md files found under {SCOPE}")
pr_refs = set()
for rel in sorted(targets):
    with open(os.path.join(REPO, rel), encoding="utf-8") as fh: text = fh.read()
    fm = frozen_marker(text)
    if fm: skipped.append(f'{rel} - matched "{fm}"'); continue
    pr_refs |= set(int(n) for n in RE_PRREF.findall(text))
    in_fence = False
    for i, ln in enumerate(text.splitlines(), 1):
        if ln.strip().startswith("```"):
            in_fence = not in_fence
            continue
        if RE_ASPIRATIONAL.search(ln): continue
        for m in RE_PATHTOK.finditer(ln) if not in_fence else []:
            p = m.group(1).lstrip("./")
            if "*" in p or "{" in p or p.startswith("http"): continue
            if "path/to" in p or "hello-world" in p or p.startswith("foo/"): continue
            base = p.rsplit("/", 1)[-1]
            if any(seg in p for seg in ("Paratext/", "ParatextData/", "ParatextBase/", "PtxUtils/")) and pt9_files:
                if p not in pt9_files and base not in pt9_suffix:
                    findings[rel].append(f":{i} [path/PT9] `{p}` not in PT9 checkout")
            elif p not in main_files and base not in suffix and not p.startswith(("temp-", "node_modules", "release/", "dist/")):
                findings[rel].append(f":{i} [path] `{p}` not on origin/main")
        for m in RE_NPM.finditer(ln):
            if m.group(1) not in scripts:
                findings[rel].append(f":{i} [npm] `npm run {m.group(1)}` not in any package.json")
        for m in RE_LOC.finditer(ln) if not in_fence else []:
            if m.group(1) not in loc_keys:
                findings[rel].append(f":{i} [l10n] key `{m.group(1)}` not in en.json or contributions")
        if RE_INFLIGHT.search(ln) and RE_PRREF.search(ln) and not RE_DATE.search(ln):
            findings[rel].append(f":{i} [status] undated in-flight claim: {ln.strip()[:90]}")
        for m in RE_TICK.finditer(ln):
            tok = m.group(1).strip()
            if tok in SKIP_TOKENS or tok.islower() or len(tok) < 4: continue
            if tok.startswith("$") or re.fullmatch(r'[A-Z0-9_]+', tok): continue  # shell/template placeholders
            bare_tok = tok.rsplit(".", 1)[-1].rstrip("()")
            if bare_tok in {"Old", "Other", "Some", "My", "Example", "Variant", "Root"} or re.fullmatch(r'(Foo|Bar|Baz)[A-Za-z]*', bare_tok): continue  # example-name convention
            if not RE_IDENT.match(tok): continue
            bare = tok.rstrip("()").rsplit(".", 1)[-1]
            if len(bare) < 4 or bare.islower(): continue
            hits = subprocess.run(["git", "-C", REPO, "grep", "-l", "-m", "1", bare, "origin/main", "--", "src", "lib", "extensions/src", "c-sharp", "c-sharp-tests", "e2e-tests"], capture_output=True, text=True)
            if hits.returncode != 0 and (not pt9_files or subprocess.run(["git", "-C", PT9, "grep", "-l", "-m", "1", bare], capture_output=True).returncode != 0):
                findings[rel].append(f":{i} [ident] `{tok}` grep-resolves nowhere")
        for cat in re.findall(r'--filter[= ]"?Category=([A-Za-z0-9]+)', ln):
            if cats and cat not in cats:
                findings[rel].append(f":{i} [dotnet] test category `{cat}` not found in c-sharp-tests")
        for m in re.findall(r'--project[= ]([A-Za-z0-9-]+)', ln):
            if pw_projects and m not in pw_projects:
                findings[rel].append(f":{i} [playwright] project `{m}` not in playwright-cdp.config.ts")

print(f"scanned {len(targets)} files; skipped {len(skipped)} frozen records: {skipped}")
print(f"PR refs to spot-check with gh (state vs claim): {sorted(pr_refs)}")
for rel in sorted(findings):
    print(f"\n{rel}")
    for f in findings[rel]: print(f"  {f}")
total = sum(len(v) for v in findings.values())
print(f"\n{total} candidate findings")
EOF
```

## Step 3: Triage the candidates

The sweep favors precision but still produces noise. For each candidate:

1. Read the cited line in context. Discard prose false-positives (a backticked English word, a
   deliberately hypothetical path in an example) — but if an example *presents itself as real
   code*, a nonexistent identifier is a finding, not noise.
2. For each PR reference the sweep lists, check the claimed state against reality with
   `gh pr view <n> --repo paranext/paranext-core --json state,mergedAt` — a doc saying
   "in flight"/"not yet merged" about a merged PR is a finding.
3. Classify each surviving finding: **misleads-agent** (an agent following the doc does the wrong
   thing), **wrong-detail** (factually off, recoverable), or **cosmetic**.
4. Report the findings grouped by file, most severe first, with the live-code evidence per
   finding. **Do not edit any files** — hand the report to the caller to decide fixes.

## Cadence (the generation-time gate)

- Run this before each epic's investigation phase (`/investigate-prd` consumes these docs — stale
  standards produce confidently wrong briefs).
- Run it on any PR that adds or edits standards/rules/skills content: **new claims must come out
  clean, or carry the aspirational marker**. Never-true claims are the one rot class no
  maintenance cadence can catch later.

## Completion checklist

- [ ] `git fetch origin main` succeeded (or its staleness WARN is carried into the report); doc
      text was read from the working tree, existence checks ran against `origin/main`
- [ ] Sweep script ran to completion; frozen-record skips listed
- [ ] Every PR reference spot-checked with `gh`
- [ ] Findings triaged into misleads-agent / wrong-detail / cosmetic with evidence
- [ ] No files modified, nothing posted
