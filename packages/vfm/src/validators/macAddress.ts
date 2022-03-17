import { Validator } from '../types';

export const macAddress: Validator = ({ name, value }) => {
  const msg = `${name} is not a valid MAC Address`;
  if (typeof value !== 'string') return msg;
  const separator = ':';
  const parts = value.split(separator);

  return (parts.length === 6 || parts.length === 8) && parts.every(hexValid)
    ? ''
    : msg;
};

const hexValid = (hex: string) => hex.toLowerCase().match(/^[0-9a-f]{2}$/);
