import {WebGLRenderer, WebGLRendererParameters} from 'three';
import {EntitySceneClass} from './scenes/interfaces';
import SceneManager from './managers/scene-manager';
import CanvasManager from './managers/canvas-manager';
import {RendererClass} from './managers/interfaces';
import RenderManager from './managers/render-manager';


type ThreenityParameters = {
  canvas: HTMLElement,
  rendererClass: RendererClass,
  rendererParams: WebGLRendererParameters
}

/**
 * Class that encapsulates the entire manifestation
 * of the 3D engine into a canvas.
 */
export default class Threenity {
  public renderer: WebGLRenderer;
  protected sceneManager: SceneManager;
  protected canvasManager: CanvasManager;
  protected renderManager: RenderManager;

  public constructor(args: ThreenityParameters) {
    this.sceneManager = new SceneManager();
    this.canvasManager = new CanvasManager(args.canvas);
    if (!args.rendererClass) {
      args.rendererClass = WebGLRenderer;
    }
    this.renderManager = new RenderManager(
        this.sceneManager,
        this.canvasManager,
        args.rendererClass,
        args.rendererParams,
    );
  }

  registerScenes(scenes: EntitySceneClass[]): void {
    this.sceneManager.scenes = scenes;
  }

  setInitialScene(index: number): void {
    this.sceneManager.loadSceneByIndex(index);
  }

  start() {
    const scene = this.sceneManager.currentScene;
    scene.run();
  }
}
