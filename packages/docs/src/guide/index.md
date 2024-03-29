# Getting Started

> In the examples below, you can click `<File Name>` to view real code, and click `Result` to show the result of the code.

## Install

<CodeGroup>
  <CodeGroupItem title="NPM">

```
npm install vfm
```

  </CodeGroupItem>
  <CodeGroupItem title="YARN">

```
yarn add vfm
```

  </CodeGroupItem>
</CodeGroup>

## Create Form Getter

> A `Form Getter` is a function that return the form.

<details open>
  <summary>Details:</summary>

  @[code ts](../.vuepress/components/form.ts)

</details>

## Register Fields

<details open>
  <summary>Details:</summary>
  <ExampleBlock>
    <ExampleItem title="Result" active>
      <BaseForm />
    </ExampleItem>
    <ExampleItem title="<CreateForm>">

@[code ts](../.vuepress/components/form.ts)

  </ExampleItem>
    <ExampleItem title="<BaseForm>">

@[code vue](../.vuepress/components/BaseForm.vue)

  </ExampleItem>
    <ExampleItem title="<BaseInfo>">

  @[code vue](../.vuepress/components/partial/BaseInfo.vue)

  </ExampleItem>
    <ExampleItem title="<AddressList>">

  @[code vue](../.vuepress/components/partial/AddressList.vue)

  </ExampleItem>
    <ExampleItem title="<SchoolList>">

  @[code vue](../.vuepress/components/partial/SchoolList.vue)

  </ExampleItem>
    <ExampleItem title="<SelectSchool>">

  @[code vue](../.vuepress/components/partial/SelectSchool.vue)

  </ExampleItem>
  </ExampleBlock>
</details>

## Use form in child components

1. Use `FormProvider` or `useProvideForm` to provide form to children by [Dependency Injection](https://vuejs.org/api/composition-api-dependency-injection.html).

2. Use `useForm` in child components to get the form.

**Tips:** If you use typescript, you can pass `form getter` to `useForm` for get more type intellisense.

```ts
// in vue
import { useForm } from 'vfm';
import { getForm } from '../form';

const form = useForm(getForm);
// or
const form = useForm();
```
