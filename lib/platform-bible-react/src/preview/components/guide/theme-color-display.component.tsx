import { Input } from '@/components/shadcn-ui/input';
import { useTheme } from '@/preview/theme-provider.component';

function createColorCells(color: string) {
  const colorString = getComputedStyle(document.documentElement).getPropertyValue(`--${color}`);
  const additionalClasses = colorString.split(', ')[2] === '0%' ? ' pr-text-white' : '';
  return (
    <>
      <td>{color}</td>
      <td>
        <Input className={`pr-bg-${color} pr-border-2${additionalClasses}`} value={colorString} />
      </td>
    </>
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
        className="pr-bg-background-foreground pr-bg-accent pr-bg-accent-foreground pr-bg-background pr-bg-border pr-bg-card pr-bg-card-foreground pr-bg-destructive pr-bg-destructive-foreground pr-bg-input pr-bg-muted pr-bg-muted-foreground pr-bg-popover pr-bg-popover-foreground pr-bg-primary pr-bg-primary pr-bg-primary-foreground pr-bg-ring pr-bg-secondary pr-bg-secondary-foreground"
      />
      <table>
        <tbody>
          <tr>
            <td>ABC123</td>
            <td>
              <Input className="pr-border-2 pr-bg-accent" value="ABC123" />
            </td>
          </tr>
          {['primary', 'secondary', 'destructive', 'muted', 'accent', 'popover', 'card'].map(
            (color) => {
              return (
                <tr>
                  {createColorCells(color)}
                  {createColorCells(`${color}-foreground`)}
                </tr>
              );
            },
          )}
          <tr>
            {createColorCells('background')}
            {createColorCells('foreground')}
          </tr>
          {['border', 'input', 'ring'].map((color) => {
            return <tr>{createColorCells(color)}</tr>;
          })}
        </tbody>
      </table>
    </>
  );
}
