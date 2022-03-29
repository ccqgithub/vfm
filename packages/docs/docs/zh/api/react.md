# API: vfm-react

## FormPrivider

```tsx
<FormPrivider form={form}>
  {...children}
</FormPrivider>
```

## Field

```tsx
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
```

## VirtualField

```tsx
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
```

## useField

```ts
useField({
  form?: FormClass<T>;
  name: N;
  rules?: FieldRule<KeyPathValue<T, N>, FormState<T>>[];
  value?: KeyPathValue<T, N>;
  defaultValue?: KeyPathValue<T, N>;
}) => [UseFieldReturn<T, N>, FieldState<KeyPathValue<T, N>> | undefined];
```

## useVirtualField