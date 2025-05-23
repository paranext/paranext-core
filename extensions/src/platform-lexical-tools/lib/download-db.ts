import fs from 'fs';
import path from 'path';
import https from 'https';
import crypto from 'crypto';
import { XzReadableStream } from 'xz-decompress';

// Configuration
// GitHub repository: https://github.com/paranext/dependencies
const DB_FILENAME = 'lexical.db.xz';
const CHECKSUM_FILENAME = 'lexical.db.xz.sha256';
// Use raw.githubusercontent.com URL directly to avoid redirects
const RAW_CONTENT_BASE_URL =
  'https://raw.githubusercontent.com/paranext/dependencies/main/lexical-db';
// For large files, GitHub uses media.githubusercontent.com
const MEDIA_CONTENT_BASE_URL =
  'https://media.githubusercontent.com/media/paranext/dependencies/main/lexical-db';
const LOCAL_DB_DIR = path.join(__dirname, '..', 'assets', 'lexical-db');
const LOCAL_DB_PATH = path.join(LOCAL_DB_DIR, DB_FILENAME);
const LOCAL_CHECKSUM_PATH = path.join(LOCAL_DB_DIR, CHECKSUM_FILENAME);

// Create the DB directory if it doesn't exist
if (!fs.existsSync(LOCAL_DB_DIR)) {
  fs.mkdirSync(LOCAL_DB_DIR, { recursive: true });
  console.log(`Created directory: ${LOCAL_DB_DIR}`);
}

/**
 * Calculate SHA-256 checksum of a file
 *
 * @param filePath Path to the file to calculate checksum for
 * @returns Promise resolving to the file's hex checksum
 */
function calculateChecksum(filePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('sha256');
      // Use a Buffer-based approach for consistent results
      const fileBuffer = fs.readFileSync(filePath);

      hash.update(fileBuffer);
      resolve(hash.digest('hex'));
    } catch (error) {
      console.error(
        `Error calculating checksum: ${error instanceof Error ? error.message : String(error)}`,
      );
      reject(error);
    }
  });
}

/**
 * Download a file from a URL to a local destination
 *
 * @param url URL of the file to download
 * @param destination Local path to save the file
 * @returns Promise that resolves when download is complete
 */
function downloadFile(url: string, destination: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destination);

    const handleResponse = (response: any) => {
      // Handle redirects (301, 302, 303, 307, 308)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Redirecting to ${response.headers.location}`);
        file.close();

        // Follow the redirect
        https.get(response.headers.location, handleResponse).on('error', (err: Error) => {
          fs.unlink(destination, () => {}); // Delete the file on error
          reject(err);
        });
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}, status code: ${response.statusCode}`));
        return;
      }

      // Add download progress reporting
      const totalSize = parseInt(response.headers['content-length'] || '0', 10);
      let downloadedSize = 0;
      let lastLoggedPercent = 0;

      if (totalSize > 0) {
        console.log(`Total download size: ${Math.round((totalSize / 1024 / 1024) * 100) / 100} MB`);
      }

      response.on('data', (chunk: Buffer) => {
        downloadedSize += chunk.length;

        if (totalSize > 0) {
          const percent = Math.round((downloadedSize / totalSize) * 100);

          // Log progress every 10%
          if (percent >= lastLoggedPercent + 10 || percent === 100) {
            console.log(`Download progress: ${percent}%`);
            lastLoggedPercent = percent - (percent % 10);
          }
        }
      });

      response.pipe(file);

      file.on('finish', () => {
        console.log('Download complete.');
        file.close();
        resolve();
      });

      file.on('error', (err: Error) => {
        fs.unlink(destination, () => {}); // Delete the file on error
        reject(err);
      });
    };

    https.get(url, handleResponse).on('error', (err: Error) => {
      fs.unlink(destination, () => {}); // Delete the file on error
      reject(err);
    });
  });
}

/**
 * Extract an XZ compressed file using pure JavaScript implementation
 *
 * @param filePath Path to the compressed file
 * @returns Promise resolving to the path of the extracted file
 */
async function extractXzFile(filePath: string): Promise<string> {
  try {
    const outputFile = filePath.replace('.xz', '');
    console.log(`Extracting ${filePath} using xz-decompress...`);

    // Read the compressed file
    const compressedData = fs.readFileSync(filePath);

    // Create a Blob from the buffer and get a ReadableStream
    const blob = new Blob([compressedData]);
    const compressedStream = blob.stream();

    // Use xz-decompress to decompress the file
    const decompressedData = new XzReadableStream(compressedStream);
    const reader = decompressedData.getReader();

    // Create a write stream for the output file
    const writeStream = fs.createWriteStream(outputFile);

    // Process the stream chunks until done
    let result;
    while (!(result = await reader.read()).done) {
      writeStream.write(result.value);
    }

    // Close the write stream
    await new Promise<void>((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
      writeStream.end();
    });

    console.log(`Extracted to ${outputFile}`);
    return outputFile;
  } catch (error) {
    console.error(
      `Error extracting file: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
}

/**
 * Fetch the checksum from the remote repository
 *
 * @returns Promise resolving to the SHA-256 checksum string
 */
async function fetchRemoteChecksum(): Promise<string> {
  return new Promise((resolve, reject) => {
    const url = `${RAW_CONTENT_BASE_URL}/${CHECKSUM_FILENAME}`;

    const handleResponse = (response: any) => {
      // Handle redirects (301, 302, 303, 307, 308)
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        console.log(`Redirecting to ${response.headers.location}`);

        // Follow the redirect
        https.get(response.headers.location, handleResponse).on('error', (err: Error) => {
          reject(err);
        });
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to fetch checksum, status code: ${response.statusCode}`));
        return;
      }

      const chunks: Buffer[] = [];

      response.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      response.on('end', () => {
        // Convert buffer chunks to string and extract hash value
        const data = Buffer.concat(chunks).toString('utf-8');
        const checksum = data.trim().split(/\s+/)[0];
        resolve(checksum);
      });

      response.on('error', (err: Error) => {
        reject(err);
      });
    };

    https.get(url, handleResponse).on('error', (err: Error) => {
      reject(err);
    });
  });
}

/** Main function to handle the download and extraction process */
async function main(): Promise<void> {
  try {
    // Fetch the remote checksum
    const remoteChecksum = await fetchRemoteChecksum();
    console.log(`Remote checksum: ${remoteChecksum}`);

    // Check if we already have the file with the correct checksum
    let needsDownload = true;

    if (fs.existsSync(LOCAL_DB_PATH)) {
      console.log('Local DB file exists, checking if it needs updating...');

      try {
        const localChecksum = await calculateChecksum(LOCAL_DB_PATH);
        console.log(`Local checksum: ${localChecksum}`);

        // For debugging, also show the exact format and length of each checksum
        console.log(`Remote checksum length: ${remoteChecksum.length}, value: [${remoteChecksum}]`);
        console.log(`Local checksum length: ${localChecksum.length}, value: [${localChecksum}]`);

        if (localChecksum === remoteChecksum) {
          console.log('Checksums match, no need to download again.');
          needsDownload = false;
        } else {
          console.log('Checksums differ, will download updated file.');
        }
      } catch (error) {
        console.warn(
          `Error calculating local checksum: ${error instanceof Error ? error.message : String(error)}`,
        );
        console.log('Will download the file to be safe.');
      }
    } else {
      console.log('Local DB file does not exist, will download it.');
    }

    // Download the file if needed
    if (needsDownload) {
      console.log(`Downloading ${DB_FILENAME}...`);

      // Download DB file using media content URL for large files
      const dbUrl = `${MEDIA_CONTENT_BASE_URL}/${DB_FILENAME}`;
      await downloadFile(dbUrl, LOCAL_DB_PATH);
      console.log(`Downloaded ${DB_FILENAME} to ${LOCAL_DB_PATH}`);

      // Download checksum file
      const checksumUrl = `${RAW_CONTENT_BASE_URL}/${CHECKSUM_FILENAME}`;
      await downloadFile(checksumUrl, LOCAL_CHECKSUM_PATH);
      console.log(`Downloaded ${CHECKSUM_FILENAME} to ${LOCAL_CHECKSUM_PATH}`);

      // Verify the downloaded file
      const downloadedChecksum = await calculateChecksum(LOCAL_DB_PATH);
      if (downloadedChecksum !== remoteChecksum) {
        throw new Error(
          `Checksum verification failed after download. Expected: ${remoteChecksum}, Got: ${downloadedChecksum}`,
        );
      }

      console.log('Checksum verification passed.');

      // Extract the file
      await extractXzFile(LOCAL_DB_PATH);
    } else {
      // Check if the extracted file exists
      const extractedPath = LOCAL_DB_PATH.replace('.xz', '');
      if (!fs.existsSync(extractedPath)) {
        console.log('Extracted DB file does not exist, extracting now...');
        await extractXzFile(LOCAL_DB_PATH);
      }
    }

    console.log('DB file preparation complete.');
  } catch (error) {
    console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }
}

// Run the main function
void main();
