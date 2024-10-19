import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { IUrlEntity } from '../../../domain/url-entity'

import { UserEntity } from '../../../../users/infra/typeorm/entities/user-entity'
import { IUserEntity } from '../../../../users/domain/user-entity'

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

  @Column({ name: 'user_id', nullable: true })
  userId: string | null

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: IUserEntity | null

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null
}
