import {Group} from 'three';
import {
  IComponent,
  IComponentInjector,
  IComponentType,
} from '../component-system/interfaces';
import {IEntity} from './interfaces';

/**
 * An entity in the scene.
 */
export default class Entity implements IEntity, IComponentInjector {
  public name: string;
  public group: Group;
  public components: IComponent[];

  /**
   * Creates an instance of Entity.
   */
  constructor() {
    this.group = new Group();
  }

  /**
   * Retrieves an existing instance of a component from this entity.
   * @param {IComponentType} componentType
   * @return {IComponent}
   */
  public getComponent(componentType: IComponentType): IComponent | null {
    return this
        .components
        .find((component) => component instanceof componentType);
  }

  /**
   * Adds a component to the entity.
   * @param {IComponentType} ComponentType
   */
  public addComponent(ComponentType: IComponentType): void {
    const component = new ComponentType(this);
    this.components.push(component);
  }

  /**
   * Adds a component to the entity.
   * @param {IComponentType} componentType
   */
  public removeComponent(componentType: IComponentType): void {
    this.components = this
        .components
        .filter((component) => !(component instanceof componentType));
  }
}
