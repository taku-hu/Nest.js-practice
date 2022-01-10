import { ItemsStatus } from '@/items/item-status.enum'
import { ItemsService } from '@/items/items.service'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  findAll() {
    return this.itemsService.findAll()
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.itemsService.findById(id)
  }

  @Post()
  create(
    @Body('id') id: string,
    @Body('name') name: string,
    @Body('price') price: number,
    @Body('description') description: string
  ) {
    const item = {
      id,
      name,
      price,
      description,
      status: ItemsStatus.ON_SALE
    }
    return this.itemsService.create(item)
  }

  @Patch(':id')
  updateStatus(@Param('id') id: string) {
    return this.itemsService.updateStatus(id)
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemsService.delete(id)
  }
}
