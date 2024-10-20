import { Router } from 'express'

import ShortenUrlController from '../controllers/shorten-url-controller'
import RedirectToOriginUrlController from '../controllers/redirect-to-origin-url-controller'
import GetUrlsByUserController from '../controllers/get-urls-by-user-controller'
import DeleteUrlController from '../controllers/delete-url-controller'
import UpdateUrlController from '../controllers/update-url-controller'

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
  RedirectToOriginUrlController.route,
  RedirectToOriginUrlController.validator,
  RedirectToOriginUrlController.handle,
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

routes.patch(
  UpdateUrlController.route,
  requiredAuthentication,
  UpdateUrlController.validator,
  UpdateUrlController.handle,
)

export default routes
