# frozen_string_literal: true

# Reads newline-delimited absolute directory paths on stdin, writes one JSON array on stdout.
#
# This is the entire Ruby surface of the project. It exists because licensee is the only maintained
# license-text matcher with an SPDX corpus behind it (askalono, the Rust equivalent, is archived).
# Node owns all orchestration and policy; this script only answers "what license texts are in this
# directory, and what are they?"
#
# Deliberately runs with detect_packages: false. The declared `license` field is read separately in
# declared.ts, and reconciliation compares the two as INDEPENDENT signals. If licensee also read
# package.json, they would agree by construction and a disagreement could never be detected.

require 'json'
require 'digest'
require 'licensee'

# What encoding a license file is in is a property of the FILE, so it is pinned here rather than
# inherited from the locale. Ruby tags anything read with `File.read` as `Encoding.default_external`,
# which comes from `LC_ALL`/`LANG`: under `LC_ALL=C` - a bare container image, a systemd unit, ssh
# without locale forwarding - a plain `File.read` of a UTF-8 license returns bytes tagged US-ASCII,
# and `valid_encoding?` is then FALSE for any license carrying a copyright symbol, which is most of
# them. The check below would abort the whole batch asserting the exact opposite of the truth.
#
# The pinned licensee (10.1.0) does not expose that: it hands back UTF-8 whatever the locale. But
# that is a property of a dependency's internals, not of this script, and the cost of depending on
# it is a legal document that cannot be regenerated on a machine with no UTF-8 locale. `detect.rb`'s
# own regression case runs the whole script under `LC_ALL=C`.
#
# `default_internal` stays nil: transcoding on read would alter the bytes this script hashes and
# reproduces verbatim.
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = nil

results = $stdin.read.split("\n").map(&:strip).reject(&:empty?).map do |dir|
  # filesystem: true routes to FSProject; without it licensee tries GitProject first, which is
  # wrong for node_modules directories that are not (and should not be) their own git repos.
  project = Licensee.project(dir, filesystem: true, detect_packages: false)

  files = project.license_files.map do |file|
    # A license file that is not valid UTF-8 (a Latin-1 copyright line is the usual cause) cannot be
    # serialized, and JSON.generate would raise for the whole batch only after every directory had
    # been scanned, naming no package. Checked per file, where the filename is still in hand. Not
    # re-encoded: silently substituting replacement characters would put altered license text into a
    # legal artifact.
    #
    # Re-tagged before the check, so it tests the BYTES rather than whatever tag the read happened
    # to attach. `force_encoding` relabels without transcoding, so the bytes hashed and reproduced
    # below are the file's own either way.
    content = file.content.dup.force_encoding(Encoding::UTF_8)
    unless content.valid_encoding?
      raise "#{dir}/#{file.filename} is not valid UTF-8, so its text cannot be reproduced verbatim"
    end

    {
      filename: file.filename,
      spdxId: file.license ? file.license.spdx_id : 'NONE',
      matcher: file.matcher ? file.matcher.name.to_s : 'none',
      confidence: file.matcher ? file.matcher.confidence : 0,
      sha256: Digest::SHA256.hexdigest(content),
      text: content
    }
  end

  { dir: dir, files: files }
rescue StandardError => e
  # Anything else licensee or the filesystem raises names the directory it happened in. Re-raised
  # rather than skipped: a directory this cannot read is a directory nothing is known about, and
  # `main.ts` refuses a run in which any package went unanswered.
  raise "#{e.class} reading #{dir}: #{e.message}"
end

$stdout.write(JSON.generate(results))
