type Percentage = `${number}%`;

type CSSColorFunction =
	| `rgb(${number}, ${number}, ${number})`
	| `rgba(${number}, ${number}, ${number}, ${number})`
	| `hsl(${number}deg ${number}% ${number}%)`
	| `hsl(${number}deg ${number}% ${number}%/ ${number}%)`
	| `hsl(${number}deg ${number}% ${number}% / ${number}%)`
	| `hsla(${number}, ${number}%, ${number}%, ${number})`
	| `#${string}`;

type CSSNamedColor =
	| 'aliceblue'
	| 'antiquewhite'
	| 'aqua'
	| 'aquamarine'
	| 'azure'
	| 'beige'
	| 'bisque'
	| 'black'
	| 'blanchedalmond'
	| 'blue'
	| 'blueviolet'
	| 'brown'
	| 'burlywood'
	| 'cadetblue'
	| 'chartreuse'
	| 'chocolate'
	| 'coral'
	| 'cornflowerblue'
	| 'cornsilk'
	| 'crimson'
	| 'cyan'
	| 'darkblue'
	| 'darkcyan'
	| 'darkgoldenrod'
	| 'darkgray'
	| 'darkgreen'
	| 'darkgrey'
	| 'darkkhaki'
	| 'darkmagenta'
	| 'darkolivegreen'
	| 'darkorange'
	| 'darkorchid'
	| 'darkred'
	| 'darksalmon'
	| 'darkseagreen'
	| 'darkslateblue'
	| 'darkslategray'
	| 'darkslategrey'
	| 'darkturquoise'
	| 'darkviolet'
	| 'deeppink'
	| 'deepskyblue'
	| 'dimgray'
	| 'dimgrey'
	| 'dodgerblue'
	| 'firebrick'
	| 'floralwhite'
	| 'forestgreen'
	| 'fuchsia'
	| 'gainsboro'
	| 'ghostwhite'
	| 'gold'
	| 'goldenrod'
	| 'gray'
	| 'green'
	| 'greenyellow'
	| 'grey'
	| 'honeydew'
	| 'hotpink'
	| 'indianred'
	| 'indigo'
	| 'ivory'
	| 'khaki'
	| 'lavender'
	| 'lavenderblush'
	| 'lawngreen'
	| 'lemonchiffon'
	| 'lightblue'
	| 'lightcoral'
	| 'lightcyan'
	| 'lightgoldenrodyellow'
	| 'lightgray'
	| 'lightgreen'
	| 'lightgrey'
	| 'lightpink'
	| 'lightsalmon'
	| 'lightseagreen'
	| 'lightskyblue'
	| 'lightslategray'
	| 'lightslategrey'
	| 'lightsteelblue'
	| 'lightyellow'
	| 'lime'
	| 'limegreen'
	| 'linen'
	| 'magenta'
	| 'maroon'
	| 'mediumaquamarine'
	| 'mediumblue'
	| 'mediumorchid'
	| 'mediumpurple'
	| 'mediumseagreen'
	| 'mediumslateblue'
	| 'mediumspringgreen'
	| 'mediumturquoise'
	| 'mediumvioletred'
	| 'midnightblue'
	| 'mintcream'
	| 'mistyrose'
	| 'moccasin'
	| 'navajowhite'
	| 'navy'
	| 'oldlace'
	| 'olive'
	| 'olivedrab'
	| 'orange'
	| 'orangered'
	| 'orchid'
	| 'palegoldenrod'
	| 'palegreen'
	| 'paleturquoise'
	| 'palevioletred'
	| 'papayawhip'
	| 'peachpuff'
	| 'peru'
	| 'pink'
	| 'plum'
	| 'powderblue'
	| 'purple'
	| 'rebeccapurple'
	| 'red'
	| 'rosybrown'
	| 'royalblue'
	| 'saddlebrown'
	| 'salmon'
	| 'sandybrown'
	| 'seagreen'
	| 'seashell'
	| 'sienna'
	| 'silver'
	| 'skyblue'
	| 'slateblue'
	| 'slategray'
	| 'slategrey'
	| 'snow'
	| 'springgreen'
	| 'steelblue'
	| 'tan'
	| 'teal'
	| 'thistle'
	| 'tomato'
	| 'transparent'
	| 'turquoise'
	| 'violet'
	| 'wheat'
	| 'white'
	| 'whitesmoke'
	| 'yellow'
	| 'yellowgreen';

type CSSColorVariable = `var(--${string})`;

export type SmoothnessMode = 'PERFORMANCE' | 'BALANCE' | 'SMOOTH';

export type ValidCSSColor = CSSColorFunction | CSSNamedColor | CSSColorVariable;

export interface ShineConfig {
	/**
	 * Controls animation smoothness via preset modes
	 * @remarks
	 * Available modes:
	 * - `'PERFORMANCE'` - Low CPU usage, good for battery (~16 FPS)
	 * - `'BALANCE'` - Default, good trade-off (~30 FPS)
	 * - `'SMOOTH'` - Fluid animation, higher CPU use (~60 FPS)
	 * @default 'BALANCE'
	 */
	smoothness?: SmoothnessMode;

	/**
	 * Size of the shine's bright center in percentage
	 * @remarks
	 * Controls how sharp or blurry the central shine appears
	 * - `1-9%` - Very blurry, subtle glow
	 * - `10-24%` - Moderately blurry shine
	 * - `25-50%` - Sharp, crisp shine
	 * @default '5%'
	 */
	shineSize?: Percentage;

	/**
	 * Distance the shine effect spreads from center in percentage
	 * @remarks
	 * Controls how far the gradient extends from the mouse position
	 * - `20-40%` - Tight, contained shine
	 * - `41-70%` - Balanced spread (recommended)
	 * - `71-100%` - Wide, dramatic effect
	 * @default '50%'
	 */
	shineSpread?: Percentage;

	/**
	 * Color of the shine effect
	 * @remarks
	 * You can specify:
	 * - a valid CSS color value (rgb, rgba, hsl, hsla, hex, or named color) OR
	 * - a global css variable value
	 * @default 'hsl(0deg 0% 100%/ 4%)'
	 * @example
	 * ```ts
	 * // Using RGB format
	 * shineColor: 'rgb(255, 255, 255)'
	 *
	 * // Using RGBA format
	 * shineColor: 'rgba(255, 255, 255, 0.2)'
	 *
	 * // Using HSL format
	 * shineColor: 'hsl(0deg 0% 100%)'
	 * shineColor: 'hsl(0deg 0% 100%/ 4%)'
	 *
	 * // Using named color
	 * shineColor: 'white'
	 *
	 * // Using CSS variable
	 * shineColor: 'var(--color-shine)'
	 * ```
	 */
	shineColor?: ValidCSSColor;

	/**
	 * Border color for the shine effect
	 * @remarks
	 * You can specify:
	 * - a valid CSS color value (rgb, rgba, hsl, hsla, hex, or named color) OR
	 * - a global css variable value
	 * @default 'transparent'
	 * @example
	 * ```ts
	 * // Using RGB format
	 * shineBorder: 'rgb(255, 255, 255)'
	 *
	 * // Using RGBA format with transparency
	 * shineBorder: 'rgba(255, 255, 255, 0.2)'
	 *
	 * // Using HSL format
	 * shineBorder: 'hsl(0deg 0% 100%)'
	 *
	 * // Using named color
	 * shineBorder: 'white'
	 *
	 * // Using CSS variable
	 * shineBorder: 'var(--border-color)'
	 * ```
	 */
	shineBorder?: ValidCSSColor;
}
