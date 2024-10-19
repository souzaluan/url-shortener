import { Router } from 'express'
import AuthenticateUserController from '../controllers/authenticate-user-controller'

const routes = Router()

routes.post(
  AuthenticateUserController.route,
  AuthenticateUserController.validator,
  AuthenticateUserController.handle,
)

export default routes
