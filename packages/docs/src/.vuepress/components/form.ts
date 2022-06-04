import { createForm, NestedValue } from 'vfm';

// define form sturcture
// 定义 form 的结构
export const form = createForm<
// 表单结构
{
  // base fields
  // 基础字段
  username: string;
  password: string;
  passwordConfirm: string;
  // nested fields
  // 嵌套字段
  baseInfo: {
    birthDay: string;
    age: string;
  },
  // array fields
  // 数组字段
  tags: string[],
  // nested array fields
  // 嵌套的数组字段
  address: {
    phone: string;
    detail: string;
  }[],
  // object value
  // object类型的值
  // the NestedValue<xxx> will be treat as the `value` type of field `schools`, not nested fields
  // NestedValue<xxx> 被当做字段`schools`的值，而不是嵌套的字段
  schools: NestedValue<{
    name: string;
    address: string;
  }[]>;
},
// 虚拟字段
'tags'
>({
  // required, form init values
  // 必须，表达初始值
  initValues: {
    username: '',
    password: '',
    passwordConfirm: '',
    baseInfo: {
      birthDay: '',
      age: ''
    },
    tags: [],
    address: [],
    schools: []
  },

  // form default values, used for reset fields, and determine whether fields are dirty. If not pass, same with `initValues`.
  // 表达默认值, 用来重置字段，和确定字段是否是dirty的。如果不传，默认和`initValues`相同。
  // defaultValues:

  // when to set touched status, 'BLUR' or 'FOCUS', default is 'BLUR'.
  // 什么时候标志一个字段为`touched`，可选值为'BLUR' 和 'FOCUS'，默认是'BLUR'。
  touchType: 'BLUR',

  // if true, the form.state is readonly, avoid to manual edit it.
  // 如果为true，form.state 将会是只读，避免手动地编辑它
  readonly: process.env.NODE_ENV === 'development'
});
