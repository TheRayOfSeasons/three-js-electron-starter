import CameraManager from '../components/camera-manager';
import Entity from '../core/entities/entity';

export default class MainCamera extends Entity {
  setupComponents(): void {
    this.addComponent(CameraManager);
  }
}
