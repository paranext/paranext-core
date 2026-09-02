## Grep Safety-Net for Large-List Selection

When you pick a subset from a LARGE list by judgment — file names, symbols, test names, log lines, all usages of a symbol, all importers of a module — bracket the semantic scan with a DETERMINISTIC `grep` for the obvious keywords over the same corpus.

A cheap deterministic grep catches the obvious item that an attention failure would otherwise drop when the match is buried in noise. Reading-by-eye degrades as the list grows; `grep` does not.

The rule:

1. **Scan by judgment**, then **grep the same corpus** for the keywords any correct answer must contain.
2. **Every grep hit is a mandatory candidate** — it MUST appear in your result, or you must state why it is a false positive.
3. **Tag each result by source** (`keyword-grep` vs `judgment`) so the deterministic hits stay distinguishable from the ones you reasoned in.
4. **Make the pattern broader than the thing you are checking** — see below. Prefer a pattern that over-matches: false positives you dismiss by eye are cheap, whereas a match the pattern cannot express is silent.
5. **Treat a green sweep as evidence about the pattern, not about the code.** Before trusting one, state which cases the pattern is capable of matching. If you cannot, it is not a safety net yet.

### The pattern must be broader than the thing you are checking

A grep is a safety net only if it cannot exclude the cases of interest. Match the **structural shape**
of what you are looking for, not the spelling you expect the interesting cases to have — an
expected-spelling pattern narrows the corpus by exactly the assumption the sweep is meant to test, so
a clean result proves nothing about the code.

Concretely, when sweeping call sites, match the call shape rather than the argument:

```bash
# Too narrow: the character class excludes digits, so `mainPage1`, `mainPage2` and
# `mainPage3` can never match. A clean result here is not luck — it is structurally
# guaranteed, and therefore actively misleading.
grep -rn "waitForAppReady([a-zA-Z]*, [0-9]" .

# Right: matches any two-argument call, however the arguments are spelled.
grep -rnE "waitForAppReady\([^)]*,[^)]*\)" .
```

The same trap applies to any pattern built from an expected spelling: a variable-name prefix, an
import path, a test-name convention. Anchor on the syntax that must be present (the call parentheses,
the keyword, the extension) and let the noise through.
