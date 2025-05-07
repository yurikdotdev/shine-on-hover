import { CSS_VARS, SMOOTHNESS_VALUES } from './constants';
import type { ShineConfig } from './types';

export const effectInstances = new WeakMap<
	HTMLElement,
	{
		config: Required<ShineConfig>;
		lastCall: number;
	}
>();

const calculateMousePosition = (rect: DOMRect, clientX: number, clientY: number) => ({
	xPercent: ((clientX - rect.left) / rect.width) * 100,
	yPercent: ((clientY - rect.top) / rect.height) * 100,
});

const calculateEffect = (rect: DOMRect, mouseX: number, mouseY: number, config: Required<ShineConfig>) => {
	const { xPercent, yPercent } = calculateMousePosition(rect, mouseX, mouseY);

	return {
		mouseX: `${xPercent}%`,
		mouseY: `${yPercent}%`,
		shineFrom: config.shineSize,
		shineTo: config.shineSpread,
		shineColor: config.shineColor,
		shineBorder: config.shineBorder,
	};
};

const updateElementStyle = (element: HTMLElement, values: ReturnType<typeof calculateEffect>): void => {
	const update = () => {
		Object.entries(CSS_VARS).forEach(([key, prop]) => {
			element.style.setProperty(prop, values[key as keyof typeof values]);
		});
	};

	requestAnimationFrame(update);
};

export const resetElementStyle = (element: HTMLElement): void => {
	const reset = () => {
		Object.values(CSS_VARS).forEach((prop) => {
			element.style.removeProperty(prop);
		});
	};

	requestAnimationFrame(reset);
};

export const handleMouseMove = (e: MouseEvent) => {
	const allShineElements = document.querySelectorAll<HTMLElement>('.shine-effect');

	allShineElements.forEach((element) => {
		const instance = effectInstances.get(element);
		if (!instance) return;

		const now = Date.now();
		const throttleDelay = SMOOTHNESS_VALUES[instance.config.smoothness];

		if (now - instance.lastCall < throttleDelay) return;
		instance.lastCall = now;

		const rect = element.getBoundingClientRect();
		const effectValues = calculateEffect(rect, e.clientX, e.clientY, instance.config);
		updateElementStyle(element, effectValues);
	});
};

export const handleMouseLeave = (e: MouseEvent) => {
	const relatedTarget = e.relatedTarget as HTMLElement | null;

	if (!relatedTarget?.closest('.shine-effect')) {
		const elements = document.querySelectorAll<HTMLElement>('.shine-effect');
		elements.forEach((element) => resetElementStyle(element));
	}
};
