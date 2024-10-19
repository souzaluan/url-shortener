import { Router } from 'express'

import ShortenUrlController from '../controllers/shorten-url-controller'
import FindOriginUrlByShortenedUrlController from '../controllers/find-origin-url-by-shortened-url-controller'

import nonRequiredAuthentication from '../../../../../crosscutting/middlewares/non-required-authentication'

const routes = Router()

routes.post(
  ShortenUrlController.route,
  nonRequiredAuthentication,
  ShortenUrlController.validator,
  ShortenUrlController.handle,
)

routes.get(
  FindOriginUrlByShortenedUrlController.route,
  FindOriginUrlByShortenedUrlController.validator,
  FindOriginUrlByShortenedUrlController.handle,
)

export default routes
