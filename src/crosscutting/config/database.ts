import env from './environment-variables'

export default {
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  name: env.DB_NAME,
}
