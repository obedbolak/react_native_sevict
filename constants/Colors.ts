/**
 * App color palette for light and dark modes
 * 
 * Colors are organized by:
 * 1. Background colors
 * 2. Text colors
 * 3. Interactive elements (buttons, inputs, etc.)
 * 4. Status/feedback colors
 * 5. Borders and dividers
 */
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
    sectionBackgroundColor: '#fff',
    
    // Text colors
    text: '#212529',
    subtext: '#6c757d',
    buttonText: '#fff',
    placeholder: 'gray',
    link: '#007bff',
    
    // Interactive elements
    primary: '#3a86ff',
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    checkbox: '#007bff',
    checked: '#007bff',
    
    // Status/feedback colors
    error: '#dc3545',
    success: '#28a745',
    warning: '#ffc107',
    
    // Borders and dividers
    border: '#f1f3f5',
    inputBorder: '#ddd',
    
    // Settings specific colors
    settingsValue: '#adb5bd',
    avatarBorder: '#3a86ff',
    
    // Specific component colors (try to avoid these when possible)
    loginButton: '#007bff', // Should use primary instead
  },
  dark: {
    // Background colors
    background: '#040609',
    inputBackground: 'rgba(255, 255, 255, 0.1)',
    checkboxBackground: 'white',
    cardBackground: '#1a1d21',
    sectionBackgroundColor: '#1c1f28',
    
    // Text colors
    text: '#ECEDEE',
    subtext: '#959699',
    buttonText: '#fff',
    placeholder: '#9BA1A6',
    link: '#0a7ea4',
    
    // Interactive elements
    primary: '#3a86ff',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    checkbox: '#0a7ea4',
    
    // Status/feedback colors
    error: '#ff6b6b',
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

export { lightTheme };


const darkTheme = 'dark';

export { darkTheme };
