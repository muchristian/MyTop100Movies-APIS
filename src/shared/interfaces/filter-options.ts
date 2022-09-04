import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ESort } from '../enums/sort';

export class FilterOptions {
  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;

  @ApiProperty({ enum: ESort, required: false })
  @IsEnum(ESort)
  @IsOptional()
  sort?: ESort;
}
