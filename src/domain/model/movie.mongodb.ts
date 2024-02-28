import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMovieEntity } from '../entity/IMovie.entity';
import { Document } from 'mongoose';

@Schema({
  collection: 'netflix.movies',
})
export class Movie extends Document implements IMovieEntity {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  overview: string;

  @Prop()
  popularity: number;

  @Prop()
  voteAverage: number;

  @Prop()
  voteCount: number;

  @Prop()
  releaseDate: string;

  @Prop([{ id: Number, name: String }])
  genre: [{ id: number; name: string }];
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
