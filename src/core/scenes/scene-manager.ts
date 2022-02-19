import EntityScene from './entity-scene';
import {EntitySceneClass} from './interfaces';

// TODO: Convert to singleton rather than a class
// TODO: Use Dependency Injection
export default class SceneManager {
  public currentSceneName: string;
  public currentScene: EntityScene;
  public currentSceneIndex: number;
  public scenes: EntitySceneClass[] = [];

  // set(initialScene: string, scenes: EntitySceneClass[]) {
  //   this.currentSceneName = initialScene;
  //   this.scenes = scenes;
  //   this.currentScene = this.getScene(
  //       this.currentSceneName,
  //   );
  // }

  addScene(scene: EntitySceneClass) {
    this.scenes.push(scene);
  }

  loadScene(sceneName: string): EntityScene {
    if (this.currentScene) {
      // TODO: dispose previous scene
    }
    const SceneClass = this.getScene(sceneName);
    const scene = new SceneClass();
    this.currentScene = scene;
    this.currentSceneIndex = this
        .scenes
        .map((scene) => scene.constructor.name)
        // TODO: get current scene name properly
        .indexOf(this.currentScene.constructor.name);
    return scene;
  }

  loadSceneByIndex(index: number): EntityScene {
    if (this.currentScene) {
      // TODO: dispose previous scene
    }
    const SceneClass = this.getSceneByIndex(index);
    const scene = new SceneClass();
    this.currentScene = scene;
    this.currentSceneIndex = index;
    scene.setup();
    return scene;
  }

  getScene(sceneName: string): EntitySceneClass {
    const scene = this.scenes.find((scene) => scene.name === sceneName);
    if (!scene) {
      throw new Error(`Scene "${sceneName}" not found.`);
    }
    return scene;
  }

  getSceneByIndex(index: number): EntitySceneClass {
    const scene = this.scenes[index];
    if (!scene) {
      throw new Error(`Scene with index "${index}" not found`);
    }
    return scene;
  }
}
