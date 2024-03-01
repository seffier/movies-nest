import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MovieFetchAndPersistService } from '../service/movie.fetchAndPersist.service';
import { MovieReadService } from '../service/movie.read.service';
import { SuccessDto } from '../dto/response/success.response.dto';
import { MovieWriteService } from '../service/movie.write.service';
import { MovieSaveRequestDto } from '../dto/request/movie.save.request.dto';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { MovieListResponseDto } from '../dto/response/movie.list.response.dto';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(
    private readonly movieFetchAndPersistService: MovieFetchAndPersistService,
    private readonly movieReadService: MovieReadService,
    private readonly movieWriteService: MovieWriteService,
  ) {}

  @Get('/fetch-and-persist')
  @ApiOkResponse({
    description: 'Success Scenario',
    type: SuccessDto,
  })
  async fetchAndPersist(): Promise<SuccessDto> {
    return await this.movieFetchAndPersistService.discoverAndPersistMovies();
  }

  @Get('')
  @ApiOkResponse({
    description: 'List of movies',
    type: [MovieListResponseDto],
  })
  async findAll(): Promise<MovieListResponseDto[]> {
    return await this.movieReadService.findAll();
  }

  @Get('/:id')
  @ApiOkResponse({
    description: 'Detail of a movie',
    type: MovieListResponseDto,
  })
  @ApiParam({ name: 'id', description: 'Movie ID' })
  async findById(@Param('id') id: string): Promise<MovieListResponseDto> {
    return await this.movieReadService.findOneById(id);
  }

  @Post('')
  @ApiOkResponse({
    description: 'Success Scenario',
    type: SuccessDto,
  })
  async save(@Body() req: MovieSaveRequestDto): Promise<SuccessDto> {
    return await this.movieWriteService.save(req);
  }

  @Delete('/:id')
  @ApiOkResponse({
    description: 'Success Scenario',
    type: SuccessDto,
  })
  @ApiParam({ name: 'id', description: 'Movie ID' })
  async removeById(@Param('id') id: string): Promise<SuccessDto> {
    return await this.movieWriteService.removeById(id);
  }
}
