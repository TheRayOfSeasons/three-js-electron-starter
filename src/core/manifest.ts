import {Camera, WebGLRenderer} from 'three';
import {EntitySceneClass} from './scenes/interfaces';
import SceneManager from './scenes/scene-manager';

/**
 * Class that encapsulates the entire manifestation
 * of the 3D engine into a canvas.
 */
export default class Threenity {
  public canvas: HTMLElement;
  // TODO: Renderer class must be configurable by developer.
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
    // TODO: clear color must be configurable by developer
    renderer.setClearColor(0x000000, 1.0);
    // TODO: Add callback function for further renderer configs
    this.renderer = renderer;
  }

  // setInitialScene(initialScene: string) {
  //   this.sceneManager.set()
  // }

  registerScenes(scenes: EntitySceneClass[]): void {
    SceneManager.scenes = scenes;
  }

  setInitialScene(index: number): void {
    SceneManager.loadSceneByIndex(index);
  }

  // TODO: add render function

  // TODO: add postprocess function
  postprocess(callback: (renderer: WebGLRenderer, mainCamera: Camera) => void) {
    // TODO: create camera manager for main and all other active cameras
    callback(this.renderer, null);
    // TODO: Developer must be able to postprocess with any camera
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      console.log('frame');
    });
  }
}
