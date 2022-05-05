import type { SidebarConfig } from '@vuepress/theme-default';

export const zh: SidebarConfig = {
  '/guide/': [
    {
      text: 'Guide',
      children: ['/guide/index.md']
    }
  ],
  '/apis/': [
    {
      text: 'APIs',
      children: [
        '/apis/index.md',
      ]
    }
  ]
};
