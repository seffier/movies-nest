import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MovieFetchAndPersistService } from '../service/movie.fetchAndPersist.service';
import { Movie } from 'src/domain/model/movie.mongodb';
import { MovieReadService } from '../service/movie.read.service';
import { SuccessDto } from '../dto/response/success.response.dto';
import { MovieWriteService } from '../service/movie.write.service';
import { MovieSaveRequestDto } from '../dto/request/movie.save.request.dto';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieFetchAndPersistService: MovieFetchAndPersistService,
    private readonly movieReadService: MovieReadService,
    private readonly movieWriteService: MovieWriteService,
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
  async findById(@Param('id') id: string): Promise<Movie> {
    return await this.movieReadService.findOneById(id);
  }

  @Post('')
  async save(@Body() req: MovieSaveRequestDto): Promise<SuccessDto> {
    return await this.movieWriteService.save(req);
  }
}
