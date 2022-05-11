# Getting Started

> You can click `Result` to show the real result of the code.

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

## Create Sorm Structure

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

::: slot footer
MIT Licensed | Copyright © 2022-present [Season Chen](https://github.com/ccqgithub)
:::

