import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils/auto_sidebar.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/-PhysicsGravity_Blog/",
  head: [["link", { rel: "icon", href: "/logo.png" }]],
  title: "物研引力",
  description: "物研引力 - 技术教学博客网站",
  themeConfig: {
    logo: "/logo.png",
    outlineTitle: "目录",
    outline: [2, 6],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '入门指南', link: '/getting-started/' },
      { 
        text: 'ESP32S3 开发', 
        items: [
          { text: '教程概览', link: '/esp32s3/' },
          { text: '初级教程', link: '/esp32s3/beginner/' },
          { text: '中级教程', link: '/esp32s3/intermediate/' },
          { text: '高级教程', link: '/esp32s3/advanced/' }
        ]
      },
      { 
        text: 'SolidWorks', 
        items: [
          { text: '教程概览', link: '/solidworks/' },
          { text: '初级教程', link: '/solidworks/beginner/' },
          { text: '中级教程', link: '/solidworks/intermediate/' },
          { text: '高级教程', link: '/solidworks/advanced/' }
        ]
      },
      { text: '进阶项目', link: '/advanced-projects/' },
      { text: '资源下载', link: '/resources/' }
    ],

    sidebar: {
      '/getting-started/': set_sidebar('getting-started'),
      '/esp32s3/': set_sidebar('esp32s3'),
      '/esp32s3/beginner/': set_sidebar('esp32s3/beginner'),
      '/esp32s3/intermediate/': set_sidebar('esp32s3/intermediate'),
      '/esp32s3/advanced/': set_sidebar('esp32s3/advanced'),
      '/solidworks/': set_sidebar('solidworks'),
      '/solidworks/beginner/': set_sidebar('solidworks/beginner'),
      '/solidworks/intermediate/': set_sidebar('solidworks/intermediate'),
      '/solidworks/advanced/': set_sidebar('solidworks/advanced'),
      '/advanced-projects/': set_sidebar('advanced-projects'),
      '/resources/': set_sidebar('resources')
    },
    aside: "left",

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hwxz' }
    ],

    footer: {
      copyright: "Copyright © 2026 物研引力. All Rights Reserved.",
    },

    // 设置搜索框的样式
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "搜索文档",
            buttonAriaLabel: "搜索文档",
          },
          modal: {
            noResultsText: "无法找到相关结果",
            resetButtonTitle: "清除查询条件",
            footer: {
              selectText: "选择",
              navigateText: "切换",
            },
          },
        },
      },
    },
  }
})
