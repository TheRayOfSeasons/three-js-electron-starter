import {Group} from 'three';
import Component from '../component-system/component';
import {
  IComponent,
  IComponentInjector,
  IComponentType,
} from '../component-system/interfaces';
import ManagedLifeCycle from '../lifecycles/lifecycle';
import {IEntityScene} from '../scenes/interfaces';
import {IEntity} from './interfaces';

/**
 * An entity in the scene.
 */
// eslint-disable-next-line max-len
export default class Entity extends ManagedLifeCycle implements IEntity, IComponentInjector {
  public name: string;
  public group: Group;
  public components: Component[];
  protected entityScene: IEntityScene;

  /**
   * Creates an instance of Entity.
   * @param {IEntityScene} entityScene
   */
  constructor(entityScene: IEntityScene) {
    super();
    this.group = new Group();
    this.entityScene = entityScene;
  }

  static instantiate<T extends Entity>(
      EntityClass: { new(...args: unknown[]): T },
  ): T {
    const entity = new EntityClass();
    // add into entity scene
    return entity;
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

  public awake(): void {
    for (const component of this.components) {
      component.awake();
    }
  }

  public start(): void {
    for (const component of this.components) {
      component.start();
    }
  }

  public update(): void {
    for (const component of this.components) {
      component.update();
    }
  }

  public lateUpdate(): void {
    for (const component of this.components) {
      component.lateUpdate();
    }
  }

  public onDestroy(): void {
    for (const component of this.components) {
      component.onDestroy();
    }
  }

  public destroy(): void {
    this.onDestroy();
    for (const component of this.components) {
      component.dispose();
    }
  }
}
