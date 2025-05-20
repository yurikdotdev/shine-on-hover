<h1><img src="./assets/shine-on-hover-logo.png" width="40" /> Shine on Hover</h1>
<p>Lightweight, zero-dependency library for adding a mouse-tracking shine effect.</p>

[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)
![npm version](https://img.shields.io/npm/v/shine-on-hover.svg)

See the effect in action 👉 _[Live Demo](https://shine-on-hover.github.io)_

<br/>

**Why?**

Sometimes you want a sharp, focused glow for a small button. Other times, a soft, diffused shine works better on a big card or container. Manually tweaking CSS for each case gets old fast. This library handles the messy bits, so you can get the right look in a few lines.

## Features

- 🪶 Lightweight (**~1.4kb gzipped**)
- 📦 Zero-dependency & framework-agnostic
- 🎈 Easy-to-use granular customization API

## Installation

```sh
npm install shine-on-hover
```

## Usage

Just import the library and call the shine function with your target element's class name (e.g., .card). Pass in custom options if needed, or stick with the defaults.

It works with any HTML element out of the box and integrates well with modern frameworks like React, Vue, and Svelte.

Make sure to run it on client-side, otherwise it won't work.

### Vanilla JS

```html
<div class="card" />
```

```js
import { shine } from 'shine-on-hover';

shine('.card');
```

### React

```tsx
import { useEffect } from 'react';
import { shine } from 'shine-on-hover';

const Card = () => {
	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (ref.current) {
			const cleanup = shine(ref.current);
			return cleanup;
		}
	}, []);

	return <div ref={ref} />;
};
```

## Configuration

You can customize the shine effect using the following properties:

| Property    | Type   | Default Value         | Description                                                |
| ----------- | ------ | --------------------- | ---------------------------------------------------------- |
| smoothness  | string | 'BALANCE'             | Controls animation frame rate (PERFORMANCE/BALANCE/SMOOTH) |
| shineColor  | string | 'hsl(0deg 0% 0%/ 4%)' | Sets the color of the shine effect                         |
| shineSize   | string | '5%'                  | Controls where the shine starts (0-100%)                   |
| shineSpread | string | '50%'                 | Controls how far the shine extends (0-100%)                |
| shineBorder | string | 'transparent'         | Sets the color for dynamic border glow effect              |

### `Smoothness`

**type**: string

Controls the animation frame rate to balance visual quality and performance. Accepts one of:

- `'PERFORMANCE'` - Low CPU usage, good for battery (~16 FPS)
- `'BALANCE'` - Default, good trade-off (~30 FPS)
- `'SMOOTH'` - Fluid animation, higher CPU use (~60 FPS)

**Example:**

```ts
shine('.card', {
	smoothness: 'PERFORMANCE',
});
```

Default: `BALANCE`

### `shineColor`

**type**: string

Sets the color of the shine. Accepts any valid CSS color format: hex, rgb(), rgba(), hsl(), hsla(), or CSS variable.

**Example:**

```ts
shine('.card', {
	shineColor: 'hsl(0deg 0% 0%/ 4%)',
});
```

Default: `hsl(0deg 0% 0%/ 4%)`

### `shineSize`

**type**: string

Controls where the shine starts within the radial gradient. Accepts a percentage from '0%' to '100%'.

Lower values make the shine effect tighter and more focused at the center.

**Example:**

```ts
shine('.card', {
	shineSize: '5%',
});
```

Default: `5%`

### `shineSpread`

**type**: string

Controls how far the shine extends from the center in the radial gradient. Accepts a percentage from '0%' to '100%'.

Higher values create a softer, more diffused shine.

**Example:**

```ts
shine('.card', {
	shineSpread: '50%',
});
```

Default: `50%`

### `shineBorder`

**type**: string

Sets the color used for the dynamic border and glow effect around the element.

It responds to cursor movement and helps enhance the perceived light source. Accepts any valid CSS color format (e.g., hex, `rgb()`, `hsl()`) and CSS variable.

**Example:**

```ts
shine('.card', {
	shineBorder: 'hsl(220deg 5% 88%)',
});
```

Default: `transparent`

## Contributing

Contributions are welcome! Feel free to open an issue, suggest a feature, or submit a pull request.
