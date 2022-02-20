import {WebGLRenderer, WebGLRendererParameters} from 'three';
import {EntitySceneClass} from './scenes/interfaces';
import SceneManager from './managers/scene-manager';
import CanvasManager from './managers/canvas-manager';
import {RendererClass} from './managers/interfaces';
import RenderManager from './managers/render-manager';


type ThreenityParameters = {
  canvas: HTMLElement,
  rendererClass?: RendererClass,
  rendererParams?: WebGLRendererParameters
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
    this.canvasManager = new CanvasManager(args.canvas);
    this.sceneManager = new SceneManager();
    if (!args.rendererClass) {
      args.rendererClass = WebGLRenderer;
    }
    this.renderManager = new RenderManager(
        args.rendererClass,
        args.rendererParams,
    );
    this.sceneManager.injectDependencies(
        this.canvasManager,
        this.renderManager,
    );
    this.renderManager.injectDepedencies(
        this.canvasManager,
        this.sceneManager,
    );
    this.renderManager.setup();
  }

  registerScenes(scenes: EntitySceneClass[]): void {
    this.sceneManager.scenes = scenes;
  }

  setInitialScene(index: number): void {
    this.sceneManager.loadSceneByIndex(index);
  }

  start() {
    let scene = this.sceneManager.currentScene;
    if (!scene) {
      scene = this.sceneManager.loadSceneByIndex(0);
    }
    this.renderManager.run(() => {
      scene.run();
    });
  }
}
