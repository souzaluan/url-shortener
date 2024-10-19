import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { IUrlEntity } from '../../../domain/url-entity'

@Entity('urls')
export class UrlEntity implements IUrlEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ name: 'origin_url' })
  originUrl: string

  @Column()
  slug: string

  @Column({ type: 'int', default: 0 })
  clicks: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null
}
