import { CreateItemDto } from '@/items/dto/create-item.dto'
import { ItemsStatus } from '@/items/item-status.enum'
import { ItemRepository } from '@/items/item.repository'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ItemsService {
  constructor(private readonly itemRepository: ItemRepository) {}

  async findAll() {
    return await this.itemRepository.find()
  }

  async findById(id: string) {
    const found = await this.itemRepository.findOne(id)

    if (!found) {
      throw new NotFoundException()
    }

    return found
  }

  async create(createItemDto: CreateItemDto) {
    return await this.itemRepository.createItem(createItemDto)
  }

  async updateStatus(id: string) {
    const item = await this.findById(id)
    const newItem = { ...item, status: ItemsStatus.SOLD_OUT, updatedAt: new Date().toISOString() }

    await this.itemRepository.save(newItem)

    return newItem
  }

  async delete(id: string) {
    await this.itemRepository.delete({ id })
  }
}
