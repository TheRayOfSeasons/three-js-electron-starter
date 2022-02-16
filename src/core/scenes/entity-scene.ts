import {Camera, Scene, WebGLRenderer} from 'three';
import {CameraCollection} from '../camera-manager/interfaces';
import Entity from '../entities/entity';
import ManagedLifeCycle from '../lifecycles/lifecycle';
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
  defaultCamera: string;
  protected renderer: WebGLRenderer;

  /**
   * Creates an entity-component managed scene.
   * @param {WebGLRenderer} renderer
   */
  constructor(renderer: WebGLRenderer) {
    super();
    this.scene = new Scene();
    this.currentCameraKey = this.defaultCamera;
    this.renderer = renderer;
  }

  get currentCamera(): Camera {
    return this.cameraCollection[this.currentCameraKey];
  }

  /**
   * Initialize the scene.
   */
  initialize(): void {
    for (const entity of this.entities) {
      entity.awake();
      entity.start();
    }
    console.log('test');
  }

  // TODO: add postprocess function
  postprocess(renderer: WebGLRenderer, mainCamera: Camera): void {
    // TODO: create camera manager for main and all other active cameras
    // callback(this.renderer, null);
    // TODO: Developer must be able to postprocess with any camera
  }

  addToScene(entity: Entity): void {
    this.entities.push(entity);
  }

  render(): void {
    for (const entity of this.entities) {
      entity.update();
    }
    this.renderer.render(this.scene, this.currentCamera);
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
