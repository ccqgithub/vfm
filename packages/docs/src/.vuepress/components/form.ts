import { createForm, NestedValue } from 'vfm';

// create form sturcture
export const form = createForm<{
  // base fields
  username: string;
  password: string;
  passwordConfirm: string;
  // nested fields
  baseInfo: {
    birthDay: string;
    age: string;
  },
  // nested array fields
  address: {
    phone: string;
    detail: string;
  }[],
  // nested value
  // the NestedValue<xxx> will be treat as the `scholl.value` type, not nested fields
  schools: NestedValue<{
    name: string;
    address: string;
  }[]>;
}>({
  initValues: {
    username: '',
    password: '',
    passwordConfirm: '',
    baseInfo: {
      birthDay: '',
      age: ''
    },
    address: [],
    schools: []
  },
  // when to set touched status, 'BLUR' or 'FOCUS'
  touchType: 'BLUR',
  readonly: process.env.NODE_ENV === 'development'
});
