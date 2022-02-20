import {WebGLRenderer, WebGLRendererParameters} from 'three';

type RendererExtender<T extends WebGLRenderer> = {
  new(args: WebGLRendererParameters): T
}

/**
 * Any class that is or extends WebGLRenderer from Three.js.
 */
export type RendererClass = RendererExtender<WebGLRenderer>;
