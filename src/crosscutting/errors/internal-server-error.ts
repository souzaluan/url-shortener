import { ApiError } from './api-error'

export class InternalServerError extends ApiError {
  constructor(message?: string) {
    super(message ?? 'Internal server error', 500)
  }
}
