## Grep Safety-Net for Large-List Selection

When you pick a subset from a LARGE list by judgment — file names, symbols, test names, log lines, all usages of a symbol, all importers of a module — bracket the semantic scan with a DETERMINISTIC `grep` for the obvious keywords over the same corpus.

A cheap deterministic grep catches the obvious item that an attention failure would otherwise drop when the match is buried in noise. Reading-by-eye degrades as the list grows; `grep` does not.

The rule:

1. **Scan by judgment**, then **grep the same corpus** for the keywords any correct answer must contain.
2. **Every grep hit is a mandatory candidate** — it MUST appear in your result, or you must state why it is a false positive.
3. **Tag each result by source** (`keyword-grep` vs `judgment`) so the deterministic hits stay distinguishable from the ones you reasoned in.
