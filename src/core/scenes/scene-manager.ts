import {EntitySceneClass} from './interfaces';

export default class SceneManager {
  public static currentSceneName: string;
  // TODO: Refactor to IEntitySceneExtender
  public static currentScene: EntitySceneClass;
  public static currentSceneIndex: number;
  public static scenes: EntitySceneClass[] = [];

  static set(initialScene: string, scenes: EntitySceneClass[]) {
    SceneManager.currentSceneName = initialScene;
    SceneManager.scenes = scenes;
    SceneManager.currentScene = SceneManager.getScene(
        SceneManager.currentSceneName,
    );
  }

  static addScene(scene: EntitySceneClass) {
    SceneManager.scenes.push(scene);
  }

  static loadScene(sceneName: string): void {
    if (SceneManager.currentScene) {
      // TODO: dispose previous scene
    }
    SceneManager.currentScene = SceneManager.getScene(sceneName);
    SceneManager.currentSceneIndex = SceneManager
        .scenes
        .map((scene) => scene.constructor.name)
        .indexOf(SceneManager.currentScene.constructor.name);
  }

  static loadSceneByIndex(index: number): void {
    if (SceneManager.currentScene) {
      // TODO: dispose previous scene
    }
    SceneManager.currentScene = SceneManager.getSceneByIndex(index);
    SceneManager.currentSceneIndex = index;
  }

  static getScene(sceneName: string): EntitySceneClass {
    const scene = SceneManager.scenes.find((scene) => scene.name === sceneName);
    if (!scene) {
      throw new Error(`Scene "${sceneName}" not found.`);
    }
    return scene;
  }

  static getSceneByIndex(index: number): EntitySceneClass {
    const scene = SceneManager.scenes[index];
    if (!scene) {
      throw new Error(`Scene with index "${index}" not found`);
    }
    return scene;
  }
}
