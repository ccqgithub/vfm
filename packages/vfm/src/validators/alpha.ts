import { Validator } from '../types';

export const alpha: Validator = (value: any) => {
  const msg = '{{name}} is not alphabetical';
  if (typeof value !== 'string') return msg;
  return /^[a-zA-Z]*$/.test(value) ? '' : msg;
};
