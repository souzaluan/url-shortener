export namespace IAuthenticateUser {
  export interface Params {
    email: string
    password: string
  }

  export interface Response {
    token: string
    user: {
      id: string
      name: string
      email: string
    }
  }
}

export interface IAuthenticateUserService {
  execute: (
    params: IAuthenticateUser.Params,
  ) => Promise<IAuthenticateUser.Response>
}
