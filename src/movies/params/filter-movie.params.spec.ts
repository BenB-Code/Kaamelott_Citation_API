import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { CREATED_AT } from '../../common/constants/filters.constant';
import { FilterMovieParams } from './filter-movie.params';

describe('FilterMovieParams', () => {
  it('should be defined', () => {
    expect(FilterMovieParams).toBeDefined();
  });

  it('should use default sortBy value', () => {
    const filterParams = new FilterMovieParams();
    expect(filterParams.sortBy).toBe(CREATED_AT);
  });

  it('should accept valid showId', async () => {
    const filterParams = plainToInstance(FilterMovieParams, {
      showId: 1,
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid name', async () => {
    const filterParams = plainToInstance(FilterMovieParams, {
      name: 'Film Kaamelott',
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid releaseDate', async () => {
    const filterParams = plainToInstance(FilterMovieParams, {
      releaseDate: '2021-07-21',
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid sortBy values', async () => {
    const validSortByValues = ['createdAt', 'updatedAt', 'name', 'releaseDate'];

    for (const sortBy of validSortByValues) {
      const filterParams = plainToInstance(FilterMovieParams, { sortBy });
      const errors = await validate(filterParams);
      expect(errors).toHaveLength(0);
    }
  });

  it('should reject invalid sortBy values', async () => {
    const filterParams = plainToInstance(FilterMovieParams, {
      sortBy: 'invalidSort',
    });

    const errors = await validate(filterParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isIn');
  });

  it('should handle complete FilterMovieParams with all properties', async () => {
    const plainObject = {
      showId: 1,
      name: 'Film Kaamelott',
      releaseDate: '2021-07-21',
      sortBy: 'name',
    };

    const filterParams = plainToInstance(FilterMovieParams, plainObject);
    const errors = await validate(filterParams);

    expect(errors).toHaveLength(0);
    expect(filterParams.showId).toBe(1);
    expect(filterParams.name).toBe('Film Kaamelott');
    expect(filterParams.releaseDate).toBe('2021-07-21');
    expect(filterParams.sortBy).toBe('name');
  });
});
