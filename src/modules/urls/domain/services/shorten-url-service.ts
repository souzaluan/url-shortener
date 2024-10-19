import { IUrlEntity } from '../url-entity'

export namespace IShortenUrl {
  export interface Params {
    originUrl: string
  }

  export interface Response extends Omit<IUrlEntity, 'slug'> {
    shortenedUrl: string
  }
}

export interface IShortenUrlService {
  execute: (params: IShortenUrl.Params) => Promise<IShortenUrl.Response>
}
