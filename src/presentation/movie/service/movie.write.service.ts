import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from 'src/domain/model/movie.mongodb';
import { SuccessDto } from '../dto/response/success.response.dto';
import { MovieSaveRequestDto } from '../dto/request/movie.save.request.dto';
import { ApiErrorEnum } from 'src/presentation/enum/api.error.enum';

@Injectable()
export class MovieWriteService {
  constructor(@InjectModel('Movie') private movieModel: Model<Movie>) {}

  async save(req: MovieSaveRequestDto): Promise<SuccessDto> {
    const existingMovie = await this.movieModel.findOne({ name: req.name });
    if (existingMovie) {
      throw new HttpException(ApiErrorEnum.MOVIE_EXISTS, 400);
    }
    const newMovie = new this.movieModel({
      name: req.name,
      overview: req.overview,
      popularity: req.popularity,
      voteAverage: req.voteAverage,
      voteCount: req.voteCount,
      releaseDate: req.releaseDate,
      genre: req.genre,
    });
    await newMovie.save();
    return { success: true };
  }
}
