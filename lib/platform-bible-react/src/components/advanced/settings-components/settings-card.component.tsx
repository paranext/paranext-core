import { Card, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { CardContent } from '@mui/material';
import { PropsWithChildren } from 'react';

type SettingsCardProps = PropsWithChildren & {
  /** Optional id for testing */
  id?: string;

  /** Label of the settings group */
  settingsGroupLabel: string;

  /** Optional description of the settings group */
  settingsGroupDescription?: string;
};

export default function SettingsCard({
  id,
  settingsGroupLabel,
  settingsGroupDescription,
  children,
}: SettingsCardProps) {
  return (
    <Card id={id}>
      <CardHeader>
        <CardTitle>{settingsGroupLabel}</CardTitle>
        {settingsGroupDescription && <CardDescription>{settingsGroupDescription}</CardDescription>}
      </CardHeader>
      <CardContent className="tw-space-y-4">{children}</CardContent>
    </Card>
  );
}
