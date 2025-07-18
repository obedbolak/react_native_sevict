// Updated Colors.ts
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    // Background colors
    background: '#fff',
    inputBackground: 'rgba(200, 199, 199, 0.1)',
    checkboxBackground: 'blue',
    cardBackground: '#fff',
    card: '#fff', // Added for card components
    sectionBackgroundColor: '#fff',
    
    // Text colors
    text: '#212529',
    foreground: '#212529', // Main text color (same as text)
    subtext: '#6c757d',
    mutedForeground: '#6c757d', // Secondary text (same as subtext)
    buttonText: '#fff',
    placeholder: 'gray',
    link: '#007bff',
    
    // Interactive elements
    primary: '#3a86ff',
    secondary: '#f8f9fa', // Added for secondary buttons/actions
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    checkbox: '#007bff',
    checked: '#007bff',
    
    // Status/feedback colors
    error: '#dc3545',
    destructive: '#dc3545', // Same as error
    success: '#28a745',
    warning: '#ffc107',
    
    // Borders and dividers
    border: '#f1f3f5',
    inputBorder: '#ddd',
    
    // Settings specific colors
    settingsValue: '#adb5bd',
    avatarBorder: '#3a86ff',
    
    // Specific component colors
    loginButton: '#007bff',
  },
  dark: {
    // Background colors
    background: '#040609',
    inputBackground: 'rgba(255, 255, 255, 0.1)',
    checkboxBackground: 'white',
    cardBackground: '#1a1d21',
    card: '#1a1d21', // Added for card components
    sectionBackgroundColor: '#1c1f28',
    
    // Text colors
    text: '#ECEDEE',
    foreground: '#ECEDEE', // Main text color (same as text)
    subtext: '#959699',
    mutedForeground: '#959699', // Secondary text (same as subtext)
    buttonText: '#fff',
    placeholder: '#9BA1A6',
    link: '#0a7ea4',
    
    // Interactive elements
    primary: '#3a86ff',
    secondary: '#2c2e30', // Added for secondary buttons/actions
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    checkbox: '#0a7ea4',
    
    // Status/feedback colors
    error: '#ff6b6b',
    destructive: '#ff6b6b', // Same as error
    success: '#51cf66',
    warning: '#fcc419',
    
    // Borders and dividers
    border: '#2c2e30',
    inputBorder: '#3d4042',
    
    // Settings specific colors
    settingsValue: '#6c757d',
    avatarBorder: '#3a86ff',
  },
};

const lightTheme = 'light';
const darkTheme = 'dark';

export { darkTheme, lightTheme };
