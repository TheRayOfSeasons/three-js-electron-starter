import {Scene} from 'three';
import {CameraCollection} from '../camera-manager/interfaces';
import Entity from '../entities/entity';
import EntityScene from './entity-scene';

type EntitySceneClassExtender<T extends EntityScene> = {
  new(...args: unknown[]): T
}

export type EntitySceneClass = EntitySceneClassExtender<EntityScene>;

export interface IEntityScene {
  scene: Scene
  defaultCamera: string
  cameraCollection: CameraCollection
  entities: Entity[]
  initialize(): void
  dispose(): void
}
