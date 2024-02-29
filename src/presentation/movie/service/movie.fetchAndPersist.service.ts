import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from 'src/domain/model/movie.mongodb';
import { MovieDetailsDto } from '../dto/response/movie.details.dto';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { ApiErrorEnum } from 'src/presentation/enum/api.error.enum';

@Injectable()
export class MovieFetchAndPersistService {
  private readonly tmdbApiKey: string;
  constructor(
    private httpService: HttpService,
    @InjectModel('Movie') private movieModel: Model<Movie>,
    private configService: ConfigService,
  ) {
    this.tmdbApiKey = this.configService.get<string>('TMDB_API_KEY', {
      infer: true,
    });
  }

  async discoverAndPersistMovies(): Promise<boolean> {
    const discoverUrl = `https://api.themoviedb.org/3/discover/movie`;
    const params = {
      api_key: this.tmdbApiKey,
      sort_by: 'release_date.asc',
      'vote_count.gte': 1500,
      'vote_average.gte': 8.4,
      with_watch_providers: 8,
      watch_region: 'TR',
    };
    try {
      const response = this.httpService.get(discoverUrl, { params });
      const result = await lastValueFrom(response);
      const discoverResults = result.data.results;
      for (const movie of discoverResults) {
        const movieDetails = await this.fetchMovieDetails(movie.id);
        await this.persistMovieDetails(movieDetails);
      }
      return true;
    } catch (error) {
      console.error('Error message: ', error);
      throw new HttpException(ApiErrorEnum.MOVIE_FETCHING_ERROR, 400);
    }
  }

  private async fetchMovieDetails(movieId: number): Promise<MovieDetailsDto> {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
    try {
      const response = await this.httpService.get<MovieDetailsDto>(
        movieDetailsUrl,
        {
          params: { api_key: this.tmdbApiKey },
        },
      );
      const result = await lastValueFrom(response);
      return result.data;
    } catch (error) {
      console.error('Error message: ', error);
      throw new HttpException(ApiErrorEnum.MOVIE_FETCHING_ERROR, 400);
    }
  }

  private async persistMovieDetails(
    movieDto: MovieDetailsDto,
  ): Promise<boolean> {
    const existingMovie = await this.movieModel.findOne({ id: movieDto.id });
    if (!existingMovie) {
      const newMovie = new this.movieModel({
        tmdbId: movieDto.id,
        name: movieDto.original_title,
        overview: movieDto.overview,
        popularity: movieDto.popularity,
        voteAverage: movieDto.vote_average,
        voteCount: movieDto.vote_count,
        releaseDate: movieDto.release_date,
        genre: movieDto.genres.map((item) => ({
          id: item.id,
          name: item.name,
        })),
      });
      await newMovie.save();
    }
    return true;
  }
}
