/**
 * Splits USFM string into shorter line-like segments
 *
 * @param text A single (likely very large) USFM string
 * @returns An array containing the input text, split into shorter segments
 */
export const getLinesFromUSFM = (text: string) => {
  // Splits on (CR)LF, CR, \v, \c and \id
  return text.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g);
};

/**
 * Extracts chapter or verse number from USFM strings that start with a chapter or verse marker
 *
 * @param text USFM string
 * @returns Chapter or verse number if one is found. Else returns 0.
 */
export const extractNumberFromUSFM = (text: string): number | undefined => {
  // Captures all digits that follow \v or \c markers followed by whitespace located at the start of a string
  const regex = /^\\[vc]\s+(\d+)/;
  const match = text.match(regex);
  if (match) {
    return +match[1];
  }
  return undefined;
};
