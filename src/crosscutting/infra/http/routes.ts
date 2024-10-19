import { Request, Response, Router } from 'express'

import env from '../../config/environment-variables'

import userRoutes from '../../../modules/users/infra/http/routes/user.routes'

const router = Router()
const routes = Router()

const API_PREFIX_URL = env.API_PREFIX_URL

routes.use('/users', userRoutes)

const notFoundRoute = (_: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' })
}

routes.get('/health-check', (_: Request, res: Response) => {
  res.send({ ok: true })
})

export default router.use(API_PREFIX_URL, routes).use(notFoundRoute)
