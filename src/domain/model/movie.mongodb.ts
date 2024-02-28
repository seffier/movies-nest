import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IMovieEntity } from '../entity/IMovie.entity';

@Schema()
export class Movie implements IMovieEntity {
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

  @Prop()
  genre: { id: number; name: string };
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
