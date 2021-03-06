import { Validator } from '../types';

// 数字，整数或者小数
export const numeric: Validator = (value: any) => {
  const msg = '{{name}} must be numeric';
  if (typeof value !== 'string' && typeof value !== 'number') return msg;
  return /^-?\d*(\.\d+)?$/.test(`${value}`) ? '' : msg;
};
