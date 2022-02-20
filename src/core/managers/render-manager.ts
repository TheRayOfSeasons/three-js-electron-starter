import {
  PerspectiveCamera,
  WebGLRenderer,
  WebGLRendererParameters,
  XRAnimationLoopCallback,
} from 'three';
import Manager from './manager';
import {RendererClass} from './interfaces';
import CanvasManager from './canvas-manager';
import SceneManager from './scene-manager';


export default class RenderManager extends Manager {
  public renderer: WebGLRenderer;
  protected rendererParams: WebGLRendererParameters;
  protected rendererClass: RendererClass;
  protected sceneManager: SceneManager;
  protected canvasManager: CanvasManager;

  public constructor(
      sceneManager: SceneManager,
      canvasManager: CanvasManager,
      rendererClass: RendererClass,
      rendererParams: WebGLRendererParameters,
  ) {
    super();
    this.sceneManager = sceneManager;
    this.canvasManager = canvasManager;
    this.rendererClass = rendererClass;
    this.rendererParams = rendererParams;
  }

  public setup(): void {
    this.setupRenderer();
    this.setupResponsiveness();
  }

  private setupRenderer(): void {
    const ThreeRendererClass = this.rendererClass;
    this.renderer = new ThreeRendererClass({
      canvas: this.canvasManager.canvas,
      ...this.rendererParams,
    });
  }

  private setupResponsiveness(): void {
    window.addEventListener('resize', () => {
      const canvas = this.canvasManager.canvas;
      const width = canvas.parentElement.clientWidth;
      const height = canvas.parentElement.clientHeight;
      const camera = this.sceneManager.currentScene.currentCamera;
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      this.renderer.setSize(width, height);
    });
  }

  public run(callback: XRAnimationLoopCallback): void {
    this.renderer.setAnimationLoop((time) => {
      callback(time);
    });
  }
}
