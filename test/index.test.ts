import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import { shine } from '../src/index';
import { effectInstances } from '../src/dom';
import { DEFAULT_CONFIG } from '../src/constants';
import type { ValidCSSColor } from '../src/types';

describe('shine', () => {
	let container: HTMLDivElement;

	beforeEach(() => {
		container = document.createElement('div');
		document.body.appendChild(container);
	});

	afterEach(() => {
		container.remove();
		document.head.innerHTML = '';
	});

	test('should apply shine effect to element with selector', () => {
		container.innerHTML = '<div class="test-element"></div>';
		const cleanup = shine('.test-element');

		const element = document.querySelector('.test-element');
		expect(element?.classList.contains('shine-effect')).toBe(true);
		expect(effectInstances.has(element as HTMLElement)).toBe(true);

		cleanup();
	});

	test('should apply shine effect to HTMLElement', () => {
		const element = document.createElement('div');
		container.appendChild(element);

		const cleanup = shine(element);

		expect(element.classList.contains('shine-effect')).toBe(true);
		expect(effectInstances.has(element)).toBe(true);

		cleanup();
	});

	test('should apply shine effect to multiple elements', () => {
		container.innerHTML = `
      <div class="test-element"></div>
      <div class="test-element"></div>
    `;

		const cleanup = shine('.test-element');
		const elements = document.querySelectorAll('.test-element');

		elements.forEach((element) => {
			expect(element.classList.contains('shine-effect')).toBe(true);
			expect(effectInstances.has(element as HTMLElement)).toBe(true);
		});

		cleanup();
	});

	test('should merge custom config with defaults', () => {
		const element = document.createElement('div');
		container.appendChild(element);

		const customConfig = {
			shineColor: 'rgba(255,0,0,0.5)' as ValidCSSColor,
			smoothness: 'SMOOTH' as const,
		};

		const cleanup = shine(element, customConfig);

		const instance = effectInstances.get(element);
		expect(instance?.config).toEqual({
			...DEFAULT_CONFIG,
			...customConfig,
		});

		cleanup();
	});

	test('should warn when no elements found', () => {
		const originalWarn = console.warn;
		const warnings: string[] = [];
		console.warn = (message: string) => {
			warnings.push(message);
		};

		const cleanup = shine('.non-existent');

		expect(warnings[0]).toBe('[shine-on-hover]: No elements found matching selector: ".non-existent"');

		console.warn = originalWarn;
		cleanup();
	});

	test('cleanup should remove all effects and styles', () => {
		container.innerHTML = `
      <div class="test-element"></div>
      <div class="test-element"></div>
    `;

		const cleanup = shine('.test-element');
		cleanup();

		const elements = document.querySelectorAll('.test-element');
		elements.forEach((element) => {
			expect(element.classList.contains('shine-effect')).toBe(false);
			expect(effectInstances.has(element as HTMLElement)).toBe(false);
		});

		expect(document.getElementById('shine-effect-styles')).toBeNull();
	});

	test('should keep styles if other shine effects exist', () => {
		const element1 = document.createElement('div');
		const element2 = document.createElement('div');
		container.appendChild(element1);
		container.appendChild(element2);

		const cleanup1 = shine(element1);
		const cleanup2 = shine(element2);

		cleanup1();

		expect(document.getElementById('shine-effect-styles')).not.toBeNull();

		cleanup2();
		expect(document.getElementById('shine-effect-styles')).toBeNull();
	});
});
