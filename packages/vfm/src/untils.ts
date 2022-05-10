import { CancellablePromise } from './types';

export const setKeyValue = (
  data: Record<string, any>,
  keyPath: string,
  value: any
) => {
  const arr = keyPath.split('.');
  let v: any = data;
  while (arr.length && typeof v === 'object' && v !== null) {
    const k = arr.shift()!;
    if (arr.length === 0) {
      v[k] = value;
    } else if (typeof v[k] !== 'object' || v[k] === null) {
      v[k] = /^\d+$/.test(k) ? [] : {};
    }
    v = v[k];
  }
};

export const getKeyValue = (data: Record<string, any>, keyPath: string) => {
  const arr = keyPath.split('.');
  let v: any = data;
  while (arr.length && v) {
    const k = arr.shift()!;
    v = typeof v === 'object' && v !== null ? v[k] : undefined;
  }
  return v;
};

export const delKey = (data: Record<string, any>, keyPath: string) => {
  const arr = keyPath.split('.');
  let v: any = data;
  while (arr.length && typeof v === 'object' && v !== null) {
    const k = arr.shift()!;
    if (arr.length === 0) {
      if (!Array.isArray(v)) {
        delete v[k];
      } else if (/^\d+$/.test(k)) {
        v.splice(Number(k), 1);
      }
    } else {
      v = v[k];
    }
  }
};

export const updateObject = (
  obj: Record<string, any>,
  newObj: Record<string, any>
) => {
  const oldKeys = Object.keys(obj);
  const newKeys = Object.keys(newObj);
  const delKeys = oldKeys.filter((k) => !newKeys.includes(k));
  delKeys.forEach((k) => {
    delete obj[k];
  });
  newKeys.forEach((k) => {
    obj[k] = newObj[k];
  });
};

export const recursiveUpdateObject = (
  obj: Record<string, any>,
  newObj: Record<string, any>,
  deleteOldKeys = true
) => {
  const oldKeys = Object.keys(obj);
  const newKeys = Object.keys(newObj);
  const delKeys = oldKeys.filter((k) => !newKeys.includes(k));
  if (deleteOldKeys) {
    delKeys.forEach((k) => {
      delete obj[k];
    });
  }
  newKeys.forEach((k) => {
    if (
      typeof obj[k] === 'object' &&
      !Array.isArray(obj[k]) &&
      obj[k] !== null &&
      typeof newObj[k] === 'object' &&
      !Array.isArray(newObj[k]) &&
      newObj[k] !== null
    ) {
      recursiveUpdateObject(obj[k], newObj[k], deleteOldKeys);
    } else {
      obj[k] = newObj[k];
    }
  });
};

type OnCancel = (cancel: () => void) => void;
export const makeCancellablePromise = <T = any>(
  fn: (onCancel: OnCancel) => Promise<T>
) => {
  const cancelList: (() => void)[] = [];
  let resolve: ((v: any) => void) | null = null;

  const promise = fn((cancel) => {
    cancelList.push(cancel);
  });

  const resPromise: CancellablePromise<T> = new Promise((r, j) => {
    resolve = r;
    promise.then(r, j);
  });
  // do cancel
  resPromise.cancel = () => {
    resolve?.('');
    cancelList.forEach((cancel) => cancel());
  };

  return resPromise;
};

export const AllPropType = [String, Number, Boolean, Symbol, Array, Object];

export const noop = (...args: any[]) => {
  args;
};
