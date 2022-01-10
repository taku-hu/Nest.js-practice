import { ItemsStatus } from '@/items/item-status.enum'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  price: number

  @Column()
  description: string

  @Column()
  status: ItemsStatus

  @Column()
  createdAt: string

  @Column()
  updatedAt: string
}
