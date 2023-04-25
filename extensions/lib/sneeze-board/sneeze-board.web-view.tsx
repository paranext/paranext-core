import papi from 'papi';

const {
  react: {
    components: { Button },
  },
  logger,
} = papi;

// @ts-expect-error ts(6133) This function is called by the React web view container
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function SneezeBoard() {
  logger.info('Preparing to display the Sneeze Board');
  return (
    <div>
      <div className="flex-container" />
      <Button>I Sneezed</Button>
    </div>
  );
}
