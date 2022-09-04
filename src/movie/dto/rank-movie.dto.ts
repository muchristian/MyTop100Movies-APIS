import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';

export class RankMovieDto {
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsNotEmpty()
  rank: number;
}
