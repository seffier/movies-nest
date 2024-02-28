import { Controller, Get } from '@nestjs/common';
import { MovieFetchAndPersistService } from '../service/movie.fetchAndPersist.service';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieFetchAndPersistService) {}

  @Get('/fetch-and-persist')
  async fetchAndPersist() {
    return await this.movieService.discoverAndPersistMovies();
  }
}
