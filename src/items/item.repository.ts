import { Item } from '@/entities/item.entity'
import { CreateItemDto } from '@/items/dto/create-item.dto'
import { ItemsStatus } from '@/items/item-status.enum'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {
  async createItem(createItemDto: CreateItemDto) {
    const { name, price, description } = createItemDto
    const item = this.create({
      name,
      price,
      description,
      status: ItemsStatus.ON_SALE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    await this.save(item)

    return item
  }
}
