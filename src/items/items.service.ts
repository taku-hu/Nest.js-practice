import { User } from '@/entities/user.entity'
import { CreateItemDto } from '@/items/dto/create-item.dto'
import { ItemsStatus } from '@/items/item-status.enum'
import { ItemRepository } from '@/items/item.repository'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

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

  async create(createItemDto: CreateItemDto, user: User) {
    return await this.itemRepository.createItem(createItemDto, user)
  }

  async updateStatus(id: string, user: User) {
    const item = await this.findById(id)

    if (item.userId === user.id) {
      throw new BadRequestException('自身の商品を購入することはできません')
    }

    const newItem = { ...item, status: ItemsStatus.SOLD_OUT, updatedAt: new Date().toISOString() }

    await this.itemRepository.save(newItem)

    return newItem
  }

  async delete(id: string, user: User) {
    const item = await this.findById(id)

    if (item.userId !== user.id) {
      throw new BadRequestException('他人の商品を削除することはできません')
    }

    await this.itemRepository.delete({ id })
  }
}
