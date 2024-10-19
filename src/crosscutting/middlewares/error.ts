/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../errors/api-error'
import { CelebrateError } from 'celebrate'

const error = (
  error: ApiError,
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  console.error(error)

  try {
    if (error instanceof CelebrateError) {
      const errorBody = error.details.get('body')
      const errorParams = error.details.get('params')
      const errorQuery = error.details.get('query')

      const errorDetails =
        errorBody?.details[0] ||
        errorParams?.details[0] ||
        errorQuery?.details[0]

      response.status(400).json({
        message: errorDetails?.message ?? 'Body validation error',
      })

      return
    }

    const statusCode = error.statusCode
    const message = error.message

    response.status(statusCode).json({ error: message })
  } catch {
    response.status(500).json({ error: 'Internal server error' })
  }
}

export default error
