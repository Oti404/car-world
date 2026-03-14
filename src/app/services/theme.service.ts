import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  /**
   * Signal for current theme state.
   * Persisted in LocalStorage for user preference retention.
   */
  public theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    /**
     * Effect to synchronize the theme state with the DOM and LocalStorage.
     */
    effect(() => {
      const currentTheme = this.theme();
      localStorage.setItem('user-theme', currentTheme);
      this.applyThemeToBody(currentTheme);
    });
  }

  public toggleTheme(): void {
    this.theme.update(t => t === 'light' ? 'dark' : 'light');
  }

  public isDarkMode(): boolean {
    return this.theme() === 'dark';
  }

  private getInitialTheme(): Theme {
    const saved = localStorage.getItem('user-theme') as Theme;
    if (saved) return saved;

    // Detect system preference as fallback
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private applyThemeToBody(theme: Theme): void {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }
  }
}
