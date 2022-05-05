import { Validator } from '../types';

// 字母数字：a-z A-Z 0-9
export const alphaNum: Validator = (value: any) => {
  const msg = '{{name}} must be alpha-numeric';
  if (typeof value !== 'string' && typeof value !== 'number') return msg;
  return /^[a-zA-Z0-9]*$/.test(`${value}`) ? '' : msg;
};
