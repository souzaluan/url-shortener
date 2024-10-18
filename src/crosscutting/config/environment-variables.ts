import { cleanEnv, num, str } from 'envalid'

const env = cleanEnv(process.env, {
  APP_PORT: num({ desc: 'API server port' }),
  API_PREFIX_URL: str({ example: '/api', desc: 'API prefix url' }),
})

export default env
