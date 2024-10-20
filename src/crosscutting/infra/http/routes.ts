import { Request, Response, Router } from 'express'

import env from '../../config/environment-variables'

import userRoutes from '../../../modules/users/infra/http/routes/user.routes'
import authRoutes from '../../../modules/auth/infra/http/routes/auth.routes'
import urlRoutes from '../../../modules/urls/infra/http/routes/url.routes'

const router = Router()
const routes = Router()

const API_PREFIX_URL = env.API_PREFIX_URL

routes.use(userRoutes)
routes.use(authRoutes)
routes.use(urlRoutes)

const notFoundRoute = (_: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' })
}

routes.get('/health-check', (_: Request, res: Response) => {
  res.send({ ok: true })
})

export default router.use(API_PREFIX_URL, routes).use(notFoundRoute)
