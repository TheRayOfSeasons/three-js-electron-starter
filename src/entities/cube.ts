import Entity from '../core/entities/entity';
import PlaceHolderMesh from '../components/placeholder-mesh';

export default class Cube extends Entity {
  setupComponents(): void {
    this.addComponent(PlaceHolderMesh);
  }
}
