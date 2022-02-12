import Component from './component';

/**
 * A component that can be enabled and disabled.
 */
export default class Behaviour extends Component {
  protected _enabled: boolean;

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
      this.awake();
      this.onEnable();
    } else {
      this.onDisable();
    }
  }

  public onEnable?(): void;

  public onDisable?(): void;
}
