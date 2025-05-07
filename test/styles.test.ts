import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import { injectStyles, removeStyles, SHINE_STYLES } from '../src/styles';

describe('Styles', () => {
	beforeEach(() => {
		document.head.innerHTML = '';
	});

	afterEach(() => {
		document.head.innerHTML = '';
	});

	describe('injectStyles', () => {
		test('should inject styles into document head', () => {
			const testStyles = '.test { color: red; }';
			injectStyles(testStyles);

			const styleElement = document.getElementById('shine-effect-styles');
			expect(styleElement).not.toBeNull();
			expect(styleElement?.tagName.toLowerCase()).toBe('style');
			expect(styleElement?.textContent).toBe(testStyles);
		});

		test('should not inject styles twice with same ID', () => {
			injectStyles('.test {}');
			injectStyles('.another {}');

			const styleElements = document.querySelectorAll('#shine-effect-styles');
			expect(styleElements.length).toBe(1);
		});
	});

	describe('removeStyles', () => {
		test('should remove injected styles', () => {
			injectStyles('.test {}');
			removeStyles();

			const styleElement = document.getElementById('shine-effect-styles');
			expect(styleElement).toBeNull();
		});

		test('should not throw when no styles exist', () => {
			expect(() => removeStyles()).not.toThrow();
		});
	});

	describe('SHINE_STYLES', () => {
		test('should contain required CSS classes and properties', () => {
			expect(SHINE_STYLES).toContain('.shine-effect');
			expect(SHINE_STYLES).toContain('--shine-x');
			expect(SHINE_STYLES).toContain('--shine-y');
			expect(SHINE_STYLES).toContain('radial-gradient');
			expect(SHINE_STYLES).toContain('opacity');
		});
	});

	describe('when document is undefined', () => {
		const originalDocument = global.document;

		beforeEach(() => {
			// @ts-ignore - Intentionally setting document to undefined for testing
			global.document = undefined;
		});

		afterEach(() => {
			global.document = originalDocument;
		});

		test('injectStyles should return early', () => {
			expect(() => injectStyles('.test {}')).not.toThrow();
		});

		test('removeStyles should return early', () => {
			expect(() => removeStyles()).not.toThrow();
		});
	});
});
