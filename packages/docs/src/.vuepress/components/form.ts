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
    age: number;
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
  // default values
  defaultValues: {
    username: '',
  },
  // when to set touched status, 'BLUR' or 'FOCUS'
  touchType: 'BLUR'
});
