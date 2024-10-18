import { WebViewProps } from '@papi/core';
import { logger } from '@papi/frontend';
import { Button, cn, Input, Spinner } from 'platform-bible-react';
import { wait } from 'platform-bible-utils';
import { PropsWithChildren, useEffect, useState } from 'react';

type GenericComponentProps = PropsWithChildren<{ className?: string }>;

/** Just a div with some margins to give some space around parts of the web view */
function Section({ children, className }: GenericComponentProps) {
  return <div className={cn('tw-m-1', className)}>{children}</div>;
}

/** Two-column grid layout div */
function Grid({ children, className }: GenericComponentProps) {
  return (
    <div
      className={cn(
        'tw-grid tw-grid-cols-[1fr_2fr] max-[300px]:tw-grid-cols-1 tw-gap-1 tw-items-center',
        className,
      )}
    >
      {children}
    </div>
  );
}

async function saveRegistrationInformation(
  name: string,
  registrationCode: string,
  email: string,
  supporter: string,
) {
  logger.debug(
    `Pretending to save Registration Information and restart: ${name}, ${registrationCode}, ${email}, ${supporter}`,
  );
  return wait(1000);
}

globalThis.webViewComponent = function ParatextRegistration({ useWebViewState }: WebViewProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  const [hasUnsavedChanges, setHasUnsavedChanges] = useWebViewState('hasUnsavedChanges', false);

  const [name, setNameInternal] = useWebViewState('name', '');
  function setName(newName: string) {
    setNameInternal(newName);
    setHasUnsavedChanges(true);
  }
  const [registrationCode, setRegistrationCodeInternal] = useWebViewState('registrationCode', '');
  function setRegistrationCode(newRegistrationCode: string) {
    setRegistrationCodeInternal(newRegistrationCode);
    setHasUnsavedChanges(true);
  }
  const [email, setEmailInternal] = useWebViewState('email', '');
  function setEmail(newEmail: string) {
    setEmailInternal(newEmail);
    setHasUnsavedChanges(true);
  }
  const [supporter, setSupporterInternal] = useWebViewState('supporter', '');
  function setSupporter(newSupporter: string) {
    setSupporterInternal(newSupporter);
    setHasUnsavedChanges(true);
  }

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const saveAndRestart = async () => {
    setIsSaving(true);

    try {
      await saveRegistrationInformation(name, registrationCode, email, supporter);
      if (isMounted) setHasUnsavedChanges(false);
    } catch (e) {
      logger.warn(`Failed to save Paratext Registration information! ${e}`);
      if (isMounted) setSaveError(`${e}`);
    }

    if (isMounted) setIsSaving(false);
  };

  return (
    <div className="tw-p-2 tw-flex tw-flex-col tw-justify-between tw-h-screen">
      <div>
        <Section>Please enter your Paratext Registration Information.</Section>
        <Section className="tw-mb-4">
          <Grid>
            <span>Registration Name</span>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            <span>Registration Code</span>
            <Input value={registrationCode} onChange={(e) => setRegistrationCode(e.target.value)} />
            <span>Your Email Address</span>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Grid>
        </Section>
        <Section>Please specify who provides Paratext support to you:</Section>
        <Section>
          <Grid>
            <span>Supporter Name</span>
            <Input value={supporter} onChange={(e) => setSupporter(e.target.value)} />
          </Grid>
        </Section>
      </div>
      <Section>
        {saveError && <Section>{saveError}</Section>}
        <Grid className="tw-grid-cols-[1fr_auto] tw-items-end">
          <span className="tw-italic tw-text-sm">
            Saving changes will automatically restart the application.
          </span>
          <Button
            variant="destructive"
            disabled={!hasUnsavedChanges || isSaving}
            onClick={saveAndRestart}
          >
            {isSaving ? <Spinner /> : 'Save and Restart'}
          </Button>
        </Grid>
      </Section>
    </div>
  );
};
