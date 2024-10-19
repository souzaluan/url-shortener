import env from './environment-variables'

export default {
  jwt: {
    expiresIn: env.JWT_EXPIRES_IN,
    secret: env.JWT_SECRET,
  },
}
