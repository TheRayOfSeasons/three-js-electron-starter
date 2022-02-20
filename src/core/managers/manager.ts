/**
 * A manager for core functionalities.
 */
export default class Manager {
  /**
   * Sets up the configurations of the Manager.
   */
  setup?(): void;

  /**
   * Start functionalities for the manager.
   * The difference of this stage of the
   * manager's lifecycle from `setup` is
   * that this is intended to instantiate
   * and begin all the necessary global
   * logic, where `setup` is only for
   * configurations.
   */
  start?(): void;
}
