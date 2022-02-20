import {BoxBufferGeometry, Clock, Mesh, MeshNormalMaterial} from 'three';
import MonoBehaviour from '../core/component-system/monobehaviour';

export default class PlaceHolderMesh extends MonoBehaviour {
  public mesh: Mesh;
  public clock: Clock;
  public speed = 0.1;
  // TODO: Fix issue where OrbitControls can't be used in electron apps
  // public controls: OrbitControls;

  start() {
    const geometry = new BoxBufferGeometry(1, 1, 1);
    const material = new MeshNormalMaterial();
    this.mesh = new Mesh(geometry, material);
    this.entity.group.add(this.mesh);
    // TODO: Time manager
    this.clock = new Clock();
  }

  update() {
    this.mesh.rotation.y = this.clock.getElapsedTime() * 0.5;
  }
}
