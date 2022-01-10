import { UserStatus } from '@/auth/user-status.enum'
import { Item } from '@/entities/item.entity'
import { Exclude } from 'class-transformer'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  username: string

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string

  @Column()
  status: UserStatus

  @OneToMany(() => Item, item => item.user)
  items: Item[]
}
