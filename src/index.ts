/**
 * Lightweight, zero-dependency utility that adds a mouse-tracking shine effect on hover.
 * @module shine-on-hover
 */

import type { ShineConfig } from './types';
import { DEFAULT_CONFIG } from './constants';
import { SHINE_STYLES, injectStyles, removeStyles } from './styles';
import { handleMouseMove, handleMouseLeave, effectInstances, resetElementStyle } from './dom';

export { type ShineConfig } from './types';

if (typeof document !== 'undefined') {
	document.addEventListener('mousemove', handleMouseMove);
	document.addEventListener('mouseleave', handleMouseLeave);
}

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
export const shine = (target: string | HTMLElement, config?: ShineConfig) => {
	injectStyles(SHINE_STYLES);

	const elements = typeof target === 'string' ? document.querySelectorAll<HTMLElement>(target) : [target];

	if (elements.length === 0) {
		console.warn(`[shine-on-hover]: No elements found matching selector: "${target}"`);
		return () => {};
	}

	const finalConfig = { ...DEFAULT_CONFIG, ...config };

	elements.forEach((el) => {
		el.classList.add('shine-effect');
		effectInstances.set(el, {
			config: finalConfig as Required<ShineConfig>,
			lastCall: 0,
		});
	});

	return () => {
		elements.forEach((el) => {
			el.classList.remove('shine-effect');
			effectInstances.delete(el);
			resetElementStyle(el);
		});

		if (!document.querySelector('.shine-effect')) {
			removeStyles();
		}
	};
};
