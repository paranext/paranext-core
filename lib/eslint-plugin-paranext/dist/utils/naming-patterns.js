"use strict";
/**
 * Utility functions for validating paranext naming conventions. See:
 * .context/standards/Paranext-Core-Patterns.md
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.suggestFix = exports.getExtensionName = exports.isCamelCase = exports.isValidExtensionIdentifier = void 0;
/**
 * Validates that a string follows the pattern: extensionName.identifier Where:
 *
 * - ExtensionName: camelCase (starts with lowercase, no spaces)
 * - Identifier: camelCase
 *
 * Examples:
 *
 * - Valid: 'platformScripture.openFind', 'helloRock3.helloRock3'
 * - Invalid: 'PlatformScripture.OpenFind', 'platform-scripture.openFind'
 */
function isValidExtensionIdentifier(value) {
    // Must contain exactly one dot
    const parts = value.split('.');
    if (parts.length !== 2)
        return false;
    const [extensionName, identifier] = parts;
    // Extension name must be camelCase (start with lowercase letter)
    if (!isCamelCase(extensionName))
        return false;
    // Identifier must be camelCase
    if (!isCamelCase(identifier))
        return false;
    return true;
}
exports.isValidExtensionIdentifier = isValidExtensionIdentifier;
/**
 * Checks if a string is in camelCase format. camelCase starts with a lowercase letter, followed by
 * any combination of letters, numbers.
 */
function isCamelCase(value) {
    if (!value || value.length === 0)
        return false;
    // Must start with lowercase letter
    if (!/^[a-z]/.test(value))
        return false;
    // Can only contain letters and numbers
    if (!/^[a-zA-Z0-9]+$/.test(value))
        return false;
    return true;
}
exports.isCamelCase = isCamelCase;
/**
 * Extracts the extension name from a compound identifier. Example: 'platformScripture.openFind' ->
 * 'platformScripture'
 */
function getExtensionName(value) {
    const parts = value.split('.');
    if (parts.length !== 2)
        return null;
    return parts[0];
}
exports.getExtensionName = getExtensionName;
/** Creates a suggestion for fixing a malformed identifier. */
function suggestFix(value) {
    const parts = value.split('.');
    if (parts.length !== 2)
        return value;
    const [ext, id] = parts;
    // Convert extension to camelCase
    const fixedExt = toCamelCase(ext);
    const fixedId = toCamelCase(id);
    return `${fixedExt}.${fixedId}`;
}
exports.suggestFix = suggestFix;
/** Converts a string to camelCase. */
function toCamelCase(value) {
    if (!value)
        return value;
    // If already starts with lowercase, just remove non-alphanumeric
    if (/^[a-z]/.test(value)) {
        return value.replace(/[^a-zA-Z0-9]/g, '');
    }
    // Convert first character to lowercase
    return value.charAt(0).toLowerCase() + value.slice(1).replace(/[^a-zA-Z0-9]/g, '');
}
