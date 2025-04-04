/* eslint-disable global-require */

'use strict';

const papi = require('@papi/backend');

const { logger } = papi;

// This is here because we can't bundle a webview in due to webpack not bundling the evil extension
const EVIL_WEBVIEW = `
<!DOCTYPE html>
<html>
  <body>
    <script>
      // Try to create a src iframe on the parent window - this would let us escape our CSP
      try {
        // Try to create a \`src\` iframe with less strict sandboxing - allow-same-origin (not allowed
        // on \`src\` iframes). Note we are also providing \`srcdoc\`, but browsers fall back to
        // \`src\` if they do not support \`srcdoc\`, so any iframe with \`src\` specified is treated
        // as a \`src\` iframe
        const unsandboxedSrcId = "evil-unsandboxed-src-iframe";
        const unsandboxedSrcIFrame = window.top.document.createElement('iframe');
        unsandboxedSrcIFrame.id = unsandboxedSrcId;
        unsandboxedSrcIFrame.src = "https://example.com/";
        unsandboxedSrcIFrame.srcdoc = \`<html><body>&lt;&lt;BAD&gt;&gt; This is evil's new src iframe with sandbox
        'allow-same-origin'. Please report this!</body></html>\`;
        unsandboxedSrcIFrame.setAttribute('sandbox', 'allow-same-origin allow-scripts');

        // We now have two layers preventing this iframe from being created. Uncomment this warning
        // if you want to test the MutationObserver. But this iframe should be completely rejected
        // by the monkey-patched document.createElement, so this warning is not needed at the moment
        /* papi.logger.warn(
          'Evil is trying to execute code with higher privileges as a test of src iframes! You should see three more warnings soon after this. Only these four warnings are expected.'
        ); */

        // If one of these evil src iframes already existed, replace it. Otherwise create a new one
        const oldSrcIFrame = window.top.document.getElementById(unsandboxedSrcId);
        if (oldSrcIFrame != null) oldSrcIFrame.replaceWith(unsandboxedSrcIFrame);
        else window.top.document.body.appendChild(unsandboxedSrcIFrame);

        papi.logger.error('<<BAD>> Evil successfully created a src iframe on the parent window!')
      } catch (e) {
        // No need to log good stuff unless we're testing
        // papi.logger.info(\`Evil: Good error on creating src iframe outside its frame: \${e.message}\`);
      }

      // Try to create a srcdoc iframe on the parent window - this would let us escape our CSP
      try {
        // Try to create a \`srcdoc\` iframe with less strict sandboxing - allow-modals (better test than no
        // sandboxing at all) - inside a div to make sure the MutationObserver is watching recursively
        const unsandboxedId = "evil-unsandboxed-iframe-div";
        const unsandboxedIFrameDiv = window.top.document.createElement('div');
        unsandboxedIFrameDiv.id = unsandboxedId;
        const unsandboxedIFrame = window.top.document.createElement('iframe');
        unsandboxedIFrame.srcdoc = \`<html><script>alert(
          "<<BAD>> evil created a new iframe with sandbox 'allow-modals'!")<\\/script><body>This is
          evil's new iframe with sandbox 'allow-modals'</body></html>\`;
        unsandboxedIFrame.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-modals');
        unsandboxedIFrameDiv.appendChild(unsandboxedIFrame);

        // We now have two layers preventing this iframe from being created. Uncomment this warning
        // if you want to test the MutationObserver. But this iframe should be completely rejected
        // by the monkey-patched document.createElement, so this warning is not needed at the moment
        /* papi.logger.warn(
          'Evil is trying to execute code with higher privileges as a test of srcdoc iframes! You should see two more warnings soon after this. Only these four warnings (including the previous one) are expected.'
        ); */

        // If one of these evil iframes already existed, replace it. Otherwise create a new one
        const oldIFrameDiv = window.top.document.getElementById(unsandboxedId);
        if (oldIFrameDiv != null) oldIFrameDiv.replaceWith(unsandboxedIFrameDiv);
        else window.top.document.body.appendChild(unsandboxedIFrameDiv);

        papi.logger.error('<<BAD>> Evil successfully created a srcdoc iframe on the parent window!')
      } catch (e) {
        // No need to log good stuff unless we're testing
        // papi.logger.info(\`Evil: Good error on creating srcdoc iframe outside its frame: \${e.message}\`);
      }

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
        // No need to log good stuff unless we're testing
        // papi.logger.info(\`Evil: Good error on creating script outside its frame: \${e.message}\`);
      }

      // Try to create an anchor outside the iframe that allows navigation
      // This would mean iframes could create a link to navigate to a different page.
      try {
        const unsafeAnchor = window.top.document.createElement('a');
        unsafeAnchor.href ='https://example.com';
        unsafeAnchor.textContent = '<<BAD>> This link is from the evil webview!'
        window.top.document.body.appendChild(unsafeAnchor);
      } catch (e) {
        // No need to log good stuff unless we're testing
        // papi.logger.info(\`Evil: Good error on creating script outside its frame: \${e.message}\`);
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

     // Try to create a modal through window.top.alert
      try {
        window.top.alert('<<BAD>> Evil could create a modal through window.top.alert!');
      } catch (e) {
        // No need to log good stuff unless we're testing
        // papi.logger.info(\`Evil: Good error on running window.top.alert: \${e.message}\`);
      }

     // Try to create a modal through window.top.confirm
      try {
        window.top.confirm('<<BAD>> Evil could create a modal through window.top.confirm!');
      } catch (e) {
        // No need to log good stuff unless we're testing
        // papi.logger.info(\`Evil: Good error on running window.top.confirm: \${e.message}\`);
      }

     // Try to create a modal through window.top.print
      try {
        window.top.print('<<BAD>> Evil could create a modal through window.top.print!');
      } catch (e) {
        // No need to log good stuff unless we're testing
        // papi.logger.info(\`Evil: Good error on running window.top.print: \${e.message}\`);
      }

     // Try to create a modal through window.top.prompt
      try {
        window.top.prompt('<<BAD>> Evil could create a modal through window.top.prompt!');
      } catch (e) {
        // No need to log good stuff unless we're testing
        // papi.logger.info(\`Evil: Good error on running window.top.prompt: \${e.message}\`);
      }

     // Try to create a popup through window.top.open
      try {
        window.top.open('<<BAD>> Evil could create a popup through window.top.open!');
      } catch (e) {
        // No need to log good stuff unless we're testing
        // papi.logger.info(\`Evil: Good error on running window.top.open: \${e.message}\`);
      }

     // Try to create a popup through window.top.showModalDialog
      try {
        window.top.showModalDialog('<<BAD>> Evil could create a popup through window.top.showModalDialog!');
      } catch (e) {
        // No need to log good stuff unless we're testing
        // papi.logger.info(\`Evil: Good error on running window.top.showModalDialog: \${e.message}\`);
      }

     // Try to access \`navigator.presentation\` through window.top.navigator
      try {
        if (window.top.navigator.presentation)
          papi.logger.error('<<BAD>> Evil could access \`window.top.navigator.presentation\`!');
        else throw new Error('navigator.presentation is undefined');
      } catch (e) {
        if (e.message === 'navigator.presentation is undefined') {
          // No need to log good stuff unless we're testing
          // papi.logger.info(\`Evil: Good error on running window.top.navigator.presentation: \${e.message}\`);
        }
        else papi.logger.warn(\`Evil web view failed to access window.top.navigator.presentation, but it was not because window.top.navigator.presentation is undefined. Investigate!: \${e.message}\`);
      }

      // Note: we are using this sourceURL in web-view.service.ts, so keep it up-to-date with this
      //# sourceURL=evil.web-view.html
    </script>
    <div>
      This evil webview is trying to do bad things. If you see a new iframe or link on the side of
      the screen or see modals about evil, it did bad things. But if you see this message without
      seeing modals, it probably wasn't able to do bad things! 🎉
    </div>
    <div>
      Below, you should see an iframe with another evil webview code that also should fail to do bad
      things:
    </div>
    <iframe src="papi-extension://evil/assets/evil.web-view.html"></iframe>
    <!--
    Uncomment this to test that iframes within iframes are restricted by the sandbox of their parent
    This is commented out because it causes a sandbox error to show up in the console, and we don't
    want to distract people with it.
    <iframe srcdoc="<!DOCTYPE html><html><body><script>try { window.top.location='https://example.com'; } catch (e) {}</script></body></html>"></iframe>
    -->
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
      allowedFrameSources: ['papi-extension:'],
    };
  },
};

const evilFileWebViewProvider = {
  webViewType: 'evil.evilFile',
  async getWebView(savedWebView) {
    return {
      ...savedWebView,
      title: 'Evil File',
      contentType: 'url',
      content: 'papi-extension://evil/assets/evil.web-view.html',
      allowScripts: true,
      allowedFrameSources: ['papi-extension://evil/.+'],
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
    // No need to log good stuff unless we're testing
    // logger.info(`Evil: Good error on require fs: ${e.message}`);
  }

  try {
    // This will be blocked and will suggest the papi.fetch api.
    const https = require('https');
    logger.error(`Evil: <<BAD>> Successfully imported https! ${JSON.stringify(https)}`);
  } catch (e) {
    // No need to log good stuff unless we're testing
    // logger.info(`Evil: Good error on require https: ${e.message}`);
  }

  try {
    // This should always work because `fetch` is replaced with `papi.fetch`.
    await fetch('https://www.example.com');
    // No need to log good stuff unless we're testing
    // logger.info('Evil: Good - fetch is working.');
  } catch (e) {
    logger.error(`Evil: <<BAD>> error on fetch! ${e}`);
  }

  try {
    // This is just for testing and will throw an exception.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const xhr = new XMLHttpRequest();
    logger.error(`Evil: <<BAD>> Successfully created an XMLHttpRequest!`);
  } catch (e) {
    // No need to log good stuff unless we're testing
    // logger.info(`Evil: Good error on XMLHttpRequest! ${e}`);
  }

  try {
    // This is just for testing and will throw an exception.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const webSocket = new WebSocket();
    logger.error(`Evil: <<BAD>> Successfully created a WebSocket!`);
  } catch (e) {
    // No need to log good stuff unless we're testing
    // logger.info(`Evil: Good error on WebSocket! ${e}`);
  }

  try {
    // This will be blocked and will suggest the papi.storage api.
    const fs = await import('fs');
    logger.error(
      `Evil: <<BAD>> Successfully dynamically imported fs! fs.readFileSync = ${fs.readFileSync}`,
    );
  } catch (e) {
    // No need to log good stuff unless we're testing
    // logger.info(`Evil: Good error on dynamic import! ${e.message}`);
  }

  try {
    // This should always work.
    /* const genericFetch =  */ await (await papi.fetch('https://www.example.com')).text();
    // No need to log good stuff unless we're testing
    /* logger.info(
      `Evil: Good success - could papi.fetch example.com "${genericFetch.substring(0, 100)}"`,
    ); */
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
  papi.webViews.openWebView(evilWebViewProvider.webViewType, undefined, { existingId: '?' });

  const evilFileWebViewProviderPromise = papi.webViewProviders.register(
    evilFileWebViewProvider.webViewType,
    evilFileWebViewProvider,
  );
  papi.webViews.openWebView(evilFileWebViewProvider.webViewType, undefined, { existingId: '?' });

  context.registrations.add(await evilWebViewProviderPromise);
  context.registrations.add(await evilFileWebViewProviderPromise);

  logger.info('Evil is finished activating!');
}

function deactivate() {
  logger.info('Evil is deactivated.');
  logger.error(
    'Evil is purposely failing to deactivate as a test! You should see one more error soon after this. Only these two errors are expected.',
  );
}

exports.activate = activate;
exports.deactivate = deactivate;
