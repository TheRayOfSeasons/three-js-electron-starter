import EntityScene from '../scenes/entity-scene';
import {EntitySceneClass, IEntitySceneNames} from '../scenes/interfaces';
import CanvasManager from './canvas-manager';
import Manager from './manager';
import RenderManager from './render-manager';

export default class SceneManager extends Manager {
  public currentSceneName: string;
  public currentScene: EntityScene;
  public currentSceneIndex: number;
  public scenes: EntitySceneClass[] = [];
  protected sceneNames: IEntitySceneNames = {};
  protected canvasManager: CanvasManager;
  protected renderManager: RenderManager;

  public injectDependencies(
      canvasManager: CanvasManager,
      renderManager: RenderManager,
  ): void {
    this.canvasManager = canvasManager;
    this.renderManager = renderManager;
  }

  private getManagers(): Manager[] {
    return [
      this.canvasManager,
      this.renderManager,
      this,
    ];
  }

  public addScene(scene: EntitySceneClass) {
    const index = this.scenes.push(scene);
    this.sceneNames[scene.name] = index;
  }

  public loadScene(sceneName: string): EntityScene {
    if (this.currentScene) {
      this.currentScene.dispose();
    }
    const SceneClass = this.getScene(sceneName);
    const scene = new SceneClass(...this.getManagers());
    this.currentScene = scene;
    this.currentSceneIndex = this.sceneNames[sceneName];
    return scene;
  }

  public loadSceneByIndex(index: number): EntityScene {
    if (this.currentScene) {
      this.currentScene.dispose();
    }
    const SceneClass = this.getSceneByIndex(index);
    const scene = new SceneClass(...this.getManagers());
    this.currentScene = scene;
    this.currentSceneIndex = index;
    scene.setup();
    return scene;
  }

  public getScene(sceneName: string): EntitySceneClass {
    const scene = this.scenes[this.sceneNames[sceneName]];
    if (!scene) {
      throw new Error(`Scene "${sceneName}" not found.`);
    }
    return scene;
  }

  public getSceneByIndex(index: number): EntitySceneClass {
    const scene = this.scenes[index];
    if (!scene) {
      throw new Error(`Scene with index "${index}" not found`);
    }
    return scene;
  }
}
