import { Fragment, useMemo } from 'react';
import { parseDefinitionMarkup } from '../../utils/definition-markup.utils';

/** Props for the DefinitionText component */
type DefinitionTextProps = {
  /** Definition text as stored in the lexical reference text */
  definition: string;
};

/** Renders a dictionary definition with its embedded markup resolved into readable text. */
export function DefinitionText({ definition }: DefinitionTextProps) {
  const segments = useMemo(() => parseDefinitionMarkup(definition), [definition]);

  return (
    <>
      {segments.map((segment, index) => (
        // Segments are derived from one string and never reorder, so their index is a stable key
        // eslint-disable-next-line react/no-array-index-key
        <Fragment key={index}>{segment.text}</Fragment>
      ))}
    </>
  );
}
