import { IUserEntity } from '../../users/domain/user-entity'

export interface IUrlEntity {
  id: string
  originUrl: string
  slug: string
  clicks: number
  userId: string | null
  user: IUserEntity | null
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
