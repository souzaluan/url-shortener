import env from '../config/environment-variables'

import common from './common'

export default {
  openapi: '3.0.0',
  info: {
    title: 'URL Shortener API',
    description: 'URL Shortener API documentation.',
    version: '1.0.0',
  },
  servers: [
    {
      description: 'Development',
      url: `http://localhost:${env.APP_PORT}/${env.API_PREFIX_URL}`,
    },
  ],
  paths: {},
  tags: [...common.tags],
  components: {
    securitySchemes: {
      ...common.security,
    },
    responses: {
      ...common.responses,
    },
    schemas: {
      ...common.schemas,
    },
  },
}
