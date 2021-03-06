import WaitForSeconds from '../core/time/wait-for-seconds';
import {BoxBufferGeometry, Mesh, MeshNormalMaterial} from 'three';
import MonoBehaviour from '../core/component-system/monobehaviour';
import Time from '../core/time/time';

export default class PlaceHolderMesh extends MonoBehaviour {
  public mesh: Mesh;
  public speed = 0.1;
  public value = 0;

  * test() {
    for (let i = 0; i < 10; i++) {
      this.value = i;
      yield new WaitForSeconds(3);
    }
  }

  start() {
    const geometry = new BoxBufferGeometry(1, 1, 1);
    const material = new MeshNormalMaterial();
    this.mesh = new Mesh(geometry, material);
    this.entity.add(this.mesh);
    this.startCoroutine(this.test());
    console.log('start');
  }

  update() {
    if (this.value < 9) {
      console.log(this.value);
    }
    if (this.mesh) {
      this.mesh.rotation.y += Time.deltaTime * 0.5;
    }
  }
}
