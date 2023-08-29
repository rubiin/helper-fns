import type { FunctionType } from "./types";

export interface ISlugifyOptions {
  separator?: string;
}

export interface IRandomStringOptions {
  length: number;
  symbols?: boolean;
  numbers?: boolean;
}

export interface IDebounceOptions {
  func: FunctionType;
  wait: number;
  immediate?: boolean;
}

export interface IEncryptOptions {
  text: string;
  config: { key: string; iv: string };
}
