import type { ShineConfig } from './types';
export declare const effectInstances: WeakMap<HTMLElement, {
    config: Required<ShineConfig>;
    lastCall: number;
}>;
export declare const resetElementStyle: (element: HTMLElement) => void;
export declare const handleMouseMove: (e: MouseEvent) => void;
export declare const handleMouseLeave: (e: MouseEvent) => void;
