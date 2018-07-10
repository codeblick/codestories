const modifyHtml = (html) => {
  // Add amp-custom tag to added CSS
  html = html.replace(/<style data-vue-ssr/g, '<style amp-custom data-vue-ssr')
  // Remove every script tag from generated HTML
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  // Add AMP script before </head>
  const ampScript = '<script async src="https://cdn.ampproject.org/v0.js"></script>'
  html = html.replace('</head>', ampScript + '</head>')
  // Add AMP boilerplate
  const ampBoilerplate = `<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
    <noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>`
  html = html.replace('</head>', ampBoilerplate + '</head>')
  // Make it ⚡
  html = html.replace('<html', '<html ⚡')
  return html
}

module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'codeblick development blog',
    titleTemplate: '%s - codestories',
    meta: [
      {charset: 'utf-8'},
      {
        hid: 'description',
        name: 'description',
        content: 'This blog contains some work by the codeblick development team.'
      },
      {name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1'}
    ],
    link: [
      {rel: 'icon', type: 'image/png', href: '/favicon.png'}
    ],
    htmlAttrs: {
      lang: 'en'
    }
  },
  /*
  ** Customize the progress bar color
  */
  loading: false,
  /*
  ** Load CSS
  */
  css: [
    {src: '~/assets/scss/style.scss', lang: 'scss'}
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
  ** Modules
  */
  modules: [
    'nuxtent',
    'nuxt-netlify-cms'
  ],
  /*
  ** Plugins
  */
  plugins: [
    '~/plugins/codestories.js'
  ],
  /*
  ** Hooks
  */
  hooks: {
    'render:route': (url, page, {req, res}) => {
      if (url.startsWith('/amp/')) {
        page.html = modifyHtml(page.html)
      }
    },
    'generate:page': (page) => {
      page.html = modifyHtml(page.html)
    },
  },
  /*
  ** Render
  */
  render: {
    resourceHints: false
  }
}
