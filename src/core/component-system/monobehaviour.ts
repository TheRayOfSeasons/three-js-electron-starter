import Behaviour from './behaviour';
import {
  Coroutine,
  CoroutineEnumerator,
  ICoroutineHandler,
} from './interfaces';

/**
 * Base class for common behaviours.
 */
// eslint-disable-next-line max-len
export default class MonoBehaviour extends Behaviour implements ICoroutineHandler {
  public coroutines: Coroutine[] = [];

  startCoroutine(coroutine: CoroutineEnumerator): void {
    this.coroutines.push({
      enumerator: coroutine,
      isActive: true,
    });
  }

  pauseCoroutine(index: number): void {
    if (this.coroutines[index]) {
      this.coroutines[index].isActive = false;
    } else {
      throw new Error(`Coroutine with index ${index} not found.`);
    }
  }

  stopCoroutine(index: number): void {
    if (this.coroutines[index]) {
      this.coroutines.splice(index, 1);
    } else {
      throw new Error(`Coroutine with index ${index} not found.`);
    }
  }

  runCoroutines(): void {
    if (this.coroutines.length <= 0) {
      return;
    }
    for (let i = 0; i < this.coroutines.length; i++) {
      const {enumerator, isActive} = this.coroutines[i];
      if (!isActive) {
        continue;
      }
      const result = enumerator.next();
      if (result.done) {
        this.stopCoroutine(i);
      }
    }
  }
}
