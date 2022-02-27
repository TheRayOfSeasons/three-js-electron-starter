import {Clock} from 'three';

const clock = new Clock();

export default class Time {
  static get clock(): Clock {
    return clock;
  }

  static get deltaTime(): number {
    return clock.getDelta();
  }

  static get elapsedTime(): number {
    return clock.getElapsedTime();
  }
}
