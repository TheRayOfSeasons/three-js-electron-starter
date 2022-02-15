import EntityScene from './entity-scene';

export let SceneManager: BaseSceneManager;

export default class BaseSceneManager {
  public currentSceneName: string;
  public currentScene: EntityScene;
  public scenes: EntityScene[];

  constructor() {
    SceneManager = this;
  }

  set(initialScene: string, scenes: EntityScene[]) {
    this.currentSceneName = initialScene;
    this.scenes = scenes;
    this.currentScene = this.getScene(this.currentSceneName);
  }

  addScene(scene: EntityScene) {
    this.scenes.push(scene);
  }

  getScene(sceneName: string): EntityScene {
    return this.scenes.find((scene) => scene.name === sceneName);
  }

  getSceneByIndex(index: number): EntityScene {
    return this.scenes[index];
  }
}
