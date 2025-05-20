/**
 * Lightweight, zero-dependency utility that adds a mouse-tracking shine effect on hover.
 * @module shine-on-hover
 */
import type { ShineConfig } from './types';
export { type ShineConfig } from './types';
/**
 * Adds dynamic shine effect that follows the mouse cursor
 *
 * @param target - CSS selector string or HTMLElement to apply the effect to
 * @param config - Optional configuration for customizing the shine effect
 * @returns Cleanup function to remove the effect
 *
 * @example
 * ```ts
 * // Basic usage with single selector
 * shine('.my-button');
 *
 * // Multiple selectors
 * shine('.card, .button', {
 *   smoothness: 'SMOOTH',
 *   shineSize: '15%',
 *   shineSpread: '70%'
 * });
 *
 * // With React
 * useEffect(() => shine('.my-button'), []);
 *
 * // With Vue
 * onMounted(() => {
 *   const cleanup = shine('.my-button');
 *   onUnmounted(cleanup);
 * });
 * ```
 */
export declare const shine: (target: string | HTMLElement, config?: ShineConfig) => () => void;
