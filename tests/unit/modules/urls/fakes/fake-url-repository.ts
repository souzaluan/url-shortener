import { randomUUID } from 'node:crypto'

import IUrlRepository from '../../../../../src/modules/urls/repositories/url-repository'
import { IUrlEntity } from '../../../../../src/modules/urls/domain/url-entity'
import CreateUrlDTO from '../../../../../src/modules/urls/dtos/create-url-dto'
import GetUrlsByUserDTO from '../../../../../src/modules/urls/dtos/get-urls-by-user-dto'

class FakeUrlRepository implements IUrlRepository {
  urls: IUrlEntity[] = []

  async create(data: CreateUrlDTO): Promise<IUrlEntity> {
    const url = {
      ...data,
      id: randomUUID(),
      clicks: 0,
      user: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }

    this.urls.push(url)

    return url
  }

  async findOneBySlug(slug: string): Promise<IUrlEntity | null> {
    const url = this.urls.find((url) => url.slug === slug)

    if (!url) {
      return null
    }

    return url
  }

  async findOneById(id: string): Promise<IUrlEntity | null> {
    const url = this.urls.find((url) => url.id === id)

    if (!url) {
      return null
    }

    return url
  }

  async incrementClick(id: string): Promise<void> {
    const urlIndex = this.urls.findIndex((url) => url.id === id)
    this.urls[urlIndex].clicks++
  }

  async getByUser({
    userId,
    limit,
    page,
  }: GetUrlsByUserDTO.Params): Promise<GetUrlsByUserDTO.Response> {
    const data = this.urls
      .filter((url) => url.userId === userId)
      .slice((page - 1) * limit, page * limit)

    return {
      data,
      items: data.length,
      pages: Math.ceil(data.length / limit),
    }
  }

  async deleteById(id: string): Promise<void> {
    const urlIndex = this.urls.findIndex((url) => url.id === id)
    this.urls[urlIndex] = { ...this.urls[urlIndex], deletedAt: new Date() }
  }
}

export default FakeUrlRepository
