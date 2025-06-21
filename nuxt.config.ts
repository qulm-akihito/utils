// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@tresjs/nuxt', '@nuxt/devtools'],
  tres: {
    devtools: true,
  },
  css:[
      'element-plus/dist/index.css',
  ]
})
