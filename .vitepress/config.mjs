import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils/auto_sidebar.mjs'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:"/-PhysicsGravity_Blog/",
  head: [["link", { rel: "icon", href: "/-PhysicsGravity_Blog/images/logo.png" }]],
  title: "物研引力",
  description: "物研引力 - 技术教学博客网站",
  themeConfig: {
    logo: "/-PhysicsGravity_Blog/images/logo.png",
    outlineTitle: "目录",
    outline: [2, 6],
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '入门指南', link: '/getting-started/' },
      { text: '单片机教程', link: '/microcontroller/' },
      { text: '3D建模', link: '/3d-modeling/' },
      { text: '进阶项目', link: '/advanced-projects/' },
      { text: '资源下载', link: '/resources/' }
    ],

    sidebar: {
      '/getting-started/': [
        {
          text: '入门指南',
          items: [
            { text: '快速开始', link: '/getting-started/' },
            { text: '开发环境搭建', link: '/getting-started/environment-setup' }
          ]
        }
      ],
      '/microcontroller/': [
        {
          text: '单片机教程',
          items: [
            { text: '教程概览', link: '/microcontroller/' },
            { text: 'Arduino基础入门', link: '/microcontroller/arduino-basics' }
          ]
        }
      ],
      '/3d-modeling/': [
        {
          text: '3D建模教程',
          items: [
            { text: '教程概览', link: '/3d-modeling/' },
            { text: 'Blender基础入门', link: '/3d-modeling/blender-basics' }
          ]
        }
      ],
      '/advanced-projects/': [
        {
          text: '进阶项目',
          items: [
            { text: '项目推荐', link: '/advanced-projects/' }
          ]
        }
      ],
      '/resources/': [
        {
          text: '资源下载',
          items: [
            { text: '资源概览', link: '/resources/' }
          ]
        }
      ]
    },
    aside: "left",

    socialLinks: [
      { icon: 'github', link: 'https://github.com/hwxz?tab=repositories' }
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
