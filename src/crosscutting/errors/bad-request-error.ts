import { ApiError } from './api-error'

export class BadRequestError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Bad request', 400)
  }
}
