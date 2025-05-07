import type { ShineConfig, SmoothnessMode } from './types';

export const SMOOTHNESS_VALUES: Record<SmoothnessMode, number> = {
  PERFORMANCE: 70, // ~16 FPS
  BALANCE: 30, // ~30 FPS
  SMOOTH: 10, // ~60 FPS
} as const;

export const DEFAULT_CONFIG: Required<ShineConfig> = {
  smoothness: 'BALANCE',
  shineSize: '5%',
  shineSpread: '50%',
  shineColor: 'hsl(0deg 0% 100%/ 4%)',
  shineBorder: 'transparent',
};

export const CSS_VARS = {
  mouseX: '--shine-x',
  mouseY: '--shine-y',
  shineFrom: '--shine-from',
  shineTo: '--shine-to',
  shineColor: '--shine-color',
  shineBorder: '--shine-border',
} as const;