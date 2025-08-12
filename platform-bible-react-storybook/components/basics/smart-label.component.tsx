import { Label } from '@/components/shadcn-ui/label';
import { ReactNode } from 'react';

type SmartLabelProps = {
  item: string;
  createLabel?: (item: string) => string;
  createComplexLabel?: (item: string) => ReactNode;
};

/** Create labels with text, react elements (e.g. links), or text + react elements */
function SmartLabel({ item, createLabel, createComplexLabel }: SmartLabelProps): ReactNode {
  if (createLabel) {
    return <Label>{createLabel(item)}</Label>;
  }
  if (createComplexLabel) {
    return <Label>{createComplexLabel(item)}</Label>;
  }
  return <Label>{item}</Label>;
}

export default SmartLabel;
