import { Card, CardContent, Typography } from '@mui/material';
import { PropsWithChildren } from 'react';
import './extension-toggle.component.scss';

export type Extension = {
  name: string;
  description: string;
};

type ExtensionToggleProps = PropsWithChildren<{
  extensionName: string;
  extensionDescription?: string;
}>;

export default function ExtensionToggle({
  extensionName,
  extensionDescription,
  children,
}: ExtensionToggleProps) {
  return (
    <Card className="extension-card" variant="outlined">
      <CardContent>
        <Typography variant="h6">{extensionName}</Typography>
        <Typography variant="caption">{extensionDescription}</Typography>
      </CardContent>
      {children}
    </Card>
  );
}
