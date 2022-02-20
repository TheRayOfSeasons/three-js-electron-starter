import Entity from '../entities/entity';
import Component from './component';

type ComponentExtender<T extends Component> = {
  new(entity: Entity): T
}

export type ComponentClass = ComponentExtender<Component>;

export interface IComponentInjector {
  getComponent(componentType: ComponentClass): Component | null
  addComponent(ComponentType: ComponentClass): void
  removeComponent(componentType: ComponentClass): void
}
