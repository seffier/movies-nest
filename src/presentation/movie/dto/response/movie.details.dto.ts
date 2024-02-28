export class MovieDetailsDto {
  id: string;
  original_title: string;
  overview: string;
  popularity: number;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genres: genre[];
}

class genre {
  id: number;
  name: string;
}
