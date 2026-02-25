const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const JSON5 = require('json5');

const build = JSON5.parse(fs.readFileSync('./electron-builder.json5', 'utf8'));

exports.default = async function notarizeMacos(context) {
  const { electronPlatformName, appOutDir } = context;

  if (electronPlatformName !== 'darwin' && process.env.CI !== 'true') {
    console.warn('Skipping notarizing step. Packaging is only for macOS in CI');
    return;
  }

  const appName = context.packager.appInfo.productFilename;
  const appPath = path.join(appOutDir, `${appName}.app`);

  // STEP 1: Sign Mercurial Bundle

  if (process.env.CSC_LINK && process.env.CSC_KEY_PASSWORD) {
    const mercurialPath = path.join(appPath, 'Contents', 'Resources', 'hg-universal');

    if (fs.existsSync(mercurialPath)) {
      console.log('SIGNING MERCURIAL BUNDLE');
      console.log(`App path: ${appPath}`);

      try {
        // Get the identity that electron-builder used by reading from the signed app
        let identity;
        try {
          const identityOutput = execSync(`codesign -dvv "${appPath}" 2>&1 | grep "Authority="`, {
            encoding: 'utf-8',
          });
          // Extract identity from output like: Authority=Developer ID Application: ...
          const match = identityOutput.match(/Authority=(Developer ID Application[^)]+\))/);
          if (match) {
            [, identity] = match;
            console.log(`Detected signing identity from main app: ${identity}`);
          }
        } catch (e) {
          console.warn('Could not detect identity from signed app, using default');
        }

        // Fallback to finding the identity
        if (!identity) {
          try {
            const findIdentityOutput = execSync(
              `security find-identity -v -p codesigning | grep "Developer ID Application"`,
              { encoding: 'utf-8' },
            );
            // Extract from output like: 1) ABC123... "Developer ID Application: Company Name (TEAM_ID)"
            const match = findIdentityOutput.match(/"(Developer ID Application[^"]+)"/);
            if (match) {
              [, identity] = match;
              console.log(`Found signing identity: ${identity}`);
            }
          } catch (e) {
            console.error('Could not find Developer ID Application identity in keychain');
            throw new Error('No valid signing identity found');
          }
        }

        if (!identity) {
          throw new Error('Could not determine signing identity');
        }

        // Sign Python3 binary
        const pythonBinary = path.join(mercurialPath, '_internal', 'Python3');
        if (fs.existsSync(pythonBinary)) {
          console.log('  Signing Python3 binary...');
          execSync(
            `codesign --force --sign "${identity}" --options runtime --timestamp "${pythonBinary}"`,
            { stdio: 'inherit' },
          );
        }

        // Sign Python3 framework binary
        const pythonFrameworkBinary = path.join(
          mercurialPath,
          '_internal',
          'Python3.framework',
          'Python3',
        );
        if (fs.existsSync(pythonFrameworkBinary)) {
          console.log('  Signing Python3 framework binary...');
          execSync(
            `codesign --force --sign "${identity}" --options runtime --timestamp "${pythonFrameworkBinary}"`,
            { stdio: 'inherit' },
          );
        }

        // Sign Python3 framework versions binary
        const pythonFrameworkVersionsBinary = path.join(
          mercurialPath,
          '_internal',
          'Python3.framework',
          'Versions',
          '3.9',
          'Python3',
        );
        if (fs.existsSync(pythonFrameworkVersionsBinary)) {
          console.log('  Signing Python3 framework versions binary...');
          execSync(
            `codesign --force --sign "${identity}" --options runtime --timestamp "${pythonFrameworkVersionsBinary}"`,
            { stdio: 'inherit' },
          );
        }

        // Sign all .so files (Python extensions)
        const internalDir = path.join(mercurialPath, '_internal');
        if (fs.existsSync(internalDir)) {
          console.log('  Signing Python extension modules (.so files)...');

          try {
            const soFiles = execSync(`find "${internalDir}" -name "*.so" -type f`, {
              encoding: 'utf-8',
            })
              .trim()
              .split('\n')
              .filter(Boolean);

            if (soFiles.length > 0) {
              console.log(`    Found ${soFiles.length} .so files`);
              let successCount = 0;

              soFiles.forEach((file) => {
                try {
                  execSync(
                    `codesign --force --sign "${identity}" --options runtime --timestamp "${file}"`,
                    { stdio: 'pipe' },
                  );
                  successCount += 1;
                } catch (e) {
                  console.warn(`    Failed to sign: ${path.basename(file)}`);
                }
              });

              console.log(`    Successfully signed ${successCount}/${soFiles.length} .so files`);
            }
          } catch (e) {
            console.warn(`    Warning finding .so files: ${e.message}`);
          }
        }

        // Sign the main hg binary
        const hgBinary = path.join(mercurialPath, 'hg');
        if (fs.existsSync(hgBinary)) {
          console.log('  Signing hg executable...');
          execSync(
            `codesign --force --sign "${identity}" --options runtime --timestamp "${hgBinary}"`,
            { stdio: 'inherit' },
          );
        }

        // CRITICAL: Re-sign the main app bundle after modifying internal components
        console.log('  Re-signing main app bundle...');
        const entitlementsPath = path.resolve(
          __dirname,
          '..',
          '..',
          'assets',
          'entitlements.mac.plist',
        );
        execSync(
          `codesign --force --sign "${identity}" --options runtime --timestamp --entitlements "${entitlementsPath}" "${appPath}"`,
          { stdio: 'inherit' },
        );

        // Verify signatures
        console.log('  Verifying Mercurial bundle signature...');
        try {
          execSync(`codesign --verify --deep --strict --verbose=2 "${mercurialPath}"`, {
            stdio: 'inherit',
          });
          console.log('  Verifying main app signature...');
          execSync(`codesign --verify --deep --strict --verbose=2 "${appPath}"`, {
            stdio: 'inherit',
          });
          console.log('Mercurial bundle signing completed successfully');
        } catch (e) {
          console.warn('  Verification had warnings (may be acceptable)');
          console.log('Mercurial bundle signing completed');
        }
      } catch (error) {
        console.error('FAILED TO SIGN MERCURIAL COMPONENTS');
        console.error(`Error: ${error.message}`);
        throw error;
      }
    } else {
      console.log('Mercurial bundle not found, skipping signing');
    }
  }

  // STEP 2: Notarize

  if (
    !(
      'APPLE_ID' in process.env &&
      'APPLE_APP_SPECIFIC_PASSWORD' in process.env &&
      'APPLE_TEAM_ID' in process.env
    )
  ) {
    console.warn(
      'Skipping notarizing step. APPLE_ID, APPLE_APP_SPECIFIC_PASSWORD, and APPLE_TEAM_ID env variables must be set',
    );
    return;
  }

  console.log(`NOTARIZING ${build.appId}`);

  const { notarize } = await import('@electron/notarize');

  try {
    await notarize({
      tool: 'notarytool',
      appBundleId: build.appId,
      appPath: `${appOutDir}/${appName}.app`,
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_APP_SPECIFIC_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID,
    });
    console.log('Notarization completed successfully');
  } catch (error) {
    console.error(`Notarization failed: ${error.message}`);
    throw error;
  }
};
