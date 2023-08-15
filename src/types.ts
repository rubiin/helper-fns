export type Class<T = unknown, Arguments extends any[] = any[]> = new (
  ...arguments_: Arguments
) => T

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint

export type Maybe<T> = T | null
export type Nullable<T> = T | null
export type OptionalRecord<T> = {
  [key in keyof T]?: T[key]
}
export type Constructor<T, Arguments extends unknown[] = any[]> = new(...arguments_: Arguments) => T

export type Fn<T = void> = () => T

export type Arrayable<T> = T | Array<T> // array or single value of type T

export type Awaitable<T> = T | PromiseLike<T> // value or promise of type T
