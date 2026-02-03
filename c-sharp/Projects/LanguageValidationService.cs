// === NEW IN PT10 ===
// Reason: Service for language character rules validation - PAPI request handler
// Maps to: CAP-006, EXT-006, VAL-013

namespace Paranext.DataProvider.Projects;

/// <summary>
/// Service for language validation operations.
/// PT9 Provenance: LanguageSettingsForm.ValidateCharacters()
/// Maps to: CAP-006, EXT-006
/// </summary>
internal static class LanguageValidationService
{
    // === PORTED FROM PT9 ===
    // Source: PT9/Paratext/ToolsMenu/LanguageSettingsForm.cs:646-734
    // Method: ValidateCharacters()
    // Maps to: CAP-006

    /// <summary>
    /// ICU collation rule syntax characters that indicate special rules, not character definitions.
    /// When these appear on a line, capitalization checking is skipped.
    /// </summary>
    private const string IcuSyntaxCharacters = "&<>=/|";

    /// <summary>
    /// Validates character rules for language settings.
    /// Checks for:
    /// - Invalid characters (control characters)
    /// - Duplicate characters on same line
    /// - Case-insensitive duplicates across lines
    /// - Proper capitalization pairs
    /// </summary>
    /// <param name="request">The validation request</param>
    /// <returns>Validation result with any errors found</returns>
    public static CharacterValidationResult ValidateCharacterRules(
        CharacterRulesValidationRequest request
    )
    {
        // EXPLANATION:
        // This algorithm validates character rules with these checks:
        // 1. Empty or whitespace-only rules are valid
        // 2. Control characters (U+0000-U+001F) are invalid
        // 3. Each line defines characters that should sort together
        // 4. Same character cannot appear twice on a line (duplicate)
        // 5. Case variants (a/A) must be on the same line (Paratext ignores case when sorting)
        // 6. Letters that have case (a-z) must have both lowercase and uppercase on same line

        var rulesText = request.RulesText;
        var separator = request.Separator;

        // Empty or whitespace-only rules are valid
        if (string.IsNullOrWhiteSpace(rulesText))
        {
            return CharacterValidationResult.Valid();
        }

        // Check for invalid characters (control characters)
        if (HasInvalidCharacters(rulesText))
        {
            return CharacterValidationResult.Invalid(
                new CharacterValidationError(
                    CharacterErrorType.InvalidSyntax,
                    Character: null,
                    Message: "Text contains invalid characters"
                )
            );
        }

        // Split into lines
        var lines = rulesText.Split('\n', StringSplitOptions.RemoveEmptyEntries);

        // Track all characters seen across all lines for case duplicate detection
        // Key: lowercase version of character, Value: (original character, line index)
        var seenCharacters = new Dictionary<string, (string Original, int LineIndex)>(
            StringComparer.OrdinalIgnoreCase
        );

        for (int lineIndex = 0; lineIndex < lines.Length; lineIndex++)
        {
            var line = lines[lineIndex].Trim();
            if (string.IsNullOrEmpty(line))
                continue;

            // Split line by separator
            var chars = line.Split(separator, StringSplitOptions.RemoveEmptyEntries);

            // Track characters on this line for duplicate detection
            var lineChars = new HashSet<string>(StringComparer.Ordinal);

            foreach (var ch in chars)
            {
                var trimmedChar = ch.Trim();
                if (string.IsNullOrEmpty(trimmedChar))
                    continue;

                // Check for duplicate on same line (exact match)
                if (!lineChars.Add(trimmedChar))
                {
                    return CharacterValidationResult.Invalid(
                        new CharacterValidationError(
                            CharacterErrorType.Duplicate,
                            Character: trimmedChar,
                            Message: $"Character '{trimmedChar}' duplicated"
                        )
                    );
                }

                // Check for case-insensitive duplicate across lines
                if (seenCharacters.TryGetValue(trimmedChar, out var existing))
                {
                    if (existing.LineIndex != lineIndex)
                    {
                        // Same character (case-insensitive) on different line
                        return CharacterValidationResult.Invalid(
                            new CharacterValidationError(
                                CharacterErrorType.Duplicate,
                                Character: trimmedChar,
                                Message: $"Cannot place '{trimmedChar.ToLower()}' and '{trimmedChar.ToUpper()}' on separate lines since Paratext ignores case when sorting."
                            )
                        );
                    }
                }
                else
                {
                    seenCharacters[trimmedChar] = (trimmedChar, lineIndex);
                }
            }

            // After processing a line, verify capitalization pairs for characters with case
            // All characters that have case must have both lowercase and uppercase on the same line
            // Skip capitalization check if line contains ICU-like syntax (special characters)
            if (lineChars.Any(IsIcuSyntaxChar))
                continue;

            var error = ValidateCapitalizationPairs(lineChars);
            if (error != null)
                return CharacterValidationResult.Invalid(error);
        }

        return CharacterValidationResult.Valid();
    }

    /// <summary>
    /// Validates that all lowercase letters on a line have their uppercase counterparts present.
    /// </summary>
    /// <param name="lineChars">Characters on the current line</param>
    /// <returns>Validation error if a capitalization pair is missing, null if valid</returns>
    private static CharacterValidationError? ValidateCapitalizationPairs(HashSet<string> lineChars)
    {
        foreach (var ch in lineChars)
        {
            // Skip characters without case variants (punctuation, numbers)
            if (!HasCaseVariant(ch))
                continue;

            // Only check lowercase letters - they need their uppercase pair
            if (ch.Length == 0 || !char.IsLetter(ch[0]) || !char.IsLower(ch[0]))
                continue;

            var upper = ch.ToUpperInvariant();

            // Skip if character has no distinct uppercase variant
            if (ch == upper)
                continue;

            // Verify uppercase variant exists on this line
            if (!lineChars.Contains(upper))
            {
                return new CharacterValidationError(
                    CharacterErrorType.Capitalization,
                    Character: ch,
                    Message: $"Capitalization is not defined correctly for: {ch}"
                );
            }
        }

        return null;
    }

    /// <summary>
    /// Checks if the text contains invalid characters (control characters).
    /// </summary>
    private static bool HasInvalidCharacters(string text)
    {
        foreach (char c in text)
        {
            // Allow common whitespace: space, tab, newline, carriage return
            if (c == ' ' || c == '\t' || c == '\n' || c == '\r')
                continue;

            // Control characters (U+0000 to U+001F except tab/newline/cr)
            if (char.IsControl(c))
                return true;
        }
        return false;
    }

    /// <summary>
    /// Checks if a character has case variants (uppercase/lowercase).
    /// </summary>
    private static bool HasCaseVariant(string s)
    {
        if (string.IsNullOrEmpty(s))
            return false;

        // For multigraphs, check if any character has case
        foreach (char c in s)
        {
            if (char.IsLetter(c) && char.ToLower(c) != char.ToUpper(c))
                return true;
        }
        return false;
    }

    /// <summary>
    /// Checks if a string contains ICU collation syntax characters.
    /// Characters like '&amp;', '&lt;', '&gt;', '=' indicate ICU rules, not character definitions.
    /// </summary>
    private static bool IsIcuSyntaxChar(string s) =>
        !string.IsNullOrEmpty(s) && s.Any(c => IcuSyntaxCharacters.Contains(c));
}
