import Entity from '../entities/entity';
import {ManagedLifeCycle} from '../lifecycles/lifecycle';
import {ComponentClass, IComponentInjector} from './interfaces';

/**
 * A component containing logic that can be attached to an Entity.
 */
// eslint-disable-next-line max-len
export default class Component implements ManagedLifeCycle, IComponentInjector {
  public entity: Entity;

  /**
   * @param {Entity} entity The entity the component will be attached to.
   */
  public constructor(entity: Entity) {
    this.entity = entity;
    if (this.awake) this.awake();
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

  /**
   * Returns if the current entity is active.
   */
  public get activeSelf() {
    return this.entity.visible;
  }

  /**
   * Sets the current entity as active
   * @param {boolean} toggle
   */
  public setActive(toggle: boolean): void {
    this.entity.visible = toggle;
  }

  /**
   * Destroy the current entity.
   */
  public destroy(): void {
    this.entity.destroy();
  }

  public dispose(): void {
    // TODO: add disposal logic here
  }
}
