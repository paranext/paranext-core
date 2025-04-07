import * as fs from 'fs';
import * as path from 'path';
import webpack from 'webpack';

/** Information added to buildInfo.json by the build process */
export type BuildInfo = {
  /** The build ID of the build [as specified by SemVer](https://semver.org/#spec-item-10) */
  build: string;
};

export class GenerateBuildInfoPlugin {
  constructor(private options: { filename: string; prepare: () => BuildInfo }) {}

  apply(compiler: webpack.Compiler) {
    compiler.hooks.beforeRun.tapAsync('GenerateBuildInfoPlugin', (_, callback) => {
      const { filename, prepare } = this.options;

      // Ensure the directory exists
      const outputPath = path.resolve(compiler.options.context || '', filename);
      fs.mkdirSync(path.dirname(outputPath), { recursive: true });

      // Null is part of the JSON.stringify API
      // eslint-disable-next-line no-null/no-null
      const content = JSON.stringify(prepare(), null, 2);
      fs.writeFileSync(outputPath, content);

      console.log(`GenerateBuildInfoPlugin: Generated ${filename}`);
      callback();
    });
  }
}
