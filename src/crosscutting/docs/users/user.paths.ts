export default {
  '/users': {
    post: {
      tags: ['User'],
      summary: 'Register in application',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              properties: {
                name: {
                  type: 'string',
                },
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
        201: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                $ref: '#components/schemas/User',
              },
            },
          },
        },
        400: {
          $ref: '#components/responses/400',
        },
        500: {
          $ref: '#components/responses/500',
        },
      },
    },
  },
}
