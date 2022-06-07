import { DisposablePromise } from './types';

/**
 * @internal
 */
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

/**
 * @internal
 */
export const getKeyValue = (data: Record<string, any>, keyPath: string) => {
  const arr = keyPath.split('.');
  let v: any = data;
  while (arr.length && v) {
    const k = arr.shift()!;
    v = typeof v === 'object' && v !== null ? v[k] : undefined;
  }
  return v;
};

/**
 * @internal
 */
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

/**
 * @internal
 */
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

/**
 * 函数调用间隔控制
 * fn: 执行的函数
 * delay: 函数执行的最小间隔，单位毫秒
 * leading
 */
export const debounce = <FN extends (...args: any[]) => any>(
  fn: FN,
  delay: number,
  leading = false
) => {
  return (...args: Parameters<FN>) => {
    let timer;
    let last_exec = -Infinity;
    const exec = function () {
      last_exec = Date.now();
      fn(...args);
    };
    timer && clearTimeout(timer);
    if (leading) {
      Date.now() - last_exec >= delay && exec();
    } else {
      timer = setTimeout(exec, delay);
    }
  };
};

export const AllPropType = [String, Number, Boolean, Symbol, Array, Object];

export const noop = (...args: any[]) => {
  args;
};

type OnDispose = (dispose: () => void) => void;
export const makeDisposablePromise = <T = any>(
  fn: (onDispose: OnDispose) => Promise<T>
) => {
  let disposeList: (() => void)[] = [];

  const onDispose = (dispose: () => void) => {
    disposeList.push(dispose);
  };
  const promise = fn(onDispose);
  const res: DisposablePromise<T> = {
    promise: new Promise((resolve, reject) => {
      promise.then(
        (v) => {
          disposeList = [];
          resolve(v);
        },
        (e) => {
          disposeList = [];
          reject(e);
        }
      );
    }),
    dispose: () => {
      disposeList.forEach((dispose) => dispose());
      disposeList = [];
    }
  };

  return res;
};

export const debouncePromise = <
  FN extends (...args: any[]) => Promise<T> | DisposablePromise<T>,
  T
>(
  fn: FN,
  delay: number
) => {
  let disposeLast: (() => void) | null = null;
  let resPromise: Promise<T> | null = null;
  let waitPromises: Promise<T>[] = [];

  const call = async (...args: Parameters<FN>) => {
    // dispose last call, the last promise will be rejected
    disposeLast?.();

    // push cur call to wait list
    waitPromises.push(
      new Promise((resolve, reject) => {
        let cancelFn: (() => void) | null = null;
        const timer = setTimeout(() => {
          const res = fn(...args);
          if ('promise' in res) {
            res.promise.then(resolve, reject);
            cancelFn = () => {
              res.dispose?.();
            };
          } else {
            res.then(resolve, reject);
          }
        }, delay);
        disposeLast = () => {
          cancelFn?.();
          cancelFn = null;
          clearTimeout(timer);
          reject();
        };
      })
    );

    if (resPromise) return resPromise;

    resPromise = (async () => {
      while (waitPromises.length) {
        const p = waitPromises.shift()!;
        try {
          const res = await p;
          // the last item, use it as resolve
          if (!waitPromises.length) return res;
        } catch (e) {
          // the last item, use it as the reject
          if (!waitPromises.length) throw e;
        }
      }
    })() as Promise<T>;

    return resPromise.finally(() => {
      disposeLast = null;
      resPromise = null;
      waitPromises = [];
    });
  };

  return call;
};
