import { Validator } from '../types';

export const alphaNum: Validator = ({ name, value }) => {
  const msg = `${name} must be alpha-numeric`;
  if (typeof value !== 'string' && typeof value !== 'number') return msg;
  return /^[a-zA-Z0-9]*$/.test(`${value}`) ? '' : msg;
};
