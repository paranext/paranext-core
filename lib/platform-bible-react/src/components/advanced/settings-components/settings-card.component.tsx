import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/shadcn-ui/card';
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
      <CardContent>{children}</CardContent>
    </Card>
  );
}
