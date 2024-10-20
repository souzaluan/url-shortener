export namespace IFindOriginUrlBySlug {
  export interface Params {
    slug: string
  }

  export interface Response {
    originUrl: string
  }
}

export interface IFindOriginUrlBySlugService {
  execute: (
    params: IFindOriginUrlBySlug.Params,
  ) => Promise<IFindOriginUrlBySlug.Response>
}
