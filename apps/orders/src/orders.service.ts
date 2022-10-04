import { AbstractService } from '@app/common';
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { BILLING_SERVICE } from './constants/services';
import { CreateOrderDto } from './dtos/create-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService extends AbstractService {
  constructor(
    @InjectRepository(Order)
    private readonly shopRepository: Repository<Order>,
    @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {
    super(shopRepository);
  }

  async create(data: CreateOrderDto): Promise<any> {
    try {
      const result = await super.create(data);
      await lastValueFrom(
        this.billingClient.emit('order_created', {
          data,
        }),
      );

      return result;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
