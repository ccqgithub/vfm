/* eslint-disable import/no-unresolved */
import { createApp, toRaw } from 'vue';
import { Form } from 'vfm';

const form = new Form({
  defaultValues: {
    username: 'season',
    password: '',
    confirmPassword: ''
  }
});
form.mount();
form.registerField('username', {
  validateFn: (v) => {
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
  validateFn: (v) => {
    if (!v || !v.trim()) return { message: 'password required.' };
    return null;
  }
});
form.registerField('confirmPassword', {
  validateFn: (v, form) => {
    if (!v || !v.trim()) return { message: 'confirmPassword required.' };
    const password = form.values.password || '';
    if (password.trim() && password !== v.trim()) {
      return { message: 'confirmPassword not same with password.' };
    }
    return null;
  }
});

export default form;
