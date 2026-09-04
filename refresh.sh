#!/bin/bash
# Thin delegate to the canonical launcher at .erb/scripts/refresh.sh.
#
# Keep it a delegate. When this was a second copy of the script it drifted from the canonical one,
# and which copy you happened to run decided whether the CDP fixtures would accept your window at
# all. Anything this needs to do belongs in .erb/scripts/refresh.sh instead.
#
# Kept rather than deleted because things point at it by this path — e.g.
# e2e-tests/fixtures/papi-live.fixture.ts tells you to "Start it with: ./refresh.sh".
# Arguments and environment are passed through unchanged; the canonical script's own header
# documents the environment it reads.
set -e
exec "$(dirname "$0")/.erb/scripts/refresh.sh" "$@"
