/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native'

const tintColorLight='#0a7ea4'
const tintColorDark='#fff'
export const logo='#f7f7f8'

export const Colors={
  light: {
    primary: '#3d64f4',
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    primary: '#3d64f4',
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
}

export const Fonts=Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
})

export const Paleta={
  primary: '#5B7FFF', // Soft blue
  secondary: '#FF9D7D', // Soft coral
  success: '#4CD964', // Green for completed tasks
  warning: '#FFCC00', // Yellow for upcoming deadlines
  danger: '#FF3B30', // Red for overdue tasks

  // Neutrals
  background: '#FFFFFF',
  card: '#F9F9FB',
  text: '#1C1C1E',
  textSecondary: '#8E8E93',
  border: '#E5E5EA',

  // Status colors
  low: '#4CD964', // Low priority
  medium: '#FFCC00', // Medium priority
  high: '#FF3B30', // High priority
};

