import { Validator } from '../types';

// 整数
export const integer: Validator = (value: any) => {
  const msg = '{{name}} is not an integer';
  if (typeof value !== 'string' && typeof value !== 'number') return msg;
  return /(^[0-9]*$)|(^-[0-9]+$)/.test(`${value}`) ? '' : msg;
};
