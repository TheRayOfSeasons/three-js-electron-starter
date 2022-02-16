import Entity from '../entities/entity';
import ManagedLifeCycle from '../lifecycles/lifecycle';
import {IComponent, IComponentInjector, IComponentType} from './interfaces';

/**
 * A component containing logic that can be attached to an Entity.
 */
// eslint-disable-next-line max-len
export default class Component extends ManagedLifeCycle implements IComponent, IComponentInjector {
  entity: Entity;

  /**
   * @param {Entity} entity The entity the component will be attached to.
   */
  constructor(entity: Entity) {
    super();
    this.entity = entity;
    if (this.awake) this.awake();
  }

  getComponent(componentType: IComponentType): IComponent {
    return this.entity.getComponent(componentType);
  }

  addComponent(ComponentType: IComponentType): void {
    this.entity.addComponent(ComponentType);
  }

  removeComponent(componentType: IComponentType): void {
    this.entity.removeComponent(componentType);
  }

  /**
   * Returns if the current entity is active.
   */
  public get activeSelf() {
    return this.entity.group.visible;
  }

  /**
   * Sets the current entity as active
   * @param {boolean} toggle
   */
  public setActive(toggle: boolean): void {
    this.entity.group.visible = toggle;
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
