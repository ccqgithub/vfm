# Getting Started

## Needs

- [Mobx6+](https://github.com/mobxjs/mobx).
- [React16.8+](https://github.com/facebook/react/), only when use `vfm-react`.

## Install

```sh
# Only use `vfm`.
npm install mobx vfm
# Use with `react`, you need install `vfm-react`.
npm install mobx vfm vfm-reaact
```

## Create Form

Types:

```ts
export const createForm = <FormType, VirtualFields>(args: {
  defaultValues?: FieldValues<FormType>;
}) => {
  return new FormClass<FormType, VirtualFields>(args);
};

```

- `FormType`: The form value structure, all objects will be treated as `field collection`. If you want to use some object as `object value`, you need use type `NestedValue` to declare.

  ```ts
  type FormType = {
    username: string;
    // the friend is field collection, not a field, the field is `friend.username`
    friend: {
      username: string;
    };
    // the field is `info`, it's value is `{ message }`
    info: NestedValue({
      message: string;
    });
  }
  ```
- `VirtualFields`: The virtual field's name type, for suggestion.

  ```ts
  type VirtualFields = 'hasUsernaeOrPassword' | 'other';
  ```

**Code example**:

```ts
import { createForm } from 'vfm';

const form = createForm<
  {
    username: string;
    test: number;
    password: string;
    confirmPassword: string;
  },
  // virtual fields
  'hasNameOrPassword'
>({
  defaultValues: {
    username: 'season',
    test: 1,
    password: '',
    confirmPassword: ''
  }
});

export default form;
```

## Form mount and unmount

- `form.mount`: mount form, init state wachers.
- `form.unmount`: unmount form, remove state watchers.

After call `form.mount`, the form will watch all field's state and merge to form state. Before that, the form state values will be empty object.

If use with react, you can use hooks to management the mount status.

```tsx
useEffect(() => {
  form.mount();
  return () => {
    form.unmount();
  }
}, [form]);
```

## Register Fields

```ts
form.registerField('confirmPassword', {
  rules: [
    {
      required: true
    },
    {
      validator: (v, form) => {
        if (!v || !v.trim()) return 'confirmPassword required.';
        const password = form.values.password || '';
        if (password.trim() && password !== v.trim()) {
          return 'confirmPassword not same with password.';
        }
        return '';
      }
    }
  ]
});
```

## Register Virtual Fields

```ts
form.registerVirtualField('hasNameOrPassword', {
  rules: [
    {
      validator: (form) => {
        const valid =
          form.values.username ||
          form.values.password ||
          form.values.confirmPassword;
        return valid ? '' : 'no any username or password';
      }
    }
  ]
});
```

## Watch status

```ts
import { autorun } from 'mobx';
import form from './form';

autorun(() => {
  const formState = form.state;
  const fieldStates = form.fieldStates;
  console.log(formState.values.username);
  console.log(formState.errors.username);
  console.log(formState.virtualErrors.hasNameOrPassword);
  console.log(fieldStates.username?.isValidating);
});
```

## Use With React

```tsx
import { observer } form 'mobx-react-lite';
import { Field, VirtualField } from 'vfm-react';
import form from '/form';

export const Form = observer(() => {
  const formState = form.state;
  const fieldStates = form.fieldStates;
  const submit = useCallback(() => {
    form.submit(
      (d) => {
        console.log('suc', d);
      },
      (err) => {
        console.log('err', err);
      }
    );
  }, []);

  return (
    <>
      <Field
        form={form}
        name="username"
        value="3"
        rules={[
          {
            validators: [
              (v) => {
                if (!v || !v.trim()) return 'username required.';
                return new Promise((resolve) => {
                  setTimeout(() => {
                    if (v !== 'test')
                      return resolve('username is not correct.');
                    return resolve('');
                  }, 2000);
                });
              }
            ]
          }
        ]}
      >
        {(field) => <input type="text" {...field} />}
      </Field>
      <div className="loading">
        {fieldStates.username?.isValidating ? 'loading...' : ''}
      </div>
      <div className="error">{formState.errors?.username?.message}</div>

      <VirtualField
        form={form}
        name="hasNameOrPassword"
        rules={[
          {
            validators: [
              (form) => {
                const valid =
                  form.values.username ||
                  form.values.password ||
                  form.values.confirmPassword;
                return valid ? '' : 'no any username or password';
              }
            ]
          }
        ]}
      />
      <div className="error">
        {formState.virtualErrors.hasNameOrPassword?.message}
      </div>
    </>
  );
});
```