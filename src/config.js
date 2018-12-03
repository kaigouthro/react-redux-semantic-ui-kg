const environment = {
  development: {
    isProduction: false,
    assetsPath: `http://${process.env.HOST || 'localhost'}:${+process.env.PORT + 1 || 3001}/dist/`
  },
  production: {
    isProduction: true,
    assetsPath: '/dist/'
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign(
  {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '81',
    apiHost: process.env.APIHOST || 'localhost',
    apiPort: process.env.APIPORT || '3030',
    app: {
      title: 'React Redux Semantic UI Example',
      description: 'All the modern best practices in one example.',
      head: {
        titleTemplate: 'React Redux Semantic UI Example: %s',
        meta: [
          { name: 'description', content: 'All the modern best practices in one example.' },
          { charset: 'utf-8' },
          { property: 'og:site_name', content: 'React Redux Semantic UI Example' },
          { property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg' },
          { property: 'og:locale', content: 'en_US' },
          { property: 'og:title', content: 'React Redux Semantic UI Example' },
          { property: 'og:description', content: 'All the modern best practices in one example.' },
          { property: 'og:card', content: 'summary' },
          { property: 'og:site', content: '@erikras' },
          { property: 'og:creator', content: '@erikras' },
          { property: 'og:image:width', content: '200' },
          { property: 'og:image:height', content: '200' }
        ]
      }
    }
  },
  environment
);
