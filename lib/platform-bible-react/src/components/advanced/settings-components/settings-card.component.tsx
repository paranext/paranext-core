import { Card, CardDescription, CardHeader, CardTitle } from '@/components/shadcn-ui/card';
import { CardContent } from '@mui/material';
import { PropsWithChildren } from 'react';

type SettingsCardProps = PropsWithChildren & {
  settingsGroupLabel: string;
  settingsGroupDescription: string;
};

export default function SettingsCard({
  settingsGroupLabel,
  settingsGroupDescription,
  children,
}: SettingsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{settingsGroupLabel}</CardTitle>
        <CardDescription>{settingsGroupDescription}</CardDescription>
      </CardHeader>
      <CardContent className="tw-space-y-4">{children}</CardContent>
    </Card>
  );
}
