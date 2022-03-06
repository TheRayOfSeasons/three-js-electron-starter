import Entity from '../core/entities/entity';
import MainCamera from '../entities/main-camera';
import Cube from '../entities/cube';
import EntityScene from '../core/scenes/entity-scene';

export default class MainScene extends EntityScene {
  public setupEntities(): Entity[] {
    const cube = this.addEntity(Cube);
    const mainCamera = this.addEntity(MainCamera);
    return [
      cube,
      mainCamera,
    ];
  }
}
