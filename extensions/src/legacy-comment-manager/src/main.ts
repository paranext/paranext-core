import { logger } from '@papi/backend';

export async function activate(): Promise<void> {
  logger.debug('Legacy comment manager is activating!');

  // Uncomment to force enable comments
  // papi.settings.set('platform.commentsEnabled', true);

  /* Potentially helpful code if you need to see comments without the UI
  setTimeout(async () => {
    logger.debug('GETTING COMMENTS');
    const commentPDP = await papi.projectDataProviders.get('legacyCommentManager.Comments', '93fd8ea0de378f9d331cb798ef8039595524c161');
    const comments = await commentPDP.getComments({ bookId: 'GEN' });
    logger.debug(`COMMENTS! => ${JSON.stringify(comments)}`);
  }, 20000);
*/
}

export async function deactivate() {
  logger.debug('Legacy comment manager is deactivating!');
  return true;
}
