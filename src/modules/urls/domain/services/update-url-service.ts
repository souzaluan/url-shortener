export namespace IUpdateUrl {
  export interface Params {
    urlId: string
    userId: string
    originUrl?: string
  }
}

export interface IUpdateUrlService {
  execute: (params: IUpdateUrl.Params) => Promise<void>
}
