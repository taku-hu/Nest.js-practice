import { CreateItemDto } from '@/items/dto/create-item.dto'
import { ItemsStatus } from '@/items/item-status.enum'
import { Item } from '@/items/item.model'
import { Injectable, NotFoundException } from '@nestjs/common'
import { v4 as uuid } from 'uuid'

@Injectable()
export class ItemsService {
  private items: Item[] = []
  findAll() {
    return this.items
  }

  findById(id: string) {
    const found = this.items.find(item => item.id === id)

    if (!found) {
      throw new NotFoundException()
    }

    return found
  }

  create(createItemDto: CreateItemDto) {
    const newItem = { id: uuid(), ...createItemDto, status: ItemsStatus.ON_SALE }
    this.items = [...this.items, newItem]
    return newItem
  }

  updateStatus(id: string) {
    const item = this.findById(id)
    const newItem = { ...item, status: ItemsStatus.SOLD_OUT }
    this.items = this.items.map(item => (item.id === id ? newItem : item))

    return newItem
  }

  delete(id: string) {
    this.items = this.items.filter(item => item.id !== id)
  }
}
