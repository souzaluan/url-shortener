export interface IUrlEntity {
  id: string
  originUrl: string
  slug: string
  clicks: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
