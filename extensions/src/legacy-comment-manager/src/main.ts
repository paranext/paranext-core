import { logger } from '@papi/backend';

export async function activate() {
  logger.info('Legacy comment manager is activating!');
  /*
  setTimeout(async () => {
    logger.info('GETTING COMMENTS');
    const commentPDP = await papi.projectDataProviders.get('legacyCommentManager.Comment', '93fd8ea0de378f9d331cb798ef8039595524c161');
    const comments = await commentPDP.getComment({ bookId: 'GEN' });
    logger.info(`COMMENTS! => ${JSON.stringify(comments)}`);
  }, 20000);
*/
}

export async function deactivate() {
  logger.info('Legacy comment manager is deactivating!');
  return true;
}
