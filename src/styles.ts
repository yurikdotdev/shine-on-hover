export const SHINE_STYLES = `
.shine-effect {
  --shine-x: 0%;
  --shine-y: 0%;
  --shine-from: 0%;
  --shine-to: 0%;
  --shine-border: transparent;

  isolation: isolate;
  position: relative;
  overflow: hidden;

  &::before {
    pointer-events: none;
    content: '';

    position: absolute;
    z-index: 1;
    inset: 1px;
    border-radius: inherit; 

    opacity: 0;
    background: radial-gradient(
      circle at var(--shine-x) var(--shine-y),
      var(--shine-color) var(--shine-from),
      transparent var(--shine-to)
    );

    outline: 1px solid var(--shine-border);
    outline-offset: -1px;
    box-shadow: 
      inset 0 0 10px calc(8px * (1 - (var(--shine-x) + var(--shine-y)) / 200)) var(--shine-border),
      0 0 20px calc(12px * (1 - (var(--shine-x) + var(--shine-y)) / 200)) var(--shine-border);

    transition: 
      opacity 150ms cubic-bezier(0, 0, 0.2, 1),
      box-shadow 150ms cubic-bezier(0, 0, 0.2, 1);
  }

  &::after {
    pointer-events: none;
    content: '';

    position: absolute;
    z-index: 0;
    inset: 0;
    border-radius: inherit;

    opacity: 0;
    transition: opacity 150ms cubic-bezier(0, 0, 0.2, 1);
  }

  &:hover::before,
  &:hover::after {
    opacity: 1;
  }
}
`;

export function injectStyles(styles: string): void {
	if (typeof document === 'undefined') return;

	const styleId = 'shine-effect-styles';
	if (document.getElementById(styleId)) return;

	const styleElement = document.createElement('style');
	styleElement.id = styleId;
	styleElement.textContent = styles;
	document.head.appendChild(styleElement);
}

export function removeStyles(): void {
	if (typeof document === 'undefined') return;

	const styleElement = document.getElementById('shine-effect-styles');
	if (styleElement) {
		styleElement.remove();
	}
}