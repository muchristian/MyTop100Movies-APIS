import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { FilterOptions } from '../shared/interfaces/filter-options';
import { IPagination } from './dto/paginate.dto';
import { Brackets, Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { RankMovieDto } from './dto/rank-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepo: Repository<Movie>,
  ) {}
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const result = await this.movieRepo.save({
      ...createMovieDto,
    });
    return result;
  }

  async findAll(
    options: IPagination,
    { sort, search }: FilterOptions,
  ): Promise<any> {
    console.log(search);
    const queryBuilder = this.movieRepo.createQueryBuilder('movie');
    if (search) {
      queryBuilder.andWhere('movie.title = :title', {
        title: search,
      });
    }
    if (sort) {
      queryBuilder.orderBy(
        sort.split('__')[0] === 'TITLE'
          ? 'movie.title'
          : sort.split('__')[0] === 'RANK'
          ? 'movie.rank'
          : 'movie.createdAt',
        sort.split('__')[1] === 'ASC' ? 'ASC' : 'DESC',
      );
    } else {
      queryBuilder.orderBy('movie.createdAt', 'DESC');
    }
    const { items, meta } = await paginate(queryBuilder, options);
    return { items, ...meta };
  }

  async findOne(id: number): Promise<Movie> {
    const result = await this.movieRepo.findOne(id);
    if (!result) throw new NotFoundException('Movie does not exist');
    return result;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    return await this.movieRepo.save({
      ...movie,
      ...updateMovieDto,
    });
  }

  async rank(id: number, rankMovieDto: RankMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    return await this.movieRepo.save({
      ...movie,
      ...rankMovieDto,
    });
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.movieRepo.softDelete(id);
  }
}
