import { Validator } from '../types';

export const integer: Validator = ({ name, value }) => {
  const msg = `${name} is not an integer`;
  if (typeof value !== 'string' && typeof value !== 'number') return msg;
  return /(^[0-9]*$)|(^-[0-9]+$)/.test(`${value}`) ? '' : msg;
};
