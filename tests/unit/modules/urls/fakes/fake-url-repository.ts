import { randomUUID } from 'node:crypto'

import IUrlRepository from '../../../../../src/modules/urls/repositories/url-repository'
import { IUrlEntity } from '../../../../../src/modules/urls/domain/url-entity'
import CreateUrlDTO from '../../../../../src/modules/urls/dtos/create-url-dto'

class FakeUrlRepository implements IUrlRepository {
  urls: IUrlEntity[] = []

  async create(data: CreateUrlDTO): Promise<IUrlEntity> {
    const url = {
      ...data,
      id: randomUUID(),
      clicks: 0,
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

  async incrementClick(id: string): Promise<void> {
    const urlIndex = this.urls.findIndex((url) => url.id === id)
    this.urls[urlIndex].clicks++
  }
}

export default FakeUrlRepository
