export type Arrayable<T> = T | T[]; // array or single value of type T

export type Awaitable<T> = T | PromiseLike<T>; // value or promise of type T

export type Class<T = unknown, Arguments extends any[] = any[]> = new (
  ...arguments_: Arguments
) => T;

export type Constructor<T, Arguments extends unknown[] = any[]> = new (
  ...arguments_: Arguments
) => T;



export interface NestedObject {
  [key: string]: Primitive | Primitive[] | NestedObject;
}
export type FunctionType<T = void> = (...arguments_: any) => T;

export type Maybe<T> = T | null;
export type Nullable<T> = T | null;
export type OptionalRecord<T> = {
  [key in keyof T]?: T[key];
};

export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint;



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
        type?: 'git';
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
