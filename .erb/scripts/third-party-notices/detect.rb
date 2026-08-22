# frozen_string_literal: true

# Reads newline-delimited absolute directory paths on stdin, writes one JSON array on stdout.
#
# This is the entire Ruby surface of the project. It exists because licensee is the only maintained
# license-text matcher with an SPDX corpus behind it (askalono, the Rust equivalent, is archived).
# Node owns all orchestration and policy; this script only answers "what license texts are in this
# directory, and what are they?"
#
# Deliberately runs with detect_packages: false. The declared `license` field is read separately in
# declared.js, and reconciliation compares the two as INDEPENDENT signals. If licensee also read
# package.json, they would agree by construction and a disagreement could never be detected.

require 'json'
require 'digest'
require 'licensee'

results = $stdin.read.split("\n").map(&:strip).reject(&:empty?).map do |dir|
  # filesystem: true routes to FSProject; without it licensee tries GitProject first, which is
  # wrong for node_modules directories that are not (and should not be) their own git repos.
  project = Licensee.project(dir, filesystem: true, detect_packages: false)

  files = project.license_files.map do |file|
    # A licence file that is not valid UTF-8 (a Latin-1 copyright line is the usual cause) cannot be
    # serialized, and JSON.generate would raise for the whole batch only after every directory had
    # been scanned, naming no package. Checked per file, where the filename is still in hand. Not
    # re-encoded: silently substituting replacement characters would put altered licence text into a
    # legal artifact.
    unless file.content.valid_encoding?
      raise "#{dir}/#{file.filename} is not valid UTF-8, so its text cannot be reproduced verbatim"
    end

    {
      filename: file.filename,
      spdxId: file.license ? file.license.spdx_id : 'NONE',
      matcher: file.matcher ? file.matcher.name.to_s : 'none',
      confidence: file.matcher ? file.matcher.confidence : 0,
      sha256: Digest::SHA256.hexdigest(file.content),
      text: file.content
    }
  end

  { dir: dir, files: files }
rescue StandardError => e
  # Anything else licensee or the filesystem raises names the directory it happened in. Re-raised
  # rather than skipped: a directory this cannot read is a directory nothing is known about, and
  # `main.js` refuses a run in which any package went unanswered.
  raise "#{e.class} reading #{dir}: #{e.message}"
end

$stdout.write(JSON.generate(results))
