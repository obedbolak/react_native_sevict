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
const tintColorLight = '#0a7ea4';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    // Background colors
    background: '#fff',
    inputBackground: 'rgba(200, 199, 199, 0.1)',
    checkboxBackground: '#fff',
    
    // Text colors
    text: '#000',
    subtext: '#666',
    buttonText: '#fff',
    placeholder: 'gray',
    link: '#007bff',
    
    // Interactive elements
    primary: '#007bff', // Main interactive color (buttons, links)
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    checkbox: '#007bff',

    checked: '#007bff',
    
    // Status/feedback colors
    error: '#ff0000',
    success: '#28a745',
    warning: '#ffc107',
    
    // Borders and dividers
    border: '#ccc',
    inputBorder: '#ddd',
    
    // Specific component colors (try to avoid these when possible)
    loginButton: '#007bff', // Should use primary instead
  },
  dark: {
    // Background colors
    background: '#151718',
    inputBackground: 'rgba(255, 255, 255, 0.1)',
    checkboxBackground: '#252728',
    
    // Text colors
    text: '#ECEDEE',
    subtext: '#9BA1A6',
    buttonText: '#fff',
    placeholder: '#9BA1A6',
    link: '#0a7ea4',
    
    // Interactive elements
    primary: '#0a7ea4',
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
  },
};

const lightTheme = 'light';

export { lightTheme };


const darkTheme = 'dark';

export { darkTheme };
