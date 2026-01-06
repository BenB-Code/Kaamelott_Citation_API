import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import 'reflect-metadata';
import { CREATED_AT } from '../../common/constants/filters.constant';
import { FilterCitationParams } from './filter-citation.params';

describe('FilterCitationParams', () => {
  it('should be defined', () => {
    expect(FilterCitationParams).toBeDefined();
  });

  it('should use default sortBy value', () => {
    const filterParams = new FilterCitationParams();
    expect(filterParams.sortBy).toBe(CREATED_AT);
  });

  it('should accept valid text filter', async () => {
    const filterParams = plainToInstance(FilterCitationParams, {
      text: "C'est pas faux",
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid episodeId', async () => {
    const filterParams = plainToInstance(FilterCitationParams, {
      episodeId: 1,
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid movieId', async () => {
    const filterParams = plainToInstance(FilterCitationParams, {
      movieId: 2,
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid characterId', async () => {
    const filterParams = plainToInstance(FilterCitationParams, {
      characterId: 1,
    });

    const errors = await validate(filterParams);
    expect(errors).toHaveLength(0);
  });

  it('should accept valid sortBy values', async () => {
    const validSortByValues = [
      'createdAt',
      'updatedAt',
      'episodeId',
      'characterId',
      'movieId',
      'citationId',
    ];

    for (const sortBy of validSortByValues) {
      const filterParams = plainToInstance(FilterCitationParams, { sortBy });
      const errors = await validate(filterParams);
      expect(errors).toHaveLength(0);
    }
  });

  it('should reject invalid sortBy values', async () => {
    const filterParams = plainToInstance(FilterCitationParams, {
      sortBy: 'invalidSort',
    });

    const errors = await validate(filterParams);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints).toHaveProperty('isIn');
  });

  it('should handle complete FilterCitationParams with all properties', async () => {
    const plainObject = {
      text: "C'est pas faux !",
      episodeId: 1,
      movieId: 2,
      characterId: 1,
      search: 'faux',
      sortBy: 'characterId',
      sortOrder: 'DESC',
      limit: 20,
      offset: 10,
    };

    const filterParams = plainToInstance(FilterCitationParams, plainObject);
    const errors = await validate(filterParams);

    expect(errors).toHaveLength(0);
    expect(filterParams.text).toBe("C'est pas faux !");
    expect(filterParams.episodeId).toBe(1);
    expect(filterParams.movieId).toBe(2);
    expect(filterParams.characterId).toBe(1);
    expect(filterParams.search).toBe('faux');
    expect(filterParams.sortBy).toBe('characterId');
    expect(filterParams.sortOrder).toBe('DESC');
    expect(filterParams.limit).toBe(20);
    expect(filterParams.offset).toBe(10);
  });

  it('should accept filters with only search and pagination', async () => {
    const searchOnlyFilter = {
      search: 'Kaamelott',
      limit: 50,
      offset: 0,
    };

    const filterParams = plainToInstance(FilterCitationParams, searchOnlyFilter);
    const errors = await validate(filterParams);

    expect(errors).toHaveLength(0);
    expect(filterParams.search).toBe('Kaamelott');
    expect(filterParams.limit).toBe(50);
    expect(filterParams.offset).toBe(0);
    expect(filterParams.sortBy).toBe(CREATED_AT); // default value
  });

  it('should accept filters with only relation IDs', async () => {
    const relationFilter = {
      characterId: 5,
      episodeId: 10,
    };

    const filterParams = plainToInstance(FilterCitationParams, relationFilter);
    const errors = await validate(filterParams);

    expect(errors).toHaveLength(0);
    expect(filterParams.characterId).toBe(5);
    expect(filterParams.episodeId).toBe(10);
    expect(filterParams.movieId).toBeUndefined();
  });

  it('should handle empty filter params', async () => {
    const emptyFilter = {};

    const filterParams = plainToInstance(FilterCitationParams, emptyFilter);
    const errors = await validate(filterParams);

    expect(errors).toHaveLength(0);
    expect(filterParams.sortBy).toBe(CREATED_AT);
  });
});
