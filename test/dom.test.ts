import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import { effectInstances, handleMouseMove, handleMouseLeave, resetElementStyle } from '../src/dom';
import { DEFAULT_CONFIG } from '../src/constants';

describe('DOM Interactions', () => {
	let container: HTMLDivElement;
	let shineElement: HTMLDivElement;

	beforeEach(() => {
		container = document.createElement('div');
		shineElement = document.createElement('div');
		shineElement.classList.add('shine-effect');
		container.appendChild(shineElement);
		document.body.appendChild(container);

		effectInstances.set(shineElement, {
			config: DEFAULT_CONFIG,
			lastCall: 0,
		});
	});

	afterEach(() => {
		container.remove();
		effectInstances.delete(shineElement);
	});

	describe('handleMouseMove', () => {
		test('should update element style on mouse move', async () => {
			const mouseEvent = new MouseEvent('mousemove', {
				clientX: 50,
				clientY: 50,
				bubbles: true,
			});

			const rectMock = {
				top: 0,
				left: 0,
				width: 100,
				height: 100,
			};
			shineElement.getBoundingClientRect = () => rectMock as DOMRect;

			handleMouseMove(mouseEvent);

			await new Promise((resolve) => requestAnimationFrame(resolve));

			expect(shineElement.style.getPropertyValue('--shine-x')).toBe('50%');
			expect(shineElement.style.getPropertyValue('--shine-y')).toBe('50%');
		});

		test('should respect throttling based on smoothness', () => {
			const instance = effectInstances.get(shineElement)!;
			instance.lastCall = Date.now();

			const mouseEvent = new MouseEvent('mousemove', {
				clientX: 50,
				clientY: 50,
				bubbles: true,
			});

			handleMouseMove(mouseEvent);

			const style = shineElement.style.getPropertyValue('--shine-x');
			expect(style).toBe('');
		});
	});

	describe('handleMouseLeave', () => {
		test('should reset styles when mouse leaves shine effect area', async () => {
			const leaveEvent = new MouseEvent('mouseleave', {
				relatedTarget: document.body,
				bubbles: true,
			});

			shineElement.style.setProperty('--shine-x', '50%');
			shineElement.style.setProperty('--shine-y', '50%');

			handleMouseLeave(leaveEvent);

			await new Promise((resolve) => requestAnimationFrame(resolve));

			expect(shineElement.style.getPropertyValue('--shine-x')).toBe('');
			expect(shineElement.style.getPropertyValue('--shine-y')).toBe('');
		});
	});

	describe('resetElementStyle', () => {
		test('should remove all shine effect properties', async () => {
			shineElement.style.setProperty('--shine-x', '50%');
			shineElement.style.setProperty('--shine-y', '50%');
			shineElement.style.setProperty('--shine-from', '0%');
			shineElement.style.setProperty('--shine-to', '100%');

			resetElementStyle(shineElement);

			await new Promise((resolve) => requestAnimationFrame(resolve));

			expect(shineElement.style.getPropertyValue('--shine-x')).toBe('');
			expect(shineElement.style.getPropertyValue('--shine-y')).toBe('');
			expect(shineElement.style.getPropertyValue('--shine-from')).toBe('');
			expect(shineElement.style.getPropertyValue('--shine-to')).toBe('');
		});
	});

	describe('Effect instances', () => {
		test('should handle nested shine effects', async () => {
			const childElement = document.createElement('div');
			childElement.classList.add('shine-effect');
			shineElement.appendChild(childElement);

			effectInstances.set(childElement, {
				config: DEFAULT_CONFIG,
				lastCall: 0,
			});

			const mouseEvent = new MouseEvent('mousemove', {
				clientX: 50,
				clientY: 50,
				bubbles: true,
			});

			const rectMock = {
				top: 0,
				left: 0,
				width: 100,
				height: 100,
			};
			shineElement.getBoundingClientRect = () => rectMock as DOMRect;
			childElement.getBoundingClientRect = () => rectMock as DOMRect;

			handleMouseMove(mouseEvent);

			await new Promise((resolve) => requestAnimationFrame(resolve));

			expect(shineElement.style.getPropertyValue('--shine-x')).toBe('50%');
			expect(childElement.style.getPropertyValue('--shine-x')).toBe('50%');
		});
	});
});
