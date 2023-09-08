import { Avatar, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { PropsWithChildren, ReactNode, useMemo } from 'react';
import './extension-card.component.scss';

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

  /**
   * Optional className to link to css
   */
  className?: string;
}>;

export default function ExtensionCard({
  extensionName,
  extensionDescription,
  hasIcon,
  headerAction,
  className,
  children,
}: ExtensionCardProps) {
  const avatar = useMemo(
    () => (hasIcon ? <Avatar variant="square">{extensionName[0]}</Avatar> : null),
    [extensionName, hasIcon],
  );

  const isGallery = useMemo(() => className && className === 'square', [className]);

  return (
    <Card
      className={isGallery ? 'extension-card-square' : 'extension-card-wide'}
      variant="outlined"
    >
      <CardHeader
        className="extension-card-content"
        avatar={avatar}
        title={extensionName}
        titleTypographyProps={{ variant: 'h6' }}
        action={headerAction}
        subheader={!isGallery ? extensionDescription : null}
        subheaderTypographyProps={{ variant: 'body2' }}
      />
      {isGallery ? (
        <CardContent className="extension-card-description">
          <Typography variant="body2">{extensionDescription}</Typography>
        </CardContent>
      ) : null}
      <CardActions className={isGallery ? 'card-action-square' : 'card-action-wide'}>
        {children}
      </CardActions>
    </Card>
  );
}
