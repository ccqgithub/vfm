import { Validator } from '../types';

// 字母：a-z A-Z
export const alpha: Validator = (value: any) => {
  const msg = '{{name}} is not alphabetical';
  if (typeof value !== 'string') return msg;
  return /^[a-zA-Z]*$/.test(value) ? '' : msg;
};
