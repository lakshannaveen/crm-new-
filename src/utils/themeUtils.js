export const getThemeClasses = (themeMode) => {
  return {
    bg: themeMode === 'dark' ? 'bg-gray-900' : 'bg-gray-50',
    text: themeMode === 'dark' ? 'text-gray-100' : 'text-gray-900',
    textSecondary: themeMode === 'dark' ? 'text-gray-400' : 'text-gray-600',
    card: themeMode === 'dark' ? 'bg-gray-800' : 'bg-white',
    border: themeMode === 'dark' ? 'border-gray-700' : 'border-gray-200',
    input: themeMode === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300',
    button: {
      primary: themeMode === 'dark' 
        ? 'bg-blue-600 hover:bg-blue-700' 
        : 'bg-blue-500 hover:bg-blue-600',
      secondary: themeMode === 'dark'
        ? 'bg-gray-700 hover:bg-gray-600'
        : 'bg-gray-200 hover:bg-gray-300',
    },
  };
};

export const saveThemePreference = (theme) => {
  localStorage.setItem('theme', theme);
  document.documentElement.classList.toggle('dark', theme === 'dark');
};

export const loadThemePreference = () => {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  return savedTheme || (prefersDark ? 'dark' : 'light');
};