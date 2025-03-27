import { ComboBox } from 'platform-bible-react';
import { HTMLColorNames } from 'hello-world';
import useHelloWorldProjectSettings from './use-hello-world-project-settings.hook';
import { HTML_COLOR_NAMES } from '../../util';

export function ProjectSettingsEditor({
  headerSize,
  setHeaderSize,
  resetHeaderSize,
  headerColor,
  setHeaderColor,
  resetHeaderColor,
}: ReturnType<typeof useHelloWorldProjectSettings>) {
  return (
    <>
      <div>
        Header Size:{' '}
        <input
          type="number"
          value={headerSize}
          onChange={(e) => setHeaderSize?.(parseInt(e.target.value, 10))}
        />
        <button type="button" onClick={resetHeaderSize}>
          Reset
        </button>
      </div>
      <div className="color-selector-container">
        Header Color:{' '}
        <ComboBox
          // Since this is a selection amongst many discrete options not including undefined or
          // empty string, this should have `isClearable` set to false. However, attempting to clear
          // the ComboBox demonstrates that the validator is working properly since clearing it does
          // not work
          value={headerColor}
          options={HTML_COLOR_NAMES}
          // The value is one of the options, and all options are HTMLColorNames
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          onChange={(value) => setHeaderColor?.(value as HTMLColorNames)}
        />
        <button type="button" onClick={resetHeaderColor}>
          Reset
        </button>
      </div>
    </>
  );
}

export default ProjectSettingsEditor;
