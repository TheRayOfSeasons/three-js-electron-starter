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
      rendererClass: RendererClass,
      rendererParams: WebGLRendererParameters = null,
  ) {
    super();

    this.rendererClass = rendererClass;
    this.rendererParams = rendererParams;
  }

  public injectDepedencies(
      canvasManager: CanvasManager,
      sceneManager: SceneManager,
  ): void {
    this.sceneManager = sceneManager;
    this.canvasManager = canvasManager;
  }

  public setup(): void {
    this.setupRenderer();
  }

  private setupRenderer(): void {
    const ThreeRendererClass = this.rendererClass;
    let params = this.rendererParams;
    if (!params) {
      params = {
        antialias: true,
      };
    }
    this.renderer = new ThreeRendererClass({
      canvas: this.canvasManager.canvas,
      ...params,
    });
  }

  private setupResponsiveness(): void {
    const applyResponsiveness = () => {
      const canvas = this.canvasManager.canvas;
      const width = canvas.parentElement.clientWidth;
      const height = canvas.parentElement.clientHeight;
      const camera = this.sceneManager.currentScene.currentCamera;
      if (camera instanceof PerspectiveCamera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      this.renderer.setSize(width, height);
    };
    applyResponsiveness();
    window.addEventListener('resize', () => {
      applyResponsiveness();
    });
  }

  public run(callback: XRAnimationLoopCallback): void {
    this.setupResponsiveness();
    this.renderer.setAnimationLoop((time) => {
      callback(time);
    });
  }
}
