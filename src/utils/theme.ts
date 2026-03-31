export type Theme = 'light' | 'dark';

export const applyTheme = (theme: Theme) => {
  const html = document.documentElement;
  const body = document.body;
  
  html.setAttribute('toggle-theme', theme);
  body.setAttribute('toggle-theme', theme);
  html.setAttribute('data-theme', theme);
  
  if (theme === 'dark') {
    html.classList.add('dark');
    body.classList.add('dark');
  } else {
    html.classList.remove('dark');
    body.classList.remove('dark');
  }
  
  window.dispatchEvent(new Event('themeChange'));
};

export const getInitialTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  if (savedTheme) return savedTheme;
  
  // Default to dark mode as requested by user
  return 'dark';
};
