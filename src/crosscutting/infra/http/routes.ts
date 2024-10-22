import { Request, Response, Router } from 'express'

import userRoutes from '../../../modules/users/infra/http/routes/user.routes'
import authRoutes from '../../../modules/auth/infra/http/routes/auth.routes'
import urlRoutes from '../../../modules/urls/infra/http/routes/url.routes'

import swagger from 'swagger-ui-express'
import docsConfig from '../../docs'

const router = Router()
const routes = Router()

routes.use('/docs', swagger.serve)
routes.get('/docs', swagger.setup(docsConfig))

routes.get('/health-check', (_: Request, res: Response) => {
  res.send({ ok: true })
})

routes.use(userRoutes)
routes.use(authRoutes)
routes.use(urlRoutes)

const notFoundRoute = (_: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' })
}

export default router.use(routes).use(notFoundRoute)
