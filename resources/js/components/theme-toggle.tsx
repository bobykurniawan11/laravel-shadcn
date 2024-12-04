import { Button } from '@/components/ui/button';
import useThemeStore from '@/store/themeStore';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
    const { toggleTheme } = useThemeStore();

    return (
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    );
}
