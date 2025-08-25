import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/shadcn-ui/button';
import { useTheme } from './theme-provider.component';

export function ThemeButton() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {theme === 'light' && <Sun className="h-[1.2rem] w-[1.2rem]" />}
      {theme === 'dark' && <Moon className="h-[1.2rem] w-[1.2rem]" />}
      {theme === 'system' && <div className="h-[1.2rem] w-[1.2rem] text-xs">SYS</div>}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
