import papi from 'papi-frontend';
import {
  ResourceDataProvider,
  ResourceDataTypes,
} from '@extensions/resource-viewer/resource-viewer';
import { useState, useEffect } from 'react';

const {
  react: {
    hooks: { useData, useDataProvider },
  },
  logger,
} = papi;

globalThis.webViewComponent = function ResourceViewer() {
  logger.info('Preparing to display the Resource Viewer');

  const dataProvider = useDataProvider<ResourceDataProvider>('resource-viewer.resources');

  //const usfm = useData.Usfm<ResourceDataTypes, 'Usfm'>('resource-viewer.resources', '', []);

  //   const verbose = true;
  //   const docSetId = 'Xxx/en_tit'; // just dummy values
  //   const [ready, setReady] = useState(false);
  //   const [epiteleteHtml, setEpiteleteHtml] = useState(
  //     new EpiteleteHtml({ proskomma: undefined, docSetId, options: { historySize: 100 } }),
  //   );

  //   const onReferenceSelected = (reference: string) => {
  //     console.log(`onReferenceSelected: ${reference}`);
  //   };

  //   const onSave = (bookCode: string, usfmText: string) => {
  //     console.log(`save button clicked: ${bookCode}, ${usfmText}`);
  //   };

  //   useEffect(() => {
  //     async function loadUsfm() {
  //       const tempPerf = usfm2perf(usfmText);
  //       await epiteleteHtml.sideloadPerf('TIT', tempPerf);
  //       setReady(true);
  //     }
  //     if (epiteleteHtml) loadUsfm();
  //   }, [epiteleteHtml]);

  //   const usfmEditorProps = {
  //     epiteleteHtml,
  //     onSave,
  //     onReferenceSelected,
  //     verbose,
  //     bookId: 'tit',
  //     activeReference: {
  //       bookId: 'tit',
  //       chapter: 1,
  //       verse: '1',
  //     },
  //   };
  //   return (
  //     <>
  //       <div>Editor:</div>
  //       <Editor {...usfmEditorProps} />
  //     </>
  //   );
};
