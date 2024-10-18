import { Request, Response, Router } from 'express'

const router = Router()
const routes = Router()

const API_PREFIX_URL = process.env.API_PREFIX_URL || '/api'

const notFoundRoute = (_: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' })
}

routes.get('/health-check', (_: Request, res: Response) => {
  res.send({ ok: true })
})

export default router.use(API_PREFIX_URL, routes).use(notFoundRoute)
