import {Scene, WebGLRenderer} from 'three';
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
  public hierarchy: Entity[];
  public cameraCollection: CameraCollection;
  public defaultCamera: string;

  /**
   * Creates an entity-component managed scene.
   * @param {WebGLRenderer} renderer
   */
  constructor(renderer: WebGLRenderer) {
    super();
    this.scene = new Scene();
  }

  /**
   * Initialize the scene.
   */
  initialize(): void {
    console.log('test');
  }

  /**
   * Dispose the scene and all of the entities within.
   */
  dispose(): void {
    console.log('test');
  }
}
