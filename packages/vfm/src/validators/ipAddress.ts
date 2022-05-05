import { Validator } from '../types';

// ip 地址
export const ipAddress: Validator = (value: any) => {
  const msg = '{{name}} is not a valid IP address';
  if (typeof value !== 'string') return msg;
  const nibbles = value.split('.');
  return nibbles.length === 4 && nibbles.every(nibbleValid) ? '' : msg;
};

const nibbleValid = (nibble: string) => {
  if (nibble.length > 3 || nibble.length === 0) {
    return false;
  }

  if (nibble[0] === '0' && nibble !== '0') {
    return false;
  }

  if (!nibble.match(/^\d+$/)) {
    return false;
  }

  const numeric = +nibble;
  return numeric >= 0 && numeric <= 255;
};
