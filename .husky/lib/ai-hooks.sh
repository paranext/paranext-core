#!/usr/bin/env bash
# AI-specific pre-commit hook functions
# Only runs on ai/main and ai/feature/* branches

# Signal to MSBuild that custom Paranext analyzers should be enabled
export PARANEXT_AI_BRANCH=true

# Exit codes
readonly AI_EXIT_TYPECHECK=1
readonly AI_EXIT_CSHARP=2
readonly AI_EXIT_LINT_TS=4
readonly AI_EXIT_LINT_CSHARP=5
readonly AI_EXIT_FORMAT_TS=6
readonly AI_EXIT_FORMAT_CSHARP=7
readonly AI_EXIT_LOCALIZATION=9
readonly AI_EXIT_ARCHITECTURE=10

# ============================================
# Git Helpers
# ============================================

get_staged_files() {
  git diff --cached --name-only --diff-filter=ACMR
}

has_ts_changes() {
  get_staged_files | grep -qE '\.(ts|tsx)$'
}

has_csharp_changes() {
  get_staged_files | grep -qE '\.cs$'
}

# ============================================
# Validations
# ============================================

validate_branch_name() {
  local branch="$1"
  if [[ "$branch" == "ai/main" ]]; then
    return 0
  fi
  # Warn if not following strict format: ai/feature/{name}-{person}-{MM-DD-YYYY}
  if [[ ! "$branch" =~ ^ai/feature/[a-z0-9-]+-[a-z]+-[0-9]{2}-[0-9]{2}-[0-9]{4}$ ]]; then
    echo "WARNING: Branch name should follow: ai/feature/{name}-{person}-{MM-DD-YYYY}"
  fi
}

run_typecheck() {
  echo "Running TypeScript type checking..."
  if ! npm run typecheck 2>&1; then
    error_msg "AI-001" "TypeScript type checking failed" "Run 'npm run typecheck' to see errors"
    return $AI_EXIT_TYPECHECK
  fi
  echo "TypeScript type checking passed"
}

run_csharp_build_check() {
  echo "Running C# build check..."
  if ! dotnet build c-sharp/ParanextDataProvider.sln --no-restore --verbosity quiet 2>&1; then
    error_msg "AI-002" "C# build failed" "Run 'dotnet build c-sharp/ParanextDataProvider.sln' to see errors"
    return $AI_EXIT_CSHARP
  fi
  echo "C# build check passed"
}

# ============================================
# AI-Specific Format Checks
# ============================================

run_ai_format_ts() {
  echo "Checking TypeScript/JS formatting..."

  # Get staged TS/JS files, excluding lib/ and extensions/ (they have separate configs)
  local staged_files
  staged_files=$(get_staged_files | grep -E '\.(ts|tsx|js|jsx)$' | grep -v '^lib/' | grep -v '^extensions/' | tr '\n' ' ')

  if [[ -z "$staged_files" ]]; then
    echo "No TS/JS files staged (in src/), skipping format check"
    return 0
  fi

  # Check formatting with Prettier (staged files only)
  # shellcheck disable=SC2086
  if ! npx prettier --check $staged_files 2>&1; then
    error_msg "AI-006" "TypeScript/JS formatting issues" \
      "Run 'npx prettier --write <files>' to fix"
    return $AI_EXIT_FORMAT_TS
  fi
  echo "TypeScript/JS formatting OK"
}

run_ai_format_csharp() {
  echo "Checking C# formatting..."

  if ! has_csharp_changes; then
    echo "No C# files staged, skipping C# format check"
    return 0
  fi

  # Check formatting on staged C# files only
  if ! get_staged_files | grep -E '\.cs$' | xargs dotnet csharpier --check 2>&1; then
    error_msg "AI-007" "C# formatting issues" \
      "Run 'dotnet csharpier <files>' to fix"
    return $AI_EXIT_FORMAT_CSHARP
  fi
  echo "C# formatting OK"
}

# ============================================
# AI-Specific Lint Checks
# ============================================

has_eslint_plugin_changes() {
  get_staged_files | grep -q '^lib/eslint-plugin-paranext/src/'
}

rebuild_eslint_plugin_if_needed() {
  # Check if any plugin source files are staged
  if has_eslint_plugin_changes; then
    echo "ESLint plugin source changed, rebuilding..."
    if ! npm run --prefix lib/eslint-plugin-paranext build 2>&1; then
      error_msg "AI-008" "ESLint plugin build failed" \
        "Run 'cd lib/eslint-plugin-paranext && npm run build' to see errors"
      return 1
    fi
    echo "ESLint plugin rebuilt successfully"
  fi
  return 0
}

run_ai_lint_ts() {
  echo "Running AI-specific TypeScript lint checks (paranext plugin)..."

  # Rebuild ESLint plugin if its source changed
  rebuild_eslint_plugin_if_needed || return $AI_EXIT_LINT_TS

  # Get staged TypeScript files, excluding lib/ and extensions/ (they have separate configs)
  local staged_ts_files
  staged_ts_files=$(get_staged_files | grep -E '\.(ts|tsx)$' | grep -v '^lib/' | grep -v '^extensions/' | tr '\n' ' ')

  if [[ -z "$staged_ts_files" ]]; then
    echo "No TypeScript files staged (in src/), skipping TS lint"
    return 0
  fi

  # Run ESLint with AI config on staged files only
  # shellcheck disable=SC2086
  if ! npx eslint --config .eslintrc.ai.js $staged_ts_files 2>&1; then
    error_msg "AI-004" "TypeScript lint failed (paranext patterns)" \
      "Run 'npx eslint --config .eslintrc.ai.js <files>' to see errors"
    return $AI_EXIT_LINT_TS
  fi
  echo "TypeScript AI lint checks passed"
}

run_ai_lint_csharp() {
  echo "Running AI-specific C# analyzers on staged files (strict mode)..."

  # Check if there are staged C# files
  if ! has_csharp_changes; then
    echo "No C# files staged, skipping C# analyzer check"
    return 0
  fi

  # Get staged C# files (exclude test files and analyzer project itself)
  local staged_cs_files
  staged_cs_files=$(get_staged_files | grep -E '\.cs$' | grep -Fv 'Paranext.Analyzers/' | grep -Fv -- '-tests/')

  if [[ -z "$staged_cs_files" ]]; then
    echo "No C# source files staged, skipping C# analyzer check"
    return 0
  fi

  echo "Checking staged C# files for analyzer warnings/errors..."

  # Run Roslyn analyzers on staged files only using dotnet format
  # --severity warn catches both warnings (PNX rules) and errors
  # This treats warnings as blocking for NEW code on AI branches
  local has_issues=false
  while IFS= read -r file; do
    if [[ -f "$file" ]]; then
      local output
      # Check for any analyzer issues (warnings or errors) in this file
      output=$(dotnet format analyzers c-sharp/ParanextDataProvider.sln --include "$file" --severity warn --verify-no-changes 2>&1) || {
        echo "⚠️  Analyzer issues in: $file"
        echo "$output" | grep -E '(warning|error) (PNX|CA|IDE)' | head -10
        has_issues=true
      }
    fi
  done <<< "$staged_cs_files"

  if $has_issues; then
    error_msg "AI-005" "C# analyzer warnings/errors found in staged files" \
      "Fix the issues above. PNX rules enforce patterns from Paranext-Core-Patterns.md"
    return $AI_EXIT_LINT_CSHARP
  fi

  echo "C# AI analyzer checks passed (no warnings in staged files)"
}

# ============================================
# Cross-File Validation Checks
# ============================================

run_localization_check() {
  echo "Checking localization keys..."

  local staged_files
  staged_files=$(get_staged_files | grep -E '\.(ts|tsx)$' | grep -v '^lib/' | tr '\n' ' ')

  if [[ -z "$staged_files" ]]; then
    echo "No TS/TSX files staged (excluding lib/), skipping localization check"
    return 0
  fi

  # Extract all %key% patterns from staged files
  local keys_used
  # shellcheck disable=SC2086
  keys_used=$(grep -hoE '%[a-zA-Z0-9_.]+%' $staged_files 2>/dev/null | sort -u)

  if [[ -z "$keys_used" ]]; then
    echo "No localization keys found in staged files"
    return 0
  fi

  # Check each key exists in en.json or an extension's localizedStrings.json
  local missing_keys=()
  while IFS= read -r key; do
    # Check base application localization
    if grep -q "\"$key\"" assets/localization/en.json 2>/dev/null; then
      continue
    fi
    # Check extension localizedStrings.json files
    if grep -rq "\"$key\"" extensions/src/*/contributions/localizedStrings.json 2>/dev/null; then
      continue
    fi
    missing_keys+=("$key")
  done <<< "$keys_used"

  if [[ ${#missing_keys[@]} -gt 0 ]]; then
    error_msg "AI-009" "Missing localization keys" \
      "Add these keys to assets/localization/en.json or the extension's contributions/localizedStrings.json: ${missing_keys[*]}"
    return $AI_EXIT_LOCALIZATION
  fi

  echo "All localization keys found"
}

run_architecture_check() {
  echo "Checking architecture boundaries..."

  local violations=()

  # Get staged files for each directory
  local renderer_files shared_files main_files
  renderer_files=$(get_staged_files | grep -E '^src/renderer/' || true)
  shared_files=$(get_staged_files | grep -E '^src/shared/' || true)
  main_files=$(get_staged_files | grep -E '^src/main/' || true)

  # Rule 1: renderer cannot import from main, extension-host, or node
  if [[ -n "$renderer_files" ]]; then
    local renderer_violations
    renderer_violations=$(echo "$renderer_files" | xargs grep -El "from '@main/|from '@extension-host/|from '@node/" 2>/dev/null || true)
    [[ -n "$renderer_violations" ]] && violations+=("renderer→main/extension-host/node: $renderer_violations")
  fi

  # Rule 2: shared cannot import from process-specific directories
  if [[ -n "$shared_files" ]]; then
    local shared_violations
    shared_violations=$(echo "$shared_files" | xargs grep -El "from '@main/|from '@renderer/|from '@extension-host/" 2>/dev/null || true)
    [[ -n "$shared_violations" ]] && violations+=("shared→process-specific: $shared_violations")
  fi

  # Rule 3: main cannot import from renderer
  if [[ -n "$main_files" ]]; then
    local main_violations
    main_violations=$(echo "$main_files" | xargs grep -l "from '@renderer/" 2>/dev/null || true)
    [[ -n "$main_violations" ]] && violations+=("main→renderer: $main_violations")
  fi

  if [[ ${#violations[@]} -gt 0 ]]; then
    error_msg "AI-010" "Architecture boundary violations" \
      "Fix these imports: ${violations[*]}"
    return $AI_EXIT_ARCHITECTURE
  fi

  echo "Architecture boundaries OK"
}

# ============================================
# Error Handling
# ============================================

error_msg() {
  local code="$1" message="$2" fix="$3"
  echo ""
  echo "=========================================="
  echo "AI Pre-commit Hook Failed [$code]"
  echo "=========================================="
  echo "ERROR: $message"
  [[ -n "$fix" ]] && echo "TO FIX: $fix"
  echo "To bypass in emergencies: HUSKY=0 git commit ..."
  echo "=========================================="
}

# ============================================
# Orchestrator (called from pre-commit hook)
# ============================================

run_all_ai_checks() {
  local branch="$1"

  # Audit logging (same file as pre-commit)
  AUDIT_LOG="${AUDIT_LOG:-.context/audit-logs/pre-commit.log}"
  _log() { echo "$(date -u +"%Y-%m-%dT%H:%M:%SZ")|ai-hooks|$1" >> "$AUDIT_LOG"; }

  # 1. Branch naming (warning only)
  validate_branch_name "$branch"

  # 2. TypeScript typecheck (if TS files staged)
  if has_ts_changes; then
    _log "typecheck|running"
    run_typecheck || { local rc=$?; _log "typecheck|FAILED|exit=$rc"; exit $rc; }
    _log "typecheck|passed"
  else
    _log "typecheck|skipped|reason=no_ts_staged"
    echo "No TypeScript files staged, skipping typecheck"
  fi

  # 3. C# build check (if C# files staged)
  if has_csharp_changes; then
    _log "csharp_build|running"
    run_csharp_build_check || { local rc=$?; _log "csharp_build|FAILED|exit=$rc"; exit $rc; }
    _log "csharp_build|passed"
  else
    _log "csharp_build|skipped|reason=no_cs_staged"
    echo "No C# files staged, skipping build check"
  fi

  # 4. Format checks (Prettier for TS/JS, CSharpier for C#)
  _log "format_ts|running"
  run_ai_format_ts || { local rc=$?; _log "format_ts|FAILED|exit=$rc"; exit $rc; }
  _log "format_ts|passed"

  _log "format_csharp|running"
  run_ai_format_csharp || { local rc=$?; _log "format_csharp|FAILED|exit=$rc"; exit $rc; }
  _log "format_csharp|passed"

  # 5. AI-specific TypeScript lint (paranext plugin rules)
  _log "lint_ts|running"
  run_ai_lint_ts || { local rc=$?; _log "lint_ts|FAILED|exit=$rc"; exit $rc; }
  _log "lint_ts|passed"

  # 6. AI-specific C# analyzer check (warnings as errors for staged files)
  _log "lint_csharp|running"
  run_ai_lint_csharp || { local rc=$?; _log "lint_csharp|FAILED|exit=$rc"; exit $rc; }
  _log "lint_csharp|passed"

  # 7. Localization key validation
  _log "localization|running"
  run_localization_check || { local rc=$?; _log "localization|FAILED|exit=$rc"; exit $rc; }
  _log "localization|passed"

  # 8. Architecture boundary check
  _log "architecture|running"
  run_architecture_check || { local rc=$?; _log "architecture|FAILED|exit=$rc"; exit $rc; }
  _log "architecture|passed"

  echo ""
  echo "=========================================="
  echo "AI validations completed successfully"
  echo "=========================================="
}
