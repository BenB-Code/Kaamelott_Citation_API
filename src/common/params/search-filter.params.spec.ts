import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { DESC } from '../constants/sorting.constant';
import { SearchFilterParams } from './search-filter.params';

describe('SearchFilterParams', () => {
  it('should be defined', () => {
    expect(SearchFilterParams).toBeDefined();
  });

  it('should use default sortOrder value', () => {
    const searchParams = new SearchFilterParams();
    expect(searchParams.sortOrder).toBe(DESC);
  });

  it('should accept valid search with minimum length', async () => {
    const searchParams = plainToClass(SearchFilterParams, {
      search: 'abc',
    });

    const errors = await validate(searchParams);
    expect(errors).toHaveLength(0);
  });

  it('should reject search with less than 3 characters', async () => {
    const searchParams = plainToClass(SearchFilterParams, {
      search: 'ab',
    });

    const errors = await validate(searchParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('minLength');
  });

  it('should accept valid sortOrder values', async () => {
    const validSortOrderValues = ['ASC', 'DESC'];

    for (const sortOrder of validSortOrderValues) {
      const searchParams = plainToClass(SearchFilterParams, { sortOrder });
      const errors = await validate(searchParams);
      expect(errors).toHaveLength(0);
    }
  });

  it('should reject invalid sortOrder values', async () => {
    const searchParams = plainToClass(SearchFilterParams, {
      sortOrder: 'INVALID',
    });

    const errors = await validate(searchParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isEnum');
  });

  it('should handle complete SearchFilterParams with all properties', async () => {
    const plainObject = {
      search: 'test',
      sortOrder: 'ASC',
    };

    const searchParams = plainToClass(SearchFilterParams, plainObject);
    const errors = await validate(searchParams);

    expect(errors).toHaveLength(0);
    expect(searchParams.search).toBe('test');
    expect(searchParams.sortOrder).toBe('ASC');
  });
});
