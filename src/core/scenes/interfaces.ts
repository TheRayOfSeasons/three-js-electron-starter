import {
  Camera,
  Scene,
  WebGLRenderer,
} from 'three';
import {EffectComposer} from 'three/examples/jsm/postprocessing/EffectComposer';
import Entity from '../entities/entity';
import EntityScene from './entity-scene';

type EntitySceneClassExtender<T extends EntityScene> = {
  new(...args: unknown[]): T
}

export type EntitySceneClass = EntitySceneClassExtender<EntityScene>;

export interface IEntityScene {
  entities: Entity[]
  setupEntities(): Entity[]
  setup(): void
  dispose(): void
}

export type RenderComposers = {
  [key: string]: EffectComposer;
};

export type ComposerConfigurationProcess = (
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera
) => RenderComposers;

export type RenderProcess = (
  renderer: WebGLRenderer,
  composers: RenderComposers,
  scene: Scene,
  camera: Camera
) => void;

export interface IEntitySceneNames {
  [key: string]: number
}
