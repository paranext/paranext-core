#!/usr/bin/env bash
# AI-specific pre-commit hook functions
# Only runs on ai/main and ai/feature/* branches

# Exit codes
readonly AI_EXIT_TYPECHECK=1
readonly AI_EXIT_CSHARP=2
readonly AI_EXIT_SECRETS=3

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
