import {Camera, Scene, WebGLRenderer} from 'three';
import {CameraCollection} from '../camera-manager/interfaces';
import Entity from '../entities/entity';
import ManagedLifeCycle from '../lifecycles/lifecycle';
import CanvasManager from '../managers/canvas-manager';
import RenderManager from '../managers/render-manager';
import SceneManager from '../managers/scene-manager';
import {IEntityScene} from './interfaces';

/**
 * An entity-component managed scene
 */
// eslint-disable-next-line max-len
export default class EntityScene extends ManagedLifeCycle implements IEntityScene {
  public scene: Scene;
  public entities: Entity[];
  public cameraCollection: CameraCollection;
  public currentCameraKey: string;
  public defaultCamera: string;
  protected canvasManager: CanvasManager;
  protected sceneManager: SceneManager;
  protected renderManager: RenderManager;


  public constructor(
      canvasManager: CanvasManager,
      renderManager: RenderManager,
      sceneManager: SceneManager,
  ) {
    super();
    this.scene = new Scene();
    this.currentCameraKey = this.defaultCamera;
    this.canvasManager = canvasManager;
    this.renderManager = renderManager;
    this.sceneManager = sceneManager;
    this.entities = this.setupEntities();
    if (this.initialize) {
      this.initialize();
    }
    if (this.configurePostprocessing) {
      this.configurePostprocessing();
    }
  }

  /**
   * Initialize the scene.
   */
  initialize?(): void

  /**
   * Configure any postprocessing composers and passes.
   */
  configurePostprocessing?(): void

  get currentCamera(): Camera {
    return this.cameraCollection[this.currentCameraKey];
  }

  /**
   * Setup and return all initial entities here as an array.
   */
  public setupEntities(): Entity[] {
    throw new Error('Method not implemented.');
  }

  /**
   * Setup renderer configurations. Override for more custom setup.
   * @param {HTMLElement} canvas The current HTML Canvas
   * @param {WebGLRenderer} renderer The current renderer
   */
  public setupRenderer(canvas: HTMLElement, renderer: WebGLRenderer) {
    const canvasHeight = canvas.parentElement.clientHeight;
    const canvasWidth = canvas.parentElement.clientWidth;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 1.0);
  }

  /**
   * Sets up all components of the scene.
   */
  public setup(): void {
    this.setupRenderer(this.canvasManager.canvas, this.renderManager.renderer);
    this.setupEntities();
    for (const entity of this.entities) {
      entity.awake();
      entity.start();
    }
  }

  addToScene(entity: Entity): void {
    this.entities.push(entity);
  }

  /**
   * An overridable function that renders the scene.
   */
  render(): void {
    this.renderManager.renderer.render(this.scene, this.currentCamera);
  }

  run(): void {
    for (const entity of this.entities) {
      entity.update();
    }
    this.render();
    for (const entity of this.entities) {
      entity.lateUpdate();
    }
  }

  /**
   * Dispose the scene and all of the entities within.
   */
  dispose(): void {
    for (const entity of this.entities) {
      entity.destroy();
    }
  }
}
