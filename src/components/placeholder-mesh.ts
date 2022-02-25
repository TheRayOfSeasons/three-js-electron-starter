import {BoxBufferGeometry, Clock, Mesh, MeshNormalMaterial} from 'three';
import MonoBehaviour from '../core/component-system/monobehaviour';

export default class PlaceHolderMesh extends MonoBehaviour {
  public mesh: Mesh;
  public clock: Clock;
  public speed = 0.1;
  public value = 0;
  // TODO: Fix issue where OrbitControls can't be used in electron apps
  // public controls: OrbitControls;

  // TODO: Add ability to `WaitForSeconds`;
  * test() {
    for (let i = 0; i < 10; i++) {
      this.value = i;
      yield i;
    }
  }

  start() {
    const geometry = new BoxBufferGeometry(1, 1, 1);
    const material = new MeshNormalMaterial();
    this.mesh = new Mesh(geometry, material);
    this.entity.add(this.mesh);
    // TODO: Time manager
    this.clock = new Clock();
    this.startCoroutine(this.test());
  }

  update() {
    if (this.value < 9) {
      console.log(this.value);
    }
    this.mesh.rotation.y = this.clock.getElapsedTime() * 0.5;
  }
}
