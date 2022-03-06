import {Camera} from 'three';
import Entity from '../entities/entity';
import {ManagedLifeCycle} from '../lifecycles/lifecycle';
import {ComponentClass, IComponentInjector} from './interfaces';

/**
 * A component containing logic that can be attached to an Entity.
 */
export default class Component implements ManagedLifeCycle, IComponentInjector {
  public entity: Entity;
  public isStarted = false;

  /**
   * @param {Entity} entity The entity the component will be attached to.
   */
  public constructor(entity: Entity) {
    this.entity = entity;
    if (this.awake) this.awake();
  }

  get managers() {
    return this.entity.entityScene.managers;
  }

  awake?(): void;
  start?(): void;
  update?(): void;
  lateUpdate?(): void;
  onDestroy?(): void;

  getComponent(componentType: ComponentClass): Component {
    return this.entity.getComponent(componentType);
  }

  addComponent(ComponentType: ComponentClass): Component {
    return this.entity.addComponent(ComponentType);
  }

  removeComponent(componentType: ComponentClass): void {
    this.entity.removeComponent(componentType);
  }

  setAsMainCamera(camera: Camera): void {
    this.entity.entityScene.setAsMainCamera(camera);
  }

  /**
   * Destroy the current entity.
   */
  public destroy(): void {
    this.entity.destroy();
  }
}
