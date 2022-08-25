import { defineUserConfig } from '@vuepress/cli';
// import { shikiPlugin } from '@vuepress/plugin-shiki'
import { viteBundler } from '@vuepress/bundler-vite';
import { docsearchPlugin } from '@vuepress/plugin-docsearch';
// import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics';
import { defaultTheme } from '@vuepress/theme-default';
import { path } from '@vuepress/utils';
import { registerComponentsPlugin } from '@vuepress/plugin-register-components';
import { navbar, sidebar } from './configs';

const isProd = process.env.NODE_ENV === 'production';

export default defineUserConfig({
  base: isProd ? '/packages/docs/src/.vuepress/dist/' : '/',
  title: 'VFM',
  description: 'Form Validation for Vue3.',
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VFM',
      description: 'Form Validation for Vue3.'
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'VFM',
      description: 'Vue 驱动的表单管理和校验工具'
    }
  },
  bundler: viteBundler(),
  theme: defaultTheme({
    repo: 'ccqgithub/vfm',
    docsDir: 'packages/docs',
    locales: {
      '/': {
        editLinkText: 'Edit this page on GitHub',
        lastUpdatedText: 'Last Updated',
        navbar: navbar.en,
        sidebar: sidebar.en
      },
      '/zh/': {
        selectLanguageAriaLabel: '选择语言',
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        navbar: navbar.zh,
        sidebar: sidebar.zh
      }
    }
  }),
  plugins: [
    docsearchPlugin({
      appId: 'P1GNO5QNUJ',
      apiKey: 'ec9cc2de2123827b0d7566f93dc9a522',
      indexName: 'mobx-fm',
      locales: {
        '/zh/': {
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
              buttonAriaLabel: '搜索文档',
            },
            modal: {
              searchBox: {
                resetButtonTitle: '清除查询条件',
                resetButtonAriaLabel: '清除查询条件',
                cancelButtonText: '取消',
                cancelButtonAriaLabel: '取消',
              },
              startScreen: {
                recentSearchesTitle: '搜索历史',
                noRecentSearchesText: '没有搜索历史',
                saveRecentSearchButtonTitle: '保存至搜索历史',
                removeRecentSearchButtonTitle: '从搜索历史中移除',
                favoriteSearchesTitle: '收藏',
                removeFavoriteSearchButtonTitle: '从收藏中移除',
              },
              errorScreen: {
                titleText: '无法获取结果',
                helpText: '你可能需要检查你的网络连接',
              },
              footer: {
                selectText: '选择',
                navigateText: '切换',
                closeText: '关闭',
                searchByText: '搜索提供者',
              },
              noResultsScreen: {
                noResultsText: '无法找到相关结果',
                suggestedQueryText: '你可以尝试查询',
                reportMissingResultsText: '你认为该查询应该有结果？',
                reportMissingResultsLinkText: '点击反馈',
              },
            },
          },
        },
      },
    }),
    // googleAnalyticsPlugin({
    //   // we have multiple deployments, which would use different id
    //   id: process.env.DOCS_GA_ID ?? '',
    // }),
    registerComponentsPlugin({
      components: {
        ExampleBlock: path.resolve(__dirname, './components/ExampleBlock.vue'),
        ExampleItem: path.resolve(__dirname, './components/ExampleItem.vue'),
        BaseForm: path.resolve(__dirname, './components/BaseForm.vue'),
        ProviderForm: path.resolve(__dirname, './components/ProviderForm.vue'),
      }
    })
  ],
});
