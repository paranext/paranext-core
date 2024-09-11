import icon from '@assets/icon.png';
import { useLocalizedStrings } from '@renderer/hooks/papi-hooks';
import { LocalizeKey } from 'platform-bible-utils';
import DIALOG_BASE from './dialog-base.data';
import { ABOUT_DIALOG_TYPE, DialogDefinition } from './dialog-definition.model';

export const TAB_TYPE_ABOUT = 'about';

const STRING_KEYS: LocalizeKey[] = ['%product_name%'];

function AboutDialog() {
  const [{ '%product_name%': productName }] = useLocalizedStrings(STRING_KEYS);

  return (
    <div className="about-panel">
      <div className="hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <div className="hello">
        <h1>{productName}</h1>
      </div>
    </div>
  );
}

const ABOUT_DIALOG: DialogDefinition<typeof ABOUT_DIALOG_TYPE> = Object.freeze({
  ...DIALOG_BASE,
  tabType: ABOUT_DIALOG_TYPE,
  defaultTitle: 'About',
  initialSize: {
    width: 500,
    height: 500,
  },
  Component: AboutDialog,
});

export default ABOUT_DIALOG;
