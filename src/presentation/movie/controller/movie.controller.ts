import { Controller, Get } from '@nestjs/common';
import { MovieFetchAndPersistService } from '../service/movie.fetchAndPersist.service';
import { Movie } from 'src/domain/model/movie.mongodb';
import { MovieService } from '../service/movie.service';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieFetchAndPersistService: MovieFetchAndPersistService,
    private readonly movieService: MovieService,
  ) {}

  @Get('/fetch-and-persist')
  async fetchAndPersist() {
    return await this.movieFetchAndPersistService.discoverAndPersistMovies();
  }

  @Get('')
  async findAll(): Promise<Movie[]> {
    return await this.movieService.findAll();
  }
}
