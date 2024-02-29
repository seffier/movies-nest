import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { movieListMockData } from './mock/movie.list.mock';
import { MovieReadService } from '../movie.read.service';
import { ValidationErrorEnum } from '../../../enum/validation.error.enum';
import { ApiErrorEnum } from '../../../enum/api.error.enum';

describe('MovieReadService', () => {
  let service: MovieReadService;
  let mockMovieModel;

  beforeEach(async () => {
    mockMovieModel = {
      find: jest.fn(),
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieReadService,
        {
          provide: getModelToken('Movie'),
          useValue: mockMovieModel,
        },
      ],
    }).compile();

    service = module.get<MovieReadService>(MovieReadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of movies', async () => {
      const expectedMovies = movieListMockData;
      mockMovieModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue(expectedMovies),
      });
      const movies = await service.findAll();
      expect(mockMovieModel.find).toHaveBeenCalledTimes(1);
      expect(movies).toEqual(expectedMovies);
    });

    it('should return empty array of movies', async () => {
      mockMovieModel.find.mockReturnValue({
        exec: jest.fn().mockResolvedValue([]),
      });
      const movies = await service.findAll();
      expect(mockMovieModel.find).toHaveBeenCalledTimes(1);
      expect(movies).toEqual([]);
    });
  });

  describe('findOneById', () => {
    it('should return a single movie if valid id provided', async () => {
      const expectedMovie = movieListMockData[0];
      mockMovieModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(expectedMovie),
      });

      const movie = await service.findOneById(expectedMovie._id);
      expect(mockMovieModel.findById).toHaveBeenCalledWith(expectedMovie._id);
      expect(movie).toEqual(expectedMovie);
    });

    it('should throw an error if invalid id provided', async () => {
      const invalidId = 'invalidId';
      await expect(service.findOneById(invalidId)).rejects.toThrow(
        ValidationErrorEnum.ID_NOT_VALID,
      );
    });

    it('should throw an error if movie not found', async () => {
      const validId = movieListMockData[0]._id;
      mockMovieModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(service.findOneById(validId)).rejects.toThrow(
        ApiErrorEnum.MOVIE_NOT_FOUND,
      );
      expect(mockMovieModel.findById).toHaveBeenCalledWith(validId);
    });
  });
});
