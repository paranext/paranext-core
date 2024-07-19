import { Input } from '@/components/shadcn-ui/input';
import { useTheme } from '@/preview/theme-provider.component';

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
      <Input className={`pr-bg-${color} pr-border-2 pr-text-${foreground}`} value={text} />
    </td>
  );
}

export default function ThemeColorDisplay() {
  return (
    <>
      <p>
        Color variables are defined in{' '}
        <a
          className="pr-text-blue-600 hover:pr-underline"
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
        className="pr-bg-accent pr-bg-accent-foreground pr-bg-background pr-bg-border pr-bg-card pr-bg-card-foreground pr-bg-destructive pr-bg-destructive-foreground pr-bg-foreground pr-bg-input pr-bg-muted pr-bg-muted-foreground pr-bg-popover pr-bg-popover-foreground pr-bg-primary pr-bg-primary-foreground pr-bg-ring pr-bg-secondary pr-bg-secondary-foreground"
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
