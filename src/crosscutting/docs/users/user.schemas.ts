export default {
  User: {
    readOnly: true,
    properties: {
      id: {
        type: 'string',
        readOnly: true,
      },
      name: {
        type: 'string',
      },
      email: {
        type: 'string',
      },
      password: {
        type: 'string',
        writeOnly: true,
      },
      createdAt: {
        type: 'string',
        format: 'date-time',
        readOnly: true,
      },
      updatedAt: {
        type: 'string',
        format: 'date-time',
        readOnly: true,
      },
    },
  },
}
