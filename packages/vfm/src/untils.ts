export const setKeyValue = (
  data: Record<string, any>,
  keyPath: string,
  value: any
) => {
  const arr = keyPath.split('.');
  let v: any = data;
  while (arr.length) {
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
  return arr.length === 0 ? v : undefined;
};

export const delKey = (data: Record<string, any>, keyPath: string) => {
  const arr = keyPath.split('.');
  let v: any = data;
  while (arr.length && typeof v === 'object' && v !== null) {
    const k = arr.shift()!;
    if (arr.length === 0) {
      delete v[k];
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
  newObj: Record<string, any>
) => {
  if (typeof obj !== 'object' || obj === null) return;
  if (typeof newObj !== 'object' || newObj === null) return;
  const oldKeys = Object.keys(obj);
  const newKeys = Object.keys(newObj);
  const delKeys = oldKeys.filter((k) => !newKeys.includes(k));
  delKeys.forEach((k) => {
    delete obj[k];
  });
  newKeys.forEach((k) => {
    if (
      typeof obj[k] === 'object' &&
      obj[k] !== null &&
      typeof newObj[k] === 'object' &&
      newObj[k] !== null
    ) {
      recursiveUpdateObject(obj[k], newObj[k]);
    } else {
      obj[k] = newObj[k];
    }
  });
};
