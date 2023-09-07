import { Avatar, Card, CardActions, CardHeader } from '@mui/material';
import { PropsWithChildren, ReactNode, useMemo } from 'react';

export type ExtensionCardProps = PropsWithChildren<{
  /**
   * The unique extension name
   */
  extensionName: string;

  /**
   * The description of the extension
   */
  extensionDescription: string;

  /**
   * Optional flag to set if you want an icon (Avatar) to appear for the extension
   */
  hasIcon?: boolean;

  /**
   * Content to provide for a header action that appears in the top right of the Card
   */
  headerAction?: ReactNode;
}>;

export default function ExtensionCard({
  extensionName,
  extensionDescription,
  hasIcon,
  headerAction,
  children,
}: ExtensionCardProps) {
  const avatar = useMemo(
    () => (hasIcon ? <Avatar variant="square">{extensionName[0]}</Avatar> : null),
    [extensionName, hasIcon],
  );

  return (
    <Card className="extension-card" variant="outlined">
      <CardHeader
        className="extension-card-content"
        avatar={avatar}
        title={extensionName}
        titleTypographyProps={{ variant: 'h6' }}
        action={headerAction}
        subheader={extensionDescription}
        subheaderTypographyProps={{ variant: 'body2' }}
      />
      <CardActions className="card-action">{children}</CardActions>
    </Card>
  );
}
