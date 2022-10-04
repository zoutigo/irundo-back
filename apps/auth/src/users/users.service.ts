import { AbstractService } from '@app/common';
import {
  Injectable,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

// import { BILLING_SERVICE } from './constants/services';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService extends AbstractService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // @Inject(BILLING_SERVICE) private billingClient: ClientProxy,
  ) {
    super(userRepository);
  }

  async create(data: CreateUserDto): Promise<any> {
    try {
      const result = await super.create({
        ...data,
        password: await bcrypt.hash(data.password, 10),
      });
      // await lastValueFrom(
      //   this.billingClient.emit('order_created', {
      //     data,
      //   }),
      // );

      return result;
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid password');
    }
    return user;
  }

  private async validateCreateUserRequest(request: CreateUserDto) {
    let user: User;
    try {
      user = await this.userRepository.findOne({
        where: { email: request.email },
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException('Email already exists.');
    }
  }
}
