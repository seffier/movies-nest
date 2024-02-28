import { Module } from '@nestjs/common';
import { MovieController } from '../controller/movie.controller';
import { MovieFetchAndPersistService } from '../service/movie.fetchAndPersist.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from 'src/domain/model/movie.mongodb';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  providers: [MovieFetchAndPersistService],
  controllers: [MovieController],
})
export class MovieModule {}
