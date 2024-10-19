export namespace IFindOriginUrlByShortenedUrl {
  export interface Params {
    shortenedUrl: string
  }

  export interface Response {
    originUrl: string
  }
}

export interface IFindOriginUrlByShortenedUrlService {
  execute: (
    params: IFindOriginUrlByShortenedUrl.Params,
  ) => Promise<IFindOriginUrlByShortenedUrl.Response>
}
