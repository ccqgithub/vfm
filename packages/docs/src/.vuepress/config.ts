import { defineUserConfig } from '@vuepress/cli';
// import { shikiPlugin } from '@vuepress/plugin-shiki'
import { viteBundler } from '@vuepress/bundler-vite';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { defaultTheme } from '@vuepress/theme-default';
import { path } from '@vuepress/utils';
import { registerComponentsPlugin } from '../../plugins/plugin-register-components';
import { navbar, sidebar } from './configs';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig({
  base: isProd ? '/vfm/' : '/',
  title: 'VFM',
  description: 'Mobx driven form management tool.',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VFM',
      description: 'Mobx driven form management tool.'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'Lu Ban UI',
      description: 'Mobx 驱动的表单管理工具'
    }
  },
  bundler: viteBundler(),
  theme: defaultTheme({
    repo: 'ccqgithub/vfm',
    editLinks: true,
    docsDir: 'packages/docs',
    // #697 Provided by the official algolia team.
    // algolia: isProd
    //   ? {
    //       appId: '9VJEAY5FMM',
    //       indexName: 'vfm',
    //       apiKey: 'd33934e356eba49983bfc14b7d7769cb'
    //     }
    //   : null,
    smoothScroll: true,
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        ariaLabel: 'Select language',
        editLinkText: 'Edit this page on GitHub',
        lastUpdatedText: 'Last Updated',
        navbar: navbar.en,
        sidebar: sidebar.en
      },
      '/zh/': {
        label: '简体中文',
        selectLanguageName: '简体中文',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        navbar: navbar.en,
        sidebar: navbar.zh
      }
    }
  }),
  plugins: [
    // docsearchPlugin({
    //   appId: '34YFD9IUQ2',
    //   apiKey: '9a9058b8655746634e01071411c366b8',
    //   indexName: 'vuepress',
    //   searchParameters: {
    //     facetFilters: ['tags:v2'],
    //   },
    //   locales: {
    //     '/zh/': {
    //       placeholder: '搜索文档',
    //       translations: {
    //         button: {
    //           buttonText: '搜索文档',
    //           buttonAriaLabel: '搜索文档',
    //         },
    //         modal: {
    //           searchBox: {
    //             resetButtonTitle: '清除查询条件',
    //             resetButtonAriaLabel: '清除查询条件',
    //             cancelButtonText: '取消',
    //             cancelButtonAriaLabel: '取消',
    //           },
    //           startScreen: {
    //             recentSearchesTitle: '搜索历史',
    //             noRecentSearchesText: '没有搜索历史',
    //             saveRecentSearchButtonTitle: '保存至搜索历史',
    //             removeRecentSearchButtonTitle: '从搜索历史中移除',
    //             favoriteSearchesTitle: '收藏',
    //             removeFavoriteSearchButtonTitle: '从收藏中移除',
    //           },
    //           errorScreen: {
    //             titleText: '无法获取结果',
    //             helpText: '你可能需要检查你的网络连接',
    //           },
    //           footer: {
    //             selectText: '选择',
    //             navigateText: '切换',
    //             closeText: '关闭',
    //             searchByText: '搜索提供者',
    //           },
    //           noResultsScreen: {
    //             noResultsText: '无法找到相关结果',
    //             suggestedQueryText: '你可以尝试查询',
    //             reportMissingResultsText: '你认为该查询应该有结果？',
    //             reportMissingResultsLinkText: '点击反馈',
    //           },
    //         },
    //       },
    //     },
    //   },
    // }),
    // googleAnalyticsPlugin({
    //   // we have multiple deployments, which would use different id
    //   id: process.env.DOCS_GA_ID ?? '',
    // }),
    registerComponentsPlugin({
      components: {
        ExampleBlock: path.resolve(__dirname, './components/ExampleBlock.vue'),
        ExampleItem: path.resolve(__dirname, './components/ExampleItem.vue'),
        BaseForm: path.resolve(__dirname, './components/BaseForm.vue')
      }
    })
  ],
});
