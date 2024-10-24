import env from '../config/environment-variables'

import common from './common'
import users from './users'
import auth from './auth'
import urls from './urls'

export default {
  openapi: '3.0.0',
  info: {
    title: 'URL Shortener API',
    description: 'URL Shortener API documentation.',
    version: '1.0.0',
  },
  servers: [
    {
      url: env.API_URL,
    },
  ],
  paths: {
    ...users.paths,
    ...auth.paths,
    ...urls.paths,
  },
  tags: [...common.tags],
  components: {
    securitySchemes: {
      ...common.security,
    },
    responses: {
      ...common.responses,
    },
    schemas: {
      ...users.schemas,
      ...urls.schemas,
      ...common.schemas,
    },
  },
}
