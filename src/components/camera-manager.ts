import {PerspectiveCamera} from 'three';
import MonoBehaviour from '../core/component-system/monobehaviour';

export default class CameraManager extends MonoBehaviour {
  start() {
    const canvas = this.managers.canvasManager.canvas;
    const canvasHeight = canvas.parentElement.clientHeight;
    const canvasWidth = canvas.parentElement.clientWidth;
    const camera = new PerspectiveCamera(
        75,
        canvasWidth / canvasHeight,
    );
    this.entity.add(camera);
    this.setAsMainCamera(camera);
    camera.position.z = 5;
  }
}
