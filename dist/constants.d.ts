import type { ShineConfig, SmoothnessMode } from './types';
export declare const SMOOTHNESS_VALUES: Record<SmoothnessMode, number>;
export declare const DEFAULT_CONFIG: Required<ShineConfig>;
export declare const CSS_VARS: {
    readonly mouseX: "--shine-x";
    readonly mouseY: "--shine-y";
    readonly shineFrom: "--shine-from";
    readonly shineTo: "--shine-to";
    readonly shineColor: "--shine-color";
    readonly shineBorder: "--shine-border";
};
