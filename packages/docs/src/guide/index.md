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

@[code ts](../.vuepress/components/form.ts)

## Munual Register Fields

<ExampleBlock>
  <ExampleItem title="createForm">

@[code ts](../.vuepress/components/form.ts)

  </ExampleItem>
  <ExampleItem title="BaseInfo">

@[code vue](../.vuepress/components/js/JSBaseInfo.vue)

  </ExampleItem>
  <ExampleItem title="Form" active>

@[code vue](../.vuepress/components/BaseForm.vue)

  </ExampleItem>
  <ExampleItem title="Result">

<BaseForm />

  </ExampleItem>
</ExampleBlock>