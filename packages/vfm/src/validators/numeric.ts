import { Validator } from '../types';

export const numeric: Validator = ({ name, value }) => {
  const msg = `${name} must be numeric`;
  if (typeof value !== 'string' && typeof value !== 'number') return msg;
  return /^\d*(\.\d+)?$/.test(`${value}`) ? '' : msg;
};
