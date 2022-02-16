import EntityScene from './entity-scene';
import {EntitySceneClass} from './interfaces';

export default class SceneManager {
  public static currentSceneName: string;
  // TODO: Refactor to IEntitySceneExtender
  public static currentScene: EntityScene;
  public static currentSceneIndex: number;
  public static scenes: EntitySceneClass[] = [];

  // static set(initialScene: string, scenes: EntitySceneClass[]) {
  //   SceneManager.currentSceneName = initialScene;
  //   SceneManager.scenes = scenes;
  //   SceneManager.currentScene = SceneManager.getScene(
  //       SceneManager.currentSceneName,
  //   );
  // }

  static addScene(scene: EntitySceneClass) {
    SceneManager.scenes.push(scene);
  }

  static loadScene(sceneName: string): EntityScene {
    if (SceneManager.currentScene) {
      // TODO: dispose previous scene
    }
    const SceneClass = SceneManager.getScene(sceneName);
    const scene = new SceneClass();
    SceneManager.currentScene = scene;
    SceneManager.currentSceneIndex = SceneManager
        .scenes
        .map((scene) => scene.constructor.name)
        // TODO: get current scene name properly
        .indexOf(SceneManager.currentScene.constructor.name);
    return scene;
  }

  static loadSceneByIndex(index: number): EntityScene {
    if (SceneManager.currentScene) {
      // TODO: dispose previous scene
    }
    const SceneClass = SceneManager.getSceneByIndex(index);
    const scene = new SceneClass();
    SceneManager.currentScene = scene;
    SceneManager.currentSceneIndex = index;
    return scene;
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
