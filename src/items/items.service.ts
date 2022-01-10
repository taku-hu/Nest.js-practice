import { ItemsStatus } from '@/items/item-status.enum'
import { Item } from '@/items/item.model'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ItemsService {
  private items: Item[] = []
  findAll() {
    return this.items
  }

  findById(id: string) {
    return this.items.find(item => item.id === id)
  }

  create(item: Item) {
    this.items = [...this.items, item]
    return item
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
