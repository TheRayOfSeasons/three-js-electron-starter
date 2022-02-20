import Entity from '../core/entities/entity';
import Cube from '../entities/cube';
import EntityScene from '../core/scenes/entity-scene';
import {CameraCollection} from '../core/camera-manager/interfaces';
import {PerspectiveCamera} from 'three';

export default class MainScene extends EntityScene {
  public defaultCamera = 'MainCamera';

  public setupCameras(): CameraCollection {
    const canvas = this.canvasManager.canvas;
    const canvasHeight = canvas.parentElement.clientHeight;
    const canvasWidth = canvas.parentElement.clientWidth;
    const camera = new PerspectiveCamera(
        75,
        canvasWidth / canvasHeight,
    );
    camera.position.z = 3;
    return {
      MainCamera: camera,
    };
  }

  public setupEntities(): Entity[] {
    const cube = this.addEntity(Cube);
    return [
      cube,
    ];
  }
}
