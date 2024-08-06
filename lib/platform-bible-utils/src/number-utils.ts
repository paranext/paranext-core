import NumberFormat from './intl-number-format';

/**
 * Formats a number according to the locale and formatting options of this NumberFormat object
 *
 * @example FormatBytes(1024) => "1 KB"
 *
 * @example FormatBytes(1024, 0) => "1 KB"
 *
 * @param fileSize Number to format
 * @param decimals Number of decimal places to round to
 * @returns String representing the given number formatted according to the locale and formatting
 *   options of this NumberFormat object
 */
export default function formatBytes(fileSize: number, decimals: number = 2): string {
  if (fileSize === 0) return '0 Bytes';
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(fileSize) / Math.log(1024));
  const sizeToUse = sizes[i];
  const formattingFileSize = new NumberFormat('en', {
    style: 'decimal',
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
  }).format(fileSize / 1024 ** i);
  return `${formattingFileSize} ${sizeToUse}`;
}
