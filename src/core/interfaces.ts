export interface IOnPointerClick {
  onPointerClick(): void
}

export interface IOnPointerHover {
  onPointerHover(num: number): void
}

export interface IEnumerator {
  // timeout
  delay: ReturnType<typeof setTimeout>
}

export type IEnumeratorFunction = () => IEnumerator;

export interface ICoroutine {
  id: string
  enumerator: IEnumeratorFunction
}

type CoroutineMap<T> = {
  [P in keyof T]: T[P] | null
}

export interface ICoroutineHandler {
  coroutines: CoroutineMap<ICoroutine>
  startCoroutine(enumerator: IEnumeratorFunction): ICoroutine
  runCoroutines(): void
  stopCoroutine(coroutine: ICoroutine): void
}
