#!/usr/bin/env bash
# AI-specific pre-commit hook functions
# Only runs on ai/main and ai/feature/* branches

# Exit codes
readonly AI_EXIT_TYPECHECK=1
readonly AI_EXIT_CSHARP=2
readonly AI_EXIT_SECRETS=3
readonly AI_EXIT_LINT_TS=4
readonly AI_EXIT_LINT_CSHARP=5

# ============================================
# Branch Detection
# ============================================

get_current_branch() {
  git symbolic-ref --short HEAD 2>/dev/null || git rev-parse --short HEAD 2>/dev/null
}

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

run_gitleaks() {
  echo "Scanning for secrets with gitleaks..."

  # Check if gitleaks is installed
  if ! command -v gitleaks &> /dev/null; then
    echo "WARNING: gitleaks not installed, skipping secret scan"
    echo "Install with: brew install gitleaks (macOS) or see https://github.com/gitleaks/gitleaks"
    return 0
  fi

  # Scan only staged files for secrets
  if ! gitleaks protect --staged --no-banner 2>&1; then
    error_msg "AI-003" "Potential secrets detected in staged files" \
      "Review flagged files. Use .env.example for templates, never commit credentials."
    return $AI_EXIT_SECRETS
  fi
  echo "No secrets detected"
}

# ============================================
# AI-Specific Lint Checks
# ============================================

run_ai_lint_ts() {
  echo "Running AI-specific TypeScript lint checks (paranext plugin)..."

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
  echo "Running AI-specific C# analyzers on staged files..."

  # Check if there are staged C# files
  if ! has_csharp_changes; then
    echo "No C# files staged, skipping C# analyzer check"
    return 0
  fi

  # Get staged C# files
  local staged_cs_files
  staged_cs_files=$(get_staged_files | grep -E '\.cs$')

  if [[ -z "$staged_cs_files" ]]; then
    echo "No C# files staged, skipping C# analyzer check"
    return 0
  fi

  # Run Roslyn analyzers on staged files only using dotnet format
  # This checks for analyzer warnings/errors in just the changed files
  local has_errors=false
  while IFS= read -r file; do
    if [[ -f "$file" ]]; then
      # Use dotnet format to check analyzer diagnostics on this file
      # --verify-no-changes returns non-zero if there are issues
      local output
      output=$(dotnet format analyzers c-sharp/ParanextDataProvider.sln --include "$file" --severity error --verify-no-changes 2>&1) || {
        echo "Analyzer errors in: $file"
        echo "$output"
        has_errors=true
      }
    fi
  done <<< "$staged_cs_files"

  if $has_errors; then
    error_msg "AI-005" "C# analyzer errors found in staged files" \
      "Run 'dotnet format analyzers c-sharp/ParanextDataProvider.sln --severity error' to see all errors"
    return $AI_EXIT_LINT_CSHARP
  fi

  echo "C# AI analyzer checks passed"
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
