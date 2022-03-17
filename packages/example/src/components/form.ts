/* eslint-disable import/no-unresolved */
import { Form } from 'vfm';

const form = new Form<
  {
    username: string;
    test: number;
    password: string;
    confirmPassword: string;
  },
  'hasNameOrPassword'
>({
  defaultValues: {
    username: 'season',
    test: 1,
    password: '',
    confirmPassword: ''
  }
});
form.mount();
form.registerField('username', {
  validate: (v) => {
    if (!v || !v.trim()) return { message: 'username required.' };
    return new Promise((resolve) => {
      setTimeout(() => {
        if (v !== 'test')
          return resolve({ message: 'username is not correct.' });
        return resolve(null);
      }, 2000);
    });
  }
});
form.registerField('password', {
  validate: (v) => {
    if (!v || !v.trim()) return { message: 'password required.' };
    return null;
  }
});
form.registerField('confirmPassword', {
  validate: (v, form) => {
    if (!v || !v.trim()) return { message: 'confirmPassword required.' };
    const password = form.values.password || '';
    if (password.trim() && password !== v.trim()) {
      return { message: 'confirmPassword not same with password.' };
    }
    return null;
  }
});
form.registerVirtualField('hasNameOrPassword', {
  validate: (form) => {
    const valid =
      form.values.username ||
      form.values.password ||
      form.values.confirmPassword;
    return valid ? null : { message: 'no any username or password' };
  }
});

export default form;
