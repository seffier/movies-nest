import { Test, TestingModule } from '@nestjs/testing';
import { MovieWriteService } from '../movie.write.service';
import { getModelToken } from '@nestjs/mongoose';
import { movieSaveMockData } from './mock/movie.save.mock';
import { ApiErrorEnum } from '../../../enum/api.error.enum';
import { movieListMockData } from './mock/movie.list.mock';
import { ValidationErrorEnum } from '../../../enum/validation.error.enum';

describe('MovieWriteService', () => {
  let service: MovieWriteService;
  let mockMovieModel;

  beforeEach(async () => {
    mockMovieModel = {
      create: jest.fn(),
      findOne: jest.fn(),
      findById: jest.fn(),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MovieWriteService,
        {
          provide: getModelToken('Movie'),
          useValue: mockMovieModel,
        },
      ],
    }).compile();

    service = module.get<MovieWriteService>(MovieWriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('save', () => {
    it('should save a movie when it does not already exists', async () => {
      mockMovieModel.findOne.mockResolvedValue(null);
      mockMovieModel.create.mockResolvedValue(movieSaveMockData);

      const result = await service.save(movieSaveMockData);

      expect(mockMovieModel.findOne).toHaveBeenCalledWith({
        name: movieSaveMockData.name,
      });
      expect(mockMovieModel.create).toHaveBeenCalledWith(movieSaveMockData);
      expect(result).toEqual({ success: true });
    });

    it('should throw an error when a movie with the same name exists', async () => {
      mockMovieModel.findOne.mockReturnValue(
        Promise.resolve(movieListMockData[5]),
      );
      await expect(service.save(movieSaveMockData)).rejects.toThrow(
        ApiErrorEnum.MOVIE_EXISTS,
      );
    });
  });
  describe('removeById', () => {
    it('should remove a movie by id when it exists', async () => {
      const expectedMovie = movieListMockData[0];
      mockMovieModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(expectedMovie),
      });
      mockMovieModel.deleteOne.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      });

      const result = await service.removeById(expectedMovie._id);
      expect(mockMovieModel.deleteOne).toHaveBeenCalledWith({
        _id: movieListMockData[0]._id,
      });
      expect(result).toEqual({ success: true });
    });

    it('should throw an error when id is not valid', async () => {
      const invalidId = 'invalidObjectId';
      await expect(service.removeById(invalidId)).rejects.toThrow(
        ValidationErrorEnum.ID_NOT_VALID,
      );
    });

    it('should throw an error when movie does not exist', async () => {
      const validId = '65e05438b45d4e289e2ffe56';
      mockMovieModel.findById.mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });
      await expect(service.removeById(validId)).rejects.toThrow(
        ApiErrorEnum.MOVIE_NOT_FOUND,
      );
    });
  });
});
