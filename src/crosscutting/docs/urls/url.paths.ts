export default {
  '/urls': {
    post: {
      tags: ['URL'],
      summary: 'Shorten an url',
      description:
        'Route with optional authentication. If authenticated, the created route will be related to the authenticated user.',
      security: [
        {
          jwtAuth: [],
        },
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              properties: {
                originUrl: {
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
                $ref: '#components/schemas/Url',
              },
            },
          },
        },
        400: {
          $ref: '#components/responses/400',
        },
        401: {
          $ref: '#components/responses/400',
        },
        500: {
          $ref: '#components/responses/500',
        },
      },
    },
  },
  '/urls/{id}': {
    patch: {
      tags: ['URL'],
      summary: 'Update URL',
      security: [
        {
          jwtAuth: ['bearer'],
        },
      ],
      parameters: [
        {
          description: 'URL ID',
          name: 'id',
          in: 'path',
          required: true,
        },
      ],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              properties: {
                originUrl: {
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
                properties: {
                  message: {
                    type: 'string',
                    example: 'success',
                  },
                },
              },
            },
          },
        },
        400: {
          $ref: '#components/responses/400',
        },
        404: {
          $ref: '#components/responses/404',
        },
        401: {
          $ref: '#components/responses/401',
        },
        500: {
          $ref: '#components/responses/500',
        },
      },
    },
    delete: {
      tags: ['URL'],
      summary: 'Delete URL',
      security: [
        {
          jwtAuth: ['bearer'],
        },
      ],
      parameters: [
        {
          description: 'URL ID',
          name: 'id',
          in: 'path',
          required: true,
          schema: {
            properties: {
              originUrl: {
                type: 'string',
              },
            },
          },
        },
      ],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                properties: {
                  message: {
                    type: 'string',
                    example: 'success',
                  },
                },
              },
            },
          },
        },
        400: {
          $ref: '#components/responses/400',
        },
        404: {
          $ref: '#components/responses/404',
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
  '/urls/my': {
    get: {
      tags: ['URL'],
      summary: 'Get my URLs',
      security: [
        {
          jwtAuth: [],
        },
      ],
      parameters: [
        {
          description: 'Current page',
          name: 'page',
          in: 'query',
          required: false,
          default: 1,
          schema: {
            $ref: '#components/schemas/Url',
          },
        },
        {
          description: 'Page limit',
          name: 'limit',
          in: 'query',
          required: false,
          default: 10,
          schema: {
            $ref: '#components/schemas/Url',
          },
        },
      ],
      responses: {
        200: {
          description: 'Success',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'array',
                    items: {
                      $ref: '#components/schemas/Url',
                    },
                  },
                  pages: {
                    type: 'integer',
                  },
                  items: {
                    type: 'integer',
                  },
                },
              },
            },
          },
        },
        400: {
          $ref: '#components/responses/400',
        },
        401: {
          $ref: '#components/responses/400',
        },
        500: {
          $ref: '#components/responses/500',
        },
      },
    },
  },
  '/{slug}': {
    get: {
      tags: ['URL'],
      summary: 'Redirect to origin URL by shortened URL',
      parameters: [
        {
          description: 'URL slug',
          name: 'slug',
          in: 'path',
          required: true,
        },
      ],
      responses: {
        302: {
          description: 'Redirect to origin URL',
          headers: {
            Location: {
              description: 'Origin URL',
              schema: {
                type: 'string',
                example: 'https://example.com',
              },
            },
          },
        },
        400: {
          $ref: '#components/responses/400',
        },
        401: {
          $ref: '#components/responses/401',
        },
        404: {
          $ref: '#components/responses/404',
        },
        500: {
          $ref: '#components/responses/500',
        },
      },
    },
  },
}
