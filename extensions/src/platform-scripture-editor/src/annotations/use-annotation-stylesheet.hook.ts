import { logger } from '@papi/frontend';
import { useData } from '@papi/frontend/react';
import { useStylesheet } from 'platform-bible-react';
import { getErrorMessage, isPlatformError } from 'platform-bible-utils';
import { useMemo } from 'react';

const ANNOTATION_STYLESHEET_DEFAULT = '';

/** Applies the annotation stylesheet from the annotation style data provider to the current document */
export function useAnnotationStyleSheet() {
  const [annotationStylesheetPossiblyError] = useData(
    'platformScriptureEditor.annotationStyle',
  ).AnnotationStylesheet(undefined, ANNOTATION_STYLESHEET_DEFAULT);

  const annotationStylesheet = useMemo(() => {
    if (isPlatformError(annotationStylesheetPossiblyError)) {
      logger.warn(
        `Error getting annotation stylesheet: ${getErrorMessage(annotationStylesheetPossiblyError)}`,
      );
      return ANNOTATION_STYLESHEET_DEFAULT;
    }
    return annotationStylesheetPossiblyError;
  }, [annotationStylesheetPossiblyError]);

  useStylesheet(annotationStylesheet);
}
