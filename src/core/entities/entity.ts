import {
  Object3D,
  Mesh,
  Points,
  Line,
  Texture,
} from 'three';
import Behaviour from '../component-system/behaviour';
import Component from '../component-system/component';
import {
  ComponentClass,
  IComponentInjector,
} from '../component-system/interfaces';
import MonoBehaviour from '../component-system/monobehaviour';
import {ManagedLifeCycle} from '../lifecycles/lifecycle';
import EntityScene from '../scenes/entity-scene';
import {EntityClass} from './interfaces';

/**
 * An entity in the scene.
 */
// eslint-disable-next-line max-len
export default class Entity extends Object3D implements ManagedLifeCycle, IComponentInjector {
  public name: string;
  public components: Component[] = [];
  public entityScene: EntityScene;
  protected disposableMeshes = [Mesh, Points, Line];

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

  instantiate(EntityClass: EntityClass): Entity {
    return this.entityScene.addEntity(EntityClass);
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
   * @param {ComponentClass} ComponentType
   * @return {Component}
   */
  public addComponent(ComponentType: ComponentClass): Component {
    const component = new ComponentType(this);
    this.components.push(component);
    return component;
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

  private canComponentRun(component: Component): boolean {
    if (component instanceof Behaviour) {
      return component.enabled;
    }
    return true;
  }

  /**
   * Returns if the current entity is active.
   */
  public get activeSelf() {
    return this.visible;
  }

  /**
   * Sets the current entity as active
   * @param {boolean} toggle
   */
  public setActive(toggle: boolean): void {
    this.visible = toggle;
    if (toggle) {
      for (const component of this.components) {
        console.log(component);
        console.log('isbehavrior:', component instanceof Behaviour);
        if (component instanceof Behaviour) {
          component.enable(toggle);
        } else {
          if (component.awake) {
            component.awake();
          }
          if (!component.isStarted) {
            component.isStarted = true;
            if (component.start) {
              component.start();
            }
          }
        }
      }
    }
  }

  public awake(): void {
    if (!this.activeSelf) {
      return;
    }
    for (const component of this.components) {
      if (!this.canComponentRun(component)) {
        continue;
      }
      if (component.awake) {
        component.awake();
      }
    }
  }

  public start(): void {
    if (!this.activeSelf) {
      return;
    }
    for (const component of this.components) {
      if (!this.canComponentRun(component)) {
        continue;
      }
      if (component.start) {
        component.start();
        component.isStarted = true;
      }
    }
  }

  public update(): void {
    if (!this.activeSelf) {
      return;
    }
    for (const component of this.components) {
      if (!this.canComponentRun(component)) {
        continue;
      }
      if (component.update) {
        component.update();
      }
      if (component instanceof MonoBehaviour) {
        component.runCoroutines();
      }
    }
  }

  public lateUpdate(): void {
    if (!this.activeSelf) {
      return;
    }
    for (const component of this.components) {
      if (component.lateUpdate) {
        component.lateUpdate();
      }
    }
  }

  public onDestroy(): void {
    // NOTE: On destroy can run regardless if the entity is active or not.
    for (const component of this.components) {
      if (component.onDestroy) {
        component.onDestroy();
      }
    }
  }

  public destroy(): void {
    this.onDestroy();
    this.traverse((object: Object3D) => {
      for (const disposableMeshes of this.disposableMeshes) {
        if (object instanceof disposableMeshes) {
          object.geometry.dispose();
          object.material.dispose();
          break;
        }
        if (object instanceof Texture) {
          object.dispose();
        }
      }
      this.entityScene.remove(this);
    });
  }
}
