import { ScriptureSelection } from 'scripture.model';
import { ReactElement } from 'react';

export type ScriptureItemDetail = ScriptureSelection & {
  detail: string | ReactElement;
};
