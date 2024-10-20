import 'express'

interface User {
  id: string
}

declare global {
  namespace Express {
    export interface Request {
      user: User
    }
  }
}
