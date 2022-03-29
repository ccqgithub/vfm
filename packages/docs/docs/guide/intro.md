# Introduction

Mobx driven form management and validation tool.

## Why?

There is a quite excellent form management and validation tools like [react-hooks-form](https://github.com/react-hook-form/react-hook-form) or [formik](https://github.com/jaredpalmer/formik), why should I create a new project?

- Can't use form validations outside of `hooks` and `components`. For examples, I wan't to make form validations in a `service`, witch be used by many components.
- They all use `context level` updates, can not make `field level` or `component level` updates.

For these reasons, this tool used [mobx](https://github.com/mobxjs/mobx)'s reactivity capability to create form, so we can create and pass form outside of `hooks` and `components`, and keep the reactivity of form states.

## Packages

- `mobx-fm`: The form management core, use with [mobx](https://github.com/mobxjs/mobx) stand-alone.
- `mobx-fm-react`: Use `mobx-fm` with react.

## Features

- **🍦 Easy To Use**: Simple way to create forms and use validations, few APIs and less configurations.
- **🍡 Reactivity**: Driven by mobx, inherit the reactivity capability of it, field level update.
- **🍲 Flexible**: Can use component or hooks with react by `mobx-fm-react`, also can be used with mobx stand-alone.
- **🍰 Virtual Fields**: Can register virtual validations with form states, not limited to the real fields that have value.
- **🍚 Custom UI**: Not bound to any UI libraries, can use with any UI libraries.
- **🍭 Fully Typed**: Flexible programmatic APIs with full TypeScript typing.
