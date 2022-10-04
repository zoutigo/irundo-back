import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('varchar', {
    nullable: false,
  })
  lastname: string;
  @Column('varchar', {
    nullable: false,
  })
  firstname: string;
  @Column('varchar', {
    nullable: false,
  })
  password: string;
  @Column('varchar', {
    nullable: false,
  })
  email: string;
}
