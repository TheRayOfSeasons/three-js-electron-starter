import {WebGLRenderer} from 'three';
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
  protected sceneManager: SceneManager;

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
    this.sceneManager = new SceneManager();
  }

  registerScenes(scenes: EntitySceneClass[]): void {
    this.sceneManager.scenes = scenes;
  }

  setInitialScene(index: number): void {
    this.sceneManager.loadSceneByIndex(index);
  }

  start() {
    const scene = this.sceneManager.currentScene;
    this.renderer.setAnimationLoop(() => {
      scene.run();
    });
  }
}
