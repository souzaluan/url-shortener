import { NextFunction, Request, Response } from 'express'
import { container } from 'tsyringe'

import { UnauthorizedError } from '../errors/unauthorized-error'

import IAuthTokenProvider, {
  AUTH_TOKEN_PROVIDER_TOKEN,
} from '../container/providers/auth-token-provider/models/auth-token-provider'

import IUserRepository, {
  USER_REPOSITORY_TOKEN,
} from '../../modules/users/repositories/user-repository'

interface IToken {
  id: string
  exp: number
}

const requiredAuthentication = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers

  if (!authorization) {
    throw new UnauthorizedError()
  }

  const [, token] = authorization.split(' ')

  const authToken = container.resolve<IAuthTokenProvider>(
    AUTH_TOKEN_PROVIDER_TOKEN,
  )

  const { exp, id } = authToken.verify(token) as IToken

  if (exp * 1000 < new Date().getTime()) {
    throw new UnauthorizedError('Expired authorization token')
  }

  const userRepository = container.resolve<IUserRepository>(
    USER_REPOSITORY_TOKEN,
  )

  const user = await userRepository.findOneById(id)

  if (!user) {
    throw new UnauthorizedError()
  }

  req.user = {
    id: user.id,
  }

  return next()
}

export default requiredAuthentication
