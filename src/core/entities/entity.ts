import {Object3D} from 'three';
import Component from '../component-system/component';
import {
  ComponentClass,
  IComponentInjector,
} from '../component-system/interfaces';
import {ManagedLifeCycle} from '../lifecycles/lifecycle';
import EntityScene from '../scenes/entity-scene';

/**
 * An entity in the scene.
 */
// eslint-disable-next-line max-len
export default class Entity extends Object3D implements ManagedLifeCycle, IComponentInjector {
  public name: string;
  public components: Component[] = [];
  public entityScene: EntityScene;

  /**
   * Creates an instance of Entity.
   * @param {EntityScene} entityScene
   */
  constructor(entityScene: EntityScene) {
    super();
    this.entityScene = entityScene;
    this.setupComponents();
  }

  /**
   * A function for setting up the entity instance's components.
   */
  setupComponents(): void {
    throw new Error('Method not implemented.');
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
  public getComponent(componentType: ComponentClass): Component | null {
    return this
        .components
        .find((component) => component instanceof componentType);
  }

  /**
   * Adds a component to the entity.
   * @param {IComponentType} ComponentType
   */
  public addComponent(ComponentType: ComponentClass): void {
    const component = new ComponentType(this);
    this.components.push(component);
  }

  /**
   * Adds a component to the entity.
   * @param {IComponentType} componentType
   */
  public removeComponent(componentType: ComponentClass): void {
    this.components = this
        .components
        .filter((component) => !(component instanceof componentType));
  }

  public awake(): void {
    for (const component of this.components) {
      if (component.awake) {
        component.awake();
      }
    }
  }

  public start(): void {
    for (const component of this.components) {
      if (component.start) {
        component.start();
      }
    }
  }

  public update(): void {
    for (const component of this.components) {
      if (component.update) {
        component.update();
      }
    }
  }

  public lateUpdate(): void {
    for (const component of this.components) {
      if (component.lateUpdate) {
        component.lateUpdate();
      }
    }
  }

  public onDestroy(): void {
    for (const component of this.components) {
      if (component.onDestroy) {
        component.onDestroy();
      }
    }
  }

  public destroy(): void {
    this.onDestroy();
    for (const component of this.components) {
      component.dispose();
    }
  }
}
