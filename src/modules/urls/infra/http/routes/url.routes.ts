import { Router } from 'express'

import ShortenUrlController from '../controllers/shorten-url-controller'
import FindOriginUrlByShortenedUrlController from '../controllers/find-origin-url-by-shortened-url-controller'

const routes = Router()

routes.post(
  ShortenUrlController.route,
  ShortenUrlController.validator,
  ShortenUrlController.handle,
)

routes.get(
  FindOriginUrlByShortenedUrlController.route,
  FindOriginUrlByShortenedUrlController.validator,
  FindOriginUrlByShortenedUrlController.handle,
)

export default routes
