import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Label,
} from 'platform-bible-react';
import { PropsWithChildren, ReactNode, useMemo } from 'react';
import './extension-card.component.scss';

export type ExtensionCardProps = PropsWithChildren<{
  /** The unique extension name */
  extensionName: string;

  /** The description of the extension */
  extensionDescription: string;

  /** File path to the icon */
  iconFilePath?: string;

  /** Content to provide for a header action that appears in the top right of the Card */
  headerAction?: ReactNode;

  /** Optional className to link to css */
  className?: string;
}>;

export default function ExtensionCard({
  extensionName,
  extensionDescription,
  iconFilePath,
  headerAction,
  className,
  children,
}: ExtensionCardProps) {
  const avatar = useMemo(
    () => (
      <Avatar>
        <AvatarImage src={iconFilePath ?? undefined} alt={extensionDescription} />
        <AvatarFallback>{extensionName[0]}</AvatarFallback>
      </Avatar>
    ),
    [extensionDescription, extensionName, iconFilePath],
  );

  const isGallery = useMemo(() => className && className === 'square', [className]);

  return (
    <Card className={isGallery ? 'extension-card-square' : 'extension-card-wide'}>
      <div>
        <CardTitle>{extensionName}</CardTitle>
        <CardHeader className="extension-card-content" />
        {avatar}
        {extensionDescription}
        {headerAction}
      </div>
      {isGallery ? (
        <CardContent className="extension-card-description">
          <Label>{extensionDescription}</Label>
          {children}
        </CardContent>
      ) : undefined}
    </Card>
  );
}
