export interface ManagedLifeCycle {
  /**
   * Runs on the first time a component is loaded into the scene
   * and when the Entity the component is attached is initialized.
   */
  awake?(): void;

  /**
    * Runs once only and before update.
    */
  start?(): void;

  /**
    * Runs once every frame.
    */
  update?(): void;

  /**
    * Runs once every frame after the scene is rendered in the canvas.
    */
  lateUpdate?(): void;

  /**
    * Runs before the entity is completely disposed.
    */
  onDestroy?(): void;
}
