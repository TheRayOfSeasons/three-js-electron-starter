import {Scene} from 'three';
import {CameraCollection} from '../camera-manager/interfaces';
import Entity from '../entities/entity';

export interface IEntityScene {
  scene: Scene
  defaultCamera: string
  cameraCollection: CameraCollection
  hierarchy: Entity[]
  initialize(): void
  dispose(): void
}
