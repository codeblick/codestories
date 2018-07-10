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
    browserBaseURL: 'http://localhost:3000'
  }
}
