import { GenreDto } from '../genre.dto';

export class MovieDetailsDto {
  id: string;
  original_title: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genres: GenreDto[];
}
