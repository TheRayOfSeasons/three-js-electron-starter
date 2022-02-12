import {WebGLRenderer} from 'three';

/**
 * Class that encapsulates the entire manifestation
 * of the 3D engine into a canvas.
 */
export default class Manifest {
  public canvas: HTMLElement;
  public renderer: WebGLRenderer;

  /**
   * @param {HTMLElement} canvas
   */
  constructor(canvas: HTMLElement) {
    this.canvas = canvas;
    const canvasHeight = canvas.parentElement.clientHeight;
    const canvasWidth = canvas.parentElement.clientWidth;
    const renderer = new WebGLRenderer({
      antialias: true,
      canvas,
    });
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 1.0);
    this.renderer = renderer;
    renderer.setAnimationLoop(() => {
      console.log('frame');
    });
  }
}
