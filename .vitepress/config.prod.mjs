import { defineConfig } from 'vitepress'
import { set_sidebar } from './utils/auto_sidebar.mjs'

export default defineConfig({
  base: "/-PhysicsGravity_Blog/",
  head: [["link", { rel: "icon", href: "/-PhysicsGravity_Blog/logo.png" }]],
  title: "物研引力",
  description: "物研引力 - 技术教学博客网站",
  themeConfig: {
    logo: "/-PhysicsGravity_Blog/logo.png",
    outlineTitle: "目录",
    outline: [2, 6],
    nav: [
      { text: '首页', link: '/-PhysicsGravity_Blog/' },
      { text: '入门指南', link: '/-PhysicsGravity_Blog/getting-started/' },
      { 
        text: 'ESP32S3 开发', 
        items: [
          { text: '教程概览', link: '/-PhysicsGravity_Blog/esp32s3/' },
          { text: '初级教程', link: '/-PhysicsGravity_Blog/esp32s3/beginner/' },
          { text: '中级教程', link: '/-PhysicsGravity_Blog/esp32s3/intermediate/' },
          { text: '高级教程', link: '/-PhysicsGravity_Blog/esp32s3/advanced/' }
        ]
      },
      { 
        text: 'SolidWorks', 
        items: [
          { text: '教程概览', link: '/-PhysicsGravity_Blog/solidworks/' },
          { text: '初级教程', link: '/-PhysicsGravity_Blog/solidworks/beginner/' },
          { text: '中级教程', link: '/-PhysicsGravity_Blog/solidworks/intermediate/' },
          { text: '高级教程', link: '/-PhysicsGravity_Blog/solidworks/advanced/' }
        ]
      },
      { text: '进阶项目', link: '/-PhysicsGravity_Blog/advanced-projects/' },
      { text: '资源下载', link: '/-PhysicsGravity_Blog/resources/' }
    ],
    sidebar: {
      '/-PhysicsGravity_Blog/getting-started/': set_sidebar('getting-started'),
      '/-PhysicsGravity_Blog/esp32s3/': set_sidebar('esp32s3'),
      '/-PhysicsGravity_Blog/esp32s3/beginner/': set_sidebar('esp32s3/beginner'),
      '/-PhysicsGravity_Blog/esp32s3/intermediate/': set_sidebar('esp32s3/intermediate'),
      '/-PhysicsGravity_Blog/esp32s3/advanced/': set_sidebar('esp32s3/advanced'),
      '/-PhysicsGravity_Blog/solidworks/': set_sidebar('solidworks'),
      '/-PhysicsGravity_Blog/solidworks/beginner/': set_sidebar('solidworks/beginner'),
      '/-PhysicsGravity_Blog/solidworks/intermediate/': set_sidebar('solidworks/intermediate'),
      '/-PhysicsGravity_Blog/solidworks/advanced/': set_sidebar('solidworks/advanced'),
      '/-PhysicsGravity_Blog/advanced-projects/': set_sidebar('advanced-projects'),
      '/-PhysicsGravity_Blog/resources/': set_sidebar('resources')
    },
    aside: "left",
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hwxz' }
    ],
    footer: {
      copyright: "Copyright © 2026 物研引力. All Rights Reserved.",
    },
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