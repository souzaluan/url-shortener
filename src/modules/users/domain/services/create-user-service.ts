import { IUserEntity } from '../user-entity'

export namespace ICreateUser {
  export interface Params {
    name: string
    email: string
    password: string
  }

  export type Response = Omit<IUserEntity, 'password'>
}

export interface ICreateUserService {
  execute: (params: ICreateUser.Params) => Promise<ICreateUser.Response>
}
