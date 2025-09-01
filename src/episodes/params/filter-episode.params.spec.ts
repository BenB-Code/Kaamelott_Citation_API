import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { CREATED_AT } from '../../common/constants/filters.constant';
import { FilterEpisodeParams } from './filter-episode.params';

describe('FilterEpisodeParams', () => {
  it('should be defined', () => {
    expect(FilterEpisodeParams).toBeDefined();
  });

  it('should use default sortBy value', () => {
    const filterParams = new FilterEpisodeParams();
    expect(filterParams.sortBy).toBe(CREATED_AT);
  });

  it('should accept valid seasonId', async () => {
    const filterParams = plainToInstance(FilterEpisodeParams, {
      seasonId: 1,
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid name', async () => {
    const filterParams = plainToInstance(FilterEpisodeParams, {
      name: 'Épisode 1',
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid number', async () => {
    const filterParams = plainToInstance(FilterEpisodeParams, {
      number: 1,
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid sortBy values', async () => {
    const validSortByValues = ['createdAt', 'updatedAt', 'name', 'number'];

    for (const sortBy of validSortByValues) {
      const filterParams = plainToInstance(FilterEpisodeParams, { sortBy });
      const errors = await validate(filterParams);
      expect(errors).toHaveLength(0);
    }
  });

  it('should reject invalid sortBy values', async () => {
    const filterParams = plainToInstance(FilterEpisodeParams, {
      sortBy: 'invalidSort',
    });

    const errors = await validate(filterParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isIn');
  });

  it('should handle complete FilterEpisodeParams with all properties', async () => {
    const plainObject = {
      seasonId: 1,
      name: 'Épisode 1',
      number: 1,
      sortBy: 'name',
    };

    const filterParams = plainToInstance(FilterEpisodeParams, plainObject);
    const errors = await validate(filterParams);

    expect(errors).toHaveLength(0);
    expect(filterParams.seasonId).toBe(1);
    expect(filterParams.name).toBe('Épisode 1');
    expect(filterParams.number).toBe(1);
    expect(filterParams.sortBy).toBe('name');
  });
});
