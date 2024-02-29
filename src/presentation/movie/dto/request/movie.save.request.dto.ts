import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class MovieSaveRequestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name of the movie',
    example: 'Lord Of The Rings',
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Overview of the movie',
    example: 'Lord Of The Rings overview.',
  })
  overview: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Popularity of the movie',
    example: 1200,
  })
  popularity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Vote average of the movie.',
    example: 9,
  })
  voteAverage: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Total vote count of the movie.',
    example: 100000,
  })
  voteCount: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: 'Release date of the movie',
    example: '2001-12-21',
  })
  releaseDate: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => GenreDto)
  @ApiProperty({ type: () => [GenreDto] })
  genre: GenreDto[];
}

class GenreDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: 'Id of the genre',
    example: 14,
  })
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Name of the genre',
    example: 'Fantasy',
  })
  name: string;
}
