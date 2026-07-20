#!/bin/bash
# Cross-platform status line. Uses Node (universally available; required by
# the project via Volta) for JSON parsing instead of jq, which is not
# reliably installed on Windows. Bash is still the executor — Git Bash on
# Windows handles that too.
input=$(cat)

# Parse JSON via Node, emitting one field per line so spaces inside values
# (e.g. model display names like "Opus 4.7 (1M context)") survive.
node_output=$(node -e '
let buf = "";
process.stdin.on("data", c => (buf += c));
process.stdin.on("end", () => {
  let j; try { j = JSON.parse(buf); } catch { j = {}; }
  const model = j?.model?.display_name ?? "unknown";
  const pct = Math.round(j?.context_window?.used_percentage ?? 0);
  const total = j?.context_window?.context_window_size ?? 200000;
  const used = Math.floor(total * pct / 100);
  const cwd = j?.cwd ?? "~";

  // --- Cross-session rate-limit harvest -------------------------------------
  // rate_limits is ACCOUNT-WIDE (server-side rolling 5h / 7d windows), but
  // Claude Code only refreshes it in THIS session JSON after an API response,
  // so between prompts it is frozen. To show a live figure that also reflects
  // other sessions, every session writes what it observes to a shared file and
  // all sessions display the freshest value across them. Freshness rule per
  // window: the later resets_at is the newer reading (windows advance over
  // time); on a tie, the higher used_percentage is newer (usage accrues within
  // a fixed window). ts is stamped only when a genuinely new reading wins, so
  // idle 60s re-renders do not falsely refresh it.
  const os = require("os");
  const fs = require("fs");
  const path = require("path");
  const SHARED = (() => {
    // Resolve a file that is the SAME physical file from Windows and WSL2 (so
    // sessions in both environments aggregate together), and a normal per-home
    // file on macOS / plain Linux / native Windows.
    const envp = process.env.CLAUDE_USAGE_SHARED_FILE;
    if (envp) return envp; // explicit override wins
    const isWSL = process.platform === "linux" &&
      (/microsoft|wsl/i.test(String(os.release())) || !!process.env.WSL_DISTRO_NAME);
    if (isWSL) {
      // Write to the Windows-side home so Windows and WSL share one file.
      const pick = (home) => {
        try { return fs.existsSync(path.join(home, ".claude")) ? path.join(home, ".claude", "rate-limits-shared.json") : undefined; }
        catch (e) { return undefined; }
      };
      let user;
      try { user = os.userInfo().username; } catch (e) { user = process.env.USER; }
      const skip = ["Public", "Default", "Default User", "All Users", "desktop.ini"];
      for (const drv of ["c", "C"]) {
        if (user) { const r = pick(`/mnt/${drv}/Users/${user}`); if (r) return r; }
      }
      for (const drv of ["c", "C"]) {
        let names = [];
        try { names = fs.readdirSync(`/mnt/${drv}/Users`); } catch (e) {}
        for (const n of names) {
          if (skip.includes(n)) continue;
          const r = pick(`/mnt/${drv}/Users/${n}`); if (r) return r;
        }
      }
      // fall through to WSL-local home if no Windows home with .claude found
    }
    return path.join(os.homedir(), ".claude", "rate-limits-shared.json");
  })();
  const STALE_SECS = 300; // values not refreshed within this many seconds get a "*"
  const nowSec = Math.floor(Date.now() / 1000);

  let saved = {};
  try { saved = JSON.parse(fs.readFileSync(SHARED, "utf8")) || {}; } catch { saved = {}; }

  const mergeWin = (obs, sv) => {
    let cur;
    if (obs && typeof obs.used_percentage === "number") {
      cur = {
        used_percentage: obs.used_percentage,
        resets_at: typeof obs.resets_at === "number" ? obs.resets_at : undefined,
      };
    }
    // Expired entries are intentionally kept (not dropped) so a passed
    // resets_at can display as "0*" until a fresh reading of the new window
    // arrives; the later-resets_at rule below still supersedes it then.
    if (!cur && !sv) return undefined;
    if (cur && !sv) return { ...cur, ts: nowSec };
    if (!cur && sv) return sv;
    let curWins;
    if (typeof cur.resets_at === "number" && typeof sv.resets_at === "number" && cur.resets_at !== sv.resets_at) {
      curWins = cur.resets_at > sv.resets_at;
    } else {
      curWins = Math.round(cur.used_percentage) > Math.round(sv.used_percentage);
    }
    return curWins ? { ...cur, ts: nowSec } : sv;
  };

  const rl = j?.rate_limits;
  const merged = {};
  const fh = mergeWin(rl?.five_hour, saved.five_hour);
  const sd = mergeWin(rl?.seven_day, saved.seven_day);
  if (fh) merged.five_hour = fh;
  if (sd) merged.seven_day = sd;

  // Persist best-effort (temp + rename; readers tolerate a rare torn read).
  try {
    fs.mkdirSync(path.dirname(SHARED), { recursive: true });
    const tmp = `${SHARED}.${process.pid}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(merged));
    try { fs.renameSync(tmp, SHARED); }
    catch { fs.writeFileSync(SHARED, JSON.stringify(merged)); try { fs.unlinkSync(tmp); } catch (e) {} }
  } catch (e) {}

  // Live countdowns to reset. 5h shows hours+minutes ("1h24m"); 7d shows whole
  // days while more than a day out, then hours ("7d", "2d", "24h", "15h"). A
  // resets_at that has already passed shows "0*".
  const cd5h = (secs) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    return `${h}h${String(m).padStart(2, "0")}m`;
  };
  const cd7d = (secs) => (secs <= 86400 ? `${Math.ceil(secs / 3600)}h` : `${Math.ceil(secs / 86400)}d`);
  const fmtWin = (e, label, cd) => {
    if (!e || typeof e.used_percentage !== "number") return undefined;
    const pct = Math.round(e.used_percentage);
    const rem = typeof e.resets_at === "number" ? e.resets_at - nowSec : undefined;
    if (rem !== undefined && rem <= 0) return `${label} ${pct}% (0*)`;
    const stale = typeof e.ts === "number" && nowSec - e.ts > STALE_SECS;
    const pctStr = `${pct}%${stale ? "*" : ""}`;
    return rem !== undefined ? `${label} ${pctStr} (${cd(rem)})` : `${label} ${pctStr}`;
  };
  const rate = [
    fmtWin(merged.five_hour, "5h", cd5h),
    fmtWin(merged.seven_day, "7d", cd7d),
  ].filter(Boolean).join(" | ");

  console.log(model);
  console.log(pct);
  console.log(total);
  console.log(used);
  console.log(cwd);
  console.log(rate);
});
' <<< "$input")

{
  IFS= read -r MODEL
  IFS= read -r PCT
  IFS= read -r TOTAL
  IFS= read -r USED
  IFS= read -r CWD
  IFS= read -r RATE
} <<< "$node_output"

# Default values for robustness when node output is empty (node absent)
PCT=${PCT:-0}
TOTAL=${TOTAL:-200000}
USED=${USED:-0}

DIR=$(basename "$CWD")

BRANCH=$(git -C "$CWD" rev-parse --abbrev-ref HEAD 2>/dev/null)
if [ -n "$BRANCH" ]; then
  GIT=" | $BRANCH"
else
  GIT=""
fi

# Format token counts with k suffix
fmt_tokens() {
  local n=$1
  n=${n:-0}
  if [ "$n" -ge 1000 ]; then
    echo "$((n / 1000))k"
  else
    echo "$n"
  fi
}

# Append rate-limit usage to the right of the branch, when available. True
# right-alignment isn't possible: Claude Code doesn't pass the terminal width
# to the status line, and stdout is a pipe (no tty) so $COLUMNS / tput cols are
# unreliable.
if [ -n "$RATE" ]; then
  RATE_SEG=" | $RATE"
else
  RATE_SEG=""
fi

printf "%s | %s%% ctx | %s/%s tokens | %s%s%s" "$MODEL" "$PCT" "$(fmt_tokens "$USED")" "$(fmt_tokens "$TOTAL")" "$DIR" "$GIT" "$RATE_SEG"
