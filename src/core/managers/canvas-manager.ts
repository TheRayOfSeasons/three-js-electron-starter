import Manager from './manager';

export default class CanvasManager extends Manager {
  public canvas: HTMLElement;

  public constructor(canvas: HTMLElement) {
    super();
    this.canvas = canvas;
  }
}
