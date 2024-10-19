import { cleanEnv, num, str } from 'envalid'

export default cleanEnv(process.env, {
  APP_PORT: num({ desc: 'API server port', example: '3000' }),
  API_PREFIX_URL: str({ desc: 'API prefix url', example: '/api' }),
  API_URL: str({ desc: 'Full API URL', example: 'http://localhost:3000/api' }),
  DB_HOST: str({ desc: 'Database host', example: 'localhost' }),
  DB_PORT: num({ desc: 'Database port', example: '5432' }),
  DB_USERNAME: str({ desc: 'Database username', example: 'user' }),
  DB_PASSWORD: str({ desc: 'Database password', example: 'root' }),
  DB_NAME: str({ desc: 'Database name', example: 'url-shortener-database' }),
  JWT_SECRET: str({ desc: 'JWT secret key' }),
  JWT_EXPIRES_IN: num({ desc: 'JWT expiration time in seconds' }),
})
