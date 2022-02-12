export default class ManagedLifeCycle {
  /**
   * Runs on the first time a component is loaded into the scene
   * and when the Entity the component is attached is initialized.
   */
  public awake?(): void;

  /**
    * Runs once only and before update.
    */
  public start?(): void;

  /**
    * Runs once every frame.
    */
  public update?(): void;

  /**
    * Runs once every frame after the scene is rendered in the canvas.
    */
  public lateUpdate?(): void;

  /**
    * Runs before the entity is completely disposed.
    */
  public onDestroy?(): void;
}
