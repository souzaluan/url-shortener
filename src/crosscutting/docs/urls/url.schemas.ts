export default {
  Url: {
    readOnly: true,
    properties: {
      id: {
        type: 'string',
        readOnly: true,
      },
      originUrl: {
        type: 'string',
      },
      shortenedUrl: {
        type: 'string',
      },
      clicks: {
        type: 'integer',
        readOnly: true,
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
      deletedAt: {
        type: 'string',
        format: 'date-time',
        readOnly: true,
        nullable: true,
      },
    },
  },
}
