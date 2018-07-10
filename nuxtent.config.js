module.exports = {
  content: [
    ['posts', {
      page: '_post',
      permalink: ':slug',
      isPost: false,
      generate: [
        'get',
        'getAll'
      ]
    }]
  ],
  api: {
    baseURL: 'http://localhost:3000',
    browserBaseURL: process.env.BROWSER_BASE_URL || 'http://localhost:3000'
  }
}
