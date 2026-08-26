# frozen_string_literal: true

# licensee identifies license texts against the SPDX corpus. It is the only Ruby dependency in this
# project, used solely by .erb/scripts/third-party-notices/detect.rb at notices-generation time.
#
# Pinned exactly, not with a pessimistic constraint: a matcher upgrade changes detection results and
# therefore changes verdicts, so the version moves only when someone deliberately moves it and
# reviews the resulting diff. The version is also recorded in THIRD-PARTY-NOTICES.lock.json so a
# verdict that shifted because of an upgrade is distinguishable from one that shifted because a
# license changed.
#
# licensee 10.x requires Ruby >= 3.2 (9.18 was the last release supporting 3.0), and enforces that
# itself through its own gemspec's `required_ruby_version` - so a `ruby '>= 3.2'` directive here
# would add no constraint. It is deliberately absent for what it COSTS: a `ruby` directive makes
# bundler stamp the running interpreter's exact patch level into `Gemfile.lock` as a RUBY VERSION
# stanza, and `bundle install` rewrites that line on any machine whose patch level differs. The
# lockfile is tracked, and CI fails the build on any tracked file the build modified - so a GitHub
# runner picking up a newer 3.4.x than the developer who last ran `bundle install` failed the Linux
# leg on a file nobody edited.
source 'https://rubygems.org'

gem 'licensee', '10.1.0'
