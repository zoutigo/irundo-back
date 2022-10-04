import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaginatedResultInterface } from '../interface/paginated-result.interface';

@Injectable()
export abstract class AbstractService {
  protected constructor(protected readonly repository: Repository<any>) {}

  async findAll(relations: any[] = []): Promise<any[]> {
    return this.repository.find({ relations, withDeleted: false });
  }
  async paginate(
    page = 1,
    relations: any[] = [],
  ): Promise<PaginatedResultInterface> {
    const take = 15;
    const [data, total] = await this.repository.findAndCount({
      take,
      skip: (page - 1) * take,
      relations,
    });
    return {
      data: data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / take),
      },
    };
  }
  async create(data): Promise<any> {
    return this.repository.save(data);
  }
  async findOne(condition, relations: any[] = []): Promise<any> {
    return this.repository.findOne({
      where: condition,
      relations,
      withDeleted: false,
    });
  }
  async update(id: string, data): Promise<any> {
    return this.repository.update(id, data);
  }
  async delete(id: string): Promise<any> {
    return this.repository.delete(id);
  }
  async softdelete(id: string): Promise<any> {
    return this.repository.softDelete(id);
  }
}
