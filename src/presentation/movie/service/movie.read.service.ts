import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie } from '../../../domain/model/movie.mongodb';
import { ApiErrorEnum } from '../../enum/api.error.enum';
import { MovieListResponseDto } from '../dto/response/movie.list.response.dto';
import { ValidationErrorEnum } from '../../enum/validation.error.enum';

@Injectable()
export class MovieReadService {
  constructor(@InjectModel('Movie') private movieModel: Model<Movie>) {}

  async findAll(): Promise<MovieListResponseDto[]> {
    const movies = await this.movieModel.find().exec();
    return movies.map((movie) => ({
      _id: movie._id,
      tmdbId: movie.tmdbId,
      name: movie.name,
      overview: movie.overview,
      popularity: movie.popularity,
      voteAverage: movie.voteAverage,
      voteCount: movie.voteCount,
      releaseDate: movie.releaseDate,
      genre: movie.genre.map((item) => ({
        id: item.id,
        name: item.name,
      })),
    }));
  }

  async findOneById(id: string): Promise<MovieListResponseDto> {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException(ValidationErrorEnum.ID_NOT_VALID, 400);
    }
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new HttpException(ApiErrorEnum.MOVIE_NOT_FOUND, 404);
    }
    return {
      _id: movie._id,
      tmdbId: movie.tmdbId,
      name: movie.name,
      overview: movie.overview,
      popularity: movie.popularity,
      voteAverage: movie.voteAverage,
      voteCount: movie.voteCount,
      releaseDate: movie.releaseDate,
      genre: movie.genre.map((item) => ({
        id: item.id,
        name: item.name,
      })),
    };
  }
}
