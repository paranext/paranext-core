# Real license fixtures

Copied verbatim from `node_modules`. **Never hand-write or edit a license text in this directory.**

Real texts, because a hand-written stub contains none of the cross-references a real license text
carries, and those cross-references are what a matcher gets wrong: MPL-2.0 section 1.12 defines
"Secondary License" by quoting the GNU GPL, so an unanchored substring match answers "GPL" for a
file that is not GPL at all. A fixture suite of stubs can pass in full while every one of these
files is misidentified.

Refresh a fixture only by re-copying it from the installed package.
