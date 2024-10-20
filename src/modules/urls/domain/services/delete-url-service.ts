export namespace IDeleteUrl {
  export interface Params {
    urlId: string
    userId: string
  }
}

export interface IDeleteUrlService {
  execute: (params: IDeleteUrl.Params) => Promise<void>
}
