import { ItemsStatus } from '@/items/item-status.enum'

export interface Item {
  id: string
  name: string
  price: number
  description: string
  status: ItemsStatus
}
