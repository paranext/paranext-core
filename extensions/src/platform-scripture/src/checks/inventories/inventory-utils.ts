/**
 * Converts a character to its Unicode hexadecimal representation
 *
 * @param char The character to convert
 * @returns The Unicode value as a 4-digit uppercase hexadecimal string (e.g., "0041" for 'A')
 */
export function getUnicodeValue(char: string): string {
  if (!char || char.length === 0) return '0000';
  return char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0');
}
