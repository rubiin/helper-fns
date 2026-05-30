export type Arrayable<T> = T | T[]; // array or single value of type T

export type Awaitable<T> = T | PromiseLike<T>; // value or promise of type T

export type Class<T = unknown, Arguments extends any[] = any[]> = new (
  ...arguments_: Arguments
) => T;

export type Constructor<T, Arguments extends unknown[] = any[]> = new (
  ...arguments_: Arguments
) => T;

/**
 * Infers the element type of an array
 */
export type ElementOf<T> = T extends (infer E)[] ? E : never;

/**
 * Defines an intersection type of all union items.
 *
 * @param U Union of any types that will be intersected.
 * @returns U items intersected
 * @see https://stackoverflow.com/a/50375286/9259330
 */
export type UnionToIntersection<U> = (U extends unknown ? (k: U) => void : never) extends (
  k: infer I,
) => void
  ? I
  : never;

/**
 * Infers the arguments type of a function
 */
export type ArgumentsType<T> = T extends (...args: infer A) => any ? A : never;

export type MergeInsertions<T> = T extends object ? { [K in keyof T]: MergeInsertions<T[K]> } : T;

export interface SimpleObjectType {
  [key: string]: Primitive | Primitive[] | SimpleObjectType;
}
export type FunctionType<T = void> = (...arguments_: any) => T;

export type Maybe<T> = T | null;
export type Nullable<T> = T | null;
export type OptionalRecord<T> = {
  [key in keyof T]?: T[key];
};

export type Primitive = null | undefined | string | number | boolean | symbol | bigint;

export interface IPackageJsonAddress {
  email?: string;
  url?: string;
}

export interface IPackageJsonPerson extends IPackageJsonAddress {
  name: string;
}

export interface IPackageJson {
  name: string;
  version: string;
  description?: string;
  keywords?: string;
  homepage?: string;
  bugs?: IPackageJsonAddress;
  license?: string;
  author?: string | IPackageJsonPerson;
  contributors?: string[] | IPackageJsonPerson[];
  files?: string[];
  main?: string;
  browser?: string;
  bin?: Record<string, string>;
  man?: string;
  directories?: {
    lib?: string;
    bin?: string;
    man?: string;
    doc?: string;
    example?: string;
    test?: string;
  };
  repository?: {
    type?: "git";
    url?: string;
    directory?: string;
  };
  scripts?: Record<string, string>;
  config?: Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  bundledDependencies?: string[];
  engines?: Record<string, string>;
  os?: string[];
  cpu?: string[];
}
