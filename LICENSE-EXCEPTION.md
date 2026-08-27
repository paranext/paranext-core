# Platform.Bible Extension License Exception

**Version 1.0**

This exception is an _additional permission_ under section 7 of the GNU Affero General Public
License, version 3, granted by SIL Global and the United Bible Societies Association as the
copyright holders in Platform.Bible.

## Definitions

**"Platform.Bible"** means the software in the `paranext/paranext-core` repository that is licensed
under the GNU Affero General Public License, version 3 or later.

**"the Extension Interface"** means the interfaces Platform.Bible publishes for extensions to use:
the `@papi/backend`, `@papi/core`, `@papi/frontend` and `@papi/frontend/react` modules that
Platform.Bible supplies to an extension at run time, the type declarations in `lib/papi-dts`, the
JSON-RPC Platform API, and the WebView interfaces.

**"an Independent Extension"** means a work that

1. is designed to run as a Platform.Bible extension,
2. communicates with Platform.Bible only through the Extension Interface, and
3. does not contain, and is not derived from, Platform.Bible source code, other than the type
   declarations and interface definitions the Extension Interface consists of.

An Independent Extension does not stop being one because Platform.Bible loads it into its own
process, supplies the Extension Interface to it at run time, or executes it alongside other
extensions.

## Grant of Additional Permission

You may convey an Independent Extension, in source or object form, **under terms of your choosing**,
without the requirements that sections 4, 5, 6 and 13 of the GNU Affero General Public License
would otherwise place on it by reason of its being combined with, linked against, or executed by
Platform.Bible.

This permission extends to conveying an Independent Extension together with Platform.Bible, and to
making an Independent Extension available to users interacting with it remotely over a network.

## What this exception does not do

This exception applies **only** to an Independent Extension. It does not:

- change the license of Platform.Bible itself, which remains AGPL-3.0-or-later;
- permit conveying a modified Platform.Bible, or any work containing Platform.Bible source, under
  other terms — those remain subject to the AGPL in full, including its section 13 requirement to
  offer source to remote users;
- apply to a work that reaches past the Extension Interface into Platform.Bible's internals; or
- affect the separate MIT license on `lib/platform-bible-react` and `lib/platform-bible-utils`,
  which is unchanged and independent of this exception.

## No recommendation

This exception exists so that the license of Platform.Bible does not by itself determine the license
of an extension. **It makes no recommendation about what license an extension should carry.** An
extension author remains responsible for the licensing of their own work, including for any
third-party code they incorporate and for any obligations arising other than from Platform.Bible.
Nothing here is legal advice.

## Applying this exception

An extension author need do nothing to rely on this exception. Authors who wish to record that they
have may state:

> This extension is an Independent Extension under version 1.0 of the Platform.Bible Extension
> License Exception.
