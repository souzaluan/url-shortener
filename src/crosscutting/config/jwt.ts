import env from './environment-variables'

export default {
  secret: env.JWT_SECRET,
  expiresIn: env.JWT_EXPIRES_IN,
}
