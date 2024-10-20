import { Router } from 'express'

import ShortenUrlController from '../controllers/shorten-url-controller'
import FindOriginUrlByShortenedUrlController from '../controllers/find-origin-url-by-shortened-url-controller'
import GetUrlsByUserController from '../controllers/get-urls-by-user-controller'
import DeleteUrlController from '../controllers/delete-url-controller'

import nonRequiredAuthentication from '../../../../../crosscutting/middlewares/non-required-authentication'
import requiredAuthentication from '../../../../../crosscutting/middlewares/required-authentication'

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

routes.get(
  GetUrlsByUserController.route,
  requiredAuthentication,
  GetUrlsByUserController.validator,
  GetUrlsByUserController.handle,
)

routes.delete(
  DeleteUrlController.route,
  requiredAuthentication,
  DeleteUrlController.validator,
  DeleteUrlController.handle,
)

export default routes
