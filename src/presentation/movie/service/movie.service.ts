import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from 'src/domain/model/movie.mongodb';

@Injectable()
export class MovieService {
  constructor(@InjectModel('Movie') private movieModel: Model<Movie>) {}

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
  }
}
