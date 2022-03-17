import { Validator } from '../types';

export const decimal: Validator = ({ name, value }) => {
  const msg = `${name} must be decimal`;
  if (typeof value !== 'string' && typeof value !== 'number') return msg;
  return /^[-]?\d*(\.\d+)?$/.test(`${value}`) ? '' : msg;
};
