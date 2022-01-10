import { GetUser } from '@/auth/decorator/get-user.decorator'
import { Role } from '@/auth/decorator/role.decorator'
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard'
import { RolesGuard } from '@/auth/guards/roles.guard'
import { UserStatus } from '@/auth/user-status.enum'
import { User } from '@/entities/user.entity'
import { CreateItemDto } from '@/items/dto/create-item.dto'
import { ItemsService } from '@/items/items.service'
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'

@Controller('items')
@UseInterceptors(ClassSerializerInterceptor)
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @Get()
  async findAll() {
    return await this.itemsService.findAll()
  }

  @Get(':id')
  async findById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.itemsService.findById(id)
  }

  @Post()
  @Role(UserStatus.PREMIUM)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async create(@Body() createItemDto: CreateItemDto, @GetUser() user: User) {
    console.log(user)
    return await this.itemsService.create(createItemDto, user)
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateStatus(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return await this.itemsService.updateStatus(id, user)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', ParseUUIDPipe) id: string, @GetUser() user: User) {
    return await this.itemsService.delete(id, user)
  }
}
