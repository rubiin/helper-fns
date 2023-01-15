export interface ISlugifyOptions {
  lowercase?: boolean;
  trim?: boolean;
  separator?: string;
}

export interface IRandomStringOptions {
  length: number;
  symbols?: boolean;
  numbers?: boolean;
}

export interface IDebounceOptions {
  func: Function;
  wait: number;
  immediate?: boolean;
}

export interface IEncryptOptions {
  text: string;
  config: { key: string; iv: string };
}
