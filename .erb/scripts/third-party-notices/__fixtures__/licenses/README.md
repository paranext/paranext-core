# Real license fixtures

Copied verbatim from `node_modules`. **Never hand-write or edit a license text in this directory.**

The bespoke matcher these replaced passed 251 tests while misidentifying five of these exact files,
because its fixtures were hand-written stubs containing none of the cross-references that real
license texts contain. MPL-2.0 section 1.12 defines "Secondary License" by quoting the GNU GPL, and
an unanchored substring matcher fires on the quotation.

Refresh a fixture only by re-copying it from the installed package.
