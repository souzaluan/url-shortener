export interface IUrlEntity {
  id: string
  originUrl: string
  shortenedUrl: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}
