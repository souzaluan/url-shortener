/* eslint-disable @typescript-eslint/no-var-requires */
const config = require('./jest.config')
config.testMatch = ['**/unit/**/*.spec.ts']
module.exports = config
