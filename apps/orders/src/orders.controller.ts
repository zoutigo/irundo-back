import { JwtAuthGuard } from '@app/common/auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateOrderDto } from './dtos/create-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { OrderService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(@Query('page') page = 1) {
    return await this.orderService.paginate(page);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.orderService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body: CreateOrderDto, @Req() req: any) {
    console.log(req.user);
    return await this.orderService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateOrderDto) {
    await this.orderService.update(id, body);
    const updated = await this.orderService.findOne({ id });
    if (!updated) return new NotFoundException(`Cette boutique n'existe pas`);

    return updated;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.softdelete(id);
  }
}
