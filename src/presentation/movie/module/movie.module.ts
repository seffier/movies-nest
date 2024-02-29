import { Module } from '@nestjs/common';
import { MovieController } from '../controller/movie.controller';
import { MovieFetchAndPersistService } from '../service/movie.fetchAndPersist.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieSchema } from 'src/domain/model/movie.mongodb';
import { MovieReadService } from '../service/movie.read.service';
import { MovieWriteService } from '../service/movie.write.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  providers: [MovieFetchAndPersistService, MovieReadService, MovieWriteService],
  controllers: [MovieController],
})
export class MovieModule {}
