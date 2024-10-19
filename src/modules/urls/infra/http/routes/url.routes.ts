import { Router } from 'express'

import ShortenUrlController from '../controllers/shorten-url-controller'

const routes = Router()

routes.post(
  ShortenUrlController.route,
  ShortenUrlController.validator,
  ShortenUrlController.handle,
)

export default routes
