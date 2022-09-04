import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { ESort } from '../enums/sort';

export class FilterOptions {
  @ApiProperty()
  @IsOptional()
  search?: string;

  @ApiProperty({ enum: ESort })
  @IsEnum(ESort)
  @IsOptional()
  sort?: ESort;
}
