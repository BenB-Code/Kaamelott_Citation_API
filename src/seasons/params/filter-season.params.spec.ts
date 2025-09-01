import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { CREATED_AT } from '../../common/constants/filters.constant';
import { FilterSeasonParams } from './filter-season.params';

describe('FilterSeasonParams', () => {
  it('should be defined', () => {
    expect(FilterSeasonParams).toBeDefined();
  });

  it('should use default sortBy value', () => {
    const filterParams = new FilterSeasonParams();
    expect(filterParams.sortBy).toBe(CREATED_AT);
  });

  it('should accept valid showId', async () => {
    const filterParams = plainToInstance(FilterSeasonParams, {
      showId: 1,
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid name', async () => {
    const filterParams = plainToInstance(FilterSeasonParams, {
      name: 'Saison 1',
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid sortBy values', async () => {
    const validSortByValues = ['createdAt', 'updatedAt', 'name'];

    for (const sortBy of validSortByValues) {
      const filterParams = plainToInstance(FilterSeasonParams, { sortBy });
      const errors = await validate(filterParams);
      expect(errors).toHaveLength(0);
    }
  });

  it('should reject invalid sortBy values', async () => {
    const filterParams = plainToInstance(FilterSeasonParams, {
      sortBy: 'invalidSort',
    });

    const errors = await validate(filterParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isIn');
  });

  it('should handle complete FilterSeasonParams with all properties', async () => {
    const plainObject = {
      showId: 1,
      name: 'Saison 1',
      sortBy: 'name',
    };

    const filterParams = plainToInstance(FilterSeasonParams, plainObject);
    const errors = await validate(filterParams);

    expect(errors).toHaveLength(0);
    expect(filterParams.showId).toBe(1);
    expect(filterParams.name).toBe('Saison 1');
    expect(filterParams.sortBy).toBe('name');
  });
});
