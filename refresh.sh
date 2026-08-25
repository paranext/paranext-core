#!/bin/bash
# Thin delegate to the canonical launcher at .erb/scripts/refresh.sh.
#
# These were two near-identical copies, and they drifted: the canonical one gained PT_NO_DEVTOOLS
# and an explicit --window-size (a docked DevTools panel takes ~555px of the window, and --maximize
# is a no-op under a bare Xvfb because nothing is there to honour it), while this one kept starting
# a ~1024px DevTools-docked app. That is exactly the window the CDP fixtures now reject at setup,
# so whichever copy you happened to run decided whether your tests could run at all.
#
# Kept rather than deleted because things point at it by this path — e.g.
# e2e-tests/fixtures/papi-live.fixture.ts tells you to "Start it with: ./refresh.sh".
# Arguments and environment pass straight through; see the canonical script for what it accepts.
set -e
exec "$(dirname "$0")/.erb/scripts/refresh.sh" "$@"
