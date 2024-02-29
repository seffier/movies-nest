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
  name: string;

  @IsNotEmpty()
  @IsString()
  overview: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  popularity: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  voteAverage: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  voteCount: number;

  @IsDateString()
  @IsNotEmpty()
  releaseDate: string;

  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => GenreDto)
  genre: GenreDto[];
}

class GenreDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;
}
