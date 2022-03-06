import {Camera, Scene, WebGLRenderer} from 'three';
import {CameraCollection} from '../camera-manager/interfaces';
import Entity from '../entities/entity';
import {EntityClass} from '../entities/interfaces';
import CanvasManager from '../managers/canvas-manager';
import RenderManager from '../managers/render-manager';
import SceneManager from '../managers/scene-manager';
import {IEntityScene} from './interfaces';

/**
 * An entity-component managed scene
 */
// eslint-disable-next-line max-len
export default class EntityScene extends Scene implements IEntityScene {
  public entities: Entity[];
  public cameraCollection: CameraCollection;
  public currentCameraKey: string;
  public defaultCamera: string;
  public canvasManager: CanvasManager;
  public sceneManager: SceneManager;
  public renderManager: RenderManager;


  public constructor(
      canvasManager: CanvasManager,
      renderManager: RenderManager,
      sceneManager: SceneManager,
  ) {
    super();
    this.entities = [];
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
   * Setup cameras
   */
  public setupCameras(): CameraCollection {
    throw new Error('Method not implemented.');
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

  public setCurrentCamera(cameraKey: string): void {
    this.currentCameraKey = cameraKey;
  }

  /**
   * Sets up all components of the scene.
   */
  public setup(): void {
    this.setupRenderer(this.canvasManager.canvas, this.renderManager.renderer);
    this.cameraCollection = this.setupCameras();
    this.currentCameraKey = this.defaultCamera;
    this.entities = this.setupEntities();
    for (const entity of this.entities) {
      entity.awake();
    }
    for (const entity of this.entities) {
      entity.start();
    }
  }

  public addEntity(entityClass: EntityClass): Entity {
    const TargetEntity = entityClass;
    const entity = new TargetEntity(this);
    this.addToScene(entity);
    return entity;
  }

  addToScene(entity: Entity): void {
    this.add(entity);
    this.entities.push(entity);
  }

  /**
   * An overridable function that renders the scene.
   */
  render(): void {
    this.renderManager.renderer.render(this, this.currentCamera);
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
    this.entities = [];
  }
}
