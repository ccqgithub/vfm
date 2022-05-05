import { Validator } from '../types';

// 小数
export const decimal: Validator = (value: any) => {
  const msg = '{{name}} must be decimal';
  if (typeof value !== 'string' && typeof value !== 'number') return msg;
  return /^[-]?\d*(\.\d+)?$/.test(`${value}`) ? '' : msg;
};
