export default {
  404: {
    description: 'Not found error',
    content: {
      'application/json': {
        schema: {
          $ref: '#components/schemas/Error',
        },
      },
    },
  },
  400: {
    description: 'Bad request error',
    content: {
      'application/json': {
        schema: {
          $ref: '#components/schemas/Error',
        },
      },
    },
  },
  401: {
    description: 'Unauthorized error',
    content: {
      'application/json': {
        schema: {
          $ref: '#components/schemas/Error',
        },
      },
    },
  },
  500: {
    description: 'Internal server error',
    content: {
      'application/json': {
        schema: {
          $ref: '#components/schemas/Error',
        },
      },
    },
  },
}
