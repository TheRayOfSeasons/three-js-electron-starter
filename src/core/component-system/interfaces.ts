import {IEntity} from '../entities/interfaces';

export interface IComponent {
  entity: IEntity
  setActive(toggle: boolean): void
}

export interface IComponentType {
  new(entity: IEntity): IComponent
}

export interface IComponentInjector {
  getComponent(componentType: IComponentType): IComponent | null
  addComponent(ComponentType: IComponentType): void
  removeComponent(componentType: IComponentType): void
}
