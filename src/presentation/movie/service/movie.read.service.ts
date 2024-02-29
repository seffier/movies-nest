import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Movie } from 'src/domain/model/movie.mongodb';
import { ApiErrorEnum } from 'src/presentation/enum/api.error.enum';
import { ValidationErrorEnum } from 'src/presentation/enum/validation.error.enum';

@Injectable()
export class MovieReadService {
  constructor(@InjectModel('Movie') private movieModel: Model<Movie>) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }

  async findOneById(id: string): Promise<Movie> {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpException(ValidationErrorEnum.ID_NOT_VALID, 400);
    }
    const movie = await this.movieModel.findById(id).exec();
    if (!movie) {
      throw new HttpException(ApiErrorEnum.MOVIE_NOT_FOUND, 404);
    }
    return movie;
  }
}
