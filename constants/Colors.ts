const tintColorLight = '#0A7EA4'; // Primary color
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#11181C', // Foreground light
    background: '#FFFFFF', // Background light
    tint: tintColorLight,
    icon: '#666e7f',
    tabIconDefault: '#666e7f',
    tabIconSelected: tintColorLight,
    primary: '#0A7EA4', // Primary
    success: '#22C55E', // Success
    warning: '#F59E0B', // Warning
    error: '#EF4444', // Error
    foreground: { // Explicit foreground for consistency
      light: '#11181C',
      dark: '#ECEDEE', // Dark foreground not used in light theme, but defined for completeness
    },
    background: { // Explicit background for consistency
      light: '#FFFFFF',
      dark: '#151718', // Dark background not used in light theme, but defined for completeness
    },
  },
  dark: {
    text: '#ECEDEE', // Foreground dark
    background: '#151718', // Background dark
    tint: tintColorDark,
    icon: '#9ba1ae',
    tabIconDefault: '#9ba1ae',
    tabIconSelected: tintColorDark,
    primary: '#0A7EA4', // Primary
    success: '#22C55E', // Success
    warning: '#F59E0B', // Warning
    error: '#EF4444', // Error
  },
  primary: '#0A7EA4', // Direct access for primary color
  success: '#22C55E',
  warning: '#F59E0B',
  error: '#EF4444',
};