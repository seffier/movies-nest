import { ApiProperty } from '@nestjs/swagger';
import { GenreDto } from '../genre.dto';

export class MovieListResponseDto {
  @ApiProperty()
  _id: string;
  @ApiProperty()
  tmdbId: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  overview: string;
  @ApiProperty()
  popularity: number;
  @ApiProperty()
  voteAverage: number;
  @ApiProperty()
  voteCount: number;
  @ApiProperty()
  releaseDate: string;
  @ApiProperty({ type: () => [GenreDto] })
  genre: GenreDto[];
}
