# 快速开始

> 在下面的例子中，你可以点击 `文件名` 来查看代码，点击 `运行结果` 来使用代码的结果。

## 安装

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

## 创建表单结构

<details open>
  <summary>详情:</summary>

  @[code ts](../../.vuepress/components/form.ts)

</details>

## 注册字段

<details open>
  <summary>详情:</summary>
  <ExampleBlock>
    <ExampleItem title="运行结果" active>
      <BaseForm />
    </ExampleItem>
    <ExampleItem title="<CreateForm>">

@[code ts](../../.vuepress/components/form.ts)

  </ExampleItem>
    <ExampleItem title="<BaseForm>">

@[code vue](../../.vuepress/components/BaseForm.vue)

  </ExampleItem>
    <ExampleItem title="<BaseInfo>">

  @[code vue](../../.vuepress/components/partial/BaseInfo.vue)

  </ExampleItem>
    <ExampleItem title="<AddressList>">

  @[code vue](../../.vuepress/components/partial/AddressList.vue)

  </ExampleItem>
    <ExampleItem title="<SchoolList>">

  @[code vue](../../.vuepress/components/partial/SchoolList.vue)

  </ExampleItem>
    <ExampleItem title="<SelectSchool>">

  @[code vue](../../.vuepress/components/partial/SelectSchool.vue)

  </ExampleItem>
  </ExampleBlock>
</details>


## 在子组件中使用form

1. 使用 `FormProvider` 或 `useProvideForm` 来向子组件注入form [Dependency Injection](https://vuejs.org/api/composition-api-dependency-injection.html).

2. 在子组件中使用 `useForm` 来获取form。

**提示:** 如果你使用 typescript, 你可以传递 `form getter` 给 `useForm` 来获取更好的类型提示。

```ts
// in vue
import { useForm } from 'vfm';
import { getForm } from '../form';

const form = useForm(getForm);
// or
const form = useForm();
```

