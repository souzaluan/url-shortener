/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors/api-error'

const error = (
  error: ApiError,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.error(error)

  try {
    const statusCode = error.statusCode
    const message = error.message

    response.status(statusCode).json({ error: message })
  } catch {
    response.status(500).json({ error: 'Internal server error' })
  }
}

export default error
