export default {
  '/auth': {
    post: {
      tags: ['Auth'],
      summary: 'Authenticate in application',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              properties: {
                email: {
                  type: 'string',
                },
                password: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  user: {
                    properties: {
                      id: {
                        type: 'string',
                      },
                      name: {
                        type: 'string',
                      },
                      email: {
                        type: 'string',
                      },
                    },
                  },
                  token: {
                    type: 'string',
                  },
                },
              },
            },
          },
        },
        401: {
          $ref: '#components/responses/401',
        },
        500: {
          $ref: '#components/responses/500',
        },
      },
    },
  },
}
