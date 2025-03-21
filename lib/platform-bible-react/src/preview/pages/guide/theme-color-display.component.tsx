import { Input } from '@/components/shadcn-ui/input';
import { useTheme } from '@/preview/preview-components/theme-provider.component';

function createColorCells(color: string, invert: boolean = false) {
  const colorString = getComputedStyle(document.documentElement).getPropertyValue(`--${color}`);
  return (
    <>
      {invert ? '' : <td>{color}</td>}
      {createPreviewCell(
        color,
        colorString.split(', ')[2] === '0%' ? 'white' : 'inherit',
        colorString,
      )}
      {invert ? <td>{color}</td> : ''}
    </>
  );
}

function createPreviewCell(color: string, foreground: string, text: string) {
  return (
    <td>
      <Input className={`tw-bg-${color} tw-border-2 tw-text-${foreground}`} value={text} />
    </td>
  );
}

export function ThemeColorDisplay() {
  return (
    <>
      <p>
        Color variables are defined in{' '}
        <a
          className="tw-text-blue-600 hover:tw-underline"
          href="https://github.com/paranext/paranext-core/blob/main/lib/platform-bible-react/src/index.css"
        >
          index.css
          <br />
          <br />
        </a>
      </p>
      {useTheme().theme.includes('paratext') ? (
        ''
      ) : (
        <p>
          The currently selected theme is matching the Shadcn Slate theme, whereas ui.shadcn.com
          uses the Zinc theme (with a deviating --ring 240 5% 64.9%). So be aware of the slight
          differences of grayish / blueish tones.
          <br />
          <br />
        </p>
      )}
      <p>Following colors are defined by the current theme:</p>
      {/* dummy to create all classes */}
      <div
        style={{ display: 'none' }}
        className="tw-bg-accent tw-bg-accent-foreground tw-bg-background tw-bg-border tw-bg-card tw-bg-card-foreground tw-bg-destructive tw-bg-destructive-foreground tw-bg-foreground tw-bg-input tw-bg-muted tw-bg-muted-foreground tw-bg-popover tw-bg-popover-foreground tw-bg-primary tw-bg-primary-foreground tw-bg-ring tw-bg-secondary tw-bg-secondary-foreground"
      />
      <table>
        <thead>
          <tr>
            <th>Preview</th>
            <th />
            <th>Background</th>
            <th>Foreground</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {['primary', 'secondary', 'destructive', 'muted', 'accent', 'popover', 'card'].map(
            (color) => {
              return (
                <tr>
                  {createPreviewCell(color, `${color}-foreground`, color)}
                  {createColorCells(color)}
                  {createColorCells(`${color}-foreground`, true)}
                </tr>
              );
            },
          )}
          <tr>
            {createPreviewCell('background', 'foreground', 'background')}
            {createColorCells('background')}
            {createColorCells('foreground', true)}
          </tr>
          {['border', 'input', 'ring'].map((color) => {
            return (
              <tr>
                <td />
                {createColorCells(color)}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default ThemeColorDisplay;
