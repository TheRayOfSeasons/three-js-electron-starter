import {IEntityScene} from '../scenes/interfaces';
import Entity from './entity';

type EntityExtender<T extends Entity> = {
  new(entity: IEntityScene): T
}

export type EntityClass = EntityExtender<Entity>;
