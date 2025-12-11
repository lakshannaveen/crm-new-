// Theme constants for Colombo Dockyard CRM

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
};

export const THEME_COLORS = {
  // Primary colors
  PRIMARY: {
    light: '#1e40af', // Blue 700
    dark: '#3b82f6',  // Blue 500
  },
  SECONDARY: {
    light: '#0f172a', // Gray 900
    dark: '#f1f5f9',  // Gray 100
  },
  BACKGROUND: {
    light: '#f8fafc', // Gray 50
    dark: '#0f172a',  // Gray 900
  },
  SURFACE: {
    light: '#ffffff', // White
    dark: '#1e293b',  // Gray 800
  },
  TEXT: {
    light: '#1f2937', // Gray 800
    dark: '#f1f5f9',  // Gray 100
  },
  TEXT_SECONDARY: {
    light: '#6b7280', // Gray 500
    dark: '#94a3b8',  // Gray 400
  },
  BORDER: {
    light: '#e5e7eb', // Gray 200
    dark: '#334155',  // Gray 700
  },
};

// Status colors
export const STATUS_COLORS = {
  SUCCESS: {
    light: '#10b981',
    dark: '#34d399',
    bgLight: '#d1fae5',
    bgDark: '#065f46',
    textLight: '#047857',
    textDark: '#a7f3d0',
  },
  WARNING: {
    light: '#f59e0b',
    dark: '#fbbf24',
    bgLight: '#fef3c7',
    bgDark: '#92400e',
    textLight: '#d97706',
    textDark: '#fcd34d',
  },
  ERROR: {
    light: '#ef4444',
    dark: '#f87171',
    bgLight: '#fee2e2',
    bgDark: '#991b1b',
    textLight: '#dc2626',
    textDark: '#fca5a5',
  },
  INFO: {
    light: '#3b82f6',
    dark: '#60a5fa',
    bgLight: '#dbeafe',
    bgDark: '#1e40af',
    textLight: '#1d4ed8',
    textDark: '#93c5fd',
  },
  NEUTRAL: {
    light: '#6b7280',
    dark: '#9ca3af',
    bgLight: '#f3f4f6',
    bgDark: '#374151',
    textLight: '#4b5563',
    textDark: '#d1d5db',
  },
};

// Project status colors
export const PROJECT_STATUS_COLORS = {
  ON_TRACK: STATUS_COLORS.SUCCESS,
  BEHIND_SCHEDULE: STATUS_COLORS.WARNING,
  DELAYED: STATUS_COLORS.ERROR,
  ON_GOING: STATUS_COLORS.INFO,
  COMPLETED: STATUS_COLORS.SUCCESS,
  PLANNED: STATUS_COLORS.NEUTRAL,
  CANCELLED: STATUS_COLORS.ERROR,
};

// Ship status colors
export const SHIP_STATUS_COLORS = {
  ACTIVE: STATUS_COLORS.SUCCESS,
  INACTIVE: STATUS_COLORS.NEUTRAL,
  UNDER_REPAIR: STATUS_COLORS.INFO,
  IN_DOCK: STATUS_COLORS.WARNING,
  MAINTENANCE: STATUS_COLORS.WARNING,
  OUT_OF_SERVICE: STATUS_COLORS.ERROR,
};

// Priority colors
export const PRIORITY_COLORS = {
  HIGH: STATUS_COLORS.ERROR,
  MEDIUM: STATUS_COLORS.WARNING,
  LOW: STATUS_COLORS.SUCCESS,
  NORMAL: STATUS_COLORS.INFO,
};

// Chart colors for data visualization
export const CHART_COLORS = {
  CATEGORY: [
    '#3b82f6', // Blue
    '#10b981', // Green
    '#f59e0b', // Yellow
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#ec4899', // Pink
    '#06b6d4', // Cyan
    '#f97316', // Orange
  ],
  SEQUENTIAL: [
    '#dbeafe', // Light blue
    '#93c5fd', // Blue 300
    '#60a5fa', // Blue 400
    '#3b82f6', // Blue 500
    '#2563eb', // Blue 600
    '#1d4ed8', // Blue 700
    '#1e40af', // Blue 800
  ],
  DIVERGING: [
    '#ef4444', // Red 500
    '#f87171', // Red 400
    '#fca5a5', // Red 300
    '#fecaca', // Red 200
    '#d1fae5', // Green 200
    '#a7f3d0', // Green 300
    '#34d399', // Green 400
    '#10b981', // Green 500
  ],
};

// Typography scale
export const TYPOGRAPHY = {
  FONT_FAMILY: {
    SANS: "'Inter', system-ui, sans-serif",
    MONO: "'JetBrains Mono', monospace",
  },
  FONT_SIZE: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
  },
  FONT_WEIGHT: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  LINE_HEIGHT: {
    none: 1,
    tight: 1.25,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

// Spacing scale
export const SPACING = {
  px: '1px',
  0: '0',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
};

// Border radius
export const BORDER_RADIUS = {
  none: '0',
  sm: '0.125rem',   // 2px
  DEFAULT: '0.25rem', // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
};

// Shadow definitions
export const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
};

// Z-index scale
export const Z_INDEX = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: '375px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Animation durations
export const TRANSITIONS = {
  duration: {
    75: '75ms',
    100: '100ms',
    150: '150ms',
    200: '200ms',
    300: '300ms',
    500: '500ms',
    700: '700ms',
    1000: '1000ms',
  },
  timing: {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
};

// Gradient definitions
export const GRADIENTS = {
  PRIMARY: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  SUCCESS: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
  WARNING: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
  ERROR: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
  DARK: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
  LIGHT: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
};

// Export all constants as a single object for easy import
export default {
  THEME_MODES,
  THEME_COLORS,
  STATUS_COLORS,
  PROJECT_STATUS_COLORS,
  SHIP_STATUS_COLORS,
  PRIORITY_COLORS,
  CHART_COLORS,
  TYPOGRAPHY,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  Z_INDEX,
  BREAKPOINTS,
  TRANSITIONS,
  GRADIENTS,
};