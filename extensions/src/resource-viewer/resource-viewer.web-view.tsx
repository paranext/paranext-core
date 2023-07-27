import papi from 'papi-frontend';
import { ResourceDataTypes } from 'resource-viewer';
// @ts-ignore usfm-js has no typescript and thus no type declarations
import { toJSON, toUSFM, removeMarker } from 'usfm-js';

const {
  react: {
    hooks: { useData },
  },
  logger,
} = papi;

globalThis.webViewComponent = function ResourceViewer() {
  logger.info('Preparing to display the Resource Viewer');

  const usfm = useData.Usfm<ResourceDataTypes, 'Usfm'>('resource-viewer.resources', '', '');
  const json = toJSON(usfm[0]);

  return (
    <>
      <div>USFM Resource:</div>
      <div>{usfm[0]}</div>
      <div>-------------------------------------</div>
      <div>
        <pre>{JSON.stringify(json, null, 2)}</pre>
      </div>
    </>
  );
};
