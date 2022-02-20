import Threenity from './core/threenity';
import MainScene from './scenes/main-scene';

window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('app');

  const app = new Threenity({canvas: canvas});

  app.registerScenes([
    MainScene,
  ]);

  app.start();
});
