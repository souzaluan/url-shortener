import { Router } from 'express'
import CreateUserController from '../controllers/create-user-controller'

const routes = Router()

routes.post(
  CreateUserController.route,
  CreateUserController.validator,
  CreateUserController.handle,
)

export default routes
