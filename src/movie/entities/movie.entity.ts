import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import BaseEntity from '../../shared/interfaces/base.entity';

@Entity('movies')
export class Movie extends BaseEntity {
  @Column({
    nullable: false,
  })
  @ApiProperty()
  title: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  description: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  rank: number;
}
