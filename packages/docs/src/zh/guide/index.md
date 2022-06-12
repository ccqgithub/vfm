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


## Form Provider

你可以使用 `FormProvider` 来为子组件提供`form`实例，内部使用Vue的 [依赖注入](https://vuejs.org/api/composition-api-dependency-injection.html).

这样，你就不用给每个组件传递`form`属性，不过缺点是类型提示没有传递`form`友好。

<details open>
  <summary>详情:</summary>
  <ExampleBlock>
    <ExampleItem title="运行结果" active>
      <ProviderForm />
    </ExampleItem>
    <ExampleItem title="<ProviderForm>">

  @[code vue](../.vuepress/components/ProviderForm.vue)

  </ExampleItem>
  </ExampleBlock>
</details>

