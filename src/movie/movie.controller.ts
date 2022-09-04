import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import GenericResponse from '../shared/interfaces/generic-response';
import { FilterOptions } from '../shared/interfaces/filter-options';
import { IPage } from 'src/shared/interfaces/page.interface';
import { IPagination } from './dto/paginate.dto';
import { RankMovieDto } from './dto/rank-movie.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  getGenericResponseSchema,
  getPaginatedSchema,
} from '../shared/utils/swagger.util';

@Controller('movie')
@ApiTags('Movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  @ApiCreatedResponse(getGenericResponseSchema(Movie))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createMovieDto: CreateMovieDto,
  ): Promise<GenericResponse<Movie>> {
    return {
      message: 'Movie create successfully',
      result: await this.movieService.create(createMovieDto),
    };
  }

  @Get()
  @ApiOkResponse(getPaginatedSchema(Movie))
  async findAll(
    @Query() paginateParams: IPagination,
    @Query() filterOptions: FilterOptions,
  ): Promise<GenericResponse<IPage<Movie>>> {
    return {
      message: 'Movies retrieved successfully',
      result: await this.movieService.findAll(paginateParams, filterOptions),
    };
  }

  @Patch(':id')
  @ApiOkResponse(getGenericResponseSchema(Movie))
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: UpdateMovieDto,
  ): Promise<GenericResponse<Movie>> {
    return {
      message: 'Movie updated successfully',
      result: await this.movieService.update(+id, updateMovieDto),
    };
  }

  @Patch(':id/rank')
  @ApiOkResponse(getGenericResponseSchema(Movie))
  async rank(
    @Param('id') id: string,
    @Body() rankMovieDto: RankMovieDto,
  ): Promise<GenericResponse<Movie>> {
    return {
      message: 'Movie ranked successfully',
      result: await this.movieService.rank(+id, rankMovieDto),
    };
  }

  @Delete(':id')
  @ApiOkResponse(getGenericResponseSchema())
  async remove(@Param('id') id: string): Promise<any> {
    await this.movieService.remove(+id);
    return {
      message: 'Movie deleted successfully',
      results: null,
    };
  }
}
