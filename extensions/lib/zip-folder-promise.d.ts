declare module 'zip-folder-promise' {
  export default function zipFolder(
    inputDir: string,
    outputFileName: string,
    format?: 'tar' | 'zip',
    subDirectory?: string,
  ): Promise<string>;
}
