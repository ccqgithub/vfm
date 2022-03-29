import { defineConfig } from "vuepress/config";
import {
  Sidebar4EN,
  Sidebar4ZH,
  NavItems4EN,
  NavItems4ZH
} from './config/index'

export default defineConfig(ctx => ({
  base: ctx.isProd ? '/vfm/' : '/' as any,
  title: 'vfm',
  description: 'Mobx driven form management tool.',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'vfm',
      description: 'Mobx driven form management tool.'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'vfm',
      description: 'Mobx 驱动的表单管理工具'
    }
  },
  themeConfig: {
    repo: 'ccqgithub/vfm',
    editLinks: true,
    docsDir: 'packages/docs/docs',
    // #697 Provided by the official algolia team.
    algolia: ctx.isProd
      ? {
        appId: '9VJEAY5FMM',
        indexName: 'vfm',
        apiKey: 'd33934e356eba49983bfc14b7d7769cb'
      }
      : null,
    smoothScroll: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last Updated',
        nav: NavItems4EN,
        sidebar: Sidebar4EN
      },
      '/zh/': {
        label: '简体中文',
        selectText: '选择语言',
        ariaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: NavItems4ZH,
        sidebar: Sidebar4ZH
      }
    }
  },
  plugins: [
    ['@vuepress/back-to-top', true],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    ['@vuepress/medium-zoom', true],
    [
      'vuepress-plugin-container',
      {
        type: 'vue',
        before: '<pre class="vue-container"><code>',
        after: '</code></pre>'
      }
    ],
    [
      'vuepress-plugin-container',
      {
        type: 'upgrade',
        before: info => `<UpgradePath title="${info}">`,
        after: '</UpgradePath>'
      }
    ],
    ['vuepress-plugin-flowchart']
  ],
  extraWatchFiles: ['.vuepress/config/**'],
  evergreen: !ctx.isProd
}));