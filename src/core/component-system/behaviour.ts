import Component from './component';

/**
 * A component that can be enabled and disabled.
 */
export default class Behaviour extends Component {
  protected _enabled = true;

  /**
   * Returns the value if the behaviour is enabled.
   */
  public get enabled(): boolean {
    return this._enabled;
  }

  /**
   * Enables or disables the Behaviour.
   * @param {boolean} toggle
   */
  public enable(toggle: boolean): void {
    this._enabled = toggle;
    if (toggle) {
      if (this.awake) {
        this.awake();
      }
      if (!this.isStarted) {
        this.isStarted = true;
        if (this.start) {
          this.start();
        }
      }
      if (this.onEnable) {
        this.onEnable();
      }
    } else {
      if (this.onDisable) {
        this.onDisable();
      }
    }
  }

  public onEnable?(): void;

  public onDisable?(): void;
}
