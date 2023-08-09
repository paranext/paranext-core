/* eslint-disable global-require */

'use strict';

const papi = require('papi-backend');

const { logger } = papi;

const EVIL_WEBVIEW = `
<!DOCTYPE html>
<html>
  <body>
    <script>
      // Try to create an iframe with less strict sandboxing - allow-modals (better test than no
      // sandboxing at all)
      const unsandboxedId = "evil-unsandboxed-iframe";
      const unsandboxedIFrame = window.top.document.createElement('iframe');
      unsandboxedIFrame.id = unsandboxedId;
      unsandboxedIFrame.srcdoc = \`<html><script>alert(
        "<<BAD>> evil created a new iframe with sandbox 'allow-modals'!")<\\/script><body>This is
        evil's new iframe with sandbox 'allow-modals'</body></html>\`;
      unsandboxedIFrame.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-modals');

      // If one of these evil iframes already existed, replace it. Otherwise create a new one
      papi.logger.warn(
        'Evil is trying to execute code with higher privileges as a test! You should see one more warning soon after this. Only these two warnings are expected.'
      );
      const oldIFrame = window.top.document.getElementById(unsandboxedId);
      if (oldIFrame != null) oldIFrame.replaceWith(unsandboxedIFrame);
      else window.top.document.body.appendChild(unsandboxedIFrame);

      // Try to create a script outside the iframe that runs arbitrary code
      // This would mean iframes can break out of their sandboxing and CSP by executing code that
      // looks like it's from the renderer. So this code could navigate to a different page for
      // example.
      try {
        const unsandboxedScript = window.top.document.createElement('script');
        unsandboxedScript.textContent =
          "alert('<<BAD>> evil created a script outside its iframe');window.location = 'https://example.com'";
        window.top.document.body.appendChild(unsandboxedScript);
      } catch (e) {
        papi.logger.info(\`Evil: Good error on creating script outside its frame: \${e.message}\`);
      }

      // Try to create an image outside the iframe with arbitrary code execution in it
      // This creates a CSP error in the console, so let's just leave it out for now. Test anytime
      // the CSP changes!
      /*
      const imgWithAttributeScript = window.top.document.createElement("img");
      imgWithAttributeScript.setAttribute("src", "invalid");
      imgWithAttributeScript.setAttribute("onerror", \`alert(
        '<<BAD>> evil created an img outside its iframe with a script attribute that executed');\`);
      // Note that you don't even have to put the image on the document to get it to run onerror
      // window.top.document.body.appendChild(imgWithAttributeScript);
      */

      // Note: we are using this sourceURL in web-view.service.ts, so keep it up-to-date with this
      //# sourceURL=evil.web-view.html
    </script>
    <div>
      This evil webview is trying to do bad things. If you see a new iframe on the side of the
      screen or see modals about evil, it did bad things. But if you see this message without seeing
      modals, it probably wasn't able to do bad things! 🎉
    </div>
  </body>
</html>
`;

const evilWebViewProvider = {
  webViewType: 'evil.evil',
  async getWebView(savedWebView) {
    return {
      ...savedWebView,
      title: 'Evil',
      contentType: 'html',
      content: EVIL_WEBVIEW,
    };
  },
};

async function tryImports() {
  logger.info('Evil is importing! Mwahahaha');

  try {
    // This will be blocked and will suggest the papi.storage api.
    const fs = require('fs');
    logger.error(`Evil: <<BAD>> Successfully imported fs! fs.readFileSync = ${fs.readFileSync}`);
  } catch (e) {
    logger.info(`Evil: Good error on require fs: ${e.message}`);
  }

  try {
    // This will be blocked and will suggest the papi.fetch api.
    const https = require('https');
    logger.error(`Evil: <<BAD>> Successfully imported https! ${JSON.stringify(https)}`);
  } catch (e) {
    logger.info(`Evil: Good error on require https: ${e.message}`);
  }

  try {
    // This should always work because `fetch` is replaced with `papi.fetch`.
    await fetch('https://www.example.com');
    logger.info('Evil: Good - fetch is working.');
  } catch (e) {
    logger.error(`Evil: <<BAD>> error on fetch! ${e}`);
  }

  try {
    // This is just for testing and will throw an exception.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const xhr = new XMLHttpRequest();
    logger.error(`Evil: <<BAD>> Successfully created an XMLHttpRequest!`);
  } catch (e) {
    logger.info(`Evil: Good error on XMLHttpRequest! ${e}`);
  }

  try {
    // This is just for testing and will throw an exception.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const webSocket = new WebSocket();
    logger.error(`Evil: <<BAD>> Successfully created a WebSocket!`);
  } catch (e) {
    logger.info(`Evil: Good error on WebSocket! ${e}`);
  }

  try {
    // This will be blocked and will suggest the papi.storage api.
    const fs = await import('fs');
    logger.error(
      `Evil: <<BAD>> Successfully dynamically imported fs! fs.readFileSync = ${fs.readFileSync}`,
    );
  } catch (e) {
    logger.info(`Evil: Good error on dynamic import! ${e.message}`);
  }

  try {
    // This should always work.
    const genericFetch = await (await papi.fetch('https://www.example.com')).text();
    logger.info(
      `Evil: Good success - could papi.fetch example.com "${genericFetch.substring(0, 100)}"`,
    );
  } catch (e) {
    logger.error(`Evil: <<BAD>> error on papi.fetch! ${e}`);
  }
}

tryImports();

async function activate(context) {
  logger.info('Evil is activating...');
  tryImports();
  // 3 secs is timed to be after the extension service has finished initializing.
  setTimeout(tryImports, 3000);

  const evilWebViewProviderPromise = papi.webViewProviders.register(
    evilWebViewProvider.webViewType,
    evilWebViewProvider,
  );
  papi.webViews.getWebView(evilWebViewProvider.webViewType, undefined, { existingId: '?' });

  context.registrations.add(await evilWebViewProviderPromise);

  logger.info('Evil is finished activating!');
}

function deactivate() {
  logger.info('Evil is deactivated.');
}

exports.activate = activate;
exports.deactivate = deactivate;
