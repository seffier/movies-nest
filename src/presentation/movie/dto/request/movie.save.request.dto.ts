export class MovieSaveRequestDto {
  name: string;
  overview: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  releaseDate: string;
  genre: genre[];
}

class genre {
  id: number;
  name: string;
}
