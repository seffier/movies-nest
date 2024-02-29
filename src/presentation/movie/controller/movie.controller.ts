import { Controller, Get, Param } from '@nestjs/common';
import { MovieFetchAndPersistService } from '../service/movie.fetchAndPersist.service';
import { Movie } from 'src/domain/model/movie.mongodb';
import { MovieReadService } from '../service/movie.read.service';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieFetchAndPersistService: MovieFetchAndPersistService,
    private readonly movieReadService: MovieReadService,
  ) {}

  @Get('/fetch-and-persist')
  async fetchAndPersist() {
    return await this.movieFetchAndPersistService.discoverAndPersistMovies();
  }

  @Get('')
  async findAll(): Promise<Movie[]> {
    return await this.movieReadService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return await this.movieReadService.findOneById(id);
  }
}
