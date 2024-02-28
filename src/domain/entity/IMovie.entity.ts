export interface IMovieEntity {
  id: string;
  name: string;
  overview: string;
  popularity: number;
  voteAverage: number;
  voteCount: number;
  releaseDate: string;
  genre: {
    id: number;
    name: string;
  };
}
